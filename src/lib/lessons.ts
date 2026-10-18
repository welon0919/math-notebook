import { getCollection, type CollectionEntry } from 'astro:content';
import type { SubjectId } from '../data/subjects';
import { units, type Unit } from '../data/units';
import { loadItems } from './items';

export type Lesson = CollectionEntry<'lessons'>;

/** `algebra/quadratic-equations` → `quadratic-equations` */
export const lessonSlug = (lesson: Lesson): string => lesson.id.split('/').at(-1)!;

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Lesson page URL, e.g. `/algebra/quadratic-equations/`. */
export const lessonHref = (lesson: Lesson): string => `${base}/${lesson.data.subject}/${lessonSlug(lesson)}/`;

export interface UnitGroup {
  unit: Unit;
  /** 1-based position among the subject's units. */
  number: number;
  lessons: Lesson[];
}

/** Where a lesson sits in its subject, e.g. 第 2 單元 · 第 3 課. */
export interface Position {
  unitNumber: number;
  lessonNumber: number;
}

/**
 * Loads all lessons and checks the rules a single entry's schema can't: folder matches
 * `subject`, slugs are unique site-wide, `unit` belongs to the subject, `order` is unique
 * per subject and never moves back to an earlier unit, prerequisites exist, come earlier
 * in the same subject and form no cycle, and `formulas`/`theorems` slugs exist in that list.
 * Any violation fails the build.
 */
export async function loadLessons() {
  const lessons = (await getCollection('lessons')).sort((a, b) => a.data.order - b.data.order);
  const items = await loadItems();
  const errors: string[] = [];
  const bySlug = new Map<string, Lesson>();
  const orders = new Set<string>();
  const unitIndex = (lesson: Lesson) => units[lesson.data.subject].findIndex((u) => u.id === lesson.data.unit);

  for (const lesson of lessons) {
    const where = lesson.filePath ?? lesson.id;
    const { subject, unit, order } = lesson.data;
    const parts = lesson.id.split('/');
    const fileSlug = lesson.filePath?.split('/').at(-1)?.replace(/\.mdx?$/, '');
    if (parts.length !== 2 || parts[0] !== subject) {
      errors.push(`${where}: must be in the "${subject}/" folder (matching its subject).`);
    }
    if (fileSlug !== undefined && fileSlug !== lessonSlug(lesson)) {
      errors.push(`${where}: file name must be lowercase English words joined by hyphens.`);
    }
    const existing = bySlug.get(lessonSlug(lesson));
    if (existing) {
      errors.push(`${where}: slug "${lessonSlug(lesson)}" is already used by ${existing.filePath ?? existing.id}.`);
    }
    bySlug.set(lessonSlug(lesson), lesson);
    if (unitIndex(lesson) === -1) {
      errors.push(`${where}: unit "${unit}" is not listed for ${subject} in src/data/units.ts.`);
    }
    const orderKey = `${subject}/${order}`;
    if (orders.has(orderKey)) errors.push(`${where}: another ${subject} lesson has order ${order}.`);
    orders.add(orderKey);
    if ((lesson.data.example === undefined) !== (lesson.data.solution === undefined)) {
      errors.push(`${where}: example and solution must be given together.`);
    }
  }

  // Sorted by order, each subject's units must appear in the order units.ts lists them.
  const lastUnit = new Map<SubjectId, number>();
  for (const lesson of lessons) {
    const index = unitIndex(lesson);
    const previous = lastUnit.get(lesson.data.subject) ?? 0;
    if (index !== -1 && index < previous) {
      errors.push(`${lesson.filePath}: order ${lesson.data.order} puts unit "${lesson.data.unit}" after a later unit.`);
    }
    lastUnit.set(lesson.data.subject, Math.max(previous, index));
  }

  for (const lesson of lessons) {
    const where = lesson.filePath ?? lesson.id;
    for (const slug of lesson.data.prerequisites) {
      const prerequisite = bySlug.get(slug);
      if (slug === lessonSlug(lesson)) errors.push(`${where}: prerequisites lists itself ("${slug}").`);
      else if (!prerequisite) errors.push(`${where}: prerequisite "${slug}" is not a lesson.`);
      else if (prerequisite.data.subject === lesson.data.subject && prerequisite.data.order > lesson.data.order) {
        errors.push(`${where}: prerequisite "${slug}" comes later in ${lesson.data.subject}.`);
      }
    }
    for (const kind of ['formulas', 'theorems'] as const) {
      for (const slug of lesson.data[kind]) {
        if (items.bySlug.get(slug)?.collection !== kind) errors.push(`${where}: ${kind} slug "${slug}" does not exist.`);
      }
    }
  }

  // Cross-subject prerequisites skip the order check above, so look for cycles directly.
  const state = new Map<string, 'visiting' | 'done'>();
  const visit = (slug: string, path: string[]) => {
    if (state.get(slug) === 'done') return;
    if (state.get(slug) === 'visiting') {
      errors.push(`prerequisites form a cycle: ${[...path.slice(path.indexOf(slug)), slug].join(' → ')}`);
      return;
    }
    state.set(slug, 'visiting');
    for (const next of bySlug.get(slug)?.data.prerequisites ?? []) {
      if (bySlug.has(next)) visit(next, [...path, slug]);
    }
    state.set(slug, 'done');
  };
  for (const slug of bySlug.keys()) visit(slug, []);

  if (errors.length > 0) {
    throw new Error(`Invalid lessons:\n  ${errors.join('\n  ')}`);
  }
  return { lessons, bySlug, items };
}

/** The subject's units that have lessons, each with its lessons in order. */
export function unitGroups(subject: SubjectId, lessons: Lesson[]): UnitGroup[] {
  return units[subject]
    .map((unit, i) => ({
      unit,
      number: i + 1,
      lessons: lessons.filter((l) => l.data.subject === subject && l.data.unit === unit.id),
    }))
    .filter((group) => group.lessons.length > 0);
}

/** Position, plus previous and next lesson in the same subject (across units), by `order`. */
export function lessonNav(lesson: Lesson, lessons: Lesson[]) {
  const list = lessons.filter((l) => l.data.subject === lesson.data.subject);
  const index = list.findIndex((l) => l.id === lesson.id);
  const unitLessons = list.filter((l) => l.data.unit === lesson.data.unit);
  const position: Position = {
    unitNumber: units[lesson.data.subject].findIndex((u) => u.id === lesson.data.unit) + 1,
    lessonNumber: unitLessons.findIndex((l) => l.id === lesson.id) + 1,
  };
  return { position, prev: list[index - 1], next: list[index + 1] };
}

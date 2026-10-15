import { getCollection, type CollectionEntry } from 'astro:content';

export type Formula = CollectionEntry<'formulas'>;
export type Theorem = CollectionEntry<'theorems'>;
export type Item = Formula | Theorem;

/** `algebra/quadratic-formula` → `quadratic-formula` */
export const slugOf = (item: Item): string => item.id.split('/').at(-1)!;

const byOrder = (a: Item, b: Item) => a.data.order - b.data.order;

/**
 * Loads all formulas and theorems and checks the rules a single entry's schema can't:
 * folder matches `subject`, slugs are unique site-wide, `order` is unique per list,
 * and every `related` slug exists. Any violation fails the build.
 */
export async function loadItems() {
  const formulas = (await getCollection('formulas')).sort(byOrder);
  const theorems = (await getCollection('theorems')).sort(byOrder);
  const all: Item[] = [...formulas, ...theorems];
  const errors: string[] = [];
  const bySlug = new Map<string, Item>();
  const orders = new Set<string>();

  for (const item of all) {
    const where = item.filePath ?? item.id;
    const parts = item.id.split('/');
    const fileSlug = item.filePath?.split('/').at(-1)?.replace(/\.mdx?$/, '');
    if (parts.length !== 2 || parts[0] !== item.data.subject) {
      errors.push(`${where}: must be in the "${item.data.subject}/" folder (matching its subject).`);
    }
    if (fileSlug !== undefined && fileSlug !== slugOf(item)) {
      errors.push(`${where}: file name must be lowercase English words joined by hyphens.`);
    }
    const existing = bySlug.get(slugOf(item));
    if (existing) {
      errors.push(`${where}: slug "${slugOf(item)}" is already used by ${existing.filePath ?? existing.id}.`);
    }
    bySlug.set(slugOf(item), item);
    const orderKey = `${item.collection}/${item.data.subject}/${item.data.order}`;
    if (orders.has(orderKey)) errors.push(`${where}: another ${item.collection} item in ${item.data.subject} has order ${item.data.order}.`);
    orders.add(orderKey);
  }

  for (const item of all) {
    for (const slug of item.data.related) {
      if (slug === slugOf(item)) errors.push(`${item.filePath}: related lists itself ("${slug}").`);
      else if (!bySlug.has(slug)) errors.push(`${item.filePath}: related slug "${slug}" does not exist.`);
    }
  }

  if (errors.length > 0) {
    throw new Error(`Invalid formulas/theorems:\n  ${errors.join('\n  ')}`);
  }
  return { formulas, theorems, bySlug };
}

export const kindLabel = { formulas: '公式', theorems: '定理' } as const;

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Detail page URL, e.g. `/algebra/formulas/quadratic-formula/`. */
export const itemHref = (item: Item): string => `${base}/${item.data.subject}/${item.collection}/${slugOf(item)}/`;

/** The subject page with this item's list tab open, e.g. `/algebra/#formulas`. */
export const listHref = (item: Item): string => `${base}/${item.data.subject}/#${item.collection}`;

/** Previous and next item in the same list (same subject and kind), by `order`. */
export function neighbors(item: Item, all: { formulas: Formula[]; theorems: Theorem[] }) {
  const list: Item[] = all[item.collection].filter((i) => i.data.subject === item.data.subject);
  const index = list.findIndex((i) => i.id === item.id);
  return { prev: list[index - 1], next: list[index + 1] };
}

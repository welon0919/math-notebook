import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { subjectIds } from './data/subjects';

// A double-quoted YAML string treats backslashes as escapes, silently turning
// `\frac`, `\theta`, `\neq`, `\beta`, `\rightarrow` into control characters.
const text = z
  .string()
  .min(1)
  .refine((s) => !/[\u0000-\u001f]/.test(s), {
    message: 'Contains a control character; use plain or single-quoted YAML for LaTeX, not double quotes.',
  });

const subject = z.enum(subjectIds);

// Slugs come from file names and are referenced by `related` and `prerequisites`, so keep them URL-friendly.
const slug = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Use lowercase English words joined by hyphens.');

// Any formula or theorem slug, in any subject. Existence is checked in src/lib/items.ts
// because a single entry's schema can't see the other entries.
const related = z.array(slug).default([]);

const lessons = defineCollection({
  // deferRender: the glob loader only logs eager render errors, so a KaTeX error
  // would leave the lesson blank; rendering at page build time fails the build instead.
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/lessons', deferRender: true }),
  // `unit`, `prerequisites`, `formulas` and `theorems` are checked against other entries in src/lib/lessons.ts.
  schema: z.object({
    subject,
    unit: slug,
    order: z.number().int().positive(),
    title: text,
    summary: text,
    prerequisites: z.array(slug).default([]),
    formulas: z.array(slug).default([]),
    theorems: z.array(slug).default([]),
    // Older lessons keep their one example here; newer ones write examples in the body.
    example: text.optional(),
    solution: text.optional(),
  }),
});

// Same reason as lessons for deferRender: KaTeX errors in the body must fail the build.
const itemLoader = (kind: string) =>
  glob({ pattern: '**/*.{md,mdx}', base: `./src/content/${kind}`, deferRender: true });

const formulas = defineCollection({
  loader: itemLoader('formulas'),
  schema: z.object({
    subject,
    order: z.number().int().positive(),
    name: text,
    latex: text,
    note: text.optional(),
    related,
  }),
});

const theorems = defineCollection({
  loader: itemLoader('theorems'),
  schema: z.object({
    subject,
    order: z.number().int().positive(),
    name: text,
    statement: text,
    note: text.optional(),
    proofType: z.enum(['full', 'sketch']),
    related,
  }),
});

export const collections = { lessons, formulas, theorems };

import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { defineCollection } from 'astro:content';
import { glob, type Loader } from 'astro/loaders';
import { z } from 'astro/zod';
import { subjectIds } from './data/subjects';

// A single backslash in JSON or a double-quoted YAML string silently turns
// `\frac`, `\theta`, `\neq`, `\beta`, `\rightarrow` into control characters.
const text = z
  .string()
  .min(1)
  .refine((s) => !/[\u0000-\u001f]/.test(s), {
    message: 'Contains a control character; LaTeX backslashes are probably not escaped (use \\\\ in JSON).',
  });

const subject = z.enum(subjectIds);

const lessons = defineCollection({
  // deferRender: the glob loader only logs eager render errors, so a KaTeX error
  // would leave the lesson blank; rendering at page build time fails the build instead.
  loader: glob({ pattern: '**/*.md', base: './src/content/lessons', deferRender: true }),
  schema: z.object({
    subject,
    order: z.number().int().positive(),
    title: text,
    example: text,
    solution: text,
  }),
});

/**
 * Loads `<dir>/<subject>.json`, where each file is a JSON array.
 * Every array item becomes one entry with `subject` and `order` filled in from the file.
 */
function subjectJsonLoader(dir: string): Loader {
  return {
    name: 'subject-json-loader',
    load: async ({ config, store, parseData, watcher, logger }) => {
      const dirUrl = new URL(`${dir}/`, config.root);

      async function sync() {
        store.clear();
        const files = (await readdir(dirUrl)).filter((f) => f.endsWith('.json')).sort();
        for (const file of files) {
          const name = file.replace(/\.json$/, '');
          let items: unknown;
          try {
            items = JSON.parse(await readFile(new URL(file, dirUrl), 'utf-8'));
          } catch (error) {
            throw new Error(`Invalid JSON in ${dir}/${file}: ${(error as Error).message}`);
          }
          if (!Array.isArray(items)) {
            throw new Error(`${dir}/${file} must contain a JSON array.`);
          }
          for (const [index, item] of items.entries()) {
            const id = `${name}/${String(index + 1).padStart(2, '0')}`;
            const data = await parseData({ id, data: { ...item, subject: name, order: index + 1 } });
            store.set({ id, data });
          }
        }
      }

      await sync();

      const dirPath = fileURLToPath(dirUrl);
      watcher?.add(dirPath);
      watcher?.on('change', async (changed) => {
        if (!changed.startsWith(dirPath)) return;
        logger.info(`Reloading ${dir}`);
        await sync();
      });
    },
  };
}

const formulas = defineCollection({
  loader: subjectJsonLoader('src/content/formulas'),
  schema: z.object({
    subject,
    order: z.number().int().positive(),
    name: text,
    latex: text,
    note: text.optional(),
  }),
});

const theorems = defineCollection({
  loader: subjectJsonLoader('src/content/theorems'),
  schema: z.object({
    subject,
    order: z.number().int().positive(),
    name: text,
    statement: text,
    note: text.optional(),
  }),
});

export const collections = { lessons, formulas, theorems };

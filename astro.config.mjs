// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeKatexStrict from './src/lib/rehype-katex-strict.mjs';

// https://astro.build/config
export default defineConfig({
  // MDX inherits `markdown.processor` below, so .mdx files get the same KaTeX checks.
  integrations: [mdx()],
  vite: {
    // Graphs load these with dynamic import(), which the dev server only discovers
    // on first use; it then re-bundles them and the in-flight request fails with 504.
    optimizeDeps: { include: ['jsxgraph', 'katex'] },
  },
  markdown: {
    // Astro's default Markdown processor doesn't run remark/rehype plugins,
    // so use the unified processor for remark-math + rehype-katex.
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [[rehypeKatex, { strict: 'error' }], rehypeKatexStrict],
    }),
  },
});

// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeKatexStrict from './src/lib/rehype-katex-strict.mjs';

// https://astro.build/config
export default defineConfig({
  markdown: {
    // Astro's default Markdown processor doesn't run remark/rehype plugins,
    // so use the unified processor for remark-math + rehype-katex.
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [[rehypeKatex, { strict: 'error' }], rehypeKatexStrict],
    }),
  },
});

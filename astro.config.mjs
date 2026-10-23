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
  // Lesson URLs used to start with a number; sorting now comes from `order` alone.
  redirects: {
    '/algebra/01-quadratic': '/algebra/quadratic-equations',
    // 指數與對數 was split into 指數與指數函數 and 對數與對數函數; both old URLs go to the first.
    '/algebra/02-exponents-logarithms': '/algebra/exponential-functions',
    '/algebra/exponents-logarithms': '/algebra/exponential-functions',
    '/algebra/03-sequences-series': '/algebra/sequences-series',
    '/trig/01-right-triangle': '/trig/right-triangle-trig',
    '/trig/02-unit-circle-radians': '/trig/unit-circle-radians',
    '/trig/03-solving-triangles': '/trig/solving-triangles',
    '/calculus/01-limits': '/calculus/limits',
    // 導數與極值 was split into 導數的定義與意義 and 極值與單調性; both old URLs go to the first.
    '/calculus/02-derivatives-extrema': '/calculus/derivatives',
    '/calculus/derivatives-extrema': '/calculus/derivatives',
    '/calculus/03-integrals': '/calculus/definite-integrals',
    '/linear/01-vectors-dot-product': '/linear/vectors-dot-product',
    '/linear/02-matrix-operations': '/linear/matrix-operations',
    '/linear/03-linear-systems': '/linear/linear-systems',
    '/linear/04-eigenvalues': '/linear/eigenvalues-eigenvectors',
  },
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

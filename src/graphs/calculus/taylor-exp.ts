import type { GraphDef } from '../types';

const factorial = (k: number): number => (k <= 1 ? 1 : k * factorial(k - 1));
const P = (n: number, x: number) => {
  let s = 0;
  for (let k = 0; k <= n; k++) s += x ** k / factorial(k);
  return s;
};
const num = (v: number) => String(+v.toFixed(5));
const term = (k: number) => (k === 0 ? '1' : k === 1 ? 'x' : `\\frac{x^{${k}}}{${k}!}`);

export default {
  title: 'eˣ 的泰勒多項式',
  description:
    '曲線 y = eˣ 和它的 n 次泰勒多項式 Pₙ(x) = 1 + x + x²/2! + … + xⁿ/n!。用滑桿把 n 從 0 增加到 8：n = 0 是水平線 y = 1，n = 1 是在 x = 0 的切線 y = 1 + x，之後的多項式在越來越寬的範圍內貼近 eˣ。下方顯示 x = 1 時 Pₙ(1) 和 e 的差距。',
  boundingBox: [-3.5, 9, 3.5, -3],
  // Wider than the 7 × 12 frame's own shape, so the y-direction is squeezed a little.
  aspect: 0.82,
  build(board, ctx) {
    const { color } = ctx;
    const sn = board.create('slider', [[0.3, -2.4], [2.2, -2.4], [0, 1, 8]], { name: 'n', snapWidth: 1, digits: 0 });
    const n = () => Math.round(sn.Value());

    board.create('functiongraph', [Math.exp, -3.5, 3.5], { fixed: true, strokeColor: color.accent, strokeWidth: 3 });
    board.create('functiongraph', [(x: number) => P(n(), x), -3.5, 3.5], { fixed: true, strokeColor: color.accent2, strokeWidth: 2.5 });
    board.create('point', [1, Math.E], { fixed: true, withLabel: false, size: 4, strokeColor: color.accent, fillColor: color.accent });
    board.create('point', [1, () => P(n(), 1)], { fixed: true, withLabel: false, size: 4, strokeColor: color.accent2, fillColor: color.accent2 });

    ctx.legend([
      { label: '$y=e^x$', color: color.accent, width: 3 },
      { label: '$y=P_n(x)$', color: color.accent2, width: 2.5 },
    ]);
    ctx.readout(() => {
      const terms = Array.from({ length: n() + 1 }, (_, k) => term(k));
      const shown = terms.length > 4 ? [...terms.slice(0, 3), '\\cdots', terms[terms.length - 1]] : terms;
      return `$n=${n()}$：$P_{${n()}}(x)=${shown.join('+')}$`;
    });
    ctx.readout(() => `$P_{${n()}}(1)=${num(P(n(), 1))}$，$e\\approx2.71828$，差距 $${num(Math.E - P(n(), 1))}$`);
  },
} satisfies GraphDef;

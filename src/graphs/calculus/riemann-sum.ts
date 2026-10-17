import type { GraphDef } from '../types';

const f = (x: number) => x * x;
const [a, b] = [0, 3];
// ∫₀³ x² dx = 3³/3 − 0 = 9.
const exact = b ** 3 / 3 - a ** 3 / 3;

export default {
  title: '黎曼和：用長方形逼近面積',
  description:
    '把 0 到 3 的區間切成 n 段，每段用右端點的高度 f(xᵢ) = xᵢ² 畫長方形。用滑桿增加 n，長方形面積的總和越來越接近 y = x² 底下的面積 ∫₀³ x² dx = 9，誤差越來越小。',
  boundingBox: [-0.6, 10.2, 3.6, -0.8],
  build(board, ctx) {
    const { color } = ctx;
    const sn = board.create('slider', [[0.1, 9.2], [1.6, 9.2], [1, 4, 50]], { name: 'n', snapWidth: 1, digits: 0 });
    const n = () => Math.round(sn.Value());

    const sum = board.create('riemannsum', [f, n, 'right', a, b], {
      fillColor: color.accent,
      fillOpacity: 0.25,
      strokeColor: color.accent,
      strokeWidth: 1,
    });
    board.create('functiongraph', [f, a - 0.3, b + 0.3], { strokeColor: color.ink });

    const fm = ctx.fmt;
    // JSXGraph's own sum, cross-checked against the closed form for right endpoints:
    // Σ (3i/n)² · 3/n = 27/n³ · n(n+1)(2n+1)/6.
    const formula = () => (27 / n() ** 3) * ((n() * (n() + 1) * (2 * n() + 1)) / 6);
    ctx.readout(() => `$n=${n()}$，$\\Delta x=\\dfrac{3}{n}=${fm(3 / n())}$，長方形面積和 $\\displaystyle\\sum_{i=1}^{n}f(x_i)\\,\\Delta x=${fm(sum.Value())}$`);
    ctx.readout(() => {
      const err = formula() - exact;
      if (Math.abs(sum.Value() - formula()) > 1e-6) console.error('riemann-sum: Riemann sum does not match its closed form.');
      return `精確值 $\\displaystyle\\int_0^3 x^2\\,dx=${fm(exact)}$，誤差 $${fm(err)}$`;
    });
  },
} satisfies GraphDef;

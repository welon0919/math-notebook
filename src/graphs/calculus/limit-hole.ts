import { snap } from '../helpers';
import type { GraphDef } from '../types';

const step = 0.01;
// (x² − 1)/(x − 1) = x + 1 for x ≠ 1, and is undefined at x = 1.
const f = (x: number) => (x * x - 1) / (x - 1);

export default {
  title: '極限：在洞的兩側靠近',
  description:
    'y = (x² − 1)/(x − 1) 的圖形是直線 y = x + 1 在 x = 1 挖掉一個洞，因為 f(1) 沒有定義。用滑桿縮小 h，兩個點從 x = 1 − h 和 x = 1 + h 兩側靠近，函數值都越來越接近 2，所以極限是 2。',
  boundingBox: [-2, 4.5, 4, 0],
  build(board, ctx) {
    const { color } = ctx;
    const sh = board.create('slider', [[-1.6, 4.0], [0.4, 4.0], [0.01, 0.8, 1]], { name: 'h', snapWidth: step, digits: 2 });
    const h = () => snap(sh.Value(), step);

    // Plot x + 1 (equal to f away from x = 1); the hole is drawn on top.
    board.create('functiongraph', [(x: number) => x + 1]);
    board.create('point', [1, 2], { fixed: true, withLabel: false, size: 5, strokeColor: color.accent, fillColor: color.bg, strokeWidth: 2 });

    const side = (sign: -1 | 1, c: string) => {
      const x = () => 1 + sign * h();
      const p = board.create('point', [x, () => f(x())], { fixed: true, withLabel: false, size: 4, strokeColor: c, fillColor: c });
      const dash = { strokeColor: c, strokeWidth: 1.5, dash: 2 };
      board.create('segment', [p, [x, () => 0]], dash);
      board.create('segment', [p, [() => 0, () => f(x())]], dash);
    };
    side(-1, color.accent2);
    side(1, color.highlight);
    board.create('segment', [[1, 0], [1, 2]], { fixed: true, strokeColor: color.muted, strokeWidth: 1, dash: 1 });

    const fm = ctx.fmt;
    ctx.readout(() => `$f(1-h)=f(${fm(1 - h())})=${fm(f(1 - h()))}$，$f(1+h)=f(${fm(1 + h())})=${fm(f(1 + h()))}$`);
    ctx.readout(() => '$f(1)$ 沒有定義，但兩側的值都越來越接近 $2$：$\\displaystyle\\lim_{x\\to 1}\\frac{x^2-1}{x-1}=2$。');
  },
} satisfies GraphDef;

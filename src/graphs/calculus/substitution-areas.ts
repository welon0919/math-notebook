import { shadeUnder, snap } from '../helpers';
import type { GraphDef } from '../types';

const step = 0.05;
const f = (x: number) => 2 * x * (x * x + 1) ** 3;
const cube = (u: number) => u ** 3;
// The right panel's u-axis starts at x = shift, so u is drawn at x = shift + u.
const shift = 1.6;
const num = (v: number) => String(+v.toFixed(3));

export default {
  title: '變數變換：兩塊面積相等',
  description:
    '左邊是 y = 2x(x² + 1)³ 在 0 ≤ x ≤ b 之間的面積，右邊（另一組坐標軸，橫軸是 u）是 y = u³ 在 1 ≤ u ≤ b² + 1 之間的面積，兩邊縱軸的比例相同。用滑桿改變 b，兩塊面積形狀不同，但大小永遠相等：令 u = x² + 1，左邊的積分就變成右邊的積分。b = 1 時兩塊都是 15/4。',
  boundingBox: [-0.35, 26, 4.2, -3.5],
  aspect: 1.1,
  axis: false,
  build(board, ctx) {
    const { color } = ctx;
    const sb = board.create('slider', [[1.9, 23], [3.2, 23], [0.1, 1, 1.1]], { name: 'b', snapWidth: step, digits: 2 });
    const b = () => snap(sb.Value(), step);
    const u1 = () => b() * b() + 1;

    const thin = { fixed: true, strokeColor: color.muted, strokeWidth: 1 };
    const tick = { fixed: true, fontSize: 11, strokeColor: color.muted };
    const axes = (x0: number, len: number, name: string, ticks: [number, string][]) => {
      board.create('arrow', [[x0, 0], [x0 + len, 0]], thin);
      board.create('arrow', [[x0, 0], [x0, 25]], thin);
      board.create('text', [x0 + len, 0.4, ctx.tex(name)], { ...tick, fontSize: 13, anchorX: 'right', anchorY: 'bottom' });
      for (const [x, label] of ticks) {
        board.create('segment', [[x0 + x, -0.3], [x0 + x, 0.3]], thin);
        board.create('text', [x0 + x, -0.6, label], { ...tick, anchorX: 'middle', anchorY: 'top' });
      }
    };
    axes(0, 1.35, 'x', [[0.5, '0.5'], [1, '1']]);
    axes(shift, 2.5, 'u', [[1, '1'], [2, '2']]);
    for (const v of [10, 20]) {
      board.create('segment', [[-0.03, v], [0.03, v]], thin);
      board.create('text', [-0.05, v, String(v)], { ...tick, anchorX: 'right', anchorY: 'middle' });
    }

    shadeUnder(board, f, () => 0, b, { fillColor: color.accent, fillOpacity: 0.35 });
    board.create('functiongraph', [f, 0, 1.15], { fixed: true, strokeColor: color.accent, strokeWidth: 3 });
    shadeUnder(board, (x: number) => cube(x - shift), () => shift + 1, () => shift + u1(), { fillColor: color.accent2, fillOpacity: 0.35 });
    board.create('functiongraph', [(x: number) => cube(x - shift), shift, shift + 2.3], { fixed: true, strokeColor: color.accent2, strokeWidth: 3 });

    // Antiderivatives: (x² + 1)⁴/4 and u⁴/4.
    const left = () => ((b() * b() + 1) ** 4 - 1) / 4;
    const right = () => (u1() ** 4 - 1) / 4;
    ctx.legend([
      { label: '$y=2x(x^2+1)^3$，$0\\le x\\le b$', color: color.accent, width: 3 },
      { label: '$y=u^3$，$1\\le u\\le b^2+1$', color: color.accent2, width: 3 },
    ]);
    ctx.readout(() => `$b=${num(b())}$，$b^2+1=${num(u1())}$`);
    ctx.readout(() => `左邊面積 $${num(left())}$，右邊面積 $${num(right())}$`);
  },
} satisfies GraphDef;

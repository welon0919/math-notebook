import { snap } from '../helpers';
import type { GraphDef } from '../types';

const step = 0.1;
const side = 30;
const V = (x: number) => x * (side - 2 * x) ** 2;
const num = (v: number) => String(+v.toFixed(2));

// Left panel: the 30 × 30 sheet at 1/10 scale, in [0, 3]². Right panel: V(x), x from 0 to 15.
const s = 0.1;
const [gx, gw, gh] = [4.2, 3.6, 3.0];
const px = (x: number) => gx + (x / 15) * gw;
const py = (v: number) => (v / 2400) * gh;

export default {
  title: '無蓋紙盒的體積',
  description:
    '左邊是 30 公分見方的紙板，四個角剪掉邊長 x 的正方形（深色），沿虛線折起來就是無蓋的盒子，底是邊長 30 − 2x 的正方形，高是 x。右邊是體積 V(x) = x(30 − 2x)² 的圖形，從 x = 0 到 15。用滑桿改變 x，左邊的剪法和右邊圖形上的點同步移動。x = 5 時體積最大，2000 立方公分；x 接近 0 或 15 時體積都接近 0。',
  boundingBox: [-0.3, 3.5, 8.2, -0.9],
  aspect: 8.5 / 4.4,
  axis: false,
  build(board, ctx) {
    const { color } = ctx;
    const sx = board.create('slider', [[0.3, -0.55], [2.7, -0.55], [0.5, 2.5, 14.5]], { name: 'x', snapWidth: step, digits: 1 });
    const x = () => snap(sx.Value(), step);
    const c = () => x() * s;

    const fixed = { fixed: true, highlight: false };
    const corner = (left: boolean, bottom: boolean) => {
      const x0 = () => (left ? 0 : 3 - c());
      const y0 = () => (bottom ? 0 : 3 - c());
      const pts = [[x0, y0], [() => x0() + c(), y0], [() => x0() + c(), () => y0() + c()], [x0, () => y0() + c()]];
      board.create('polygon', pts.map((xy) => board.create('point', xy, { visible: false, fixed: true })), {
        ...fixed,
        vertices: { visible: false },
        fillColor: color.ink,
        fillOpacity: 0.55,
        borders: { strokeColor: color.ink, strokeWidth: 1 },
      });
    };
    board.create('polygon', [[0, 0], [3, 0], [3, 3], [0, 3]].map((xy) => board.create('point', xy, { visible: false, fixed: true })), {
      ...fixed,
      vertices: { visible: false },
      fillColor: color.accent,
      fillOpacity: 0.15,
      borders: { strokeColor: color.ink, strokeWidth: 1.5 },
    });
    for (const l of [true, false]) for (const b of [true, false]) corner(l, b);
    const fold = { ...fixed, strokeColor: color.accent, strokeWidth: 1.5, dash: 2 };
    board.create('segment', [[c, c], [() => 3 - c(), c]], fold);
    board.create('segment', [[c, () => 3 - c()], [() => 3 - c(), () => 3 - c()]], fold);
    board.create('segment', [[c, c], [c, () => 3 - c()]], fold);
    board.create('segment', [[() => 3 - c(), c], [() => 3 - c(), () => 3 - c()]], fold);
    board.create('text', [1.5, 1.5, () => ctx.tex(`${num(side - 2 * x())}`)], { ...fixed, anchorX: 'middle', anchorY: 'middle', fontSize: 13 });
    board.create('text', [() => c() / 2, () => 3 + 0.05, ctx.tex('x')], { ...fixed, anchorX: 'middle', anchorY: 'bottom', fontSize: 13 });

    // V(x) panel.
    const thin = { ...fixed, strokeColor: color.muted, strokeWidth: 1 };
    board.create('arrow', [[gx, 0], [gx + gw + 0.3, 0]], thin);
    board.create('arrow', [[gx, 0], [gx, gh + 0.3]], thin);
    const tick = { ...fixed, fontSize: 11, strokeColor: color.muted };
    for (const t of [5, 10, 15]) board.create('text', [px(t), -0.08, String(t)], { ...tick, anchorX: 'middle', anchorY: 'top' });
    for (const v of [1000, 2000]) {
      board.create('segment', [[gx - 0.05, py(v)], [gx + 0.05, py(v)]], thin);
      board.create('text', [gx - 0.08, py(v), String(v)], { ...tick, anchorX: 'right', anchorY: 'middle' });
    }
    board.create('text', [gx + gw + 0.3, 0.05, ctx.tex('x')], { ...tick, fontSize: 13, anchorX: 'right', anchorY: 'bottom' });
    board.create('text', [gx + 0.08, gh + 0.3, ctx.tex('V')], { ...tick, fontSize: 13, anchorX: 'left', anchorY: 'top' });
    board.create('curve', [(t: number) => px(t), (t: number) => py(V(t)), 0, 15], { ...fixed, strokeColor: color.accent, strokeWidth: 3 });
    board.create('point', [() => px(x()), () => py(V(x()))], { ...fixed, withLabel: false, size: 5, strokeColor: color.accent2, fillColor: color.accent2 });
    board.create('segment', [[() => px(x()), 0], [() => px(x()), () => py(V(x()))]], { ...fixed, strokeColor: color.accent2, strokeWidth: 1, dash: 1 });

    ctx.readout(() => `$x=${num(x())}$：底的邊長 $30-2x=${num(side - 2 * x())}$，高 $${num(x())}$，體積 $V=${num(V(x()))}$`);
    ctx.readout(() =>
      Math.abs(x() - 5) < 1e-9 ? '$x=5$：體積最大，$2000$ 立方公分。' : '拖動滑桿找找看，體積最大是多少？',
    );
  },
} satisfies GraphDef;

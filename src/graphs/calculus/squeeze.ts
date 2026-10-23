import { snap } from '../helpers';
import type { GraphDef } from '../types';

const step = 0.01;
const f = (x: number) => (x === 0 ? 0 : x * x * Math.sin(1 / x));

/** Small values without rounding them away: 0.0004 stays 0.0004. */
const num = (v: number) => (Math.abs(v) < 1e-12 ? '0' : String(+v.toPrecision(3)));

export default {
  title: '夾擠定理：x² sin(1/x) 被夾在 −x² 和 x² 之間',
  description:
    '實線是 y = x² sin(1/x)，靠近 x = 0 時振盪得越來越快；上下兩條曲線是 y = x² 和 y = −x²。因為 −1 ≤ sin(1/x) ≤ 1，中間的曲線永遠夾在兩條拋物線之間，碰到時剛好是 sin(1/x) = ±1 的地方。用滑桿縮小 x，三個點的高度都被擠向 0，下方顯示三個值。',
  boundingBox: [-1.25, 1.5, 1.25, -0.95],
  aspect: 2.5 / 2.45,
  axis: false,
  build(board, ctx) {
    const { color } = ctx;
    const sx = board.create('slider', [[-0.45, 1.36], [0.35, 1.36], [0.02, 0.6, 1]], { name: 'x', snapWidth: step, digits: 2 });
    const x = () => snap(sx.Value(), step);

    // Axes with a few numbers: the default ticks every 0.2 crowd a phone-width graph.
    const thin = { fixed: true, strokeColor: color.muted, strokeWidth: 1 };
    board.create('arrow', [[-1.2, 0], [1.2, 0]], thin);
    board.create('arrow', [[0, -0.9], [0, 1.2]], thin);
    const tick = { fixed: true, fontSize: 11, strokeColor: color.muted };
    for (const v of [-1, -0.5, 0.5, 1]) {
      board.create('segment', [[v, -0.02], [v, 0.02]], thin);
      board.create('text', [v, -0.04, String(v)], { ...tick, anchorX: 'middle', anchorY: 'top' });
      board.create('segment', [[-0.02, v], [0.02, v]], thin);
      if (v > -0.9) board.create('text', [-0.04, v, String(v)], { ...tick, anchorX: 'right', anchorY: 'middle' });
    }

    const bound = { fixed: true, strokeWidth: 2 };
    board.create('functiongraph', [(t: number) => t * t, -1.2, 1.2], { ...bound, strokeColor: color.accent2 });
    board.create('functiongraph', [(t: number) => -t * t, -1.2, 1.2], { ...bound, strokeColor: color.highlight });
    // Sampled densely: near 0 the curve turns faster than the adaptive plot can follow.
    const n = 6000;
    const xs = Array.from({ length: n + 1 }, (_, i) => -1.2 + (2.4 * i) / n);
    board.create('curve', [xs, xs.map(f)], { fixed: true, strokeColor: color.accent, strokeWidth: 2 });

    const dot = (y: () => number, c: string) =>
      board.create('point', [x, y], { fixed: true, withLabel: false, size: 4, strokeColor: c, fillColor: c });
    board.create('segment', [[x, () => -x() * x()], [x, () => x() * x()]], { fixed: true, strokeColor: color.muted, strokeWidth: 1, dash: 2 });
    dot(() => x() * x(), color.accent2);
    dot(() => -x() * x(), color.highlight);
    dot(() => f(x()), color.accent);

    ctx.legend([
      { label: '$y=x^2\\sin\\frac1x$', color: color.accent, width: 2 },
      { label: '$y=x^2$', color: color.accent2, width: 2 },
      { label: '$y=-x^2$', color: color.highlight, width: 2 },
    ]);
    ctx.readout(() => `$-x^2=${num(-x() * x())}\\le x^2\\sin\\frac1x=${num(f(x()))}\\le x^2=${num(x() * x())}$`);
    ctx.readout(() => '$x\\to0$ 時兩邊的 $\\pm x^2$ 都趨近 $0$，夾在中間的 $x^2\\sin\\frac1x$ 也只能趨近 $0$。');
  },
} satisfies GraphDef;

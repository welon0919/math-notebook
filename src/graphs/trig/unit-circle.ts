import { piTicks, toDegrees } from '../helpers';
import type { GraphDef } from '../types';

// The waves start at x0 and squeeze one period, 0 ≤ θ ≤ 2π, into length L
// (horizontally only; heights are the true sin and cos values, same scale as the circle).
const x0 = 1.6;
const L = 3.8;
const k = L / (2 * Math.PI);

export default {
  title: '單位圓與正弦、餘弦的波形',
  description:
    '在單位圓上拖動點 P，角 θ 從正 x 軸逆時針量起。P 的 y 坐標是 sin θ、x 坐標是 cos θ；右邊同步畫出 y = sin θ 與 y = cos θ 在一個週期 0 到 2π 的波形，並標出目前的 θ。',
  boundingBox: [-1.4, 1.75, 5.6, -1.75],
  aspect: 2,
  axis: false,
  build(board, ctx) {
    const { color } = ctx;
    const thin = { fixed: true, strokeColor: color.muted, strokeWidth: 1 };
    board.create('segment', [[-1.3, 0], [1.3, 0]], thin);
    board.create('segment', [[0, -1.3], [0, 1.3]], thin);
    board.create('segment', [[x0, 0], [x0 + L + 0.15, 0]], thin);
    board.create('segment', [[x0, -1.3], [x0, 1.3]], thin);
    piTicks(board, ctx, { x0, y: 0, scale: k, from: 1, to: 4, tick: 0.05 });
    board.create('circle', [[0, 0], 1], { fixed: true, strokeColor: color.ink, strokeWidth: 2 });

    const O = board.create('point', [0, 0], { visible: false, fixed: true });
    const X = board.create('point', [1, 0], { visible: false, fixed: true });
    const P = board.create('point', [Math.cos(Math.PI / 6), Math.sin(Math.PI / 6)], { name: 'P', label: { offset: [8, 8] } });
    // Keep P on the circle at a whole number of degrees, so special angles like 30° are exact.
    const degrees = () => {
      const d = Math.round(toDegrees(Math.atan2(P.Y(), P.X())));
      return ((d % 360) + 360) % 360;
    };
    P.on('drag', () => {
      const t = (degrees() * Math.PI) / 180;
      P.moveTo([Math.cos(t), Math.sin(t)]);
    });
    const theta = () => (degrees() * Math.PI) / 180;

    board.create('angle', [X, O, P], { radius: 0.3, name: ctx.tex('\\theta'), fillOpacity: 0.2 });
    board.create('segment', [O, P], { strokeColor: color.ink, strokeWidth: 2 });
    const foot = board.create('point', [() => P.X(), 0], { visible: false, fixed: true });
    board.create('segment', [P, foot], { strokeColor: color.accent, strokeWidth: 4 });
    board.create('segment', [O, foot], { strokeColor: color.accent2, strokeWidth: 4 });

    const curve = (fn: (t: number) => number, c: string) =>
      board.create('curve', [(t: number) => x0 + k * t, fn, 0, 2 * Math.PI], { strokeColor: c, strokeWidth: 2.5 });
    curve(Math.sin, color.accent);
    curve(Math.cos, color.accent2);
    const tex = (x: number, y: number, latex: string, c: string) =>
      board.create('text', [x, y, ctx.tex(latex)], { anchorX: 'middle', anchorY: 'middle', fixed: true, strokeColor: c, fontSize: 13 });
    tex(x0 + k * (Math.PI / 2), 1.22, 'y=\\sin\\theta', color.accent);
    tex(x0 + k * Math.PI, -1.22, 'y=\\cos\\theta', color.accent2);

    const S = board.create('point', [() => x0 + k * theta(), () => Math.sin(theta())], { fixed: true, withLabel: false, size: 4, strokeColor: color.accent, fillColor: color.accent });
    const Cw = board.create('point', [() => x0 + k * theta(), () => Math.cos(theta())], { fixed: true, withLabel: false, size: 4, strokeColor: color.accent2, fillColor: color.accent2 });
    // P and its point on the sine wave are at the same height.
    board.create('segment', [P, S], { strokeColor: color.muted, strokeWidth: 1, dash: 2 });
    board.create('segment', [S, Cw], { strokeColor: color.muted, strokeWidth: 1, dash: 2 });

    const f = ctx.fmt;
    ctx.readout(() => `$\\theta=${degrees()}^\\circ=${f(theta())}$ 弧度`);
    ctx.readout(() => `$\\sin\\theta=${f(Math.sin(theta()))}$（$P$ 的 $y$ 坐標），$\\cos\\theta=${f(Math.cos(theta()))}$（$P$ 的 $x$ 坐標）`);
  },
} satisfies GraphDef;

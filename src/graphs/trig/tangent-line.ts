import { piTicks, toDegrees } from '../helpers';
import type { GraphDef } from '../types';

const num = (v: number) => String(+v.toFixed(2));
// Within this many degrees of a multiple of 30° or 45°, P lands exactly on it.
const magnetDeg = 1.5;
// The curve starts at x0 and shows -π/2 ≤ θ ≤ 3π/2 squeezed horizontally by k (heights are true values).
const x0 = 2.4;
const k = 0.55;
const top = 2.3;

export default {
  title: '正切：單位圓上的切線長',
  description:
    '左邊是單位圓和它在 (1, 0) 的切線 x = 1。沿著圓拖動點 P，直線 OP 延長後和切線交於 T，T 的高度就是 tan θ。右邊同步畫出 y = tan θ 在 −π/2 到 3π/2 的圖形，虛線是 θ = π/2 和 3π/2 等鉛直漸近線。θ 接近 90° 或 270° 時 OP 幾乎和切線平行，T 跑到畫面外，箭頭指出它的方向；正好 90° 或 270° 時兩線平行，tan θ 無定義。',
  boundingBox: [-1.4, 2.5, 6.1, -2.5],
  aspect: 1.5,
  axis: false,
  build(board, ctx) {
    const { color } = ctx;
    const thin = { fixed: true, strokeColor: color.muted, strokeWidth: 1, highlight: false };
    board.create('segment', [[-1.3, 0], [1.6, 0]], thin);
    board.create('segment', [[0, -1.3], [0, 1.3]], thin);
    board.create('circle', [[0, 0], 1], { fixed: true, strokeColor: color.ink, strokeWidth: 2, highlight: false });
    // The tangent line x = 1.
    board.create('segment', [[1, -top], [1, top]], { fixed: true, strokeColor: color.accent2, strokeWidth: 1.5, highlight: false });

    // The graph's axes, with asymptotes at θ = ±π/2, 3π/2.
    const gx = (t: number) => x0 + k * t;
    board.create('segment', [[gx(-Math.PI / 2) - 0.1, 0], [gx((3 * Math.PI) / 2) + 0.1, 0]], thin);
    board.create('segment', [[x0, -top], [x0, top]], thin);
    piTicks(board, ctx, { x0, y: 0, scale: k, from: -1, to: 3, tick: 0.05 });
    for (const t of [-Math.PI / 2, Math.PI / 2, (3 * Math.PI) / 2]) {
      board.create('segment', [[gx(t), -top], [gx(t), top]], { ...thin, dash: 2 });
    }
    // Branches stop where tan leaves the frame, so nothing is drawn across an asymptote.
    const branch = (center: number) => {
      const reach = Math.atan(top);
      board.create('curve', [(t: number) => gx(t), (t: number) => Math.tan(t), center - reach, center + reach], {
        strokeColor: color.accent,
        strokeWidth: 2.5,
        fixed: true,
        highlight: false,
      });
    };
    branch(0);
    branch(Math.PI);

    const O = board.create('point', [0, 0], { visible: false, fixed: true });
    const X = board.create('point', [1, 0], { visible: false, fixed: true });
    const start = Math.PI / 4 + 0.35;
    const P = board.create('point', [Math.cos(start), Math.sin(start)], { name: 'P', size: 4, label: { offset: [-14, 10] } });
    // θ runs from -90° to 270°, the range the graph shows.
    let theta = start;
    P.on('drag', () => {
      let t = Math.atan2(P.Y(), P.X());
      if (t < -Math.PI / 2) t += 2 * Math.PI;
      const deg = toDegrees(t);
      for (const target of [30, 45]) {
        const near = Math.round(deg / target) * target;
        if (Math.abs(deg - near) < magnetDeg) {
          t = (near * Math.PI) / 180;
          break;
        }
      }
      theta = t;
      P.moveTo([Math.cos(t), Math.sin(t)]);
    });

    const undefinedTan = () => Math.abs(Math.cos(theta)) < 1e-9;
    const tan = () => Math.tan(theta);
    const inFrame = () => !undefinedTan() && Math.abs(tan()) <= top;

    board.create('angle', [X, O, P], {
      radius: 0.25,
      name: ctx.tex('\\theta'),
      strokeColor: color.accent,
      fillColor: color.accent,
      fillOpacity: 0.1,
      label: { strokeColor: color.accent },
    });
    board.create('segment', [O, P], { strokeColor: color.ink, strokeWidth: 2, fixed: true, highlight: false });
    // OP extended (through O when P is on the left half) to the tangent line.
    const reachT = (): [number, number] => {
      if (undefinedTan()) return [P.X(), P.Y()];
      const y = Math.max(-top, Math.min(top, tan()));
      return [1, y];
    };
    board.create('segment', [O, [() => reachT()[0], () => reachT()[1]]], {
      strokeColor: color.muted,
      strokeWidth: 1.5,
      dash: 2,
      fixed: true,
      highlight: false,
      visible: () => !undefinedTan(),
    });
    board.create('segment', [X, [1, () => (inFrame() ? tan() : 0)]], {
      strokeColor: color.accent,
      strokeWidth: 5,
      fixed: true,
      highlight: false,
      visible: inFrame,
    });
    board.create('point', [1, () => tan()], {
      fixed: true,
      name: 'T',
      size: 4,
      strokeColor: color.accent,
      fillColor: color.accent,
      label: { offset: [8, 0], strokeColor: color.accent },
      visible: inFrame,
    });
    // When T is outside the frame, an arrow at the edge of the tangent line points to it.
    board.create('arrow', [[1.2, () => (tan() > 0 ? top - 0.5 : -top + 0.5)], [1.2, () => (tan() > 0 ? top : -top)]], {
      strokeColor: color.accent,
      strokeWidth: 2.5,
      fixed: true,
      highlight: false,
      visible: () => !undefinedTan() && !inFrame(),
    });

    board.create('point', [() => gx(theta), () => tan()], {
      fixed: true,
      withLabel: false,
      size: 4,
      strokeColor: color.accent,
      fillColor: color.accent,
      visible: inFrame,
    });
    board.create('segment', [[1, () => tan()], [() => gx(theta), () => tan()]], {
      strokeColor: color.muted,
      strokeWidth: 1,
      dash: 2,
      fixed: true,
      highlight: false,
      visible: inFrame,
    });

    ctx.legend([
      { label: '切線 $x=1$', color: color.accent2, width: 1.5 },
      { label: '$\\tan\\theta$：$T$ 的高度', color: color.accent, width: 4 },
      { label: '漸近線', color: color.muted, dash: true },
    ]);
    ctx.readout(() => `$\\theta=${num(toDegrees(theta))}^\\circ=${num(theta)}$ 弧度`);
    ctx.readout(() => {
      if (undefinedTan()) return '$OP$ 和切線 $x=1$ 平行，沒有交點：$\\tan\\theta$ 無定義（圖形上是漸近線）。';
      const where = inFrame() ? `$T(1,\\ ${num(tan())})$` : `$T$ 在畫面${tan() > 0 ? '上' : '下'}方，坐標 $(1,\\ ${num(tan())})$`;
      return `${where}，$\\tan\\theta=\\dfrac{\\sin\\theta}{\\cos\\theta}=${num(tan())}$`;
    });
  },
} satisfies GraphDef;

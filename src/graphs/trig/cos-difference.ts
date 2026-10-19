import { toDegrees } from '../helpers';
import type { GraphDef } from '../types';

const num = (v: number) => String(+v.toFixed(2));
// Within this many degrees of a multiple of 15°, a dragged point lands exactly on it.
const magnetDeg = 1.5;

export default {
  title: '轉動弦長不變：推導 cos(α − β)',
  description:
    '單位圓上拖動兩點 A（角 α）和 B（角 β），弦 AB 畫成實線。按「播放」，A、B 一起繞原點轉 −β，B 轉到 (1, 0)，A 轉到角 α − β 的點 A′；弦 A′B′ 和弦 AB 一樣長。下方用兩點距離公式分別算出兩條弦長的平方：|AB|² = 2 − 2(cos α cos β + sin α sin β)，|A′B′|² = 2 − 2 cos(α − β)，兩者相等。',
  boundingBox: [-1.6, 1.2, 1.6, -1.2],
  axis: false,
  build(board, ctx) {
    const { color } = ctx;
    let alpha = (110 * Math.PI) / 180;
    let beta = (35 * Math.PI) / 180;
    // How far the rotation by −β has played.
    let t = 0;

    const thin = { fixed: true, strokeColor: color.muted, strokeWidth: 1, highlight: false };
    board.create('arrow', [[-1.5, 0], [1.5, 0]], thin);
    board.create('arrow', [[0, -1.15], [0, 1.15]], thin);
    board.create('circle', [[0, 0], 1], { fixed: true, strokeColor: color.ink, strokeWidth: 2, highlight: false });

    const draggable = (angle: () => number, set: (v: number) => void, name: string) => {
      const p = board.create('point', [Math.cos(angle()), Math.sin(angle())], { name, size: 4, label: { offset: [8, 8] } });
      p.on('drag', () => {
        let v = Math.atan2(p.Y(), p.X());
        const deg = toDegrees(v);
        const near = Math.round(deg / 15) * 15;
        if (Math.abs(deg - near) < magnetDeg) v = (near * Math.PI) / 180;
        set(v);
        t = 0;
        p.moveTo([Math.cos(v), Math.sin(v)]);
      });
      return p;
    };
    const A = draggable(() => alpha, (v) => (alpha = v), 'A');
    const B = draggable(() => beta, (v) => (beta = v), 'B');
    const O = board.create('point', [0, 0], { visible: false, fixed: true });
    board.create('segment', [O, A], { ...thin, strokeColor: color.accent, strokeWidth: 1.5 });
    board.create('segment', [O, B], { ...thin, strokeColor: color.accent, strokeWidth: 1.5 });
    board.create('segment', [A, B], { fixed: true, strokeColor: color.accent, strokeWidth: 3, highlight: false });

    // The rotated copy: both angles minus t·β.
    const a2 = () => alpha - t * beta;
    const b2 = () => beta - t * beta;
    const A2 = board.create('point', [() => Math.cos(a2()), () => Math.sin(a2())], {
      fixed: true,
      name: "A'",
      size: 4,
      strokeColor: color.accent2,
      fillColor: color.accent2,
      label: { offset: [8, -12], strokeColor: color.accent2 },
      visible: () => t > 0.02,
    });
    const B2 = board.create('point', [() => Math.cos(b2()), () => Math.sin(b2())], {
      fixed: true,
      name: "B'",
      size: 4,
      strokeColor: color.accent2,
      fillColor: color.accent2,
      label: { offset: [8, -12], strokeColor: color.accent2 },
      visible: () => t > 0.02,
    });
    board.create('segment', [A2, B2], { fixed: true, strokeColor: color.accent2, strokeWidth: 3, highlight: false, visible: () => t > 0.02 });
    board.create('segment', [O, A2], { ...thin, strokeColor: color.accent2, strokeWidth: 1.5, visible: () => t > 0.02 });
    board.create('segment', [O, B2], { ...thin, strokeColor: color.accent2, strokeWidth: 1.5, visible: () => t > 0.02 });

    const playTo = (target: 0 | 1) => {
      const from = t;
      ctx.animate(1600 * Math.abs(target - from), (p) => {
        t = from + (target - from) * p;
      });
    };
    ctx.button('▶ 播放', () => playTo(1));
    ctx.button('◀ 倒轉', () => playTo(0));
    ctx.legend([
      { label: '弦 $AB$', color: color.accent, width: 3 },
      { label: "轉 $-\\beta$ 後的弦 $A'B'$", color: color.accent2, width: 3 },
    ]);

    const deg = (v: number) => {
      const d = toDegrees(v);
      return num(d < 0 ? d + 360 : d);
    };
    ctx.readout(() => `$\\alpha=${deg(alpha)}^\\circ$，$\\beta=${deg(beta)}^\\circ$，$\\alpha-\\beta=${num(toDegrees(alpha - beta))}^\\circ$`);
    ctx.readout(() => {
      const inner = Math.cos(alpha) * Math.cos(beta) + Math.sin(alpha) * Math.sin(beta);
      return `$|AB|^2=2-2(\\cos\\alpha\\cos\\beta+\\sin\\alpha\\sin\\beta)=${num(2 - 2 * inner)}$`;
    });
    ctx.readout(() => `$|A'B'|^2=2-2\\cos(\\alpha-\\beta)=${num(2 - 2 * Math.cos(alpha - beta))}$` + (t > 0.999 ? "（$B'$ 在 $(1,0)$，$A'$ 是角 $\\alpha-\\beta$ 的點）" : ''));
  },
} satisfies GraphDef;

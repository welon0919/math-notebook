import { toDegrees } from '../helpers';
import type { GraphDef } from '../types';

const num = (v: number) => String(+v.toFixed(2));
// Within this many degrees of a multiple of 30° or 45°, P lands exactly on it.
const magnetDeg = 1.5;

const relations = [
  {
    button: '−θ',
    angle: '-\\theta',
    map: (x: number, y: number): [number, number] => [x, -y],
    how: '對 $x$ 軸鏡射',
    result: '$\\sin(-\\theta)=-\\sin\\theta$，$\\cos(-\\theta)=\\cos\\theta$，$\\tan(-\\theta)=-\\tan\\theta$',
    mirror: [[-1.4, 0], [1.4, 0]],
  },
  {
    button: 'π − θ',
    angle: '\\pi-\\theta',
    map: (x: number, y: number): [number, number] => [-x, y],
    how: '對 $y$ 軸鏡射',
    result: '$\\sin(\\pi-\\theta)=\\sin\\theta$，$\\cos(\\pi-\\theta)=-\\cos\\theta$，$\\tan(\\pi-\\theta)=-\\tan\\theta$',
    mirror: [[0, -1.25], [0, 1.25]],
  },
  {
    button: 'π/2 − θ',
    angle: '\\frac{\\pi}{2}-\\theta',
    map: (x: number, y: number): [number, number] => [y, x],
    how: '對直線 $y=x$ 鏡射（$x$、$y$ 坐標對調）',
    result: '$\\sin\\left(\\frac{\\pi}{2}-\\theta\\right)=\\cos\\theta$，$\\cos\\left(\\frac{\\pi}{2}-\\theta\\right)=\\sin\\theta$，$\\tan\\left(\\frac{\\pi}{2}-\\theta\\right)=\\cot\\theta$',
    mirror: [[-1.2, -1.2], [1.2, 1.2]],
  },
  {
    button: 'π + θ',
    angle: '\\pi+\\theta',
    map: (x: number, y: number): [number, number] => [-x, -y],
    how: '繞原點轉半圈',
    result: '$\\sin(\\pi+\\theta)=-\\sin\\theta$，$\\cos(\\pi+\\theta)=-\\cos\\theta$，$\\tan(\\pi+\\theta)=\\tan\\theta$',
    mirror: null,
  },
] as const;

export default {
  title: '負角、補角、餘角：單位圓上的對稱',
  description:
    '單位圓上，沿著圓拖動點 P，它對應角 θ。上方「關係」一列選擇 −θ、π − θ、π/2 − θ 或 π + θ，點 Q 是對應這個角的點：−θ 是 P 對 x 軸鏡射，π − θ 是對 y 軸鏡射，π/2 − θ 是對直線 y = x 鏡射，π + θ 是繞原點轉半圈。鏡射用的直線畫成虛線。下方比較 P 和 Q 的坐標，並寫出由此得到的公式。接近 30° 或 45° 的倍數時 P 會自動對齊。',
  boundingBox: [-1.6, 1.2, 1.6, -1.2],
  axis: false,
  build(board, ctx) {
    const { color } = ctx;
    let which = 1;
    const rel = () => relations[which];

    const thin = { fixed: true, strokeColor: color.muted, strokeWidth: 1, highlight: false };
    board.create('arrow', [[-1.5, 0], [1.5, 0]], thin);
    board.create('arrow', [[0, -1.15], [0, 1.15]], thin);
    board.create('circle', [[0, 0], 1], { fixed: true, strokeColor: color.ink, strokeWidth: 2, highlight: false });
    const end = (i: 0 | 1, j: 0 | 1) => () => rel().mirror?.[i][j] ?? 0;
    board.create('segment', [[end(0, 0), end(0, 1)], [end(1, 0), end(1, 1)]], {
      fixed: true,
      strokeColor: color.highlight,
      strokeWidth: 2,
      dash: 3,
      highlight: false,
      visible: () => rel().mirror !== null,
    });

    const O = board.create('point', [0, 0], { visible: false, fixed: true });
    const X = board.create('point', [1, 0], { visible: false, fixed: true });
    const start = (40 * Math.PI) / 180;
    const P = board.create('point', [Math.cos(start), Math.sin(start)], { name: 'P', size: 4, label: { offset: [8, 8] } });
    P.on('drag', () => {
      let t = Math.atan2(P.Y(), P.X());
      const deg = toDegrees(t);
      for (const target of [30, 45]) {
        const near = Math.round(deg / target) * target;
        if (Math.abs(deg - near) < magnetDeg) {
          t = (near * Math.PI) / 180;
          break;
        }
      }
      P.moveTo([Math.cos(t), Math.sin(t)]);
    });
    const q = () => rel().map(P.X(), P.Y());
    const Q = board.create('point', [() => q()[0], () => q()[1]], {
      fixed: true,
      name: 'Q',
      size: 4,
      strokeColor: color.accent2,
      fillColor: color.accent2,
      label: { offset: [8, 8], strokeColor: color.accent2 },
    });

    board.create('angle', [X, O, P], {
      radius: 0.22,
      name: ctx.tex('\\theta'),
      strokeColor: color.accent,
      fillColor: color.accent,
      fillOpacity: 0.12,
      label: { strokeColor: color.accent },
    });
    board.create('segment', [O, P], { fixed: true, strokeColor: color.accent, strokeWidth: 2.5, highlight: false });
    board.create('segment', [O, Q], { fixed: true, strokeColor: color.accent2, strokeWidth: 2.5, highlight: false });
    board.create('segment', [P, Q], { fixed: true, strokeColor: color.muted, strokeWidth: 1, dash: 2, highlight: false });

    relations.forEach((r, i) =>
      ctx.button(
        r.button,
        () => {
          which = i;
          board.update();
        },
        { row: '關係', pressed: () => which === i },
      ),
    );
    ctx.legend([
      { label: '$P$：角 $\\theta$', color: color.accent, width: 2.5 },
      { label: '$Q$：選擇的角', color: color.accent2, width: 2.5 },
    ]);

    const clean = (v: number) => (Math.abs(v) < 1e-9 ? 0 : v);
    ctx.readout(() => {
      const t = toDegrees(Math.atan2(P.Y(), P.X()));
      return `$\\theta=${num(t < 0 ? t + 360 : t)}^\\circ$，$P(\\cos\\theta,\\sin\\theta)=(${num(clean(P.X()))},\\ ${num(clean(P.Y()))})$`;
    });
    ctx.readout(() => `角 $${rel().angle}$ 的點 $Q$ 是 $P$ ${rel().how}：$Q(${num(clean(q()[0]))},\\ ${num(clean(q()[1]))})$`);
    ctx.readout(() => `所以 ${rel().result}`);
  },
} satisfies GraphDef;

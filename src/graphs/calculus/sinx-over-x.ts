import { snap } from '../helpers';
import type { GraphDef } from '../types';

const step = 0.01;

export default {
  title: '重要極限：三塊面積的夾擠',
  description:
    '單位圓上 A = (1, 0)、P = (cos x, sin x)，延長 OP 交過 A 的垂直線於 T = (1, tan x)。三角形 OAP 在扇形 OAP 裡面，扇形又在三角形 OAT 裡面，所以面積 ½ sin x < ½ x < ½ tan x，整理得 cos x < (sin x)/x < 1。用滑桿縮小 x，兩邊都趨近 1。',
  boundingBox: [-0.25, 2.15, 1.55, -0.25],
  aspect: 0.75,
  axis: false,
  build(board, ctx) {
    const { color } = ctx;
    const sx = board.create('slider', [[-0.15, 2.0], [0.55, 2.0], [0.1, 0.8, 1.1]], { name: 'x', snapWidth: step, digits: 2 });
    const x = () => snap(sx.Value(), step);

    const thin = { fixed: true, strokeColor: color.muted, strokeWidth: 1 };
    board.create('segment', [[-0.1, 0], [1.4, 0]], thin);
    board.create('segment', [[0, -0.1], [0, 1.15]], thin);
    board.create('curve', [(t: number) => Math.cos(t), (t: number) => Math.sin(t), 0, Math.PI / 2], { strokeColor: color.ink, strokeWidth: 1.5 });

    const dot = { fixed: true, size: 3, strokeColor: color.ink, fillColor: color.ink };
    const O = board.create('point', [0, 0], { ...dot, name: 'O', label: { offset: [-14, -10] } });
    const A = board.create('point', [1, 0], { ...dot, name: 'A', label: { offset: [4, -12] } });
    const P = board.create('point', [() => Math.cos(x()), () => Math.sin(x())], { ...dot, name: 'P', label: { offset: [-16, 6] } });
    const T = board.create('point', [1, () => Math.tan(x())], { ...dot, name: 'T', label: { offset: [6, 4] } });

    // Largest first, so the smaller regions are drawn on top.
    const region = { fixed: true, vertices: { visible: false }, borders: { visible: false } };
    ctx.name('tri2', board.create('polygon', [O, A, T], { ...region, fillColor: color.accent, fillOpacity: 0.15 }));
    ctx.name('sector', board.create('sector', [O, A, P], { fixed: true, fillColor: color.accent2, fillOpacity: 0.2, strokeWidth: 0, withLabel: false }));
    ctx.name('tri1', board.create('polygon', [O, A, P], { ...region, fillColor: color.highlight, fillOpacity: 0.25 }));

    board.create('segment', [O, T], { strokeColor: color.ink, strokeWidth: 2 });
    board.create('segment', [A, T], { strokeColor: color.ink, strokeWidth: 2 });
    board.create('segment', [P, A], { strokeColor: color.ink, strokeWidth: 1, dash: 2 });
    board.create('angle', [A, O, P], { radius: 0.2, name: ctx.tex('x'), fillOpacity: 0.15 });

    const fm = ctx.fmt;
    ctx.readout(() => {
      const v = x();
      return `$x=${fm(v)}$：$\\tfrac{1}{2}\\sin x=${fm(Math.sin(v) / 2)}<\\tfrac{1}{2}x=${fm(v / 2)}<\\tfrac{1}{2}\\tan x=${fm(Math.tan(v) / 2)}$`;
    });
    ctx.readout(() => {
      const v = x();
      return `$\\cos x=${fm(Math.cos(v))}<\\dfrac{\\sin x}{x}=${fm(Math.sin(v) / v)}<1$`;
    });
  },
  steps: [
    { text: '單位圓上取 $A(1,0)$、$P(\\cos x,\\sin x)$，延長 $OP$ 交過 $A$ 的垂直線於 $T(1,\\tan x)$。' },
    { text: '$\\triangle OAP$：底 $OA=1$、高 $\\sin x$，面積 $\\frac{1}{2}\\sin x$。', show: ['tri1'], highlight: ['tri1'] },
    { text: '扇形 $OAP$：半徑 $1$、圓心角 $x$（弧度），面積 $\\frac{1}{2}x$。', show: ['sector'], highlight: ['sector'] },
    { text: '$\\triangle OAT$：底 $OA=1$、高 $AT=\\tan x$，面積 $\\frac{1}{2}\\tan x$。', show: ['tri2'], highlight: ['tri2'] },
    { text: '三塊一塊包含一塊，所以 $\\frac{1}{2}\\sin x<\\frac{1}{2}x<\\frac{1}{2}\\tan x$，整理得 $\\cos x<\\dfrac{\\sin x}{x}<1$。' },
  ],
} satisfies GraphDef;

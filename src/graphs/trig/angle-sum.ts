import type JXG from 'jsxgraph';
import type { GraphDef } from '../types';

const rad = (deg: number) => (deg * Math.PI) / 180;

export default {
  title: '和角公式：疊放的直角三角形',
  description:
    '單位長線段 OP 與 x 軸夾 α + β，P 的高度是 sin(α + β)。以 OP 為斜邊作直角三角形 OQP（∠POQ = β），再以 OQ 為斜邊作直角三角形 OAQ（∠QOA = α）。P 的高度分成兩段：RB = AQ = sin α cos β，PR = cos α sin β，所以 sin(α + β) = sin α cos β + cos α sin β。用滑桿改變 α、β（都是銳角，且 α + β < 90°）。',
  boundingBox: [-0.25, 1.4, 1.35, -0.2],
  aspect: 1,
  axis: false,
  build(board, ctx) {
    const { color } = ctx;
    const slider = (y: number, name: string, min: number, start: number, max: number) =>
      board.create('slider', [[0.55, y], [1.0, y], [min, start, max]], { name: ctx.tex(name), snapWidth: 1, digits: 0, unitLabel: '°' });
    const sa = slider(1.32, '\\alpha', 10, 40, 50);
    const sb = slider(1.2, '\\beta', 10, 20, 35);
    const al = () => rad(Math.round(sa.Value()));
    const be = () => rad(Math.round(sb.Value()));

    const hidden = { fixed: true, size: 2.5, strokeColor: color.ink, fillColor: color.ink };
    const point = (x: () => number, y: () => number, name: string, offset: [number, number]) =>
      board.create('point', [x, y], { ...hidden, name, label: { offset } });
    const O = point(() => 0, () => 0, 'O', [-14, -10]);
    const P = point(() => Math.cos(al() + be()), () => Math.sin(al() + be()), 'P', [-4, 12]);
    const Q = point(() => Math.cos(be()) * Math.cos(al()), () => Math.cos(be()) * Math.sin(al()), 'Q', [8, 4]);
    const A = point(() => Q.X(), () => 0, 'A', [-4, -14]);
    const B = point(() => P.X(), () => 0, 'B', [-4, -14]);
    const R = point(() => P.X(), () => Q.Y(), 'R', [-14, 4]);

    board.create('segment', [[-0.15, 0], [1.25, 0]], { fixed: true, strokeColor: color.muted, strokeWidth: 1 });
    const seg = (p: JXG.Point, q: JXG.Point, attrs: object = {}) => board.create('segment', [p, q], { strokeWidth: 2, ...attrs });
    const tex = (x: () => number, y: () => number, latex: string, attrs: object = {}) =>
      board.create('text', [x, y, ctx.tex(latex)], { anchorX: 'middle', anchorY: 'middle', fixed: true, fontSize: 13, ...attrs });
    const square = (p: JXG.Point, v: JXG.Point, q: JXG.Point) =>
      board.create('nonreflexangle', [p, v, q], { radius: 0.05, withLabel: false, fillOpacity: 0.15 });
    const arc = (p: JXG.Point, v: JXG.Point, q: JXG.Point, r: number, latex: string) =>
      board.create('nonreflexangle', [p, v, q], { radius: r, name: ctx.tex(latex), label: { fontSize: 12 } });

    // Step 1: OP of length 1 at angle α + β, and P's height PB.
    ctx.name('op', P);
    ctx.name('op', B);
    ctx.name('op', seg(O, P));
    ctx.name('op', tex(() => P.X() / 2 - 0.05 * Math.sin(al() + be()), () => P.Y() / 2 + 0.05 * Math.cos(al() + be()), '1'));
    ctx.name('op', square(O, B, P));
    ctx.name('pb', seg(P, B, { strokeColor: color.accent2, strokeWidth: 4 }));
    ctx.name('sumAngle', arc(B, O, P, 0.3, '\\alpha+\\beta'));

    // Step 2: right triangle OQP, right angle at Q.
    ctx.name('oqp', Q);
    ctx.name('oqp', seg(O, Q));
    ctx.name('oqp', seg(Q, P));
    ctx.name('oqp', square(O, Q, P));
    ctx.name('oqp', arc(Q, O, P, 0.3, '\\beta'));
    ctx.name('oqp', tex(() => Q.X() / 2 + 0.06 * Math.sin(al()), () => Q.Y() / 2 - 0.06 * Math.cos(al()), '\\cos\\beta'));
    ctx.name('oqp', tex(() => (Q.X() + P.X()) / 2 + 0.08 * Math.cos(al() + be()), () => (Q.Y() + P.Y()) / 2 + 0.08 * Math.sin(al() + be()), '\\sin\\beta'));

    // Step 3: right triangle OAQ, right angle at A.
    ctx.name('oaq', A);
    ctx.name('oaq', square(O, A, Q));
    ctx.name('oaq', arc(A, O, Q, 0.18, '\\alpha'));
    ctx.name('aq', seg(A, Q, { strokeColor: color.accent, strokeWidth: 4 }));
    ctx.name('aq', tex(() => A.X() + 0.03, () => Q.Y() / 2, '\\sin\\alpha\\cos\\beta', { anchorX: 'left' }));

    // Step 4: the horizontal QR splits PB at R.
    ctx.name('qr', R);
    ctx.name('qr', seg(Q, R, { strokeWidth: 1.5, dash: 2 }));
    ctx.name('qr', square(P, R, Q));
    ctx.name('qr', arc(R, Q, O, 0.1, '\\alpha'));
    ctx.name('qr', arc(R, P, Q, 0.1, '\\alpha'));
    ctx.name('pr', seg(P, R, { strokeColor: color.accent, strokeWidth: 4 }));
    ctx.name('rb', seg(R, B, { strokeColor: color.accent, strokeWidth: 4 }));

    const f = ctx.fmt;
    ctx.readout(() => `$PB=\\sin(\\alpha+\\beta)=${f(Math.sin(al() + be()))}$`);
    ctx.readout(
      () =>
        `$RB=AQ=\\sin\\alpha\\cos\\beta=${f(Math.sin(al()) * Math.cos(be()))}$，$PR=\\cos\\alpha\\sin\\beta=${f(Math.cos(al()) * Math.sin(be()))}$，` +
        `兩段相加 $=${f(Math.sin(al()) * Math.cos(be()) + Math.cos(al()) * Math.sin(be()))}$`,
    );
  },
  steps: [
    {
      text: '單位長的 $OP$ 和 $x$ 軸夾 $\\alpha+\\beta$，$P$ 的高度 $PB=\\sin(\\alpha+\\beta)$。',
      show: ['op', 'pb', 'sumAngle'],
      highlight: ['pb'],
    },
    {
      text: '以 $OP$ 為斜邊作直角三角形 $OQP$，$\\angle POQ=\\beta$：$OQ=\\cos\\beta$，$QP=\\sin\\beta$。',
      show: ['oqp'],
      hide: ['sumAngle'],
    },
    {
      text: '以 $OQ$ 為斜邊作直角三角形 $OAQ$，$\\angle QOA=\\alpha$：$AQ=OQ\\sin\\alpha=\\sin\\alpha\\cos\\beta$。',
      show: ['oaq', 'aq'],
      highlight: ['aq'],
    },
    {
      text: '過 $Q$ 作水平線交 $PB$ 於 $R$。$\\angle RPQ=\\alpha$，所以 $PR=QP\\cos\\alpha=\\cos\\alpha\\sin\\beta$。',
      show: ['qr', 'pr'],
      highlight: ['pr', 'qr'],
    },
    {
      text: '$RB=AQ$，所以 $\\sin(\\alpha+\\beta)=PB=RB+PR=\\sin\\alpha\\cos\\beta+\\cos\\alpha\\sin\\beta$。',
      show: ['rb'],
      highlight: ['pr', 'rb', 'aq'],
    },
  ],
} satisfies GraphDef;

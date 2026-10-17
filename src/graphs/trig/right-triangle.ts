import { keepInside, snap, toDegrees } from '../helpers';
import type { GraphDef } from '../types';

const step = 0.1;

export default {
  title: '直角三角形的三角比',
  description:
    '直角三角形 ABC 中 ∠C 是直角，拖動頂點 B 改變銳角 θ = ∠A 和三角形的大小。下方即時顯示對邊、鄰邊、斜邊和 sin θ、cos θ、tan θ；沿著同一條斜線拖動（θ 不變）時，三個比值都不變。',
  boundingBox: [-1, 6, 8, -0.75],
  axis: false,
  build(board, ctx) {
    const { color } = ctx;
    const fixedPoint = { fixed: true, size: 3, strokeColor: color.ink, fillColor: color.ink };
    const A = board.create('point', [0, 0], { ...fixedPoint, name: 'A', label: { offset: [-14, -10] } });
    const B = board.create('point', [4, 3], { name: 'B', snapToGrid: true, snapSizeX: step, snapSizeY: step, label: { offset: [8, 6] } });
    keepInside(B, [0.5, 0.3, 7.5, 5.5]);
    const C = board.create('point', [() => B.X(), 0], { ...fixedPoint, name: 'C', label: { offset: [6, -12] } });

    board.create('polygon', [A, C, B], { fixed: true, fillOpacity: 0.12, borders: { strokeColor: color.ink, strokeWidth: 2 } });
    // JSXGraph angles go counterclockwise from the first ray: C→B (up) to C→A (left) is the 90° one.
    board.create('angle', [B, C, A], { radius: 0.35, withLabel: false, fillOpacity: 0.15 });
    board.create('angle', [C, A, B], { radius: 0.7, name: ctx.tex('\\theta'), label: { offset: [4, 0] } });

    const side = (x: () => number, y: () => number, text: string, attrs = {}) =>
      board.create('text', [x, y, text], { anchorX: 'middle', anchorY: 'middle', fixed: true, ...attrs });
    side(() => B.X() / 2, () => -0.35, '鄰邊');
    side(() => B.X() + 0.15, () => B.Y() / 2, '對邊', { anchorX: 'left' });
    // Slightly above the hypotenuse's midpoint, perpendicular to it.
    const off = 0.4;
    side(
      () => B.X() / 2 - (off * B.Y()) / Math.hypot(B.X(), B.Y()),
      () => B.Y() / 2 + (off * B.X()) / Math.hypot(B.X(), B.Y()),
      '斜邊',
    );

    const f = ctx.fmt;
    const opp = () => snap(B.Y(), step);
    const adj = () => snap(B.X(), step);
    const hyp = () => Math.hypot(opp(), adj());
    ctx.readout(() => `$\\theta=${f(toDegrees(Math.atan2(opp(), adj())))}^\\circ$，對邊 $=${f(opp())}$，鄰邊 $=${f(adj())}$，斜邊 $=${f(hyp())}$`);
    ctx.readout(
      () =>
        `$\\sin\\theta=\\dfrac{\\text{對邊}}{\\text{斜邊}}=${f(opp() / hyp())}$，` +
        `$\\cos\\theta=\\dfrac{\\text{鄰邊}}{\\text{斜邊}}=${f(adj() / hyp())}$，` +
        `$\\tan\\theta=\\dfrac{\\text{對邊}}{\\text{鄰邊}}=${f(opp() / adj())}$`,
    );
  },
} satisfies GraphDef;

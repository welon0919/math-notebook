import { magnet, unitGrid, vectorTip } from '../helpers';
import type { GraphDef } from '../types';

const area: [number, number, number, number] = [-4, -4, 7, 4];
const eps = 1e-9;

export default {
  title: '向量的投影',
  description:
    '拖動向量 u 和 v 的終點。u 分解成平行 v 的投影 proj_v u（粗線）和垂直 v 的部分 u − proj_v u（虛線），兩者互相垂直。下方即時顯示投影係數 (u·v)/(v·v)、投影向量，以及垂直部分和 v 的內積永遠是 0。',
  boundingBox: [-4.5, 4.5, 7.5, -4.5],
  build(board, ctx) {
    const { color } = ctx;
    unitGrid(board, ctx);
    const V = vectorTip(board, ctx, { at: [4, 1], name: '\\mathbf{v}', color: color.accent2, area });
    const U = vectorTip(board, ctx, { at: [2, 3], name: '\\mathbf{u}', color: color.accent, area });
    // Free dragging, with a magnet so parallel or perpendicular can be reached exactly.
    magnet(U, V, [0, 180, 90, 270]);
    magnet(V, U, [0, 180, 90, 270]);
    const O = board.create('point', [0, 0], { visible: false, fixed: true });

    const vv = () => V.X() ** 2 + V.Y() ** 2;
    const k = () => (vv() < eps ? NaN : (U.X() * V.X() + U.Y() * V.Y()) / vv());
    board.create('line', [O, V], { strokeColor: color.accent2, strokeWidth: 1, strokeOpacity: 0.4, dash: 1 });
    const P = board.create('point', [() => k() * V.X(), () => k() * V.Y()], { fixed: true, withLabel: false, size: 3, strokeColor: color.highlight, fillColor: color.highlight });
    board.create('arrow', [O, P], { fixed: true, strokeColor: color.highlight, strokeWidth: 5, strokeOpacity: 0.8 });
    board.create('segment', [P, U], { strokeColor: color.ink, strokeWidth: 2, dash: 2 });
    // Right-angle mark, only when the foot is away from both ends (otherwise there is no corner to mark).
    board.create('nonreflexangle', [U, P, O], {
      radius: 0.3,
      withLabel: false,
      fillOpacity: 0.15,
      visible: () => Math.hypot(P.X(), P.Y()) > 0.3 && Math.hypot(U.X() - P.X(), U.Y() - P.Y()) > 0.3,
    });

    const f = ctx.fmt;
    ctx.readout(() => {
      if (vv() < eps) return '$\\mathbf{v}=\\mathbf{0}$ 時投影沒有定義。';
      return `$\\dfrac{\\mathbf{u}\\cdot\\mathbf{v}}{\\mathbf{v}\\cdot\\mathbf{v}}=${f(k())}$，$\\operatorname{proj}_{\\mathbf{v}}\\mathbf{u}=${f(k())}\\,\\mathbf{v}=(${f(P.X())},\\ ${f(P.Y())})$`;
    });
    ctx.readout(() => {
      if (vv() < eps) return '';
      const [px, py] = [U.X() - P.X(), U.Y() - P.Y()];
      return `垂直部分 $\\mathbf{u}-\\operatorname{proj}_{\\mathbf{v}}\\mathbf{u}=(${f(px)},\\ ${f(py)})$，和 $\\mathbf{v}$ 的內積 $${f(px * V.X() + py * V.Y())}$`;
    });
  },
} satisfies GraphDef;

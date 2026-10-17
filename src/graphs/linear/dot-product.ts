import { magnet, toDegrees, unitGrid, vectorTip } from '../helpers';
import type { GraphDef } from '../types';

const area: [number, number, number, number] = [-4, -4, 7, 4];
const eps = 1e-9;

export default {
  title: '向量的夾角與內積',
  description:
    '拖動向量 u 和 v 的終點。下方即時顯示坐標、夾角 θ、內積 u·v = u₁v₁ + u₂v₂ 和 |u||v|cos θ，兩種算法永遠相等；虛線是 u 在 v 方向上的投影。內積為正是銳角、為 0 是垂直、為負是鈍角。',
  boundingBox: [-4.5, 4.5, 7.5, -4.5],
  build(board, ctx) {
    const { color } = ctx;
    unitGrid(board, ctx);
    const U = vectorTip(board, ctx, { at: [2, 3], name: '\\mathbf{u}', color: color.accent, area });
    const V = vectorTip(board, ctx, { at: [4, 1], name: '\\mathbf{v}', color: color.accent2, area });
    // Free dragging, with a magnet so perpendicular can be reached exactly.
    magnet(U, V, [90, 270]);
    magnet(V, U, [90, 270]);
    const O = board.create('point', [0, 0], { visible: false, fixed: true });

    const dot = () => U.X() * V.X() + U.Y() * V.Y();
    const len = (p: typeof U) => Math.hypot(p.X(), p.Y());
    const zero = () => len(U) < eps || len(V) < eps;
    const theta = () => Math.atan2(Math.abs(U.X() * V.Y() - U.Y() * V.X()), dot());

    board.create('nonreflexangle', [V, O, U], { radius: 0.6, name: ctx.tex('\\theta'), visible: () => !zero() });
    // Foot of the perpendicular from u's tip to the line along v.
    const foot = board.create('point', [() => (dot() / len(V) ** 2) * V.X(), () => (dot() / len(V) ** 2) * V.Y()], { visible: false, fixed: true });
    board.create('segment', [U, foot], { strokeColor: color.muted, strokeWidth: 1.5, dash: 2 });
    board.create('line', [O, V], { strokeColor: color.accent2, strokeWidth: 1, strokeOpacity: 0.4, dash: 1 });

    const f = ctx.fmt;
    ctx.readout(() => `$\\mathbf{u}=(${f(U.X())},\\ ${f(U.Y())})$，$\\mathbf{v}=(${f(V.X())},\\ ${f(V.Y())})$`);
    ctx.readout(() => {
      if (zero()) return '有一個向量是零向量，夾角沒有定義。';
      const d = dot();
      const kind = Math.abs(d) < eps ? '互相垂直' : d > 0 ? '夾角為銳角' : '夾角為鈍角';
      return (
        `$\\mathbf{u}\\cdot\\mathbf{v}=u_1v_1+u_2v_2=${f(d)}$，$|\\mathbf{u}|\\,|\\mathbf{v}|\\cos\\theta=${f(len(U))}\\cdot${f(len(V))}\\cdot\\cos ${f(toDegrees(theta()))}^\\circ=${f(len(U) * len(V) * Math.cos(theta()))}$，${kind}`
      );
    });
  },
} satisfies GraphDef;

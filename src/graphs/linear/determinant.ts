import { magnet, unitGrid, vectorTip } from '../helpers';
import type { GraphDef } from '../types';

const area: [number, number, number, number] = [-4.5, -3.5, 6.5, 3.5];
const eps = 1e-9;

export default {
  title: '二階行列式與平行四邊形面積',
  description:
    '拖動兩個行向量 (a, c) 和 (b, d) 的終點。它們張成的平行四邊形面積等於 |ad − bc|。把第二個向量轉到第一個向量的另一側（順時針那邊）時，行列式變成負的，平行四邊形換成另一個顏色；兩向量共線時行列式是 0。',
  boundingBox: [-5, 4.5, 7, -4.5],
  build(board, ctx) {
    const { color } = ctx;
    unitGrid(board, ctx);
    const U = vectorTip(board, ctx, { at: [3, 1], name: '(a,c)', color: color.accent, area });
    const V = vectorTip(board, ctx, { at: [1, 2], name: '(b,d)', color: color.accent2, area });
    // Free dragging, with a magnet so collinear (det = 0) can be reached exactly.
    magnet(U, V, [0, 180]);
    magnet(V, U, [0, 180]);
    const det = () => U.X() * V.Y() - V.X() * U.Y();

    const corner = (x: () => number, y: () => number) => board.create('point', [x, y], { visible: false, fixed: true });
    const sign = () => (det() > eps ? color.highlight : det() < -eps ? color.accent2 : color.muted);
    board.create(
      'polygon',
      [corner(() => 0, () => 0), corner(() => U.X(), () => U.Y()), corner(() => U.X() + V.X(), () => U.Y() + V.Y()), corner(() => V.X(), () => V.Y())],
      { fixed: true, vertices: { visible: false }, fillColor: sign, fillOpacity: 0.3, borders: { strokeColor: sign, strokeWidth: 1.5, dash: 2 } },
    );

    const f = ctx.fmt;
    ctx.readout(() => `$\\det\\begin{pmatrix}${f(U.X())}&${f(V.X())}\\\\${f(U.Y())}&${f(V.Y())}\\end{pmatrix}=ad-bc=${f(U.X())}\\cdot${f(V.Y())}-${f(V.X())}\\cdot${f(U.Y())}=${f(det())}$`);
    ctx.readout(() => {
      const d = det();
      if (Math.abs(d) < eps) return '兩個向量共線，平行四邊形壓扁了，面積 $0$。';
      return `平行四邊形面積 $|ad-bc|=${f(Math.abs(d))}$${d < 0 ? '；行列式是負的：從 $(a,c)$ 到 $(b,d)$ 是順時針方向' : '；從 $(a,c)$ 到 $(b,d)$ 是逆時針方向'}。`;
    });
  },
} satisfies GraphDef;

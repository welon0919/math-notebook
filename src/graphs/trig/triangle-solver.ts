import type JXG from 'jsxgraph';
import { angleAt, dist, keepInside, toDegrees } from '../helpers';
import type { GraphDef } from '../types';

const step = 0.1;
const area: [number, number, number, number] = [-0.5, -1.5, 10.5, 6];

export default {
  title: '三角形的邊與角',
  description:
    '拖動三角形 ABC 的三個頂點。下方即時顯示三邊 a、b、c（a 是 ∠A 的對邊，依此類推）和三個內角，三個內角的和永遠是 180°。',
  boundingBox: [-1, 6.5, 11, -2.5],
  axis: false,
  build(board, ctx) {
    const { color } = ctx;
    const vertex = (x: number, y: number, name: string, offset: [number, number]) => {
      const p = board.create('point', [x, y], { name, snapToGrid: true, snapSizeX: step, snapSizeY: step, label: { offset } });
      keepInside(p, area);
      return p;
    };
    const A = vertex(1, 0, 'A', [-16, -10]);
    const B = vertex(8, 0, 'B', [8, -10]);
    const C = vertex(3, 5, 'C', [-4, 16]);
    board.create('polygon', [A, B, C], { fixed: true, fillOpacity: 0.12, borders: { strokeColor: color.ink, strokeWidth: 2 } });

    // Interior angles: 'nonreflexangle' always draws the side under 180°, whichever way the triangle turns.
    const angle = (p: JXG.Point, v: JXG.Point, q: JXG.Point) =>
      board.create('nonreflexangle', [p, v, q], { radius: 0.6, withLabel: false, fillOpacity: 0.2 });
    angle(B, A, C);
    angle(C, B, A);
    angle(A, C, B);

    // Side labels: at each side's midpoint, pushed away from the opposite vertex.
    const sideLabel = (p: JXG.Point, q: JXG.Point, opposite: JXG.Point, latex: string) => {
      const mx = () => (p.X() + q.X()) / 2;
      const my = () => (p.Y() + q.Y()) / 2;
      const away = () => {
        const [dx, dy] = [mx() - opposite.X(), my() - opposite.Y()];
        const len = Math.hypot(dx, dy) || 1;
        return [(0.4 * dx) / len, (0.4 * dy) / len];
      };
      board.create('text', [() => mx() + away()[0], () => my() + away()[1], ctx.tex(latex)], {
        anchorX: 'middle',
        anchorY: 'middle',
        fixed: true,
        fontSize: 16,
      });
    };
    sideLabel(B, C, A, 'a');
    sideLabel(C, A, B, 'b');
    sideLabel(A, B, C, 'c');

    const f = ctx.fmt;
    // Twice the signed area; near 0 the points are (almost) on one line.
    const cross = () => (B.X() - A.X()) * (C.Y() - A.Y()) - (B.Y() - A.Y()) * (C.X() - A.X());
    const degenerate = () => Math.abs(cross()) < 1e-9;
    ctx.readout(() => `$a=${f(dist(B, C))},\\ b=${f(dist(C, A))},\\ c=${f(dist(A, B))}$`);
    ctx.readout(() => {
      if (degenerate()) return '三個頂點在同一條直線上，不是三角形。';
      const [a, b, c] = [angleAt(B, A, C), angleAt(C, B, A), angleAt(A, C, B)].map(toDegrees);
      return `$A=${f(a)}^\\circ,\\ B=${f(b)}^\\circ,\\ C=${f(c)}^\\circ$，$A+B+C=${f(a + b + c)}^\\circ$`;
    });
  },
} satisfies GraphDef;

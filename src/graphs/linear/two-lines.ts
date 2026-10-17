import type JXG from 'jsxgraph';
import { keepInside } from '../helpers';
import type { GraphDef } from '../types';

const area: [number, number, number, number] = [-5.5, -4, 5.5, 4];
const eps = 1e-9;

/** a x + b y = c through two points (a = Δy, b = −Δx); all zero when the points coincide. */
function equation(p: JXG.Point, q: JXG.Point): [number, number, number] {
  const a = q.Y() - p.Y();
  const b = p.X() - q.X();
  return [a, b, a * p.X() + b * p.Y()];
}

/** "2x − 3y = 4" with the signs written properly. */
function show(fmt: (x: number) => string, [a, b, c]: [number, number, number]): string {
  const term = (k: number, v: string, first: boolean) => (first ? `${fmt(k)}${v}` : `${k < 0 ? '-' : '+'}${fmt(Math.abs(k))}${v}`);
  return `${term(a, 'x', true)}${term(b, 'y', false)}=${fmt(c)}`;
}

export default {
  title: '二元一次方程組：兩條直線',
  description:
    '每條直線由兩個可以拖動的點決定（坐標每 0.5 跳一格）。下方顯示兩條直線的方程式，以及方程組的解：兩線相交於一點是唯一解，平行不相交是無解，重合是無限多解。',
  boundingBox: [-6, 4.5, 6, -4.5],
  build(board, ctx) {
    const { color } = ctx;
    const handle = (x: number, y: number, c: string) => {
      const p = board.create('point', [x, y], { withLabel: false, snapToGrid: true, snapSizeX: 0.5, snapSizeY: 0.5, strokeColor: c, fillColor: c });
      keepInside(p, area);
      return p;
    };
    const P1 = handle(-4, -2, color.accent);
    const Q1 = handle(3, 1.5, color.accent);
    const P2 = handle(-3, 3, color.accent2);
    const Q2 = handle(4, -1, color.accent2);
    board.create('line', [P1, Q1], { strokeColor: color.accent, strokeWidth: 2.5 });
    board.create('line', [P2, Q2], { strokeColor: color.accent2, strokeWidth: 2.5 });

    const l1 = () => equation(P1, Q1);
    const l2 = () => equation(P2, Q2);
    const D = () => l1()[0] * l2()[1] - l2()[0] * l1()[1];
    // Cramer's rule for the intersection when D ≠ 0.
    const solution = (): [number, number] => {
      const [a1, b1, c1] = l1();
      const [a2, b2, c2] = l2();
      return [(c1 * b2 - c2 * b1) / D(), (a1 * c2 - a2 * c1) / D()];
    };
    board.create('point', [() => (Math.abs(D()) < eps ? NaN : solution()[0]), () => (Math.abs(D()) < eps ? NaN : solution()[1])], {
      fixed: true,
      withLabel: false,
      size: 5,
      strokeColor: color.highlight,
      fillColor: color.highlight,
    });

    const f = ctx.fmt;
    const degenerate = () => [l1(), l2()].some(([a, b]) => Math.abs(a) < eps && Math.abs(b) < eps);
    ctx.readout(() => (degenerate() ? '同一條直線的兩個點重合了，請把它們分開。' : `$\\begin{cases}${show(f, l1())}\\\\${show(f, l2())}\\end{cases}$`));
    ctx.readout(() => {
      if (degenerate()) return '';
      if (Math.abs(D()) > eps) {
        const [x, y] = solution();
        return `兩線相交於一點：唯一解 $(x,y)=(${f(x)},\\ ${f(y)})$。`;
      }
      // Parallel: same line exactly when a point of line 2 satisfies line 1's equation.
      const [a1, b1, c1] = l1();
      return Math.abs(a1 * P2.X() + b1 * P2.Y() - c1) < eps ? '兩線重合：無限多解。' : '兩線平行、不相交：無解。';
    });
  },
} satisfies GraphDef;

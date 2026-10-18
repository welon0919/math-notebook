import type JXG from 'jsxgraph';
import { keepInside } from '../helpers';
import type { GraphDef } from '../types';

const area: [number, number, number, number] = [-5.5, -4, 5.5, 4];
const eps = 1e-9;
/** Within this angle the dragged line snaps parallel to the other one, so 無解 and 無限多解 can be reached. */
const parallelTolerance = (2 * Math.PI) / 180;
/** Once parallel, within this distance the dragged line snaps onto the other one. */
const coincideTolerance = 0.12;

/**
 * While `moving` is dragged, snaps line `moving`–`partner` parallel to line `p`–`q` when nearly
 * parallel (rotating `moving` around `partner`), then onto that line when nearly the same.
 * A snap that would leave `area` is skipped, so keepInside never undoes half of it.
 */
function magnetToLine(moving: JXG.Point, partner: JXG.Point, p: JXG.Point, q: JXG.Point) {
  const inside = ([x, y]: number[]) => x >= area[0] && x <= area[2] && y >= area[1] && y <= area[3];
  moving.on('drag', () => {
    const [vx, vy] = [q.X() - p.X(), q.Y() - p.Y()];
    const [ux, uy] = [moving.X() - partner.X(), moving.Y() - partner.Y()];
    const [lv, lu] = [Math.hypot(vx, vy), Math.hypot(ux, uy)];
    if (lv < eps || lu < eps) return;
    // Angle between the lines, ignoring direction: 0 means parallel.
    const angle = Math.asin(Math.min(1, Math.abs(ux * vy - uy * vx) / (lu * lv)));
    if (angle > parallelTolerance) return;
    const sign = ux * vx + uy * vy < 0 ? -1 : 1;
    let next = [partner.X() + (sign * lu * vx) / lv, partner.Y() + (sign * lu * vy) / lv];
    let partnerNext = [partner.X(), partner.Y()];
    // Signed distance from partner to line p–q; shift both points onto it when close.
    const gap = ((partner.X() - p.X()) * vy - (partner.Y() - p.Y()) * vx) / lv;
    if (Math.abs(gap) < coincideTolerance) {
      const [nx, ny] = [vy / lv, -vx / lv];
      partnerNext = [partnerNext[0] - gap * nx, partnerNext[1] - gap * ny];
      next = [next[0] - gap * nx, next[1] - gap * ny];
    }
    if (!inside(next) || !inside(partnerNext)) return;
    if (partnerNext[0] !== partner.X() || partnerNext[1] !== partner.Y()) partner.moveTo(partnerNext);
    moving.moveTo(next);
  });
}

/**
 * Where the ray from the board's center toward (x, y) leaves the visible box, pulled in by `inset`;
 * undefined when (x, y) is already visible.
 */
function edgeToward(board: JXG.Board, x: number, y: number, inset: number): [number, number] | undefined {
  const [left, top, right, bottom] = board.getBoundingBox();
  if (x >= left && x <= right && y >= bottom && y <= top) return undefined;
  const [cx, cy] = [(left + right) / 2, (top + bottom) / 2];
  const [dx, dy] = [x - cx, y - cy];
  const tx = dx === 0 ? Infinity : ((right - left) / 2 - inset) / Math.abs(dx);
  const ty = dy === 0 ? Infinity : ((top - bottom) / 2 - inset) / Math.abs(dy);
  const t = Math.min(tx, ty);
  return [cx + dx * t, cy + dy * t];
}

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
    '每條直線由兩個可以自由拖動的點決定；兩線接近平行或重合時會自動吸附。下方顯示兩條直線的方程式，以及方程組的解：兩線相交於一點是唯一解，平行不相交是無解，重合是無限多解。交點跑到畫面外時，邊緣的箭頭會指向它。',
  boundingBox: [-6, 4.5, 6, -4.5],
  build(board, ctx) {
    const { color } = ctx;
    const handle = (x: number, y: number, c: string) => {
      const p = board.create('point', [x, y], { withLabel: false, strokeColor: c, fillColor: c });
      keepInside(p, area);
      return p;
    };
    const P1 = handle(-4, -2, color.accent);
    const Q1 = handle(3, 1.5, color.accent);
    const P2 = handle(-3, 3, color.accent2);
    const Q2 = handle(4, -1, color.accent2);
    magnetToLine(P1, Q1, P2, Q2);
    magnetToLine(Q1, P1, P2, Q2);
    magnetToLine(P2, Q2, P1, Q1);
    magnetToLine(Q2, P2, P1, Q1);
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

    // Off-screen intersection: an arrow along the edge, pointing toward it (NaN hides it).
    const offscreen = (inset: number) => {
      if (Math.abs(D()) < eps) return undefined;
      const [x, y] = solution();
      return edgeToward(board, x, y, inset);
    };
    const coord = (inset: number, i: 0 | 1) => () => offscreen(inset)?.[i] ?? NaN;
    board.create('arrow', [[coord(0.9, 0), coord(0.9, 1)], [coord(0.2, 0), coord(0.2, 1)]], {
      fixed: true,
      highlight: false,
      strokeColor: color.highlight,
      strokeWidth: 3,
      lastArrow: { type: 2, size: 5 },
    });
    board.create('text', [coord(1.35, 0), coord(1.35, 1), '交點'], {
      fixed: true,
      highlight: false,
      anchorX: 'middle',
      anchorY: 'middle',
      strokeColor: color.highlight,
      fontSize: 14,
    });

    const f = ctx.fmt;
    const degenerate = () => [l1(), l2()].some(([a, b]) => Math.abs(a) < eps && Math.abs(b) < eps);
    ctx.readout(() => (degenerate() ? '同一條直線的兩個點重合了，請把它們分開。' : `$\\begin{cases}${show(f, l1())}\\\\${show(f, l2())}\\end{cases}$`));
    ctx.readout(() => {
      if (degenerate()) return '';
      if (Math.abs(D()) > eps) {
        const [x, y] = solution();
        const where = offscreen(0) ? '（交點在畫面外，順著邊緣的箭頭方向）' : '';
        return `兩線相交於一點${where}：唯一解 $(x,y)=(${f(x)},\\ ${f(y)})$。`;
      }
      // Parallel: same line exactly when a point of line 2 satisfies line 1's equation.
      const [a1, b1, c1] = l1();
      return Math.abs(a1 * P2.X() + b1 * P2.Y() - c1) < eps ? '兩線重合：無限多解。' : '兩線平行、不相交：無解。';
    });
  },
} satisfies GraphDef;

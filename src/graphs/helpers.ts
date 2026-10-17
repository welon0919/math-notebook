import type JXG from 'jsxgraph';
import type { GraphContext } from './types';

/** Helpers shared by graph definitions (not a graph itself: graphs live in subject folders). */

/** Rounds to a multiple of `step`, e.g. a slider's or grid point's value without floating-point noise. */
export const snap = (v: number, step: number) => Math.round(v / step) * step;

export const toDegrees = (rad: number) => (rad * 180) / Math.PI;

/** The angle at vertex v between rays v→p and v→q, in radians, from 0 to π. */
export function angleAt(p: JXG.Point, v: JXG.Point, q: JXG.Point): number {
  const [x1, y1] = [p.X() - v.X(), p.Y() - v.Y()];
  const [x2, y2] = [q.X() - v.X(), q.Y() - v.Y()];
  return Math.atan2(Math.abs(x1 * y2 - y1 * x2), x1 * x2 + y1 * y2);
}

export const dist = (p: JXG.Point, q: JXG.Point) => Math.hypot(p.X() - q.X(), p.Y() - q.Y());

/** Keeps a draggable point inside a rectangle, `[xmin, ymin, xmax, ymax]`. */
export function keepInside(p: JXG.Point, [xmin, ymin, xmax, ymax]: [number, number, number, number]) {
  p.on('drag', () => {
    const x = Math.min(xmax, Math.max(xmin, p.X()));
    const y = Math.min(ymax, Math.max(ymin, p.Y()));
    if (x !== p.X() || y !== p.Y()) p.moveTo([x, y]);
  });
}

/** Labels at multiples of π/2 along a horizontal axis at height y, for `x = scale · t`. */
export function piTicks(board: JXG.Board, ctx: GraphContext, opts: { x0?: number; y: number; scale?: number; from: number; to: number; tick?: number }) {
  const { x0 = 0, y, scale = 1, from, to, tick = 0.06 } = opts;
  const names: Record<number, string> = { 0: '0', 1: '\\frac{\\pi}{2}', 2: '\\pi', 3: '\\frac{3\\pi}{2}', 4: '2\\pi', '-1': '-\\frac{\\pi}{2}', '-2': '-\\pi' };
  for (let k = from; k <= to; k++) {
    const x = x0 + (scale * k * Math.PI) / 2;
    const latex = names[k] ?? `${k / 2}\\pi`;
    board.create('segment', [[x, y - tick], [x, y + tick]], { fixed: true, strokeColor: ctx.color.muted, strokeWidth: 1 });
    if (k !== 0) {
      board.create('text', [x, y - 2 * tick, ctx.tex(latex)], {
        anchorX: 'middle',
        anchorY: 'top',
        fixed: true,
        fontSize: 12,
        strokeColor: ctx.color.muted,
      });
    }
  }
}

/**
 * A filled region between y = f(x) and y = base, for from() ≤ x ≤ to(), recomputed on every update.
 * Use it to shade an area under a curve.
 */
export function shadeUnder(
  board: JXG.Board,
  f: (x: number) => number,
  from: () => number,
  to: () => number,
  attrs: object,
  base = 0,
) {
  const region = board.create('curve', [[0], [0]], { fixed: true, strokeWidth: 0, highlight: false, ...attrs });
  region.updateDataArray = function () {
    const [a, b] = [from(), to()];
    const n = 100;
    const xs = Array.from({ length: n + 1 }, (_, i) => a + ((b - a) * i) / n);
    this.dataX = [a, ...xs, b];
    this.dataY = [base, ...xs.map(f), base];
  };
  return region;
}

/** Faint unit grid for reading coordinates. */
export function unitGrid(board: JXG.Board, ctx: GraphContext) {
  const line = { strokeColor: ctx.color.grid, strokeOpacity: 0.6 };
  board.create('grid', [], { ...line, majorStep: 1, minorElements: 0, highlight: false, major: { face: 'line', ...line } });
}

/** A draggable vector tip from the origin, moving freely inside `area`. */
export function vectorTip(
  board: JXG.Board,
  ctx: GraphContext,
  opts: { at: [number, number]; name: string; color: string; area: [number, number, number, number]; arrow?: object },
) {
  const { at, name, color, area, arrow = {} } = opts;
  const tip = board.create('point', at, {
    name: ctx.tex(name),
    strokeColor: color,
    fillColor: color,
    label: { offset: [8, 8], strokeColor: color },
  });
  keepInside(tip, area);
  board.create('arrow', [[0, 0], tip], { strokeColor: color, strokeWidth: 3, fixed: true, ...arrow });
  return tip;
}

/**
 * Lets a freely dragged vector tip land exactly on special directions relative to another
 * vector (e.g. 90° for perpendicular, 0° and 180° for parallel): within `toleranceDeg`
 * it is rotated onto that direction, keeping its length. Call it for both vectors.
 */
export function magnet(tip: JXG.Point, other: JXG.Point, anglesDeg: number[], toleranceDeg = 1.5) {
  tip.on('drag', () => {
    const r = Math.hypot(tip.X(), tip.Y());
    if (r < 1e-9 || Math.hypot(other.X(), other.Y()) < 1e-9) return;
    const base = Math.atan2(other.Y(), other.X());
    const rel = Math.atan2(tip.Y(), tip.X()) - base;
    for (const deg of anglesDeg) {
      const target = (deg * Math.PI) / 180;
      const gap = Math.atan2(Math.sin(rel - target), Math.cos(rel - target));
      if (Math.abs(gap) < (toleranceDeg * Math.PI) / 180) {
        tip.moveTo([r * Math.cos(base + target), r * Math.sin(base + target)]);
        return;
      }
    }
  });
}

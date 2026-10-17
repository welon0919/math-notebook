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

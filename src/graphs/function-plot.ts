import type { GraphDef } from './types';

/** Shared by the fixed function graphs of worked examples in calculus lessons (not a graph itself). */

interface Piece {
  f: (x: number) => number;
  from: number;
  to: number;
}

interface Dot {
  x: number;
  y: number;
  /** An open circle: the point is not on the graph (a hole, or the open end of a piece). */
  open?: boolean;
  /** LaTeX label, e.g. `(1,3)`. */
  label?: string;
  /** Where the label goes, relative to the point. Default above. */
  side?: 'above' | 'below' | 'left' | 'right';
}

interface FunctionPlotOptions {
  title: string;
  description: string;
  /** The pieces of the graph, each drawn between its own endpoints (break a curve at a vertical asymptote). */
  pieces: Piece[];
  /** LaTeX of the function, for the legend. */
  tex: string;
  /** Curves to compare with, drawn in another color, solid. */
  compare?: { f: (x: number) => number; from: number; to: number; tex: string }[];
  dots?: Dot[];
  /** Dashed lines x = a and y = b, with their equations in the legend. */
  asymptotes?: { vertical?: number[]; horizontal?: number[] };
  /** The x and y ranges shown. */
  x: [number, number];
  y: [number, number];
  /** Spacing of the numbered ticks on each axis. Default 1; 0 leaves an axis without numbers. */
  xStep?: number;
  yStep?: number;
  /** Axis names, e.g. `t`, `C`. Default x and y. */
  xName?: string;
  yName?: string;
  /** Width / height. Default the ranges' ratio, between 0.75 and 2. */
  aspect?: number;
  readouts?: string[];
}

const labelPlacement = {
  above: { offset: [0, 10], anchorX: 'middle', anchorY: 'bottom' },
  below: { offset: [0, -10], anchorX: 'middle', anchorY: 'top' },
  left: { offset: [-10, 0], anchorX: 'right', anchorY: 'middle' },
  right: { offset: [10, 0], anchorX: 'left', anchorY: 'middle' },
} as const;

/** Tick numbers without floating-point noise: 0.1 · 3 prints 0.3. */
const num = (v: number) => String(+v.toFixed(6));

export function functionPlot(opts: FunctionPlotOptions): GraphDef {
  const [x0, x1] = opts.x;
  const [y0, y1] = opts.y;
  // Margins for the axis arrows and the tick labels.
  const mx = (x1 - x0) * 0.06;
  const my = (y1 - y0) * 0.08;
  // More room below, for the x-axis numbers when the axis runs along the bottom.
  const [xmin, xmax, ymin, ymax] = [x0 - mx, x1 + mx, y0 - 1.6 * my, y1 + my];
  const ratio = (xmax - xmin) / (ymax - ymin);
  const aspect = opts.aspect ?? Math.min(2, Math.max(0.75, ratio));
  const xStep = opts.xStep ?? 1;
  const yStep = opts.yStep ?? 1;
  return {
    title: opts.title,
    description: opts.description,
    boundingBox: [xmin, ymax, xmax, ymin],
    aspect,
    axis: false,
    build(board, ctx) {
      const { color } = ctx;
      const fixed = { fixed: true, highlight: false };
      const thin = { ...fixed, strokeColor: color.muted, strokeWidth: 1 };
      const tickText = { ...fixed, fontSize: 11, strokeColor: color.muted };
      // Tick lengths in graph units, the same number of pixels on both axes.
      const tx = (xmax - xmin) * 0.008;
      const ty = (tx * aspect) / ratio;

      // Axes through the origin, or along the frame's edge when the origin is off the frame.
      const ax = Math.min(Math.max(0, xmin + mx * 0.5), xmax);
      const ay = Math.min(Math.max(0, ymin + my * 0.5), ymax);
      board.create('arrow', [[xmin + mx * 0.3, ay], [xmax - mx * 0.2, ay]], thin);
      board.create('arrow', [[ax, ymin + my * 0.3], [ax, ymax - my * 0.2]], thin);
      board.create('text', [xmax - mx * 0.2, ay, ctx.tex(opts.xName ?? 'x')], { ...tickText, fontSize: 13, anchorX: 'right', anchorY: 'bottom' });
      board.create('text', [ax, ymax - my * 0.2, ctx.tex(opts.yName ?? 'y')], { ...tickText, fontSize: 13, anchorX: 'left', anchorY: 'top', cssStyle: 'padding-left: 6px' });
      if (xStep > 0) {
        for (let k = Math.ceil(x0 / xStep); k * xStep <= x1 + 1e-9; k++) {
          const x = k * xStep;
          // No number on the origin's axis or under a vertical asymptote's dashed line.
          if (Math.abs(x - ax) < 1e-9 || opts.asymptotes?.vertical?.some((v) => Math.abs(v - x) < 1e-9)) continue;
          board.create('segment', [[x, ay - ty], [x, ay + ty]], thin);
          board.create('text', [x, ay - 2 * ty, num(x)], { ...tickText, anchorX: 'middle', anchorY: 'top' });
        }
      }
      if (yStep > 0) {
        for (let k = Math.ceil(y0 / yStep); k * yStep <= y1 + 1e-9; k++) {
          const y = k * yStep;
          if (Math.abs(y - ay) < 1e-9) continue;
          board.create('segment', [[ax - tx, y], [ax + tx, y]], thin);
          board.create('text', [ax - 2 * tx, y, num(y)], { ...tickText, anchorX: 'right', anchorY: 'middle' });
        }
      }

      const dashed = { ...fixed, strokeColor: color.accent2, strokeWidth: 1.5, dash: 3 };
      for (const a of opts.asymptotes?.vertical ?? []) board.create('segment', [[a, ymin], [a, ymax]], dashed);
      for (const b of opts.asymptotes?.horizontal ?? []) board.create('segment', [[xmin, b], [xmax, b]], dashed);

      for (const c of opts.compare ?? []) board.create('functiongraph', [c.f, c.from, c.to], { ...fixed, strokeColor: color.highlight, strokeWidth: 2 });
      for (const p of opts.pieces) board.create('functiongraph', [p.f, p.from, p.to], { ...fixed, strokeColor: color.accent, strokeWidth: 3 });

      for (const d of opts.dots ?? []) {
        const place = labelPlacement[d.side ?? 'above'];
        board.create('point', [d.x, d.y], {
          ...fixed,
          name: d.label ? ctx.tex(d.label) : '',
          withLabel: Boolean(d.label),
          size: 4,
          strokeWidth: 2,
          strokeColor: color.accent,
          fillColor: d.open ? color.bg : color.accent,
          label: { ...place, offset: [...place.offset], fontSize: 13, strokeColor: color.ink },
        });
      }

      const asym = (eq: string) => ({ label: `漸近線 $${eq}$`, color: color.accent2, dash: true, width: 1.5 });
      ctx.legend([
        { label: `$${opts.tex}$`, color: color.accent, width: 3 },
        ...(opts.compare ?? []).map((c) => ({ label: `$${c.tex}$`, color: color.highlight, width: 2 })),
        ...(opts.asymptotes?.vertical ?? []).map((a) => asym(`x=${num(a)}`)),
        ...(opts.asymptotes?.horizontal ?? []).map((b) => asym(`y=${num(b)}`)),
      ]);
      for (const text of opts.readouts ?? []) ctx.readout(() => text);
    },
  };
}

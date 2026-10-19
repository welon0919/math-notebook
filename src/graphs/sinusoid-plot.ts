import type { GraphDef } from './types';

/** Shared by the fixed graphs of worked examples in trig lessons (not a graph itself). */

interface Mark {
  x: number;
  y: number;
  /** LaTeX label, e.g. `\left(\frac{5\pi}{12},4\right)`. */
  label: string;
  /** Put the label below the point instead of above. */
  below?: boolean;
}

interface SinusoidPlotOptions {
  title: string;
  description: string;
  f: (x: number) => number;
  /** LaTeX of the function, for the legend. */
  tex: string;
  /** Dashed curves to compare with, e.g. before a shift; the first is drawn muted, the next in the highlight color. */
  compare?: { f: (x: number) => number; tex: string }[];
  /** The x range shown, in units of π/2, e.g. [-1, 4] for -π/2 to 2π. */
  halfPis: [number, number];
  /** The y range shown. */
  y: [number, number];
  midline: number;
  marks: Mark[];
  readouts?: string[];
}

/** k·π/2 as LaTeX: \frac{\pi}{2}, \pi, \frac{3\pi}{2}, 2\pi, … */
function halfPiTex(k: number): string {
  const sign = k < 0 ? '-' : '';
  const n = Math.abs(k);
  if (n % 2 === 0) return `${sign}${n / 2 === 1 ? '' : n / 2}\\pi`;
  return `${sign}\\frac{${n === 1 ? '' : n}\\pi}{2}`;
}

export function sinusoidPlot(opts: SinusoidPlotOptions): GraphDef {
  const half = Math.PI / 2;
  const [k0, k1] = opts.halfPis;
  const [xmin, xmax] = [k0 * half - 0.4, k1 * half + 0.4];
  // Room above and below for the point labels.
  const [ymin, ymax] = [opts.y[0] - 1, opts.y[1] + 1];
  return {
    title: opts.title,
    description: opts.description,
    boundingBox: [xmin, ymax, xmax, ymin],
    // A long x range would make a flat strip on a phone; past 2:1 the y direction is stretched instead.
    aspect: Math.min((xmax - xmin) / (ymax - ymin), 2),
    axis: false,
    build(board, ctx) {
      const { color } = ctx;
      const fixed = { fixed: true, highlight: false };
      const thin = { ...fixed, strokeColor: color.muted, strokeWidth: 1 };
      board.create('arrow', [[xmin + 0.1, 0], [xmax - 0.1, 0]], thin);
      if (xmin < 0) board.create('arrow', [[0, ymin + 0.1], [0, ymax - 0.1]], thin);
      for (let k = k0; k <= k1; k++) {
        if (k === 0) continue;
        const x = k * half;
        board.create('segment', [[x, -0.08], [x, 0.08]], thin);
        board.create('text', [x, -0.15, ctx.tex(halfPiTex(k))], { ...fixed, anchorX: 'middle', anchorY: 'top', fontSize: 11, strokeColor: color.muted });
      }
      // Whole-number heights on the y-axis (or the left edge when x = 0 is off the frame).
      const yAxisX = xmin < 0 ? 0 : xmin + 0.1;
      for (let y = Math.ceil(opts.y[0]); y <= Math.floor(opts.y[1]); y++) {
        if (y === 0) continue;
        board.create('segment', [[yAxisX - 0.06, y], [yAxisX + 0.06, y]], thin);
        board.create('text', [yAxisX - 0.1, y, String(y)], { ...fixed, anchorX: 'right', anchorY: 'middle', fontSize: 11, strokeColor: color.muted });
      }

      const [a, b] = [k0 * half, k1 * half];
      board.create('segment', [[a, opts.midline], [b, opts.midline]], { ...fixed, strokeColor: color.accent2, strokeWidth: 1.5, dash: 3 });
      const compareColor = (i: number) => (i === 0 ? color.muted : color.highlight);
      (opts.compare ?? []).forEach((c, i) =>
        board.create('functiongraph', [c.f, a, b], { ...fixed, strokeColor: compareColor(i), strokeWidth: 2, dash: i === 0 ? 2 : 1 }),
      );
      board.create('functiongraph', [opts.f, a, b], { ...fixed, strokeColor: color.accent, strokeWidth: 3 });

      for (const m of opts.marks) {
        board.create('point', [m.x, m.y], { ...fixed, withLabel: false, size: 4, strokeColor: color.accent, fillColor: color.accent });
        board.create('text', [m.x, m.y + (m.below ? -0.2 : 0.2), ctx.tex(m.label)], {
          ...fixed,
          anchorX: 'middle',
          anchorY: m.below ? 'top' : 'bottom',
          fontSize: 13,
          strokeColor: color.ink,
        });
      }

      ctx.legend([
        { label: `$${opts.tex}$`, color: color.accent, width: 3 },
        ...(opts.compare ?? []).map((c, i) => ({ label: `$${c.tex}$`, color: compareColor(i), dash: true })),
        { label: `中線 $y=${opts.midline}$`, color: color.accent2, dash: true, width: 1.5 },
      ]);
      for (const text of opts.readouts ?? []) ctx.readout(() => text);
    },
  };
}

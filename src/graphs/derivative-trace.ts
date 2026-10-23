import { piTicks } from './helpers';
import type { GraphDef } from './types';

/**
 * Shared by the graphs that trace a derivative in calculus lessons (not a graph itself):
 * drag P along y = f(x); its tangent slope is plotted as the point (x, f′(x)), leaving a trace.
 */

interface DerivativeTraceOptions {
  title: string;
  description: string;
  f: (x: number) => number;
  df: (x: number) => number;
  /** LaTeX for the legend, e.g. `y=\sin x`. */
  tex: string;
  dtex: string;
  /** `[left, top, right, bottom]`. */
  box: [number, number, number, number];
  aspect?: number;
  /** Where P can go, and where it starts. */
  range: [number, number];
  start: number;
  /** Label the x-axis at multiples of π/2 (drawn by hand) instead of the default axes. */
  piAxis?: boolean;
  /** Pixel offset of P's label; default below right. */
  labelOffset?: [number, number];
  /** A closing remark under the readout, e.g. what the trace turns out to be. */
  note: string;
}

const num = (v: number) => String(+v.toFixed(2));

export function derivativeTrace(opts: DerivativeTraceOptions): GraphDef {
  const { f, df, box } = opts;
  const [lo, hi] = opts.range;
  return {
    title: opts.title,
    description: opts.description,
    boundingBox: box,
    aspect: opts.aspect,
    axis: !opts.piAxis,
    build(board, ctx) {
      const { color } = ctx;
      if (opts.piAxis) {
        const thin = { fixed: true, strokeColor: color.muted, strokeWidth: 1 };
        board.create('arrow', [[box[0] + 0.1, 0], [box[2] - 0.1, 0]], thin);
        board.create('arrow', [[0, box[3] + 0.1], [0, box[1] - 0.1]], thin);
        piTicks(board, ctx, { y: 0, from: Math.ceil(box[0] / (Math.PI / 2)), to: Math.floor(box[2] / (Math.PI / 2)), tick: 0.05 });
        for (const y of [-1, 1]) {
          board.create('segment', [[-0.06, y], [0.06, y]], thin);
          board.create('text', [-0.1, y, String(y)], { fixed: true, anchorX: 'right', anchorY: 'middle', fontSize: 11, strokeColor: color.muted });
        }
      }

      const curve = board.create('functiongraph', [f, box[0], box[2]], { fixed: true, strokeColor: color.accent, strokeWidth: 3 });
      const P = board.create('glider', [opts.start, f(opts.start), curve], { name: 'P', label: { offset: opts.labelOffset ?? [10, -12] } });
      // Keep P where its tangent and its slope point stay on the frame.
      P.on('drag', () => {
        const x = Math.min(hi, Math.max(lo, P.X()));
        if (x !== P.X()) P.moveTo([x, f(x)]);
      });
      const x = () => P.X();

      board.create('line', [() => [df(x()) * x() - f(x()), -df(x()), 1]], { fixed: true, strokeColor: color.highlight, strokeWidth: 2 });

      // The trace of (t, f′(t)) from the left end up to P.
      const trace = board.create('curve', [[0], [0]], { fixed: true, strokeColor: color.accent2, strokeWidth: 3 });
      trace.updateDataArray = function () {
        const n = 200;
        const xs = Array.from({ length: n + 1 }, (_, i) => lo + ((x() - lo) * i) / n);
        this.dataX = xs;
        this.dataY = xs.map(df);
      };
      const D = board.create('point', [x, () => df(x())], { fixed: true, withLabel: false, size: 5, strokeColor: color.accent2, fillColor: color.accent2 });
      board.create('segment', [P, D], { fixed: true, strokeColor: color.muted, strokeWidth: 1, dash: 1 });

      ctx.legend([
        { label: `$${opts.tex}$`, color: color.accent, width: 3 },
        { label: '$P$ 點的切線', color: color.highlight, width: 2 },
        { label: `描出的點 $(x,f'(x))$：$${opts.dtex}$`, color: color.accent2, width: 3 },
      ]);
      ctx.readout(() => `$x=${num(x())}$：切線斜率 $f'(x)=${num(df(x()))}$，畫成點 $(${num(x())},\\ ${num(df(x()))})$`);
      ctx.readout(() => opts.note);
    },
  };
}

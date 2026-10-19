import type { GraphDef } from './types';

/** Shared by the fixed "angle through a point" diagrams in trig lessons (not a graph itself). */

interface TerminalSideOptions {
  title: string;
  description: string;
  /** The point P on the terminal side; whole numbers. */
  p: [number, number];
  /** LaTeX for r, e.g. `5` or `\sqrt5`. */
  rTex: string;
  /** Another point on the same line through O, on the opposite ray, ruled out by the problem. */
  other?: { p: [number, number]; why: string };
  /** LaTeX name of the line through O and P, drawn dashed, e.g. `y=2x`. */
  line?: string;
}

const quadrantName = (x: number, y: number) => `第${x > 0 ? (y > 0 ? '一' : '四') : y > 0 ? '二' : '三'}象限`;

export function terminalSide(opts: TerminalSideOptions): GraphDef {
  const [px, py] = opts.p;
  const r = Math.hypot(px, py);
  // Room for the circle of radius r, its labels, and a 4:3 frame.
  const h = r * 1.25 + 0.4;
  const w = (h * 4) / 3;
  const deg = (((Math.atan2(py, px) * 180) / Math.PI) + 360) % 360;
  return {
    title: opts.title,
    description: opts.description,
    boundingBox: [-w, h, w, -h],
    // Plain axes without numbers: P's coordinates are labeled, and tick numbers would crowd the legs' labels.
    axis: false,
    build(board, ctx) {
      const { color } = ctx;
      const fixed = { fixed: true, highlight: false };
      board.create('arrow', [[-w * 0.95, 0], [w * 0.95, 0]], { ...fixed, strokeColor: color.muted, strokeWidth: 1 });
      board.create('arrow', [[0, -h * 0.95], [0, h * 0.95]], { ...fixed, strokeColor: color.muted, strokeWidth: 1 });
      board.create('text', [w * 0.95, -h * 0.06, ctx.tex('x')], { ...fixed, anchorX: 'right', anchorY: 'top', strokeColor: color.muted, fontSize: 13 });
      board.create('text', [w * 0.03, h * 0.95, ctx.tex('y')], { ...fixed, anchorX: 'left', anchorY: 'top', strokeColor: color.muted, fontSize: 13 });
      board.create('circle', [[0, 0], r], { ...fixed, strokeColor: color.muted, strokeWidth: 1.5, dash: 2 });
      if (opts.line) {
        board.create('line', [[0, 0], [px, py]], { ...fixed, strokeColor: color.muted, strokeWidth: 1.5, dash: 3 });
      }
      if (opts.other) {
        const [ox, oy] = opts.other.p;
        // Label on the side of the point away from the line through it.
        const offset = ox * oy > 0 ? [10, -10] : [10, 10];
        board.create('point', [ox, oy], { ...fixed, name: `(${ox}, ${oy})`, size: 4, strokeColor: color.muted, fillColor: color.bg, label: { offset, strokeColor: color.muted } });
      }

      const O = board.create('point', [0, 0], { visible: false, ...fixed });
      const X = board.create('point', [1, 0], { visible: false, ...fixed });
      const P = board.create('point', [px, py], { ...fixed, name: `P(${px}, ${py})`, size: 4, strokeColor: color.accent, fillColor: color.accent, label: { offset: [8, 10] } });
      board.create('angle', [X, O, P], {
        ...fixed,
        // Small enough to stay clear of the labels on the legs.
        radius: r * 0.1,
        name: ctx.tex('\\theta'),
        strokeColor: color.accent,
        fillColor: color.accent,
        fillOpacity: 0.12,
        label: { strokeColor: color.accent },
      });
      const foot = board.create('point', [px, 0], { visible: false, ...fixed });
      board.create('segment', [O, P], { ...fixed, strokeColor: color.ink, strokeWidth: 3 });
      board.create('segment', [P, foot], { ...fixed, strokeColor: color.accent, strokeWidth: 3 });
      board.create('segment', [O, foot], { ...fixed, strokeColor: color.accent2, strokeWidth: 3 });

      // Each label is anchored on the side facing away from its segment, so it never sits on a line.
      const gap = h * 0.03;
      type AX = 'left' | 'right' | 'middle';
      type AY = 'top' | 'bottom' | 'middle';
      const text = (x: number, y: number, latex: string, c: string, anchorX: AX, anchorY: AY) =>
        board.create('text', [x, y, ctx.tex(latex)], { ...fixed, anchorX, anchorY, strokeColor: c, fontSize: 14 });
      // The x leg's label goes on the far side of the x-axis from P, toward the foot of the perpendicular;
      // a short leg gets it just past the foot, clear of the θ mark at O.
      const shortLeg = Math.abs(px) < r * 0.5;
      text(
        shortLeg ? px : px * 0.7,
        py > 0 ? -gap : gap,
        `x=${px}`,
        color.accent2,
        shortLeg ? (px < 0 ? 'right' : 'left') : 'middle',
        py > 0 ? 'top' : 'bottom',
      );
      text(px + (px > 0 ? gap : -gap), py / 2, `y=${py}`, color.accent, px > 0 ? 'left' : 'right', 'middle');
      // r beside the middle of OP, on the side away from the triangle: the normal (-y, x)/r
      // points away from the foot of the perpendicular exactly when x and y have the same sign.
      const side = px * py > 0 ? 1 : -1;
      const [nx, ny] = [(side * -py) / r, (side * px) / r];
      text(px / 2 + nx * gap, py / 2 + ny * gap, `r=${opts.rTex}`, color.ink, nx > 0.3 ? 'left' : nx < -0.3 ? 'right' : 'middle', ny > 0.3 ? 'bottom' : ny < -0.3 ? 'top' : 'middle');

      ctx.legend([
        { label: `$x$：水平邊`, color: color.accent2, width: 3 },
        { label: `$y$：鉛直邊`, color: color.accent, width: 3 },
        { label: `半徑 $r$ 的圓`, color: color.muted, dash: true },
        ...(opts.line ? [{ label: `直線 $${opts.line}$`, color: color.muted, dash: true, width: 1.5 }] : []),
      ]);
      ctx.readout(() => `$x=${px}$，$y=${py}$，$r=\\sqrt{x^2+y^2}=${opts.rTex}$；$P$ 在${quadrantName(px, py)}，$\\theta\\approx${+deg.toFixed(1)}^\\circ$`);
      if (opts.other) ctx.readout(() => opts.other!.why);
    },
  };
}

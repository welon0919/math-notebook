import type JXG from 'jsxgraph';

/**
 * Colors read from the site's CSS variables when the board is drawn,
 * so a graph follows light/dark mode without hard-coding any color.
 */
export interface GraphColors {
  /** `--ink`: main lines, text, axes labels */
  ink: string;
  /** `--ink-muted`: secondary lines, de-emphasized objects */
  muted: string;
  /** `--link`: the main highlighted object (curve, draggable points) */
  accent: string;
  /** `--margin-line`: a second, contrasting object (roots, intersections) */
  accent2: string;
  /** `--focus`: emphasis in proof steps */
  highlight: string;
  /** `--border`: grid lines, ticks */
  grid: string;
  /** `--surface`: board background */
  bg: string;
}

export interface GraphContext {
  color: GraphColors;
  /**
   * Adds one line below the graph, re-rendered whenever the board updates.
   * The function returns text with `$...$` math, e.g. `` `$D = ${ctx.fmt(d)}$` ``.
   */
  readout(render: () => string): void;
  /** Rounds to two decimal places for display, e.g. `1.25`, `-0.50`. */
  fmt(x: number): string;
  /** KaTeX HTML for a label, e.g. `board.create('text', [x, y, ctx.tex('c^2')])`. */
  tex(latex: string): string;
  /** Adds a button under the graph, before 重設. Buttons are rebuilt whenever the graph is. */
  button(label: string, onClick: () => void): void;
  /**
   * Plays an animation: calls `frame(p)` with p easing from 0 to 1 over `ms` milliseconds,
   * redrawing the board after each call. With reduced motion it calls `frame(1)` once.
   * Starting another animation stops the one in progress.
   */
  animate(ms: number, frame: (p: number) => void): void;
  /**
   * Proof mode: names objects so `steps` can show, hide and highlight them.
   * Calling it again with the same name adds more objects to that name.
   * A polygon's borders follow the polygon.
   */
  name<T extends JXG.GeometryElement>(id: string, el: T): T;
  /**
   * Proof mode: how far step `n` (1-based) has played, from 0 to 1. Before step `n`
   * it is 0, after it 1, and during an `animate` step it runs from 0 to 1.
   * Compute moving coordinates from it, e.g. `() => x0 + ctx.progress(3) * dx`.
   */
  progress(n: number): number;
}

export interface ProofStep {
  /** Step description; may contain `$...$` math. */
  text: string;
  /** Names of objects that appear from this step on. */
  show?: string[];
  /** Names of objects that disappear from this step on. */
  hide?: string[];
  /** Names of objects drawn in the highlight color during this step; everything else fades. */
  highlight?: string[];
  /** Play `ctx.progress(n)` from 0 to 1 when arriving from the previous step. */
  animate?: boolean;
}

/**
 * One graph, in `src/graphs/<subject>/<name>.ts`, used as `<Graph name="<subject>/<name>" />`.
 *
 * Graph files are also imported at build time to read `title` and `description`,
 * so they must only `import type` from `jsxgraph`; use `board.create(...)` for everything.
 */
export interface GraphDef {
  title: string;
  /** Plain-text description for screen readers and for when the graph can't load. */
  description: string;
  /**
   * `[left, top, right, bottom]` in graph units. Match its width:height to the
   * graph's aspect ratio (default 4:3) so one unit is the same length on both axes.
   */
  boundingBox: [number, number, number, number];
  /** Width / height of the graph; `<Graph aspect>` overrides it. Default 4/3. */
  aspect?: number;
  /** Draw x and y axes. Default true. */
  axis?: boolean;
  build(board: JXG.Board, ctx: GraphContext): void;
  steps?: ProofStep[];
}

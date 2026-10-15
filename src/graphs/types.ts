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
  /** True when the reader prefers reduced motion: skip animations. */
  reducedMotion: boolean;
}

export interface ProofStep {
  /** Step description; may contain `$...$` math. */
  text: string;
  /** Names of objects that appear from this step on. */
  show?: string[];
  /** Names of objects drawn in the highlight color during this step. */
  highlight?: string[];
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
  build(board: JXG.Board, ctx: GraphContext): void;
  steps?: ProofStep[];
}

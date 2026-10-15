import type JXG from 'jsxgraph';
import type { GraphColors, GraphContext, GraphDef } from '../graphs/types';

/**
 * Mounts every `[data-graph]` figure once it scrolls near the viewport.
 * JSXGraph, KaTeX and each graph definition are separate chunks loaded on demand,
 * so pages without graphs never load them and pages with graphs don't wait for them.
 */

type JXGModule = typeof JXG;

const defLoaders = import.meta.glob<{ default: GraphDef }>('../graphs/*/*.ts');

let jxg: Promise<JXGModule> | undefined;
const loadJXG = () => (jxg ??= import('jsxgraph').then((m) => m.default));

let math: Promise<typeof import('../lib/math')> | undefined;
const loadMath = () => (math ??= import('../lib/math'));

const dark = matchMedia('(prefers-color-scheme: dark)');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

function readColors(): GraphColors {
  const style = getComputedStyle(document.documentElement);
  const v = (name: string) => style.getPropertyValue(name).trim();
  return {
    ink: v('--ink'),
    muted: v('--ink-muted'),
    accent: v('--link'),
    accent2: v('--margin-line'),
    highlight: v('--focus'),
    grid: v('--border'),
    bg: v('--surface'),
  };
}

/** Default element styles for a board, so graphs only set colors where they mean something. */
function theme(c: GraphColors) {
  const stroke = (color: string) => ({ strokeColor: color });
  const fill = (color: string) => ({ fillColor: color });
  const label = { ...stroke(c.ink), fontSize: 14, cssDefaultStyle: 'font-family: var(--font-sans);' };
  return {
    board: {
      defaultAxes: {
        x: { ...stroke(c.muted), ticks: { ...stroke(c.grid), label: { ...stroke(c.muted), fontSize: 12 } } },
        y: { ...stroke(c.muted), ticks: { ...stroke(c.grid), label: { ...stroke(c.muted), fontSize: 12 } } },
      },
    },
    // No hover highlighting: JSXGraph's version recolors and fills elements (a curve's
    // inside gets filled), does nothing on touch screens, and proof steps have their own.
    elements: { ...stroke(c.ink), highlight: false },
    text: label,
    label,
    // Draggable points are big enough to see; the touch hit area comes from `precision.touch`.
    point: { ...stroke(c.accent), ...fill(c.accent), size: 6 },
    glider: { ...stroke(c.accent), ...fill(c.accent), size: 6 },
    line: { ...stroke(c.ink), strokeWidth: 2 },
    segment: { ...stroke(c.ink), strokeWidth: 2 },
    circle: { ...stroke(c.ink), strokeWidth: 2 },
    curve: { ...stroke(c.accent), strokeWidth: 3 },
    functiongraph: { ...stroke(c.accent), strokeWidth: 3 },
    polygon: { ...fill(c.accent), fillOpacity: 0.15, borders: { ...stroke(c.ink) } },
    angle: { ...stroke(c.ink), ...fill(c.highlight), fillOpacity: 0.3 },
    slider: {
      ...stroke(c.accent),
      ...fill(c.bg),
      size: 7,
      baseline: stroke(c.muted),
      highline: { ...stroke(c.accent), strokeWidth: 4 },
      ticks: stroke(c.muted),
      label: label,
    },
  };
}

/**
 * Hover cue for everything the reader can drag (points and slider handles): the
 * focus color, a thicker outline and a grab cursor. Hover highlighting is off
 * for everything else (see `theme`).
 */
const draggableTypes = new Set(['point', 'glider', 'slider']);

function markDraggable(board: JXG.Board, c: GraphColors) {
  for (const el of Object.values(board.objects)) {
    // JSXGraph's own `draggable()` leaves out gliders (which include slider handles),
    // and `isDraggable` alone also covers texts and axis ticks.
    if (!draggableTypes.has(el.elType) || !el.isDraggable || el.evalVisProp('fixed')) continue;
    el.setAttribute({
      highlight: true,
      highlightStrokeColor: c.highlight,
      highlightFillColor: c.highlight,
      highlightStrokeWidth: 4,
    });
    if (el.rendNode) el.rendNode.style.cursor = 'grab';
  }
}

/** Rounds to two decimal places without printing `-0.00`. */
function fmt(x: number): string {
  // toPrecision first so values like 1.005 (stored as 1.00499...) round the way they read.
  const r = Math.round(Number((x * 100).toPrecision(12))) / 100;
  return (r === 0 ? 0 : r).toFixed(2);
}

let boxCount = 0;

class GraphMount {
  private board: JXG.Board | undefined;
  private readouts: { render: () => string; el: HTMLElement; last?: string }[] = [];
  private frame = 0;
  private boardEl: HTMLElement;
  private readonly status: HTMLElement;
  private readonly readoutEl: HTMLElement;
  private readonly resetButton: HTMLButtonElement;

  constructor(
    private readonly JXG: JXGModule,
    private readonly def: GraphDef,
    private readonly renderMathText: (text: string) => string,
    root: HTMLElement,
  ) {
    this.boardEl = root.querySelector('[data-graph-board]')!;
    this.status = root.querySelector('[data-graph-status]')!;
    this.readoutEl = root.querySelector('[data-graph-readout]')!;
    this.resetButton = root.querySelector('[data-graph-reset]')!;
    this.resetButton.addEventListener('click', () => this.draw());
  }

  /** (Re)builds the board from scratch: used for the first draw, reset, and theme changes. */
  draw() {
    const { JXG, def } = this;
    if (this.board) JXG.JSXGraph.freeBoard(this.board);
    // Each board gets a fresh container: JSXGraph leaves inline styles and ARIA attributes behind.
    // The inline `position` matters most: without it JSXGraph sets `position: relative`,
    // and the emptied container collapses to 0 height before the next board measures it.
    const container = document.createElement('div');
    container.className = 'graph-board';
    container.dataset.graphBoard = '';
    container.id = `graph-board-${++boxCount}`;
    container.style.position = 'absolute';
    this.boardEl.replaceWith(container);
    this.boardEl = container;
    cancelAnimationFrame(this.frame);
    this.readouts = [];
    this.readoutEl.replaceChildren();

    const colors = readColors();
    JXG.themes['math-notebook'] = theme(colors);
    const board = JXG.JSXGraph.initBoard(this.boardEl.id, {
      boundingbox: [...def.boundingBox],
      // JSXGraph uses this as the board's aria-label.
      title: def.title,
      theme: 'math-notebook',
      axis: true,
      keepAspectRatio: false,
      showCopyright: false,
      showNavigation: false,
      showInfobox: false,
      pan: { enabled: false },
      zoom: { enabled: false },
      // Dragging on empty space scrolls the page instead of being captured by the graph.
      browserPan: true,
      keyboard: { enabled: true },
    });
    this.board = board;

    const ctx: GraphContext = {
      color: colors,
      fmt,
      reducedMotion: reducedMotion.matches,
      readout: (render) => {
        const el = document.createElement('p');
        this.readoutEl.append(el);
        this.readouts.push({ render, el });
      },
    };
    board.suspendUpdate();
    def.build(board, ctx);
    markDraggable(board, colors);
    board.unsuspendUpdate();

    this.readoutEl.hidden = this.readouts.length === 0;
    this.renderReadouts();
    board.on('update', () => {
      cancelAnimationFrame(this.frame);
      this.frame = requestAnimationFrame(() => this.renderReadouts());
    });
  }

  private renderReadouts() {
    for (const r of this.readouts) {
      const text = r.render();
      if (text === r.last) continue;
      r.last = text;
      r.el.innerHTML = this.renderMathText(text);
    }
  }

  show() {
    this.status.remove();
    this.resetButton.disabled = false;
  }
}

const mounts: GraphMount[] = [];

async function mount(root: HTMLElement) {
  const name = root.dataset.graph!;
  const status = root.querySelector<HTMLElement>('[data-graph-status]')!;
  try {
    const [JXG, def, { renderMathText }] = await Promise.all([
      loadJXG(),
      defLoaders[`../graphs/${name}.ts`]().then((m) => m.default),
      loadMath(),
    ]);
    const m = new GraphMount(JXG, def, renderMathText, root);
    m.draw();
    m.show();
    mounts.push(m);
  } catch (error) {
    status.textContent = '圖形無法載入，請重新整理頁面再試一次。';
    throw error;
  }
}

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      void mount(entry.target as HTMLElement);
    }
  },
  { rootMargin: '200px 0px' },
);

for (const root of document.querySelectorAll<HTMLElement>('[data-graph]')) {
  observer.observe(root);
}

// Colors come from CSS variables, so redraw when the color scheme changes.
dark.addEventListener('change', () => {
  for (const m of mounts) m.draw();
});

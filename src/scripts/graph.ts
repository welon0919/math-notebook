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

type MathModule = typeof import('../lib/math');
let math: Promise<MathModule> | undefined;
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

/** Styles a proof step changes, saved right after `build` so every step starts from them. */
interface Style {
  strokeColor: string;
  fillColor: string;
  strokeOpacity: Opacity;
  fillOpacity: Opacity;
}

/** Graphs may give opacity as a function (e.g. shading that depends on a slider). */
type Opacity = number | (() => number);
const scaleOpacity = (o: Opacity, k: number): Opacity => (typeof o === 'function' ? () => o() * k : o * k);
const atLeast = (o: Opacity, min: number): Opacity => (typeof o === 'function' ? () => Math.max(o(), min) : Math.max(o, min));

/** How much the objects outside a step's `highlight` fade. */
const fadedOpacity = 0.45;
/** Reference elements that keep their look in every step. */
const neverFaded = new Set(['grid', 'axis', 'ticks']);
const animationMs = 1200;
const ease = (t: number) => (1 - Math.cos(Math.PI * t)) / 2;

class GraphMount {
  private board: JXG.Board | undefined;
  private colors: GraphColors | undefined;
  private readouts: { render: () => string; el: HTMLElement; last?: string }[] = [];
  private frame = 0;
  private boardEl: HTMLElement;
  private readonly status: HTMLElement;
  private readonly readoutEl: HTMLElement;
  private readonly buttons: HTMLButtonElement[];
  /** Buttons and rows added by the graph with `ctx.button`, removed before each rebuild. */
  private graphButtons: HTMLButtonElement[] = [];
  private buttonRows = new Map<string, HTMLElement>();
  private pressed: { button: HTMLButtonElement; pressed: () => boolean }[] = [];
  private legendEl: HTMLElement | undefined;

  // Proof mode
  private readonly steps;
  private step = 0;
  /** `progress[i]` is `ctx.progress(i + 1)`. */
  private progress: number[] = [];
  private tween = 0;
  private named = new Map<string, JXG.GeometryElement[]>();
  private styles = new Map<JXG.GeometryElement, Style>();
  /**
   * Each object's own visibility from `build`: steps never show what a graph hides itself
   * (e.g. a polygon's borders), and showing restores a visibility rule given as a function.
   */
  private ownVisibility = new Map<JXG.GeometryElement, unknown>();
  private readonly stepTexts: string[] = [];
  private readonly stepEl: HTMLElement | null;
  private readonly prevButton: HTMLButtonElement | null;
  private readonly nextButton: HTMLButtonElement | null;

  constructor(
    private readonly JXG: JXGModule,
    private readonly def: GraphDef,
    private readonly mathLib: MathModule,
    private readonly root: HTMLElement,
  ) {
    this.boardEl = root.querySelector('[data-graph-board]')!;
    this.status = root.querySelector('[data-graph-status]')!;
    this.readoutEl = root.querySelector('[data-graph-readout]')!;
    this.buttons = [...root.querySelectorAll<HTMLButtonElement>('.graph-controls button')];
    root.querySelector('[data-graph-reset]')?.addEventListener('click', () => this.draw());

    this.steps = 'graphProof' in root.dataset ? (def.steps ?? []) : [];
    this.stepEl = root.querySelector('[data-graph-step]');
    this.prevButton = root.querySelector('[data-graph-prev]');
    this.nextButton = root.querySelector('[data-graph-next]');
    for (const li of root.querySelectorAll('[data-graph-steps] > li')) this.stepTexts.push(li.innerHTML);
    this.prevButton?.addEventListener('click', () => this.goTo(this.step - 1));
    this.nextButton?.addEventListener('click', () => this.goTo(this.step + 1));
    root.querySelector('[data-graph-restart]')?.addEventListener('click', () => {
      this.step = 0;
      this.draw();
      this.updateStepUI();
    });
  }

  /**
   * (Re)builds the board from scratch: used for the first draw, reset, and theme changes.
   * In proof mode the current step is kept, shown in its finished state.
   */
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
    cancelAnimationFrame(this.tween);
    this.readouts = [];
    this.readoutEl.replaceChildren();
    for (const b of this.graphButtons) b.remove();
    this.graphButtons = [];
    for (const row of this.buttonRows.values()) row.remove();
    this.buttonRows = new Map();
    this.pressed = [];
    this.legendEl?.remove();
    this.legendEl = undefined;
    this.named = new Map();
    this.setProgress();

    const colors = readColors();
    this.colors = colors;
    JXG.themes['math-notebook'] = theme(colors);
    const board = JXG.JSXGraph.initBoard(this.boardEl.id, {
      boundingbox: [...def.boundingBox],
      // JSXGraph uses this as the board's aria-label.
      title: def.title,
      theme: 'math-notebook',
      axis: def.axis ?? true,
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
      tex: (latex) => this.mathLib.renderLatex(latex),
      legend: (items) => {
        const list = document.createElement('ul');
        list.className = 'graph-legend';
        for (const { label, color, dash = false, width = 2.5, opacity = 1 } of items) {
          const li = document.createElement('li');
          const sample = `<svg width="28" height="10" aria-hidden="true"><line x1="1" y1="5" x2="27" y2="5" stroke="${color}" stroke-width="${width}" stroke-opacity="${opacity}"${dash ? ' stroke-dasharray="5 3"' : ''}/></svg>`;
          li.innerHTML = `${sample}<span>${this.mathLib.renderMathText(label)}</span>`;
          list.append(li);
        }
        this.readoutEl.before(list);
        this.legendEl = list;
      },
      button: (label, onClick, { row, pressed } = {}) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'graph-button';
        button.textContent = label;
        button.addEventListener('click', () => {
          onClick();
          this.updatePressed();
        });
        // The main row (with 重設); choice rows also use .graph-controls for spacing.
        const controls = this.root.querySelector<HTMLElement>('.graph-controls:not(.graph-choice-row)')!;
        if (row) {
          let rowEl = this.buttonRows.get(row);
          if (!rowEl) {
            rowEl = document.createElement('div');
            rowEl.className = 'graph-controls graph-choice-row';
            rowEl.setAttribute('role', 'group');
            rowEl.setAttribute('aria-label', row);
            const name = document.createElement('span');
            name.className = 'graph-choice-label';
            name.textContent = row;
            rowEl.append(name);
            controls.before(rowEl);
            this.buttonRows.set(row, rowEl);
          }
          rowEl.append(button);
        } else {
          controls.insertBefore(button, controls.querySelector('[data-graph-reset]'));
        }
        if (pressed) this.pressed.push({ button, pressed });
        this.graphButtons.push(button);
      },
      animate: (ms, frame) => {
        cancelAnimationFrame(this.tween);
        if (reducedMotion.matches) {
          frame(1);
          board.update();
          return;
        }
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / ms);
          frame(ease(t));
          board.update();
          if (t < 1) this.tween = requestAnimationFrame(step);
        };
        this.tween = requestAnimationFrame(step);
      },
      readout: (render) => {
        const el = document.createElement('p');
        this.readoutEl.append(el);
        this.readouts.push({ render, el });
      },
      name: (id, el) => {
        const list = this.named.get(id) ?? [];
        list.push(el);
        // A polygon's borders are separate elements; they show, hide and highlight with it.
        const borders = (el as Partial<JXG.Polygon>).borders;
        if (borders) list.push(...borders);
        this.named.set(id, list);
        return el;
      },
      progress: (n) => this.progress[n - 1] ?? 0,
    };
    board.suspendUpdate();
    def.build(board, ctx);
    markDraggable(board, colors);
    this.styles = new Map(
      Object.values(board.objects).map((el) => [
        el,
        {
          strokeColor: el.visProp.strokecolor,
          fillColor: el.visProp.fillcolor,
          strokeOpacity: el.visProp.strokeopacity,
          fillOpacity: el.visProp.fillopacity,
        },
      ]),
    );
    this.ownVisibility = new Map(Object.values(board.objects).map((el) => [el, el.visProp.visible]));
    if (this.steps.length > 0) {
      this.checkStepNames();
      this.applyStep();
    }
    board.unsuspendUpdate();

    this.readoutEl.hidden = this.readouts.length === 0;
    this.renderReadouts();
    board.on('update', () => {
      cancelAnimationFrame(this.frame);
      this.frame = requestAnimationFrame(() => this.renderReadouts());
    });
  }

  private updatePressed() {
    for (const { button, pressed } of this.pressed) button.setAttribute('aria-pressed', String(pressed()));
  }

  private renderReadouts() {
    this.updatePressed();
    for (const r of this.readouts) {
      const text = r.render();
      if (text === r.last) continue;
      r.last = text;
      r.el.innerHTML = this.mathLib.renderMathText(text);
    }
  }

  show() {
    this.status.remove();
    for (const button of this.buttons) button.disabled = false;
    if (this.steps.length > 0) this.updateStepUI();
  }

  /**
   * Proof mode: moves to step `k` (0-based). Only stepping forward by one plays the
   * step's animation; going back or jumping shows the finished state directly.
   */
  goTo(k: number) {
    const board = this.board;
    if (!board || k < 0 || k >= this.steps.length) return;
    cancelAnimationFrame(this.tween);
    const play = k === this.step + 1 && this.steps[k].animate && !reducedMotion.matches;
    this.step = k;
    this.setProgress();
    this.applyStep();
    this.updateStepUI();
    if (!play) {
      board.update();
      return;
    }
    this.progress[k] = 0;
    const start = performance.now();
    const frame = (now: number) => {
      const t = Math.min(1, (now - start) / animationMs);
      this.progress[k] = ease(t);
      board.update();
      if (t < 1) this.tween = requestAnimationFrame(frame);
    };
    this.tween = requestAnimationFrame(frame);
  }

  /** Steps before and at the current one are finished; later ones haven't started. */
  private setProgress() {
    this.progress = this.steps.map((_, i) => (i <= this.step ? 1 : 0));
  }

  private elementsOf(names: string[] | undefined): JXG.GeometryElement[] {
    return (names ?? []).flatMap((n) => this.named.get(n) ?? []);
  }

  /** Visibility and highlighting for the current step. */
  private applyStep() {
    const shown = new Map<string, boolean>();
    // Named objects that some step shows start hidden; the rest are always visible.
    for (const step of this.steps) for (const n of step.show ?? []) shown.set(n, false);
    for (const step of this.steps.slice(0, this.step + 1)) {
      for (const n of step.show ?? []) shown.set(n, true);
      for (const n of step.hide ?? []) shown.set(n, false);
    }
    for (const [n, visible] of shown) {
      for (const el of this.named.get(n) ?? []) {
        const own = this.ownVisibility.get(el);
        el.setAttribute({ visible: visible && own !== false ? (own ?? true) : false });
      }
    }

    const highlighted = new Set(this.elementsOf(this.steps[this.step].highlight));
    const c = this.colors!;
    for (const [el, style] of this.styles) {
      if (highlighted.size === 0) {
        el.setAttribute(style);
      } else if (highlighted.has(el)) {
        el.setAttribute({
          ...style,
          strokeColor: c.highlight,
          fillColor: c.highlight,
          fillOpacity: atLeast(style.fillOpacity, 0.35),
        });
      } else if (neverFaded.has(el.elType)) {
        el.setAttribute(style);
      } else {
        el.setAttribute({
          ...style,
          strokeOpacity: scaleOpacity(style.strokeOpacity, fadedOpacity),
          fillOpacity: scaleOpacity(style.fillOpacity, fadedOpacity),
        });
      }
    }
  }

  private updateStepUI() {
    const n = this.step + 1;
    const total = this.steps.length;
    if (this.stepEl) {
      this.stepEl.hidden = false;
      this.stepEl.innerHTML =
        `<p class="graph-step-count">步驟 ${n}／${total}</p>` + `<p>${this.stepTexts[this.step] ?? ''}</p>`;
    }
    // Keep keyboard focus on a step button when the one in focus becomes disabled.
    const focused = document.activeElement;
    if (this.prevButton) this.prevButton.disabled = n === 1;
    if (this.nextButton) this.nextButton.disabled = n === total;
    if (focused === this.prevButton && n === 1) this.nextButton?.focus();
    if (focused === this.nextButton && n === total) this.prevButton?.focus();
    for (const el of proofSteps()) {
      if (Number(el.dataset.proofStep) === n) el.setAttribute('aria-current', 'step');
      else el.removeAttribute('aria-current');
    }
  }

  /** Mistyped names in `steps` would silently do nothing, so report them. */
  private checkStepNames() {
    for (const [i, step] of this.steps.entries()) {
      for (const n of [...(step.show ?? []), ...(step.hide ?? []), ...(step.highlight ?? [])]) {
        if (!this.named.has(n)) console.error(`Graph ${this.root.dataset.graph}, step ${i + 1}: no object named "${n}".`);
      }
    }
  }
}

/** Paragraphs marked with <ProofStep n>, which follow the page's proof graph. */
const proofSteps = () => document.querySelectorAll<HTMLElement>('[data-proof-step]');

const mounts = new Map<HTMLElement, Promise<GraphMount>>();

function ensureMounted(root: HTMLElement): Promise<GraphMount> {
  let m = mounts.get(root);
  if (!m) {
    observer.unobserve(root);
    m = mount(root);
    mounts.set(root, m);
  }
  return m;
}

async function mount(root: HTMLElement): Promise<GraphMount> {
  const name = root.dataset.graph!;
  const status = root.querySelector<HTMLElement>('[data-graph-status]')!;
  try {
    const [JXG, def, mathLib] = await Promise.all([
      loadJXG(),
      defLoaders[`../graphs/${name}.ts`]().then((m) => m.default),
      loadMath(),
    ]);
    const m = new GraphMount(JXG, def, mathLib, root);
    m.draw();
    m.show();
    return m;
  } catch (error) {
    status.textContent = '圖形無法載入，請重新整理頁面再試一次。';
    throw error;
  }
}

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) void ensureMounted(entry.target as HTMLElement);
    }
  },
  { rootMargin: '200px 0px' },
);

for (const root of document.querySelectorAll<HTMLElement>('[data-graph]')) {
  observer.observe(root);
}

// Clicking a proof paragraph (or its "步驟 n" button) moves the proof graph to that step.
const proofRoot = document.querySelector<HTMLElement>('[data-graph-proof]');
if (proofRoot) {
  const total = Number(proofRoot.dataset.graphProof);
  const marked = [...proofSteps()];
  if (marked.length > 0 && marked.map((el) => el.dataset.proofStep).join() !== Array.from({ length: total }, (_, i) => i + 1).join()) {
    console.error(`The page's <ProofStep> paragraphs must be numbered 1 to ${total}, matching the graph's steps.`);
  }
  for (const el of marked) {
    el.addEventListener('click', (event) => {
      // Leave links, solutions and text selection alone.
      const target = event.target as Element;
      if (target.closest('a, details')) return;
      if (!target.closest('button') && getSelection()?.toString()) return;
      const k = Number(el.dataset.proofStep) - 1;
      void ensureMounted(proofRoot).then((m) => m.goTo(k));
      // The graph may have scrolled away while reading; bring it back if it is completely hidden.
      const box = proofRoot.getBoundingClientRect();
      if (box.bottom < 0 || box.top > innerHeight) {
        proofRoot.scrollIntoView({ block: 'nearest', behavior: reducedMotion.matches ? 'auto' : 'smooth' });
      }
    });
  }
}

// Colors come from CSS variables, so redraw when the color scheme changes.
dark.addEventListener('change', async () => {
  for (const result of await Promise.allSettled(mounts.values())) {
    if (result.status === 'fulfilled') result.value.draw();
  }
});

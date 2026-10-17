import { shadeUnder, snap } from '../helpers';
import type { GraphDef } from '../types';

const step = 0.05;
// f(t) = 1 + 0.6 sin(1.5t), and its accumulated area from 0: A(x) = x + 0.4(1 − cos 1.5x).
const f = (t: number) => 1 + 0.6 * Math.sin(1.5 * t);
const A = (x: number) => x + 0.4 * (1 - Math.cos(1.5 * x));
// Check A' = f numerically, since the proof graph depends on it.
for (const x of [0.3, 1.7, 3.2]) {
  const d = (A(x + 1e-6) - A(x - 1e-6)) / 2e-6;
  if (Math.abs(d - f(x)) > 1e-6) throw new Error('ftc: A is not an antiderivative of f.');
}

// Upper panel: A is drawn shifted up by `top`, with its own horizontal axis.
const top = 2.3;
const xmax = 3.8;

/** Smallest and largest value of f on [p, q], by sampling densely. */
function range(p: number, q: number): [number, number] {
  let [m, M] = [Infinity, -Infinity];
  for (let i = 0; i <= 200; i++) {
    const v = f(p + ((q - p) * i) / 200);
    m = Math.min(m, v);
    M = Math.max(M, v);
  }
  return [m, M];
}

export default {
  title: '微積分基本定理：累積面積的變化率',
  description:
    '下方是 y = f(t)，陰影是從 0 到 x 的面積 A(x)；上方同步畫出 y = A(x)。多走一小段 h，增加的面積夾在高 m_h 和 M_h 的兩個長方形之間，所以差商 (A(x+h) − A(x))/h 夾在 m_h 和 M_h 之間；h → 0 時兩者都趨近 f(x)，所以 A 的切線斜率 A′(x) = f(x)。拖動 x 試試看。',
  boundingBox: [-0.6, 6.8, 4.6, -0.6],
  aspect: 0.72,
  axis: false,
  build(board, ctx) {
    const { color } = ctx;
    const thin = { fixed: true, strokeColor: color.muted, strokeWidth: 1 };
    for (const y0 of [0, top]) {
      board.create('arrow', [[-0.3, y0], [xmax + 0.4, y0]], thin);
      board.create('arrow', [[0, y0 - 0.2], [0, y0 + (y0 === 0 ? 2 : 4.3)]], thin);
    }
    for (let k = 1; k <= Math.floor(xmax); k++) {
      board.create('text', [k, -0.08, String(k)], { fixed: true, anchorX: 'middle', anchorY: 'top', fontSize: 12, strokeColor: color.muted });
    }
    const label = (x: number, y: number, latex: string, c: string) =>
      board.create('text', [x, y, ctx.tex(latex)], { fixed: true, anchorX: 'left', anchorY: 'middle', fontSize: 14, strokeColor: c });
    label(0.1, 1.85, 'y=f(t)', color.accent);
    label(0.1, top + 4.3, 'y=A(x)', color.accent2);

    const track = board.create('segment', [[0.2, 0], [2.8, 0]], { visible: false, fixed: true });
    const X = board.create('glider', [1.2, 0, track], { name: 'x', snapToGrid: true, snapSizeX: step, snapSizeY: step, label: { offset: [-4, -16] } });
    const x = () => snap(X.X(), step);
    const sh = board.create('slider', [[2.0, 6.6], [3.5, 6.6], [0.05, 0.6, 1]], { name: 'h', snapWidth: step, digits: 2 });
    const h = () => snap(sh.Value(), step);

    ctx.name('area', shadeUnder(board, f, () => 0, x, { fillColor: color.accent, fillOpacity: 0.25 }));
    board.create('functiongraph', [f, 0, xmax], { strokeColor: color.accent });
    ctx.name('acurve', board.create('functiongraph', [(t: number) => top + A(t), 0, xmax], { strokeColor: color.accent2 }));
    const PA = board.create('point', [x, () => top + A(x())], { fixed: true, withLabel: false, size: 4, strokeColor: color.accent2, fillColor: color.accent2 });
    ctx.name('acurve', PA);
    ctx.name('acurve', board.create('segment', [X, PA], { strokeColor: color.muted, strokeWidth: 1, dash: 1 }));

    // Step 2: the extra strip from x to x + h, and the matching rise of A.
    ctx.name('strip', shadeUnder(board, f, x, () => x() + h(), { fillColor: color.accent2, fillOpacity: 0.35 }));
    ctx.name('h', sh);
    const PB = board.create('point', [() => x() + h(), () => top + A(x() + h())], { fixed: true, withLabel: false, size: 3, strokeColor: color.accent2, fillColor: color.accent2 });
    ctx.name('strip', PB);
    ctx.name('strip', board.create('segment', [PA, PB], { strokeColor: color.accent2, strokeWidth: 2, dash: 2 }));

    // Step 3: rectangles of height m_h and M_h over the strip.
    const rect = (height: () => number, c: string) =>
      board.create('polygon', [[x, () => 0], [() => x() + h(), () => 0], [() => x() + h(), height], [x, height]].map((xy) => board.create('point', xy, { visible: false, fixed: true })), {
        fixed: true,
        vertices: { visible: false },
        fillOpacity: 0,
        borders: { strokeColor: c, strokeWidth: 2, dash: 2 },
      });
    ctx.name('bounds', rect(() => range(x(), x() + h())[0], color.ink));
    ctx.name('bounds', rect(() => range(x(), x() + h())[1], color.highlight));

    // Step 4: tangent to A at x with slope f(x), and a slope triangle of run 1.
    const tangent = (t: number) => top + A(x()) + f(x()) * (t - x());
    ctx.name('tangent', board.create('functiongraph', [tangent, () => x() - 0.8, () => x() + 1.3], { strokeColor: color.highlight, strokeWidth: 2 }));
    const run = board.create('point', [() => x() + 1, () => top + A(x())], { visible: false, fixed: true });
    const rise = board.create('point', [() => x() + 1, () => tangent(x() + 1)], { visible: false, fixed: true });
    ctx.name('tangent', board.create('segment', [PA, run], { strokeColor: color.highlight, strokeWidth: 1.5 }));
    ctx.name('tangent', board.create('segment', [run, rise], { strokeColor: color.highlight, strokeWidth: 3 }));
    ctx.name('tangent', board.create('text', [() => x() + 1.08, () => top + A(x()) + f(x()) / 2, ctx.tex('f(x)')], { fixed: true, anchorX: 'left', fontSize: 13, strokeColor: color.highlight }));
    // The same height f(x) in the lower panel.
    ctx.name('tangent', board.create('segment', [X, [x, () => f(x())]], { strokeColor: color.highlight, strokeWidth: 3 }));

    const fm = ctx.fmt;
    ctx.readout(() => `$x=${fm(x())}$，$A(x)=${fm(A(x()))}$，$f(x)=${fm(f(x()))}$`);
    ctx.readout(() => {
      const [m, M] = range(x(), x() + h());
      return `$h=${fm(h())}$：$m_h=${fm(m)}\\le\\dfrac{A(x+h)-A(x)}{h}=${fm((A(x() + h()) - A(x())) / h())}\\le M_h=${fm(M)}$`;
    });
  },
  steps: [
    {
      text: '令 $A(x)=\\int_0^x f(t)\\,dt$，就是陰影的面積。拖動 $x$，上方同步畫出 $y=A(x)$。',
      show: ['area', 'acurve'],
    },
    {
      text: '再往右走 $h$，增加的面積是 $A(x+h)-A(x)=\\int_x^{x+h}f(t)\\,dt$。',
      show: ['strip', 'h'],
      highlight: ['strip'],
    },
    {
      text: '這一條面積夾在高 $m_h$ 和 $M_h$ 的兩個長方形之間，所以 $m_h\\le\\dfrac{A(x+h)-A(x)}{h}\\le M_h$。',
      show: ['bounds'],
      highlight: ['bounds', 'strip'],
    },
    {
      text: '$h\\to 0$ 時 $m_h$ 和 $M_h$ 都趨近 $f(x)$，所以 $A$ 的切線斜率 $A\'(x)=f(x)$。',
      show: ['tangent'],
      hide: ['strip', 'bounds', 'h'],
      highlight: ['tangent'],
    },
  ],
} satisfies GraphDef;

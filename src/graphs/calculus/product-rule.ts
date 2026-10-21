import type { GraphDef } from '../types';

// The rectangle's sides at x, and how much they grow when x becomes x + h.
const [F, G] = [3, 2];
const [DF, DG] = [0.9, 0.6];

export default {
  title: '乘法法則：長方形面積的變化',
  description:
    '一個長方形的寬是 f(x)、高是 g(x)，面積 f(x)g(x)。x 變成 x + h 時，寬增加 Δf、高增加 Δg，面積多出三塊：右邊寬 Δf、高 g 的長條，上面寬 f、高 Δg 的長條，以及右上角 Δf 乘 Δg 的小長方形。最後一步讓 h 變小，兩個長條隨著 h 變細，角落的小長方形縮得更快，除以 h 之後趨近 0。',
  boundingBox: [-0.9, 3.4, 4.7, -0.7],
  aspect: 5.6 / 4.1,
  axis: false,
  build(board, ctx) {
    const { color } = ctx;
    // Growth plays in step 2; step 4 shrinks h back towards 0.
    const k = () => ctx.progress(2) * (1 - 0.85 * ctx.progress(4));
    const df = () => DF * k();
    const dg = () => DG * k();

    const rect = (x0: () => number, y0: () => number, x1: () => number, y1: () => number, fill: string, opacity: number) =>
      board.create(
        'polygon',
        [[x0, y0], [x1, y0], [x1, y1], [x0, y1]].map((xy) => board.create('point', xy, { visible: false, fixed: true })),
        { fixed: true, vertices: { visible: false }, fillColor: fill, fillOpacity: opacity, borders: { strokeColor: color.ink, strokeWidth: 1.5 } },
      );
    const c = (v: number) => () => v;
    const text = (x: () => number, y: () => number, latex: string, attrs: object) =>
      board.create('text', [x, y, ctx.tex(latex)], { fixed: true, fontSize: 14, strokeColor: color.ink, ...attrs });

    ctx.name('base', rect(c(0), c(0), c(F), c(G), color.accent, 0.15));
    ctx.name('base', text(c(F / 2), c(G / 2), 'f(x)\\,g(x)', { anchorX: 'middle', anchorY: 'middle' }));
    ctx.name('base', text(c(F / 2), c(-0.12), 'f(x)', { anchorX: 'middle', anchorY: 'top' }));
    ctx.name('base', text(c(-0.12), c(G / 2), 'g(x)', { anchorX: 'right', anchorY: 'middle' }));

    ctx.name('right', rect(c(F), c(0), () => F + df(), c(G), color.accent2, 0.35));
    ctx.name('right', text(() => F + df() + 0.08, c(G / 2), 'g\\,\\Delta f', { anchorX: 'left', anchorY: 'middle', strokeColor: color.accent2 }));
    ctx.name('top', rect(c(0), c(G), c(F), () => G + dg(), color.accent2, 0.35));
    ctx.name('top', text(c(F / 2), () => G + dg() + 0.08, 'f\\,\\Delta g', { anchorX: 'middle', anchorY: 'bottom', strokeColor: color.accent2 }));
    ctx.name('corner', rect(c(F), c(G), () => F + df(), () => G + dg(), color.highlight, 0.6));
    ctx.name('corner', text(() => F + df() + 0.08, () => G + dg() + 0.08, '\\Delta f\\,\\Delta g', { anchorX: 'left', anchorY: 'bottom' }));
    ctx.name('deltas', text(() => F + df() / 2, c(-0.12), '\\Delta f', { anchorX: 'middle', anchorY: 'top', visible: () => k() > 0.3 }));
    ctx.name('deltas', text(c(-0.12), () => G + dg() / 2, '\\Delta g', { anchorX: 'right', anchorY: 'middle', visible: () => k() > 0.3 }));

    const area = (n: number) => String(+n.toFixed(3));
    ctx.readout(() =>
      k() === 0
        ? '面積 $f(x)\\,g(x)$'
        : `兩個長條 $g\\,\\Delta f=${area(G * df())}$、$f\\,\\Delta g=${area(F * dg())}$；角落 $\\Delta f\\,\\Delta g=${area(df() * dg())}$`,
    );
  },
  steps: [
    { text: '寬 $f(x)$、高 $g(x)$ 的長方形，面積是 $f(x)g(x)$。', show: ['base'] },
    {
      text: '$x$ 變成 $x+h$：寬增加 $\\Delta f=f(x+h)-f(x)$，高增加 $\\Delta g=g(x+h)-g(x)$。',
      show: ['right', 'top', 'corner', 'deltas'],
      animate: true,
    },
    {
      text: '多出的面積是兩個長條加一個角落：$\\Delta(fg)=g\\,\\Delta f+f\\,\\Delta g+\\Delta f\\,\\Delta g$。',
      highlight: ['right', 'top'],
    },
    {
      text: '除以 $h$ 再讓 $h\\to0$：長條給出 $g f\'+f g\'$，角落 $\\frac{\\Delta f}{h}\\,\\Delta g\\to f\'\\cdot0=0$。',
      highlight: ['corner'],
      animate: true,
    },
  ],
} satisfies GraphDef;

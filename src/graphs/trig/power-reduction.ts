import { piTicks } from '../helpers';
import type { GraphDef } from '../types';

const num = (v: number) => String(+v.toFixed(2));
const [xmin, xmax] = [-0.3, 2 * Math.PI + 0.3];

const choices = [
  {
    button: 'sin²x',
    base: Math.sin,
    tex: '\\sin^2x',
    f: (x: number) => Math.sin(x) ** 2,
    reduced: '\\dfrac{1-\\cos2x}{2}=\\dfrac12-\\dfrac12\\cos2x',
    note: '在 $x=0$ 是最低點 $0$，所以是 $-\\cos2x$ 的形狀',
  },
  {
    button: 'cos²x',
    base: Math.cos,
    tex: '\\cos^2x',
    f: (x: number) => Math.cos(x) ** 2,
    reduced: '\\dfrac{1+\\cos2x}{2}=\\dfrac12+\\dfrac12\\cos2x',
    note: '在 $x=0$ 是最高點 $1$，所以是 $\\cos2x$ 的形狀',
  },
];

export default {
  title: '降冪：平方之後還是一個波',
  description:
    '上方「函數」一列選擇 sin²x 或 cos²x。虛線是原來的 y = sin x（或 cos x），粗實線是它的平方，水平虛線是 y = 1/2。平方後負的部分翻到上面，圖形變成振幅 1/2、週期 π、中線 y = 1/2 的波，正好是 (1 − cos 2x)/2（或 (1 + cos 2x)/2）。沿著 x 軸拖動點 X，下方比較同一個 x 的平方值和降冪公式的值。',
  boundingBox: [xmin, 1.5, xmax, -1.5],
  aspect: 2,
  axis: false,
  build(board, ctx) {
    const { color } = ctx;
    let which = 0;
    const c = () => choices[which];
    const thin = { fixed: true, strokeColor: color.muted, strokeWidth: 1, highlight: false };
    board.create('arrow', [[xmin, 0], [xmax, 0]], thin);
    board.create('arrow', [[0, -1.4], [0, 1.4]], thin);
    for (const y of [-1, 0.5, 1]) {
      board.create('segment', [[-0.05, y], [0.05, y]], thin);
      board.create('text', [-0.08, y, ctx.tex(y === 0.5 ? '\\frac12' : String(y))], { anchorX: 'right', anchorY: 'middle', fixed: true, fontSize: 11, strokeColor: color.muted });
    }
    piTicks(board, ctx, { y: 0, from: 1, to: 4 });

    board.create('segment', [[0, 0.5], [2 * Math.PI, 0.5]], { fixed: true, strokeColor: color.accent2, strokeWidth: 1.5, dash: 3, highlight: false });
    board.create('functiongraph', [(x: number) => c().base(x), 0, 2 * Math.PI], { fixed: true, strokeColor: color.muted, strokeWidth: 2, dash: 2, highlight: false });
    board.create('functiongraph', [(x: number) => c().f(x), 0, 2 * Math.PI], { fixed: true, strokeColor: color.accent, strokeWidth: 3, highlight: false });

    const X = board.create('glider', [1, 0, board.create('segment', [[0, 0], [2 * Math.PI, 0]], { visible: false, fixed: true })], {
      name: 'X',
      size: 4,
      label: { offset: [4, -14] },
    });
    board.create('point', [() => X.X(), () => c().f(X.X())], { fixed: true, withLabel: false, size: 4, strokeColor: color.accent, fillColor: color.accent });
    board.create('segment', [X, [() => X.X(), () => c().f(X.X())]], { fixed: true, strokeColor: color.muted, strokeWidth: 1, dash: 2, highlight: false });

    choices.forEach((ch, i) =>
      ctx.button(
        ch.button,
        () => {
          which = i;
          board.update();
        },
        { row: '函數', pressed: () => which === i },
      ),
    );
    ctx.legend([
      { label: '原來的 $\\sin x$ 或 $\\cos x$', color: color.muted, dash: true },
      { label: '平方', color: color.accent, width: 3 },
      { label: '$y=\\frac12$', color: color.accent2, dash: true, width: 1.5 },
    ]);
    ctx.readout(() => `$${c().tex}=${c().reduced}$：振幅 $\\frac12$、週期 $\\pi$、中線 $y=\\frac12$；${c().note}`);
    ctx.readout(() => {
      const x = X.X();
      const sign = which === 0 ? -1 : 1;
      return `$x=${num(x)}$：$${c().tex}=${num(c().f(x))}$，$\\dfrac{1${sign < 0 ? '-' : '+'}\\cos2x}{2}=${num((1 + sign * Math.cos(2 * x)) / 2)}$`;
    });
  },
} satisfies GraphDef;

import type { GraphDef } from '../types';

const step = 0.1;
// Points and the slider snap to 0.1; round away floating-point noise so the readout matches.
const snap = (v: number) => Math.round(v / step) * step;
const eps = 1e-9;

export default {
  title: '根與係數關係',
  description:
    '拖動 x 軸上的兩個根 α、β，並用滑桿改變 a，拋物線 y = a(x − α)(x − β) 跟著改變。下方即時顯示展開後的係數 b、c，以及 α + β 與 −b/a、αβ 與 c/a，兩兩永遠相等。',
  boundingBox: [-6, 6, 6, -3],
  build(board, ctx) {
    const { color } = ctx;
    const sa = board.create('slider', [[-5.4, 5.3], [-1.4, 5.3], [-2, 1, 2]], { name: 'a', snapWidth: step, digits: 1 });
    const grid = { snapToGrid: true, snapSizeX: step, snapSizeY: step, label: { offset: [-4, 18] } };
    const p = board.create('glider', [-1, 0, board.defaultAxes.x], { ...grid, name: ctx.tex('\\alpha') });
    const q = board.create('glider', [2, 0, board.defaultAxes.x], { ...grid, name: ctx.tex('\\beta') });

    const a = () => snap(sa.Value());
    const alpha = () => snap(p.X());
    const beta = () => snap(q.X());
    // a(x - α)(x - β) = ax² - a(α + β)x + aαβ
    const b = () => -a() * (alpha() + beta());
    const c = () => a() * alpha() * beta();
    const zero = () => Math.abs(a()) < eps;

    board.create('functiongraph', [(x: number) => a() * (x - alpha()) * (x - beta())]);

    const f = ctx.fmt;
    ctx.readout(() =>
      zero()
        ? '$a=0$ 時不是二次方程式。'
        : `$y=a(x-\\alpha)(x-\\beta)$ 展開成 $ax^2+bx+c$：$a=${f(a())},\\ b=${f(b())},\\ c=${f(c())}$`,
    );
    ctx.readout(() => (zero() ? '' : `$\\alpha+\\beta=${f(alpha() + beta())}$，$-\\dfrac{b}{a}=${f(-b() / a())}$`));
    ctx.readout(() => (zero() ? '' : `$\\alpha\\beta=${f(alpha() * beta())}$，$\\dfrac{c}{a}=${f(c() / a())}$`));
  },
} satisfies GraphDef;

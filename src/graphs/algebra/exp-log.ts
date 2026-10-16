import type { GraphDef } from '../types';

const step = 0.1;
const snap = (v: number) => Math.round(v / step) * step;
const eps = 1e-9;

export default {
  title: '指數函數與對數函數互為反函數',
  description:
    '拖動滑桿改變底數 a，觀察 y = a^x 與 y = log_a x 的圖形對直線 y = x 對稱。拖動 y = a^x 上的點 P，把它的坐標對調就得到 y = log_a x 上的點 Q。',
  boundingBox: [-4, 6, 8, -3],
  build(board, ctx) {
    const { color } = ctx;
    const sa = board.create('slider', [[-3.5, 5.2], [1, 5.2], [0.2, 2, 4]], { name: 'a', snapWidth: step, digits: 1 });
    const a = () => snap(sa.Value());
    const isOne = () => Math.abs(a() - 1) < eps;

    board.create('functiongraph', [(x: number) => x], { strokeColor: color.muted, strokeWidth: 2, dash: 2 });
    board.create('text', [5.2, 5.6, ctx.tex('y=x')], { strokeColor: color.muted, fixed: true });

    const exp = board.create('functiongraph', [(x: number) => a() ** x], { strokeColor: color.accent });
    // log_a x = ln x / ln a; NaN (not drawn) for x ≤ 0 and for a = 1, where it isn't defined.
    board.create('functiongraph', [(x: number) => (x > 0 && !isOne() ? Math.log(x) / Math.log(a()) : NaN)], {
      strokeColor: color.accent2,
    });

    const p = board.create('glider', [1, 2, exp], { name: 'P', withLabel: true, label: { offset: [8, 8] } });
    // Q swaps P's coordinates, so it is P reflected across y = x.
    const q = board.create('point', [() => (isOne() ? NaN : p.Y()), () => (isOne() ? NaN : p.X())], {
      name: 'Q',
      fixed: true,
      strokeColor: color.accent2,
      fillColor: color.accent2,
      label: { offset: [8, -12] },
    });
    board.create('segment', [p, q], { strokeColor: color.muted, strokeWidth: 1.5, dash: 3 });

    ctx.readout(() => `$y=a^x$ 經過 $P=(${ctx.fmt(p.X())},\\ ${ctx.fmt(p.Y())})$`);
    ctx.readout(() =>
      isOne()
        ? '$a=1$ 時 $y=1^x$ 是水平線 $y=1$：所有 $x$ 都對應到同一個值，沒有反函數，所以沒有 $\\log_1 x$。'
        : `對調坐標：$y=\\log_a x$ 經過 $Q=(${ctx.fmt(q.X())},\\ ${ctx.fmt(q.Y())})$`,
    );
  },
} satisfies GraphDef;

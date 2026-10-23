import { snap } from '../helpers';
import type { GraphDef } from '../types';

const step = 0.01;
const f = (x: number) => Math.exp(2 * x) - 1;
const g = Math.sin;
const num = (v: number) => String(+v.toFixed(4));

export default {
  title: '羅必達法則：靠近 0 時只剩斜率的比',
  description:
    '兩條曲線 y = e^(2x) − 1 和 y = sin x 都通過原點。兩條虛線是它們在原點的切線 y = 2x 和 y = x。用滑桿縮小 h，x = h 處的兩個函數值畫成鉛直線段。h 越小，曲線越貼近自己的切線，兩個函數值的比就越接近兩條切線斜率的比 2 ÷ 1 = 2。',
  boundingBox: [-1.2, 2.6, 1.2, -1.2],
  aspect: 0.9,
  build(board, ctx) {
    const { color } = ctx;
    const sh = board.create('slider', [[0.05, -0.9], [0.65, -0.9], [0.01, 0.6, 0.8]], { name: 'h', snapWidth: step, digits: 2 });
    const h = () => snap(sh.Value(), step);

    board.create('functiongraph', [f, -1.2, 1.2], { fixed: true, strokeColor: color.accent, strokeWidth: 3 });
    board.create('functiongraph', [g, -1.2, 1.2], { fixed: true, strokeColor: color.accent2, strokeWidth: 3 });
    const tangent = { fixed: true, strokeWidth: 1.5, dash: 2 };
    board.create('line', [[0, 0], [1, 2]], { ...tangent, strokeColor: color.accent });
    board.create('line', [[0, 0], [1, 1]], { ...tangent, strokeColor: color.accent2 });

    // The two heights at x = h, side by side.
    board.create('segment', [[() => h() - 0.015, 0], [() => h() - 0.015, () => f(h())]], { fixed: true, strokeColor: color.accent, strokeWidth: 4 });
    board.create('segment', [[() => h() + 0.015, 0], [() => h() + 0.015, () => g(h())]], { fixed: true, strokeColor: color.accent2, strokeWidth: 4 });

    ctx.legend([
      { label: '$y=f(x)=e^{2x}-1$', color: color.accent, width: 3 },
      { label: '$y=g(x)=\\sin x$', color: color.accent2, width: 3 },
      { label: '在原點的切線', color: color.muted, dash: true, width: 1.5 },
    ]);
    ctx.readout(() => `$f(h)=${num(f(h()))}$，$g(h)=${num(g(h()))}$，$\\dfrac{f(h)}{g(h)}=${num(f(h()) / g(h()))}$`);
    ctx.readout(() => "切線斜率的比 $\\dfrac{f'(0)}{g'(0)}=\\dfrac21=2$。$h$ 越小，兩個比越接近。");
  },
} satisfies GraphDef;

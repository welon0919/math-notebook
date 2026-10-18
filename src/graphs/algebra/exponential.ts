import type { GraphDef } from '../types';

const step = 0.1;
const snap = (v: number) => Math.round(v / step) * step;
const eps = 1e-9;
const num = (v: number) => String(+v.toFixed(2));

export default {
  title: '指數函數的圖形',
  description:
    '拖動滑桿改變底數 a，實線是 y = aˣ，虛線是 y = (1/a)ˣ。兩條曲線都經過 (0, 1)，對 y 軸對稱，而且永遠在 x 軸上方。a > 1 時 y = aˣ 遞增，0 < a < 1 時遞減，a = 1 時是水平線 y = 1。點 (1, a) 標出底數的大小。',
  boundingBox: [-4, 5.5, 4, -0.5],
  build(board, ctx) {
    const { color } = ctx;
    const sa = board.create('slider', [[-3.7, 5], [-1, 5], [0.2, 2, 4]], { name: 'a', snapWidth: step, digits: 1 });
    const a = () => snap(sa.Value());

    board.create('functiongraph', [(x: number) => a() ** -x], { strokeColor: color.muted, strokeWidth: 2, dash: 2, fixed: true, highlight: false });
    board.create('functiongraph', [(x: number) => a() ** x], { strokeColor: color.accent, strokeWidth: 3, fixed: true, highlight: false });
    board.create('point', [0, 1], { fixed: true, name: '(0,1)', size: 4, strokeColor: color.ink, fillColor: color.ink, label: { offset: [-40, 14] } });
    board.create('point', [1, () => a()], {
      fixed: true,
      name: '(1,a)',
      size: 4,
      strokeColor: color.accent2,
      fillColor: color.accent2,
      label: { offset: [8, 0], strokeColor: color.accent2 },
    });
    ctx.legend([
      { label: '$y=a^x$', color: color.accent, width: 3 },
      { label: '$y=\\left(\\frac{1}{a}\\right)^x=a^{-x}$', color: color.muted, dash: true },
    ]);

    ctx.readout(() => {
      if (Math.abs(a() - 1) < eps) return '$a=1$：$y=1^x=1$ 是水平線，不算指數函數。';
      return a() > 1
        ? `$a=${num(a())}>1$：$y=a^x$ 遞增，$x$ 每增加 $1$，$y$ 就變成 $${num(a())}$ 倍。`
        : `$0<a=${num(a())}<1$：$y=a^x$ 遞減，$x$ 每增加 $1$，$y$ 就變成 $${num(a())}$ 倍。`;
    });
    ctx.readout(() => '不論 $a$ 是多少，$a^0=1$，所以圖形都經過 $(0,1)$；$a^x>0$，所以圖形都在 $x$ 軸上方。');
  },
} satisfies GraphDef;

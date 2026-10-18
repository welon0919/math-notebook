import type { GraphDef } from '../types';

// Sliders snap to 0.1.
const step = 0.1;
const snap = (v: number) => Math.round(v / step) * step;
const eps = 1e-9;
const num = (v: number) => String(+v.toFixed(2));

const bases = [
  { button: 'y = x²', latex: 'x^2', f: (x: number) => x * x, inner: (u: string) => (u === 'x' ? 'x^2' : `(${u})^2`) },
  { button: 'y = |x|', latex: '|x|', f: (x: number) => Math.abs(x), inner: (u: string) => `|${u}|` },
  { button: 'y = √x', latex: '\\sqrt{x}', f: (x: number) => (x >= 0 ? Math.sqrt(x) : NaN), inner: (u: string) => `\\sqrt{${u}}` },
];

export default {
  title: '函數圖形的平移',
  description:
    '用按鈕選擇原來的函數 y = f(x)（x²、|x|、√x），它畫成虛線。拖動滑桿改變 h、k，實線是 y = f(x − h) + k：h 讓圖形左右平移，k 讓圖形上下平移。原圖上的點 P 和它平移後的位置 P′ 也標了出來，P′ 永遠是 P 向右移 h、向上移 k。',
  boundingBox: [-6, 6, 6, -3],
  build(board, ctx) {
    const { color } = ctx;
    let base = 0;
    const slider = (y: number, name: string, min: number, start: number, max: number) =>
      board.create('slider', [[-5.6, y], [-2.6, y], [min, start, max]], { name, snapWidth: step, digits: 1 });
    // Start shifted, so the new curve and the dashed original are both visible.
    const sh = slider(5.4, 'h', -3, 2, 3);
    const sk = slider(4.8, 'k', -2, 1, 3);
    const h = () => snap(sh.Value());
    const k = () => snap(sk.Value());
    const f = (x: number) => bases[base].f(x);

    board.create('functiongraph', [f], { strokeColor: color.muted, strokeWidth: 2, dash: 2, fixed: true, highlight: false });
    board.create('functiongraph', [(x: number) => f(x - h()) + k()], { strokeColor: color.accent, strokeWidth: 3, fixed: true, highlight: false });

    // The point (1, f(1)) of the original moves to (1 + h, f(1) + k).
    board.create('point', [1, () => f(1)], { fixed: true, name: 'P', size: 4, strokeColor: color.muted, fillColor: color.muted, label: { offset: [6, 10], strokeColor: color.muted } });
    board.create('point', [() => 1 + h(), () => f(1) + k()], {
      fixed: true,
      name: "P'",
      size: 4,
      strokeColor: color.accent2,
      fillColor: color.accent2,
      label: { offset: [6, 10], strokeColor: color.accent2 },
    });
    board.create('arrow', [[1, () => f(1)], [() => 1 + h(), () => f(1) + k()]], { strokeColor: color.accent2, strokeWidth: 1.5, dash: 2, fixed: true, highlight: false });
    ctx.legend([
      { label: '原來的 $y=f(x)$', color: color.muted, dash: true },
      { label: '$y=f(x-h)+k$', color: color.accent, width: 3 },
    ]);

    bases.forEach((s, i) =>
      ctx.button(s.button, () => {
        base = i;
        board.update();
      }),
    );

    const signed = (v: number) => (Math.abs(v) < eps ? '' : v < 0 ? `+${num(-v)}` : `-${num(v)}`);
    ctx.readout(() => {
      const u = Math.abs(h()) < eps ? 'x' : `x${signed(h())}`;
      const kk = Math.abs(k()) < eps ? '' : k() > 0 ? `+${num(k())}` : `-${num(-k())}`;
      return `$f(x)=${bases[base].latex}$，實線 $y=${bases[base].inner(u)}${kk}$`;
    });
    ctx.readout(() => {
      const parts = [];
      if (Math.abs(h()) > eps) parts.push(`向${h() > 0 ? '右' : '左'}平移 $${num(Math.abs(h()))}$`);
      if (Math.abs(k()) > eps) parts.push(`向${k() > 0 ? '上' : '下'}平移 $${num(Math.abs(k()))}$`);
      return parts.length === 0 ? '和原圖相同。' : `由原圖${parts.join('、')}。`;
    });
    ctx.readout(() => `點 $P(1,\\ ${num(f(1))})$ 移到 $P'(${num(1 + h())},\\ ${num(f(1) + k())})$。`);
  },
} satisfies GraphDef;

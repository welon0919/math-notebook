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
  title: '函數圖形的平移、伸縮與鏡射',
  description:
    '用按鈕選擇原來的函數 y = f(x)（x²、|x|、√x），它畫成虛線。拖動滑桿改變 a、b、h、k，實線是 y = a·f(b(x − h)) + k：h 左右平移、k 上下平移、a 上下伸縮（a < 0 時對 x 軸鏡射）、b 左右伸縮成 1/|b| 倍（b < 0 時對 y 軸鏡射）。原圖上的一個點和它移動後的位置也標了出來。',
  boundingBox: [-6, 6, 6, -3],
  build(board, ctx) {
    const { color } = ctx;
    let base = 0;
    const slider = (y: number, name: string, min: number, start: number, max: number) =>
      board.create('slider', [[-5.6, y], [-2.6, y], [min, start, max]], { name, snapWidth: step, digits: 1 });
    const sa = slider(5.4, 'a', -2, 1, 2);
    const sb = slider(4.8, 'b', -2, 1, 2);
    // Start shifted, so the new curve and the dashed original are both visible.
    const sh = slider(4.2, 'h', -3, 2, 3);
    const sk = slider(3.6, 'k', -2, 1, 3);
    const a = () => snap(sa.Value());
    const b = () => snap(sb.Value());
    const h = () => snap(sh.Value());
    const k = () => snap(sk.Value());
    const f = (x: number) => bases[base].f(x);
    const g = (x: number) => a() * f(b() * (x - h())) + k();

    board.create('functiongraph', [f], { strokeColor: color.muted, strokeWidth: 2, dash: 2, fixed: true, highlight: false });
    board.create('functiongraph', [g], { strokeColor: color.accent, strokeWidth: 3, fixed: true, highlight: false });

    // The point (1, f(1)) of the original moves to (h + 1/b, a f(1) + k).
    const ok = () => Math.abs(b()) > eps;
    board.create('point', [1, () => f(1)], { fixed: true, name: 'P', size: 4, strokeColor: color.muted, fillColor: color.muted, label: { offset: [6, 10], strokeColor: color.muted } });
    board.create('point', [() => (ok() ? h() + 1 / b() : NaN), () => a() * f(1) + k()], {
      fixed: true,
      name: "P'",
      size: 4,
      strokeColor: color.accent2,
      fillColor: color.accent2,
      label: { offset: [6, 10], strokeColor: color.accent2 },
    });
    ctx.legend([
      { label: `原來的 $y=f(x)$`, color: color.muted, dash: true },
      { label: '$y=a\\,f(b(x-h))+k$', color: color.accent, width: 3 },
    ]);

    bases.forEach((s, i) =>
      ctx.button(s.button, () => {
        base = i;
        board.update();
      }),
    );

    const signed = (v: number) => (Math.abs(v) < eps ? '' : v < 0 ? `+${num(-v)}` : `-${num(v)}`);
    ctx.readout(() => {
      if (!ok()) return '$b=0$ 時 $f(0\\cdot(x-h))$ 是常數，圖形變成水平線。';
      const coefA = Math.abs(a() - 1) < eps ? '' : Math.abs(a() + 1) < eps ? '-' : num(a());
      const coefB = Math.abs(b() - 1) < eps ? '' : Math.abs(b() + 1) < eps ? '-' : num(b());
      const u = Math.abs(h()) < eps ? `${coefB}x` : coefB === '' ? `x${signed(h())}` : `${coefB}(x${signed(h())})`;
      const kk = Math.abs(k()) < eps ? '' : k() > 0 ? `+${num(k())}` : `-${num(-k())}`;
      return `$f(x)=${bases[base].latex}$，實線 $y=${coefA}${bases[base].inner(u)}${kk}$`;
    });
    ctx.readout(() => {
      if (!ok()) return '';
      const parts = [];
      if (Math.abs(b() - 1) > eps) parts.push(`左右伸縮成 $\\frac{1}{|b|}=${num(1 / Math.abs(b()))}$ 倍${b() < 0 ? '並對 $y$ 軸鏡射' : ''}`);
      if (Math.abs(a() - 1) > eps) parts.push(`上下伸縮成 $|a|=${num(Math.abs(a()))}$ 倍${a() < 0 ? '並對 $x$ 軸鏡射' : ''}`);
      if (Math.abs(h()) > eps) parts.push(`向${h() > 0 ? '右' : '左'}平移 $${num(Math.abs(h()))}$`);
      if (Math.abs(k()) > eps) parts.push(`向${k() > 0 ? '上' : '下'}平移 $${num(Math.abs(k()))}$`);
      return parts.length === 0 ? '和原圖相同。' : `由原圖依序${parts.join('，再')}。`;
    });
    ctx.readout(() =>
      ok() ? `點 $P(1,\\ ${num(f(1))})$ 移到 $P'(${num(h() + 1 / b())},\\ ${num(a() * f(1) + k())})$。` : '',
    );
  },
} satisfies GraphDef;

import type { GraphDef } from '../types';

// Slider values snap to 0.1: smooth to drag, and the vertex still reads as a short decimal.
const step = 0.1;
const snap = (v: number) => Math.round(v / step) * step;
const eps = 1e-9;
/** Values are multiples of 0.1 (0.001 once expanded): print 2, -0.5, 1.125 rather than 2.00. */
const num = (v: number) => String(+v.toFixed(3));

/** A leading coefficient: "" for 1, "-" for -1, else the number. */
const coef = (v: number) => (Math.abs(v - 1) < eps ? '' : Math.abs(v + 1) < eps ? '-' : num(v));
/** "+3", "-0.5", "" for 0: a term written after another one. */
const signed = (v: number, fmt: (x: number) => string) => (Math.abs(v) < eps ? '' : `${v < 0 ? '-' : '+'}${fmt(Math.abs(v))}`);

export default {
  title: '二次函數的頂點式',
  description:
    '拖動滑桿改變 a、h、k，觀察拋物線 y = a(x − h)² + k 怎麼變化：h 讓圖形左右平移，k 讓圖形上下平移，a 決定開口方向與寬窄。圖上標出頂點 (h, k) 和虛線的對稱軸 x = h，下方顯示最大值或最小值，以及展開後的一般式。',
  boundingBox: [-6, 6, 6, -3],
  build(board, ctx) {
    const { color } = ctx;
    const fmt = num;
    const slider = (y: number, name: string, min: number, start: number, max: number) =>
      board.create('slider', [[-5.6, y], [-2.6, y], [min, start, max]], { name, snapWidth: step, digits: 1 });
    const sa = slider(5.3, 'a', -2, 1, 2);
    const sh = slider(4.6, 'h', -3, 1, 3);
    const sk = slider(3.9, 'k', -2, -1, 4);
    const a = () => snap(sa.Value());
    const h = () => snap(sh.Value());
    const k = () => snap(sk.Value());

    board.create('line', [[() => h(), 0], [() => h(), 1]], {
      fixed: true,
      highlight: false,
      dash: 2,
      strokeColor: color.muted,
      strokeWidth: 1.5,
    });
    board.create('functiongraph', [(x: number) => a() * (x - h()) ** 2 + k()], { strokeColor: color.accent, strokeWidth: 3 });
    board.create('point', [() => (Math.abs(a()) < eps ? NaN : h()), () => k()], {
      fixed: true,
      size: 5,
      name: '頂點',
      strokeColor: color.accent2,
      fillColor: color.accent2,
      label: { offset: [8, -14], strokeColor: color.accent2 },
    });

    ctx.readout(() => {
      if (Math.abs(a()) < eps) return '$a=0$ 時不是二次函數，圖形變成水平線 $y=k$。';
      return `$y=${coef(a())}${Math.abs(h()) < eps ? 'x' : `(x${signed(-h(), fmt)})`}^2${signed(k(), fmt)}$：頂點 $(${fmt(h())},\\ ${fmt(k())})$，對稱軸 $x=${fmt(h())}$。`;
    });
    ctx.readout(() => {
      if (Math.abs(a()) < eps) return '';
      return a() > 0
        ? `$a>0$，開口向上：$x=${fmt(h())}$ 時有最小值 $${fmt(k())}$。`
        : `$a<0$，開口向下：$x=${fmt(h())}$ 時有最大值 $${fmt(k())}$。`;
    });
    ctx.readout(() => {
      if (Math.abs(a()) < eps) return '';
      // a(x - h)^2 + k = ax^2 - 2ah x + (ah^2 + k)
      const b = -2 * a() * h();
      const c = a() * h() * h() + k();
      const bx = Math.abs(b) < eps ? '' : `${b < 0 ? '-' : '+'}${coef(Math.abs(b))}x`;
      return `展開成一般式：$y=${coef(a())}x^2${bx}${signed(c, fmt)}$`;
    });
  },
} satisfies GraphDef;

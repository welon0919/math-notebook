import { keepInside } from '../helpers';
import type { GraphDef } from '../types';

const step = 0.1;
const num = (v: number) => String(+v.toFixed(2));

const choices = [
  // `start`: where P goes when the function is chosen, away from y = x so P and Q don't overlap.
  { button: 'y = 2x + 1', f: (x: number) => 2 * x + 1, from: -2.4, to: 2.4, start: 1, latex: 'f(x)=2x+1', inverse: 'f^{-1}(x)=\\frac{x-1}{2}' },
  { button: 'y = x²（x ≥ 0）', f: (x: number) => x * x, from: 0, to: 2.4, start: 1.5, latex: 'f(x)=x^2\\ (x\\ge 0)', inverse: 'f^{-1}(x)=\\sqrt{x}' },
  { button: 'y = x³ ÷ 4', f: (x: number) => (x * x * x) / 4, from: -2.6, to: 2.6, start: 2.4, latex: 'f(x)=\\frac{x^3}{4}', inverse: 'f^{-1}(x)=\\sqrt[3]{4x}' },
];

export default {
  title: '反函數的圖形：對 y = x 鏡射',
  description:
    '用按鈕選擇函數 f。沿著 y = f(x) 拖動點 P(a, b)，把坐標對調得到 Q(b, a)，Q 落在反函數 y = f⁻¹(x) 的圖形上。虛線 PQ 和直線 y = x 垂直，而且中點在 y = x 上，所以兩個圖形對 y = x 對稱。',
  boundingBox: [-4, 6, 8, -3],
  build(board, ctx) {
    const { color } = ctx;
    let current = 0;
    const c = () => choices[current];

    board.create('functiongraph', [(x: number) => x], { strokeColor: color.muted, strokeWidth: 1.5, dash: 2, fixed: true, highlight: false });
    board.create('text', [5.4, 5.7, ctx.tex('y=x')], { strokeColor: color.muted, fixed: true });
    board.create('curve', [(s: number) => s, (s: number) => c().f(s), () => c().from, () => c().to], {
      strokeColor: color.accent,
      strokeWidth: 3,
      fixed: true,
      highlight: false,
    });
    // f^{-1} is f with the coordinates swapped.
    board.create('curve', [(s: number) => c().f(s), (s: number) => s, () => c().from, () => c().to], {
      strokeColor: color.accent2,
      strokeWidth: 3,
      fixed: true,
      highlight: false,
    });

    // P stays on y = f(x): its x snaps to 0.1 inside f's drawn domain, its y follows.
    const p = board.create('point', [1, 3], { name: 'P', strokeColor: color.accent, fillColor: color.accent, label: { offset: [-16, 10] } });
    keepInside(p, [-4, -3, 8, 6]);
    const place = () => {
      const x = Math.min(c().to, Math.max(c().from, Math.round(p.X() / step) * step));
      p.moveTo([x, c().f(x)]);
    };
    p.on('drag', place);
    const q = board.create('point', [() => p.Y(), () => p.X()], {
      name: 'Q',
      fixed: true,
      strokeColor: color.accent2,
      fillColor: color.accent2,
      label: { offset: [8, -12] },
    });
    board.create('segment', [p, q], { strokeColor: color.muted, strokeWidth: 1.5, dash: 3, fixed: true, highlight: false });
    ctx.legend([
      { label: '$y=f(x)$', color: color.accent, width: 3 },
      { label: '$y=f^{-1}(x)$', color: color.accent2, width: 3 },
    ]);

    choices.forEach((choice, i) =>
      ctx.button(choice.button, () => {
        current = i;
        p.moveTo([choice.start, choice.f(choice.start)]);
        board.update();
      }),
    );

    ctx.readout(() => `$${c().latex}$，反函數 $${c().inverse}$`);
    ctx.readout(
      () =>
        `$P(${num(p.X())},\\ ${num(p.Y())})$ 在 $y=f(x)$ 上，即 $f(${num(p.X())})=${num(p.Y())}$；對調得 $Q(${num(q.X())},\\ ${num(q.Y())})$，即 $f^{-1}(${num(q.X())})=${num(q.Y())}$。`,
    );
  },
} satisfies GraphDef;

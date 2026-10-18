import type { GraphDef } from '../types';

const num = (v: number) => String(+v.toFixed(2));
const eps = 1e-9;

// None of these is symmetric about either axis, so both mirror images look different from the original.
const bases = [
  { button: 'y = √x', latex: '\\sqrt{x}', f: (x: number) => (x >= 0 ? Math.sqrt(x) : NaN), px: 1 },
  { button: 'y = (x − 1)²', latex: '(x-1)^2', f: (x: number) => (x - 1) ** 2, px: 2 },
  { button: 'y = x³ ÷ 4', latex: '\\frac{x^3}{4}', f: (x: number) => (x * x * x) / 4, px: 2 },
];

/** Each animation goes from y = f(x) (a = b = 1) to y = a·f(bx) with these a, b. */
const moves = [
  { button: 'y = 2f(x)', a: 2, b: 1, effect: '每個函數值乘以 $2$：圖形上下拉長成 $2$ 倍，點 $(p,q)$ 變成 $(p,2q)$。' },
  { button: 'y = ½f(x)', a: 0.5, b: 1, effect: '每個函數值乘以 $\\frac12$：圖形上下壓扁成 $\\frac12$ 倍，點 $(p,q)$ 變成 $(p,\\frac q2)$。' },
  { button: 'y = f(2x)', a: 1, b: 2, effect: '同樣的函數值提早在 $\\frac{x}{2}$ 就出現：圖形左右壓縮成 $\\frac12$ 倍，點 $(p,q)$ 變成 $(\\frac p2,q)$。' },
  { button: 'y = f(½x)', a: 1, b: 0.5, effect: '同樣的函數值延後到 $2x$ 才出現：圖形左右拉寬成 $2$ 倍，點 $(p,q)$ 變成 $(2p,q)$。' },
  { button: 'y = −f(x)', a: -1, b: 1, effect: '每個函數值變號：圖形對 $x$ 軸鏡射，點 $(p,q)$ 變成 $(p,-q)$。' },
  { button: 'y = f(−x)', a: 1, b: -1, effect: '在 $-p$ 得到原本在 $p$ 的值：圖形對 $y$ 軸鏡射，點 $(p,q)$ 變成 $(-p,q)$。' },
];

export default {
  title: '函數圖形的伸縮與鏡射',
  description:
    '用上排按鈕選擇原來的函數（√x、(x − 1)²、x³ ÷ 4），它畫成虛線。下排按鈕播放動畫，把圖形從 y = f(x) 慢慢變成 y = 2f(x)、y = ½f(x)、y = f(2x)、y = f(½x)、y = −f(x) 或 y = f(−x)。原圖上的點 P 和它變換後的位置 P′ 一起標出，下方說明這個變換對每個點做了什麼。',
  boundingBox: [-6, 6, 6, -3],
  build(board, ctx) {
    const { color } = ctx;
    let base = 0;
    let move = -1;
    // y = a·f(bx) is animated through a and c = 1/b, the horizontal scale factor: c runs straight
    // from 1 to its target, so f(−x) folds through the y-axis (c = 0) like -f(x) folds through the
    // x-axis, instead of b passing 0 and the curve stretching off to infinity.
    let a = 1;
    let c = 1;
    const flat = () => Math.abs(c) < eps;
    const f = (x: number) => bases[base].f(x);
    const g = (x: number) => (flat() ? NaN : a * f(x / c));

    board.create('functiongraph', [f], { strokeColor: color.muted, strokeWidth: 2, dash: 2, fixed: true, highlight: false });
    board.create('functiongraph', [g], { strokeColor: color.accent, strokeWidth: 3, fixed: true, highlight: false });

    // P = (p, f(p)) moves to (c·p, a f(p)).
    const px = () => bases[base].px;
    const image = (): [number, number] => [c * px(), a * f(px())];
    board.create('point', [() => px(), () => f(px())], { fixed: true, name: 'P', size: 4, strokeColor: color.muted, fillColor: color.muted, label: { offset: [6, 10], strokeColor: color.muted } });
    board.create('point', [() => image()[0], () => image()[1]], {
      fixed: true,
      name: "P'",
      size: 4,
      strokeColor: color.accent2,
      fillColor: color.accent2,
      label: { offset: [6, 10], strokeColor: color.accent2 },
    });
    ctx.legend([
      { label: '原來的 $y=f(x)$', color: color.muted, dash: true },
      { label: '變換後的圖形', color: color.accent, width: 3 },
    ]);

    const play = (i: number) => {
      move = i;
      const { a: a1, b: b1 } = moves[i];
      ctx.animate(1600, (p) => {
        a = 1 + (a1 - 1) * p;
        c = 1 + (1 / b1 - 1) * p;
      });
    };
    bases.forEach((s, i) =>
      ctx.button(s.button, () => {
        base = i;
        if (move >= 0) play(move);
        else board.update();
      }),
    );
    moves.forEach((m, i) => ctx.button(`▶ ${m.button}`, () => play(i)));

    ctx.readout(() => {
      if (flat()) return `$f(x)=${bases[base].latex}$，圖形正壓在 $y$ 軸上`;
      const b = 1 / c;
      const coefA = Math.abs(a - 1) < eps ? '' : Math.abs(a + 1) < eps ? '-' : num(a);
      const coefB = Math.abs(b - 1) < eps ? '' : Math.abs(b + 1) < eps ? '-' : num(b);
      return `$f(x)=${bases[base].latex}$，目前 $y=${coefA}f(${coefB}x)$（$a=${num(a)}$，$b=${num(b)}$）`;
    });
    ctx.readout(() => (move < 0 ? '按下排的按鈕播放變換。' : `$${moves[move].button.replace('½', '\\tfrac12').replace('−', '-')}$：${moves[move].effect}`));
    ctx.readout(() => {
      const [x, y] = image();
      return `點 $P(${num(px())},\\ ${num(f(px()))})$ 移到 $P'(${num(x)},\\ ${num(y)})$。`;
    });
  },
} satisfies GraphDef;

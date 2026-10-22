import type { GraphDef } from '../types';

interface Choice {
  button: string;
  f: (x: number) => number;
  /** f′(x), or NaN where it doesn't exist. */
  df: (x: number) => number;
  /** Where P can go, so P and its tangent stay on the frame. */
  range: [number, number];
  critical: [number, number][];
  verdict: string;
}

const cbrt = Math.cbrt;

const choices: Choice[] = [
  {
    button: 'y = x³ − 3x',
    f: (x) => x ** 3 - 3 * x,
    df: (x) => 3 * x * x - 3,
    range: [-2.1, 2.1],
    critical: [[-1, 2], [1, -2]],
    verdict: "臨界點 $x=-1$：$f'$ 由正變負，極大值 $f(-1)=2$。臨界點 $x=1$：$f'$ 由負變正，極小值 $f(1)=-2$。",
  },
  {
    button: 'y = x³',
    f: (x) => x ** 3,
    df: (x) => 3 * x * x,
    range: [-1.35, 1.35],
    critical: [[0, 0]],
    verdict: "臨界點 $x=0$：$f'(0)=0$，切線水平，但兩側都是 $f'>0$，函數一直遞增，所以不是極值。",
  },
  {
    button: 'y = x^(2/3)',
    f: (x) => cbrt(x) ** 2,
    // At the cusp itself (P dragged to within 0.01 of it) there is no tangent.
    df: (x) => (Math.abs(x) < 0.01 ? NaN : 2 / (3 * cbrt(x))),
    range: [-2.6, 2.6],
    critical: [[0, 0]],
    verdict: "臨界點 $x=0$：圖形是尖角，$f'(0)$ 不存在。左側 $f'<0$、右側 $f'>0$，所以極小值 $f(0)=0$。",
  },
];

const num = (v: number) => String(+v.toFixed(2));

export default {
  title: '臨界點與極值',
  description:
    '用按鈕切換三個函數。y = x³ − 3x 有兩個臨界點：x = −1 是極大（2），x = 1 是極小（−2）。y = x³ 在 x = 0 的切線水平，但兩側都在上升，不是極值。y = x^(2/3) 在 x = 0 是尖角，導數不存在，左邊下降、右邊上升，是極小值 0。臨界點用另一種顏色的點標出。沿著曲線拖動點 P，畫出 P 的切線，下方顯示切線斜率 f′(x) 的正負號，以及函數在那裡是遞增還是遞減。',
  boundingBox: [-3, 3, 3, -2.6],
  aspect: 6 / 5.6,
  build(board, ctx) {
    const { color } = ctx;
    let which = 0;
    const c = () => choices[which];
    const curve = board.create('functiongraph', [(x: number) => c().f(x), -3, 3], { fixed: true, strokeColor: color.accent, strokeWidth: 3 });

    const clamp = (x: number) => Math.min(c().range[1], Math.max(c().range[0], x));
    const P = board.create('glider', [-1.6, c().f(-1.6), curve], { name: 'P', label: { offset: [10, -12] } });
    P.on('drag', () => {
      const x = clamp(P.X());
      if (x !== P.X()) P.moveTo([x, c().f(x)]);
    });
    const x = () => P.X();
    const slope = () => c().df(x());
    // NaN coordinates hide the tangent at a cusp, where there is none.
    board.create('line', [() => [slope() * x() - c().f(x()), -slope(), 1]], { fixed: true, strokeColor: color.highlight, strokeWidth: 2 });

    for (const i of [0, 1]) {
      const at = (k: 0 | 1) => () => c().critical[i]?.[k] ?? NaN;
      board.create('point', [at(0), at(1)], { fixed: true, withLabel: false, size: 5, strokeColor: color.accent2, fillColor: color.accent2 });
    }

    choices.forEach((ch, i) =>
      ctx.button(
        ch.button,
        () => {
          which = i;
          const x0 = clamp(P.X());
          P.moveTo([x0, ch.f(x0)]);
          board.update();
        },
        { row: '函數', pressed: () => which === i },
      ),
    );

    ctx.readout(() => {
      const d = slope();
      if (Number.isNaN(d)) return `$x=${num(x())}$：$f'(x)$ 不存在（尖角，沒有切線）`;
      const trend = Math.abs(d) < 0.005 ? '切線水平' : d > 0 ? '$f\'(x)>0$，函數在這裡遞增' : '$f\'(x)<0$，函數在這裡遞減';
      return `$x=${num(x())}$：$f'(x)=${num(d)}$，${trend}`;
    });
    ctx.readout(() => c().verdict);
  },
} satisfies GraphDef;

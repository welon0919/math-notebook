import type { GraphDef } from '../types';

interface Choice {
  button: string;
  pieces: { f: (x: number) => number; from: number; to: number }[];
  /** Filled dots on the graph and open circles off it (open ends, holes). */
  closed: [number, number][];
  open: [number, number][];
  /** The highest and lowest points, when they exist. */
  max?: [number, number];
  min?: [number, number];
  verdict: string;
}

const cubic = (x: number) => x ** 3 - 3 * x;

const choices: Choice[] = [
  {
    button: '閉區間、連續',
    pieces: [{ f: cubic, from: -1.5, to: 2.2 }],
    closed: [[-1.5, cubic(-1.5)], [2.2, cubic(2.2)]],
    open: [],
    max: [2.2, cubic(2.2)],
    min: [1, -2],
    verdict: '$y=x^3-3x$，$-1.5\\le x\\le2.2$：最大值 $4.048$ 在右端點，最小值 $-2$ 在 $x=1$。兩個都取得到，定理保證一定如此。',
  },
  {
    button: '開區間',
    pieces: [{ f: (x) => x, from: 0, to: 2 }],
    closed: [],
    open: [[0, 0], [2, 2]],
    verdict: '$y=x$，$0<x<2$：函數值可以任意靠近 $2$ 和 $0$，但端點不在區間內，永遠取不到。沒有最大值，也沒有最小值。',
  },
  {
    button: '不連續',
    pieces: [
      { f: (x) => x, from: 0, to: 1 },
      { f: () => 0.3, from: 1, to: 2 },
    ],
    closed: [[0, 0], [1, 0.3], [2, 0.3]],
    open: [[1, 1]],
    min: [0, 0],
    verdict: '$x<1$ 時 $y=x$，$1\\le x\\le2$ 時 $y=0.3$：函數值可以任意靠近 $1$，但在 $x=1$ 跳下去，取不到 $1$，沒有最大值。最小值 $0$ 在 $x=0$。',
  },
];

export default {
  title: '最大最小值定理：兩個條件都需要',
  description:
    '用按鈕切換三個例子。閉區間上的連續函數 y = x³ − 3x（−1.5 ≤ x ≤ 2.2）：最高點在右端點 (2.2, 4.048)，最低點在 (1, −2)，都有標出。開區間 0 < x < 2 上的 y = x：兩端是空心點，函數值靠近 0 和 2 卻取不到，沒有最高點和最低點。在 [0, 2] 上不連續的函數：x < 1 時 y = x，之後跳到 0.3，空心點 (1, 1) 取不到，所以沒有最高點；最低點是 (0, 0)。',
  boundingBox: [-2, 4.6, 3, -2.6],
  aspect: 5 / 7.2,
  build(board, ctx) {
    const { color } = ctx;
    let which = 0;
    const c = () => choices[which];
    for (const i of [0, 1]) {
      const piece = () => c().pieces[i];
      board.create('functiongraph', [(x: number) => piece()?.f(x) ?? NaN, () => piece()?.from ?? 0, () => piece()?.to ?? 0], {
        fixed: true,
        strokeColor: color.accent,
        strokeWidth: 3,
      });
    }
    const dots = (list: () => [number, number][], attrs: object) => {
      for (const i of [0, 1, 2]) {
        board.create('point', [() => list()[i]?.[0] ?? NaN, () => list()[i]?.[1] ?? NaN], {
          fixed: true,
          withLabel: false,
          size: 4,
          strokeWidth: 2,
          strokeColor: color.accent,
          ...attrs,
        });
      }
    };
    dots(() => c().closed, { fillColor: color.accent });
    dots(() => c().open, { fillColor: color.bg });
    const extreme = (pick: () => [number, number] | undefined, name: string, offset: [number, number]) =>
      board.create('point', [() => pick()?.[0] ?? NaN, () => pick()?.[1] ?? NaN], {
        fixed: true,
        name,
        size: 6,
        strokeColor: color.accent2,
        fillColor: color.accent2,
        label: { offset, strokeColor: color.accent2, fontSize: 13 },
      });
    extreme(() => c().max, '最大', [-34, 10]);
    extreme(() => c().min, '最小', [-36, -12]);

    choices.forEach((ch, i) =>
      ctx.button(
        ch.button,
        () => {
          which = i;
          board.update();
        },
        { row: '例子', pressed: () => which === i },
      ),
    );
    ctx.readout(() => c().verdict);
  },
} satisfies GraphDef;

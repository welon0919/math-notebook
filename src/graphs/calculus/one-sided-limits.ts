import { snap } from '../helpers';
import type { GraphDef } from '../types';

const step = 0.01;
const a = 2;

interface Choice {
  button: string;
  /** The function away from x = 2. */
  left: (x: number) => number;
  right: (x: number) => number;
  /** f(2), drawn as a filled dot. */
  value: number;
  verdict: string;
}

const choices: Choice[] = [
  {
    button: '左右不相等',
    left: (x) => x + 1,
    right: (x) => x - 1,
    value: 1,
    verdict:
      '左極限 $\\displaystyle\\lim_{x\\to2^-}f(x)=3$，右極限 $\\displaystyle\\lim_{x\\to2^+}f(x)=1$，兩邊不相等，所以 $\\displaystyle\\lim_{x\\to2}f(x)$ 不存在。',
  },
  {
    button: '左右相等',
    left: (x) => x + 1,
    right: (x) => x + 1,
    value: 1,
    verdict:
      '左右極限都是 $3$，所以 $\\displaystyle\\lim_{x\\to2}f(x)=3$。$f(2)=1$ 不等於 $3$，但極限不看 $x=2$ 這一點。',
  },
];

export default {
  title: '左極限與右極限',
  description:
    '兩個函數用按鈕切換。「左右不相等」：x < 2 時 f(x) = x + 1，x ≥ 2 時 f(x) = x − 1，圖形在 x = 2 斷開，f(2) = 1。「左右相等」：x ≠ 2 時 f(x) = x + 1，但 f(2) = 1，圖形是一條直線在 (2, 3) 挖洞，另外補一點 (2, 1)。用滑桿縮小 h，兩個點從 x = 2 − h（左邊）和 x = 2 + h（右邊）靠近 2，下方顯示兩個函數值。左邊的值趨近 3；右邊的值在第一個函數趨近 1，在第二個函數趨近 3。左右極限相等時極限才存在，而且和 f(2) 無關。',
  boundingBox: [-0.6, 4.4, 5.4, -0.6],
  aspect: 6 / 5,
  build(board, ctx) {
    const { color } = ctx;
    let which = 0;
    const c = () => choices[which];
    const sh = board.create('slider', [[3.2, 0.5], [4.2, 0.5], [0.01, 0.8, 1]], { name: 'h', snapWidth: step, digits: 2 });
    const h = () => snap(sh.Value(), step);

    const curve = { fixed: true, strokeColor: color.accent, strokeWidth: 3 };
    board.create('functiongraph', [(x: number) => c().left(x), -1, a], curve);
    board.create('functiongraph', [(x: number) => c().right(x), a, 6], curve);
    const ring = { fixed: true, withLabel: false, size: 5, strokeWidth: 2, strokeColor: color.accent, fillColor: color.bg };
    // Both choices have the hole at (2, 3) and f(2) = 1, where the jump's right piece starts.
    board.create('point', [a, () => c().left(a)], ring);
    board.create('point', [a, () => c().value], { ...ring, fillColor: color.accent });
    board.create('segment', [[a, 0], [a, 4]], { fixed: true, strokeColor: color.muted, strokeWidth: 1, dash: 1 });

    const side = (sign: -1 | 1, col: string) => {
      const x = () => a + sign * h();
      const y = () => (sign < 0 ? c().left(x()) : c().right(x()));
      const p = board.create('point', [x, y], { fixed: true, withLabel: false, size: 4, strokeColor: col, fillColor: col });
      const dash = { fixed: true, strokeColor: col, strokeWidth: 1.5, dash: 2 };
      board.create('segment', [p, [x, () => 0]], dash);
      board.create('segment', [p, [() => 0, y]], dash);
    };
    side(-1, color.accent2);
    side(1, color.highlight);

    choices.forEach((ch, i) =>
      ctx.button(
        ch.button,
        () => {
          which = i;
          board.update();
        },
        { row: '函數', pressed: () => which === i },
      ),
    );

    const n = (v: number) => String(+v.toFixed(2));
    ctx.readout(() => `左邊：$f(${n(a - h())})=${n(c().left(a - h()))}$；右邊：$f(${n(a + h())})=${n(c().right(a + h()))}$`);
    ctx.readout(() => `函數值：$f(2)=${c().value}$`);
    ctx.readout(() => c().verdict);
  },
} satisfies GraphDef;

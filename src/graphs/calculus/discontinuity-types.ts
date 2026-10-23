import type { GraphDef } from '../types';

const a = 2;

interface Kind {
  button: string;
  left: (x: number) => number;
  right: (x: number) => number;
  /** f(2), or undefined when f isn't defined there. */
  value?: number;
  /** The open circles at x = 2 (none for an infinite discontinuity). */
  holes: number[];
  asymptote?: boolean;
  checks: [boolean, boolean, boolean];
  note: string;
}

const kinds: Kind[] = [
  {
    button: '可去',
    left: (x) => x / 2 + 1,
    right: (x) => x / 2 + 1,
    value: 3,
    holes: [2],
    checks: [true, true, false],
    note: '可去不連續：極限存在，只是不等於 $f(2)$（或 $f(2)$ 沒有定義）。把 $f(2)$ 改成極限值 $2$，洞就補起來了。',
  },
  {
    button: '跳躍',
    left: (x) => x / 2 + 1,
    right: (x) => x / 2 + 2,
    value: 3,
    holes: [2],
    checks: [true, false, false],
    note: '跳躍不連續：左極限 $2$、右極限 $3$ 都存在但不相等，圖形跳了一格。改一個點的值補不起來。',
  },
  {
    button: '無窮',
    left: (x) => 2 + 1 / (x - 2),
    right: (x) => 2 + 1 / (x - 2),
    holes: [],
    asymptote: true,
    checks: [false, false, false],
    note: '無窮不連續：$x\\to2$ 時函數值往 $\\pm\\infty$ 衝，$x=2$ 是鉛直漸近線。',
  },
];

const mark = (ok: boolean) => (ok ? '成立' : '不成立');

export default {
  title: '三種不連續',
  description:
    '用按鈕切換三種在 x = 2 不連續的函數。可去：y = x/2 + 1 在 (2, 2) 挖洞，另外 f(2) = 3，極限 2 存在但不等於 f(2)。跳躍：x < 2 時 y = x/2 + 1，x ≥ 2 時 y = x/2 + 2，左極限 2、右極限 3。無窮：y = 2 + 1/(x − 2)，x = 2 是鉛直漸近線，f(2) 沒有定義。下方列出連續的三個條件在這個函數是否成立。',
  boundingBox: [-1, 5, 5, -0.5],
  aspect: 6 / 5.5,
  build(board, ctx) {
    const { color } = ctx;
    let which = 0;
    const k = () => kinds[which];

    const curve = { fixed: true, strokeColor: color.accent, strokeWidth: 3 };
    board.create('functiongraph', [(x: number) => k().left(x), -1, a - 1e-3], curve);
    board.create('functiongraph', [(x: number) => k().right(x), a + 1e-3, 6], curve);
    board.create('line', [[a, 0], [a, 1]], { fixed: true, strokeColor: color.accent2, strokeWidth: 1.5, dash: 3, visible: () => Boolean(k().asymptote) });
    const ring = { fixed: true, withLabel: false, size: 5, strokeWidth: 2, strokeColor: color.accent, fillColor: color.bg };
    board.create('point', [a, () => k().holes[0] ?? NaN], { ...ring, visible: () => k().holes.length > 0 });
    board.create('point', [a, () => k().value ?? NaN], { ...ring, fillColor: color.accent, visible: () => k().value !== undefined });

    kinds.forEach((kind, i) =>
      ctx.button(
        kind.button,
        () => {
          which = i;
          board.update();
        },
        { row: '類型', pressed: () => which === i },
      ),
    );

    ctx.readout(() => `(1) $f(2)$ 有定義：${mark(k().checks[0])}　(2) $\\displaystyle\\lim_{x\\to2}f(x)$ 存在：${mark(k().checks[1])}　(3) 兩者相等：${mark(k().checks[2])}`);
    ctx.readout(() => k().note);
  },
} satisfies GraphDef;

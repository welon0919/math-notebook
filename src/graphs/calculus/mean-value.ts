import type { GraphDef } from '../types';

const f = (x: number) => x ** 3 / 6 - x * x + 1.5 * x + 1;
const df = (x: number) => (x * x) / 2 - 2 * x + 1.5;
// f'(c) = s  ⇔  c² − 4c + 3 − 2s = 0  ⇔  c = 2 ± √(1 + 2s).
const solve = (s: number) => (1 + 2 * s < 0 ? [] : [2 - Math.sqrt(1 + 2 * s), 2 + Math.sqrt(1 + 2 * s)]);

export default {
  title: '均值定理：和割線平行的切線',
  description:
    '拖動曲線上的端點 A、B。連接兩端點的割線斜率是 (f(b) − f(a))/(b − a)；圖中標出 a、b 之間每一個斜率剛好相等的點 c，並畫出 c 的切線，它和割線平行。',
  boundingBox: [-0.8, 4, 5.2, -0.5],
  build(board, ctx) {
    const { color } = ctx;
    const curve = board.create('functiongraph', [f, -0.5, 4.9], { strokeColor: color.accent });
    const A = board.create('glider', [0.4, f(0.4), curve], { name: 'A', label: { offset: [-16, 6] } });
    const B = board.create('glider', [4.4, f(4.4), curve], { name: 'B', label: { offset: [6, 6] } });
    const a = () => A.X();
    const b = () => B.X();
    const ordered = () => b() - a() > 1e-6;
    const slope = () => (f(b()) - f(a())) / (b() - a());

    board.create('line', [A, B], { strokeColor: color.accent2, strokeWidth: 2 });
    // Every c strictly between a and b with f'(c) equal to the secant slope (at most two for this cubic).
    const cs = () => (ordered() ? solve(slope()).filter((c) => c > a() && c < b()) : []);
    for (const i of [0, 1]) {
      const c = () => cs()[i] ?? NaN;
      const P = board.create('point', [c, () => f(c())], { fixed: true, name: ctx.tex(`c_${i + 1}`), size: 4, strokeColor: color.highlight, fillColor: color.highlight, label: { offset: [-4, -18] } });
      board.create('segment', [[() => c() - 0.9, () => f(c()) - 0.9 * slope()], [() => c() + 0.9, () => f(c()) + 0.9 * slope()]], { strokeColor: color.highlight, strokeWidth: 2.5 });
      board.create('segment', [P, [c, () => 0]], { strokeColor: color.muted, strokeWidth: 1, dash: 1 });
    }

    const fm = ctx.fmt;
    ctx.readout(() => (ordered() ? `割線斜率 $\\dfrac{f(b)-f(a)}{b-a}=${fm(slope())}$（$a=${fm(a())},\\ b=${fm(b())}$）` : '把 $A$ 放在 $B$ 的左邊。'));
    ctx.readout(() => {
      if (!ordered()) return '';
      const found = cs();
      return found.map((c, i) => `$c_${i + 1}=${fm(c)}$，$f'(c_${i + 1})=${fm(df(c))}$`).join('；');
    });
  },
} satisfies GraphDef;

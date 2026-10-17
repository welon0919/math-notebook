import type { GraphDef } from '../types';

const maxTerms = 9;
const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1));

/** sin's Taylor polynomial at 0 with m terms: x − x³/3! + … ± x^(2m−1)/(2m−1)!. */
function taylor(m: number, x: number): number {
  let s = 0;
  for (let k = 0; k < m; k++) {
    const p = 2 * k + 1;
    s += ((k % 2 === 0 ? 1 : -1) * x ** p) / factorial(p);
  }
  return s;
}

function termTex(k: number): string {
  const p = 2 * k + 1;
  const body = p === 1 ? 'x' : `\\frac{x^{${p}}}{${p}!}`;
  return k === 0 ? body : `${k % 2 === 0 ? '+' : '-'}${body}`;
}

export default {
  title: '泰勒展開：多項式越來越貼近 sin x',
  description:
    '用滑桿增加 sin x 的泰勒展開取的項數 m，畫出泰勒多項式 x − x³/3! + x⁵/5! − …，和 y = sin x 比較：項數越多，多項式在越寬的範圍內貼近 sin x。下方顯示 x = π 時的誤差。',
  boundingBox: [-7.5, 3.75, 7.5, -3.75],
  aspect: 2,
  build(board, ctx) {
    const { color } = ctx;
    const sm = board.create('slider', [[-7, 3.1], [-3, 3.1], [1, 2, maxTerms]], { name: 'm', snapWidth: 1, digits: 0 });
    const m = () => Math.round(sm.Value());

    board.create('functiongraph', [Math.sin], { strokeColor: color.ink, strokeWidth: 5, strokeOpacity: 0.35 });
    board.create('functiongraph', [(x: number) => taylor(m(), x)], { strokeColor: color.accent, strokeWidth: 2.5 });

    ctx.legend([
      { label: '$y=\\sin x$', color: color.ink, width: 5, opacity: 0.35 },
      { label: '$y=T(x)$（泰勒多項式）', color: color.accent },
    ]);

    const fm = ctx.fmt;
    ctx.readout(() => {
      const n = m();
      const shown = n <= 3 ? Array.from({ length: n }, (_, k) => termTex(k)).join('') : `${termTex(0)}${termTex(1)}+\\cdots${termTex(n - 1)}`;
      return `$m=${n}$ 項：$T(x)=${shown}$`;
    });
    ctx.readout(() => `$x=\\pi$ 時：$T(\\pi)=${fm(taylor(m(), Math.PI))}$，$\\sin\\pi=0$，誤差 $${fm(Math.abs(taylor(m(), Math.PI)))}$`);
  },
} satisfies GraphDef;

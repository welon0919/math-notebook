import type { GraphDef } from '../types';

interface Choice {
  button: string;
  latex: string;
  term: (n: number) => number;
  /** The sum, when the series converges. */
  sum?: number;
  sumTex?: string;
  verdict: string;
}

const choices: Choice[] = [
  {
    button: '等比 (1/2)ⁿ',
    latex: '\\sum_{n=1}^\\infty\\left(\\frac12\\right)^n',
    term: (n) => 0.5 ** n,
    sum: 1,
    sumTex: '1',
    verdict: '部分和越來越貼近 $1$：收斂，和是 $1$。',
  },
  {
    button: '調和 1/n',
    latex: '\\sum_{n=1}^\\infty\\frac1n',
    term: (n) => 1 / n,
    verdict: '每一項都趨近 $0$，但部分和一直往上爬，沒有上限（只是爬得很慢）：發散。',
  },
  {
    button: '1/n²',
    latex: '\\sum_{n=1}^\\infty\\frac{1}{n^2}',
    term: (n) => 1 / (n * n),
    sum: (Math.PI * Math.PI) / 6,
    sumTex: '\\frac{\\pi^2}{6}\\approx1.645',
    verdict: '部分和越來越貼近 $\\frac{\\pi^2}{6}\\approx1.645$：收斂。',
  },
];

const nMax = 30;
const num = (v: number) => String(+v.toFixed(4));

export default {
  title: '部分和 Sₙ',
  description:
    '用按鈕切換三個級數：Σ(1/2)ⁿ、調和級數 Σ1/n、Σ1/n²。用滑桿增加 N，畫出前 N 個部分和 Sₙ（n = 1, 2, …, N）的點。收斂的級數，點會越來越貼近一條水平虛線（級數的和）：Σ(1/2)ⁿ 貼近 1，Σ1/n² 貼近 π²/6 ≈ 1.645。調和級數的點一直緩慢往上，N = 30 時約 3.99，不會停在任何一條水平線下。',
  boundingBox: [-3.5, 4.6, 32, -0.9],
  aspect: 1.3,
  build(board, ctx) {
    const { color } = ctx;
    let which = 0;
    const c = () => choices[which];
    const sN = board.create('slider', [[2, -0.55], [20, -0.55], [1, 10, nMax]], { name: 'N', snapWidth: 1, digits: 0 });
    const N = () => Math.round(sN.Value());
    const partial = (n: number) => {
      let s = 0;
      for (let k = 1; k <= n; k++) s += c().term(k);
      return s;
    };

    board.create('line', [[0, () => c().sum ?? NaN], [1, () => c().sum ?? NaN]], {
      fixed: true,
      strokeColor: color.accent2,
      strokeWidth: 1.5,
      dash: 3,
    });
    for (let n = 1; n <= nMax; n++) {
      board.create('point', [n, () => partial(n)], {
        fixed: true,
        withLabel: false,
        size: 3,
        strokeColor: color.accent,
        fillColor: color.accent,
        visible: () => n <= N(),
      });
    }

    choices.forEach((ch, i) =>
      ctx.button(
        ch.button,
        () => {
          which = i;
          board.update();
        },
        { row: '級數', pressed: () => which === i },
      ),
    );
    ctx.readout(() => `$${c().latex}$：$S_{${N()}}=${num(partial(N()))}$${c().sumTex ? `，和是 $${c().sumTex}$` : ''}`);
    ctx.readout(() => c().verdict);
  },
} satisfies GraphDef;

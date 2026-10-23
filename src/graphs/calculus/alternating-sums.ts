import type { GraphDef } from '../types';

const nMax = 20;
const term = (n: number) => 1 / n;
const S = (n: number) => {
  let s = 0;
  for (let k = 1; k <= n; k++) s += (k % 2 ? 1 : -1) * term(k);
  return s;
};
const sum = Math.log(2);
const num = (v: number) => String(+v.toFixed(4));

export default {
  title: '交錯級數的誤差不超過下一項',
  description:
    '交錯調和級數 1 − 1/2 + 1/3 − 1/4 + … 的部分和 Sₙ 畫成點，一上一下地夾住水平虛線 y = ln 2 ≈ 0.6931（級數的和）。用滑桿改變 N，在 n = N 處畫出從 S_N 到 S_(N+1) 的鉛直線段，長度剛好是下一項 1/(N + 1)，而 ln 2 一定在這條線段上，所以誤差 |ln 2 − S_N| 不超過 1/(N + 1)。',
  boundingBox: [-1.5, 1.1, 21.5, 0.3],
  aspect: 1.4,
  build(board, ctx) {
    const { color } = ctx;
    const sN = board.create('slider', [[2, 0.38], [14, 0.38], [1, 4, nMax - 1]], { name: 'N', snapWidth: 1, digits: 0 });
    const N = () => Math.round(sN.Value());

    board.create('line', [[0, sum], [1, sum]], { fixed: true, strokeColor: color.accent2, strokeWidth: 1.5, dash: 3 });
    for (let n = 1; n <= nMax; n++) {
      board.create('point', [n, S(n)], { fixed: true, withLabel: false, size: 3, strokeColor: color.accent, fillColor: color.accent });
    }
    board.create('segment', [[N, () => S(N())], [N, () => S(N() + 1)]], { fixed: true, strokeColor: color.highlight, strokeWidth: 4 });
    board.create('point', [N, () => S(N())], { fixed: true, withLabel: false, size: 5, strokeColor: color.highlight, fillColor: color.highlight });

    ctx.legend([
      { label: '部分和 $S_n$', color: color.accent, width: 3 },
      { label: '和 $\\ln2\\approx0.6931$', color: color.accent2, dash: true, width: 1.5 },
      { label: '下一項 $\\frac{1}{N+1}$ 的長度', color: color.highlight, width: 4 },
    ]);
    ctx.readout(() => `$N=${N()}$：$S_N=${num(S(N()))}$，誤差 $|\\ln2-S_N|=${num(Math.abs(sum - S(N())))}$`);
    ctx.readout(() => `下一項 $\\frac{1}{${N() + 1}}=${num(term(N() + 1))}$：誤差一定不超過它。`);
  },
} satisfies GraphDef;

import { functionPlot } from '../function-plot';

const f = (x: number) => (2 * (x - 1)) / (x - 2);

export default functionPlot({
  title: 'y = (2x² − 2)/(x² − x − 2) 的圖形',
  description:
    '函數約分後是 y = 2(x − 1)/(x − 2)，但 x = −1 不在定義域內，圖上是空心點 (−1, 4/3)。虛線是漸近線 x = 2 和 y = 2：曲線往左右兩端貼近 y = 2；在 x = 2 的右邊往上衝，左邊往下衝。曲線和 x 軸交於 (1, 0)。',
  pieces: [
    { f, from: -6, to: 1.99 },
    { f, from: 2.01, to: 8 },
  ],
  tex: 'y=\\dfrac{2x^2-2}{x^2-x-2}',
  dots: [{ x: -1, y: 4 / 3, open: true, label: '\\left(-1,\\frac43\\right)', side: 'below' }],
  asymptotes: { vertical: [2], horizontal: [2] },
  x: [-6, 8],
  y: [-4, 8],
  xStep: 2,
  yStep: 2,
  readouts: ['$x=-1$ 是洞：約分後極限是 $\\frac43$，不是無限大，所以不是漸近線。'],
});

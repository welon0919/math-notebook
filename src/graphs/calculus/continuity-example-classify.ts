import { functionPlot } from '../function-plot';

const f = (x: number) => (x + 1) / (x - 2);

export default functionPlot({
  title: 'y = (x² − 1)/(x² − 3x + 2) 的圖形',
  description:
    '約分後是 y = (x + 1)/(x − 2)，但 x = 1 不在定義域內，圖上是空心點 (1, −2)：這是可去不連續。虛線 x = 2 是鉛直漸近線，曲線在它的右邊往上衝、左邊往下衝：這是無窮不連續。另一條虛線 y = 1 是水平漸近線。',
  pieces: [
    { f, from: -5, to: 1.99 },
    { f, from: 2.01, to: 7 },
  ],
  tex: 'y=\\dfrac{x^2-1}{x^2-3x+2}',
  dots: [{ x: 1, y: -2, open: true }],
  asymptotes: { vertical: [2], horizontal: [1] },
  x: [-5, 7],
  y: [-6, 8],
  xStep: 2,
  yStep: 2,
  aspect: 1,
  readouts: ['空心點是洞 $(1,-2)$：可去不連續。虛線 $x=2$ 是鉛直漸近線：無窮不連續。'],
});

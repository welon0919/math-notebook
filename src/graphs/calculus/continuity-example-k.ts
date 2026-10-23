import { functionPlot } from '../function-plot';

export default functionPlot({
  title: 'k = 1 時的分段函數',
  description:
    'x < 2 時 y = x² + 1（拋物線的一段），x ≥ 2 時 y = 3x − 1（直線）。兩段在點 (2, 5) 接起來，圖形不斷開，所以 f 在 x = 2 連續。',
  pieces: [
    { f: (x) => x * x + 1, from: -2, to: 2 },
    { f: (x) => 3 * x - 1, from: 2, to: 4 },
  ],
  tex: 'y=f(x)',
  dots: [{ x: 2, y: 5, label: '(2,5)', side: 'left' }],
  x: [-2, 4],
  y: [0, 11],
  yStep: 2,
  aspect: 1,
});

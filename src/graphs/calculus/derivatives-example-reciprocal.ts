import { functionPlot } from '../function-plot';

export default functionPlot({
  title: 'y = 1/x 在 x = 2 的切線',
  description:
    '藍色曲線是 y = 1/x，分成 x < 0 和 x > 0 兩支。另一條直線是它在點 (2, 1/2) 的切線 y = −x/4 + 1，斜率 −1/4，和 y 軸交於 (0, 1)、和 x 軸交於 (4, 0)。切線在切點附近和曲線貼得很近。',
  pieces: [
    { f: (x) => 1 / x, from: -4, to: -0.2 },
    { f: (x) => 1 / x, from: 0.2, to: 6 },
  ],
  tex: 'y=\\dfrac1x',
  compare: [{ f: (x) => -x / 4 + 1, from: -2, to: 6, tex: 'y=-\\dfrac x4+1' }],
  dots: [{ x: 2, y: 0.5, label: '\\left(2,\\frac12\\right)', side: 'above' }],
  x: [-4, 6],
  y: [-3, 4],
  xStep: 2,
  aspect: 4 / 3,
});

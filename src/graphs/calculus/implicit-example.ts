import { functionPlot } from '../function-plot';

const root = (x: number) => Math.sqrt(Math.max(0, 28 - 3 * x * x));
const end = Math.sqrt(28 / 3);

export default functionPlot({
  title: 'x² + xy + y² = 7 在 (1, 2) 的切線',
  description:
    '方程式 x² + xy + y² = 7 的圖形是一個斜放的橢圓，分成上下兩半畫出：y = (−x ± √(28 − 3x²))/2。另一條直線是它在點 (1, 2) 的切線 y = −0.8x + 2.8，斜率 −4/5。',
  pieces: [
    { f: (x) => (-x + root(x)) / 2, from: -end, to: end },
    { f: (x) => (-x - root(x)) / 2, from: -end, to: end },
  ],
  tex: 'x^2+xy+y^2=7',
  compare: [{ f: (x) => -0.8 * x + 2.8, from: -1, to: 4, tex: 'y=-\\frac45x+\\frac{14}5' }],
  dots: [{ x: 1, y: 2, label: '(1,2)', side: 'above-right' }],
  x: [-4, 4],
  y: [-4, 4],
  aspect: 1,
});

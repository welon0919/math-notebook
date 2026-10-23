import { functionPlot } from '../function-plot';

export default functionPlot({
  title: 'y = x³ − 3x 的極大與極小',
  description:
    '曲線 y = x³ − 3x 在 x < −1 上升，到點 (−1, 2) 轉為下降，在 −1 < x < 1 下降，到點 (1, −2) 又轉為上升。(−1, 2) 是極大，(1, −2) 是極小，兩點的切線都是水平的。',
  pieces: [{ f: (x) => x ** 3 - 3 * x, from: -2.2, to: 2.2 }],
  tex: 'y=x^3-3x',
  dots: [
    { x: -1, y: 2, label: '(-1,2)', side: 'above' },
    { x: 1, y: -2, label: '(1,-2)', side: 'below' },
  ],
  x: [-2.5, 2.5],
  y: [-3, 3],
  aspect: 1,
});

import { functionPlot } from '../function-plot';

const e = Math.exp(-0.5);

export default functionPlot({
  title: '鐘形曲線 y = e^(−x²/2)',
  description:
    '鐘形曲線 y = e^(−x²/2) 對 y 軸對稱，最高點 (0, 1)，往左右兩端貼近 x 軸。在 −1 < x < 1 凹向下，在 |x| > 1 凹向上，反曲點是 (−1, 0.607) 和 (1, 0.607)，也就是曲線最陡的地方。',
  pieces: [{ f: (x) => Math.exp((-x * x) / 2), from: -4, to: 4 }],
  tex: 'y=e^{-x^2/2}',
  dots: [
    { x: 0, y: 1, label: '(0,1)', side: 'above-right' },
    { x: -1, y: e, label: '(-1,\\,0.607)', side: 'left' },
    { x: 1, y: e, label: '(1,\\,0.607)', side: 'right' },
  ],
  x: [-4, 4],
  y: [0, 1.2],
  yStep: 0.5,
  aspect: 2,
});

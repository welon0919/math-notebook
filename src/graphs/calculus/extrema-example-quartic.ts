import { functionPlot } from '../function-plot';

export default functionPlot({
  title: 'y = x⁴ − 4x³：一個臨界點不是極值',
  description:
    '曲線 y = x⁴ − 4x³ 有兩個臨界點。在 (0, 0) 切線水平，但曲線在兩側都往下走，只是在那裡暫時變平，不是極值。在 (3, −27) 曲線由下降轉為上升，是極小值，也是最小值。',
  pieces: [{ f: (x) => x ** 4 - 4 * x ** 3, from: -1.4, to: 4.3 }],
  tex: 'y=x^4-4x^3',
  dots: [
    { x: 0, y: 0, label: '(0,0)', side: 'above-right' },
    { x: 3, y: -27, label: '(3,-27)', side: 'below' },
  ],
  x: [-1.5, 4.5],
  y: [-35, 25],
  yStep: 10,
  aspect: 1,
});

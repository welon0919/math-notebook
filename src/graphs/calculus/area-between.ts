import { functionPlot } from '../function-plot';

export default functionPlot({
  title: 'y = x + 2 和 y = x² 之間的面積',
  description:
    '直線 y = x + 2 和拋物線 y = x² 交於 (−1, 1) 和 (2, 4)。在兩個交點之間，直線在上、拋物線在下，兩者之間塗色的區域面積是 ∫₋₁² (x + 2 − x²) dx = 9/2。',
  pieces: [{ f: (x) => x + 2, from: -2.2, to: 3 }],
  tex: 'y=x+2',
  compare: [{ f: (x) => x * x, from: -2.2, to: 2.4, tex: 'y=x^2' }],
  shade: [{ from: -1, to: 2, lower: (x) => x * x, label: '面積 $\\frac92$' }],
  dots: [
    { x: -1, y: 1, label: '(-1,1)', side: 'left' },
    { x: 2, y: 4, label: '(2,4)', side: 'left' },
  ],
  x: [-2.2, 3],
  y: [-0.5, 5.5],
  aspect: 1,
});

import { functionPlot } from '../function-plot';

const r3 = Math.sqrt(3);

export default functionPlot({
  title: 'y = x/(x² + 1) 的圖形',
  description:
    '曲線 y = x/(x² + 1) 對原點對稱，往左右兩端都貼近 x 軸（水平漸近線 y = 0）。最高點 (1, 1/2)、最低點 (−1, −1/2)。三個反曲點 (−√3, −√3/4)、(0, 0)、(√3, √3/4) 用實心點標出，曲線在 x < −√3 和 0 < x < √3 凹向下，在 −√3 < x < 0 和 x > √3 凹向上。',
  pieces: [{ f: (x) => x / (x * x + 1), from: -6, to: 6 }],
  tex: 'y=\\dfrac{x}{x^2+1}',
  dots: [
    { x: 1, y: 0.5, label: '\\left(1,\\frac12\\right)', side: 'above-right' },
    { x: -1, y: -0.5, label: '\\left(-1,-\\frac12\\right)', side: 'below' },
    { x: 0, y: 0 },
    { x: r3, y: r3 / 4 },
    { x: -r3, y: -r3 / 4 },
  ],
  asymptotes: { horizontal: [0] },
  x: [-6, 6],
  y: [-0.8, 0.8],
  xStep: 2,
  yStep: 0.5,
  aspect: 1.2,
  readouts: ['反曲點：$\\left(-\\sqrt3,-\\frac{\\sqrt3}{4}\\right)$、$(0,0)$、$\\left(\\sqrt3,\\frac{\\sqrt3}{4}\\right)$'],
});

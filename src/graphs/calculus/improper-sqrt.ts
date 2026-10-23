import { functionPlot } from '../function-plot';

export default functionPlot({
  title: 'y = 1/√x 在 0 和 1 之間的面積',
  description:
    '曲線 y = 1/√x 在 x 靠近 0 時往上衝向無限大，在 (1, 1) 降到 1。0 < x ≤ 1 之間曲線下的區域往上無限延伸，但面積是有限的：∫₀¹ 1/√x dx = 2。',
  pieces: [{ f: (x) => 1 / Math.sqrt(x), from: 0.02, to: 2.5 }],
  tex: 'y=\\dfrac{1}{\\sqrt x}',
  shade: [{ from: 0.0004, to: 1, label: '$\\int_0^1\\frac{1}{\\sqrt x}\\,dx=2$' }],
  dots: [{ x: 1, y: 1, label: '(1,1)', side: 'above-right' }],
  x: [0, 2.5],
  y: [0, 6],
  yStep: 2,
  aspect: 1,
});

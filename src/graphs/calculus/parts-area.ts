import { functionPlot } from '../function-plot';

export default functionPlot({
  title: 'y = x sin x 在 [0, π] 下的面積',
  description:
    '曲線 y = x sin x 從 (0, 0) 升起，在 x ≈ 2 附近最高（約 1.82），到 x = π 回到 0。曲線和 x 軸之間塗色的區域面積是 ∫₀^π x sin x dx = π ≈ 3.14。',
  pieces: [{ f: (x) => x * Math.sin(x), from: 0, to: Math.PI }],
  tex: 'y=x\\sin x',
  shade: [{ from: 0, to: Math.PI, label: '$\\int_0^\\pi x\\sin x\\,dx=\\pi$' }],
  dots: [{ x: Math.PI, y: 0 }],
  readouts: ['曲線在 $x=\\pi$（標出的點）回到 $x$ 軸。'],
  x: [0, 3.5],
  y: [0, 2.2],
  yStep: 0.5,
  aspect: 4 / 3,
});

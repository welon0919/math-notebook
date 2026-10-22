import { functionPlot } from '../function-plot';

export default functionPlot({
  title: '圓柱罐的表面積 S(r)',
  description:
    '橫軸是底面半徑 r（公分），縱軸是表面積 S（平方公分）。曲線 S = 2πr² + 32π/r 在 r 很小時很大（罐子又細又長），r 很大時也很大（又矮又寬），中間在 (2, 24π)，約 (2, 75.4) 最低。',
  pieces: [{ f: (r) => 2 * Math.PI * r * r + (32 * Math.PI) / r, from: 0.55, to: 4.6 }],
  tex: 'S=2\\pi r^2+\\dfrac{32\\pi}{r}',
  dots: [{ x: 2, y: 24 * Math.PI, label: '(2,\\,24\\pi)', side: 'below' }],
  x: [0, 5],
  y: [0, 200],
  yStep: 50,
  xName: 'r',
  yName: 'S',
  aspect: 4 / 3,
});

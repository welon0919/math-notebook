import { sinusoidPlot } from '../sinusoid-plot';

const { PI } = Math;

export default sinusoidPlot({
  title: 'y = 3 sin(2x − π/3) + 1 的圖形',
  description:
    '實線是 y = 3 sin(2x − π/3) + 1，從 −π/2 畫到 2π；虛線是沒有平移的 y = 3 sin 2x + 1，水平虛線是中線 y = 1。實線的最高點 (5π/12, 4) 比虛線的最高點 (π/4, 4) 右移 π/6；最低點是 (11π/12, −2)，週期 π，起點 (π/6, 1) 在中線上、正在往上。',
  f: (x) => 3 * Math.sin(2 * x - PI / 3) + 1,
  tex: 'y=3\\sin\\left(2x-\\frac{\\pi}{3}\\right)+1',
  compare: [{ f: (x) => 3 * Math.sin(2 * x) + 1, tex: 'y=3\\sin2x+1' }],
  halfPis: [-1, 4],
  y: [-2, 4],
  midline: 1,
  marks: [
    { x: PI / 6, y: 1, label: '\\left(\\frac{\\pi}{6},1\\right)', below: true },
    { x: (5 * PI) / 12, y: 4, label: '\\left(\\frac{5\\pi}{12},4\\right)' },
    { x: (11 * PI) / 12, y: -2, label: '\\left(\\frac{11\\pi}{12},-2\\right)', below: true },
  ],
  readouts: ['振幅 $3$（最高 $4$、最低 $-2$，各離中線 $3$），週期 $\\pi$，相位：比虛線右移 $\\dfrac{\\pi}{6}$'],
});

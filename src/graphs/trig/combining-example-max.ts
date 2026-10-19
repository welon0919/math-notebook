import { sinusoidPlot } from '../sinusoid-plot';

const { PI } = Math;

export default sinusoidPlot({
  title: 'y = √3 sin x + cos x = 2 sin(x + π/6)',
  description:
    '實線是 y = √3 sin x + cos x 從 0 畫到 2π，它和 y = 2 sin(x + π/6) 是同一條曲線：振幅 2、週期 2π，圖形是 y = 2 sin x 向左平移 π/6。虛線是 y = 2 sin x，點線是 y = cos x。標出 x = 0 時的值 (0, 1)、最大值 (π/3, 2) 和最小值 (4π/3, −2)。',
  f: (x) => Math.sqrt(3) * Math.sin(x) + Math.cos(x),
  tex: 'y=\\sqrt3\\sin x+\\cos x=2\\sin\\left(x+\\frac{\\pi}{6}\\right)',
  compare: [
    { f: (x) => 2 * Math.sin(x), tex: 'y=2\\sin x' },
    { f: Math.cos, tex: 'y=\\cos x' },
  ],
  halfPis: [0, 4],
  y: [-2, 2],
  midline: 0,
  marks: [
    { x: 0, y: 1, label: '(0,1)' },
    { x: PI / 3, y: 2, label: '\\left(\\frac{\\pi}{3},2\\right)' },
    { x: (4 * PI) / 3, y: -2, label: '\\left(\\frac{4\\pi}{3},-2\\right)', below: true },
  ],
  readouts: [
    '疊合成 $2\\sin\\left(x+\\dfrac{\\pi}{6}\\right)$ 之後，振幅 $2$ 就是最大值；虛線 $y=2\\sin x$ 向左平移 $\\dfrac{\\pi}{6}$ 就是實線。',
    '和 $y=\\cos x$ 比較：最大值 $2$ 出現在 $x=\\dfrac{\\pi}{3}$，不在 $\\sin x$ 的最大處 $\\dfrac{\\pi}{2}$，也不在 $\\cos x$ 的最大處 $0$；兩個波各自的最大值不會同時出現，所以最大值不是 $\\sqrt3+1$。',
  ],
});

import { sinusoidPlot } from '../sinusoid-plot';

const { PI } = Math;

export default sinusoidPlot({
  title: 'y = 2 sin(x/2 − π/4) 的一個週期',
  description:
    '實線是 y = 2 sin(x/2 − π/4) 從 0 畫到 5π，水平虛線是中線 y = 0。標出一個週期的五個關鍵點：(π/2, 0)、(3π/2, 2)、(5π/2, 0)、(7π/2, −2)、(9π/2, 0)，依序是中線、最高、中線、最低、中線，週期 4π。',
  f: (x) => 2 * Math.sin(x / 2 - PI / 4),
  tex: 'y=2\\sin\\left(\\frac12x-\\frac{\\pi}{4}\\right)',
  halfPis: [0, 10],
  y: [-2, 2],
  midline: 0,
  marks: [
    { x: PI / 2, y: 0, label: '\\left(\\frac{\\pi}{2},0\\right)' },
    { x: (3 * PI) / 2, y: 2, label: '\\left(\\frac{3\\pi}{2},2\\right)' },
    { x: (5 * PI) / 2, y: 0, label: '\\left(\\frac{5\\pi}{2},0\\right)' },
    { x: (7 * PI) / 2, y: -2, label: '\\left(\\frac{7\\pi}{2},-2\\right)', below: true },
    { x: (9 * PI) / 2, y: 0, label: '\\left(\\frac{9\\pi}{2},0\\right)' },
  ],
  readouts: ['五個關鍵點依序是中線、最高、中線、最低、中線；從 $x=\\dfrac{\\pi}{2}$ 到 $x=\\dfrac{9\\pi}{2}$ 是一個週期 $4\\pi$。'],
});

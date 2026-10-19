import { sinusoidPlot } from '../sinusoid-plot';

const { PI } = Math;

export default sinusoidPlot({
  title: 'y = sin x − cos x 在 [0, π] 上',
  description:
    '實線是 y = sin x − cos x = √2 sin(x − π/4)，只畫 0 ≤ x ≤ π 這一段。左端點 (0, −1) 是最小值，(3π/4, √2) 是最大值，右端點是 (π, 1)。',
  f: (x) => Math.sin(x) - Math.cos(x),
  tex: 'y=\\sin x-\\cos x=\\sqrt2\\sin\\left(x-\\frac{\\pi}{4}\\right)',
  halfPis: [0, 2],
  y: [-1.5, 1.5],
  midline: 0,
  marks: [
    { x: 0, y: -1, label: '(0,-1)', below: true },
    { x: (3 * PI) / 4, y: Math.SQRT2, label: '\\left(\\frac{3\\pi}{4},\\sqrt2\\right)' },
    { x: PI, y: 1, label: '(\\pi,1)', below: true },
  ],
  readouts: ['在 $[0,\\pi]$ 上，最小值 $-1$ 出現在左端點 $x=0$，不是 $-\\sqrt2$：$x-\\dfrac{\\pi}{4}$ 只走到 $-\\dfrac{\\pi}{4}$，到不了 $-\\dfrac{\\pi}{2}$。'],
});

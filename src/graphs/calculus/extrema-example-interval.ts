import { functionPlot } from '../function-plot';

export default functionPlot({
  title: 'y = x³ − 6x² + 9x + 1 在 [0, 5] 上的最大值與最小值',
  description:
    '只畫 0 ≤ x ≤ 5 這一段。曲線從端點 (0, 1) 上升到極大 (1, 5)，下降到極小 (3, 1)，再一路上升到端點 (5, 21)。最大值 21 在右端點，比極大值 5 大得多；最小值 1 在 x = 0 和 x = 3 兩處取到。',
  pieces: [{ f: (x) => x ** 3 - 6 * x * x + 9 * x + 1, from: 0, to: 5 }],
  tex: 'y=x^3-6x^2+9x+1',
  dots: [
    { x: 0, y: 1, label: '(0,1)', side: 'right' },
    { x: 1, y: 5, label: '(1,5)', side: 'above' },
    { x: 3, y: 1, label: '(3,1)', side: 'above' },
    { x: 5, y: 21, label: '(5,21)', side: 'left' },
  ],
  x: [0, 5],
  y: [0, 22],
  yStep: 5,
  aspect: 1,
});

import { functionPlot } from '../function-plot';

export default functionPlot({
  title: 'y = x³ − x − 1 的根',
  description:
    '曲線 y = x³ − x − 1 在 x = 1 的高度是 −1（點 (1, −1)，在 x 軸下方），在 x = 2 的高度是 5（點 (2, 5)，在 x 軸上方），中間穿過 x 軸一次，交點 c ≈ 1.32。另外兩個沒有標字的點是二分法算的 (1.25, −0.297) 和 (1.5, 0.875)，根夾在它們之間。',
  pieces: [{ f: (x) => x ** 3 - x - 1, from: -0.5, to: 2 }],
  tex: 'y=x^3-x-1',
  dots: [
    { x: 1, y: -1, label: '(1,-1)', side: 'below' },
    { x: 2, y: 5, label: '(2,5)', side: 'left' },
    { x: 1.25, y: -0.296875 },
    { x: 1.5, y: 0.875 },
    { x: 1.3247, y: 0, label: 'c', side: 'above' },
  ],
  x: [-0.5, 2],
  y: [-2, 5.5],
  xStep: 0.5,
  aspect: 1,
});

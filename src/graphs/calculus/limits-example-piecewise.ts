import { functionPlot } from '../function-plot';

export default functionPlot({
  title: '分段函數在 x = 1 和 x = 3 的極限',
  description:
    'x < 1 時 y = x + 1，1 < x ≤ 3 時 y = 3 − x，x > 3 時 y = x − 2，另外 f(1) = 3。在 x = 1，兩段都靠近高度 2，圖上是空心點 (1, 2)，而實心點 (1, 3) 是 f(1)，在上方。在 x = 3，左段停在實心點 (3, 0)，右段從空心點 (3, 1) 開始，圖形在這裡斷開。',
  pieces: [
    { f: (x) => x + 1, from: -1, to: 1 },
    { f: (x) => 3 - x, from: 1, to: 3 },
    { f: (x) => x - 2, from: 3, to: 5 },
  ],
  tex: 'y=f(x)',
  dots: [
    { x: 1, y: 2, open: true, label: '(1,2)', side: 'below' },
    { x: 1, y: 3, label: '(1,3)' },
    { x: 3, y: 0 },
    { x: 3, y: 1, open: true, label: '(3,1)', side: 'left' },
  ],
  x: [-1, 5],
  y: [0, 3.5],
  readouts: [
    '$x=1$：左右極限都是 $2$，極限是 $2$，但 $f(1)=3$。',
    '$x=3$：左極限 $0$，右極限 $1$，極限不存在；$f(3)=0$。',
  ],
});

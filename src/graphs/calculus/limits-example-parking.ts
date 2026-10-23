import { functionPlot } from '../function-plot';

export default functionPlot({
  title: '停車費 P(t) 的圖形',
  description:
    '橫軸是停車時間 t（小時），縱軸是停車費 P（元）。0 < t ≤ 1 時 P = 30，1 < t ≤ 2 時 P = 50，2 < t ≤ 3 時 P = 70，圖形是三段水平線，像樓梯。每一段的右端是實心點（含端點），左端是空心點。在 t = 1，左邊的高度是 30、右邊是 50，圖形往上跳。',
  pieces: [
    { f: () => 30, from: 0, to: 1 },
    { f: () => 50, from: 1, to: 2 },
    { f: () => 70, from: 2, to: 3 },
  ],
  tex: 'P=P(t)',
  dots: [
    { x: 0, y: 30, open: true },
    { x: 1, y: 30, label: '(1,30)', side: 'below' },
    { x: 1, y: 50, open: true },
    { x: 2, y: 50, label: '(2,50)', side: 'below' },
    { x: 2, y: 70, open: true },
    { x: 3, y: 70, label: '(3,70)', side: 'below' },
  ],
  x: [0, 3.5],
  y: [0, 80],
  yStep: 10,
  xName: 't',
  yName: 'P',
  aspect: 4 / 3,
  readouts: ['$t\\to1^-$ 時 $P\\to30$，$t\\to1^+$ 時 $P\\to50$：$\\displaystyle\\lim_{t\\to1}P(t)$ 不存在。'],
});

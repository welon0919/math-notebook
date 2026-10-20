import { functionPlot } from '../function-plot';

export default functionPlot({
  title: '水槽中鹽水的濃度',
  description:
    '橫軸是時間 t（分鐘），縱軸是濃度 C（公克／公升）。曲線 C = 50t/(20 + t) 從 (0, 0) 出發，一開始上升得快，後來越來越慢，標出的點 (80, 40) 是濃度到達 40 的時刻。虛線是水平漸近線 C = 50：濃度越來越接近 50，但永遠不會達到。',
  pieces: [{ f: (t) => (50 * t) / (20 + t), from: 0, to: 120 }],
  tex: 'C=\\dfrac{50t}{20+t}',
  dots: [{ x: 80, y: 40, label: '(80,40)', side: 'below' }],
  asymptotes: { horizontal: [50] },
  x: [0, 120],
  y: [0, 60],
  xStep: 20,
  yStep: 10,
  xName: 't',
  yName: 'C',
  aspect: 1.5,
});

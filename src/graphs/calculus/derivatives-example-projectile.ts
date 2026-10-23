import { functionPlot } from '../function-plot';

export default functionPlot({
  title: '上拋的高度 h(t) 與 t = 1 的切線',
  description:
    '橫軸是時間 t（秒），縱軸是高度 h（公尺）。藍色拋物線 h = 20t − 5t² 從 (0, 0) 上升，在 (2, 20) 到達最高點，t = 4 落回地面。另一條直線是 t = 1 的切線 h = 10t + 5，斜率 10 就是那一瞬間的速度。最高點的切線是水平的，斜率 0。',
  pieces: [{ f: (t) => 20 * t - 5 * t * t, from: 0, to: 4 }],
  tex: 'h=20t-5t^2',
  compare: [{ f: (t) => 10 * t + 5, from: 0, to: 2.2, tex: 'h=10t+5' }],
  dots: [
    { x: 1, y: 15, label: '(1,15)', side: 'right' },
    { x: 2, y: 20, label: '(2,20)', side: 'above' },
  ],
  x: [0, 4],
  y: [0, 25],
  yStep: 5,
  xName: 't',
  yName: 'h',
  aspect: 4 / 3,
});

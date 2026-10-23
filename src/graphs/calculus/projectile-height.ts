import { functionPlot } from '../function-plot';

export default functionPlot({
  title: '往上拋的球的高度 s(t)',
  description:
    '橫軸是時間 t（秒），縱軸是高度 s（公尺）。拋物線 s = −5t² + 20t + 25 從 (0, 25) 出發，第 2 秒到達最高點 (2, 45)，第 5 秒落地 (5, 0)。',
  pieces: [{ f: (t) => -5 * t * t + 20 * t + 25, from: 0, to: 5 }],
  tex: 's=-5t^2+20t+25',
  dots: [
    { x: 0, y: 25, label: '(0,25)', side: 'right' },
    { x: 2, y: 45, label: '(2,45)', side: 'above' },
    { x: 5, y: 0, label: '(5,0)', side: 'left' },
  ],
  x: [0, 5.5],
  y: [0, 50],
  yStep: 10,
  xName: 't',
  yName: 's',
  aspect: 4 / 3,
});

import { functionPlot } from '../function-plot';

export default functionPlot({
  title: '速度 v(t) 與位移、路程',
  description:
    '橫軸是時間 t（秒），縱軸是速度 v（公尺／秒）。拋物線 v = t² − 4t + 3 在 t = 1 和 t = 3 等於 0。0 ≤ t ≤ 1 的部分在 t 軸上方，塗一種顏色，面積 4/3：往正方向走了 4/3 公尺。1 ≤ t ≤ 3 的部分在下方，塗另一種顏色，面積也是 4/3：往負方向走回 4/3 公尺。兩塊互相抵消，定積分（位移）是 0，但走過的路程是 8/3 公尺。',
  pieces: [{ f: (t) => t * t - 4 * t + 3, from: 0, to: 3.2 }],
  tex: 'v=t^2-4t+3',
  shade: [
    { from: 0, to: 1, label: '$\\int_0^1v\\,dt=\\frac43$' },
    { from: 1, to: 3, negative: true, label: '$\\int_1^3v\\,dt=-\\frac43$' },
  ],
  dots: [
    { x: 1, y: 0, label: '(1,0)', side: 'above-right' },
    { x: 3, y: 0 },
  ],
  x: [0, 3.5],
  y: [-1.5, 3.5],
  xName: 't',
  yName: 'v',
  aspect: 1,
});

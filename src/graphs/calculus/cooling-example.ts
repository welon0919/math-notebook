import { functionPlot } from '../function-plot';

export default functionPlot({
  title: '熱水冷卻的溫度 T(t)',
  description:
    '橫軸是時間 t（分鐘），縱軸是溫度 T（°C）。藍色曲線 T = 20 + 60e^(−0.05t) 從 (0, 80) 開始下降，越降越慢，往右貼近虛線 T = 20（室溫，水平漸近線）。另一條直線是 t = 0 的切線 T = 80 − 3t，斜率 −3：一開始每分鐘降 3°C。標出的點 (20, 42.1) 是 20 分鐘時的溫度。',
  pieces: [{ f: (t) => 20 + 60 * Math.exp(-0.05 * t), from: 0, to: 80 }],
  tex: 'T=20+60e^{-0.05t}',
  compare: [{ f: (t) => 80 - 3 * t, from: 0, to: 22, tex: 'T=80-3t' }],
  dots: [
    { x: 0, y: 80, label: '(0,80)', side: 'right' },
    { x: 20, y: 20 + 60 * Math.exp(-1), label: '(20,\\,42.1)', side: 'above-right' },
  ],
  asymptotes: { horizontal: [20] },
  x: [0, 80],
  y: [0, 90],
  xStep: 10,
  yStep: 10,
  xName: 't',
  yName: 'T',
  aspect: 4 / 3,
});

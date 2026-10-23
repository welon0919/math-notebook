import { functionPlot } from '../function-plot';

export default functionPlot({
  title: '位置 s(t) 與速度 v(t)',
  description:
    '橫軸是時間 t（秒）。藍色曲線是位置 s = t³ − 6t² + 9t（公尺），另一條曲線是速度 v = 3t² − 12t + 9。速度在 t = 1 和 t = 3 等於 0（速度曲線碰到 t 軸），這兩個時刻物體靜止：位置分別是 (1, 4) 和 (3, 0)，是藍色曲線轉彎的地方。1 < t < 3 時速度是負的，位置在減少。',
  pieces: [{ f: (t) => t ** 3 - 6 * t * t + 9 * t, from: 0, to: 4 }],
  tex: 's=t^3-6t^2+9t',
  compare: [{ f: (t) => 3 * t * t - 12 * t + 9, from: 0, to: 4, tex: 'v=3t^2-12t+9' }],
  dots: [
    { x: 1, y: 4, label: '(1,4)', side: 'above' },
    { x: 3, y: 0, label: '(3,0)', side: 'left' },
  ],
  x: [0, 4],
  y: [-4, 10],
  yStep: 2,
  xName: 't',
  yName: '',
  aspect: 1,
});

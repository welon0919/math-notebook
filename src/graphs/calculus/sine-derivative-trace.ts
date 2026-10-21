import { derivativeTrace } from '../derivative-trace';

export default derivativeTrace({
  title: 'y = sin x 的切線斜率畫出 y = cos x',
  description:
    '藍色曲線是 y = sin x，從 0 畫到 2π 附近。沿著曲線拖動點 P，另一條直線是 P 點的切線，切線斜率畫成點 (x, 斜率)，P 從左邊移過來時留下一條軌跡。在 x = 0 斜率是 1，在 x = π/2 斜率是 0，在 x = π 斜率是 −1。拖完整段，軌跡正好是 y = cos x 的圖形。',
  f: Math.sin,
  df: Math.cos,
  tex: 'y=\\sin x',
  dtex: 'y=\\cos x',
  box: [-0.5, 1.7, 2 * Math.PI + 0.4, -1.7],
  aspect: 2,
  range: [0, 2 * Math.PI],
  start: 0,
  piAxis: true,
  // Above left: P often sits on the x-axis, where the π labels are.
  labelOffset: [-16, 12],
  note: '拖到 $2\\pi$，描出的曲線是 $y=\\cos x$：$\\sin x$ 的導數是 $\\cos x$。',
});

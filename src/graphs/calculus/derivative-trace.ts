import { derivativeTrace } from '../derivative-trace';

export default derivativeTrace({
  title: '導函數：把每一點的切線斜率畫出來',
  description:
    '藍色曲線是 y = f(x) = x³/3 − x。沿著曲線拖動點 P，另一條直線是 P 點的切線。切線的斜率 f′(x) 畫成另一個點 (x, f′(x))，P 從左邊移過來時，這個點留下一條軌跡。拖完整段，軌跡是拋物線 y = x² − 1：這就是導函數 f′(x) 的圖形。切線水平（x = ±1）時，軌跡碰到 x 軸。',
  f: (x) => x ** 3 / 3 - x,
  df: (x) => x * x - 1,
  tex: 'y=f(x)=\\frac{x^3}{3}-x',
  dtex: "y=f'(x)=x^2-1",
  box: [-3, 2.75, 3, -1.75],
  range: [-1.9, 1.9],
  start: -1.9,
  note: "拖到右邊，描出的曲線就是導函數 $y=f'(x)$ 的圖形。曲線往右上升時 $f'(x)>0$，往右下降時 $f'(x)<0$。",
});

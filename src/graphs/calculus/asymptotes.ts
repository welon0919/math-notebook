import { keepInside, snap } from '../helpers';
import type { GraphDef } from '../types';

const step = 0.1;
// (2x + 1)/(x − 1) = 2 + 3/(x − 1)
const f = (x: number) => (2 * x + 1) / (x - 1);
const [xmin, ymax, xmax, ymin] = [-7, 8, 9, -4];
const num = (v: number) => String(+v.toFixed(2));

export default {
  title: '水平漸近線與鉛直漸近線',
  description:
    '實線是 y = (2x + 1)/(x − 1)，虛線是兩條漸近線 y = 2 和 x = 1。左右拖動 x 軸上的點 t，曲線上的點 P = (t, f(t)) 跟著移動，P 和水平線 y = 2 之間的距離畫成一條線段。t 往左右兩端拖時，P 越來越貼近 y = 2；t 靠近 1 時，P 往上或往下衝出畫面，這時畫面邊緣會出現指向 P 的箭頭，下方文字給出 P 的坐標。',
  boundingBox: [xmin, ymax, xmax, ymin],
  build(board, ctx) {
    const { color } = ctx;
    const dashed = { fixed: true, strokeColor: color.accent2, strokeWidth: 1.5, dash: 3 };
    board.create('line', [[0, 2], [1, 2]], dashed);
    board.create('line', [[1, 0], [1, 1]], dashed);
    const curve = { fixed: true, strokeColor: color.accent, strokeWidth: 3 };
    board.create('functiongraph', [f, xmin, 0.999], curve);
    board.create('functiongraph', [f, 1.001, xmax], curve);

    const T = board.create('point', [4, 0], { name: ctx.tex('t'), strokeColor: color.ink, fillColor: color.ink, label: { offset: [-16, 10] } });
    keepInside(T, [xmin + 0.5, 0, xmax - 0.5, 0]);
    // Steps of 0.1, never t = 1 itself (f isn't defined there): it lands on the side it came from.
    T.on('drag', () => {
      let t = snap(T.X(), step);
      if (Math.abs(t - 1) < 1e-9) t = T.X() < 1 ? 1 - step : 1 + step;
      T.moveTo([t, 0]);
    });
    const t = () => snap(T.X(), step);
    const y = () => f(t());
    const inside = () => y() > ymin && y() < ymax;

    const P = board.create('point', [t, y], { fixed: true, name: 'P', size: 5, strokeColor: color.accent, fillColor: color.accent, label: { offset: [8, 8] } });
    board.create('segment', [T, P], { fixed: true, strokeColor: color.muted, strokeWidth: 1, dash: 1 });
    board.create('segment', [P, [t, 2]], { fixed: true, strokeColor: color.highlight, strokeWidth: 3, visible: inside });
    // When P is off the frame, an arrow at the top or bottom edge points to it.
    const edge = () => (y() > 0 ? ymax - 0.3 : ymin + 0.3);
    board.create('arrow', [[t, () => edge() - Math.sign(y()) * 1.2], [t, edge]], {
      fixed: true,
      strokeColor: color.accent,
      strokeWidth: 3,
      visible: () => !inside(),
    });

    ctx.readout(() => `$t=${num(t())}$，$P=\\left(${num(t())},\\ ${num(y())}\\right)$${inside() ? '' : '（在畫面外）'}`);
    ctx.readout(() => `$P$ 到水平線 $y=2$ 的高度差：$f(t)-2=\\dfrac{3}{t-1}=${num(y() - 2)}$`);
    ctx.readout(() =>
      Math.abs(t() - 1) <= 0.5
        ? '$t$ 靠近 $1$：分母 $t-1$ 靠近 $0$，$f(t)$ 的絕對值無限變大，圖形貼著鉛直線 $x=1$。'
        : '$t$ 離 $1$ 越遠，$\\dfrac{3}{t-1}$ 越接近 $0$，圖形越貼近水平線 $y=2$。',
    );
  },
} satisfies GraphDef;

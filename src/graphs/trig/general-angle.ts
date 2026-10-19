import { snap, toDegrees } from '../helpers';
import type { GraphDef } from '../types';

const step = 0.1;
const num = (v: number) => String(+v.toFixed(2));
const eps = 1e-9;
// Within this many degrees of a multiple of 30° or 45°, P is rotated onto it (keeping r).
const magnetDeg = 2;

export default {
  title: '廣義角與參考角',
  description:
    '拖動點 P，射線 OP 是角 θ 的終邊，θ 從正 x 軸逆時針量起，範圍 0° 到 360°。從 P 作 x 軸的垂線，得到水平邊 x、鉛直邊 y 和斜邊 r；終邊和 x 軸之間的銳角是參考角，塗上顏色。接近 30° 或 45° 的倍數時 P 會自動對齊。下方顯示 θ 在第幾象限、參考角、P 的坐標與 r，以及 sin θ = y/r、cos θ = x/r、tan θ = y/x 的值和正負號。',
  boundingBox: [-4, 3, 4, -3],
  build(board, ctx) {
    const { color } = ctx;
    const O = board.create('point', [0, 0], { visible: false, fixed: true });
    const X = board.create('point', [1, 0], { visible: false, fixed: true });
    const P = board.create('point', [-3, 2], { name: 'P', size: 4, label: { offset: [8, 8] } });
    P.on('drag', () => {
      let [x, y] = [snap(P.X(), step), snap(P.Y(), step)];
      x = Math.max(-3.7, Math.min(3.7, x));
      y = Math.max(-2.7, Math.min(2.7, y));
      if (Math.hypot(x, y) < 0.5) [x, y] = [0.5, 0];
      const r = Math.hypot(x, y);
      const deg = toDegrees(Math.atan2(y, x));
      for (const target of [30, 45]) {
        const near = Math.round(deg / target) * target;
        if (Math.abs(deg - near) < magnetDeg) {
          const t = (near * Math.PI) / 180;
          [x, y] = [r * Math.cos(t), r * Math.sin(t)];
          break;
        }
      }
      P.moveTo([x, y]);
    });

    const x = () => (Math.abs(P.X()) < 1e-6 ? 0 : P.X());
    const y = () => (Math.abs(P.Y()) < 1e-6 ? 0 : P.Y());
    const r = () => Math.hypot(x(), y());
    const theta = () => {
      const d = toDegrees(Math.atan2(y(), x()));
      return d < -eps ? d + 360 : Math.abs(d) < eps ? 0 : d;
    };
    const onAxis = () => x() === 0 || y() === 0;

    board.create('angle', [X, O, P], {
      radius: 0.4,
      name: ctx.tex('\\theta'),
      strokeColor: color.accent,
      fillColor: color.accent,
      fillOpacity: 0.1,
      label: { offset: [4, 4], strokeColor: color.accent },
    });
    board.create('segment', [O, P], { strokeColor: color.ink, strokeWidth: 3 });
    const foot = board.create('point', [() => x(), 0], { visible: false, fixed: true });
    board.create('segment', [P, foot], { strokeColor: color.accent, strokeWidth: 3, visible: () => !onAxis() });
    board.create('segment', [O, foot], { strokeColor: color.accent2, strokeWidth: 3, visible: () => !onAxis() });
    // The reference angle: between OP and the nearer half of the x-axis.
    const side = board.create('point', [() => (x() < 0 ? -1 : 1), 0], { visible: false, fixed: true });
    board.create('nonreflexangle', [side, O, P], {
      radius: 0.9,
      withLabel: false,
      fillColor: color.highlight,
      strokeColor: color.highlight,
      fillOpacity: 0.3,
      visible: () => !onAxis(),
    });
    const label = (px: () => number, py: () => number, latex: string, c: string) =>
      board.create('text', [px, py, ctx.tex(latex)], {
        anchorX: 'middle',
        anchorY: 'middle',
        fixed: true,
        strokeColor: c,
        fontSize: 14,
        visible: () => !onAxis(),
      });
    label(() => x() / 2, () => (y() >= 0 ? -0.3 : 0.3), 'x', color.accent2);
    label(() => x() + (x() >= 0 ? 0.3 : -0.3), () => y() / 2, 'y', color.accent);

    const quadrant = () => {
      if (onAxis()) return '終邊在坐標軸上，不屬於任何象限';
      const q = x() > 0 ? (y() > 0 ? '一' : '四') : y() > 0 ? '二' : '三';
      return `第${q}象限`;
    };
    const reference = () => {
      const t = theta();
      return t <= 90 ? t : t <= 180 ? 180 - t : t <= 270 ? t - 180 : 360 - t;
    };
    const sign = (v: number) => (Math.abs(v) < eps ? '$0$' : v > 0 ? '正' : '負');
    ctx.readout(() => `$\\theta=${num(theta())}^\\circ$，${quadrant()}` + (onAxis() ? '' : `，參考角 $${num(reference())}^\\circ$`));
    ctx.readout(() => `$P(${num(x())},\\ ${num(y())})$，$r=\\sqrt{x^2+y^2}=${num(r())}$`);
    ctx.readout(() => {
      const tan = x() === 0 ? '$\\tan\\theta$ 無定義' : `$\\tan\\theta=\\dfrac{y}{x}=${num(y() / x())}$（${sign(y() / x())}）`;
      return `$\\sin\\theta=\\dfrac{y}{r}=${num(y() / r())}$（${sign(y())}），$\\cos\\theta=\\dfrac{x}{r}=${num(x() / r())}$（${sign(x())}），${tan}`;
    });
  },
} satisfies GraphDef;

import { toDegrees } from '../helpers';
import type { GraphDef } from '../types';

const num = (v: number) => String(+v.toFixed(2));
const eps = 1e-9;
// Within this many degrees of a multiple of 30° or 45°, P lands exactly on it.
const magnetDeg = 1.5;

/**
 * The unit circle with a point P dragged smoothly around it: cos θ and sin θ drawn as P's
 * horizontal and vertical legs, and the values of sin, cos, tan with their signs below.
 * With `radians`, θ is also shown in radians.
 */
export function unitCirclePoint(radians: boolean): GraphDef {
  return {
    title: '單位圓上的正弦、餘弦與正切',
    description:
      '以原點為圓心、半徑 1 的單位圓。沿著圓拖動點 P，角 θ 從正 x 軸逆時針量起。P 的 x 坐標是 cos θ（水平線段），y 坐標是 sin θ（鉛直線段）。接近 30° 或 45° 的倍數時 P 會自動對齊。下方顯示 θ' +
      (radians ? '（度與弧度）' : '') +
      '、所在象限、P 的坐標，以及 sin θ、cos θ、tan θ 的值和正負號。',
    boundingBox: [-1.6, 1.2, 1.6, -1.2],
    axis: false,
    build(board, ctx) {
      const { color } = ctx;
      const thin = { fixed: true, strokeColor: color.muted, strokeWidth: 1, highlight: false };
      board.create('arrow', [[-1.5, 0], [1.5, 0]], thin);
      board.create('arrow', [[0, -1.15], [0, 1.15]], thin);
      for (const [x, y, t, ax, ay] of [
        [1, 0, '1', 'left', 'top'],
        [-1, 0, '-1', 'right', 'top'],
        [0, 1, '1', 'left', 'bottom'],
        [0, -1, '-1', 'left', 'top'],
      ] as const) {
        board.create('text', [x + (ax === 'left' ? 0.03 : -0.03), y + (ay === 'top' ? -0.03 : 0.03), t], {
          anchorX: ax,
          anchorY: ay,
          fixed: true,
          fontSize: 12,
          strokeColor: color.muted,
        });
      }
      board.create('circle', [[0, 0], 1], { fixed: true, strokeColor: color.ink, strokeWidth: 2, highlight: false });

      const O = board.create('point', [0, 0], { visible: false, fixed: true });
      const X = board.create('point', [1, 0], { visible: false, fixed: true });
      const start = (150 * Math.PI) / 180;
      const P = board.create('point', [Math.cos(start), Math.sin(start)], { name: 'P', size: 4, label: { offset: [8, 8] } });
      // Free, smooth dragging along the circle; only near special angles does P snap.
      P.on('drag', () => {
        let t = Math.atan2(P.Y(), P.X());
        const deg = toDegrees(t);
        for (const target of [30, 45]) {
          const near = Math.round(deg / target) * target;
          if (Math.abs(deg - near) < magnetDeg) {
            t = (near * Math.PI) / 180;
            break;
          }
        }
        P.moveTo([Math.cos(t), Math.sin(t)]);
      });

      const clean = (v: number) => (Math.abs(v) < 1e-9 ? 0 : v);
      const x = () => clean(P.X());
      const y = () => clean(P.Y());
      const theta = () => {
        const d = toDegrees(Math.atan2(y(), x()));
        return d < -eps ? d + 360 : Math.abs(d) < eps ? 0 : d;
      };
      const onAxis = () => Math.abs(x()) < 1e-6 || Math.abs(y()) < 1e-6;

      board.create('angle', [X, O, P], {
        radius: 0.22,
        name: ctx.tex('\\theta'),
        strokeColor: color.accent,
        fillColor: color.accent,
        fillOpacity: 0.1,
        label: { offset: [2, 2], strokeColor: color.accent },
      });
      board.create('segment', [O, P], { strokeColor: color.ink, strokeWidth: 2, fixed: true, highlight: false });
      const foot = board.create('point', [() => x(), 0], { visible: false, fixed: true });
      board.create('segment', [P, foot], { strokeColor: color.accent, strokeWidth: 4, fixed: true, highlight: false });
      board.create('segment', [O, foot], { strokeColor: color.accent2, strokeWidth: 4, fixed: true, highlight: false });
      const label = (px: () => number, py: () => number, latex: string, c: string) =>
        board.create('text', [px, py, ctx.tex(latex)], {
          anchorX: 'middle',
          anchorY: 'middle',
          fixed: true,
          strokeColor: c,
          fontSize: 13,
          visible: () => !onAxis(),
        });
      label(() => x() / 2, () => (y() >= 0 ? -0.1 : 0.1), '\\cos\\theta', color.accent2);
      label(() => x() + (x() >= 0 ? 0.2 : -0.2), () => y() / 2, '\\sin\\theta', color.accent);

      const quadrant = () => {
        if (onAxis()) return '在坐標軸上';
        return `第${x() > 0 ? (y() > 0 ? '一' : '四') : y() > 0 ? '二' : '三'}象限`;
      };
      const sign = (v: number) => (Math.abs(v) < 1e-6 ? '' : v > 0 ? '（正）' : '（負）');
      ctx.readout(() => {
        const deg = `$\\theta=${num(theta())}^\\circ$`;
        const rad = radians ? `$=${num((theta() * Math.PI) / 180)}$ 弧度` : '';
        return `${deg}${rad}，${quadrant()}，$P(${num(x())},\\ ${num(y())})$`;
      });
      ctx.readout(() => {
        const tan = Math.abs(x()) < 1e-6 ? '$\\tan\\theta$ 無定義' : `$\\tan\\theta=\\dfrac{y}{x}=${num(y() / x())}$${sign(y() / x())}`;
        return `$\\sin\\theta=y=${num(y())}$${sign(y())}，$\\cos\\theta=x=${num(x())}$${sign(x())}，${tan}`;
      });
    },
  };
}

export default unitCirclePoint(true);

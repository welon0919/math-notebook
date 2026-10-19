import { snap, toDegrees } from '../helpers';
import type { GraphDef } from '../types';

const num = (v: number) => String(+v.toFixed(2));
// Within this many degrees of a multiple of 30° or 45°, P lands exactly on it.
const magnetDeg = 1.5;

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

/** A whole number of degrees as a multiple of π, e.g. 120 → \frac{2\pi}{3}. */
function piFraction(deg: number): string {
  const g = gcd(deg, 180);
  const [n, d] = [deg / g, 180 / g];
  const top = n === 1 ? '\\pi' : `${n}\\pi`;
  return d === 1 ? top : `\\dfrac{${top}}{${d}}`;
}

export default {
  title: '弧度：弧長是半徑的幾倍',
  description:
    '圓心在原點的圓，用滑桿改變半徑 r。沿著圓拖動點 P，從正 x 軸上的點 A 逆時針到 P 的弧長是 s，圓心角 θ = s ÷ r 弧度。圓上每隔「弧長等於半徑」的地方標一個刻度 1、2、3、…，一圈大約是 6.28 個半徑，也就是 2π。下方顯示 r、s、θ 的弧度值，並換算成度；改變半徑時 θ 不變。接近 30° 或 45° 的倍數時 P 會自動對齊，並顯示 θ 是 π 的幾分之幾。',
  boundingBox: [-4, 3, 4, -3],
  axis: false,
  build(board, ctx) {
    const { color } = ctx;
    const sr = board.create('slider', [[-3.7, 2.6], [-1.7, 2.6], [1, 1.6, 2.4]], { name: 'r', snapWidth: 0.1, digits: 1 });
    const r = () => snap(sr.Value(), 0.1);
    let theta = (2 * Math.PI) / 3;

    const thin = { fixed: true, strokeColor: color.muted, strokeWidth: 1, highlight: false };
    board.create('segment', [[-2.9, 0], [2.9, 0]], thin);
    board.create('segment', [[0, -2.8], [0, 2.8]], thin);
    board.create('circle', [[0, 0], () => r()], { fixed: true, strokeColor: color.ink, strokeWidth: 2, highlight: false });

    // Every arc of length r, starting from A: ticks at θ = 1, 2, …, 6.
    for (let k = 1; k <= 6; k++) {
      board.create(
        'segment',
        [
          [() => (r() - 0.1) * Math.cos(k), () => (r() - 0.1) * Math.sin(k)],
          [() => (r() + 0.1) * Math.cos(k), () => (r() + 0.1) * Math.sin(k)],
        ],
        { ...thin, strokeWidth: 2 },
      );
      // Tick numbers inside the circle; the arc's label s goes outside.
      board.create('text', [() => (r() - 0.3) * Math.cos(k), () => (r() - 0.3) * Math.sin(k), String(k)], {
        anchorX: 'middle',
        anchorY: 'middle',
        fixed: true,
        fontSize: 12,
        strokeColor: color.muted,
      });
    }

    const O = board.create('point', [0, 0], { visible: false, fixed: true });
    const A = board.create('point', [() => r(), 0], { name: 'A', fixed: true, size: 3, strokeColor: color.ink, fillColor: color.ink, label: { offset: [6, -12] } });
    const P = board.create('point', [r() * Math.cos(theta), r() * Math.sin(theta)], { name: 'P', size: 4, label: { offset: [8, 8] } });
    const place = () => P.moveTo([r() * Math.cos(theta), r() * Math.sin(theta)]);
    P.on('drag', () => {
      let t = Math.atan2(P.Y(), P.X());
      if (t < 0) t += 2 * Math.PI;
      const deg = toDegrees(t);
      for (const target of [30, 45]) {
        const near = Math.round(deg / target) * target;
        if (Math.abs(deg - near) < magnetDeg) {
          t = (near * Math.PI) / 180;
          break;
        }
      }
      // A full turn reads 360°, not 0°, when P comes back to A from below.
      theta = t < 1e-9 && theta > Math.PI ? 2 * Math.PI : t;
      place();
    });
    sr.on('drag', place);

    board.create('segment', [O, A], { strokeColor: color.accent2, strokeWidth: 4, fixed: true, highlight: false });
    board.create('text', [() => r() / 2, -0.25, ctx.tex('r')], { anchorX: 'middle', anchorY: 'middle', fixed: true, strokeColor: color.accent2, fontSize: 14 });
    board.create('segment', [O, P], { strokeColor: color.ink, strokeWidth: 2, fixed: true, highlight: false });
    board.create('curve', [(t: number) => r() * Math.cos(t), (t: number) => r() * Math.sin(t), 0, () => theta], {
      strokeColor: color.accent,
      strokeWidth: 5,
      fixed: true,
      highlight: false,
    });
    board.create('text', [() => (r() + 0.35) * Math.cos(theta / 2), () => (r() + 0.35) * Math.sin(theta / 2), ctx.tex('s')], {
      anchorX: 'middle',
      anchorY: 'middle',
      fixed: true,
      strokeColor: color.accent,
      fontSize: 15,
      visible: () => theta > 0.3,
    });
    board.create('curve', [(t: number) => 0.25 * Math.cos(t), (t: number) => 0.25 * Math.sin(t), 0, () => theta], {
      strokeColor: color.accent,
      strokeWidth: 1.5,
      fixed: true,
      highlight: false,
    });
    board.create('text', [() => 0.45 * Math.cos(theta / 2), () => 0.45 * Math.sin(theta / 2), ctx.tex('\\theta')], {
      anchorX: 'middle',
      anchorY: 'middle',
      fixed: true,
      strokeColor: color.accent,
      fontSize: 14,
      visible: () => theta > 0.3,
    });

    ctx.readout(() => `$r=${num(r())}$，弧長 $s=${num(r() * theta)}$，$\\theta=\\dfrac{s}{r}=${num(theta)}$ 弧度`);
    ctx.readout(() => {
      const deg = toDegrees(theta);
      const whole = Math.round(deg);
      const exact = Math.abs(deg - whole) < 1e-6 && whole % 15 === 0 && whole > 0 ? `，正好是 $${piFraction(whole)}$ 弧度` : '';
      return `換算成度：$${num(theta)}\\times\\dfrac{180^\\circ}{\\pi}=${num(deg)}^\\circ$${exact}`;
    });
  },
} satisfies GraphDef;

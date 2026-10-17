import { piTicks, snap, toDegrees } from '../helpers';
import type { GraphDef } from '../types';

const step = 0.1;
const eps = 1e-9;
const period = 2 * Math.PI;

export default {
  title: '疊合：兩個波相加還是一個波',
  description:
    '用滑桿改變 a、b。圖中畫出 y = a sin θ、y = b cos θ、兩者相加的波，以及 y = r sin(θ + φ)，其中 r = √(a² + b²)、cos φ = a/r、sin φ = b/r。相加的波和 r sin(θ + φ) 永遠完全重疊。',
  boundingBox: [-0.7, 6.2, 7.7, -4.2],
  axis: false,
  build(board, ctx) {
    const { color } = ctx;
    const thin = { fixed: true, strokeColor: color.muted, strokeWidth: 1 };
    board.create('arrow', [[-0.5, 0], [7.2, 0]], thin);
    board.create('arrow', [[0, -4], [0, 4]], thin);
    piTicks(board, ctx, { y: 0, from: 1, to: 4, tick: 0.12 });
    for (let k = -3; k <= 3; k++) {
      if (k === 0) continue;
      board.create('segment', [[-0.08, k], [0.08, k]], thin);
      board.create('text', [-0.15, k, String(k)], { anchorX: 'right', anchorY: 'middle', fixed: true, fontSize: 12, strokeColor: color.muted });
    }

    const slider = (y: number, name: string, start: number) =>
      board.create('slider', [[0.3, y], [2.8, y], [-2.5, start, 2.5]], { name, snapWidth: step, digits: 1 });
    const sa = slider(5.6, 'a', 2);
    const sb = slider(4.9, 'b', 1);
    const a = () => snap(sa.Value(), step);
    const b = () => snap(sb.Value(), step);
    const r = () => Math.hypot(a(), b());
    // φ with cos φ = a/r and sin φ = b/r.
    const phi = () => Math.atan2(b(), a());

    const wave = (fn: (t: number) => number, attrs: object) => board.create('curve', [(t: number) => t, fn, 0, period], attrs);
    wave((t) => a() * Math.sin(t), { strokeColor: color.accent, strokeWidth: 2, dash: 2 });
    wave((t) => b() * Math.cos(t), { strokeColor: color.accent2, strokeWidth: 2, dash: 2 });
    wave((t) => a() * Math.sin(t) + b() * Math.cos(t), { strokeColor: color.ink, strokeWidth: 6, strokeOpacity: 0.35 });
    wave((t) => r() * Math.sin(t + phi()), { strokeColor: color.highlight, strokeWidth: 2.5 });

    // Legend, top right.
    const legend = (y: number, latex: string, attrs: object) => {
      board.create('segment', [[4.6, y], [5.0, y]], { fixed: true, ...attrs });
      board.create('text', [5.1, y, ctx.tex(latex)], { anchorX: 'left', anchorY: 'middle', fixed: true, fontSize: 13 });
    };
    legend(5.7, 'a\\sin\\theta', { strokeColor: color.accent, strokeWidth: 2, dash: 2 });
    legend(5.1, 'b\\cos\\theta', { strokeColor: color.accent2, strokeWidth: 2, dash: 2 });
    legend(4.5, 'a\\sin\\theta+b\\cos\\theta', { strokeColor: color.ink, strokeWidth: 6, strokeOpacity: 0.35 });
    legend(3.9, 'r\\sin(\\theta+\\varphi)', { strokeColor: color.highlight, strokeWidth: 2.5 });

    const f = ctx.fmt;
    const zero = () => r() < eps;
    // θ + 30°, θ − 26.57°, or just θ when φ rounds to 0.
    const shift = (deg: number) => {
      const s = f(Math.abs(deg));
      if (s === '0.00') return '';
      return `${deg < 0 ? '-' : '+'}${s}^\\circ`;
    };
    ctx.readout(() =>
      zero()
        ? '$a$、$b$ 都是 $0$ 時，兩個波都是 $0$。'
        : `$r=\\sqrt{a^2+b^2}=${f(r())}$，$\\cos\\varphi=\\dfrac{a}{r}=${f(a() / r())}$，$\\sin\\varphi=\\dfrac{b}{r}=${f(b() / r())}$，$\\varphi=${f(toDegrees(phi()))}^\\circ$`,
    );
    ctx.readout(() =>
      zero()
        ? ''
        : `$a\\sin\\theta+b\\cos\\theta=${f(r())}\\sin(\\theta${shift(toDegrees(phi()))})$，最大值 $${f(r())}$、最小值 $${f(-r())}$`,
    );
  },
} satisfies GraphDef;

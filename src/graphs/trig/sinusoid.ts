import { piTicks, snap } from '../helpers';
import type { GraphDef } from '../types';

const step = 0.1;
const num = (v: number) => String(+v.toFixed(2));
const eps = 1e-9;
// The curve is drawn right of the sliders only.
const [xmin, xmax] = [-1.6, 7.4];

export default {
  title: '振幅、週期、相位與中線',
  description:
    '拖動滑桿改變 A、B、C、D，實線是 y = A sin(Bx + C) + D，虛線是原來的 y = sin x，水平虛線是中線 y = D。A 改變振幅（|A|，A 為負時上下翻轉），B 改變週期 2π/B，C 讓圖形左右平移 C/B，D 讓圖形上下平移。圖上標出一個最高點，下方顯示振幅、週期、相位移、中線與最大最小值。',
  boundingBox: [-4.5, 4.5, 7.5, -4.5],
  axis: false,
  build(board, ctx) {
    const { color } = ctx;
    const slider = (y: number, name: string, min: number, start: number, max: number) =>
      board.create('slider', [[-4.2, y], [-2.3, y], [min, start, max]], { name, snapWidth: step, digits: 1 });
    // Start away from y = sin x in every parameter, so each one's effect is visible.
    const sa = slider(4, 'A', -3, 2, 3);
    const sb = slider(3.3, 'B', 0.5, 2, 3);
    const sc = slider(2.6, 'C', -3, 1, 3);
    const sd = slider(1.9, 'D', -1, 0.5, 1);
    const A = () => snap(sa.Value(), step);
    const B = () => snap(sb.Value(), step);
    const C = () => snap(sc.Value(), step);
    const D = () => snap(sd.Value(), step);

    const thin = { fixed: true, strokeColor: color.muted, strokeWidth: 1, highlight: false };
    board.create('arrow', [[xmin, 0], [xmax, 0]], thin);
    board.create('arrow', [[0, -4.3], [0, 4.3]], thin);
    for (const y of [-4, -3, -2, -1, 1, 2, 3, 4]) {
      board.create('segment', [[-0.06, y], [0.06, y]], thin);
      board.create('text', [-0.12, y, String(y)], { anchorX: 'right', anchorY: 'middle', fixed: true, fontSize: 11, strokeColor: color.muted });
    }
    piTicks(board, ctx, { y: 0, from: -1, to: 4 });

    const f = (x: number) => A() * Math.sin(B() * x + C()) + D();
    board.create('functiongraph', [Math.sin, xmin, xmax], { strokeColor: color.muted, strokeWidth: 2, dash: 2, fixed: true, highlight: false });
    board.create('segment', [[xmin, () => D()], [xmax, () => D()]], { strokeColor: color.accent2, strokeWidth: 1.5, dash: 3, fixed: true, highlight: false });
    board.create('functiongraph', [f, xmin, xmax], { strokeColor: color.accent, strokeWidth: 3, fixed: true, highlight: false });

    // The first maximum at or right of x = 0: Bx + C = π/2 (A > 0) or 3π/2 (A < 0), plus whole periods.
    const peakX = () => {
      const target = A() >= 0 ? Math.PI / 2 : (3 * Math.PI) / 2;
      const period = (2 * Math.PI) / B();
      let x = (target - C()) / B();
      x -= Math.floor(x / period + eps) * period;
      return x;
    };
    board.create('point', [peakX, () => D() + Math.abs(A())], {
      fixed: true,
      name: '最高點',
      size: 4,
      strokeColor: color.accent,
      fillColor: color.accent,
      label: { offset: [6, 10], strokeColor: color.accent },
      visible: () => Math.abs(A()) > eps,
    });

    ctx.legend([
      { label: '$y=\\sin x$', color: color.muted, dash: true },
      { label: '$y=A\\sin(Bx+C)+D$', color: color.accent, width: 3 },
      { label: '中線 $y=D$', color: color.accent2, dash: true, width: 1.5 },
    ]);

    const signed = (v: number) => (Math.abs(v) < eps ? '' : v > 0 ? `+${num(v)}` : `-${num(-v)}`);
    const coef = (v: number) => (Math.abs(v - 1) < eps ? '' : Math.abs(v + 1) < eps ? '-' : num(v));
    ctx.readout(() => (Math.abs(A()) < eps ? `$y=${num(D())}$（$A=0$，只剩中線）` : `$y=${coef(A())}\\sin(${coef(B())}x${signed(C())})${signed(D())}$`));
    ctx.readout(() => `振幅 $|A|=${num(Math.abs(A()))}$，週期 $\\dfrac{2\\pi}{B}=${num((2 * Math.PI) / B())}$，中線 $y=${num(D())}$`);
    ctx.readout(() => {
      const shift = C() / B();
      const where = Math.abs(shift) < eps ? '不平移' : `向${shift > 0 ? '左' : '右'}平移 $\\dfrac{|C|}{B}=${num(Math.abs(shift))}$`;
      return `相位：${where}；最大值 $${num(D() + Math.abs(A()))}$，最小值 $${num(D() - Math.abs(A()))}$`;
    });
  },
} satisfies GraphDef;

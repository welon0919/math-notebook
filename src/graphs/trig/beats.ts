import { snap } from '../helpers';
import type { GraphDef } from '../types';

const step = 0.1;
const num = (v: number) => String(+v.toFixed(2));
const [x0, x1] = [0, 4 * Math.PI];

export default {
  title: '和差化積：兩個波相加產生拍',
  description:
    '用滑桿改變 p、q。實線是 y = sin px + sin qx，虛線是 y = ±2 cos((p − q)x/2)。由和差化積，sin px + sin qx = 2 sin((p + q)x/2) cos((p − q)x/2)：快速振動的 sin((p + q)x/2) 被慢慢變化的 2 cos((p − q)x/2) 包住，所以 p、q 接近時，相加的波忽大忽小，稱為拍。下方顯示包絡線每隔多遠變小一次。',
  boundingBox: [-0.3, 3.6, 12.9, -2.6],
  aspect: 2.1,
  axis: false,
  build(board, ctx) {
    const { color } = ctx;
    const slider = (x: number, name: string, start: number) =>
      board.create('slider', [[x, 3.1], [x + 3.4, 3.1], [4, start, 12]], { name, snapWidth: step, digits: 1 });
    const sp = slider(0.3, 'p', 10);
    const sq = slider(6.3, 'q', 11);
    const p = () => snap(sp.Value(), step);
    const q = () => snap(sq.Value(), step);

    const thin = { fixed: true, strokeColor: color.muted, strokeWidth: 1, highlight: false };
    board.create('arrow', [[x0, 0], [x1 + 0.3, 0]], thin);
    board.create('segment', [[x0, -2.3], [x0, 2.3]], thin);
    for (const y of [-2, 2]) {
      board.create('segment', [[-0.08, y], [0.08, y]], thin);
      board.create('text', [-0.12, y, String(y)], { anchorX: 'right', anchorY: 'middle', fixed: true, fontSize: 11, strokeColor: color.muted });
    }

    const half = () => (p() - q()) / 2;
    for (const s of [1, -1]) {
      board.create('functiongraph', [(x: number) => s * 2 * Math.cos(half() * x), x0, x1], {
        fixed: true,
        strokeColor: color.accent2,
        strokeWidth: 1.5,
        dash: 2,
        highlight: false,
      });
    }
    board.create('functiongraph', [(x: number) => Math.sin(p() * x) + Math.sin(q() * x), x0, x1], {
      fixed: true,
      strokeColor: color.accent,
      strokeWidth: 2,
      highlight: false,
      numberPointsHigh: 1600,
    });

    ctx.legend([
      { label: '$y=\\sin px+\\sin qx$', color: color.accent, width: 2 },
      { label: '包絡線 $y=\\pm2\\cos\\dfrac{(p-q)x}{2}$', color: color.accent2, dash: true, width: 1.5 },
    ]);
    ctx.readout(() => `$\\sin ${num(p())}x+\\sin ${num(q())}x=2\\sin ${num((p() + q()) / 2)}x\\,\\cos ${num(Math.abs(half()))}x$`);
    ctx.readout(() => {
      const d = Math.abs(p() - q());
      if (d < 1e-9) return '$p=q$：兩個波完全相同，相加只是振幅變成 $2$，沒有拍。';
      return `包絡線 $|2\\cos ${num(Math.abs(half()))}x|$ 每隔 $\\dfrac{2\\pi}{|p-q|}=${num((2 * Math.PI) / d)}$ 變小一次；$p$、$q$ 越接近，拍越慢。`;
    });
  },
} satisfies GraphDef;

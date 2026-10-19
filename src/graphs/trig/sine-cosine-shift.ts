import { piTicks } from '../helpers';
import type { GraphDef } from '../types';

const moves = [
  {
    button: 'y = sin(x + π/2)',
    latex: '\\sin\\left(x+\\frac{\\pi}{2}\\right)',
    c: Math.PI / 2,
    done: '向左平移 $\\frac{\\pi}{2}$ 之後和 $y=\\cos x$ 完全重合，所以 $\\cos x=\\sin\\left(x+\\frac{\\pi}{2}\\right)$。',
  },
  {
    button: 'y = sin(x − π/2)',
    latex: '\\sin\\left(x-\\frac{\\pi}{2}\\right)',
    c: -Math.PI / 2,
    done: '向右平移 $\\frac{\\pi}{2}$ 之後，正好是 $y=\\cos x$ 上下翻轉，所以 $\\sin\\left(x-\\frac{\\pi}{2}\\right)=-\\cos x$。',
  },
];

/** c as a multiple of π, e.g. `\frac{\pi}{2}`, `-0.25\pi`, `0`. */
function piText(c: number): string {
  const k = Math.round((c / Math.PI) * 100) / 100;
  if (k === 0) return '0';
  if (Math.abs(k) === 0.5) return `${k < 0 ? '-' : ''}\\frac{\\pi}{2}`;
  if (Math.abs(k) === 1) return `${k < 0 ? '-' : ''}\\pi`;
  return `${k}\\pi`;
}

export default {
  title: '正弦曲線平移成餘弦曲線',
  description:
    '虛線是 y = sin x，另一條實線是 y = cos x。上方「平移」一列選擇 y = sin(x + π/2)（向左移 π/2）或 y = sin(x − π/2)（向右移 π/2）。按「播放」，正弦曲線的複本從 y = sin x 慢慢平移過去；按「倒轉」移回來。正弦曲線的最高點從 (π/2, 1) 移動的位置也標出來。向左移 π/2 後和 y = cos x 完全重合；向右移 π/2 後是 y = −cos x。',
  boundingBox: [-2.2, 1.92, 7.4, -1.92],
  aspect: 2.5,
  axis: false,
  build(board, ctx) {
    const { color } = ctx;
    let move = 0;
    // How far the shift has played: 0 is y = sin x, 1 is the chosen shift.
    let t = 0;
    const c = () => moves[move].c * t;

    const thin = { fixed: true, strokeColor: color.muted, strokeWidth: 1, highlight: false };
    board.create('segment', [[-2.1, 0], [7.3, 0]], thin);
    board.create('segment', [[0, -1.6], [0, 1.6]], thin);
    for (const y of [1, -1]) {
      board.create('segment', [[-0.06, y], [0.06, y]], thin);
      board.create('text', [-0.12, y, String(y)], { anchorX: 'right', anchorY: 'middle', fixed: true, fontSize: 12, strokeColor: color.muted });
    }
    piTicks(board, ctx, { y: 0, from: -1, to: 4 });

    board.create('functiongraph', [Math.sin, -2.1, 7.3], { strokeColor: color.muted, strokeWidth: 2, dash: 2, fixed: true, highlight: false });
    board.create('functiongraph', [Math.cos, -2.1, 7.3], { strokeColor: color.accent2, strokeWidth: 3, fixed: true, highlight: false });
    board.create('functiongraph', [(x: number) => Math.sin(x + c()), -2.1, 7.3], { strokeColor: color.accent, strokeWidth: 3, fixed: true, highlight: false });

    // The peak (π/2, 1) of y = sin x moves to (π/2 − c, 1).
    board.create('point', [Math.PI / 2, 1], { fixed: true, withLabel: false, size: 3, strokeColor: color.muted, fillColor: color.muted });
    board.create('arrow', [[Math.PI / 2, 1.25], [() => Math.PI / 2 - c(), 1.25]], {
      strokeColor: color.accent,
      strokeWidth: 1.5,
      fixed: true,
      highlight: false,
      visible: () => Math.abs(c()) > 0.05,
    });
    board.create('point', [() => Math.PI / 2 - c(), 1], { fixed: true, withLabel: false, size: 4, strokeColor: color.accent, fillColor: color.accent });

    ctx.legend([
      { label: '$y=\\sin x$', color: color.muted, dash: true },
      { label: '$y=\\cos x$', color: color.accent2, width: 3 },
      { label: '平移中的正弦曲線', color: color.accent, width: 3 },
    ]);

    moves.forEach((m, i) =>
      ctx.button(
        m.button,
        () => {
          move = i;
          t = 0;
          board.update();
        },
        { row: '平移', pressed: () => move === i },
      ),
    );
    const playTo = (target: 0 | 1) => {
      const from = t;
      ctx.animate(1600 * Math.abs(target - from), (p) => {
        t = from + (target - from) * p;
      });
    };
    ctx.button('▶ 播放', () => playTo(1));
    ctx.button('◀ 倒轉', () => playTo(0));

    ctx.readout(() => {
      const shift = c();
      const inner = Math.abs(shift) < 1e-9 ? 'x' : `x${shift > 0 ? '+' : '-'}${piText(Math.abs(shift))}`;
      return `目前 $y=\\sin(${inner})$，最高點從 $\\left(\\frac{\\pi}{2},1\\right)$ 移到 $\\left(${piText(Math.PI / 2 - shift)},1\\right)$`;
    });
    ctx.readout(() => (t > 0.999 ? moves[move].done : `按「播放」把 $y=\\sin x$ 平移成 $y=${moves[move].latex}$。`));
  },
} satisfies GraphDef;

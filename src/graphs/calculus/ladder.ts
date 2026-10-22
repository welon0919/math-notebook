import { keepInside, snap } from '../helpers';
import type { GraphDef } from '../types';

const L = 5;
const v = 0.8;
const step = 0.1;
const num = (x: number) => String(+x.toFixed(2));

export default {
  title: '滑落的梯子',
  description:
    '一把 5 公尺長的梯子靠在牆上，梯腳 B 在地面上離牆 x 公尺，梯頂 T 在牆上離地 y 公尺，x² + y² = 25。左右拖動梯腳 B。假設梯腳以每秒 0.8 公尺離開牆，B 旁的箭頭表示這個固定的速度，T 旁的箭頭表示梯頂往下滑的速度 0.8x/y，長度依同樣的比例畫出（太長時畫到地面為止）。x 越大、y 越小，梯頂滑得越快；x = 3 時 y = 4，梯頂每秒下滑 0.6 公尺。',
  boundingBox: [-1.2, 6, 6.2, -1.1],
  aspect: 7.4 / 7.1,
  axis: false,
  build(board, ctx) {
    const { color } = ctx;
    const fixed = { fixed: true, highlight: false };
    board.create('segment', [[0, 0], [5.8, 0]], { ...fixed, strokeColor: color.ink, strokeWidth: 2 });
    board.create('segment', [[0, 0], [0, 5.6]], { ...fixed, strokeColor: color.ink, strokeWidth: 2 });
    for (let i = 0; i < 12; i++) {
      board.create('segment', [[0, 0.45 * i + 0.3], [-0.25, 0.45 * i + 0.05]], { ...fixed, strokeColor: color.muted, strokeWidth: 1 });
    }

    const B = board.create('point', [3, 0], { name: 'B', strokeColor: color.accent, fillColor: color.accent, label: { offset: [-4, -16] } });
    keepInside(B, [0.6, 0, 4.9, 0]);
    B.on('drag', () => B.moveTo([snap(B.X(), step), 0]));
    const x = () => snap(B.X(), step);
    const y = () => Math.sqrt(L * L - x() * x());
    const dy = () => (-x() * v) / y();
    const T = board.create('point', [0, y], { ...fixed, name: 'T', size: 4, strokeColor: color.accent, fillColor: color.accent, label: { offset: [10, 10] } });
    board.create('segment', [T, B], { ...fixed, strokeColor: color.accent, strokeWidth: 5 });

    // Velocity arrows on the same scale: 1 m/s is drawn 1.25 units long (the top's arrow stops at the ground).
    const k = 1.25;
    board.create('arrow', [[x, 0.35], [() => x() + k * v, 0.35]], { ...fixed, strokeColor: color.accent2, strokeWidth: 3 });
    board.create('arrow', [[0.35, y], [0.35, () => Math.max(y() + k * dy(), 0)]], { ...fixed, strokeColor: color.highlight, strokeWidth: 3 });
    board.create('text', [() => x() / 2, -0.15, ctx.tex('x')], { ...fixed, anchorX: 'middle', anchorY: 'top', fontSize: 14 });
    board.create('text', [-0.35, () => y() / 2, ctx.tex('y')], { ...fixed, anchorX: 'right', anchorY: 'middle', fontSize: 14 });
    board.create('text', [() => x() / 2 + 0.15, () => y() / 2 + 0.15, ctx.tex('5')], { ...fixed, anchorX: 'left', anchorY: 'bottom', fontSize: 14 });

    ctx.legend([
      { label: '梯腳的速度 $\\frac{dx}{dt}=0.8$', color: color.accent2, width: 3 },
      { label: '梯頂的速度 $\\frac{dy}{dt}$', color: color.highlight, width: 3 },
    ]);
    ctx.readout(() => `$x=${num(x())}$，$y=\\sqrt{25-x^2}=${num(y())}$`);
    ctx.readout(() => `$\\dfrac{dy}{dt}=-\\dfrac{x}{y}\\cdot\\dfrac{dx}{dt}=${num(dy())}$ 公尺／秒`);
  },
} satisfies GraphDef;

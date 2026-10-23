import type { GraphDef } from '../types';

// Inflection at x = 1: concave down to the left, up to the right.
const f = (x: number) => x ** 3 - 3 * x * x + 1;
const df = (x: number) => 3 * x * x - 6 * x;
const d2f = (x: number) => 6 * x - 6;
const [lo, hi] = [-0.9, 2.9];
const num = (v: number) => String(+v.toFixed(2));

export default {
  title: '凹向上與凹向下',
  description:
    '曲線 y = x³ − 3x² + 1，x < 1 的部分凹向下（一種顏色），x > 1 的部分凹向上（另一種顏色），兩段在反曲點 (1, −1) 相接。沿著曲線拖動點 P，畫出 P 的切線：在凹向下的部分，切線在曲線上方；在凹向上的部分，切線在曲線下方；在反曲點，切線穿過曲線。下方顯示 f′′(x) = 6x − 6 的正負號。',
  boundingBox: [-1.5, 2.2, 3.5, -3.9],
  aspect: 5 / 6.1,
  build(board, ctx) {
    const { color } = ctx;
    board.create('functiongraph', [f, -1.5, 1], { fixed: true, strokeColor: color.accent, strokeWidth: 3 });
    board.create('functiongraph', [f, 1, 3.5], { fixed: true, strokeColor: color.accent2, strokeWidth: 3 });
    board.create('point', [1, -1], { fixed: true, name: ctx.tex('(1,-1)'), size: 4, strokeColor: color.ink, fillColor: color.ink, label: { offset: [10, 4], fontSize: 13 } });

    // P moves along the whole curve; the hidden full graph is what it glides on.
    const track = board.create('functiongraph', [f, -1.5, 3.5], { visible: false, fixed: true });
    const P = board.create('glider', [0.2, f(0.2), track], { name: 'P', label: { offset: [-16, 12] } });
    P.on('drag', () => {
      const x = Math.min(hi, Math.max(lo, P.X()));
      if (x !== P.X()) P.moveTo([x, f(x)]);
    });
    const x = () => P.X();
    board.create('line', [() => [df(x()) * x() - f(x()), -df(x()), 1]], { fixed: true, strokeColor: color.highlight, strokeWidth: 2 });

    ctx.legend([
      { label: '凹向下（$x<1$）', color: color.accent, width: 3 },
      { label: '凹向上（$x>1$）', color: color.accent2, width: 3 },
      { label: '$P$ 點的切線', color: color.highlight, width: 2 },
    ]);
    ctx.readout(() => {
      const s = d2f(x());
      if (Math.abs(s) < 0.03) return `$x=${num(x())}$：$f''(x)=0$，這裡是反曲點，切線穿過曲線。`;
      return s < 0
        ? `$x=${num(x())}$：$f''(x)=${num(s)}<0$，凹向下，切線在曲線上方。`
        : `$x=${num(x())}$：$f''(x)=${num(s)}>0$，凹向上，切線在曲線下方。`;
    });
  },
} satisfies GraphDef;

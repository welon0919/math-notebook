import { snap } from '../helpers';
import type { GraphDef } from '../types';

const step = 0.05;
// Same critical points (x = ±1) as the lesson's example x³ − 3x, scaled to fit.
const f = (x: number) => x ** 3 / 3 - x;
const df = (x: number) => x * x - 1;

export default {
  title: '割線變成切線',
  description:
    'y = f(x) = x³/3 − x 上的點 P 和 Q 相距 h，連成割線。用滑桿把 h 縮小到接近 0，割線就越來越接近 P 點的切線（黃色虛線），斜率趨近 f′(x)。拖動 P 沿曲線移動，看切線斜率怎麼變。',
  boundingBox: [-4, 5, 4, -1],
  build(board, ctx) {
    const { color } = ctx;
    const sh = board.create('slider', [[-3.6, 4.4], [-1.2, 4.4], [-2, 1.5, 2]], { name: 'h', snapWidth: step, digits: 2 });
    const h = () => snap(sh.Value(), step);
    const zero = () => Math.abs(h()) < 1e-9;

    const curve = board.create('functiongraph', [f], { strokeColor: color.accent });
    board.create('text', [2.3, 1.5, ctx.tex('y=f(x)')], { fixed: true, anchorX: 'left', strokeColor: color.accent, fontSize: 13 });

    const P = board.create('glider', [-1.8, f(-1.8), curve], { name: 'P', label: { offset: [-16, 8] } });
    const x = () => P.X();
    board.create('point', [() => x() + h(), () => f(x() + h())], { name: 'Q', fixed: true, size: 4, strokeColor: color.accent2, fillColor: color.accent2, label: { offset: [6, 8] } });
    const secant = () => (zero() ? NaN : (f(x() + h()) - f(x())) / h());

    // Lines through P with the secant slope and the tangent slope; NaN hides the secant at h = 0.
    board.create('line', [() => [secant() * x() - f(x()), -secant(), 1]], { strokeColor: color.accent2, strokeWidth: 2 });
    board.create('line', [() => [df(x()) * x() - f(x()), -df(x()), 1]], { strokeColor: color.highlight, strokeWidth: 2, dash: 3 });

    // Legend under the slider (the curve passes through the top right): which line is which.
    const legend = (y: number, text: string, attrs: object) => {
      board.create('segment', [[-3.6, y], [-3.0, y]], { fixed: true, ...attrs });
      board.create('text', [-2.85, y, text], { fixed: true, anchorX: 'left', anchorY: 'middle', fontSize: 13 });
    };
    legend(3.7, '割線 PQ', { strokeColor: color.accent2, strokeWidth: 2 });
    legend(3.2, 'P 點的切線', { strokeColor: color.highlight, strokeWidth: 2, dash: 3 });

    const fm = ctx.fmt;
    ctx.readout(() =>
      zero()
        ? '$h=0$ 時 $P$、$Q$ 重合，割線沒有定義；讓 $h$ 趨近 $0$ 而不等於 $0$。'
        : `割線斜率 $\\dfrac{f(x+h)-f(x)}{h}=${fm(secant())}$`,
    );
    ctx.readout(() => {
      const d = df(x());
      const trend = Math.abs(d) < 0.005 ? '切線水平，可能是極值' : d > 0 ? '$f$ 在這裡遞增' : '$f$ 在這裡遞減';
      return `$x=${fm(x())}$，切線（黃色虛線）斜率 $f'(x)=${fm(d)}$，${trend}`;
    });
  },
} satisfies GraphDef;

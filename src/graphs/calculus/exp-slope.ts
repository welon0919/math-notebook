import { snap } from '../helpers';
import type { GraphDef } from '../types';

const step = 0.1;
const [lo, hi] = [-2.5, 1.2];
const num = (v: number) => String(+v.toFixed(3));

export default {
  title: 'y = aˣ 的斜率和高度成正比',
  description:
    '藍色曲線是 y = aˣ，用滑桿改變底數 a（從 1.5 到 4，接近 e ≈ 2.718 時會吸附到 e）。沿著曲線拖動點 P，另一條直線是 P 點的切線。下方顯示 P 的高度 aˣ、切線斜率，以及斜率除以高度。不論 P 在哪裡，這個比值都一樣，只和 a 有關：a = 2 時約 0.693，a = 3 時約 1.099；a = e 時剛好是 1，斜率等於高度。',
  boundingBox: [-3, 5.5, 2.5, -0.8],
  aspect: 5.5 / 6.3,
  build(board, ctx) {
    const { color } = ctx;
    const sa = board.create('slider', [[-2.8, 5.0], [-0.9, 5.0], [1.5, 2, 4]], { name: 'a', snapWidth: step, withLabel: false });
    board.create('text', [-2.8, 4.8, ctx.tex('a')], { fixed: true, anchorX: 'left', anchorY: 'top', fontSize: 13, strokeColor: color.ink });
    // Steps of 0.1, but 2.7 (the step nearest e) means e itself; the readout shows which.
    const a = () => {
      const v = sa.Value();
      return Math.abs(v - Math.E) < 0.05 ? Math.E : snap(v, step);
    };
    const f = (x: number) => a() ** x;
    const slope = (x: number) => f(x) * Math.log(a());

    const curve = board.create('functiongraph', [f, -3, 2.5], { fixed: true, strokeColor: color.accent, strokeWidth: 3 });
    const P = board.create('glider', [0.5, f(0.5), curve], { name: 'P', label: { offset: [-18, 10] } });
    P.on('drag', () => {
      const x = Math.min(hi, Math.max(lo, P.X()));
      if (x !== P.X()) P.moveTo([x, f(x)]);
    });
    // After the slider moves, keep P on the new curve at the same x.
    sa.on('drag', () => P.moveTo([P.X(), f(P.X())]));
    const x = () => P.X();
    board.create('line', [() => [slope(x()) * x() - f(x()), -slope(x()), 1]], { fixed: true, strokeColor: color.highlight, strokeWidth: 2 });
    board.create('segment', [P, [x, () => 0]], { fixed: true, strokeColor: color.accent2, strokeWidth: 3 });

    ctx.legend([
      { label: '$y=a^x$', color: color.accent, width: 3 },
      { label: '切線', color: color.highlight, width: 2 },
      { label: '高度 $a^x$', color: color.accent2, width: 3 },
    ]);
    const aTex = () => (a() === Math.E ? 'e' : num(a()));
    ctx.readout(() => `$a=${aTex()}$，$P$ 的高度 $${num(f(x()))}$，切線斜率 $${num(slope(x()))}$`);
    ctx.readout(() =>
      a() === Math.E
        ? '斜率 $\\div$ 高度 $=1$：底數是 $e$ 時，每一點的斜率都等於高度，$(e^x)\'=e^x$。'
        : `斜率 $\\div$ 高度 $=${num(Math.log(a()))}$，拖動 $P$ 也不會變。把 $a$ 拉到 $e\\approx2.718$ 看看。`,
    );
  },
} satisfies GraphDef;

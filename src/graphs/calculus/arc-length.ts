import type { GraphDef } from '../types';

const f = (x: number) => (2 / 3) * x ** 1.5;
const [a, b] = [0, 3];
const exact = 14 / 3;
const num = (v: number) => String(+v.toFixed(4));

/** Length of the broken line through n + 1 equally spaced points on the curve. */
function polygon(n: number): number {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    const [x0, x1] = [a + ((b - a) * (i - 1)) / n, a + ((b - a) * i) / n];
    total += Math.hypot(x1 - x0, f(x1) - f(x0));
  }
  return total;
}

export default {
  title: '弧長：用折線逼近曲線',
  description:
    '曲線 y = (2/3)x^(3/2) 從 (0, 0) 到 (3, 2√3)。把 [0, 3] 切成 n 段，曲線上的分點連成折線。用滑桿增加 n，折線越來越貼近曲線，折線的總長從下方逼近曲線的長度 14/3 ≈ 4.6667。',
  boundingBox: [-0.4, 4.1, 3.5, -0.9],
  aspect: 3.9 / 5,
  build(board, ctx) {
    const { color } = ctx;
    const sn = board.create('slider', [[0.3, -0.55], [2.4, -0.55], [1, 2, 12]], { name: 'n', snapWidth: 1, digits: 0 });
    const n = () => Math.round(sn.Value());

    board.create('functiongraph', [f, a, b], { fixed: true, strokeColor: color.accent, strokeWidth: 3 });
    const broken = board.create('curve', [[0], [0]], { fixed: true, strokeColor: color.accent2, strokeWidth: 2 });
    broken.updateDataArray = function () {
      const xs = Array.from({ length: n() + 1 }, (_, i) => a + ((b - a) * i) / n());
      this.dataX = xs;
      this.dataY = xs.map(f);
    };
    for (let i = 0; i <= 12; i++) {
      const xi = () => a + ((b - a) * i) / n();
      board.create('point', [xi, () => f(xi())], {
        fixed: true,
        withLabel: false,
        size: 3,
        strokeColor: color.accent2,
        fillColor: color.accent2,
        visible: () => i <= n(),
      });
    }

    ctx.legend([
      { label: '$y=\\frac23x^{3/2}$', color: color.accent, width: 3 },
      { label: '折線', color: color.accent2, width: 2 },
    ]);
    ctx.readout(() => `$n=${n()}$：折線長 $${num(polygon(n()))}$`);
    ctx.readout(() => `曲線的長度 $L=\\displaystyle\\int_0^3\\sqrt{1+x}\\,dx=\\frac{14}{3}\\approx${num(exact)}$`);
  },
} satisfies GraphDef;

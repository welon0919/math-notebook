import { snap } from '../helpers';
import type { GraphDef } from '../types';

const step = 0.1;
const num = (v: number) => String(+v.toFixed(2));

export default {
  title: '反導函數族 y = x² + C',
  description:
    '淡色的曲線是 C = −3, −2, …, 3 時的 y = x² + C，彼此只差上下平移。用滑桿改變 C，選中的那一條加粗。鉛直虛線 x = 1 和每條曲線相交的地方，切線斜率都是 2：它們的導數都是 2x，所以都是 2x 的反導函數。標出的點 (1, 3) 是初始條件，只有 C = 2 的那一條通過它。',
  boundingBox: [-3, 6.5, 3, -5.3],
  aspect: 0.75,
  build(board, ctx) {
    const { color } = ctx;
    const sc = board.create('slider', [[-2.5, -4.6], [0.5, -4.6], [-3, 0, 3]], { name: 'C', snapWidth: step, digits: 1 });
    const C = () => snap(sc.Value(), step);

    for (let c = -3; c <= 3; c++) {
      board.create('functiongraph', [(x: number) => x * x + c, -3, 3], { fixed: true, strokeColor: color.muted, strokeWidth: 1, strokeOpacity: 0.6 });
    }
    board.create('functiongraph', [(x: number) => x * x + C(), -3, 3], { fixed: true, strokeColor: color.accent, strokeWidth: 3 });
    board.create('line', [[1, 0], [1, 1]], { fixed: true, strokeColor: color.muted, strokeWidth: 1, dash: 2 });
    // Tangent at x = 1 on the chosen curve: slope 2 whatever C is.
    board.create('segment', [[0.4, () => 1 + C() - 1.2], [1.6, () => 1 + C() + 1.2]], { fixed: true, strokeColor: color.highlight, strokeWidth: 2 });
    board.create('point', [1, () => 1 + C()], { fixed: true, withLabel: false, size: 3, strokeColor: color.accent, fillColor: color.accent });
    board.create('point', [1, 3], {
      fixed: true,
      name: ctx.tex('(1,3)'),
      size: 5,
      strokeColor: color.accent2,
      fillColor: color.bg,
      strokeWidth: 2,
      label: { offset: [10, -10], fontSize: 13 },
    });

    ctx.legend([
      { label: '$y=x^2+C$', color: color.accent, width: 3 },
      { label: '在 $x=1$ 的切線（斜率 $2$）', color: color.highlight, width: 2 },
    ]);
    const curve = () => (C() === 0 ? 'y=x^2' : `y=x^2${C() < 0 ? '' : '+'}${num(C())}`);
    ctx.readout(() => `$C=${num(C())}$：$${curve()}$，在 $x=1$ 的切線斜率 $2$`);
    ctx.readout(() =>
      Math.abs(C() - 2) < 1e-9 ? '這一條通過 $(1,3)$：初始條件 $f(1)=3$ 決定了 $C=2$。' : '拉動 $C$，找出通過 $(1,3)$ 的那一條。',
    );
  },
} satisfies GraphDef;

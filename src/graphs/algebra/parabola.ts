import type { GraphDef } from '../types';

// Slider values snap to 0.1; round them so b^2-4ac is computed from the values shown.
const step = 0.1;
const snap = (v: number) => Math.round(v / step) * step;
// D is computed from numbers with one decimal place, so anything this small is rounding error.
const eps = 1e-9;

export default {
  title: '拋物線與判別式',
  description:
    '拖動滑桿改變 a、b、c，觀察拋物線 y = ax² + bx + c 與 x 軸的交點數量如何隨判別式 D = b² − 4ac 改變：D > 0 有兩個交點，D = 0 剛好碰到一點，D < 0 不相交。',
  boundingBox: [-6, 6.5, 6, -2.5],
  build(board, ctx) {
    const slider = (y: number, name: string, min: number, start: number, max: number) =>
      board.create('slider', [[-5.4, y], [-0.6, y], [min, start, max]], { name, snapWidth: step, digits: 1 });
    const sa = slider(5.7, 'a', -2, 1, 2);
    const sb = slider(4.9, 'b', -5, -1, 5);
    const sc = slider(4.1, 'c', -5, -2, 5);
    const a = () => snap(sa.Value());
    const b = () => snap(sb.Value());
    const c = () => snap(sc.Value());

    const disc = () => {
      const d = b() * b() - 4 * a() * c();
      return Math.abs(d) < eps ? 0 : d;
    };
    // Real roots in increasing order; empty when a = 0 (not quadratic) or D < 0.
    const roots = (): number[] => {
      const d = disc();
      if (Math.abs(a()) < eps || d < 0) return [];
      const r = Math.sqrt(d);
      const x1 = (-b() - r) / (2 * a());
      const x2 = (-b() + r) / (2 * a());
      return d === 0 ? [x1] : [Math.min(x1, x2), Math.max(x1, x2)];
    };

    board.create('functiongraph', [(x: number) => a() * x * x + b() * x + c()], {
      strokeColor: ctx.color.accent,
      strokeWidth: 3,
    });
    // A NaN coordinate hides the point, so roots that don't exist simply aren't drawn.
    for (const i of [0, 1]) {
      board.create('point', [() => roots()[i] ?? NaN, 0], {
        fixed: true,
        withLabel: false,
        size: 5,
        strokeColor: ctx.color.accent2,
        fillColor: ctx.color.accent2,
      });
    }

    ctx.readout(() => (Math.abs(a()) < eps ? '$a=0$ 時不是二次方程式' : `$D=b^2-4ac=${ctx.fmt(disc())}$`));
    ctx.readout(() => {
      if (Math.abs(a()) < eps) return '圖形變成直線 $y=bx+c$。';
      const d = disc();
      const xs = roots().map((x) => `$x=${ctx.fmt(x)}$`);
      if (d > 0) return `$D>0$：兩個相異實根 ${xs.join('、')}，拋物線和 $x$ 軸交於兩點。`;
      if (d === 0) return `$D=0$：一個重根 ${xs[0]}，拋物線剛好碰到 $x$ 軸。`;
      return '$D<0$：沒有實根，拋物線和 $x$ 軸不相交。';
    });
  },
} satisfies GraphDef;

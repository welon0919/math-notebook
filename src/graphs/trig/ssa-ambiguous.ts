import { snap } from '../helpers';
import type { GraphDef } from '../types';

const step = 0.1;
const num = (v: number) => String(+v.toFixed(2));
const deg = (rad: number) => num((rad * 180) / Math.PI);
// Side b = AC is fixed; A and a are on sliders.
const b = 4;
// Within this distance of a special length (the height, or b), a lands exactly on it.
const magnet = 0.08;

export default {
  title: '兩邊及一邊的對角：一解、兩解或無解',
  description:
    '已知 ∠A、邊 b = AC = 4 和 ∠A 的對邊 a = BC，求三角形。用滑桿改變 ∠A 和 a。以 C 為圓心、a 為半徑畫圓，圓和 ∠A 的另一邊（水平射線）的交點就是可能的頂點 B：沒有交點時無解；相切時一解（直角三角形）；交於兩點時兩解，兩個三角形分別塗上兩種顏色；a ≥ b 時只有一個交點在射線上，一解。虛線是 C 到射線的高 b sin A。a 接近高或接近 b 時會自動對齊。',
  boundingBox: [-0.8, 4.6, 9.2, -1.4],
  aspect: 10 / 6,
  axis: false,
  build(board, ctx) {
    const { color } = ctx;
    const sA = board.create('slider', [[0.2, -0.9], [2.8, -0.9], [20, 30, 80]], { name: '∠A', snapWidth: 1, digits: 0 });
    const sa = board.create('slider', [[5, -0.9], [7.6, -0.9], [1, 2.7, 6]], { name: 'a', snapWidth: step, digits: 1 });
    const A = () => (Math.round(sA.Value()) * Math.PI) / 180;
    const h = () => b * Math.sin(A());
    const a = () => {
      const v = snap(sa.Value(), step);
      if (Math.abs(v - h()) < magnet) return h();
      if (Math.abs(v - b) < magnet) return b;
      return v;
    };
    // Where the circle about C with radius a meets the line through A: x = b cos A ± √(a² − h²).
    const roots = (): number[] => {
      const d = a() * a() - h() * h();
      if (d < -1e-9) return [];
      const c = b * Math.cos(A());
      if (Math.abs(d) < 1e-9) return [c];
      const r = Math.sqrt(d);
      return [c - r, c + r].filter((x) => x > 1e-6);
    };

    const thin = { fixed: true, strokeColor: color.muted, strokeWidth: 1, highlight: false };
    board.create('arrow', [[0, 0], [9, 0]], { ...thin, strokeWidth: 1.5 });
    const Ap = board.create('point', [0, 0], { fixed: true, name: 'A', size: 3, strokeColor: color.ink, fillColor: color.ink, label: { offset: [-12, -10] } });
    const C = board.create('point', [() => b * Math.cos(A()), () => h()], { fixed: true, name: 'C', size: 3, strokeColor: color.ink, fillColor: color.ink, label: { offset: [-6, 12] } });
    board.create('segment', [Ap, C], { fixed: true, strokeColor: color.ink, strokeWidth: 2.5, highlight: false });
    board.create('text', [() => (b * Math.cos(A())) / 2 - 0.25, () => h() / 2 + 0.2, ctx.tex('b=4')], { fixed: true, anchorX: 'right', anchorY: 'middle', fontSize: 13 });
    const X = board.create('point', [1, 0], { visible: false, fixed: true });
    board.create('angle', [X, Ap, C], { radius: 0.7, name: ctx.tex('A'), fillOpacity: 0.12, strokeColor: color.muted, fillColor: color.muted });
    board.create('segment', [C, [() => b * Math.cos(A()), 0]], { ...thin, dash: 2 });
    board.create('circle', [C, () => a()], { fixed: true, strokeColor: color.muted, strokeWidth: 1.5, dash: 3, highlight: false });

    const triangle = (i: number, c: string, name: string) => {
      const x = () => roots()[i] ?? 0;
      const show = () => roots().length > i;
      const B = board.create('point', [x, 0], { fixed: true, name: ctx.tex(name), size: 4, strokeColor: c, fillColor: c, label: { offset: [-4, -16], strokeColor: c }, visible: show });
      board.create('polygon', [Ap, B, C], {
        fixed: true,
        fillColor: c,
        fillOpacity: 0.15,
        borders: { strokeColor: c, strokeWidth: 2 },
        vertices: { visible: false },
        visible: show,
      });
      board.create('segment', [C, B], { fixed: true, strokeColor: c, strokeWidth: 3, highlight: false, visible: show });
    };
    triangle(0, color.accent, 'B_1');
    triangle(1, color.accent2, 'B_2');

    ctx.legend([
      { label: '以 $C$ 為圓心、半徑 $a$ 的圓', color: color.muted, dash: true },
      { label: '高 $b\\sin A$', color: color.muted, dash: true, width: 1 },
    ]);
    ctx.readout(() => `$\\angle A=${deg(A())}^\\circ$，$b=4$，$a=${num(a())}$，高 $b\\sin A=${num(h())}$`);
    ctx.readout(() => {
      const n = roots().length;
      if (n === 0) return '$a<b\\sin A$：圓碰不到射線，無解。';
      if (a() >= b - 1e-9) return '$a\\ge b$：另一個交點落在 $A$ 或 $A$ 的左邊，不在射線上，一解。';
      if (n === 1) return '$a=b\\sin A$：圓和射線相切，一解，$\\angle B=90^\\circ$。';
      return '$b\\sin A<a<b$：圓和射線交於兩點，兩解。';
    });
    ctx.readout(() => {
      const xs = roots();
      if (xs.length === 0) return `$\\sin B=\\dfrac{b\\sin A}{a}=${num(h() / a())}>1$，沒有這樣的角。`;
      const B1 = Math.asin(Math.min(1, h() / a()));
      const parts = xs.map((x) => {
        const B = x < b * Math.cos(A()) - 1e-9 ? Math.PI - B1 : B1;
        return `$\\angle B=${deg(B)}^\\circ$，$\\angle C=${deg(Math.PI - A() - B)}^\\circ$`;
      });
      return `$\\sin B=\\dfrac{b\\sin A}{a}=${num(h() / a())}$：${parts.join('；或 ')}`;
    });
  },
} satisfies GraphDef;

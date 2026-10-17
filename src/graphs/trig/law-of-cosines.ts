import type JXG from 'jsxgraph';
import { angleAt, dist, keepInside, toDegrees } from '../helpers';
import type { GraphDef } from '../types';

const step = 0.1;
const b = 5;

export default {
  title: '餘弦定理：從頂點作高',
  description:
    '把 C 放在原點、CA 放在 x 軸上，A = (b, 0)、B = (a cos C, a sin C)。從 B 作 x 軸的垂線，垂足 H，得到 CH = a cos C、BH = a sin C；在直角三角形 ABH 中 c² = BH² + HA²，展開就是 c² = a² + b² − 2ab cos C。可以拖動頂點 B，包括 C 是鈍角的情形。',
  boundingBox: [-3.5, 6, 6.5, -1.5],
  axis: false,
  build(board, ctx) {
    const { color } = ctx;
    const ink = { fixed: true, size: 3, strokeColor: color.ink, fillColor: color.ink };
    const C = board.create('point', [0, 0], { ...ink, name: 'C', label: { offset: [-14, -10] } });
    const A = board.create('point', [b, 0], { ...ink, name: 'A', label: { offset: [6, -12] } });
    const B = board.create('point', [1.5, 3.5], { name: 'B', snapToGrid: true, snapSizeX: step, snapSizeY: step, label: { offset: [6, 10] } });
    keepInside(B, [-3, 0.5, 6, 5.5]);

    ctx.name('axis', board.create('arrow', [[-3.3, 0], [6.3, 0]], { fixed: true, strokeColor: color.muted, strokeWidth: 1 }));
    board.create('polygon', [A, B, C], { fixed: true, fillOpacity: 0.1, borders: { strokeColor: color.ink, strokeWidth: 2 } });
    board.create('nonreflexangle', [A, C, B], { radius: 0.5, withLabel: false });

    const tex = (x: () => number, y: () => number, latex: string, attrs = {}) =>
      board.create('text', [x, y, ctx.tex(latex)], { anchorX: 'middle', anchorY: 'middle', fixed: true, fontSize: 15, ...attrs });
    // Side label at the midpoint of p–q, pushed away from the opposite vertex.
    const sideLabel = (p: JXG.Point, q: JXG.Point, opposite: JXG.Point, latex: string) => {
      const mx = () => (p.X() + q.X()) / 2;
      const my = () => (p.Y() + q.Y()) / 2;
      const push = (axis: 0 | 1) => () => {
        const [dx, dy] = [mx() - opposite.X(), my() - opposite.Y()];
        return (0.4 * (axis === 0 ? dx : dy)) / (Math.hypot(dx, dy) || 1);
      };
      return tex(() => mx() + push(0)(), () => my() + push(1)(), latex);
    };
    sideLabel(C, B, A, 'a');
    sideLabel(A, B, C, 'c');
    tex(() => b / 2, () => -0.95, 'b');

    const H = board.create('point', [() => B.X(), 0], { ...ink, name: 'H', label: { offset: [-4, -14] } });
    ctx.name('altitude', H);
    ctx.name('altitude', board.create('segment', [B, H], { strokeColor: color.accent2, strokeWidth: 3 }));
    ctx.name('altitude', board.create('segment', [C, H], { strokeColor: color.accent, strokeWidth: 4 }));
    ctx.name('altitude', board.create('nonreflexangle', [B, H, A], { radius: 0.3, withLabel: false, fillOpacity: 0.15 }));
    ctx.name('altitude', tex(() => B.X() + 0.15, () => B.Y() / 2, 'a\\sin C', { anchorX: 'left', strokeColor: color.accent2 }));
    ctx.name('altitude', tex(() => B.X() / 2, () => -0.4, 'a\\cos C', { strokeColor: color.accent }));

    ctx.name('abh', board.create('polygon', [A, B, H], { fixed: true, vertices: { visible: false }, fillColor: color.accent, fillOpacity: 0.2, borders: { visible: false } }));
    ctx.name('abh', tex(() => (B.X() + b) / 2, () => 0.35, 'b-a\\cos C'));

    const f = ctx.fmt;
    const a = () => dist(C, B);
    const angleC = () => angleAt(A, C, B);
    ctx.readout(() => `$a=${f(a())},\\ b=${f(b)},\\ C=${f(toDegrees(angleC()))}^\\circ$，$H=(a\\cos C,\\ 0)=(${f(H.X())},\\ 0)$`);
    ctx.readout(() => `$c^2=${f(dist(A, B) ** 2)}$，$a^2+b^2-2ab\\cos C=${f(a() ** 2 + b * b - 2 * a() * b * Math.cos(angleC()))}$`);
  },
  steps: [
    {
      text: '把 $C$ 放在原點、$CA$ 放在 $x$ 軸正向上：$A=(b,0)$，$B=(a\\cos C,\\ a\\sin C)$。',
      show: ['axis'],
    },
    {
      text: '從 $B$ 作 $x$ 軸的垂線，垂足 $H=(a\\cos C,0)$：$CH$ 的有向長度是 $a\\cos C$，$BH=a\\sin C$。',
      show: ['altitude'],
      highlight: ['altitude'],
    },
    {
      text: '在直角三角形 $ABH$ 中，兩股是 $BH=a\\sin C$ 和 $HA=|b-a\\cos C|$，所以 $c^2=(a\\sin C)^2+(b-a\\cos C)^2$。',
      show: ['abh'],
      highlight: ['abh'],
    },
    {
      text: '展開並用 $\\sin^2C+\\cos^2C=1$：$c^2=a^2+b^2-2ab\\cos C$。',
    },
  ],
} satisfies GraphDef;

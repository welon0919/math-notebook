import { toDegrees, unitGrid, vectorTip } from '../helpers';
import type { GraphDef } from '../types';

const area: [number, number, number, number] = [-4.2, -3.2, 4.2, 3.2];
const eps = 1e-9;

type Matrix = [number, number, number, number]; // a, b, c, d of (a b; c d)

/** Real eigenvalues with an eigenvector each; `all` when A = λI and every direction works. */
function eigen([a, b, c, d]: Matrix): { all: boolean; pairs: { lambda: number; v: [number, number] }[] } {
  const tr = a + d;
  const det = a * d - b * c;
  const disc = tr * tr - 4 * det;
  if (disc < -eps) return { all: false, pairs: [] };
  if (Math.abs(b) < eps && Math.abs(c) < eps && Math.abs(a - d) < eps) return { all: true, pairs: [{ lambda: a, v: [1, 0] }] };
  const root = Math.sqrt(Math.max(0, disc));
  const lambdas = root < eps ? [tr / 2] : [(tr + root) / 2, (tr - root) / 2];
  return {
    all: false,
    pairs: lambdas.map((lambda) => {
      // A solution of (A − λI)v = 0, taken from whichever row is not all zero.
      const v: [number, number] =
        Math.abs(b) > eps || Math.abs(a - lambda) > eps ? [b, lambda - a] : [lambda - d, c];
      const n = Math.hypot(...v) || 1;
      return { lambda, v: [v[0] / n, v[1] / n] };
    }),
  };
}
// Check against the lesson's example: (2 1; 1 2) has eigenvalues 3 and 1 with vectors along (1, 1) and (1, −1).
{
  const { pairs } = eigen([2, 1, 1, 2]);
  const ok = pairs.length === 2 && pairs.every(({ lambda, v }) => Math.abs(2 * v[0] + v[1] - lambda * v[0]) < 1e-9 && Math.abs(v[0] + 2 * v[1] - lambda * v[1]) < 1e-9);
  if (!ok || Math.abs(pairs[0].lambda - 3) > 1e-9 || Math.abs(pairs[1].lambda - 1) > 1e-9) throw new Error('eigenvectors: wrong eigen pairs.');
}

export default {
  title: '特徵向量：方向不變的向量',
  description:
    '拖動 Ae₁、Ae₂ 的終點設定矩陣 A（預設是例題的 (2 1; 1 2)）。圖中畫出單位圓和它經過 A 變換後的形狀，虛線標出特徵向量的方向：這些方向上的向量經過 A 之後方向不變，只被伸縮 λ 倍。拖動單位圓上的 v，看 Av 什麼時候和 v 同方向。',
  boundingBox: [-4.8, 3.6, 4.8, -3.6],
  build(board, ctx) {
    const { color } = ctx;
    unitGrid(board, ctx);
    const E1 = vectorTip(board, ctx, { at: [2, 1], name: 'A\\mathbf{e}_1', color: color.muted, area });
    const E2 = vectorTip(board, ctx, { at: [1, 2], name: 'A\\mathbf{e}_2', color: color.muted, area });
    const A = (): Matrix => [E1.X(), E2.X(), E1.Y(), E2.Y()];
    const apply = ([x, y]: [number, number]): [number, number] => {
      const [a, b, c, d] = A();
      return [a * x + b * y, c * x + d * y];
    };

    // The unit circle and its image.
    board.create('curve', [(t: number) => Math.cos(t), (t: number) => Math.sin(t), 0, 2 * Math.PI], { strokeColor: color.ink, strokeWidth: 1.5 });
    board.create('curve', [(t: number) => apply([Math.cos(t), Math.sin(t)])[0], (t: number) => apply([Math.cos(t), Math.sin(t)])[1], 0, 2 * Math.PI], {
      strokeColor: color.accent2,
      strokeWidth: 1.5,
      dash: 2,
    });

    // Eigen-directions as dashed lines through the origin.
    for (const i of [0, 1]) {
      const dir = () => {
        const e = eigen(A());
        return e.all ? undefined : e.pairs[i]?.v;
      };
      board.create('line', [() => (dir() ? [0, -dir()![1], dir()![0]] : [NaN, NaN, NaN])], { strokeColor: color.highlight, strokeWidth: 2, dash: 3 });
    }

    // v on the unit circle (whole degrees) and its image Av.
    const P = board.create('point', [Math.cos(Math.PI / 9), Math.sin(Math.PI / 9)], { name: ctx.tex('\\mathbf{v}'), label: { offset: [8, 8] } });
    const degrees = () => Math.round(toDegrees(Math.atan2(P.Y(), P.X())));
    // Snap to whole degrees, or onto an eigen-direction (either way along it) when within 1°.
    P.on('drag', () => {
      let t = (degrees() * Math.PI) / 180;
      const here = Math.atan2(P.Y(), P.X());
      const e = eigen(A());
      if (!e.all) {
        for (const { v } of e.pairs) {
          for (const s of [1, -1]) {
            const target = Math.atan2(s * v[1], s * v[0]);
            const gap = Math.abs(Math.atan2(Math.sin(here - target), Math.cos(here - target)));
            if (gap < Math.PI / 180) t = target;
          }
        }
      }
      P.moveTo([Math.cos(t), Math.sin(t)]);
    });
    board.create('arrow', [[0, 0], P], { strokeColor: color.accent, strokeWidth: 3, fixed: true });
    const AP = board.create('point', [() => apply([P.X(), P.Y()])[0], () => apply([P.X(), P.Y()])[1]], {
      fixed: true,
      name: ctx.tex('A\\mathbf{v}'),
      size: 3,
      strokeColor: color.accent2,
      fillColor: color.accent2,
      label: { offset: [8, 8], strokeColor: color.accent2 },
    });
    board.create('arrow', [[0, 0], AP], { strokeColor: color.accent2, strokeWidth: 3, fixed: true });

    const f = ctx.fmt;
    ctx.readout(() => {
      const e = eigen(A());
      if (e.all) return `$A=${f(e.pairs[0].lambda)}I$：每個方向都是特徵向量，特徵值 $\\lambda=${f(e.pairs[0].lambda)}$。`;
      if (e.pairs.length === 0) return '沒有實數特徵值：每個向量經過 $A$ 之後方向都會改變（例如旋轉）。';
      return e.pairs.map(({ lambda, v }) => `$\\lambda=${f(lambda)}$，方向 $(${f(v[0])},\\ ${f(v[1])})$`).join('；');
    });
    ctx.readout(() => {
      const [x, y] = [P.X(), P.Y()];
      const [ax, ay] = apply([x, y]);
      if (Math.hypot(ax, ay) < 1e-6) return '$A\\mathbf{v}=\\mathbf{0}$：$\\mathbf{v}$ 是特徵值 $0$ 的特徵向量。';
      const angle = toDegrees(Math.atan2(x * ay - y * ax, x * ax + y * ay));
      const parallel = Math.abs(x * ay - y * ax) < 1e-9 * Math.hypot(ax, ay);
      return parallel
        ? `$A\\mathbf{v}$ 和 $\\mathbf{v}$ 在同一條直線上（$A\\mathbf{v}=${f((x * ax + y * ay))}\\,\\mathbf{v}$）：$\\mathbf{v}$ 是特徵向量。`
        : `$A\\mathbf{v}$ 和 $\\mathbf{v}$ 的夾角是 $${f(Math.abs(angle))}^\\circ$，不是特徵向量。`;
    });
  },
} satisfies GraphDef;

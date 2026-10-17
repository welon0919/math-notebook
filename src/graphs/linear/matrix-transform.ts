import type JXG from 'jsxgraph';
import { keepInside, magnet, unitGrid, vectorTip } from '../helpers';
import type { GraphDef } from '../types';

const area: [number, number, number, number] = [-4.5, -3.5, 4.5, 3.5];
const eps = 1e-9;
const playMs = 2000;

type Vec = [number, number];

/**
 * The line through p with direction dir, as JSXGraph's [c, a, b] for c + ax + by = 0.
 * NaN (not drawn) when dir is the zero vector.
 */
const lineThrough = (p: Vec, dir: Vec): [number, number, number] =>
  Math.hypot(...dir) < eps ? [NaN, NaN, NaN] : [dir[1] * p[0] - dir[0] * p[1], -dir[1], dir[0]];

export default {
  title: '矩陣把平面變形',
  description:
    '矩陣 A = (a b; c d) 把 (1, 0) 送到第一行 (a, c)、把 (0, 1) 送到第二行 (b, d)。先拖動虛線箭頭設定這兩行，再拖動向量 x，然後按「播放」：格線、單位正方形和 x 會一起從原本的位置變形到經過 A 之後的位置，x 變成 Ax。單位正方形變成以兩行為邊的平行四邊形，面積是 |det A| = |ad − bc|。',
  boundingBox: [-6, 4.5, 6, -4.5],
  build(board, ctx) {
    const { color } = ctx;
    // How far the transformation has played: the board shows M(t) = (1 − t)I + tA.
    let t = 0;

    unitGrid(board, ctx);
    // The target columns of A, dragged by the reader; dashed until the transformation reaches them.
    const ghost = { dash: 2, strokeWidth: 2, strokeOpacity: 0.6 };
    const E1 = vectorTip(board, ctx, { at: [2.5, 0.5], name: 'A\\mathbf{e}_1', color: color.accent, area, arrow: ghost });
    const E2 = vectorTip(board, ctx, { at: [-1, 2], name: 'A\\mathbf{e}_2', color: color.accent2, area, arrow: ghost });
    // Free dragging, with a magnet so collinear columns (det = 0) can be reached exactly.
    magnet(E1, E2, [0, 180]);
    magnet(E2, E1, [0, 180]);

    // Columns of M(t), moving from e₁, e₂ to Ae₁, Ae₂.
    const c1 = (): Vec => [1 - t + t * E1.X(), t * E1.Y()];
    const c2 = (): Vec => [t * E2.X(), 1 - t + t * E2.Y()];
    const M = ([x, y]: Vec): Vec => [x * c1()[0] + y * c2()[0], x * c1()[1] + y * c2()[1]];

    // Images of the grid lines x = k (through k·c₁, along c₂) and y = k (through k·c₂, along c₁).
    const grid = { strokeColor: color.highlight, strokeWidth: 1, strokeOpacity: 0.55 };
    for (let k = -8; k <= 8; k++) {
      board.create('line', [() => lineThrough([k * c1()[0], k * c1()[1]], c2())], grid);
      board.create('line', [() => lineThrough([k * c2()[0], k * c2()[1]], c1())], grid);
    }

    const point = (xy: () => Vec) => board.create('point', [() => xy()[0], () => xy()[1]], { visible: false, fixed: true });
    const O = point(() => [0, 0]);
    const P1 = point(c1);
    const P2 = point(c2);
    board.create('polygon', [O, P1, point(() => M([1, 1])), P2], {
      fixed: true,
      vertices: { visible: false },
      fillColor: color.highlight,
      fillOpacity: 0.3,
      borders: { strokeColor: color.highlight, strokeWidth: 2 },
    });
    board.create('arrow', [O, P1], { fixed: true, strokeColor: color.accent, strokeWidth: 3 });
    board.create('arrow', [O, P2], { fixed: true, strokeColor: color.accent2, strokeWidth: 3 });

    // A third vector x and its image M(t)x, which ends at Ax.
    const X = board.create('point', [1.5, -1], { name: ctx.tex('\\mathbf{x}'), strokeColor: color.muted, fillColor: color.muted, label: { offset: [8, -14], strokeColor: color.muted } });
    keepInside(X, area);
    board.create('arrow', [O, X], { fixed: true, strokeColor: color.muted, strokeWidth: 2, dash: 2 });
    const x = (): Vec => [X.X(), X.Y()];
    const AX = board.create('point', [() => M(x())[0], () => M(x())[1]], {
      fixed: true,
      name: ctx.tex('A\\mathbf{x}'),
      size: 3,
      strokeColor: color.ink,
      fillColor: color.ink,
      label: { offset: [8, 8] },
    });
    board.create('arrow', [O, AX], { fixed: true, strokeColor: color.ink, strokeWidth: 3 });

    ctx.button('▶ 播放', () => {
      t = 0;
      ctx.animate(playMs, (p) => {
        t = p;
      });
    });
    ctx.button('還原格線', () => {
      const from = t;
      ctx.animate(playMs / 2, (p) => {
        t = from * (1 - p);
      });
    });

    const f = ctx.fmt;
    const det = () => E1.X() * E2.Y() - E2.X() * E1.Y();
    const vec = ([a, b]: Vec) => `(${f(a)},\\ ${f(b)})`;
    ctx.readout(() => `$A=\\begin{pmatrix}${f(E1.X())}&${f(E2.X())}\\\\${f(E1.Y())}&${f(E2.Y())}\\end{pmatrix}$，$\\mathbf{x}=${vec(x())}$，$A\\mathbf{x}=${vec([E1.X() * x()[0] + E2.X() * x()[1], E1.Y() * x()[0] + E2.Y() * x()[1]])}$`);
    ctx.readout(() => {
      const d = det();
      const note = Math.abs(d) < eps ? '，平面被壓扁成一條線（或一點）' : d < 0 ? '，而且圖形翻面了' : '';
      return `$\\det A=ad-bc=${f(d)}$：單位正方形變成面積 $${f(Math.abs(d))}$ 的平行四邊形${note}。`;
    });
  },
} satisfies GraphDef;

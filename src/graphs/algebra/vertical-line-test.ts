import type JXG from 'jsxgraph';
import { keepInside } from '../helpers';
import type { GraphDef } from '../types';

const step = 0.1;
const num = (v: number) => String(+v.toFixed(2));

interface Shape {
  button: string;
  latex: string;
  /** The y values on the curve above x, lowest first. */
  ys(x: number): number[];
  draw(board: JXG.Board, attrs: object): JXG.GeometryElement;
}

const root = (v: number) => (Math.abs(v) < 1e-9 ? [0] : v > 0 ? [-Math.sqrt(v), Math.sqrt(v)] : []);

const shapes: Shape[] = [
  {
    button: '拋物線',
    latex: 'y=x^2-2',
    ys: (x) => [x * x - 2],
    draw: (board, attrs) => board.create('functiongraph', [(x: number) => x * x - 2], attrs),
  },
  {
    button: '圓',
    latex: 'x^2+y^2=9',
    ys: (x) => root(9 - x * x),
    draw: (board, attrs) => board.create('circle', [[0, 0], 3], { ...attrs, fillOpacity: 0 }),
  },
  {
    button: '橫躺的拋物線',
    latex: 'x=y^2-2',
    ys: (x) => root(x + 2),
    draw: (board, attrs) => board.create('curve', [(t: number) => t * t - 2, (t: number) => t, -3, 3], attrs),
  },
];

export default {
  title: '鉛直線檢驗',
  description:
    '用按鈕切換三個圖形：拋物線 y = x² − 2、圓 x² + y² = 9、橫躺的拋物線 x = y² − 2。左右拖動 x 軸上的點，鉛直線 x = t 跟著移動，圖上標出它和圖形的交點，下方說明交點個數。只要有一條鉛直線和圖形交於兩點以上，同一個 x 就對應到兩個 y，這個圖形就不是函數的圖形。',
  boundingBox: [-6, 4.5, 6, -4.5],
  build(board, ctx) {
    const { color } = ctx;
    let current = 0;
    const curves = shapes.map((s, i) => s.draw(board, { strokeColor: color.accent, strokeWidth: 3, fixed: true, highlight: false, visible: i === 0 }));

    const t = board.create('point', [1.5, 0], { name: ctx.tex('t'), strokeColor: color.ink, fillColor: color.ink, label: { offset: [6, -14] } });
    keepInside(t, [-5.5, 0, 5.5, 0]);
    t.on('drag', () => t.moveTo([Math.round(t.X() / step) * step, 0]));
    board.create('line', [t, [() => t.X(), 1]], { strokeColor: color.accent2, strokeWidth: 2, dash: 2, fixed: true, highlight: false });

    const ys = () => shapes[current].ys(t.X());
    for (const i of [0, 1]) {
      board.create('point', [() => (ys()[i] === undefined ? NaN : t.X()), () => ys()[i] ?? NaN], {
        fixed: true,
        withLabel: false,
        size: 5,
        strokeColor: color.highlight,
        fillColor: color.highlight,
      });
    }

    shapes.forEach((s, i) =>
      ctx.button(s.button, () => {
        current = i;
        curves.forEach((c, j) => c.setAttribute({ visible: j === i }));
        board.update();
      }),
    );

    ctx.readout(() => {
      const found = ys();
      const at = `鉛直線 $x=${num(t.X())}$`;
      if (found.length === 0) return `${at} 和 $${shapes[current].latex}$ 沒有交點。`;
      if (found.length === 1) return `${at} 和 $${shapes[current].latex}$ 交於一點，$y=${num(found[0])}$。`;
      return `${at} 和 $${shapes[current].latex}$ 交於兩點，$y=${num(found[0])}$ 和 $y=${num(found[1])}$：同一個 $x$ 對應到兩個 $y$。`;
    });
    ctx.readout(() =>
      current === 0
        ? '每一條鉛直線都只交一點，所以 $y=x^2-2$ 是函數的圖形。'
        : `有鉛直線交於兩點，所以 $${shapes[current].latex}$ 不是函數的圖形（$y$ 不是 $x$ 的函數）。`,
    );
  },
} satisfies GraphDef;

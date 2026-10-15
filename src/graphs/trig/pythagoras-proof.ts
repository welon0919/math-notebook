import type { GraphDef } from '../types';

// Legs of the right triangle; the big square has side s = a + b.
const a = 3;
const b = 4;
const s = a + b;

type Pt = [number, number];

/**
 * The four corner triangles of the first arrangement, as [right-angle vertex, end of leg a,
 * end of leg b], and how far each slides in step 3. The division points on the sides are
 * measured a from each corner going counterclockwise: (a,0), (s,a), (b,s), (0,b).
 * After sliding (no rotation), t1+t3 fill the rectangle [a,s]×[0,a] and t2+t4 fill [0,a]×[a,s],
 * leaving the squares [0,a]² and [a,s]².
 */
const triangles: { id: string; pts: [Pt, Pt, Pt]; move: Pt }[] = [
  { id: 't1', pts: [[s, 0], [s, a], [a, 0]], move: [0, 0] },
  { id: 't2', pts: [[s, s], [b, s], [s, a]], move: [-b, 0] },
  { id: 't3', pts: [[0, s], [0, b], [b, s]], move: [a, -b] },
  { id: 't4', pts: [[0, 0], [a, 0], [0, b]], move: [0, a] },
];

// Check the arrangement with numbers rather than trusting the comments above:
// every triangle has legs a and b at a right angle, and the moved triangles tile the two rectangles.
const dist = (p: Pt, q: Pt) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const near = (x: number, y: number) => Math.abs(x - y) < 1e-9;
for (const { id, pts } of triangles) {
  const [r, pa, pb] = pts;
  const dot = (pa[0] - r[0]) * (pb[0] - r[0]) + (pa[1] - r[1]) * (pb[1] - r[1]);
  if (!near(dist(r, pa), a) || !near(dist(r, pb), b) || !near(dot, 0)) {
    throw new Error(`pythagoras-proof: ${id} is not a right triangle with legs ${a}, ${b}.`);
  }
}
const moved = (id: string) => {
  const t = triangles.find((t) => t.id === id)!;
  return t.pts.map(([x, y]) => `${x + t.move[0]},${y + t.move[1]}`).sort().join(' ');
};
const expected = [
  ['t1', `${a},0 ${s},0 ${s},${a}`],
  ['t3', `${a},0 ${a},${a} ${s},${a}`],
  ['t2', `${a},${a} ${a},${s} 0,${s}`],
  ['t4', `0,${a} ${a},${a} 0,${s}`],
];
for (const [id, pts] of expected) {
  if (moved(id) !== pts.split(' ').sort().join(' ')) {
    throw new Error(`pythagoras-proof: ${id} does not land where the rearrangement needs it.`);
  }
}

export default {
  title: '畢氏定理：四個直角三角形重新排列',
  description:
    '邊長 a+b 的大正方形中放四個兩股為 a、b 的直角三角形。第一種排法中間留下邊長 c 的正方形；把三角形平移成兩個 a×b 的長方形後，剩下邊長 a 與 b 的兩個正方形。兩種排法剩下的面積相等，所以 c² = a² + b²。',
  boundingBox: [-1, s + 1, s + 1, -1],
  aspect: 1,
  axis: false,
  build(board, ctx) {
    const { color } = ctx;
    const point = (x: () => number, y: () => number) =>
      board.create('point', [x, y], { visible: false, fixed: true, withLabel: false });
    const fixedPolygon = (pts: Pt[], attrs: object) =>
      board.create('polygon', pts.map(([x, y]) => point(() => x, () => y)), {
        fixed: true,
        vertices: { visible: false },
        borders: { strokeColor: color.ink, strokeWidth: 2 },
        ...attrs,
      });
    const label = (x: number, y: number, latex: string) =>
      board.create('text', [x, y, ctx.tex(latex)], {
        anchorX: 'middle',
        anchorY: 'middle',
        fixed: true,
        fontSize: 18,
      });
    const area = { fillColor: color.accent2, fillOpacity: 0.15 };

    // Regions first, so the triangles are drawn on top of them.
    ctx.name('inner', fixedPolygon([[a, 0], [s, a], [b, s], [0, b]], area));
    ctx.name('sqA', fixedPolygon([[0, 0], [a, 0], [a, a], [0, a]], area));
    ctx.name('sqB', fixedPolygon([[a, a], [s, a], [s, s], [a, s]], area));
    ctx.name('square', fixedPolygon([[0, 0], [s, 0], [s, s], [0, s]], { fillOpacity: 0 }));

    for (const { id, pts, move } of triangles) {
      const p = () => ctx.progress(3);
      const vertices = pts.map(([x, y]) => point(() => x + p() * move[0], () => y + p() * move[1]));
      ctx.name(
        id,
        board.create('polygon', vertices, {
          fixed: true,
          vertices: { visible: false },
          fillColor: color.accent,
          fillOpacity: 0.25,
          borders: { strokeColor: color.ink, strokeWidth: 2 },
        }),
      );
    }

    // Side lengths along the big square in the first arrangement (a then b, counterclockwise).
    const out = 0.45;
    const edges: [number, number, string][] = [
      [a / 2, -out, 'a'], [a + b / 2, -out, 'b'],
      [s + out, a / 2, 'a'], [s + out, a + b / 2, 'b'],
      [s - a / 2, s + out, 'a'], [b / 2, s + out, 'b'],
      [-out, s - a / 2, 'a'], [-out, b / 2, 'b'],
    ];
    for (const [x, y, t] of edges) ctx.name('edges1', label(x, y, t));

    // c at the midpoint of each side of the inner square, pushed slightly toward its center.
    const corners: Pt[] = [[a, 0], [s, a], [b, s], [0, b]];
    const center = s / 2;
    corners.forEach(([x1, y1], i) => {
      const [x2, y2] = corners[(i + 1) % 4];
      const [mx, my] = [(x1 + x2) / 2, (y1 + y2) / 2];
      const k = 0.4 / Math.hypot(center - mx, center - my);
      ctx.name('innerLabels', label(mx + (center - mx) * k, my + (center - my) * k, 'c'));
    });
    ctx.name('innerLabels', label(center, center, 'c^2'));

    // Second arrangement: sides of the two leftover squares and their areas.
    ctx.name('sqLabels', label(a / 2, -out, 'a'));
    ctx.name('sqLabels', label(-out, a / 2, 'a'));
    ctx.name('sqLabels', label(a + b / 2, s + out, 'b'));
    ctx.name('sqLabels', label(s + out, a + b / 2, 'b'));
    ctx.name('sqLabels', label(a / 2, a / 2, 'a^2'));
    ctx.name('sqLabels', label(a + b / 2, a + b / 2, 'b^2'));
  },
  steps: [
    {
      text: '畫一個邊長 $a+b$ 的大正方形，在四個角各放一個兩股為 $a$、$b$ 的直角三角形。',
      show: ['square', 't1', 't2', 't3', 't4', 'edges1'],
    },
    {
      text: '中間圍出的四邊形四邊都是 $c$、四個角都是直角，是面積 $c^2$ 的正方形。',
      show: ['inner', 'innerLabels'],
      highlight: ['inner'],
    },
    {
      text: '平移其中三個三角形（不旋轉），兩兩拼成兩個 $a\\times b$ 的長方形。',
      hide: ['inner', 'innerLabels', 'edges1'],
      highlight: ['t2', 't3', 't4'],
      animate: true,
    },
    {
      text: '大正方形剩下的是邊長 $a$ 與 $b$ 的兩個正方形，面積 $a^2+b^2$。',
      show: ['sqA', 'sqB', 'sqLabels'],
      highlight: ['sqA', 'sqB'],
    },
    {
      text: '兩種排法都是大正方形扣掉四個全等的三角形，剩下的面積相等：$c^2=a^2+b^2$。',
      highlight: ['sqA', 'sqB'],
    },
  ],
} satisfies GraphDef;

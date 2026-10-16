import type { GraphDef } from '../types';

// The arithmetic sequence drawn: a_k = a1 + (k - 1) d for k = 1..n.
const a1 = 2;
const d = 1;
const n = 5;
const term = (k: number) => a1 + (k - 1) * d;
const height = term(1) + term(n);

// Rotating 180° about the rectangle's center sends column k, [k-1, k] × [0, a_k],
// to column n+1-k, sitting on top: [n-k, n-k+1] × [a1+an - a_k, a1+an].
// It fits exactly because a_k + a_{n+1-k} = a1 + an. Check that rather than trust it.
for (let k = 1; k <= n; k++) {
  if (term(k) + term(n + 1 - k) !== height) throw new Error('arithmetic-series: columns do not pair up.');
}
const center: [number, number] = [n / 2, height / 2];

export default {
  title: '等差級數：兩份階梯拼成長方形',
  description: `把等差數列的每一項畫成寬 1 的長條，排成階梯；複製一份旋轉 180° 疊在上面，剛好拼成寬 n、高 a₁+aₙ 的長方形，所以 Sₙ = n(a₁+aₙ)/2。圖中 a₁ = ${a1}、公差 ${d}、n = ${n}。`,
  boundingBox: [-0.8, height + 1, n + 2.2, -1],
  aspect: 0.8,
  axis: false,
  build(board, ctx) {
    const { color } = ctx;
    // Rotation by 180°·p about the center, where p is how far step 2 has played.
    const turn = (x: number, y: number): [() => number, () => number] => {
      const angle = () => Math.PI * ctx.progress(2);
      const [cx, cy] = center;
      return [
        () => cx + (x - cx) * Math.cos(angle()) - (y - cy) * Math.sin(angle()),
        () => cy + (x - cx) * Math.sin(angle()) + (y - cy) * Math.cos(angle()),
      ];
    };
    const hidden = { visible: false, fixed: true, withLabel: false };
    const label = (x: number | (() => number), y: number | (() => number), latex: string, attrs = {}) =>
      board.create('text', [x, y, ctx.tex(latex)], { anchorX: 'middle', anchorY: 'middle', fixed: true, ...attrs });

    for (let k = 1; k <= n; k++) {
      const corners: [number, number][] = [[k - 1, 0], [k, 0], [k, term(k)], [k - 1, term(k)]];
      const columnStyle = { fixed: true, vertices: { visible: false }, borders: { strokeColor: color.ink } };
      ctx.name(
        'stairs',
        board.create('polygon', corners.map(([x, y]) => board.create('point', [x, y], hidden)), {
          ...columnStyle,
          fillColor: color.accent,
          fillOpacity: 0.3,
        }),
      );
      ctx.name('stairs', label(k - 0.5, term(k) / 2, `a_${k}`));

      ctx.name(
        'copy',
        board.create('polygon', corners.map(([x, y]) => board.create('point', turn(x, y), hidden)), {
          ...columnStyle,
          fillColor: color.accent2,
          fillOpacity: 0.3,
        }),
      );
      ctx.name('copy', label(...turn(k - 0.5, term(k) / 2), `a_${k}`));
    }

    // Total height on the right, and the width underneath.
    const side = n + 0.3;
    ctx.name('height', board.create('segment', [[side, 0], [side, height]], { fixed: true, firstArrow: true, lastArrow: true, strokeWidth: 1.5 }));
    ctx.name('height', label(side + 0.15, height / 2, `a_1+a_${n}`, { anchorX: 'left' }));
    ctx.name('width', label(n / 2, -0.5, `n=${n}`));
    ctx.name(
      'rect',
      board.create('polygon', [[0, 0], [n, 0], [n, height], [0, height]].map(([x, y]) => board.create('point', [x, y], hidden)), {
        fixed: true,
        vertices: { visible: false },
        fillOpacity: 0,
        borders: { strokeColor: color.ink, strokeWidth: 3 },
      }),
    );
  },
  steps: [
    {
      text: '把每一項畫成寬 $1$ 的長條，第 $k$ 條高 $a_k$。所有長條的面積加起來就是 $S_n$。',
      show: ['stairs'],
    },
    {
      text: '複製一份，繞著中心點旋轉 $180^\\circ$，疊在原本長條的上面。',
      show: ['copy'],
      highlight: ['copy'],
      animate: true,
    },
    {
      text: '第 $k$ 條上面接的是 $a_{n+1-k}$。往右一條，$a_k$ 多 $d$、$a_{n+1-k}$ 少 $d$，所以每一條的總高度都是 $a_1+a_n$。',
      show: ['height'],
      highlight: ['height'],
    },
    {
      text: '拼成寬 $n$、高 $a_1+a_n$ 的長方形，面積 $n(a_1+a_n)$ 是 $S_n$ 的兩倍，所以 $S_n=\\dfrac{n(a_1+a_n)}{2}$。',
      show: ['rect', 'width'],
      highlight: ['rect'],
    },
  ],
} satisfies GraphDef;

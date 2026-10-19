import type { GraphDef } from '../types';

// A fixed example: α in the second quadrant, β in the first, so A, B and the rotated copy are all apart.
const alpha = (110 * Math.PI) / 180;
const beta = (35 * Math.PI) / 180;

export default {
  title: '轉動弦長不變：推導 cos(α − β)',
  description:
    '逐步證明 cos(α − β) = cos α cos β + sin α sin β。單位圓上取角 α 的點 A 和角 β 的點 B（圖中 α = 110°、β = 35°），用兩點距離公式算出 |AB|² = 2 − 2(cos α cos β + sin α sin β)。再把 A、B 一起繞原點轉 −β：B 轉到 B′(1, 0)，A 轉到角 α − β 的點 A′。轉動不改變長度，而 |A′B′|² = 2 − 2 cos(α − β)，兩式相等就得到公式。',
  boundingBox: [-1.6, 1.25, 1.6, -1.15],
  axis: false,
  build(board, ctx) {
    const { color } = ctx;
    const thin = { fixed: true, strokeColor: color.muted, strokeWidth: 1, highlight: false };
    board.create('arrow', [[-1.5, 0], [1.5, 0]], thin);
    board.create('arrow', [[0, -1.1], [0, 1.15]], thin);
    ctx.name('circle', board.create('circle', [[0, 0], 1], { fixed: true, strokeColor: color.ink, strokeWidth: 2, highlight: false }));

    const O = board.create('point', [0, 0], { visible: false, fixed: true });
    const X = board.create('point', [1, 0], { visible: false, fixed: true });
    // Short labels; the step text below the graph gives the coordinates.
    const point = (x: () => number, y: () => number, latex: string, c: string, offset: [number, number]) =>
      board.create('point', [x, y], { fixed: true, name: ctx.tex(latex), size: 4, strokeColor: c, fillColor: c, label: { offset, strokeColor: c } });

    const A = point(() => Math.cos(alpha), () => Math.sin(alpha), 'A', color.accent, [-16, 12]);
    const B = point(() => Math.cos(beta), () => Math.sin(beta), 'B', color.accent, [8, 8]);
    ctx.name('AB', A);
    ctx.name('AB', B);
    ctx.name('AB', board.create('segment', [O, A], { ...thin, strokeColor: color.accent, strokeWidth: 1.5 }));
    ctx.name('AB', board.create('segment', [O, B], { ...thin, strokeColor: color.accent, strokeWidth: 1.5 }));
    ctx.name('AB', board.create('angle', [X, O, B], { radius: 0.18, name: ctx.tex('\\beta'), fillOpacity: 0.1, strokeColor: color.accent, fillColor: color.accent, label: { strokeColor: color.accent } }));
    ctx.name('AB', board.create('angle', [X, O, A], { radius: 0.32, name: ctx.tex('\\alpha'), fillOpacity: 0.06, strokeColor: color.accent, fillColor: color.accent, label: { strokeColor: color.accent } }));
    ctx.name('chordAB', board.create('segment', [A, B], { fixed: true, strokeColor: color.accent, strokeWidth: 3.5, highlight: false }));

    // The rotated copy: both angles minus p·β, where p plays from 0 to 1 in step 4.
    const p = () => ctx.progress(4);
    const a2 = () => alpha - p() * beta;
    const b2 = () => beta - p() * beta;
    const A2 = point(() => Math.cos(a2()), () => Math.sin(a2()), "A'", color.accent2, [10, 6]);
    const B2 = point(() => Math.cos(b2()), () => Math.sin(b2()), "B'", color.accent2, [8, -14]);
    ctx.name('rotated', A2);
    ctx.name('rotated', B2);
    ctx.name('rotated', board.create('segment', [O, A2], { ...thin, strokeColor: color.accent2, strokeWidth: 1.5 }));
    ctx.name('rotated', board.create('segment', [O, B2], { ...thin, strokeColor: color.accent2, strokeWidth: 1.5 }));
    ctx.name('chordA2B2', board.create('segment', [A2, B2], { fixed: true, strokeColor: color.accent2, strokeWidth: 3.5, highlight: false }));
  },
  steps: [
    {
      text: '單位圓上取角 $\\alpha$ 的點 $A(\\cos\\alpha,\\sin\\alpha)$ 和角 $\\beta$ 的點 $B(\\cos\\beta,\\sin\\beta)$，連成弦 $AB$。',
      show: ['circle', 'AB', 'chordAB'],
    },
    {
      text: '兩點距離公式：$|AB|^2=(\\cos\\alpha-\\cos\\beta)^2+(\\sin\\alpha-\\sin\\beta)^2$。',
      highlight: ['chordAB'],
    },
    {
      text: '展開，$\\cos^2\\alpha+\\sin^2\\alpha=1$、$\\cos^2\\beta+\\sin^2\\beta=1$：$|AB|^2=2-2(\\cos\\alpha\\cos\\beta+\\sin\\alpha\\sin\\beta)$。',
      highlight: ['chordAB'],
    },
    {
      text: "把 $A$、$B$ 一起繞原點轉 $-\\beta$：$B$ 轉到 $B'(1,0)$，$A$ 轉到角 $\\alpha-\\beta$ 的點 $A'$。",
      show: ['rotated', 'chordA2B2'],
      highlight: ['rotated', 'chordA2B2'],
      animate: true,
    },
    {
      text: "轉動不改變長度：$|A'B'|=|AB|$。",
      highlight: ['chordAB', 'chordA2B2'],
    },
    {
      text: "再用距離公式：$|A'B'|^2=(\\cos(\\alpha-\\beta)-1)^2+\\sin^2(\\alpha-\\beta)=2-2\\cos(\\alpha-\\beta)$。",
      highlight: ['chordA2B2'],
    },
    {
      text: '兩個結果相等：$2-2\\cos(\\alpha-\\beta)=2-2(\\cos\\alpha\\cos\\beta+\\sin\\alpha\\sin\\beta)$，所以 $\\cos(\\alpha-\\beta)=\\cos\\alpha\\cos\\beta+\\sin\\alpha\\sin\\beta$。',
      highlight: ['chordAB', 'chordA2B2'],
    },
  ],
} satisfies GraphDef;

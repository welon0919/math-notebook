import { angleAt, dist, toDegrees } from '../helpers';
import type { GraphDef } from '../types';

// Circumcircle of radius R centered at the origin; B and C are fixed on it, A can be dragged.
const R = 3;
const at = (deg: number): [number, number] => [R * Math.cos((deg * Math.PI) / 180), R * Math.sin((deg * Math.PI) / 180)];

export default {
  title: '正弦定理：外接圓與圓周角',
  description:
    '三角形 ABC 的外接圓圓心 O、半徑 R。從 B 經過 O 作直徑 BD，∠BCD 是直角，所以 sin∠BDC = a / 2R；∠BDC 和 ∠A 相等（A 是銳角）或互補（A 是鈍角），兩者正弦相同，所以 a / sin A = 2R。可以沿著圓拖動頂點 A。',
  boundingBox: [-4.3, 4.3, 4.3, -4.3],
  aspect: 1,
  axis: false,
  build(board, ctx) {
    const { color } = ctx;
    const ink = { fixed: true, size: 3, strokeColor: color.ink, fillColor: color.ink };
    const B = board.create('point', at(210), { ...ink, name: 'B', label: { offset: [-16, -8] } });
    const C = board.create('point', at(330), { ...ink, name: 'C', label: { offset: [8, -8] } });
    const A = board.create('point', at(110), { name: 'A', label: { offset: [-6, 16] } });
    // Keep A on the circle, at a whole number of degrees.
    A.on('drag', () => {
      const deg = Math.round(toDegrees(Math.atan2(A.Y(), A.X())));
      A.moveTo(at(deg));
    });
    board.create('polygon', [A, B, C], { fixed: true, fillOpacity: 0.12, borders: { strokeColor: color.ink, strokeWidth: 2 } });
    board.create('text', [0, -1.5 - 0.35, ctx.tex('a')], { anchorX: 'middle', anchorY: 'middle', fixed: true, fontSize: 16 });

    const O = board.create('point', [0, 0], { ...ink, name: 'O', label: { offset: [-16, 4] } });
    ctx.name('circle', board.create('circle', [O, R], { fixed: true, strokeColor: color.ink, strokeWidth: 1.5 }));
    ctx.name('circle', O);

    // D is the other end of the diameter from B.
    const D = board.create('point', [-B.X(), -B.Y()], { ...ink, name: 'D', label: { offset: [8, 6] } });
    ctx.name('diameter', D);
    ctx.name('diameter', board.create('segment', [B, D], { strokeColor: color.accent, strokeWidth: 2.5 }));
    ctx.name('diameter', board.create('text', [-0.35, 0.35, ctx.tex('2R')], { anchorX: 'middle', anchorY: 'middle', fixed: true, fontSize: 16, strokeColor: color.accent }));
    ctx.name('diameter', board.create('segment', [C, D], { strokeColor: color.ink, strokeWidth: 2 }));

    ctx.name('bcd', board.create('polygon', [B, C, D], { fixed: true, vertices: { visible: false }, fillColor: color.accent2, fillOpacity: 0.15, borders: { visible: false } }));
    ctx.name('bcd', board.create('nonreflexangle', [B, C, D], { radius: 0.35, withLabel: false, fillOpacity: 0.2 }));

    ctx.name('angles', board.create('nonreflexangle', [B, A, C], { radius: 0.6, withLabel: false }));
    ctx.name('angles', board.create('nonreflexangle', [B, D, C], { radius: 0.6, withLabel: false }));

    const f = ctx.fmt;
    const tooClose = () => dist(A, B) < 0.05 || dist(A, C) < 0.05;
    ctx.readout(() => {
      if (tooClose()) return '$A$ 和 $B$ 或 $C$ 重合時不是三角形。';
      const a = toDegrees(angleAt(B, A, C));
      const d = toDegrees(angleAt(B, D, C));
      const relation = Math.abs(a - d) < 0.01 ? '相等（$A$ 是銳角）' : '互補（$A$ 是鈍角）';
      return `$A=${f(a)}^\\circ$，$\\angle BDC=${f(d)}^\\circ$，兩角${relation}`;
    });
    ctx.readout(() => {
      if (tooClose()) return '';
      const ratio = (side: number, angle: number) => f(side / Math.sin(angle));
      return (
        `$\\dfrac{a}{\\sin A}=${ratio(dist(B, C), angleAt(B, A, C))}$，` +
        `$\\dfrac{b}{\\sin B}=${ratio(dist(C, A), angleAt(C, B, A))}$，` +
        `$\\dfrac{c}{\\sin C}=${ratio(dist(A, B), angleAt(A, C, B))}$，$2R=${f(2 * R)}$`
      );
    });
  },
  steps: [
    { text: '畫出 $\\triangle ABC$ 的外接圓，圓心 $O$、半徑 $R$。', show: ['circle'] },
    { text: '從 $B$ 經過 $O$ 作直徑 $BD$，$BD=2R$，再連接 $CD$。', show: ['diameter'], highlight: ['diameter'] },
    {
      text: '$\\angle BCD$ 是半圓上的圓周角，等於 $90^\\circ$，所以 $\\sin\\angle BDC=\\dfrac{a}{2R}$。',
      show: ['bcd'],
      highlight: ['bcd'],
    },
    {
      text: '$A$ 是銳角時 $\\angle BDC=A$（同弧所對的圓周角）；$A$ 是鈍角時 $\\angle BDC=180^\\circ-A$。兩種情形都有 $\\sin\\angle BDC=\\sin A$。',
      show: ['angles'],
      highlight: ['angles'],
    },
    { text: '所以 $\\dfrac{a}{\\sin A}=2R$；同理 $\\dfrac{b}{\\sin B}=\\dfrac{c}{\\sin C}=2R$。' },
  ],
} satisfies GraphDef;

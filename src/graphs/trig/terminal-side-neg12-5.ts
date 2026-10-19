import { terminalSide } from '../terminal-side';

export default terminalSide({
  title: 'tan θ = −5/12 且 sin θ > 0 的角',
  description:
    '斜率 −5/12 的直線經過原點，兩側各有一條射線可能是終邊。sin θ > 0 要求 y > 0，所以終邊是經過 P(−12, 5) 的那一條，P 在第二象限；另一側的點 (12, −5) 不合。水平邊 x = −12、鉛直邊 y = 5，r = 13；虛線是半徑 13 的圓。',
  p: [-12, 5],
  rTex: '13',
  line: 'y=-\\frac{5}{12}x',
  other: { p: [12, -5], why: '直線另一側的點 $(12,-5)$ 也滿足 $\\dfrac{y}{x}=-\\dfrac{5}{12}$，但它的 $y<0$，$\\sin\\theta<0$，不合。' },
});

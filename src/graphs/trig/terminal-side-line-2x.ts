import { terminalSide } from '../terminal-side';

export default terminalSide({
  title: '終邊在直線 y = 2x 上的第三象限角',
  description:
    '直線 y = 2x 經過原點，第三象限的那一半是終邊，取上面的點 P(−1, −2)。水平邊 x = −1、鉛直邊 y = −2，r = √5；虛線是半徑 √5 的圓。直線在第一象限的另一半（例如點 (1, 2)）不是這個角的終邊。',
  p: [-1, -2],
  rTex: '\\sqrt5',
  line: 'y=2x',
  other: { p: [1, 2], why: '直線在第一象限的那一半（例如 $(1,2)$）是另一個角的終邊；題目指定第三象限，所以取 $P(-1,-2)$。' },
});

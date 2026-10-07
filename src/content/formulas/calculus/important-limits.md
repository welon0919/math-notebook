---
subject: calculus
order: 8
name: 重要極限
latex: \begin{aligned}\lim_{x\to 0}\dfrac{\sin x}{x}&=1\\ \lim_{n\to\infty}\left(1+\dfrac{1}{n}\right)^n&=e\end{aligned}
note: 第一式中 $x$ 以弧度為單位。
related: [common-derivatives, derivative-definition, degree-radian-conversion]
---

## 符號說明

- 第一式中的 $x$ **必須用弧度**；用度數時極限是 $\frac{\pi}{180}$。
- 第二式中的 $n$ 是正整數，$n\to\infty$ 表示 $n$ 無限增大。
- $e\approx 2.71828$ 稱為**自然對數的底數**，第二式可以當成 $e$ 的定義。

## 使用時機

- **推導** $(\sin x)'=\cos x$ 和 $(\cos x)'=-\sin x$。
- **計算**相關的極限，例如 $\lim\limits_{x\to 0}\frac{\sin 3x}{x}$、$\lim\limits_{x\to 0}\frac{\tan x}{x}$。
- 理解**連續複利**：每年複利的次數越多，本利和會趨近一個上限，和 $e$ 有關。

## 例題

**例題 1**　求 $\lim\limits_{x\to 0}\frac{\sin 3x}{x}$。

<details class="example-solution">
<summary>看解答</summary>

湊出 $\frac{\sin 3x}{3x}$ 的形式：

$$
\frac{\sin 3x}{x}=3\cdot\frac{\sin 3x}{3x}.
$$

令 $t=3x$，$x\to 0$ 時 $t\to 0$，$\frac{\sin t}{t}\to 1$。所以極限是 $3\cdot 1=3$。

**驗算**：$x=0.001$ 時 $\frac{\sin 0.003}{0.001}\approx 2.9999955$，很接近 $3$。

</details>

**例題 2**　本金 $1$ 元、年利率 $100\%$，一年平均分成 $n$ 次複利。$n$ 越大，一年後的本利和會怎樣？

<details class="example-solution">
<summary>看解答</summary>

每次的利率是 $\frac{1}{n}$，複利 $n$ 次，本利和是 $\left(1+\frac{1}{n}\right)^n$：

| $n$ | 本利和 |
|---|---|
| $1$ | $2$ |
| $2$ | $2.25$ |
| $12$（每月） | $\approx 2.6130$ |
| $365$（每天） | $\approx 2.7146$ |
| $10000$ | $\approx 2.7181$ |

本利和會越來越大，但不會無限增大，而是趨近 $e\approx 2.71828$ 元。

**驗算**：$n=2$ 時 $1.5^2=2.25$；$n=12$ 時 $\left(\frac{13}{12}\right)^{12}\approx 2.61304$。

</details>

## 推導

**第一式**。先看 $0<x<\frac{\pi}{2}$。在單位圓上取 $O$ 為原點、$A(1,0)$、角度 $x$ 的點 $P(\cos x,\sin x)$，延長 $OP$ 交過 $A$ 的垂直線於 $T(1,\tan x)$。

<figure class="proof-figure">
<svg viewBox="-14 6 170 150" width="190" height="168" role="img" aria-label="單位圓的四分之一，三角形 OAP 在扇形 OAP 內，扇形又在三角形 OAT 內">
  <path d="M130,140 A120,120 0 0,0 10,20" fill="none" stroke="currentColor" stroke-width="1.2"/>
  <polygon points="10,140 130,140 130,39.3" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="1.2"/>
  <path d="M10,140 L130,140 A120,120 0 0,0 101.9,62.9 Z" fill="currentColor" fill-opacity="0.1" stroke="none"/>
  <polygon points="10,140 130,140 101.9,62.9" fill="currentColor" fill-opacity="0.12" stroke="currentColor" stroke-width="1.2"/>
  <path d="M34,140 A24,24 0 0,0 28.4,124.6" fill="none" stroke="currentColor" stroke-width="1"/>
  <g font-size="13" fill="currentColor">
    <text x="-2" y="152">O</text><text x="132" y="153">A</text>
    <text x="92" y="58">P</text><text x="135" y="40">T</text>
    <text x="38" y="134" font-style="italic">x</text>
  </g>
</svg>
</figure>

三個圖形一個包含一個：$\triangle OAP\subset$ 扇形 $OAP\subset\triangle OAT$，所以面積

$$
\frac{1}{2}\sin x<\frac{1}{2}x<\frac{1}{2}\tan x.
$$

（扇形面積 $\frac{1}{2}r^2x$ 需要 $x$ 用弧度，$r=1$。）全部除以 $\frac{1}{2}\sin x$（是正數）再取倒數，不等號方向反過來：

$$
\cos x<\frac{\sin x}{x}<1.
$$

$x\to 0^+$ 時 $\cos x\to 1$，$\frac{\sin x}{x}$ 被夾在兩個都趨近 $1$ 的式子中間（夾擠定理），所以趨近 $1$。$x<0$ 時，$\frac{\sin x}{x}=\frac{\sin(-x)}{-x}$，化成正的情形，結果相同。

**第二式**。設 $a_n=\left(1+\frac{1}{n}\right)^n$，用二項式定理展開並整理第 $k$ 項：

$$
\begin{aligned}a_n=\sum_{k=0}^{n}\frac{1}{k!}&\left(1-\frac{1}{n}\right)\left(1-\frac{2}{n}\right)\\&\cdots\left(1-\frac{k-1}{n}\right).\end{aligned}
$$

- **遞增**：$n$ 變大時，每個括號 $1-\frac{j}{n}$ 都變大，而且還多出新的正項，所以 $a_n<a_{n+1}$。
- **有上界**：每個括號都小於 $1$，且 $k!\ge 2^{k-1}$（$k\ge 1$），所以
  $$
  \begin{aligned}a_n&<1+1+\frac{1}{2}+\frac{1}{4}+\cdots\\&<1+2=3.\end{aligned}
  $$

一個遞增而且有上界的數列一定有極限（這是實數的基本性質，稱為**單調收斂定理**），這個極限就定義為 $e$。

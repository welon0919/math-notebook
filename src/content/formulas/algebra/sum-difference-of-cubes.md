---
subject: algebra
order: 3
name: 立方和與立方差
latex: \begin{aligned}a^3+b^3&=(a+b)(a^2-ab+b^2)\\ a^3-b^3&=(a-b)(a^2+ab+b^2)\end{aligned}
related: [multiplication-formulas, factor-theorem]
---

## 符號說明

- $a,b$：任意實數或代數式。
- 第二個因式 $a^2\mp ab+b^2$ 中間項的符號，和第一個因式 $a\pm b$ **相反**：立方和是 $(a+b)(a^2-ab+b^2)$，立方差是 $(a-b)(a^2+ab+b^2)$。

## 使用時機

- **因式分解**含立方的式子，例如 $x^3-8$、$27x^3+1$。
- **化簡分式**，例如 $\dfrac{x^3-1}{x-1}$。
- **分母有理化**：分母是 $\sqrt[3]{a}-\sqrt[3]{b}$ 這類立方根時，乘上適當的式子，讓分母變成 $a-b$。

## 例題

**例題 1**　因式分解 $8x^3-27$。

<details class="example-solution">
<summary>看解答</summary>

$8x^3=(2x)^3$、$27=3^3$，用立方差，取 $a=2x$、$b=3$：

$$
\begin{aligned}&8x^3-27\\={}&(2x-3)\big((2x)^2+(2x)(3)+3^2\big)\\={}&(2x-3)(4x^2+6x+9).\end{aligned}
$$

**驗算**：

$$
\begin{aligned}&(2x-3)(4x^2+6x+9)\\={}&8x^3+12x^2+18x\\&-12x^2-18x-27\\={}&8x^3-27.\end{aligned}
$$

</details>

**例題 2**　將 $\dfrac{1}{\sqrt[3]{2}-1}$ 的分母有理化。

<details class="example-solution">
<summary>看解答</summary>

令 $a=\sqrt[3]{2}$、$b=1$，則 $a^3-b^3=2-1=1$。由立方差 $a^3-b^3=(a-b)(a^2+ab+b^2)$，分子分母同乘 $a^2+ab+b^2$：

$$
\begin{aligned}\frac{1}{a-b}&=\frac{a^2+ab+b^2}{(a-b)(a^2+ab+b^2)}\\&=\frac{a^2+ab+b^2}{a^3-b^3}\\&=\frac{\sqrt[3]{4}+\sqrt[3]{2}+1}{1}.\end{aligned}
$$

所以答案是 $\sqrt[3]{4}+\sqrt[3]{2}+1$。

**驗算**（近似值）：$\sqrt[3]{2}\approx 1.2599$，左邊 $\approx \dfrac{1}{0.2599}\approx 3.847$；右邊 $\approx 1.5874+1.2599+1=3.8473$。

</details>

## 推導

展開右邊，用分配律逐項相乘，再合併同類項。

**立方和**：

$$
\begin{aligned}
&(a+b)(a^2-ab+b^2)\\
={}&a^3-a^2b+ab^2+a^2b-ab^2+b^3\\
={}&a^3+b^3.
\end{aligned}
$$

（$-a^2b$ 與 $+a^2b$ 抵消，$+ab^2$ 與 $-ab^2$ 抵消。）

**立方差**：

$$
\begin{aligned}
&(a-b)(a^2+ab+b^2)\\
={}&a^3+a^2b+ab^2-a^2b-ab^2-b^3\\
={}&a^3-b^3.
\end{aligned}
$$

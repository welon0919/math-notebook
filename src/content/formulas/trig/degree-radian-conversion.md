---
subject: trig
order: 7
name: 度與弧度換算
latex: 180^\circ=\pi\ \text{弧度},\qquad 1^\circ=\dfrac{\pi}{180}\ \text{弧度},\qquad 1\ \text{弧度}=\dfrac{180^\circ}{\pi}\approx 57.3^\circ
note: 半徑 $r$、圓心角 $\theta$（弧度）的弧長 $s=r\theta$，扇形面積 $\dfrac{1}{2}r^2\theta$。
related: [special-angles, important-limits]
---

## 符號說明

- **弧度**：在半徑 $r$ 的圓上，圓心角 $\theta$ 所對的弧長為 $s$，定義 $\theta=\frac{s}{r}$ 弧度。弧度是長度的比值，所以常常省略單位不寫。
- $\pi\approx 3.14159$：圓周長和直徑的比。
- 弧長 $s=r\theta$、扇形面積 $\frac{1}{2}r^2\theta$，這兩個公式中的 $\theta$ **必須用弧度**。

## 使用時機

- **度和弧度互換**：乘以 $\frac{\pi}{180}$ 換成弧度，乘以 $\frac{180}{\pi}$ 換成度。
- 計算**弧長**和**扇形面積**。
- **微積分**中的三角函數一律用弧度，例如 $\lim\limits_{x\to 0}\frac{\sin x}{x}=1$ 只有在 $x$ 用弧度時才成立。

## 例題

**例題 1**　把 $150^\circ$ 換成弧度，把 $\frac{3\pi}{4}$ 換成度。

<details class="example-solution">
<summary>看解答</summary>

$$
\begin{aligned}
150^\circ&=150\cdot\frac{\pi}{180}=\frac{5\pi}{6},\\
\frac{3\pi}{4}&=\frac{3\pi}{4}\cdot\frac{180^\circ}{\pi}=135^\circ.
\end{aligned}
$$

**驗算**：$\frac{5\pi}{6}$ 是半圈 $\pi$ 的 $\frac{5}{6}$，而 $150^\circ$ 也是 $180^\circ$ 的 $\frac{5}{6}$；$\frac{3\pi}{4}$ 是半圈的 $\frac{3}{4}$，$180^\circ\times\frac{3}{4}=135^\circ$。

</details>

**例題 2**　半徑 $6$ 公分、圓心角 $120^\circ$ 的扇形，求弧長和面積。

<details class="example-solution">
<summary>看解答</summary>

先換成弧度：$120^\circ=\frac{2\pi}{3}$。

$$
\begin{aligned}
\text{弧長}&=r\theta=6\cdot\frac{2\pi}{3}\\
&=4\pi\approx 12.57\ \text{公分},\\
\text{面積}&=\frac{1}{2}r^2\theta=\frac{1}{2}\cdot 36\cdot\frac{2\pi}{3}\\
&=12\pi\approx 37.70\ \text{平方公分}.
\end{aligned}
$$

**驗算**：$120^\circ$ 是整圈的 $\frac{1}{3}$。圓周長 $2\pi\cdot 6=12\pi$ 的 $\frac{1}{3}$ 是 $4\pi$；圓面積 $\pi\cdot 6^2=36\pi$ 的 $\frac{1}{3}$ 是 $12\pi$。

</details>

## 推導

**換算**：整個圓的弧長是圓周長 $2\pi r$，所以一整圈的弧度是 $\frac{2\pi r}{r}=2\pi$。一整圈也是 $360^\circ$，因此

$$
360^\circ=2\pi\quad\Longrightarrow\quad 180^\circ=\pi.
$$

兩邊同除以 $180$ 得 $1^\circ=\frac{\pi}{180}$；兩邊同除以 $\pi$ 得 $1$ 弧度 $=\frac{180^\circ}{\pi}\approx 57.3^\circ$。

**弧長**：由弧度的定義 $\theta=\frac{s}{r}$，兩邊乘以 $r$ 得 $s=r\theta$。

**扇形面積**：扇形面積和圓心角成正比。圓心角 $2\pi$（整個圓）時面積是 $\pi r^2$，所以圓心角 $\theta$ 時

$$
\text{面積}=\pi r^2\cdot\frac{\theta}{2\pi}=\frac{1}{2}r^2\theta.
$$

---
subject: trig
order: 5
name: 海龍公式
statement: 三邊長為 $a,b,c$ 的三角形，面積 $\Delta=\sqrt{s(s-a)(s-b)(s-c)}$，其中 $s=\dfrac{a+b+c}{2}$ 是半周長。
note: 只要知道三邊長就能求面積，不必先求角或高。
proofType: full
related: [triangle-area, law-of-cosines, pythagorean-theorem]
---

## 白話解釋

三邊長決定了一個三角形（SSS 全等），所以面積一定能只用三邊算出來。海龍公式就是這個算法：先算半周長 $s$，再把 $s$、$s-a$、$s-b$、$s-c$ 四個數相乘、開根號。

四個數都是正的：三角形任兩邊之和大於第三邊，例如 $b+c>a$，所以 $s-a=\frac{b+c-a}{2}>0$。如果三個長度不能圍成三角形，其中一個因數會是 $0$ 或負數，公式也就給不出正的面積。

## 使用時機

- 只知道**三邊長**，求面積。
- 已知三邊，求某一邊上的**高**：先用海龍公式求面積，再由 $\Delta=\frac12\times\text{底}\times\text{高}$ 反求。
- 求**內切圓半徑**：$r=\dfrac{\Delta}{s}$（三角形從內心切成三塊，面積和是 $\frac12r(a+b+c)=rs$）。

## 例題

**例題 1**　三邊長為 $5$、$6$、$7$ 的三角形，求面積和最短邊上的高。

<details class="example-solution">
<summary>看解答</summary>

$s=\frac{5+6+7}{2}=9$，

$$
\Delta=\sqrt{9\cdot4\cdot3\cdot2}=\sqrt{216}=6\sqrt6.
$$

最短邊是 $5$，由 $\frac12\cdot5\cdot h=6\sqrt6$ 得 $h=\frac{12\sqrt6}{5}$。

**驗算**：最長邊 $7$ 的對角 $C$ 滿足 $\cos C=\frac{25+36-49}{60}=\frac15$，$\sin C=\frac{2\sqrt6}{5}$，$\frac12\cdot5\cdot6\cdot\frac{2\sqrt6}{5}=6\sqrt6$。

</details>

**例題 2**　三邊長為 $13$、$14$、$15$ 的三角形，求內切圓半徑。

<details class="example-solution">
<summary>看解答</summary>

$s=21$，

$$
\Delta=\sqrt{21\cdot8\cdot7\cdot6}=\sqrt{7056}=84.
$$

$r=\frac{\Delta}{s}=\frac{84}{21}=4$。

</details>

## 證明

由兩邊夾一角的面積公式 $\Delta=\frac12ab\sin C$。三角形中 $0<C<180^\circ$，所以 $\sin C>0$，$\sin^2C=1-\cos^2C$；由餘弦定理 $\cos C=\frac{a^2+b^2-c^2}{2ab}$。把面積平方再乘以 $16$：

$$
\begin{aligned}
16\Delta^2&=4a^2b^2\sin^2C\\
&=4a^2b^2-4a^2b^2\cos^2C\\
&=(2ab)^2-(a^2+b^2-c^2)^2.
\end{aligned}
$$

用平方差公式 $p^2-q^2=(p-q)(p+q)$：

$$
\begin{aligned}
16\Delta^2&=\big(2ab-a^2-b^2+c^2\big)\\
&\quad\cdot\big(2ab+a^2+b^2-c^2\big)\\
&=\big(c^2-(a-b)^2\big)\big((a+b)^2-c^2\big).
\end{aligned}
$$

兩個括號又各是平方差：

$$
\begin{aligned}
16\Delta^2&=(c-a+b)(c+a-b)\\
&\quad\cdot(a+b-c)(a+b+c).
\end{aligned}
$$

因為 $a+b+c=2s$，四個因式分別是 $2(s-a)$、$2(s-b)$、$2(s-c)$、$2s$，乘積為 $16\,s(s-a)(s-b)(s-c)$。兩邊除以 $16$ 再開根號（$\Delta>0$）：

$$
\Delta=\sqrt{s(s-a)(s-b)(s-c)}.
$$

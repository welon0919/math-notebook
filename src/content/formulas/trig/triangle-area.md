---
subject: trig
order: 8
name: 三角形面積
latex: \begin{aligned}\Delta&=\dfrac{1}{2}ab\sin C\\ \Delta&=\sqrt{s(s-a)(s-b)(s-c)}\\ s&=\dfrac{a+b+c}{2}\end{aligned}
note: 第一式用兩邊夾一角；第二式為海龍公式，只需三邊長。
related: [law-of-sines, law-of-cosines, pythagorean-theorem]
---

## 符號說明

- $a,b,c$：三角形的三邊長，分別是 $\angle A$、$\angle B$、$\angle C$ 的**對邊**。
- $\Delta$：三角形面積。
- $s=\frac{a+b+c}{2}$：周長的一半（半周長）。
- 第二個公式 $\sqrt{s(s-a)(s-b)(s-c)}$ 稱為**海龍公式**。

## 使用時機

- 已知**兩邊和夾角**，求面積：$\frac{1}{2}ab\sin C$。
- 只知道**三邊長**，求面積：海龍公式。
- 已知面積，**反求**某個角或某一邊。

## 例題

**例題 1**　$\triangle ABC$ 中，$a=5$、$b=8$、$C=60^\circ$，求面積。

<details class="example-solution">
<summary>看解答</summary>

$$
\begin{aligned}\Delta&=\frac{1}{2}ab\sin C=\frac{1}{2}\cdot 5\cdot 8\cdot\frac{\sqrt{3}}{2}\\&=10\sqrt{3}.\end{aligned}
$$

**驗算**：用餘弦定理求第三邊，$c^2=25+64-2\cdot 5\cdot 8\cdot\frac{1}{2}=49$，$c=7$。再用海龍公式：$s=\frac{5+8+7}{2}=10$，

$$
\Delta=\sqrt{10\cdot 5\cdot 2\cdot 3}=\sqrt{300}=10\sqrt{3}.
$$

</details>

**例題 2**　三邊長為 $13$、$14$、$15$ 的三角形，求面積。

<details class="example-solution">
<summary>看解答</summary>

$s=\frac{13+14+15}{2}=21$，

$$
\Delta=\sqrt{21\cdot 8\cdot 7\cdot 6}=\sqrt{7056}=84.
$$

**驗算**：以 $14$ 為底，從對面頂點作高 $h$，高把底邊分成 $x$ 和 $14-x$。由畢氏定理 $13^2-x^2=15^2-(14-x)^2$，解得 $x=5$，$h=\sqrt{13^2-5^2}=12$。面積 $=\frac{1}{2}\cdot 14\cdot 12=84$。

</details>

## 推導

**兩邊夾角**：以 $a$（邊 $BC$）為底，從 $A$ 向直線 $BC$ 作高 $h$。

- 若 $C$ 是銳角，高、邊 $b$ 和底邊構成直角三角形，$\sin C=\frac{h}{b}$，所以 $h=b\sin C$。
- 若 $C$ 是鈍角，高落在 $BC$ 的延長線上，直角三角形中的角是 $180^\circ-C$，所以 $h=b\sin(180^\circ-C)=b\sin C$。
- 若 $C=90^\circ$，$h=b=b\sin 90^\circ$。

三種情形都有 $h=b\sin C$，所以 $\Delta=\frac{1}{2}ah=\frac{1}{2}ab\sin C$。

**海龍公式**：在三角形中 $\sin C>0$，所以 $\sin C=\sqrt{1-\cos^2 C}$；由餘弦定理 $\cos C=\frac{a^2+b^2-c^2}{2ab}$。把面積平方再乘以 $16$：

$$
\begin{aligned}
16\Delta^2&=4a^2b^2\sin^2 C\\
&=4a^2b^2-4a^2b^2\cos^2 C\\
&=(2ab)^2-(a^2+b^2-c^2)^2.
\end{aligned}
$$

用平方差公式 $p^2-q^2=(p-q)(p+q)$，再分別用乘法公式整理：

$$
\begin{aligned}
16\Delta^2&=\big(2ab-a^2-b^2+c^2\big)\\
&\quad\cdot\big(2ab+a^2+b^2-c^2\big)\\
&=\big(c^2-(a-b)^2\big)\big((a+b)^2-c^2\big)\\
&=(c-a+b)(c+a-b)\\
&\quad\cdot(a+b-c)(a+b+c).
\end{aligned}
$$

因為 $a+b+c=2s$，四個因式分別是 $2(s-a)$、$2(s-b)$、$2(s-c)$、$2s$，乘積為 $16\,s(s-a)(s-b)(s-c)$。兩邊除以 $16$ 再開根號（$\Delta>0$）：

$$
\Delta=\sqrt{s(s-a)(s-b)(s-c)}.
$$

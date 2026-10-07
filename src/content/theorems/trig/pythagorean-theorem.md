---
subject: trig
order: 1
name: 畢氏定理
statement: 直角三角形中，兩股 $a,b$ 與斜邊 $c$ 滿足 $a^2+b^2=c^2$。
note: 以兩股為邊的正方形面積相加，剛好等於以斜邊為邊的正方形面積。
proofType: full
related: [law-of-cosines, pythagorean-identities, special-angles]
---

## 白話解釋

在直角三角形中，以兩股為邊各畫一個正方形，這兩個正方形的面積加起來，剛好等於以斜邊為邊的正方形面積。

反過來也對（**畢氏定理的逆定理**）：如果三邊滿足 $a^2+b^2=c^2$，那麼 $c$ 所對的角就是直角。這可以由餘弦定理看出：$c^2=a^2+b^2-2ab\cos C$ 和 $a^2+b^2=c^2$ 比較，得 $\cos C=0$，而三角形的內角在 $0^\circ$ 到 $180^\circ$ 之間，所以 $C=90^\circ$。

## 使用時機

- 直角三角形中，已知**兩邊求第三邊**。
- **坐標平面上兩點的距離**：$A(x_1,y_1)$、$B(x_2,y_2)$ 的距離是 $\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$，就是以橫向差、縱向差為兩股的直角三角形斜邊。
- 用逆定理**判斷**一個三角形是不是直角三角形。

## 例題

**例題 1**　一支 $5$ 公尺長的梯子靠在垂直的牆上，梯腳離牆 $3$ 公尺。梯子頂端離地多高？

<details class="example-solution">
<summary>看解答</summary>

牆、地面和梯子構成直角三角形，梯子是斜邊。設高度為 $h$：

$$
\begin{aligned}3^2+h^2&=5^2,\\ h^2&=25-9=16,\\ h&=4.\end{aligned}
$$

梯子頂端離地 $4$ 公尺。

**驗算**：$3^2+4^2=9+16=25=5^2$。

</details>

**例題 2**　求 $A(1,2)$ 與 $B(7,10)$ 兩點的距離。

<details class="example-solution">
<summary>看解答</summary>

橫向差 $7-1=6$，縱向差 $10-2=8$：

$$
\begin{aligned}AB&=\sqrt{6^2+8^2}=\sqrt{36+64}\\&=\sqrt{100}=10.\end{aligned}
$$

**驗算**：$6,8,10$ 是 $3,4,5$ 的兩倍，而 $3^2+4^2=5^2$，所以 $6^2+8^2=10^2$。

</details>

## 證明

設直角三角形的兩股為 $a$、$b$，斜邊為 $c$。

<figure class="proof-figure">
<svg viewBox="-16 -16 172 172" width="200" height="200" role="img" aria-label="邊長 a+b 的大正方形，四個角落各有一個兩股為 a、b 的直角三角形，中間圍出邊長 c 的正方形">
  <rect x="0" y="0" width="140" height="140" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <polygon points="50,0 140,50 90,140 0,90" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5"/>
  <g font-size="13" font-style="italic" fill="currentColor" text-anchor="middle">
    <text x="25" y="-4">a</text><text x="95" y="-4">b</text>
    <text x="150" y="29">a</text><text x="150" y="99">b</text>
    <text x="115" y="153">a</text><text x="45" y="153">b</text>
    <text x="-9" y="119">a</text><text x="-9" y="49">b</text>
    <text x="88" y="38">c</text><text x="102" y="94">c</text>
    <text x="52" y="106">c</text><text x="38" y="52">c</text>
  </g>
</svg>
</figure>

**排列**：畫一個邊長 $a+b$ 的大正方形。在每一邊上，從一個頂點量出 $a$（依同一個轉向），把相鄰兩邊上的分點連起來。這樣四個角落各得到一個直角三角形，它的兩股是 $a$ 和 $b$、夾角是正方形的直角，所以和原來的三角形全等（兩邊夾一角相等），斜邊都是 $c$。

**中間是正方形**：中間的四邊形四邊都是 $c$。看大正方形某一邊上的分點，那裡有三個角排成一直線（共 $180^\circ$）：兩側各是一個直角三角形的銳角，中間是四邊形的內角。這兩側的銳角，一個是 $a$ 的對角、一個是 $b$ 的對角；四個三角形全等，所以它們的和就等於一個直角三角形兩個銳角的和，也就是 $180^\circ-90^\circ=90^\circ$。因此四邊形的內角是 $180^\circ-90^\circ=90^\circ$。四邊相等、四個角都是直角，所以它是邊長 $c$ 的正方形。

**算面積**：大正方形的面積，等於四個直角三角形加上中間正方形：

$$
\begin{aligned}
(a+b)^2&=4\cdot\frac{1}{2}ab+c^2,\\
a^2+2ab+b^2&=2ab+c^2,\\
a^2+b^2&=c^2.
\end{aligned}
$$

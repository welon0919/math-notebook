---
subject: algebra
order: 1
name: 二次公式
latex: x=\dfrac{-b\pm\sqrt{b^2-4ac}}{2a}
note: 解 $ax^2+bx+c=0$（$a\neq 0$）。判別式 $D=b^2-4ac$：$D>0$ 兩相異實根、$D=0$ 重根、$D<0$ 無實根。
related: [vieta, multiplication-formulas]
---

## 符號說明

- $a,b,c$：一元二次方程式 $ax^2+bx+c=0$ 的係數，其中 $a\neq 0$（若 $a=0$，方程式就不是二次的）。
- $\pm$：「加或減」。取 $+$ 和取 $-$ 各得到一個根。
- $D=b^2-4ac$：**判別式**，就是根號裡的式子，它決定根的種類：
  - $D>0$：兩個相異實根
  - $D=0$：兩根相等（重根）
  - $D<0$：沒有實數根

## 使用時機

- 方程式不容易因式分解時，例如根是無理數，或係數很大。
- 只想知道「有幾個實根」時，算判別式就夠了；這也等於判斷拋物線 $y=ax^2+bx+c$ 和 $x$ 軸有幾個交點。
- 解可以化成二次的方程式，例如令 $t=x^2$，把 $x^4-5x^2+4=0$ 化成 $t^2-5t+4=0$。

## 例題

**例題 1**　解 $2x^2-3x-1=0$。

<details class="example-solution">
<summary>看解答</summary>

$a=2$，$b=-3$，$c=-1$。判別式

$$
\begin{aligned}D&=(-3)^2-4\cdot 2\cdot(-1)\\&=9+8=17>0,\end{aligned}
$$

所以有兩個相異實根：

$$
x=\frac{-(-3)\pm\sqrt{17}}{2\cdot 2}=\frac{3\pm\sqrt{17}}{4}.
$$

**驗算**：兩根相加為 $\dfrac{6}{4}=\dfrac{3}{2}$，等於 $-\dfrac{b}{a}=\dfrac{3}{2}$；兩根相乘為 $\dfrac{9-17}{16}=-\dfrac{1}{2}$，等於 $\dfrac{c}{a}=-\dfrac{1}{2}$。

</details>

**例題 2**　$k$ 為多少時，$x^2+kx+9=0$ 有重根？

<details class="example-solution">
<summary>看解答</summary>

有重根就是判別式為 $0$：

$$
D=k^2-4\cdot 1\cdot 9=k^2-36=0,
$$

所以 $k^2=36$，$k=6$ 或 $k=-6$。

**驗算**：$k=6$ 時 $x^2+6x+9=(x+3)^2$，重根 $x=-3$；$k=-6$ 時 $x^2-6x+9=(x-3)^2$，重根 $x=3$。

</details>

## 推導

用**配方法**。從 $ax^2+bx+c=0$ 出發：

1. 兩邊同除以 $a$（因為 $a\neq 0$，可以除）：
   $$
   x^2+\frac{b}{a}x+\frac{c}{a}=0.
   $$
2. 把常數項移到右邊：
   $$
   x^2+\frac{b}{a}x=-\frac{c}{a}.
   $$
3. 由乘法公式 $(x+m)^2=x^2+2mx+m^2$，取 $m=\frac{b}{2a}$，左邊只差 $m^2=\frac{b^2}{4a^2}$ 就是完全平方。兩邊同加 $\frac{b^2}{4a^2}$：
   $$
   \begin{aligned}\left(x+\frac{b}{2a}\right)^2&=\frac{b^2}{4a^2}-\frac{c}{a}\\&=\frac{b^2-4ac}{4a^2}.\end{aligned}
   $$
   （右邊通分：$\frac{c}{a}=\frac{4ac}{4a^2}$。）
4. 若 $b^2-4ac<0$：右邊是負數，但左邊是實數的平方，不可能是負的，所以**沒有實數根**。
5. 若 $b^2-4ac\ge 0$：一個數的平方等於 $k\ (k\ge 0)$，這個數就是 $\pm\sqrt{k}$，所以
   $$
   \begin{aligned}x+\frac{b}{2a}&=\pm\frac{\sqrt{b^2-4ac}}{\sqrt{4a^2}}\\&=\pm\frac{\sqrt{b^2-4ac}}{2|a|}.\end{aligned}
   $$
   因為前面有 $\pm$，分母寫 $2|a|$ 或 $2a$ 得到的是同樣兩個數，所以可以寫成 $\pm\frac{\sqrt{b^2-4ac}}{2a}$。
6. 把 $\frac{b}{2a}$ 移到右邊：
   $$
   x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}.
   $$

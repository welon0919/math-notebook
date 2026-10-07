---
subject: linear
order: 2
name: 向量長度
latex: '|\mathbf{v}|=\sqrt{\mathbf{v}\cdot\mathbf{v}}=\sqrt{v_1^2+v_2^2+\cdots+v_n^2}'
related: [dot-product, pythagorean-theorem]
---

## 符號說明

- $|\mathbf{v}|$：向量 $\mathbf{v}$ 的**長度**（大小），有些書寫成 $\|\mathbf{v}\|$。
- $v_1,\dots,v_n$：$\mathbf{v}$ 的分量。
- 長度為 $1$ 的向量叫做**單位向量**。

## 使用時機

- **兩點的距離**：$A$、$B$ 的距離就是向量 $\overrightarrow{AB}$ 的長度。
- **求單位向量**：$\frac{\mathbf{v}}{|\mathbf{v}|}$ 和 $\mathbf{v}$ 同方向、長度為 $1$。
- 搭配內積**求夾角**、**求投影**。

## 例題

**例題 1**　求 $\mathbf{v}=(2,-1,2)$ 的長度，以及同方向的單位向量。

<details class="example-solution">
<summary>看解答</summary>

$$
|\mathbf{v}|=\sqrt{2^2+(-1)^2+2^2}=\sqrt{9}=3.
$$

單位向量是 $\frac{\mathbf{v}}{3}=\left(\frac{2}{3},-\frac{1}{3},\frac{2}{3}\right)$。

**驗算**：$\left(\frac{2}{3}\right)^2+\left(\frac{1}{3}\right)^2+\left(\frac{2}{3}\right)^2=\frac{4+1+4}{9}=1$。

</details>

**例題 2**　求 $A(1,2,3)$ 與 $B(4,6,3)$ 的距離。

<details class="example-solution">
<summary>看解答</summary>

$\overrightarrow{AB}=(4-1,\,6-2,\,3-3)=(3,4,0)$：

$$
AB=\sqrt{3^2+4^2+0^2}=\sqrt{25}=5.
$$

**驗算**：$z$ 坐標相同，兩點在同一個水平面上，平面上橫向差 $3$、縱向差 $4$，是 $3$-$4$-$5$ 直角三角形。

</details>

## 推導

**二維**：$\mathbf{v}=(v_1,v_2)$ 從原點畫出，和兩個坐標方向構成直角三角形，兩股長 $|v_1|$、$|v_2|$。由畢氏定理，$|\mathbf{v}|=\sqrt{v_1^2+v_2^2}$。

**三維**：$\mathbf{v}=(v_1,v_2,v_3)$。先看它在 $xy$ 平面上的影子 $(v_1,v_2,0)$，長度是 $\sqrt{v_1^2+v_2^2}$。影子、$\mathbf{v}$ 和鉛直方向的線段 $|v_3|$ 又構成直角三角形，再用一次畢氏定理：

$$
\begin{aligned}|\mathbf{v}|^2&=\left(\sqrt{v_1^2+v_2^2}\right)^2+v_3^2\\&=v_1^2+v_2^2+v_3^2.\end{aligned}
$$

**$n$ 維**：沿用同一個公式作為長度的定義。由內積的定義，$\mathbf{v}\cdot\mathbf{v}=v_1^2+\cdots+v_n^2$，所以 $|\mathbf{v}|=\sqrt{\mathbf{v}\cdot\mathbf{v}}$。

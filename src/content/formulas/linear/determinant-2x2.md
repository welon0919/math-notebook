---
subject: linear
order: 5
name: 二階行列式
latex: \det\begin{pmatrix}a&b\\ c&d\end{pmatrix}=\begin{vmatrix}a&b\\ c&d\end{vmatrix}=ad-bc
note: 絕對值等於兩個行向量張成的平行四邊形面積。
related: [inverse-2x2, determinant-properties, cross-product]
---

## 符號說明

- $\det A$ 或 $\begin{vmatrix}a&b\\ c&d\end{vmatrix}$：矩陣 $A=\begin{pmatrix}a&b\\ c&d\end{pmatrix}$ 的**行列式**。這裡的直線不是絕對值，行列式可以是負數。
- $ad-bc$：主對角線乘積減去副對角線乘積。

## 使用時機

- **判斷可逆**：$\det A\neq 0$ 時 $A$ 可逆，方程組有唯一解。
- **求面積**：$|\det A|$ 是兩個行向量 $(a,c)$、$(b,d)$ 張成的平行四邊形面積。
- **克拉瑪公式**：用行列式直接寫出二元一次方程組的解。

## 例題

**例題 1**　求 $(3,1)$ 與 $(1,2)$ 張成的平行四邊形面積。

<details class="example-solution">
<summary>看解答</summary>

把兩個向量當作行向量：

$$
\det\begin{pmatrix}3&1\\ 1&2\end{pmatrix}=3\cdot 2-1\cdot 1=5.
$$

面積是 $|5|=5$。

**驗算**：把兩向量補成三維 $(3,1,0)$、$(1,2,0)$，外積 $=(0,0,3\cdot 2-1\cdot 1)=(0,0,5)$，長度 $5$。

</details>

**例題 2**　用克拉瑪公式解 $\begin{cases}2x+3y=8\\ x-y=-1\end{cases}$。

<details class="example-solution">
<summary>看解答</summary>

$$
\begin{aligned}
D&=\begin{vmatrix}2&3\\ 1&-1\end{vmatrix}=-2-3=-5,\\
D_x&=\begin{vmatrix}8&3\\ -1&-1\end{vmatrix}=-8+3=-5,\\
D_y&=\begin{vmatrix}2&8\\ 1&-1\end{vmatrix}=-2-8=-10.
\end{aligned}
$$

$x=\frac{D_x}{D}=1$，$y=\frac{D_y}{D}=2$。

**驗算**：$2\cdot 1+3\cdot 2=8$，$1-2=-1$。

</details>

## 推導

**行列式從解方程組自然出現。** 解

$$
\begin{cases}ax+by=e\\ cx+dy=f\end{cases}
$$

把第一式乘以 $d$、第二式乘以 $b$，相減消去 $y$：

$$
(ad-bc)\,x=ed-bf.
$$

同理，第二式乘以 $a$、第一式乘以 $c$，相減消去 $x$：$(ad-bc)\,y=af-ce$。

- 若 $ad-bc\neq 0$，可以除，得到唯一解（這就是克拉瑪公式）。
- 若 $ad-bc=0$，左邊都變成 $0$，方程組不是無解就是無限多解。

所以 $ad-bc$ 決定方程組有沒有唯一解，把它命名為行列式。

**面積**：把行向量補成三維 $\mathbf{u}=(a,c,0)$、$\mathbf{v}=(b,d,0)$，由外積公式

$$
\mathbf{u}\times\mathbf{v}=(0,\ 0,\ ad-bc),
$$

長度 $|ad-bc|$，正是兩向量張成的平行四邊形面積。

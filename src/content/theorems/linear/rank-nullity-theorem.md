---
subject: linear
order: 1
name: 秩–零化度定理
statement: 若 $A$ 為 $m\times n$ 矩陣，則 $\operatorname{rank}A+\operatorname{nullity}A=n$。
note: 輸入空間的維度，等於「保留下來的維度」加上「被壓成零的維度」。
proofType: full
related: [invertible-matrix-theorem, characteristic-equation]
---

## 白話解釋

把 $m\times n$ 矩陣 $A$ 看成一個「機器」：輸入 $n$ 維向量 $\mathbf{x}$，輸出 $A\mathbf{x}$。輸入空間的 $n$ 個維度，會分成兩部分：

- **秩** $\operatorname{rank}A$：被**保留下來**的維度。在列梯形中，它等於領導元（pivot）的個數。
- **零化度** $\operatorname{nullity}A$：被**壓成零**的維度，也就是方程組 $A\mathbf{x}=\mathbf{0}$ 的解集合的維度。它等於自由變數的個數。

定理說兩者加起來剛好是 $n$：每一個變數不是領導變數，就是自由變數。

## 使用時機

- **算解集合的大小**：知道秩，就知道 $A\mathbf{x}=\mathbf{0}$ 有幾個自由變數，解集合是直線、平面還是更高維的空間。
- **反推秩**：知道零化度（例如找到了齊次方程組的所有解），就知道秩。
- **判斷唯一性**：方陣 $A$ 滿秩（$\operatorname{rank}A=n$）時零化度為 $0$，$A\mathbf{x}=\mathbf{0}$ 只有零解。

## 例題

**例題 1**　$A=\begin{pmatrix}1&2&3\\ 2&4&6\end{pmatrix}$，求 $\operatorname{rank}A$、$\operatorname{nullity}A$，以及 $A\mathbf{x}=\mathbf{0}$ 的所有解。

<details class="example-solution">
<summary>看解答</summary>

第二列減去第一列的 $2$ 倍：

$$
\begin{pmatrix}1&2&3\\ 0&0&0\end{pmatrix}.
$$

只有一個領導元（第一行），所以 $\operatorname{rank}A=1$；$x_2$、$x_3$ 是自由變數，$\operatorname{nullity}A=2$。$1+2=3$，等於行數 $n=3$。

由 $x_1=-2x_2-3x_3$，令 $x_2=s$、$x_3=t$：

$$
\mathbf{x}=s\begin{pmatrix}-2\\ 1\\ 0\end{pmatrix}+t\begin{pmatrix}-3\\ 0\\ 1\end{pmatrix},\quad s,t\in\mathbb{R}.
$$

**驗算**：$A(-2,1,0)^T=(-2+2,\ -4+4)=(0,0)$；$A(-3,0,1)^T=(-3+3,\ -6+6)=(0,0)$。

</details>

**例題 2**　$A$ 是 $3\times 5$ 矩陣，$\operatorname{rank}A=3$。$A\mathbf{x}=\mathbf{0}$ 的解集合是幾維？

<details class="example-solution">
<summary>看解答</summary>

由秩–零化度定理：

$$
\operatorname{nullity}A=n-\operatorname{rank}A=5-3=2.
$$

解集合是 $\mathbb{R}^5$ 中通過原點的一個**二維平面**。

**驗算**：例如 $A=\begin{pmatrix}1&0&0&1&0\\ 0&1&0&0&1\\ 0&0&1&1&1\end{pmatrix}$ 已是列梯形，有 $3$ 個領導元、$2$ 個自由變數（$x_4$、$x_5$），符合結果。

</details>

## 證明

這裡把 $\operatorname{rank}A$ 定義為 $A$ 化成**最簡列梯形**後領導元的個數，記為 $r$。

**第一步：列運算不改變解。** 三種列運算（交換兩列、某列乘非零數、某列加另一列的倍數）都可以用另一個列運算還原，所以 $A\mathbf{x}=\mathbf{0}$ 和化簡後的 $R\mathbf{x}=\mathbf{0}$ 有完全相同的解。

**第二步：數自由變數。** $R$ 的 $n$ 行中，有領導元的行有 $r$ 個，其餘 $n-r$ 行對應**自由變數**。在 $R\mathbf{x}=\mathbf{0}$ 中，每一個領導變數都可以用自由變數表示，自由變數則可以任意取值。

**第三步：找一組基底。** 對每一個自由變數 $x_j$，令 $x_j=1$、其他自由變數為 $0$，解出唯一的解 $\mathbf{s}_j$。這樣得到 $n-r$ 個解。

- **它們能組出所有解**：任取一解 $\mathbf{x}$，令 $\mathbf{y}=\mathbf{x}-\sum x_j\mathbf{s}_j$（對所有自由變數 $j$ 求和）。$\mathbf{y}$ 也是解，而且它的每個自由變數都是 $0$；自由變數決定了領導變數，所以 $\mathbf{y}$ 的領導變數也都是 $0$，$\mathbf{y}=\mathbf{0}$。因此 $\mathbf{x}=\sum x_j\mathbf{s}_j$。
- **它們線性獨立**：若 $\sum c_j\mathbf{s}_j=\mathbf{0}$，看第 $j$ 個自由變數的位置，只有 $\mathbf{s}_j$ 在那裡是 $1$，其餘都是 $0$，所以 $c_j=0$。

所以這 $n-r$ 個解構成解集合的一組基底，$\operatorname{nullity}A=n-r$，也就是

$$
\operatorname{rank}A+\operatorname{nullity}A=r+(n-r)=n.
$$

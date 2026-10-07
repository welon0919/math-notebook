---
subject: linear
order: 9
name: 特徵方程式
latex: \det(A-\lambda I)=0
note: 解出的 $\lambda$ 是特徵值；再解 $(A-\lambda I)\mathbf{x}=\mathbf{0}$ 的非零解，就是對應的特徵向量。
related: [trace-determinant-eigenvalues, invertible-matrix-theorem, spectral-theorem]
---

## 符號說明

- $\lambda$：**特徵值**，一個數。
- 若 $A\mathbf{x}=\lambda\mathbf{x}$ 且 $\mathbf{x}\neq\mathbf{0}$，$\mathbf{x}$ 稱為對應 $\lambda$ 的**特徵向量**：$A$ 作用在它上面，方向不變（或反向），只伸縮 $\lambda$ 倍。
- $I$：和 $A$ 同階的單位矩陣；$A-\lambda I$ 就是把 $A$ 的對角線元素都減去 $\lambda$。

## 使用時機

- **求特徵值**：解 $\det(A-\lambda I)=0$。
- **求特徵向量**：把每個特徵值代回，解 $(A-\lambda I)\mathbf{x}=\mathbf{0}$ 的非零解。
- **對角化**、計算 $A^k$，或判斷 $A$ 是否可逆（$0$ 是否為特徵值）。

## 例題

**例題 1**　求 $A=\begin{pmatrix}4&1\\ 2&3\end{pmatrix}$ 的特徵值與特徵向量。

<details class="example-solution">
<summary>看解答</summary>

$$
\begin{aligned}
\det(A-\lambda I)&=(4-\lambda)(3-\lambda)-2\\
&=\lambda^2-7\lambda+10\\
&=(\lambda-2)(\lambda-5).
\end{aligned}
$$

特徵值 $\lambda=2$、$\lambda=5$。

- $\lambda=5$：$A-5I=\begin{pmatrix}-1&1\\ 2&-2\end{pmatrix}$，方程式 $-x+y=0$，特徵向量 $t(1,1)$，$t\neq 0$。
- $\lambda=2$：$A-2I=\begin{pmatrix}2&1\\ 2&1\end{pmatrix}$，方程式 $2x+y=0$，特徵向量 $t(1,-2)$，$t\neq 0$。

**驗算**：$A\begin{pmatrix}1\\ 1\end{pmatrix}=\begin{pmatrix}5\\ 5\end{pmatrix}=5\begin{pmatrix}1\\ 1\end{pmatrix}$；$A\begin{pmatrix}1\\ -2\end{pmatrix}=\begin{pmatrix}2\\ -4\end{pmatrix}=2\begin{pmatrix}1\\ -2\end{pmatrix}$。

</details>

**例題 2**　平面上逆時針旋轉 $90^\circ$ 的矩陣 $R=\begin{pmatrix}0&-1\\ 1&0\end{pmatrix}$ 有沒有實數特徵值？

<details class="example-solution">
<summary>看解答</summary>

$$
\det(R-\lambda I)=\begin{vmatrix}-\lambda&-1\\ 1&-\lambda\end{vmatrix}=\lambda^2+1.
$$

$\lambda^2+1=0$ 沒有實數解（複數解是 $\pm i$），所以**沒有實數特徵值**。

這和幾何直覺一致：旋轉 $90^\circ$ 後，每個非零向量的方向都改變了，沒有向量只被伸縮。

**驗算**：$R(1,0)=(0,1)$，和 $(1,0)$ 垂直，不是它的倍數；$R(x,y)=(-y,x)$，若等於 $\lambda(x,y)$，得 $x=-\lambda^2 x$、$y=-\lambda^2 y$，非零向量會推出 $\lambda^2=-1$。

</details>

## 推導

$\lambda\mathbf{x}=\lambda I\mathbf{x}$，所以

$$
A\mathbf{x}=\lambda\mathbf{x}\iff(A-\lambda I)\mathbf{x}=\mathbf{0}.
$$

$\lambda$ 是特徵值，表示這個方程式有**非零解**。由可逆矩陣定理，「$M\mathbf{x}=\mathbf{0}$ 有非零解」等價於「$\det M=0$」，取 $M=A-\lambda I$ 就得到特徵方程式 $\det(A-\lambda I)=0$。

**$2$ 階的直接驗證**：設 $M=\begin{pmatrix}p&q\\ r&s\end{pmatrix}$。

- 若 $\det M\neq 0$，$M$ 有反矩陣，$M\mathbf{x}=\mathbf{0}$ 兩邊左乘 $M^{-1}$ 得 $\mathbf{x}=\mathbf{0}$，沒有非零解。
- 若 $\det M=ps-qr=0$：當 $(p,q)\neq(0,0)$，取 $\mathbf{x}=(-q,p)$，則 $M\mathbf{x}=(-pq+qp,\ -rq+sp)=(0,0)$，是非零解；當 $(p,q)=(0,0)$ 而 $(r,s)\neq(0,0)$，取 $\mathbf{x}=(s,-r)$；當 $M$ 全是 $0$，任何向量都是解。

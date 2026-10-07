---
subject: linear
order: 7
name: 轉置與反矩陣
latex: \begin{aligned}(AB)^T&=B^TA^T\\ (AB)^{-1}&=B^{-1}A^{-1}\\ (A^T)^{-1}&=(A^{-1})^T\end{aligned}
note: 乘積的轉置與反矩陣，順序都要反過來。
related: [inverse-2x2, determinant-properties, spectral-theorem]
---

## 符號說明

- $A^T$：$A$ 的**轉置**，把列和行對調，$(A^T)_{ij}=a_{ji}$。
- $A^{-1}$：$A$ 的反矩陣。後兩式需要 $A$、$B$ 都是可逆的同階方陣；第一式只要 $AB$ 能相乘。
- 重點：乘積取轉置或反矩陣，**順序要反過來**。

## 使用時機

- **化簡**矩陣式子，例如 $(A^TB)^T=B^TA$。
- **解矩陣方程式**：$AB\mathbf{x}=\mathbf{c}$ 的解是 $\mathbf{x}=B^{-1}A^{-1}\mathbf{c}$。
- **證明對稱性**：例如證明 $A^TA$ 一定是對稱矩陣。

## 例題

**例題 1**　設 $A=\begin{pmatrix}1&2\\ 3&4\end{pmatrix}$、$B=\begin{pmatrix}0&1\\ 1&0\end{pmatrix}$，驗證 $(AB)^T=B^TA^T$，並比較 $A^TB^T$。

<details class="example-solution">
<summary>看解答</summary>

$$
\begin{aligned}AB&=\begin{pmatrix}2&1\\ 4&3\end{pmatrix},\\ (AB)^T&=\begin{pmatrix}2&4\\ 1&3\end{pmatrix}.\end{aligned}
$$

$B^T=B$，$A^T=\begin{pmatrix}1&3\\ 2&4\end{pmatrix}$：

$$
\begin{aligned}B^TA^T&=\begin{pmatrix}2&4\\ 1&3\end{pmatrix},\\ A^TB^T&=\begin{pmatrix}3&1\\ 4&2\end{pmatrix}.\end{aligned}
$$

$B^TA^T$ 和 $(AB)^T$ 相同；順序沒有反過來的 $A^TB^T$ 則不同。

**驗算**：$B^TA^T$ 第一列 $=(0\cdot 1+1\cdot 2,\ 0\cdot 3+1\cdot 4)=(2,4)$，第二列 $=(1\cdot 1+0\cdot 2,\ 1\cdot 3+0\cdot 4)=(1,3)$。

</details>

**例題 2**　證明對任何矩陣 $A$，$A^TA$ 是對稱矩陣（$M^T=M$）。

<details class="example-solution">
<summary>看解答</summary>

用轉置的乘積公式，再用 $(A^T)^T=A$：

$$
(A^TA)^T=A^T(A^T)^T=A^TA.
$$

所以 $A^TA$ 等於自己的轉置，是對稱矩陣。

**驗算**：$A=\begin{pmatrix}1&2\\ 3&4\end{pmatrix}$ 時 $A^TA=\begin{pmatrix}10&14\\ 14&20\end{pmatrix}$，確實對稱。

</details>

## 推導

**$(AB)^T=B^TA^T$**：比較兩邊第 $i$ 列第 $j$ 行的元素。

- 左邊：$(AB)^T$ 的 $(i,j)$ 元素是 $AB$ 的 $(j,i)$ 元素，等於 $\sum_k a_{jk}b_{ki}$。
- 右邊：$(B^TA^T)_{ij}=\sum_k (B^T)_{ik}(A^T)_{kj}=\sum_k b_{ki}a_{jk}$。

每一項都相同（數字相乘可以交換），所以兩邊相等。

**$(AB)^{-1}=B^{-1}A^{-1}$**：只要檢查 $B^{-1}A^{-1}$ 和 $AB$ 相乘得 $I$。用矩陣乘法的結合律：

$$
\begin{aligned}(AB)(B^{-1}A^{-1})&=A(BB^{-1})A^{-1}\\&=AIA^{-1}\\&=AA^{-1}=I,\end{aligned}
$$

另一個順序 $(B^{-1}A^{-1})(AB)=B^{-1}(A^{-1}A)B=I$ 同理。

**$(A^T)^{-1}=(A^{-1})^T$**：用第一個公式，

$$
A^T(A^{-1})^T=(A^{-1}A)^T=I^T=I,
$$

另一個順序 $(A^{-1})^TA^T=(AA^{-1})^T=I$ 同理。所以 $(A^{-1})^T$ 就是 $A^T$ 的反矩陣。

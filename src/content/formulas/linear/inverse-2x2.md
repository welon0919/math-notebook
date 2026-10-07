---
subject: linear
order: 6
name: 二階反矩陣
latex: \begin{pmatrix}a&b\\ c&d\end{pmatrix}^{-1}=\dfrac{1}{ad-bc}\begin{pmatrix}d&-b\\ -c&a\end{pmatrix}
note: 需 $ad-bc\neq 0$：主對角線對調、副對角線變號，再除以行列式。
related: [determinant-2x2, transpose-inverse-rules, invertible-matrix-theorem]
---

## 符號說明

- $A^{-1}$：$A$ 的**反矩陣**，滿足 $AA^{-1}=A^{-1}A=I$。
- $I=\begin{pmatrix}1&0\\ 0&1\end{pmatrix}$：單位矩陣。
- 條件 $ad-bc\neq 0$：行列式不為 $0$ 時反矩陣才存在。
- 口訣：主對角線**對調**、副對角線**變號**，再除以行列式。

## 使用時機

- **解二元一次方程組**：$A\mathbf{x}=\mathbf{b}$ 的解是 $\mathbf{x}=A^{-1}\mathbf{b}$。
- **還原變換**：若 $A$ 代表平面上的一個線性變換，$A^{-1}$ 把它變回去。
- **判斷可逆**：算出 $ad-bc$ 就知道反矩陣存不存在。

## 例題

**例題 1**　求 $A=\begin{pmatrix}2&1\\ 5&3\end{pmatrix}$ 的反矩陣。

<details class="example-solution">
<summary>看解答</summary>

$\det A=2\cdot 3-1\cdot 5=1$：

$$
A^{-1}=\frac{1}{1}\begin{pmatrix}3&-1\\ -5&2\end{pmatrix}=\begin{pmatrix}3&-1\\ -5&2\end{pmatrix}.
$$

**驗算**：

$$
\begin{aligned}&\begin{pmatrix}2&1\\ 5&3\end{pmatrix}\begin{pmatrix}3&-1\\ -5&2\end{pmatrix}\\={}&\begin{pmatrix}6-5&-2+2\\ 15-15&-5+6\end{pmatrix}=I.\end{aligned}
$$

</details>

**例題 2**　用反矩陣解 $\begin{cases}2x+y=4\\ 5x+3y=11\end{cases}$。

<details class="example-solution">
<summary>看解答</summary>

係數矩陣就是例題 1 的 $A$，所以

$$
\begin{aligned}\begin{pmatrix}x\\ y\end{pmatrix}&=A^{-1}\begin{pmatrix}4\\ 11\end{pmatrix}\\&=\begin{pmatrix}3\cdot 4-1\cdot 11\\ -5\cdot 4+2\cdot 11\end{pmatrix}=\begin{pmatrix}1\\ 2\end{pmatrix}.\end{aligned}
$$

**驗算**：$2\cdot 1+2=4$，$5\cdot 1+3\cdot 2=11$。

</details>

## 推導

令 $B=\begin{pmatrix}d&-b\\ -c&a\end{pmatrix}$，直接相乘：

$$
\begin{aligned}
AB&=\begin{pmatrix}ad-bc&-ab+ba\\ cd-dc&-cb+da\end{pmatrix}\\
&=(ad-bc)\,I.
\end{aligned}
$$

同樣算出 $BA=(ad-bc)\,I$。當 $ad-bc\neq 0$，兩邊除以 $ad-bc$：

$$
A\cdot\frac{B}{ad-bc}=\frac{B}{ad-bc}\cdot A=I,
$$

所以 $A^{-1}=\frac{1}{ad-bc}B$。

**$ad-bc=0$ 時沒有反矩陣**：這時 $AB=0$（零矩陣）。假設 $A^{-1}$ 存在，兩邊左乘 $A^{-1}$ 得 $B=A^{-1}\cdot 0=0$，也就是 $a=b=c=d=0$，$A$ 是零矩陣；但零矩陣乘任何矩陣都是零矩陣，不可能等於 $I$，矛盾。

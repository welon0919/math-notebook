---
subject: linear
order: 8
name: 行列式性質
latex: \begin{aligned}\det(AB)&=\det A\,\det B\\ \det(A^T)&=\det A\\ \det(A^{-1})&=\dfrac{1}{\det A}\\ \det(cA)&=c^n\det A\end{aligned}
note: $A$、$B$ 為 $n$ 階方陣。交換兩列行列式變號；某列乘 $k$ 倍行列式也乘 $k$ 倍。
related: [determinant-2x2, invertible-matrix-theorem, trace-determinant-eigenvalues]
---

## 符號說明

- $A$、$B$：$n$ 階方陣；$c$：一個數。
- $\det(cA)=c^n\det A$：$cA$ 的每一列都乘了 $c$，共 $n$ 列，所以是 $c^n$ 倍，不是 $c$ 倍。
- **列運算**對行列式的影響：交換兩列，行列式**變號**；某一列乘以 $k$，行列式乘以 $k$；某一列加上另一列的倍數，行列式**不變**。

## 使用時機

- **不展開就求行列式**：例如已知 $\det A$、$\det B$，求 $\det(A^{-1}B^2)$。
- **用列運算化成三角形**再求行列式：三角矩陣的行列式是對角線元素的乘積。
- **判斷可逆**：$\det(AB)=\det A\det B$，所以 $AB$ 可逆若且唯若 $A$、$B$ 都可逆。

## 例題

**例題 1**　$A$、$B$ 為 $3$ 階方陣，$\det A=3$、$\det B=-2$。求 $\det(AB)$、$\det(2A)$、$\det(A^{-1})$、$\det(A^TB^2)$。

<details class="example-solution">
<summary>看解答</summary>

$$
\begin{aligned}
\det(AB)&=3\cdot(-2)=-6,\\
\det(2A)&=2^3\cdot 3=24,\\
\det(A^{-1})&=\frac{1}{3},\\
\det(A^TB^2)&=\det A\cdot(\det B)^2\\
&=3\cdot 4=12.
\end{aligned}
$$

**驗算**：取 $A=\operatorname{diag}(3,1,1)$、$B=\operatorname{diag}(-2,1,1)$（對角矩陣，行列式是對角線乘積），直接相乘可得 $\det(AB)=\det\operatorname{diag}(-6,1,1)=-6$，$\det(2A)=6\cdot 2\cdot 2=24$，其餘也相符。

</details>

**例題 2**　用列運算求 $\det\begin{pmatrix}1&2&3\\ 2&5&7\\ 1&3&5\end{pmatrix}$。

<details class="example-solution">
<summary>看解答</summary>

「某一列加上另一列的倍數」不改變行列式。第二列減第一列的 $2$ 倍，第三列減第一列：

$$
\begin{pmatrix}1&2&3\\ 0&1&1\\ 0&1&2\end{pmatrix}.
$$

第三列再減第二列：

$$
\begin{pmatrix}1&2&3\\ 0&1&1\\ 0&0&1\end{pmatrix}.
$$

上三角矩陣的行列式是對角線乘積：$1\cdot 1\cdot 1=1$。

**驗算**：沿第一列展開，$1(25-21)-2(10-7)+3(6-5)=4-6+3=1$。

</details>

## 推導

一般 $n$ 階的證明需要行列式的一般定義（大一線性代數），這裡在 $2$ 階完整驗證，說明公式的來由。設 $A=\begin{pmatrix}a&b\\ c&d\end{pmatrix}$、$B=\begin{pmatrix}e&f\\ g&h\end{pmatrix}$。

**$\det(AB)=\det A\det B$**：$AB=\begin{pmatrix}ae+bg&af+bh\\ ce+dg&cf+dh\end{pmatrix}$。

$$
\begin{aligned}
&\det(AB)\\
={}&(ae+bg)(cf+dh)\\
&-(af+bh)(ce+dg)\\
={}&adeh+bcfg-adfg-bceh\\
={}&ad(eh-fg)-bc(eh-fg)\\
={}&(ad-bc)(eh-fg).
\end{aligned}
$$

（第二行：展開後 $acef$ 和 $bdgh$ 各出現一次正、一次負，互相抵消。）

**$\det(A^T)=\det A$**：$A^T=\begin{pmatrix}a&c\\ b&d\end{pmatrix}$，行列式 $ad-cb$，和 $\det A$ 相同。

**$\det(A^{-1})=\frac{1}{\det A}$**：由第一式，$\det A\cdot\det(A^{-1})=\det(AA^{-1})=\det I=1$。

**$\det(cA)=c^n\det A$**：$2$ 階時 $\det(cA)=(ca)(cd)-(cb)(cc)=c^2(ad-bc)$。一般 $n$ 階，行列式對每一列都是「一次」的，每一列提出一個 $c$，共提出 $c^n$。

**列加倍數不變**：$\begin{vmatrix}a&b\\ c+ka&d+kb\end{vmatrix}=a(d+kb)-b(c+ka)=ad-bc$。

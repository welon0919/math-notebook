---
subject: linear
order: 10
name: 跡與行列式
latex: \begin{aligned}\operatorname{tr}A&=\lambda_1+\lambda_2+\cdots+\lambda_n\\ \det A&=\lambda_1\lambda_2\cdots\lambda_n\end{aligned}
note: 跡是主對角線元素和。特徵值依重數計算（可能是複數）。
related: [characteristic-equation, determinant-properties, vieta]
---

## 符號說明

- $\operatorname{tr}A$：$A$ 的**跡**，主對角線元素的和 $a_{11}+a_{22}+\cdots+a_{nn}$。
- $\lambda_1,\dots,\lambda_n$：$A$ 的 $n$ 個特徵值，依**重數**計算（重根算兩次），可能是複數。

## 使用時機

- **檢查**算出來的特徵值：加起來要等於跡、乘起來要等於行列式。
- **$2$ 階矩陣快速求特徵值**：特徵值是 $\lambda^2-(\operatorname{tr}A)\lambda+\det A=0$ 的兩根。
- **判斷性質**：$\det A=0$ 表示有特徵值是 $0$，$A$ 不可逆。

## 例題

**例題 1**　驗證 $A=\begin{pmatrix}4&1\\ 2&3\end{pmatrix}$ 的特徵值 $2$、$5$ 符合公式。

<details class="example-solution">
<summary>看解答</summary>

$$
\begin{aligned}\operatorname{tr}A&=4+3=7=2+5,\\ \det A&=12-2=10=2\cdot 5.\end{aligned}
$$

兩個等式都成立。

**驗算**：特徵方程式 $\lambda^2-7\lambda+10=(\lambda-2)(\lambda-5)$，根確實是 $2$、$5$。

</details>

**例題 2**　求 $A=\begin{pmatrix}3&1\\ 1&3\end{pmatrix}$ 的特徵值。

<details class="example-solution">
<summary>看解答</summary>

$\operatorname{tr}A=6$、$\det A=9-1=8$。特徵值是兩數，和為 $6$、積為 $8$，也就是

$$
\lambda^2-6\lambda+8=(\lambda-2)(\lambda-4)=0,
$$

特徵值為 $2$ 和 $4$。

**驗算**：$A(1,-1)=(2,-2)=2(1,-1)$；$A(1,1)=(4,4)=4(1,1)$。

</details>

## 推導

**$2$ 階**：設 $A=\begin{pmatrix}a&b\\ c&d\end{pmatrix}$，展開特徵多項式：

$$
\begin{aligned}
&\det(A-\lambda I)\\
={}&(a-\lambda)(d-\lambda)-bc\\
={}&\lambda^2-(a+d)\lambda+(ad-bc).
\end{aligned}
$$

$\lambda_1$、$\lambda_2$ 是這個二次方程式的兩根，由根與係數關係：

$$
\begin{aligned}\lambda_1+\lambda_2&=a+d=\operatorname{tr}A,\\ \lambda_1\lambda_2&=ad-bc=\det A.\end{aligned}
$$

**$n$ 階**（概要）：由代數基本定理，$\det(\lambda I-A)=(\lambda-\lambda_1)\cdots(\lambda-\lambda_n)$。

- 代入 $\lambda=0$：左邊 $\det(-A)=(-1)^n\det A$，右邊 $(-1)^n\lambda_1\cdots\lambda_n$，所以 $\det A=\lambda_1\cdots\lambda_n$。
- 比較 $\lambda^{n-1}$ 的係數：右邊是 $-(\lambda_1+\cdots+\lambda_n)$；左邊展開行列式時，只有主對角線的乘積 $(\lambda-a_{11})\cdots(\lambda-a_{nn})$ 會產生 $\lambda^{n-1}$ 項（其他項至少少了兩個對角線因子），係數是 $-(a_{11}+\cdots+a_{nn})$。所以 $\operatorname{tr}A=\lambda_1+\cdots+\lambda_n$。

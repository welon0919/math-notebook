---
subject: algebra
order: 2
name: 乘法公式
latex: (a\pm b)^2=a^2\pm 2ab+b^2,\qquad (a+b)(a-b)=a^2-b^2
note: 平方展開與平方差，因式分解時反過來用。
related: [sum-difference-of-cubes, binomial-theorem, quadratic-formula]
---

## 符號說明

- $a,b$：任意實數，也可以是代數式（例如 $2x$、$3y$）。
- $\pm$：上下同號。$(a+b)^2$ 對應 $+2ab$，$(a-b)^2$ 對應 $-2ab$。
- $a^2-b^2$ 稱為**平方差**。

## 使用時機

- **展開**：快速展開 $(x+3)^2$、$(2x-y)^2$ 這類式子。
- **因式分解**：看到 $a^2\pm 2ab+b^2$（完全平方式）或 $a^2-b^2$（平方差）時，反過來寫成乘積。
- **心算**：把數字拆成「整數 $\pm$ 小數字」，例如 $49\times 51=(50-1)(50+1)$。

## 例題

**例題 1**　不用直式，計算 $98^2$ 與 $103\times 97$。

<details class="example-solution">
<summary>看解答</summary>

$$
\begin{aligned}98^2&=(100-2)^2\\&=100^2-2\cdot 100\cdot 2+2^2\\&=10000-400+4=9604.\end{aligned}
$$

$$
\begin{aligned}103\times 97&=(100+3)(100-3)\\&=100^2-3^2\\&=10000-9=9991.\end{aligned}
$$

**驗算**：$9604=98\times 98$（$98\times 100-98\times 2=9800-196=9604$）；$103\times 97=103\times 100-103\times 3=10300-309=9991$。

</details>

**例題 2**　因式分解 $4x^2-12x+9$ 與 $x^2-25y^2$。

<details class="example-solution">
<summary>看解答</summary>

$4x^2=(2x)^2$、$9=3^2$，而中間項 $-12x=-2\cdot(2x)\cdot 3$，所以這是完全平方式：

$$
\begin{aligned}&4x^2-12x+9\\={}&(2x)^2-2\cdot(2x)\cdot 3+3^2\\={}&(2x-3)^2.\end{aligned}
$$

$25y^2=(5y)^2$，所以是平方差：

$$
\begin{aligned}x^2-25y^2&=x^2-(5y)^2\\&=(x+5y)(x-5y).\end{aligned}
$$

**驗算**：$(2x-3)^2=4x^2-12x+9$；$(x+5y)(x-5y)=x^2-5xy+5xy-25y^2=x^2-25y^2$。

</details>

## 推導

都只用到分配律和乘法交換律（$ab=ba$）。

**完全平方**：

$$
\begin{aligned}(a+b)^2&=(a+b)(a+b)\\&=a^2+ab+ba+b^2\\&=a^2+2ab+b^2.\end{aligned}
$$

把 $b$ 換成 $-b$，因為 $a(-b)=-ab$、$(-b)^2=b^2$：

$$
\begin{aligned}(a-b)^2&=a^2+2a(-b)+(-b)^2\\&=a^2-2ab+b^2.\end{aligned}
$$

**平方差**：

$$
\begin{aligned}(a+b)(a-b)&=a^2-ab+ba-b^2\\&=a^2-b^2,\end{aligned}
$$

因為 $-ab+ba=0$。

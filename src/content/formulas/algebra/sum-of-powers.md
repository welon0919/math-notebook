---
subject: algebra
order: 9
name: 自然數的次方和
latex: \begin{aligned}\sum_{k=1}^{n}k&=\dfrac{n(n+1)}{2}\\ \sum_{k=1}^{n}k^2&=\dfrac{n(n+1)(2n+1)}{6}\\ \sum_{k=1}^{n}k^3&=\left[\dfrac{n(n+1)}{2}\right]^2\end{aligned}
note: 前 $n$ 個正整數的和、平方和與立方和。立方和正好是 $1+2+\cdots+n$ 的平方。
related: [arithmetic-series, mathematical-induction]
---

## 符號說明

- $n$：正整數，加到第幾個數為止。
- $\displaystyle\sum_{k=1}^{n}k^2=1^2+2^2+\cdots+n^2$：$k$ 從 $1$ 跑到 $n$，把每個 $k^2$ 加起來。
- 例如 $n=3$：$1+2+3=6$，$1+4+9=14$，$1+8+27=36=6^2$。

## 使用時機

- 計算 $\displaystyle\sum_{k=1}^{n}(ak^2+bk+c)$ 這類多項式的和：先用 Σ 的性質拆成 $a\sum k^2+b\sum k+cn$，再代公式。
- 數列的一般項是 $k$ 的多項式時，例如 $1\cdot2+2\cdot3+\cdots+n(n+1)$，一般項 $k(k+1)=k^2+k$。
- 微積分中用長方形逼近 $y=x^2$ 下方的面積時，會用到平方和。

## 例題

**例題 1**　求 $1\cdot2+2\cdot3+\cdots+10\cdot11$。

<details class="example-solution">
<summary>看解答</summary>

一般項是 $k(k+1)=k^2+k$，$k$ 從 $1$ 到 $10$：

$$
\begin{aligned}
\sum_{k=1}^{10}(k^2+k)&=\sum_{k=1}^{10}k^2+\sum_{k=1}^{10}k\\
&=\frac{10\cdot11\cdot21}{6}+\frac{10\cdot11}{2}\\
&=385+55=440.
\end{aligned}
$$

**驗算**：$2+6+12+20+30+42+56+72+90+110=440$。

</details>

**例題 2**　求 $1^2+3^2+5^2+\cdots+19^2$。

<details class="example-solution">
<summary>看解答</summary>

這些是奇數的平方，第 $k$ 個奇數是 $2k-1$，$19=2\cdot10-1$，共 $10$ 項。展開 $(2k-1)^2=4k^2-4k+1$：

$$
\begin{aligned}
\sum_{k=1}^{10}(4k^2-4k+1)&=4\sum_{k=1}^{10}k^2-4\sum_{k=1}^{10}k+10\\
&=4\cdot385-4\cdot55+10\\
&=1540-220+10=1330.
\end{aligned}
$$

**驗算**：也可以用「全部平方和減去偶數的平方和」：$1^2+\cdots+20^2=\dfrac{20\cdot21\cdot41}{6}=2870$，偶數的平方和 $2^2+4^2+\cdots+20^2=4(1^2+\cdots+10^2)=1540$，相減得 $1330$。

</details>

## 推導

**和**：把 $1+2+\cdots+n$ 正著寫一次、倒著寫一次，上下相加每一對都是 $n+1$，共 $n$ 對，所以 $2S=n(n+1)$。這就是首項 $1$、末項 $n$ 的等差級數和。

**平方和**：利用相鄰兩個立方的差。由 $(k+1)^3=k^3+3k^2+3k+1$，

$$
(k+1)^3-k^3=3k^2+3k+1.
$$

把 $k=1,2,\dots,n$ 的這 $n$ 個等式全部相加。左邊是 $(2^3-1^3)+(3^3-2^3)+\cdots+\big((n+1)^3-n^3\big)$，中間的項一正一負全部抵消，只剩 $(n+1)^3-1$。右邊是 $3\sum k^2+3\sum k+n$。所以

$$
(n+1)^3-1=3\sum_{k=1}^{n}k^2+\frac{3n(n+1)}{2}+n.
$$

解出 $\sum k^2$：

$$
\begin{aligned}
3\sum_{k=1}^{n}k^2&=(n+1)^3-(n+1)-\frac{3n(n+1)}{2}\\
&=(n+1)\left[(n+1)^2-1-\frac{3n}{2}\right]\\
&=(n+1)\cdot\frac{2n^2+n}{2}=\frac{n(n+1)(2n+1)}{2},
\end{aligned}
$$

兩邊除以 $3$ 就得到公式。

**立方和**：用同樣的方法，由 $(k+1)^4-k^4=4k^3+6k^2+4k+1$ 相加，可以解出 $\sum k^3$。這裡改用數學歸納法驗證公式。

- $n=1$：左邊 $1$，右邊 $\left(\dfrac{1\cdot2}{2}\right)^2=1$，成立。
- 假設 $n=m$ 時成立，則
  $$
  \begin{aligned}
  \sum_{k=1}^{m+1}k^3&=\left[\frac{m(m+1)}{2}\right]^2+(m+1)^3\\
  &=\frac{(m+1)^2\left[m^2+4(m+1)\right]}{4}\\
  &=\frac{(m+1)^2(m+2)^2}{4}=\left[\frac{(m+1)(m+2)}{2}\right]^2,
  \end{aligned}
  $$
  正是 $n=m+1$ 時的公式。

由數學歸納法，立方和公式對所有正整數 $n$ 成立。

---
subject: algebra
order: 7
name: 等差級數和
latex: S_n=\dfrac{n(a_1+a_n)}{2}=\dfrac{n\left[2a_1+(n-1)d\right]}{2}
note: 首項 $a_1$、末項 $a_n$、公差 $d$，共 $n$ 項。
related: [geometric-series]
---

## 符號說明

- $a_1$：首項；$a_n$：第 $n$ 項（末項）；$d$：公差，也就是相鄰兩項的差 $a_{k+1}-a_k$。
- $n$：項數；$S_n$：前 $n$ 項的和 $a_1+a_2+\cdots+a_n$。
- 一般項 $a_n=a_1+(n-1)d$。

## 使用時機

- 加總**間隔固定**的數，例如 $1+2+\cdots+100$，或每個月比上個月多存固定金額。
- 已知首項、公差、項數，求總和；或反過來求項數、公差。
- 判斷和什麼時候最大或最小（當項由正變負時）。

## 例題

**例題 1**　求 $3+7+11+\cdots+99$。

<details class="example-solution">
<summary>看解答</summary>

首項 $a_1=3$，公差 $d=4$。先求項數：

$$
\begin{aligned}99&=3+(n-1)\cdot 4\\ n-1&=24\\ n&=25.\end{aligned}
$$

$$
S_{25}=\frac{25\,(3+99)}{2}=\frac{25\cdot 102}{2}=1275.
$$

**驗算**：用另一個公式 $S_n=\dfrac{n\left[2a_1+(n-1)d\right]}{2}=\dfrac{25\,(6+96)}{2}=1275$，相同。

</details>

**例題 2**　等差數列首項 $20$、公差 $-3$。前幾項的和最大？最大值是多少？

<details class="example-solution">
<summary>看解答</summary>

一般項 $a_n=20+(n-1)(-3)=23-3n$。

- 當 $a_n>0$，再加上這一項會讓和變大；當 $a_n<0$，再加上會讓和變小。
- $23-3n>0\iff n<\dfrac{23}{3}\approx 7.67$，所以第 1 到第 7 項是正的（$a_7=2$），從第 8 項起是負的（$a_8=-1$）。

因此前 **7** 項的和最大：

$$
S_7=\frac{7\,(a_1+a_7)}{2}=\frac{7\,(20+2)}{2}=77.
$$

**驗算**：$20+17+14+11+8+5+2=77$。

</details>

## 推導

把和正著寫一次、倒著寫一次：

$$
\begin{aligned}
S_n&=a_1+a_2+\cdots+a_{n-1}+a_n\\
S_n&=a_n+a_{n-1}+\cdots+a_2+a_1
\end{aligned}
$$

上下對齊相加，第 $k$ 個位置是 $a_k+a_{n+1-k}$。由一般項公式

$$
\begin{aligned}a_k&=a_1+(k-1)d,\\ a_{n+1-k}&=a_1+(n-k)d,\end{aligned}
$$

兩式相加：

$$
\begin{aligned}a_k+a_{n+1-k}&=2a_1+(n-1)d\\&=a_1+a_n,\end{aligned}
$$

所以每一對的和都等於 $a_1+a_n$，共 $n$ 對，所以

$$
\begin{aligned}2S_n&=n(a_1+a_n)\\ S_n&=\frac{n(a_1+a_n)}{2}.\end{aligned}
$$

再代入 $a_n=a_1+(n-1)d$，就得到 $S_n=\dfrac{n\left[2a_1+(n-1)d\right]}{2}$。

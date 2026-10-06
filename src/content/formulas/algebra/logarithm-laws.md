---
subject: algebra
order: 5
name: 對數律
latex: \log_a(xy)=\log_a x+\log_a y,\quad \log_a\dfrac{x}{y}=\log_a x-\log_a y,\quad \log_a x^r=r\log_a x
note: 底數 $a>0$、$a\neq 1$，真數 $x,y>0$。
related: [exponent-laws, change-of-base]
---

## 符號說明

- $\log_a x$：以 $a$ 為**底數**、$x$ 為**真數**的對數，意思是「$a$ 的幾次方等於 $x$」：
  $$
  \log_a x=y\iff a^y=x.
  $$
- 底數 $a>0$ 且 $a\neq 1$；真數 $x,y>0$；$r$ 為任意實數。
- $\log x$ 通常指 $\log_{10}x$（常用對數），$\ln x$ 指 $\log_e x$（自然對數）。

## 使用時機

- 把**乘除變成加減、次方變成乘法**，讓大數字的計算變簡單。
- **解指數方程式**：$2^x=5$ 的解就是 $x=\log_2 5$。
- **估計位數**：利用 $\log 2\approx 0.3010$ 估計 $2^{100}$ 有幾位數。

## 例題

**例題 1**　求 $\log_2 24-\log_2 3+\log_2\sqrt{2}$。

<details class="example-solution">
<summary>看解答</summary>

先用「相減變相除」，再用「次方提到前面」：

$$
\begin{aligned}\log_2 24-\log_2 3&=\log_2\frac{24}{3}\\&=\log_2 8=3,\\ \log_2\sqrt{2}&=\log_2 2^{\frac{1}{2}}\\&=\frac{1}{2}\log_2 2=\frac{1}{2}.\end{aligned}
$$

所以答案是 $3+\dfrac{1}{2}=\dfrac{7}{2}$。

**驗算**：$2^{\frac{7}{2}}=8\sqrt{2}$，而 $\dfrac{24}{3}\cdot\sqrt{2}=8\sqrt{2}$，兩者相同。

</details>

**例題 2**　已知 $\log 2\approx 0.3010$，$2^{100}$ 是幾位數？

<details class="example-solution">
<summary>看解答</summary>

一個正整數 $N$ 是 $k$ 位數，表示 $10^{k-1}\le N<10^k$，取常用對數就是 $k-1\le\log N<k$。

$$
\begin{aligned}\log 2^{100}&=100\log 2\\&\approx 100\times 0.3010=30.10.\end{aligned}
$$

所以 $30\le\log 2^{100}<31$，即 $10^{30}\le 2^{100}<10^{31}$，$2^{100}$ 是 **31 位數**。

（$\log 2$ 更精確是 $0.30103\ldots$，乘以 $100$ 是 $30.103\ldots$，離整數 $30$ 和 $31$ 都還很遠，所以四捨五入不影響答案。實際上 $2^{100}=1267650600228229401496703205376$，確實是 31 位。）

</details>

## 推導

設 $p=\log_a x$、$q=\log_a y$，依定義 $x=a^p$、$y=a^q$。

**乘法變加法**：由指數律 $a^pa^q=a^{p+q}$，

$$
\begin{aligned}xy&=a^{p+q},\\ \log_a(xy)&=p+q=\log_a x+\log_a y.\end{aligned}
$$

**除法變減法**：由指數律 $\dfrac{a^p}{a^q}=a^{p-q}$，

$$
\begin{aligned}\frac{x}{y}&=a^{p-q},\\ \log_a\frac{x}{y}&=p-q=\log_a x-\log_a y.\end{aligned}
$$

**次方變乘法**：由指數律 $(a^p)^r=a^{pr}$，

$$
\begin{aligned}x^r&=a^{pr},\\ \log_a x^r&=rp=r\log_a x.\end{aligned}
$$

每一組的第二行，都是由第一行用對數的定義得到：$a^{\square}=N$ 就表示 $\log_a N=\square$。

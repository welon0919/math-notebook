---
subject: algebra
order: 4
name: 指數律
latex: \begin{aligned}a^m a^n&=a^{m+n}\\ \dfrac{a^m}{a^n}&=a^{m-n}\\ (a^m)^n&=a^{mn}\\ (ab)^n&=a^n b^n\end{aligned}
note: $a,b>0$ 時對所有實數 $m,n$ 成立；另有 $a^0=1$、$a^{-n}=\dfrac{1}{a^n}$。
related: [logarithm-laws]
---

## 符號說明

- $a,b$：底數，這裡要求 $a,b>0$。
- $m,n$：指數，可以是任意實數。
- 特別規定：$a^0=1$，$a^{-n}=\dfrac{1}{a^n}$，$a^{\frac{p}{q}}=\sqrt[q]{a^p}$（$q$ 為正整數）。

## 使用時機

- **化簡**含指數的式子，例如 $\dfrac{2^5\cdot 4^3}{8^2}$。
- **解指數方程式**：把兩邊化成同一個底數，再比較指數。
- **科學記號**的乘除，例如 $(3\times 10^8)\times(2\times 10^{-3})=6\times 10^5$。

## 例題

**例題 1**　化簡 $\dfrac{2^5\cdot 4^3}{8^2}$。

<details class="example-solution">
<summary>看解答</summary>

把底數都化成 $2$：$4^3=(2^2)^3=2^6$，$8^2=(2^3)^2=2^6$。所以

$$
\frac{2^5\cdot 4^3}{8^2}=\frac{2^5\cdot 2^6}{2^6}=2^{5+6-6}=2^5=32.
$$

**驗算**：$\dfrac{32\cdot 64}{64}=32$。

</details>

**例題 2**　解 $4^x=8\sqrt{2}$。

<details class="example-solution">
<summary>看解答</summary>

兩邊都化成以 $2$ 為底：

$$
\begin{aligned}4^x&=(2^2)^x=2^{2x},\\ 8\sqrt{2}&=2^3\cdot 2^{\frac{1}{2}}=2^{\frac{7}{2}}.\end{aligned}
$$

函數 $y=2^t$ 是遞增的，不同的 $t$ 會得到不同的值，所以 $2^{2x}=2^{\frac{7}{2}}$ 表示指數相等：

$$
2x=\frac{7}{2}\quad\Longrightarrow\quad x=\frac{7}{4}.
$$

**驗算**：$4^{\frac{7}{4}}=2^{\frac{7}{2}}=2^3\cdot\sqrt{2}=8\sqrt{2}$。

</details>

## 推導

**正整數指數**：$a^n$ 表示 $n$ 個 $a$ 相乘。

- $a^m a^n$ 是 $m$ 個 $a$ 再乘 $n$ 個 $a$，共 $m+n$ 個，所以 $a^m a^n=a^{m+n}$。
- $(a^m)^n$ 是 $n$ 組、每組 $m$ 個 $a$，共 $mn$ 個，所以 $(a^m)^n=a^{mn}$。
- $(ab)^n$ 是 $n$ 個 $ab$ 相乘；乘法可以交換、結合，把 $a$ 集中、$b$ 集中，得 $a^n b^n$。
- 當 $m>n$，$\dfrac{a^m}{a^n}$ 分子分母約掉 $n$ 個 $a$，剩 $m-n$ 個，所以是 $a^{m-n}$。

**推廣到 $0$、負數、分數**：這些指數本來沒有「幾個相乘」的意思，所以用「讓指數律繼續成立」來規定它們的值。

- 要 $a^0\cdot a^n=a^{0+n}=a^n$ 成立，必須 $a^0=1$。
- 要 $a^{-n}\cdot a^n=a^0=1$ 成立，必須 $a^{-n}=\dfrac{1}{a^n}$。
- 要 $\left(a^{\frac{1}{q}}\right)^q=a^{\frac{1}{q}\cdot q}=a$ 成立，$a^{\frac{1}{q}}$ 必須是「$q$ 次方等於 $a$ 的正數」，也就是 $\sqrt[q]{a}$；再由 $(a^m)^n=a^{mn}$ 得 $a^{\frac{p}{q}}=\left(a^{\frac{1}{q}}\right)^p=\sqrt[q]{a^p}$。

指數是無理數（例如 $2^{\sqrt{2}}$）時，是用越來越接近它的分數指數來定義，指數律依然成立；這部分需要極限的概念，高中先接受這個結果即可。

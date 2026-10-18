---
subject: algebra
order: 10
name: 二項式定理
latex: (a+b)^n=\sum_{k=0}^{n}\binom{n}{k}a^{n-k}b^k
note: $n$ 為正整數，$\dbinom{n}{k}=\dfrac{n!}{k!\,(n-k)!}$。
related: [multiplication-formulas, taylor-series]
---

## 符號說明

- $n$：正整數，代表 $(a+b)$ 自乘的次數。
- $n!$（$n$ 階乘）$=1\times 2\times\cdots\times n$，並規定 $0!=1$。
- $\dbinom{n}{k}=\dfrac{n!}{k!\,(n-k)!}$：**二項式係數**，等於「從 $n$ 個東西中選出 $k$ 個」的方法數（高中課本也寫作 $C^n_k$）。
- $\displaystyle\sum_{k=0}^{n}$：把 $k=0,1,\dots,n$ 的各項加起來。

## 使用時機

- **展開** $(a+b)^n$，不用一個一個乘。
- **求特定項的係數**，例如 $(x+2)^5$ 中 $x^3$ 的係數，只要找出對應的那一項。
- **近似計算**：$1.01^{10}=(1+0.01)^{10}\approx 1+10(0.01)+45(0.01)^2=1.1045$，後面的項非常小。

## 例題

**例題 1**　求 $(x+2)^5$ 展開式中 $x^3$ 項的係數。

<details class="example-solution">
<summary>看解答</summary>

一般項是 $\dbinom{5}{k}x^{5-k}2^k$。要 $x$ 的次數是 $3$，即 $5-k=3$，$k=2$：

$$
\binom{5}{2}x^3\cdot 2^2=10\cdot 4\,x^3=40x^3.
$$

所以係數是 $40$。

**驗算**：$(x+2)^5=x^5+10x^4+40x^3+80x^2+80x+32$。

</details>

**例題 2**　求 $\left(2x-\dfrac{1}{x}\right)^6$ 展開式的常數項。

<details class="example-solution">
<summary>看解答</summary>

一般項是

$$
\begin{aligned}&\binom{6}{k}(2x)^{6-k}\left(-\frac{1}{x}\right)^k\\={}&\binom{6}{k}2^{6-k}(-1)^k x^{6-k}\cdot x^{-k}\\={}&\binom{6}{k}2^{6-k}(-1)^k x^{6-2k}.\end{aligned}
$$

常數項表示 $x$ 的次數是 $0$：$6-2k=0$，$k=3$。

$$
\binom{6}{3}2^{3}(-1)^3=20\cdot 8\cdot(-1)=-160.
$$

**驗算**：$k=3$ 時 $(2x)^3\left(-\dfrac{1}{x}\right)^3=8x^3\cdot\left(-\dfrac{1}{x^3}\right)=-8$，再乘 $\dbinom{6}{3}=20$ 得 $-160$。

</details>

## 推導

$(a+b)^n$ 是 $n$ 個 $(a+b)$ 相乘：

$$
(a+b)^n=\underbrace{(a+b)(a+b)\cdots(a+b)}_{n\text{ 個}}.
$$

用分配律展開時，每一項都是「從每個括號各挑 $a$ 或 $b$ 其中一個，再全部相乘」。如果恰好有 $k$ 個括號挑 $b$、其餘 $n-k$ 個挑 $a$，乘出來就是 $a^{n-k}b^k$。

所以 $a^{n-k}b^k$ 出現的次數，等於「從 $n$ 個括號中選出 $k$ 個來挑 $b$」的方法數，也就是 $\dbinom{n}{k}$。把 $k=0,1,\dots,n$ 的情形全部加起來，就得到

$$
(a+b)^n=\sum_{k=0}^{n}\binom{n}{k}a^{n-k}b^k.
$$

**為什麼 $\dbinom{n}{k}=\dfrac{n!}{k!\,(n-k)!}$**：從 $n$ 個中**依序**選 $k$ 個，有 $n(n-1)\cdots(n-k+1)=\dfrac{n!}{(n-k)!}$ 種；但同樣 $k$ 個東西的不同順序有 $k!$ 種，都對應同一種「選法」，所以要再除以 $k!$。

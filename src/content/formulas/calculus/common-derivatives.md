---
subject: calculus
order: 5
name: 常見導數
latex: \begin{aligned}(\sin x)'&=\cos x & (\cos x)'&=-\sin x\\ (\tan x)'&=\sec^2 x & (e^x)'&=e^x\\ (\ln x)'&=\dfrac{1}{x} & (a^x)'&=a^x\ln a\end{aligned}
related: [important-limits, chain-rule, product-quotient-rules]
---

## 符號說明

- $x$：三角函數中的 $x$ 一律用**弧度**。
- $e\approx 2.71828$：自然對數的底數；$\ln x=\log_e x$（$x>0$）。
- $a$：指數函數的底數，$a>0$、$a\neq 1$。

## 使用時機

- 這是微分的**基本表**，搭配乘法、除法法則和連鎖律，可以微分大部分常見函數。
- 描述**指數成長或衰減**：$y=e^{kx}$ 的變化率和自己成正比。
- 推導其他公式，例如 $(\tan x)'$、$(\log_a x)'=\frac{1}{x\ln a}$。

## 例題

**例題 1**　求 $\left(e^{2x}\sin x\right)'$。

<details class="example-solution">
<summary>看解答</summary>

乘法法則，其中 $(e^{2x})'=e^{2x}\cdot 2$（連鎖律）：

$$
\begin{aligned}
\left(e^{2x}\sin x\right)'&=2e^{2x}\sin x+e^{2x}\cos x\\
&=e^{2x}(2\sin x+\cos x).
\end{aligned}
$$

**驗算**：$x=0$ 時公式值為 $1\cdot(0+1)=1$；差商 $\frac{e^{0.0002}\sin 0.0001-0}{0.0001}\approx 1.0002$，接近 $1$。

</details>

**例題 2**　求 $\big(\ln(x^2+1)\big)'$，以及它在 $x=1$ 的值。

<details class="example-solution">
<summary>看解答</summary>

外層 $\ln u$（導數 $\frac{1}{u}$），內層 $u=x^2+1$（導數 $2x$）：

$$
\big(\ln(x^2+1)\big)'=\frac{1}{x^2+1}\cdot 2x=\frac{2x}{x^2+1}.
$$

$x=1$ 時為 $\frac{2}{2}=1$。

**驗算**：$h=0.0001$ 時，$1.0001^2+1=2.00020001$，差商 $\frac{\ln 2.00020001-\ln 2}{0.0001}\approx 1.0000$。

</details>

## 推導

**$\sin x$**：用正弦的和角公式，

$$
\begin{aligned}
&\frac{\sin(x+h)-\sin x}{h}\\
={}&\sin x\cdot\frac{\cos h-1}{h}+\cos x\cdot\frac{\sin h}{h}.
\end{aligned}
$$

由重要極限 $\frac{\sin h}{h}\to 1$。另外分子分母同乘 $\cos h+1$，並用 $\cos^2 h-1=-\sin^2 h$：

$$
\begin{aligned}\frac{\cos h-1}{h}&=-\frac{\sin h}{h}\cdot\frac{\sin h}{\cos h+1}\\&\to -1\cdot\frac{0}{2}=0.\end{aligned}
$$

所以 $(\sin x)'=\sin x\cdot 0+\cos x\cdot 1=\cos x$。

**$\cos x$**：同樣用和角公式，$\frac{\cos(x+h)-\cos x}{h}=\cos x\cdot\frac{\cos h-1}{h}-\sin x\cdot\frac{\sin h}{h}\to -\sin x$。

**$\tan x$**：用除法法則，見「乘法與除法法則」的例題 2。

**$e^x$**：

$$
\frac{e^{x+h}-e^x}{h}=e^x\cdot\frac{e^h-1}{h}.
$$

$e$ 這個數正是使 $\lim\limits_{h\to 0}\frac{e^h-1}{h}=1$ 的底數（這是 $e$ 的一種定義；它和 $\left(1+\frac{1}{n}\right)^n$ 的極限是同一個數，證明需要大一微積分的極限技巧）。所以 $(e^x)'=e^x$。

**$\ln x$**：設 $y=\ln x$，即 $e^y=x$。兩邊對 $x$ 微分，左邊用連鎖律（$\ln x$ 是可微函數 $e^y$ 的反函數，而 $e^y$ 的導數不為 $0$，所以 $\ln x$ 可微）：

$$
e^y\cdot y'=1\quad\Longrightarrow\quad y'=\frac{1}{e^y}=\frac{1}{x}.
$$

**$a^x$**：$a^x=e^{x\ln a}$，連鎖律得 $(a^x)'=e^{x\ln a}\cdot\ln a=a^x\ln a$。

---
subject: calculus
order: 3
name: 乘法與除法法則
latex: (fg)'=f'g+fg',\qquad \left(\dfrac{f}{g}\right)'=\dfrac{f'g-fg'}{g^2}
related: [chain-rule, integration-by-parts, common-derivatives]
---

## 符號說明

- $f,g$：在 $x$ 可微的函數，$f'$、$g'$ 是它們的導數。
- $(fg)'$：乘積 $f(x)g(x)$ 的導數；$\left(\frac{f}{g}\right)'$：商的導數，需要 $g(x)\neq 0$。
- 注意：乘積的導數**不是** $f'g'$。

## 使用時機

- 微分**兩個函數相乘**，例如 $x^2\sin x$、$xe^x$。
- 微分**分式**，例如 $\tan x=\frac{\sin x}{\cos x}$、$\frac{x+1}{x-1}$。
- 推導其他公式：分部積分就是乘法法則反過來用。

## 例題

**例題 1**　求 $(x^2\sin x)'$。

<details class="example-solution">
<summary>看解答</summary>

取 $f=x^2$、$g=\sin x$，$f'=2x$、$g'=\cos x$：

$$
(x^2\sin x)'=2x\sin x+x^2\cos x.
$$

**驗算**：$x=1$ 時公式值為 $2\sin 1+\cos 1\approx 1.6829+0.5403=2.2232$；差商 $\frac{(1.0001)^2\sin(1.0001)-\sin 1}{0.0001}\approx 2.2234$，$h$ 越小越接近 $2.2232$。

</details>

**例題 2**　用除法法則證明 $(\tan x)'=\sec^2 x$。

<details class="example-solution">
<summary>看解答</summary>

$\tan x=\frac{\sin x}{\cos x}$，取 $f=\sin x$、$g=\cos x$，$f'=\cos x$、$g'=-\sin x$：

$$
\begin{aligned}
&(\tan x)'\\
={}&\frac{\cos x\cdot\cos x-\sin x\cdot(-\sin x)}{\cos^2 x}\\
={}&\frac{\cos^2 x+\sin^2 x}{\cos^2 x}\\
={}&\frac{1}{\cos^2 x}=\sec^2 x.
\end{aligned}
$$

**驗算**：$x=0$ 時 $\sec^2 0=1$，而 $y=\tan x$ 在原點的切線是 $y=x$，斜率確實是 $1$。

</details>

## 推導

**乘法法則**：在分子加一項、減一項 $f(x)g(x+h)$（總和不變）：

$$
\begin{aligned}
&f(x+h)g(x+h)-f(x)g(x)\\
={}&\big[f(x+h)-f(x)\big]g(x+h)\\
&+f(x)\big[g(x+h)-g(x)\big].
\end{aligned}
$$

除以 $h$ 後取 $h\to 0$：$\frac{f(x+h)-f(x)}{h}\to f'(x)$、$\frac{g(x+h)-g(x)}{h}\to g'(x)$，而 $g(x+h)\to g(x)$。所以 $(fg)'=f'g+fg'$。

最後一點成立的原因是「可微一定連續」：

$$
\begin{aligned}g(x+h)-g(x)&=h\cdot\frac{g(x+h)-g(x)}{h}\\&\to 0\cdot g'(x)=0.\end{aligned}
$$

**除法法則**：先求 $\frac{1}{g}$ 的導數。通分：

$$
\begin{aligned}&\frac{1}{h}\left(\frac{1}{g(x+h)}-\frac{1}{g(x)}\right)\\={}&-\frac{g(x+h)-g(x)}{h}\cdot\frac{1}{g(x+h)\,g(x)},\end{aligned}
$$

$h\to 0$ 時趨近 $-g'(x)\cdot\frac{1}{g(x)^2}$，所以 $\left(\frac{1}{g}\right)'=-\frac{g'}{g^2}$。再把 $\frac{f}{g}$ 看成 $f\cdot\frac{1}{g}$，用乘法法則：

$$
\left(\frac{f}{g}\right)'=\frac{f'}{g}-\frac{fg'}{g^2}=\frac{f'g-fg'}{g^2}.
$$

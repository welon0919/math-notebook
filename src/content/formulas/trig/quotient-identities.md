---
subject: trig
order: 3
name: 商數關係
latex: \begin{aligned}\tan\theta&=\dfrac{\sin\theta}{\cos\theta}\\ \cot\theta&=\dfrac{\cos\theta}{\sin\theta}\end{aligned}
related: [pythagorean-identities, special-angles]
---

## 符號說明

- $\tan\theta=\frac{\sin\theta}{\cos\theta}$ 需要 $\cos\theta\neq 0$。
- $\cot\theta=\frac{\cos\theta}{\sin\theta}$ 需要 $\sin\theta\neq 0$。
- 兩者都有定義時，$\cot\theta=\frac{1}{\tan\theta}$。

## 使用時機

- 已知 $\sin\theta$、$\cos\theta$，**求 $\tan\theta$**。
- 已知 $\tan\theta$，求只含 $\sin\theta$、$\cos\theta$ 的**分式**：分子分母同除以 $\cos\theta$，就換成 $\tan\theta$。
- 化簡時把所有函數**統一成 $\sin$ 和 $\cos$**。

## 例題

**例題 1**　已知 $\tan\theta=2$，求 $\dfrac{\sin\theta+\cos\theta}{\sin\theta-\cos\theta}$。

<details class="example-solution">
<summary>看解答</summary>

$\tan\theta$ 有定義，所以 $\cos\theta\neq 0$，可以把分子分母同除以 $\cos\theta$：

$$
\frac{\sin\theta+\cos\theta}{\sin\theta-\cos\theta}=\frac{\tan\theta+1}{\tan\theta-1}=\frac{2+1}{2-1}=3.
$$

**驗算**：取第一象限的角，$\sin\theta=\frac{2}{\sqrt{5}}$、$\cos\theta=\frac{1}{\sqrt{5}}$（比值為 $2$，平方和為 $1$），代入得 $\frac{3/\sqrt{5}}{1/\sqrt{5}}=3$。

</details>

**例題 2**　已知 $\tan\theta=-\frac{3}{4}$，且 $\theta$ 在第四象限，求 $\sin\theta$ 與 $\cos\theta$。

<details class="example-solution">
<summary>看解答</summary>

由平方關係 $\tan^2\theta+1=\frac{1}{\cos^2\theta}$：

$$
\begin{aligned}\frac{1}{\cos^2\theta}&=\frac{9}{16}+1=\frac{25}{16},\\ \cos^2\theta&=\frac{16}{25}.\end{aligned}
$$

第四象限的 $\cos$ 是正的，所以 $\cos\theta=\frac{4}{5}$。再由 $\tan\theta=\frac{\sin\theta}{\cos\theta}$：

$$
\sin\theta=\tan\theta\cdot\cos\theta=-\frac{3}{4}\cdot\frac{4}{5}=-\frac{3}{5}.
$$

**驗算**：$\frac{-3/5}{4/5}=-\frac{3}{4}$；$\left(-\frac{3}{5}\right)^2+\left(\frac{4}{5}\right)^2=1$；$\sin<0$、$\cos>0$，確實在第四象限。

</details>

## 推導

在單位圓上，角 $\theta$ 對應點 $P(x,y)$，定義 $\cos\theta=x$、$\sin\theta=y$、$\tan\theta=\frac{y}{x}$（$x\neq 0$）。直接代換：

$$
\tan\theta=\frac{y}{x}=\frac{\sin\theta}{\cos\theta}.
$$

$\cot\theta$ 定義為 $\frac{x}{y}$（$y\neq 0$），同理 $\cot\theta=\frac{\cos\theta}{\sin\theta}$。

在直角三角形中也可以這樣看：

$$
\tan\theta=\frac{\text{對邊}}{\text{鄰邊}}=\frac{\text{對邊}/\text{斜邊}}{\text{鄰邊}/\text{斜邊}}=\frac{\sin\theta}{\cos\theta}.
$$

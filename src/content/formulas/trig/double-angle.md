---
subject: trig
order: 5
name: 倍角公式
latex: \begin{aligned}\sin 2\theta&=2\sin\theta\cos\theta\\ \cos 2\theta&=\cos^2\theta-\sin^2\theta=1-2\sin^2\theta=2\cos^2\theta-1\\ \tan 2\theta&=\dfrac{2\tan\theta}{1-\tan^2\theta}\end{aligned}
note: 令和角公式中 $\alpha=\beta=\theta$ 即得。
related: [angle-sum, power-reduction, pythagorean-identities]
---

## 符號說明

- $\theta$：任意角；$2\theta$ 是它的兩倍。
- $\cos 2\theta$ 有三種寫法，看題目需要只含 $\sin$、只含 $\cos$，還是兩者都有。
- $\tan 2\theta$ 的公式需要 $\tan\theta$ 有定義，且 $\tan^2\theta\neq 1$。

## 使用時機

- 已知 $\sin\theta$、$\cos\theta$，求 **$2\theta$ 的三角函數值**。
- **化簡** $\sin\theta\cos\theta$：它等於 $\frac{1}{2}\sin 2\theta$。
- **解方程式**：例如 $\cos 2\theta=\cos\theta$，把 $\cos 2\theta$ 換成 $2\cos^2\theta-1$，就變成 $\cos\theta$ 的二次方程式。

## 例題

**例題 1**　已知 $\sin\theta=\frac{3}{5}$，$\theta$ 為銳角，求 $\sin 2\theta$、$\cos 2\theta$、$\tan 2\theta$。

<details class="example-solution">
<summary>看解答</summary>

$\theta$ 是銳角，$\cos\theta>0$，所以 $\cos\theta=\sqrt{1-\frac{9}{25}}=\frac{4}{5}$。

$$
\begin{aligned}
\sin 2\theta&=2\sin\theta\cos\theta=2\cdot\frac{3}{5}\cdot\frac{4}{5}=\frac{24}{25},\\
\cos 2\theta&=1-2\sin^2\theta=1-\frac{18}{25}=\frac{7}{25},\\
\tan 2\theta&=\frac{\sin 2\theta}{\cos 2\theta}=\frac{24}{7}.
\end{aligned}
$$

**驗算**：$\left(\frac{24}{25}\right)^2+\left(\frac{7}{25}\right)^2=\frac{576+49}{625}=1$；也可以用 $\tan\theta=\frac{3}{4}$ 代入 $\frac{2\tan\theta}{1-\tan^2\theta}=\frac{3/2}{7/16}=\frac{24}{7}$。

</details>

**例題 2**　解 $\cos 2\theta=\cos\theta$，$0\le\theta<2\pi$。

<details class="example-solution">
<summary>看解答</summary>

把 $\cos 2\theta$ 換成 $2\cos^2\theta-1$，令 $c=\cos\theta$：

$$
\begin{aligned}2c^2-1&=c,\\ 2c^2-c-1&=0,\\ (2c+1)(c-1)&=0.\end{aligned}
$$

所以 $\cos\theta=1$ 或 $\cos\theta=-\frac{1}{2}$。

- $\cos\theta=1$：$\theta=0$。
- $\cos\theta=-\frac{1}{2}$：參考角 $\frac{\pi}{3}$，$\cos$ 為負在第二、三象限，$\theta=\frac{2\pi}{3}$ 或 $\frac{4\pi}{3}$。

答案：$\theta=0,\ \frac{2\pi}{3},\ \frac{4\pi}{3}$。

**驗算**：$\theta=\frac{2\pi}{3}$ 時 $\cos\frac{4\pi}{3}=-\frac{1}{2}=\cos\frac{2\pi}{3}$；$\theta=\frac{4\pi}{3}$ 時 $\cos\frac{8\pi}{3}=\cos\frac{2\pi}{3}=-\frac{1}{2}=\cos\frac{4\pi}{3}$；$\theta=0$ 時兩邊都是 $1$。

</details>

## 推導

在和角公式中令 $\alpha=\beta=\theta$：

$$
\begin{aligned}
\sin 2\theta&=\sin\theta\cos\theta+\cos\theta\sin\theta\\
&=2\sin\theta\cos\theta,\\
\cos 2\theta&=\cos\theta\cos\theta-\sin\theta\sin\theta\\
&=\cos^2\theta-\sin^2\theta,\\
\tan 2\theta&=\frac{\tan\theta+\tan\theta}{1-\tan\theta\tan\theta}\\
&=\frac{2\tan\theta}{1-\tan^2\theta}.
\end{aligned}
$$

$\cos 2\theta$ 的另外兩種寫法，用平方關係 $\sin^2\theta+\cos^2\theta=1$ 代換：

- 把 $\cos^2\theta$ 換成 $1-\sin^2\theta$：$\cos 2\theta=1-2\sin^2\theta$。
- 把 $\sin^2\theta$ 換成 $1-\cos^2\theta$：$\cos 2\theta=2\cos^2\theta-1$。

---
subject: trig
order: 6
name: 降冪公式
latex: \sin^2\theta=\dfrac{1-\cos 2\theta}{2},\qquad \cos^2\theta=\dfrac{1+\cos 2\theta}{2}
note: 把平方換成一次的倍角，積分或化簡時常用；也可改寫成半角公式。
related: [double-angle, basic-integrals]
---

## 符號說明

- $\sin^2\theta$、$\cos^2\theta$：正弦、餘弦的平方（二次）。
- 公式把它們換成 $\cos 2\theta$ 的**一次**式，所以叫「降冪」。
- 把 $\theta$ 換成 $\frac{\theta}{2}$，就得到**半角公式**：$\cos^2\frac{\theta}{2}=\frac{1+\cos\theta}{2}$，$\sin^2\frac{\theta}{2}=\frac{1-\cos\theta}{2}$。

## 使用時機

- **積分**：$\int\sin^2 x\,dx$ 沒辦法直接積，換成 $\int\frac{1-\cos 2x}{2}\,dx$ 就可以。
- **求半角的值**，例如由 $\cos 30^\circ$ 求 $\cos 15^\circ$。
- 求 $\sin^2\theta$、$\cos^2\theta$ 這類函數的**最大值、最小值與週期**。

## 例題

**例題 1**　用降冪公式求 $\cos 15^\circ$。

<details class="example-solution">
<summary>看解答</summary>

取 $\theta=15^\circ$，則 $2\theta=30^\circ$：

$$
\begin{aligned}\cos^2 15^\circ&=\frac{1+\cos 30^\circ}{2}\\&=\frac{1+\frac{\sqrt{3}}{2}}{2}=\frac{2+\sqrt{3}}{4}.\end{aligned}
$$

$15^\circ$ 是銳角，$\cos 15^\circ>0$，所以

$$
\cos 15^\circ=\frac{\sqrt{2+\sqrt{3}}}{2}.
$$

**驗算**：和角公式算出 $\cos 15^\circ=\frac{\sqrt{6}+\sqrt{2}}{4}$。平方：$\frac{6+2+2\sqrt{12}}{16}=\frac{8+4\sqrt{3}}{16}=\frac{2+\sqrt{3}}{4}$，兩者都是正數且平方相同，所以相等。

</details>

**例題 2**　求 $f(\theta)=\sin^2\theta$ 的最大值、最小值與週期。

<details class="example-solution">
<summary>看解答</summary>

$$
f(\theta)=\sin^2\theta=\frac{1-\cos 2\theta}{2}.
$$

- $\cos 2\theta$ 的範圍是 $[-1,1]$，所以 $f(\theta)$ 的範圍是 $\left[\frac{1-1}{2},\frac{1+1}{2}\right]=[0,1]$。
- 最大值 $1$：$\cos 2\theta=-1$，即 $\theta=\frac{\pi}{2}+k\pi$（$k$ 為整數）。
- 最小值 $0$：$\cos 2\theta=1$，即 $\theta=k\pi$。
- $\cos 2\theta$ 的週期是 $\frac{2\pi}{2}=\pi$，所以 $f$ 的週期是 $\pi$。

**驗算**：$\sin^2\frac{\pi}{2}=1$，$\sin^2 0=0$；$\sin^2(\theta+\pi)=(-\sin\theta)^2=\sin^2\theta$，確實每隔 $\pi$ 重複。

</details>

## 推導

從倍角公式的兩種寫法出發：

$$
\begin{aligned}\cos 2\theta&=1-2\sin^2\theta,\\ \cos 2\theta&=2\cos^2\theta-1.\end{aligned}
$$

第一式移項：$2\sin^2\theta=1-\cos 2\theta$，兩邊除以 $2$ 得

$$
\sin^2\theta=\frac{1-\cos 2\theta}{2}.
$$

第二式移項：$2\cos^2\theta=1+\cos 2\theta$，兩邊除以 $2$ 得

$$
\cos^2\theta=\frac{1+\cos 2\theta}{2}.
$$

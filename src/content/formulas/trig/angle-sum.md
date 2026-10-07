---
subject: trig
order: 4
name: 和角公式
latex: \begin{aligned}\sin(\alpha\pm\beta)&=\sin\alpha\cos\beta\pm\cos\alpha\sin\beta\\ \cos(\alpha\pm\beta)&=\cos\alpha\cos\beta\mp\sin\alpha\sin\beta\\ \tan(\alpha\pm\beta)&=\dfrac{\tan\alpha\pm\tan\beta}{1\mp\tan\alpha\tan\beta}\end{aligned}
related: [double-angle, auxiliary-angle, special-angles]
---

## 符號說明

- $\alpha,\beta$：任意兩個角。
- $\pm$ 與 $\mp$：上面的符號一組、下面的符號一組。例如 $\cos(\alpha+\beta)=\cos\alpha\cos\beta-\sin\alpha\sin\beta$，$\cos$ 的公式中間符號和左邊**相反**。
- 正切公式需要 $\tan\alpha$、$\tan\beta$、$\tan(\alpha\pm\beta)$ 都有定義。

## 使用時機

- **求非特殊角的值**，例如 $\sin 75^\circ=\sin(45^\circ+30^\circ)$、$\tan 15^\circ=\tan(45^\circ-30^\circ)$。
- **推導其他公式**：倍角公式、降冪公式、疊合都是從和角公式來的。
- **化簡**像 $\sin(\theta+90^\circ)$、$\cos(180^\circ-\theta)$ 這類式子。

## 例題

**例題 1**　求 $\sin 75^\circ$ 與 $\cos 15^\circ$。

<details class="example-solution">
<summary>看解答</summary>

$$
\begin{aligned}
\sin 75^\circ&=\sin(45^\circ+30^\circ)\\
&=\sin 45^\circ\cos 30^\circ\\
&\quad+\cos 45^\circ\sin 30^\circ\\
&=\frac{\sqrt{2}}{2}\cdot\frac{\sqrt{3}}{2}+\frac{\sqrt{2}}{2}\cdot\frac{1}{2}\\
&=\frac{\sqrt{6}+\sqrt{2}}{4}.
\end{aligned}
$$

$$
\begin{aligned}
\cos 15^\circ&=\cos(45^\circ-30^\circ)\\
&=\cos 45^\circ\cos 30^\circ\\
&\quad+\sin 45^\circ\sin 30^\circ\\
&=\frac{\sqrt{6}+\sqrt{2}}{4}.
\end{aligned}
$$

**驗算**：$75^\circ+15^\circ=90^\circ$，互餘的兩角滿足 $\sin 75^\circ=\cos 15^\circ$，兩個結果相同；數值上 $\frac{2.449+1.414}{4}\approx 0.9659$，和計算機的 $\sin 75^\circ$ 一致。

</details>

**例題 2**　求 $\tan 15^\circ$。

<details class="example-solution">
<summary>看解答</summary>

$\tan 45^\circ=1$、$\tan 30^\circ=\frac{\sqrt{3}}{3}$：

$$
\begin{aligned}
\tan 15^\circ&=\frac{\tan 45^\circ-\tan 30^\circ}{1+\tan 45^\circ\tan 30^\circ}\\
&=\frac{1-\frac{\sqrt{3}}{3}}{1+\frac{\sqrt{3}}{3}}=\frac{3-\sqrt{3}}{3+\sqrt{3}}.
\end{aligned}
$$

分子分母同乘 $3-\sqrt{3}$ 有理化（分母用平方差）：

$$
\frac{(3-\sqrt{3})^2}{9-3}=\frac{12-6\sqrt{3}}{6}=2-\sqrt{3}.
$$

**驗算**：$2-\sqrt{3}\approx 0.2679$，和計算機的 $\tan 15^\circ$ 一致。

</details>

## 推導

**第一步：$\cos(\alpha-\beta)$。** 在單位圓上取點 $A(\cos\alpha,\sin\alpha)$、$B(\cos\beta,\sin\beta)$。用距離公式展開，並用 $\cos^2+\sin^2=1$：

$$
\begin{aligned}
AB^2&=(\cos\alpha-\cos\beta)^2\\
&\quad+(\sin\alpha-\sin\beta)^2\\
&=2-2\cos\alpha\cos\beta-2\sin\alpha\sin\beta.
\end{aligned}
$$

把 $A$、$B$ 一起繞原點轉 $-\beta$，兩點間的距離不變（旋轉不改變距離），而 $A$ 轉到 $P(\cos(\alpha-\beta),\sin(\alpha-\beta))$，$B$ 轉到 $Q(1,0)$：

$$
\begin{aligned}
PQ^2&=\big(\cos(\alpha-\beta)-1\big)^2\\
&\quad+\sin^2(\alpha-\beta)\\
&=2-2\cos(\alpha-\beta).
\end{aligned}
$$

由 $AB^2=PQ^2$ 得

$$
\cos(\alpha-\beta)=\cos\alpha\cos\beta+\sin\alpha\sin\beta.
$$

**第二步：$\cos(\alpha+\beta)$。** 把 $\beta$ 換成 $-\beta$。點 $(\cos\beta,\sin\beta)$ 對 $x$ 軸鏡射得到 $-\beta$ 的點，所以 $\cos(-\beta)=\cos\beta$、$\sin(-\beta)=-\sin\beta$：

$$
\cos(\alpha+\beta)=\cos\alpha\cos\beta-\sin\alpha\sin\beta.
$$

**第三步：互餘關係。** 在第一步取 $\alpha=90^\circ$：$\cos(90^\circ-\beta)=0\cdot\cos\beta+1\cdot\sin\beta=\sin\beta$。把其中的 $\beta$ 換成 $90^\circ-\beta$，又得 $\sin(90^\circ-\beta)=\cos\beta$。

**第四步：$\sin(\alpha\pm\beta)$。** 用互餘關係把正弦換成餘弦，再用第一步：

$$
\begin{aligned}
\sin(\alpha+\beta)&=\cos\big((90^\circ-\alpha)-\beta\big)\\
&=\cos(90^\circ-\alpha)\cos\beta\\
&\quad+\sin(90^\circ-\alpha)\sin\beta\\
&=\sin\alpha\cos\beta+\cos\alpha\sin\beta.
\end{aligned}
$$

把 $\beta$ 換成 $-\beta$，得 $\sin(\alpha-\beta)=\sin\alpha\cos\beta-\cos\alpha\sin\beta$。

**第五步：$\tan(\alpha\pm\beta)$。** 用 $\tan=\frac{\sin}{\cos}$，分子分母同除以 $\cos\alpha\cos\beta$（$\tan\alpha$、$\tan\beta$ 有定義，所以它不是 $0$）：

$$
\begin{aligned}
\tan(\alpha\pm\beta)&=\frac{\sin\alpha\cos\beta\pm\cos\alpha\sin\beta}{\cos\alpha\cos\beta\mp\sin\alpha\sin\beta}\\
&=\frac{\tan\alpha\pm\tan\beta}{1\mp\tan\alpha\tan\beta}.
\end{aligned}
$$

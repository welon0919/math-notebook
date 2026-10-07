---
subject: trig
order: 1
name: 特殊角三角函數值
latex: \begin{array}{c|ccccc}\theta & 0^\circ & 30^\circ & 45^\circ & 60^\circ & 90^\circ\\ \hline \sin\theta & 0 & \frac{1}{2} & \frac{\sqrt{2}}{2} & \frac{\sqrt{3}}{2} & 1\\ \cos\theta & 1 & \frac{\sqrt{3}}{2} & \frac{\sqrt{2}}{2} & \frac{1}{2} & 0\\ \tan\theta & 0 & \frac{\sqrt{3}}{3} & 1 & \sqrt{3} & \text{無定義}\end{array}
note: $30^\circ=\dfrac{\pi}{6}$、$45^\circ=\dfrac{\pi}{4}$、$60^\circ=\dfrac{\pi}{3}$、$90^\circ=\dfrac{\pi}{2}$。
related: [pythagorean-theorem, degree-radian-conversion, quotient-identities]
---

## 符號說明

- $\theta$：角度，表中列出 $0^\circ$、$30^\circ$、$45^\circ$、$60^\circ$、$90^\circ$ 五個**特殊角**。
- $\sin\theta$、$\cos\theta$、$\tan\theta$：正弦、餘弦、正切。
- 「無定義」：$\tan 90^\circ=\frac{\sin 90^\circ}{\cos 90^\circ}=\frac{1}{0}$，分母為 $0$，所以沒有值。
- 記憶法：$\sin\theta$ 從 $0^\circ$ 到 $90^\circ$ 依序是 $\frac{\sqrt{0}}{2},\frac{\sqrt{1}}{2},\frac{\sqrt{2}}{2},\frac{\sqrt{3}}{2},\frac{\sqrt{4}}{2}$；$\cos\theta$ 是同一串倒過來。

## 使用時機

- **計算**含特殊角的式子，例如 $\sin 30^\circ\cos 60^\circ$。
- **解直角三角形**：已知一邊和一個特殊角，求其他邊長。
- 搭配參考角，求**其他象限**的角，例如 $\cos 120^\circ$、$\tan 135^\circ$。

## 例題

**例題 1**　求 $\sin 30^\circ\cos 60^\circ+\sin^2 45^\circ$。

<details class="example-solution">
<summary>看解答</summary>

查表：$\sin 30^\circ=\frac{1}{2}$，$\cos 60^\circ=\frac{1}{2}$，$\sin 45^\circ=\frac{\sqrt{2}}{2}$。

$$
\begin{aligned}
&\sin 30^\circ\cos 60^\circ+\sin^2 45^\circ\\
={}&\frac{1}{2}\cdot\frac{1}{2}+\left(\frac{\sqrt{2}}{2}\right)^2\\
={}&\frac{1}{4}+\frac{2}{4}=\frac{3}{4}.
\end{aligned}
$$

**驗算**：用小數，$0.5\times 0.5+0.7071^2\approx 0.25+0.5=0.75$。

</details>

**例題 2**　求 $\cos 120^\circ$ 與 $\tan 135^\circ$。

<details class="example-solution">
<summary>看解答</summary>

$120^\circ$ 在第二象限，和 $180^\circ$ 差 $60^\circ$，所以參考角是 $60^\circ$；第二象限的 $\cos$ 是負的：

$$
\cos 120^\circ=-\cos 60^\circ=-\frac{1}{2}.
$$

$135^\circ$ 也在第二象限，參考角 $45^\circ$；第二象限的 $\tan$ 是負的：

$$
\tan 135^\circ=-\tan 45^\circ=-1.
$$

**驗算**：$120^\circ$ 在單位圓上的點是 $\left(-\frac{1}{2},\frac{\sqrt{3}}{2}\right)$，確實滿足 $x^2+y^2=\frac{1}{4}+\frac{3}{4}=1$；$135^\circ$ 的點是 $\left(-\frac{\sqrt{2}}{2},\frac{\sqrt{2}}{2}\right)$，$\tan=\frac{y}{x}=-1$。

</details>

## 推導

**$45^\circ$**：取兩股都是 $1$ 的等腰直角三角形，兩個銳角都是 $45^\circ$。由畢氏定理，斜邊是 $\sqrt{1^2+1^2}=\sqrt{2}$。所以

$$
\begin{aligned}\sin 45^\circ=\cos 45^\circ&=\frac{1}{\sqrt{2}}=\frac{\sqrt{2}}{2},\\ \tan 45^\circ&=\frac{1}{1}=1.\end{aligned}
$$

**$30^\circ$ 與 $60^\circ$**：取邊長 $2$ 的正三角形，三個角都是 $60^\circ$。從頂點向底邊作高，這條高把正三角形分成兩個直角三角形，它們的斜邊都是 $2$、又共用一股（高），所以全等。因此高把底邊平分成 $1$ 和 $1$，也把頂角平分成 $30^\circ$ 和 $30^\circ$。

由畢氏定理，高 $=\sqrt{2^2-1^2}=\sqrt{3}$。得到一個邊長 $1,\sqrt{3},2$、角度 $30^\circ,60^\circ,90^\circ$ 的直角三角形，其中 $30^\circ$ 的對邊是 $1$、$60^\circ$ 的對邊是 $\sqrt{3}$（$\tan 30^\circ=\frac{1}{\sqrt{3}}$，分母有理化得 $\frac{\sqrt{3}}{3}$）：

$$
\begin{aligned}
\sin 30^\circ&=\tfrac{1}{2}, & \sin 60^\circ&=\tfrac{\sqrt{3}}{2},\\
\cos 30^\circ&=\tfrac{\sqrt{3}}{2}, & \cos 60^\circ&=\tfrac{1}{2},\\
\tan 30^\circ&=\tfrac{\sqrt{3}}{3}, & \tan 60^\circ&=\sqrt{3}.
\end{aligned}
$$

**$0^\circ$ 與 $90^\circ$**：用單位圓定義 $\cos\theta=x$、$\sin\theta=y$。$0^\circ$ 對應點 $(1,0)$，所以 $\cos 0^\circ=1$、$\sin 0^\circ=0$、$\tan 0^\circ=0$；$90^\circ$ 對應點 $(0,1)$，所以 $\cos 90^\circ=0$、$\sin 90^\circ=1$，而 $\tan 90^\circ$ 分母為 $0$，無定義。

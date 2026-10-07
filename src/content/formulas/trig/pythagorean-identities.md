---
subject: trig
order: 2
name: 平方關係
latex: \sin^2\theta+\cos^2\theta=1,\quad 1+\tan^2\theta=\sec^2\theta,\quad 1+\cot^2\theta=\csc^2\theta
note: 第一式就是單位圓上的畢氏定理，後兩式由它同除 $\cos^2\theta$ 或 $\sin^2\theta$ 得到。
related: [pythagorean-theorem, quotient-identities, double-angle]
---

## 符號說明

- $\sin^2\theta$ 表示 $(\sin\theta)^2$，不是 $\sin(\theta^2)$。
- $\sec\theta=\frac{1}{\cos\theta}$（正割）、$\csc\theta=\frac{1}{\sin\theta}$（餘割）、$\cot\theta=\frac{1}{\tan\theta}$（餘切）。
- 第二式需要 $\cos\theta\neq 0$，第三式需要 $\sin\theta\neq 0$；第一式對所有 $\theta$ 都成立。

## 使用時機

- **已知 $\sin\theta$ 求 $\cos\theta$**（或反過來），再由 $\theta$ 所在的象限決定正負號。
- **化簡或證明**三角恆等式，例如把 $1-\cos^2\theta$ 換成 $\sin^2\theta$。
- 已知 $\sin\theta+\cos\theta$，求 $\sin\theta\cos\theta$：兩邊平方後用 $\sin^2\theta+\cos^2\theta=1$。

## 例題

**例題 1**　已知 $\sin\theta=\frac{3}{5}$，且 $\theta$ 在第二象限，求 $\cos\theta$ 與 $\tan\theta$。

<details class="example-solution">
<summary>看解答</summary>

由 $\sin^2\theta+\cos^2\theta=1$：

$$
\begin{aligned}\cos^2\theta&=1-\frac{9}{25}=\frac{16}{25},\\ \cos\theta&=\pm\frac{4}{5}.\end{aligned}
$$

第二象限的 $\cos$ 是負的，所以 $\cos\theta=-\frac{4}{5}$。再由商數關係：

$$
\tan\theta=\frac{\sin\theta}{\cos\theta}=\frac{3/5}{-4/5}=-\frac{3}{4}.
$$

**驗算**：$\left(\frac{3}{5}\right)^2+\left(-\frac{4}{5}\right)^2=\frac{9+16}{25}=1$；而且 $\sin>0$、$\cos<0$，確實在第二象限。

</details>

**例題 2**　已知 $\sin\theta+\cos\theta=\frac{1}{2}$，求 $\sin\theta\cos\theta$。

<details class="example-solution">
<summary>看解答</summary>

兩邊平方，用乘法公式 $(p+q)^2=p^2+2pq+q^2$：

$$
\sin^2\theta+2\sin\theta\cos\theta+\cos^2\theta=\frac{1}{4}.
$$

把 $\sin^2\theta+\cos^2\theta$ 換成 $1$：

$$
\begin{aligned}1+2\sin\theta\cos\theta&=\frac{1}{4},\\ \sin\theta\cos\theta&=-\frac{3}{8}.\end{aligned}
$$

**驗算**：$\sin\theta$、$\cos\theta$ 是 $t^2-\frac{1}{2}t-\frac{3}{8}=0$ 的兩根（和為 $\frac{1}{2}$、積為 $-\frac{3}{8}$），解得 $t=\frac{1\pm\sqrt{7}}{4}$。檢查平方和：$\frac{(1+\sqrt{7})^2+(1-\sqrt{7})^2}{16}=\frac{16}{16}=1$，所以這樣的角確實存在。

</details>

## 推導

**第一式**：在單位圓上，角 $\theta$ 對應的點是 $P(\cos\theta,\sin\theta)$。$P$ 到原點的距離是半徑 $1$，由兩點距離公式（也就是畢氏定理）：

$$
\cos^2\theta+\sin^2\theta=1.
$$

**第二式**：當 $\cos\theta\neq 0$，第一式兩邊同除以 $\cos^2\theta$：

$$
\begin{aligned}\frac{\sin^2\theta}{\cos^2\theta}+1&=\frac{1}{\cos^2\theta},\\ \tan^2\theta+1&=\sec^2\theta.\end{aligned}
$$

**第三式**：當 $\sin\theta\neq 0$，第一式兩邊同除以 $\sin^2\theta$：

$$
\begin{aligned}1+\frac{\cos^2\theta}{\sin^2\theta}&=\frac{1}{\sin^2\theta},\\ 1+\cot^2\theta&=\csc^2\theta.\end{aligned}
$$

---
subject: trig
order: 4
name: 負角、補角與餘角關係
latex: \begin{aligned}\sin(-\theta)&=-\sin\theta, & \cos(-\theta)&=\cos\theta\\ \sin(\pi-\theta)&=\sin\theta, & \cos(\pi-\theta)&=-\cos\theta\\ \sin\left(\tfrac{\pi}{2}-\theta\right)&=\cos\theta, & \cos\left(\tfrac{\pi}{2}-\theta\right)&=\sin\theta\end{aligned}
note: 正切由 $\tan=\frac{\sin}{\cos}$ 得到：$\tan(-\theta)=-\tan\theta$，$\tan(\pi-\theta)=-\tan\theta$，$\tan\left(\frac{\pi}{2}-\theta\right)=\cot\theta$。
related: [pythagorean-identities, quotient-identities, special-angles, angle-sum]
---

## 符號說明

- $-\theta$：**負角**，和 $\theta$ 大小相同、方向相反。
- $\pi-\theta$：$\theta$ 的**補角**（兩角和為 $\pi$，即 $180^\circ$）。
- $\frac{\pi}{2}-\theta$：$\theta$ 的**餘角**（兩角和為 $\frac{\pi}{2}$，即 $90^\circ$）。正弦和餘弦、正切和餘切、正割和餘割，名稱裡的「餘」就是「餘角的」：$\cos\theta$ 是餘角的正弦。
- 這些公式對所有實數 $\theta$ 都成立（正切、餘切要求分母不是 $0$），不限於銳角。

## 使用時機

- **求非銳角的三角函數值**：例如 $\cos\frac{5\pi}{6}=\cos\left(\pi-\frac{\pi}{6}\right)=-\cos\frac{\pi}{6}=-\frac{\sqrt3}{2}$。
- **化簡**含 $-\theta$、$\pi-\theta$、$\frac{\pi}{2}-\theta$ 的式子，例如 $\sin\left(\frac{\pi}{2}-\theta\right)\tan\theta=\cos\theta\cdot\frac{\sin\theta}{\cos\theta}=\sin\theta$。
- **互換正弦與餘弦**：例如 $\sin^2 20^\circ+\sin^2 70^\circ=\sin^2 20^\circ+\cos^2 20^\circ=1$。

## 例題

**例題 1**　求 $\sin\dfrac{5\pi}{6}+\cos\left(-\dfrac{\pi}{3}\right)+\tan\dfrac{3\pi}{4}$。

<details class="example-solution">
<summary>看解答</summary>

逐項化成銳角：

- $\sin\dfrac{5\pi}{6}=\sin\left(\pi-\dfrac{\pi}{6}\right)=\sin\dfrac{\pi}{6}=\dfrac12$（補角）。
- $\cos\left(-\dfrac{\pi}{3}\right)=\cos\dfrac{\pi}{3}=\dfrac12$（負角）。
- $\tan\dfrac{3\pi}{4}=\tan\left(\pi-\dfrac{\pi}{4}\right)=-\tan\dfrac{\pi}{4}=-1$（補角）。

相加：$\dfrac12+\dfrac12-1=0$。

</details>

**例題 2**　化簡 $\dfrac{\cos(\pi-\theta)\,\sin\left(\frac{\pi}{2}-\theta\right)}{\cos(-\theta)}$，其中 $\cos\theta\neq0$。

<details class="example-solution">
<summary>看解答</summary>

$\cos(\pi-\theta)=-\cos\theta$，$\sin\left(\frac{\pi}{2}-\theta\right)=\cos\theta$，$\cos(-\theta)=\cos\theta$。所以

$$
\frac{(-\cos\theta)\cos\theta}{\cos\theta}=-\cos\theta.
$$

**驗算**：取 $\theta=\frac{\pi}{3}$，左邊 $\dfrac{\left(-\frac12\right)\cdot\frac12}{\frac12}=-\dfrac12$，右邊 $-\cos\dfrac{\pi}{3}=-\dfrac12$。

</details>

## 推導

角 $\theta$ 在單位圓上的點是 $P(\cos\theta,\sin\theta)$。三個角的點都可以由 $P$ 鏡射得到，讀出坐標就是公式。

**負角**：$-\theta$ 是反方向轉同樣的角度，它的點是 $P$ 對 $x$ 軸的鏡射 $(\cos\theta,-\sin\theta)$。比較坐標：$\cos(-\theta)=\cos\theta$，$\sin(-\theta)=-\sin\theta$。

**補角**：$\pi-\theta$ 是先轉到負 $x$ 軸，再倒轉 $\theta$。正 $x$ 軸和負 $x$ 軸對 $y$ 軸對稱，所以它的點是 $P$ 對 $y$ 軸的鏡射 $(-\cos\theta,\sin\theta)$。比較坐標：$\cos(\pi-\theta)=-\cos\theta$，$\sin(\pi-\theta)=\sin\theta$。

**餘角**：對直線 $y=x$ 鏡射，點 $(a,b)$ 變成 $(b,a)$，而正 $x$ 軸和正 $y$ 軸互換。$P$ 是從正 $x$ 軸逆時針轉 $\theta$，鏡射後是從正 $y$ 軸順時針轉 $\theta$，也就是從正 $x$ 軸逆時針轉 $\frac{\pi}{2}-\theta$。所以角 $\frac{\pi}{2}-\theta$ 的點是 $(\sin\theta,\cos\theta)$：$\cos\left(\frac{\pi}{2}-\theta\right)=\sin\theta$，$\sin\left(\frac{\pi}{2}-\theta\right)=\cos\theta$。

**正切**：三式分別相除，例如 $\tan(\pi-\theta)=\dfrac{\sin\theta}{-\cos\theta}=-\tan\theta$，$\tan\left(\frac{\pi}{2}-\theta\right)=\dfrac{\cos\theta}{\sin\theta}=\cot\theta$。

---
subject: trig
order: 6
name: 棣美弗定理
statement: 對任意正整數 $n$，$\big[r(\cos\theta+i\sin\theta)\big]^n=r^n(\cos n\theta+i\sin n\theta)$。
note: 複數相乘是長度相乘、角度相加，所以自乘 $n$ 次就是長度 $n$ 次方、角度乘以 $n$。
proofType: full
related: [angle-sum, mathematical-induction]
---

## 白話解釋

在複數平面上，乘以 $r(\cos\theta+i\sin\theta)$ 就是「伸縮 $r$ 倍、再旋轉 $\theta$」。把同一個複數自乘 $n$ 次，就是伸縮 $n$ 次、旋轉 $n$ 次：長度變成 $r^n$，角度變成 $n\theta$。

特別地，$r=1$ 時 $(\cos\theta+i\sin\theta)^n=\cos n\theta+i\sin n\theta$：單位圓上的點自乘 $n$ 次，仍然在單位圓上，只是角度變成 $n$ 倍。

## 使用時機

- **計算高次方**：$(1+i)^{10}$、$(\sqrt3+i)^6$ 這類直接展開很麻煩的乘方。
- **求 $n$ 次方根**：解 $z^n=w$，$w=R(\cos\phi+i\sin\phi)$，得 $n$ 個根 $\sqrt[n]R\left(\cos\frac{\phi+2k\pi}{n}+i\sin\frac{\phi+2k\pi}{n}\right)$，$k=0,1,\dots,n-1$。
- **推導倍角公式**：比較 $(\cos\theta+i\sin\theta)^2$ 展開式的實部和虛部，就得到 $\cos2\theta$、$\sin2\theta$。

## 例題

**例題 1**　求 $(1-\sqrt3i)^5$。

<details class="example-solution">
<summary>看解答</summary>

$|1-\sqrt3i|=2$，點 $(1,-\sqrt3)$ 在第四象限，參考角 $\frac{\pi}{3}$，所以 $1-\sqrt3i=2\left(\cos\left(-\frac{\pi}{3}\right)+i\sin\left(-\frac{\pi}{3}\right)\right)$。

$$
\begin{aligned}
(1-\sqrt3i)^5&=2^5\big(\cos(-\tfrac{5\pi}{3})+i\sin(-\tfrac{5\pi}{3})\big)\\
&=32\left(\frac12+\frac{\sqrt3}{2}i\right)=16+16\sqrt3i.
\end{aligned}
$$

**驗算**：$(1-\sqrt3i)^2=1-2\sqrt3i-3=-2-2\sqrt3i$，$(1-\sqrt3i)^3=(-2-2\sqrt3i)(1-\sqrt3i)=-2+2\sqrt3i-2\sqrt3i-6=-8$，所以 $(1-\sqrt3i)^5=-8(-2-2\sqrt3i)=16+16\sqrt3i$。

</details>

**例題 2**　用棣美弗定理推導 $\cos2\theta$、$\sin2\theta$ 的公式。

<details class="example-solution">
<summary>看解答</summary>

一方面，由棣美弗定理 $(\cos\theta+i\sin\theta)^2=\cos2\theta+i\sin2\theta$。另一方面，直接展開：

$$
\begin{aligned}
(\cos\theta+i\sin\theta)^2&=\cos^2\theta+2i\sin\theta\cos\theta+i^2\sin^2\theta\\
&=\cos^2\theta-\sin^2\theta+2i\sin\theta\cos\theta.
\end{aligned}
$$

兩個複數相等，實部和虛部分別相等，所以 $\cos2\theta=\cos^2\theta-\sin^2\theta$，$\sin2\theta=2\sin\theta\cos\theta$，正是倍角公式。

</details>

## 證明

先證明乘法規則：設 $z_1=r_1(\cos\theta_1+i\sin\theta_1)$，$z_2=r_2(\cos\theta_2+i\sin\theta_2)$。展開並用 $i^2=-1$：

$$
\begin{aligned}
z_1z_2&=r_1r_2\big[(\cos\theta_1\cos\theta_2-\sin\theta_1\sin\theta_2)\\
&\qquad\quad+i(\sin\theta_1\cos\theta_2+\cos\theta_1\sin\theta_2)\big]\\
&=r_1r_2\big[\cos(\theta_1+\theta_2)+i\sin(\theta_1+\theta_2)\big],
\end{aligned}
$$

最後一步用和角公式。

再用數學歸納法證明定理。令 $z=r(\cos\theta+i\sin\theta)$，$P(n)$ 是敘述「$z^n=r^n(\cos n\theta+i\sin n\theta)$」。

- **起始步驟**：$n=1$ 時兩邊都是 $r(\cos\theta+i\sin\theta)$，$P(1)$ 成立。
- **遞推步驟**：假設 $P(k)$ 成立，即 $z^k=r^k(\cos k\theta+i\sin k\theta)$（歸納假設）。則

  $$
  \begin{aligned}
  z^{k+1}&=z^k\cdot z\\
  &=r^k(\cos k\theta+i\sin k\theta)\cdot r(\cos\theta+i\sin\theta)\\
  &=r^{k+1}\big(\cos(k+1)\theta+i\sin(k+1)\theta\big),
  \end{aligned}
  $$

  其中最後一步用上面的乘法規則（長度相乘 $r^k\cdot r$，角度相加 $k\theta+\theta$）。所以 $P(k+1)$ 成立。

由數學歸納法，$P(n)$ 對所有正整數 $n$ 都成立。

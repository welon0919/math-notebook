---
subject: trig
order: 8
name: 積化和差與和差化積
latex: \begin{aligned}\sin\alpha\cos\beta&=\tfrac12[\sin(\alpha+\beta)+\sin(\alpha-\beta)]\\ \cos\alpha\cos\beta&=\tfrac12[\cos(\alpha+\beta)+\cos(\alpha-\beta)]\\ \sin\alpha\sin\beta&=-\tfrac12[\cos(\alpha+\beta)-\cos(\alpha-\beta)]\\ \sin A+\sin B&=2\sin\tfrac{A+B}{2}\cos\tfrac{A-B}{2}\\ \sin A-\sin B&=2\cos\tfrac{A+B}{2}\sin\tfrac{A-B}{2}\\ \cos A+\cos B&=2\cos\tfrac{A+B}{2}\cos\tfrac{A-B}{2}\\ \cos A-\cos B&=-2\sin\tfrac{A+B}{2}\sin\tfrac{A-B}{2}\end{aligned}
note: 前三式（積化和差）由和角、差角公式相加減得到；後四式（和差化積）是同樣的式子令 $A=\alpha+\beta$、$B=\alpha-\beta$ 反過來讀。
related: [angle-sum, double-angle, power-reduction]
---

## 符號說明

- $\alpha,\beta$、$A,B$：任意角。兩組公式其實是同一組式子，只是 $A=\alpha+\beta$、$B=\alpha-\beta$，所以 $\alpha=\frac{A+B}{2}$、$\beta=\frac{A-B}{2}$。
- 積化和差還有一式 $\cos\alpha\sin\beta=\frac12[\sin(\alpha+\beta)-\sin(\alpha-\beta)]$，就是第一式把 $\alpha$、$\beta$ 對調。
- 注意兩個負號：$\sin\alpha\sin\beta$ 前面是 $-\frac12$，$\cos A-\cos B$ 前面是 $-2$。

## 使用時機

- **乘積化成和**：求 $\sin75^\circ\cos15^\circ$ 這類值，或積分 $\sin3x\cos x$ 這類乘積。
- **和化成乘積**：求 $\sin75^\circ+\sin15^\circ$ 這類值，或把 $\sin x+\sin3x=0$ 化成乘積等於 $0$ 來解。
- **兩個頻率接近的波相加**：$\sin px+\sin qx$ 是快速振動乘上慢慢變化的包絡線，就是聲音的「拍」。

## 例題

**例題 1**　求 $\cos105^\circ\cos15^\circ$。

<details class="example-solution">
<summary>看解答</summary>

積化和差，$\alpha+\beta=120^\circ$，$\alpha-\beta=90^\circ$：

$$
\begin{aligned}
\cos105^\circ\cos15^\circ&=\tfrac12[\cos120^\circ+\cos90^\circ]\\
&=\tfrac12\left(-\tfrac12+0\right)=-\frac14.
\end{aligned}
$$

**驗算**：$\cos105^\circ=-\sin15^\circ=-\frac{\sqrt6-\sqrt2}{4}$，$\cos15^\circ=\frac{\sqrt6+\sqrt2}{4}$，相乘得 $-\frac{6-2}{16}=-\frac14$。

</details>

**例題 2**　在 $[0,\pi]$ 中解 $\sin x+\sin3x=0$。

<details class="example-solution">
<summary>看解答</summary>

和差化積：$\sin3x+\sin x=2\sin2x\cos x$。乘積等於 $0$，所以 $\sin2x=0$ 或 $\cos x=0$。

- $\sin2x=0$：$2x=k\pi$，$x=\frac{k\pi}{2}$，在 $[0,\pi]$ 中是 $0,\frac{\pi}{2},\pi$。
- $\cos x=0$：$x=\frac{\pi}{2}$（已經算過）。

所以 $x=0,\frac{\pi}{2},\pi$。**驗算** $x=\frac{\pi}{2}$：$\sin\frac{\pi}{2}+\sin\frac{3\pi}{2}=1-1=0$。

</details>

## 推導

**積化和差**：和角、差角公式

$$
\begin{aligned}\sin(\alpha\pm\beta)&=\sin\alpha\cos\beta\pm\cos\alpha\sin\beta\\ \cos(\alpha\pm\beta)&=\cos\alpha\cos\beta\mp\sin\alpha\sin\beta\end{aligned}
$$

兩個 $\sin$ 式相加，$\cos\alpha\sin\beta$ 抵消，得 $\sin(\alpha+\beta)+\sin(\alpha-\beta)=2\sin\alpha\cos\beta$。兩個 $\cos$ 式相加得 $\cos(\alpha+\beta)+\cos(\alpha-\beta)=2\cos\alpha\cos\beta$；相減得 $\cos(\alpha+\beta)-\cos(\alpha-\beta)=-2\sin\alpha\sin\beta$。各式除以 $2$ 就是積化和差。

**和差化積**：令 $A=\alpha+\beta$、$B=\alpha-\beta$，則 $\alpha=\frac{A+B}{2}$、$\beta=\frac{A-B}{2}$。把上面三個相加相減的結果，以及兩個 $\sin$ 式相減的 $\sin(\alpha+\beta)-\sin(\alpha-\beta)=2\cos\alpha\sin\beta$，都改用 $A$、$B$ 寫，就是四個和差化積公式。

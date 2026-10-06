---
subject: trig
order: 3
title: 解三角形
example: $\triangle ABC$ 中，$b=3$，$c=5$，$\angle A=60^\circ$，求 $a$ 與三角形面積。
solution: 由餘弦定理 $a^2=b^2+c^2-2bc\cos A=9+25-2\cdot 3\cdot 5\cdot\dfrac{1}{2}=19$，所以 $a=\sqrt{19}$。面積 $=\dfrac{1}{2}bc\sin A=\dfrac{1}{2}\cdot 3\cdot 5\cdot\dfrac{\sqrt{3}}{2}=\dfrac{15\sqrt{3}}{4}$。
---

「解三角形」是指由已知的邊和角，求出其餘的邊和角。習慣上用 $a,b,c$ 表示 $\angle A,\angle B,\angle C$ 的對邊。

## 正弦定理

$$
\frac{a}{\sin A}=\frac{b}{\sin B}=\frac{c}{\sin C}=2R
$$

適用於已知**兩角一邊**，或**兩邊及其中一邊的對角**（此時可能有兩解，要小心）。

## 餘弦定理

$$
c^2=a^2+b^2-2ab\cos C
\qquad\Longleftrightarrow\qquad
\cos C=\frac{a^2+b^2-c^2}{2ab}
$$

適用於已知**兩邊夾一角**（求第三邊），或已知**三邊**（求角）。

## 面積

$$
\Delta=\frac{1}{2}ab\sin C
$$

只知道三邊時，可以用海龍公式 $\Delta=\sqrt{s(s-a)(s-b)(s-c)}$，其中 $s=\dfrac{a+b+c}{2}$。

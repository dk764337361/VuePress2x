# 简单数据类型的存储

## 基本类型在内存中的存储

变量中如果存储的是简单类型的数据，那么变量中存储的是值本身，如果将变量赋值给另一个变量，是将内部的值复制一份给了另一个变量，两个变量之间没有联系，一个变化，另一个不会同时变化。
<img src="/images/Javascript/025.jpg" style="width: 100%; display:inline-block; margin: 0 auto;">

```js
// 基础数据类型
var a = 5;
var b = a; //将 a 内部存储的数据 5 复制了一份给 b
a = 10;
console.log(a); //10
console.log(b); //5
```

## 基本类型作为函数的参数
基本类型的数据作为函数的参数，符合基本类型的数据特点。

<img src="/images/Javascript/027.jpg" style="width: 100%; display:inline-block; margin: 0 auto;">

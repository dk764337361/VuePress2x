# 作用域链

- 只有函数可以制造作用域结构， 那么只要是代码，就至少有一个作用域 , 即全局作用域。凡是代码中有函数，那么这个函数就构成另一个作用域。如果函数中还有函数，那么在这个作用域中就又可以诞生一个作用域。
- 将这样的所有的作用域列出来，可以有一个结构 : 函数内指向函数外的链式结构。就称作`作用域链`。

### 案例 1

```js
function f1() {
  function f2() {}
}
var num = 456;
function f3() {
  function f4() {}
}
```

<img src="/images/Javascript/023.jpg" style="width: 100%; display:inline-block; margin: 0 auto;">

### 案例 2

```js
function f1() {
  var num = 123;
  function f2() {
    console.log(num);
  }
  f2();
}
var num = 456;
f1();
```

<img src="/images/Javascript/024.jpg" style="width: 100%; display:inline-block; margin: 0 auto;">


## 遮蔽效应
- 程序在遇到一个变量时，使用时作用域查找顺序，不同层次的函数内都有可能定义相同名字的变量，一个变量在使用时，会优先从自己所在层作用域查找变量，如果当前层没有变量定义会按照顺序从本层往外依次查找，直到找到第一个变量定义。整个过程中会发生内层变量遮蔽外层变量的效果，叫做`遮蔽效应`。
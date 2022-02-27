# 函数的返回值

- 函数能够通过参数接收数据，也能够将函数执行结果返回一个值。
- 利用函数内部的一个 return 的关键字设置函数的返回值。

* 作用 ① ：函数内部如果结构体执行到一个 return 的关键字，会立即停止后面代码的执行。

```js
// return 可以终止函数的执行
function fun() {
  console.log(1);
  console.log(2);
  console.log(3);
  return;
  console.log(4);
  console.log(5);
  console.log(6);
}
// 函数调用
fun();
```

- 作用 ② ：可以在 return 关键字后面添加空格，空格后面任意定义一个数据字面量或者表达式，函数在执行完自身功能之后，整体会被 return 矮化成一个表达式，表达式必须求出一个值继续可以参与程序，表达式的值就是 return 后面的数据。

```js
// 定义一个求和函数，传入两个数据
// 参数：传两个参数，数据类型为数字
// 功能：得到两个数字之和
// 使用返回值，制作函数运行结束后的结果
function sum(a, b) {
  return a + b;
}
// 调用函数
// console.log(sum(1,2));
```

- 函数如果有返回值，执行结果可以当成普通数据参与程序。

```js
function sum(a, b) {
  return a + b;
}
// 调用函数
console.log(sum(1, 2));
```

- 函数如果有返回值，可以作为一个普通数据赋值给一个变量，甚至赋值给其他函数的实际参数。

```js
function sum(a, b) {
  return a + b;
}
// 将返回值赋值给变量
var num = sum(3, 4);
console.log(num);
// 将返回值赋值给函数的实参
console.log(sum(2, sum(3, 4))); //9
```


::: warning 注意
- 注意：如果函数没有设置 return 语句 ，那么函数有默认的返回值 undefined ；如果函数使用 return 语句，但是 return 后面没有任何值，那么函数的返回值也是 undefined 
:::


<img src="/images/Javascript/023.png" style="width: 100%; display:inline-block; margin: 0 auto;">

 “确定”之后，显示undefined。因为先执行console.log(alert(2)),再执行alert(2)，但是log()里的return 没有返回任何值 ,所以返回undefined值。

<img src="/images/Javascript/024.png" style="width: 100%; display:inline-block; margin: 0 auto;">

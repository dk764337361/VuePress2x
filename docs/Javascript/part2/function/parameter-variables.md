# 参数也是局部变量

- 函数的参数本质是一个变量，也有自己的作用域，
- 函数的参数也是属于函数自己内部的局部变量，只能在函数内部被使用，在函数外面没有定义。

```js
// 函数的参数也是局部变量
function fun(a) {
  a = 2;
  console.log(a);
}
// 调用函数
fun(1); //2
console.log(a); //抛出错误
```

## 函数的作用域

```js
// 函数也有自己的作用域
function outer() {
  var a = 1;
  function inner() {
    console.log(2);
  }
  // 函数内部调用子函数才能成功
  inner();
}
// 调用函数
outer();
// inner();  //抛出错误，调用不了。
```

## 不写 var 关键字的影响

- 在函数内部想要定义新的变量，如果不加关键字 var ，相当于定义的全局变量。如果全局也有相同的标识符，会被函数内部的变量影响，局部变量污染全局变量。

::: warning 注意
每次定义变量时都必须写 var 关键字，否则就会定义在全局，可能污染全局。
:::

```js{2,6,17}
// 全局作用域
var a = 1;
// console.log(a);
// 创建函数
function outer() {
  a = 2;
  // 内部函数
  function inner() {
    var a = 3;
    console.log(a);
  }
  inner();
  console.log(a);
}
// 调用
outer();
console.log(a);  //2 ,被内部全局a污染
```

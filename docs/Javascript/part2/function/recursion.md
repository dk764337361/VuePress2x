# 函数递归

- 函数内部可以通过函数名调用函数自身的方式，就是函数递归现象。

::: warning 注意
 递归的次数太多容易出现错误：超出计算机的计算最大能力。
:::

```js
// 函数，如果 传入的参数是1，返回1，如果传入的是1以上的数字，让他返回参数 + 函数调用上一项
function fun(a) {
  if (a === 1) {
    return 1;
  } else {
    return a + fun(a - 1);
  }
}
// 调用函数
console.log(fun(1));
console.log(fun(2));
console.log(fun(3));
// console.log(fun(1000000000)); //抛出错误
```

- 更多时候，使用递归去解决一些数学中的现象。
- 例如可以输出斐波那契数列的某一项的值。

```js
// 菲波那切数列
// 参数：正整数
// 返回值：对应的整数位置的菲波那切数列的值
function fibo(a) {
  if (a === 1 || a === 2) {
    return 1;
  } else {
    return fibo(a - 1) + fibo(a - 2);
  }
}
// 调用函数
console.log(fibo(1));
console.log(fibo(2));
console.log(fibo(3));
console.log(fibo(4));
console.log(fibo(5));
console.log(fibo(6));
```

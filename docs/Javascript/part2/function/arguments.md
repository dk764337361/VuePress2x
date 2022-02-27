# arguments 对象

- JavaScript 中， arguments 对象是比较特别的一个对象，实际上是当前函数的一个内置属性。也就是说所有函数都内置了一个 arguments 对象， arguments 对象中存储了传递的所有的实参。 arguments 是一个伪数组，因此及可以进行遍历。
- 函数的实参个数和形参个数可以不一致，所有的实参都会存储在函数内部的 arguments 类
  数组对象中。

```js
// 定义一个函数
function sum(a, b) {
  return a + b;
}
// 调用函数的时候，实参的个数可以与形参不同
console.log(sum(1, 2)); //3
console.log(sum(1)); //NAN ,因为1 + undefined =NAN
console.log(sum(1, 2, 3, 4)); //3
```

```js
// 函数内部有一个 arguments 对象，会接收所有的实参
function fun() {
  console.log(arguments); //Arguments(7) [1, 2, 3, 4, 5, 6, 7, callee: ƒ, Symbol(Symbol.iterator): ƒ]
  console.log(arguments.length); //7
  // 使用数组的遍历方法可以获取每一项实参
  for (var i = 0; i <= arguments.length - 1; i++) {
    console.log(arguments[i]); //1，2，3，4，5，6，7
  }
}
// 调用函数
fun(1, 2, 3, 4, 5, 6, 7);
```

## 案例

- 如果传入 1 个参数，返回它自己，如果传入两个参数，返回他们的和，
- 如果传入三个参数，先比较前两个的大小，大的与第三个参数求和返回，
- 如果传入 4 个及以上，输出错误提示。

```js
// 案例：定义一个求和函数，
// 如果传入 1 个参数，返回它自己，如果传入两个参数，返回他们的和，
// 如果传入三个参数，先比较前两个的大小，大的与第三个参数求和返回，
// 如果传入 4 个及以上，输出错误提示。
function sum(a, b, c) {
  // 条件分支语句，根据实参个数走不同的分支
  switch (arguments.length) {
    case 1:
      return a;
      break;
    case 2:
      return a + b;
      break;
    case 3:
      return a > b ? a + c : b + c;
      break;
    default:
      // 提示用户，实参个数传递错误
      // 模拟控制台报错
      throw new Error("参数个数不能超过 3 个");
  }
}
// 调用函数
console.log(sum(1)); //1
console.log(sum(1, 2)); //3
console.log(sum(1, 2, 3)); //5
console.log(sum(1, 2, 3, 4, 5)); //Uncaught Error: 参数个数不能超过 3 个
```

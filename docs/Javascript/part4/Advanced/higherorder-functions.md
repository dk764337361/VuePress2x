# 高阶函数(回调函数)

借鉴参考：https://blog.csdn.net/baidu_32262373/article/details/54969696

## 1.函数可以作为参数

```js
// 高阶函数
// 1.函数作为另一个函数的参数
// 定义一个函数，吃饭的函数，吃完饭之后，可以做其他的事情，看电影、聊天、看书
function eat(fn) {
  console.log("吃晚饭");
  // 接下来的要做的事情是不固定的
  fn();
}
eat(function() {
  console.log("看电影");
});
```

## 2.函数可以作为返回值

```js
// 2.函数作为一个函数的返回值
// 需求：通过同一段代码实现以下效果
// 输出 100 + m
// 输出 1000 + m
// 输出 10000 + m
function outer(n) {
  return function inner(m) {
    console.log(m + n);
  };
}
// 在外部执行 inner 函数
//  100 + m
var fun = outer(100);
fun(3); //103
fun(13); //113
fun(23); //123
var fun1 = outer(1000);
fun1(3); //1003
```

::: tip 提示
为什么外部的 fun()会访问到内部 outer()内部 return 的函数 inner？这就涉及到`函数闭包`的概念
:::

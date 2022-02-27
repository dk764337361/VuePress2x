# 函数的数据类型

## 函数是一种单独的数据类型 Function

```js
// 定义一个函数
function fun() {
  console.log(1);
}
// 定义一个函数表达式
var foo = function() {
  console.log(2);
};
// 检测函数的数据类型
console.log(typeof fun);
console.log(typeof foo);
```

## 由于函数是一种数据类型，可以参与其他程序

  - 例如，可以把函数作为另一个函数的参数，在另一个函数中调用。

  ```js
  // 函数是一种数据类型，可以当成其他函数的参数
  setInterval(function() {
    console.log(1);
  }, 1000);
  ```

  - 或者，可以把函数可以作为返回值从函数内部返回。
  ```js
  // 将函数当成另一个函数的返回值
  function fn(b) {
    var a = 10;
    return function() {
      alert(a + b);
    };
  }
  ```

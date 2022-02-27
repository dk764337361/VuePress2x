# 剩余参数

```js
// 剩余参数
function fun(n, ...args) {
  //n代表第一位实参，“...自定义变量名”代表剩下的实参，并且要放到最后一位。
  console.log(args);
}
fun(1, 2, 3, 4);
```

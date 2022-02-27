# 箭头函数

```js
//旧方法
// function plus(a) {
//   return a + 1
// }
// console.log(plus(10))

//ES6方法
// const plus = (a, b) => {
//   console.log('plus invoked')
//   return a + b
// }
// console.log(plus(1,2))

const arr = [1, 2, 3, 4, 5, 6, 7];
//旧方法
// const arr1 = arr.filter(function (item) {
//   return item % 2
// })
//ES6方法
const arr1 = arr.filter((i) => i % 2);
console.log(arr1);
```

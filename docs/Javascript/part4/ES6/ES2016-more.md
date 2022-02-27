# ES2016 新增内容

## 数组的 includes 方法

```js
const arr = [1, true, NaN, 23, "hello"];
console.log(arr.indexOf(true)); //1
console.log(arr.indexOf(null)); //-1
console.log(arr.indexOf(NaN)); //无法查找NAN

// includes 包含
console.log(arr.includes(NaN)); //可以查找

```

## 指数运算符

```js
// 指数运算符 **
console.log(Math.pow(2, 3));
console.log(2 ** 3); //指数运算符比Math.pow()使用起来更简单
```

# Math 对象

- Math 对象它具有数学常数和函数的属性和方法，我们可以直接进行使用
- 根据数学相关的运算来找 Math 中的成员（求绝对值，取整）

| 属性                     | 含义                |
| ------------------------ | ------------------- |
| Math.PI                  | 圆周率              |
| Math.random()            | 生成随机数          |
| Math.floor()/Math.ceil() | 向下取整 向上取整   |
| Math.round()             | 取整，四舍五入      |
| Math.abs()               | 绝对值              |
| Math.max()/Math.min()    | 求最大和最小值      |
| Math.sin()/Math.cos()    | 正弦 余弦           |
| Math.power()/Math.sqrt() | 求指数次幂 求平方根 |

```js
// 一个半径为10的圆的周长
// 圆周率
console.log(2 * 10 * Math.PI);

// 四舍五入取整
console.log(Math.round(4.3)); //4
console.log(Math.round(4.7)); //5

// 绝对值
console.log(Math.abs(-90)); //90

// 获取最大值和最小值
console.log(Math.max(45, 67, 34, 90, 123, 33)); //123
console.log(Math.min(45, 67, 34, 90, 123, 33)); //33

// 求一个数的几次方
console.log(Math.pow(3, 4));
// 平方根
console.log(Math.sqrt(4)); //2
console.log(Math.pow(4, 1 / 2)); //2
```

# 案例

求 10 20 之间的随机数

```js
// 随机数
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
}
console.log(getRandomIntInclusive(10, 20));
```
<img src="/images/Javascript/028.png" style="width: 100%; display:inline-block; margin: 0 auto;">

# 算术运算符

- `+ - / % ()`
- `%`:取余，取模。 `a / b = c` 余 d，就说 `a % b = d`。
- 运算顺序：先算乘除取余、再算加减，有小括号先算小括号。

::: warning 注意
  `a % b = d` ，d 的数值一定是 0 到 a 之间。

`4 % 5 =0......4`
:::

## 正常情况

数字与数字之间的运算。

```js
// 数字与数字运算
console.log(4 + 5); //9
console.log(4 * 5); //20
console.log(4 / 5); //0.8
console.log(4 % 5); //4
```

## 非正常情况 1

- 有特殊值字面量参与的运算。
- NaN 参与的运算：得到的结果都是 NaN
- Infinity 参与的运算，视情况而定
- 工作中并不会使用特殊值运算，没有实际应用的意义，但是要了解，以防面试遇到。

```js
// NaN参与
console.log(NaN + 5); //NaN
console.log(NaN * 5); //NaN
console.log(NaN / 5); //NaN
console.log(NaN % 5); //NaN

// Infinity

console.log(Infinity + 5); //Infinity
console.log(Infinity - 5); //Infinity
console.log(Infinity * 5); //Infinity
console.log(Infinity / 5); //Infinity
console.log(Infinity % 5); //NaN

console.log(-Infinity + 5); //-Infinity
console.log(-Infinity - 5); //-Infinity
console.log(-Infinity * 5); //-Infinity
console.log(-Infinity / 5); //-Infinity
console.log(-Infinity % 5); //NaN

console.log(5 / Infinity); //0
console.log(5 % Infinity); //5

console.log(Infinity + Infinity); //Infinity
console.log(Infinity - Infinity); //NaN
console.log(Infinity * Infinity); //Infinity
console.log(Infinity / Infinity); //NaN
console.log(Infinity % Infinity); //NaN
```

## 非正常情况 2

- 其他类型的数据参与数学运算。
- 有字符串参与的 + 运算：+ 号变为连字符将前后连接成整体字符串。
- 隐式转换：除了字符串参与的 + 运算，其他情况下，所有其他数据类型参与数学运算时，计算机暗中将其他数据类型`先自动转换成数字类型`，再参与运算，这个过程中不要使用 `parseInt()`、`Number()` 等方法，过程是暗中进行，这就是一个隐式转换的过程。

```js
// 非正常情况2
// 字符串参与
console.log(1 + "2"); //12
console.log(1 - "2"); //-1
console.log(1 * "2"); //2
console.log(1 / "2"); //0.5
console.log(1 % "2"); //1
console.log(1 - ""); //1
console.log(1 - "   "); //1
console.log(1 - "12abc"); //NaN
```

## 隐式转换

其他的数据类型会隐式转换为数字类型：

- 对应数字：纯数字字符串会转为对应的数字”123”→123
- 转换为 1： true
- 转换为 0：false、null、“”空字符串、空白字符串
- 转换为 NaN：undefined、非空非纯数字字符串

```js
console.log(1 + true); //1+1=2
console.log(1 + false); //1+0=1
console.log(1 + undefined); //1+NaN=NaN
console.log(1 + null); //1+0=1
```

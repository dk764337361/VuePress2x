# 比较运算符

- 也叫作关系运算符。一个 比较运算符 comparison operator 比较它的操作数并返回一个布尔类型值。运算结果要么是 true，要么是 false。

| 运算符 | 属性                                       |
| ------ | ------------------------------------------ |
| `> `     | 大于                                       |
| `<`      | 小于                                       |
| `>=`     | 大于等于                                   |
| `<=`     | 小于等于                                   |
| `==`     | 相等，只判断值大小是否相等，不判断数据类型 |
| `!=`     | 不等，与相等完全相反                       |
| `===`    | 全等，不光判断值相等，还要判断数据类型相等 |
| `!==`    | 不全等，与全等于完全相反                   |

## 正常情况

```js
// 数字与数字比较
console.log(7 > 8);
console.log(7 < 8);
console.log(7 >= 8);
console.log(7 <= 8);
console.log(7 == 8);
console.log(7 != 8);
console.log(8 === 8);
console.log(8 !== 8);
```

## 非正常情况 1

- 特殊值参与比较运算。
- NaN 参与：不等于和不全等于结果是 true，其他的都得到 false。
- Infinity 参与的运算，视情况而定

```js
// NaN与数字比较：
console.log(NaN > 8); //false
console.log(NaN < 8); //false
console.log(NaN >= 8); //false
console.log(NaN <= 8); //false
console.log(NaN == 8); //false
console.log(NaN != 8); //true
console.log(NaN === 8); //false
console.log(NaN !== 8); //true
```

```js
//NaN与NaN比较：
console.log(NaN > NaN); //false
console.log(NaN < NaN); //false
console.log(NaN >= NaN); //false
console.log(NaN <= NaN); //false
console.log(NaN == NaN); //false
console.log(NaN != NaN); //true
console.log(NaN === NaN); //false
console.log(NaN !== NaN); //true
```

```js
// Infinity与数字比较：
console.log(Infinity > 8); //true
console.log(Infinity < 8); //false
console.log(Infinity >= 8); //true
console.log(Infinity <= 8); //false
console.log(Infinity == 8); //false
console.log(Infinity != 8); //true
console.log(Infinity === 8); //false
console.log(Infinity !== 8); //true
//Infinity与Infinity比较：
console.log(Infinity > Infinity); //false
console.log(Infinity < Infinity); //false
console.log(Infinity >= Infinity); //true
console.log(Infinity <= Infinity); //true
console.log(Infinity == Infinity); //true
console.log(Infinity != Infinity); //false
console.log(Infinity === Infinity); //true
console.log(Infinity !== Infinity); //false
```

## 非正常情况 2

- 其他数据类型参与比较运算（排除字符串与字符串的比较）。
- 其他数据类型也会隐式转换为数字参与比较。

```
“123”→123

true→1

false→0

null→0

undefined→NaN

“”→0

“abc”→NaN
```

- null 的判断比较特殊：null 与 0 判断时，相等判断为 false，>= 和 <= 判断为 true
- null == undefined

```js
// 非正常情况2 （排除字符串与字符串比较）
console.log(1 == "1");
console.log(1 == true);
console.log(0 == false);
console.log(0 == "");
console.log(0 == "     ");
console.log(0 == undefined);
console.log(0 == null);
console.log(1 > null);
console.log(0 >= null);
console.log(0 <= null);
console.log(undefined == null);
```

## 非正常情况 3

- 字符串与字符串比较。
- 不会发生隐式转换为数字，而是比较两个字符串的 Unicode 编码顺序。
- 字符编码顺序：从前往后 0-9，A-Z，a-z，前面的小于后面的。
- 比较时，不关心两个字符串的长度，从第一个字符开始比较，依次往后顺延比较，直到比较出大小，就不再往后比较。

```js
// 非正常情况 3 字符串和字符串比较
console.log(6 < "12"); // 6 和 12比较： true
console.log("6" < "12"); // 6 和 1 比较：false 。不关心两个字符串的长度，从第一个字符开始比较，依次往后顺延比较，直到比较出大小，就不再往后比较。
console.log("A" < "12"); // A 和 1 比较：false 。A比数字大
console.log("A" < "a"); //  A 和 a 比较：true 。A比a小
console.log("banner" < "banana");// banner第四个字母n比banana第四个字母a大。false
```

## 比较运算符运算顺序

- 从前往后比较，前面的结果与后面的进行比较。

```js
console.log(3 > 2 > 1); //false
//因为3 > 2 为true，1转为true。true并不大于true，为false
```
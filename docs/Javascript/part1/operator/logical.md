# 逻辑运算符

- 逻辑运算符常用于布尔类型值之间; 当操作数都是布尔值时，返回值也是布尔值。

| 符号   | 属性           |
| ------ | -------------- |
| &&     | 逻辑与运算符且 |
| &vert;&vert; | 逻辑或运算符   |
| !      | 逻辑非运算符   |

## 正常情况

- 布尔类型的值参与运算，返回值为布尔值。

```js
// 逻辑与：都真才真，有假就假
console.log(true && true); //true
console.log(true && false); //false
console.log(false && true); //false
console.log(false && false); //false
```

```js
// 逻辑或：有真就真，都假才假
console.log(true || true); //true
console.log(true || false); //true
console.log(false || true); //true
console.log(false || false); //false
```

```js
// 逻辑非:非真既假，非假既真
console.log(!true); //false
console.log(!false); //true
console.log(!!!!!!!false); //true 。两个非互相抵消
```

## 非正常情况

- 除了布尔类型的值之外，其他数据类型的值也可以参与逻辑运算。运算过程中需要将操作数隐式转换为布尔类型的值，参与判断计算，最终运算结果还是原来的某个位置的数据。
- 并不是所有逻辑运算返回结果都是布尔值，其他数据参与得到的就是数据本身。

```js
// 非正常情况，其他类型数据参与运算
console.log(null && "123"); //null
console.log(12 && "123"); //123
console.log(12 || "123"); //12
console.log(undefined || null); //null
```

```js
// 非运算的运算结果只能是 true 或false
// console.log(!9);
```

## 隐式转换为布尔值的规律

- 转为 false：NaN、0、“”空字符串、null、undefined
- 转为 true：非 0 非 NaN 数字、非空字符串
- 当它们用于非布尔值的时候，返回值就可能是非布尔值。其实这种运算非常简单，就两句话：
- (逻辑与 a&&b ) 如果 a 能被转换为 false，那么返回 a；否则，返回 b。
- (逻辑或 a ||b ) 如果 a 能被转换为 true，那么返回 a；否则，返回 b。

## 逻辑运算符运算顺序

- 同种运算符从前往后运算。
- 综合运算顺序：非、与、或。

```js
// 运算顺序：非与或
var n = (null && undefined) || !8;
console.log(n);
```

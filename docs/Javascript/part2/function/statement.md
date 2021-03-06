# 函数的声明和调用

## 函数声明

- 函数声明又叫函数定义，函数必须先定义然后才能使用。
- 如果没有定义函数直接使用，会出现一个引用错误。
- 函数声明语法：

```js
function
函数名 参数
封装的结构体；
}
```

::: tip 提示
特点：函数声明的时候，函数体并不会执行，只有当函数被调用的时候才会执行。
:::

## 函数调用

- 调用方法：函数名
- 函数调用也叫作函数执行，调用时会将函数内部封装的所有的结构体的代码立即执行。
- 函数内部语句执行的位置，与函数定义的位置无关，与函数调用位置有关。
- 函数可以一次 定义 ，多次执行。

```js
// 函数必须先定义才能使用
// 函数名命名规则：可以使用字母、数字、下划线、$，数字不能作为开头，区分大小写，不能使用关键字和保留字
// 函数声明
function fun() {
  console.log(1);
  console.log(2);
  console.log(3);
  console.log(4);
}
console.log(5);
// 函数调用
fun();
fun();
fun();
```

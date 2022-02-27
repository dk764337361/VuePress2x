# IIFE 自调用函数
##  IIFE的定义
- `IIFE immediately invoked function expression` ，叫做即时调用的函数表达式，也叫做自调用函数，表示函数在定义时就立即调用。
- 函数调用方式：函数名或函数表达式的变量名后面加 () 运算符。
- 函数名定义的形式不能实现立即执行自调用，函数使用函数表达式形式可以实现立即执行，原因是因为函数表达式定义过程中，将一个函数矮化成了一个表达式，后面加 运算符就可以立即执行。

```js
    // 关键字定义的方式,不能立即执行
    function fun() {
      console.log(1);
    }();
```

- 启发：如果想实现 IIFE ，可以想办法将函数矮化成表达式。

## 函数矮化成表达式实现自调用。

### 第一种

```js
// 函数表达式方式,可以在定义时被立即执行
var foo = (function fun() {
  console.log(2);
})();
// console.log(foo());  //fun在外部调取不了，只能调取foo()
```

### 第二种
  - 函数矮化成表达式的方法，可以让函数参与一些运算，也就是说给函数前面加一些运算符。
  - 数学运算符：
    - ：+,-
    - ：逻辑运算符：！非运算
    ```js
    // 通过在函数前面添加操作符，可以将函数矮化成表达式
    +(function fun() {
      console.log(1);
    })();
    -(function fun() {
      console.log(1);
    })();
    (function fun() {
      console.log(1);
    })();
    !(function fun() {
      console.log(1);
    })();
    // *function fun() { //乘，不行
    //   console.log(1);
    // }();
    ```

* IIFE 结构可以关住函数的作用域，在结构外面是不能调用函数的。
### 第三种
* IIFE 最常用的是 () 运算符，而且函数可以不写函数名，使用匿名函数。

```js
// 常用的 IIFE 结构
(function(a) {
  console.log(a);
})(4);
// console.log(a); //调用不了
```

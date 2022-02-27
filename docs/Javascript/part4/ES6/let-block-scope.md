# let 与块级作用域

## 块级作用域
- 作用域：某个成员能够起作用的范围
- 在 ES2015 之前，ES 只有两种作用域
  - 全局作用域
  - 函数作用域
- 在 ES2015 之后，ES 新增`块级作用域`

  - 全局作用域
  - 函数作用域
  - 块级作用域

- 块，就是 {} 包裹起来的一个范围

<img src="/images/Javascript/ES6/04.jpg" style="width: 40%; display:inline-block; left: 0 ;">
<img src="/images/Javascript/ES6/05.jpg" style="width: 45%; display:inline-block; right: 0 ;">

## let

- 可以通过新的关键字 let 定义块内部的变量

### let 定义的变量在块级作用域内部能够被访问

```js
// if (true) {
//   var foo = 1;
// }
if (true) {
  let foo = 1;
}
console.log(foo); //Uncaught ReferenceError: foo is not defined
```

```js
// 通过循环批量添加事件
// 通过 let 定义变量，只能在块级内部被调用
var eles = [{}, {}, {}];
for (let i = 0; i < eles.length; i++) {
  eles[i].onclick = function() {
    console.log(i);
  };
}
eles[0].onclick();
```

### let 非常适合设置 在 for 循环中的循环变量

```js
// for (var i = 0 ; i < 3 ; i++) {
//   for (var i = 0; i < 3;i++) {
//     console.log(i);
    //0
    //1
    //2
//   }
// }
// 通过 let 定义变量，只在自己的循环中生效
for (let i = 0; i < 3; i++) {
  for (let i = 0; i < 3; i++) {
    console.log(i);
    //0
    //1
    //2
    //0
    //1
    //2
    //0
    //1
    //2
  }
}
```

### [循环]实际上有两层作用域

```js
// 循环 实际上有两层作用域
for (let i = 0; i < 10; i++) {
  let i = "foo";
  console.log(i);
}

// 两层作用域解释：
//第一层：
// let i = 0;
//第二层：
// if (i < 10) {
//   let i = "foo";
//   console.log(i);
// }
// i++;
```

### let 不会进行变量声明提升

```js
// 和 var 有另外一个区别，let 不会进行变量声明提升
console.log(a); //报错，let定义的变量必须先声明，再使用
// var a = 1;
let a = 2;
```

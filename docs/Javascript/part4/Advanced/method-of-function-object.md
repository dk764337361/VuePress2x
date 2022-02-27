# 函数对象的方法 call、apply、bind

## call()

- call() 方法调用一个函数, 其具有一个指定的 this 值和分别地提供的参数(参数的列表)。

  ::: tip 注意
  该方法的作用和 apply() 方法类似，只有一个区别，就是 call() 方法接受的是若干个参数的列表，而 apply() 方法接受的是一个包含多个参数的数组。
  :::

- 语法：fun.call(thisArg,arg1, arg2, arg3, ...)

- thisArg

在 fun 函数运行时指定的 this 值如果指定了 null 或者 undefined 则内部 this 指向 window

- arg1, arg2, ...

  指定的参数列表

```js
function fun(a, b) {
  console.log(this);
  console.log(a + b);
}
// 函数内部在调用时，this有自己默认的指向
console.dir(fun);
fun(3, 4);

// call 方法
// 1.功能：第一个可以指定函数的 this，第二个可以执行函数并传参
// 2.参数：第一个参数，传入一个指定让 this 指向的对象，第二个参数及以后，是函数参数的列表
// 3.返回值：就是函数自己的返回值
// 4.测试
var o = {
  name: "zs",
};
fun.call(o, 1, 2);
```

<img src="/images/Javascript/object/10.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

### call() 的应用

call()适合`类数组对象`的应用

```html{22-37}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      // 构造函数扩展原型对象方法
      // Array.prototype.getSum = function () {
      // this 的指向
      // };
      // 数组中的方法
      // var arr = [1,2,3,4];
      // 使用的是 Array 构造函数的原型对象上的方法
      // 方法内部的 this 指向的就是 arr 数组对象，操作的也是 arr 的对象
      // arr.push();
      // arr.splice();
      // arr.getSum();

      // {} 的对象自己是没有 push 方法的
      // 类数组对象 getElementsByTagName
      var o = {
        0: 10,
        1: 20,
        2: 30,
        length: 3,
      };
      // console.log(o[0])
      // 增加一项新的数据
      o["3"] = 40;
      o.length = 4;

      // 利用数组中的 push 方法，指定内部的this 为对象 o，就可以处理类数组对象的数据
      Array.prototype.push.call(o, 50);
      console.log(o);
    </script>
  </body>
</html>
```

## apply()

- apply() 方法调用一个函数, 第一个参数是一个指定的 this 值，第二个参数是以一个数组（或类似数组的对象）形式提供的参数。

::: tip 注意
该方法的作用和 call() 方法类似，只有一个区别，就是 call() 方法接受的是若干个参数的列表，而 apply() 方法接受的是一个包含多个参数的数组。
:::

- 语法：
  fun.apply(thisArg, [argsArray])

```js
function fun(a, b) {
  console.log(this);
  console.log(a + b);
}
// 函数内部在调用时，this有自己默认的指向
console.dir(fun);
fun(3, 4);

var o = {
  name: "zs",
};

// apply 方法
// 1.功能：第一个可以指定函数的 this，第二个可以执行函数并传参
// 2.参数：第一个参数，传入一个指定让 this 指向的对象，第二个参数是函数的参数组成的数组
// 3.返回值：就是函数自己的返回值
// 4.测试
fun.apply(o, [4, 5]);
```

<img src="/images/Javascript/object/11.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

### apply()的应用

apply() 更适合把`数组拆开`进行操作

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      // apply 方法可以指定一个函数的 this，并且通过数组方式进行传参
      // fun.apply(this,[1,2]);

      // 定义一个数组，利用 apply 方法，可以将它拆开进行操作
      var arr = [1, 3, 4, 6, 8];

      // 想借用一些现在内置在js 中的方法
      // console.log(Math.max(1,3,5,7,9));

      // 利用 apply 方法，将数组传给 max 的第二个参数
      console.log(Math.max.apply(Math, arr)); //8

      console.log(1, 2, 3); //1 2 3
      console.log.apply(console, arr); //1 3 4 6 8
    </script>
  </body>
</html>
```

## bind()

- bind() 函数会创建一个新函数（称为绑定函数），新函数与被调函数（绑定函数的目标函数）具有相同的函数体（在 ECMAScript 5 规范中内置的 call 属性）。
- 当目标函数被调用时 this 值绑定到 bind() 的第一个参数，该参数不能被重写。绑定函数被调用时，bind() 也接受预设的参数提供给原函数。
- 一个绑定函数也能使用 new 操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。
- 语法：
  fun.bind(thisArg,arg1, arg2, arg3, ...)
- 参数：
  - thisArg：当绑定函数被调用时，该参数会作为原函数运行时的 this 指向。当使用 new 操作符调用绑定函数时，该参数无效。
  - arg1, arg2, ...：当绑定函数被调用时，这些参数将置于实参之前传递给被绑定的方法。
- 返回值：返回由指定的 this 值和初始化参数改造的原函数拷贝。

```js
function fun(a, b, c, d) {
  console.log(this);
  console.log(a + b + c + d);
}
// 函数内部在调用时，this有自己默认的指向
console.dir(fun);
fun(3, 4);
var o = {
  name: "zs",
};
// bind 方法
// 1.功能：第一个可以指定函数的 this，bind 方法不能执行函数，但是可以传参
// 2.参数：第一个参数，传入一个指定让 this 指向的对象，第二个参数及以后，是函数参数的列表
// 3.返回值：返回一个新的指定了 this 的函数，也可以叫绑定函数
// 4.测试
var fn = fun.bind(o, 2, 3);
console.log(fn);
fn(6, 7);
```

<img src="/images/Javascript/object/12.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### bing()的应用

- 更改 定时器的函数内部的 this
- 更改 事件函数中的 this

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      // 想修改的是定时器的函数内部的 this
      var o = {
        name: "zs",
        age: 18,
        s: function() {
          setInterval(
            function() {
              console.log(this.age);
            }.bind(this),
            1000
          ); //bind绑定的是o
        },
      };
      // o.s();
      // 更改 事件函数中的 this
      document.onclick = function() {
        console.log(this);
      }.bind(o); //bind绑定的是o
    </script>
  </body>
</html>
```

## 总结

- call 和 apply 特性一样
  - 都是用来调用函数，而且是立即调用
  - 但是可以在调用函数的同时，通过第一个参数指定函数内部 this 的指向
  - call 调用的时候，参数必须以参数列表的形式进行传递，也就是以逗号分隔的方式依次传递即可
  - apply 调用的时候，参数必须是一个数组，然后在执行的时候，会将数组内部的元素一个一个拿出来，与形参一一对应进行传递
  - 如果第一个参数指定了 null 或者 undefined 则内部 this 指向 window
- bind
- 可以用来指定内部 this 的指向，然后生成一个改变了 this 指向的新的函数
- 它和 call、apply 最大的区别是：bind 不会调用
- bind 支持传递参数，它的传参方式比较特殊，一共有两个位置可以传递

1. 在 bind 的同时，以参数列表的形式进行传递
2. 在调用的时候，以参数列表的形式进行传递

- 那到底以谁 bind 的时候传递的参数为准呢还是以调用的时候传递的参数为准？

  两者合并：bind 的时候传递的参数和调用的时候传递的参数会合并到一起，传递到函数内部


# 函数闭包

## 回顾作用域、作用域链、预解析

- 全局作用域
- 函数作用域
- 没有块级作用域
- 内层作用域可以访问外层作用域，反之不行

## 什么是闭包

- 一个函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起（或者说函
  数被引用包围），这样的组合就是闭包（closure）。也就是说，闭包让你可以在一个内层函
  数中访问到其外层函数的作用域。在 JavaScript 中，每当创建一个函数，闭包就会在函数创
  建的同时被创建出来。

## 闭包的特点

- 函数定义时天生就能记住自己生成的作用域环境和函数自己，将它们形成一个密闭的环境，这就是闭包。不论函数以任何方式在任何地方进行调用，都会回到自己定义时的密闭环境进行执行。

<img src="/images/Javascript/object/Closures.png" style="width: 50%; display:inline-block; margin: 0 ;">

## 观察闭包

- 从广义上来说，定义在全局的函数也是一个闭包，只是我们没办法将这样的函数拿到更外面的作用域进行调用，从而观察闭包的特点。
- 闭包是天生存在的，不需要额外的结构，但是我们为了方便观察闭包的特点，需要利用一些特殊结构将一个父函数内部的子函数拿到父函数外部进行调用，从而观察闭包的存在。

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
      // 体会闭包
      // 将一个内部函数拿到父函数的外面，观察是否还能调用父函数内部的变量
      function outer() {
        var a = 10;
        function inner() {
          console.log(a);
        }
        // 将inner 函数作为返回值
        return inner;
      }

      // outer(); //什么都不输出
      // console.log(a);// 在outer函数的外面，是不能直接访问 a 变量

      // 将 outer 执行的结果，赋值给一个变量
      var inn = outer();
      // console.log(inn); // 输出function inner() {console.log(a);}

      // 在全局调用 inn，按道理应该查找全局的 a变量
      inn(); // 输出的真正结果是 10，来自于 outer 函数内部的变量
    </script>
  </body>
</html>
```

## 闭包的理解和应用

### 闭包的用途

- 可以在函数外部读取函数内部成员
- 让函数内成员始终存活在内存中

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
      // 体会闭包
      // 将一个内部函数拿到父函数的外面，观察是否还能调用父函数内部的变量
      function outer() {
        // 形成闭包环境中的变量不是一成不变的，可以被更改
        var a = 10;
        function inner() {
          console.log(a++);
        }
        // 将inner 函数作为返回值
        return inner;
      }
      var inn = outer();
      inn(); //10
      inn(); //11
    </script>
  </body>
</html>
```

## 闭包的问题
### 问题
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
      // 给数组中的每一项赋值一个 函数
      var arr = [];
      for (var i = 0; i <= 10; i++) {
        arr[i] = function() {
          console.log(i);
        };
      }
      // 目的：调用数组对应的项，输出它的对应下标
      // 问题：arr[i] 是暴露在全局作用域里，不能正确输出对应下标
      arr[0](); //11
      arr[1](); //12
      arr[2](); //13
    </script>
  </body>
</html>
```
### 解决
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
      // 给数组中的每一项赋值一个 函数
      var arr = [];
      for (var i = 0; i <= 10; i++) {
        // 使用·自调用函数·制造局部作用域
        (function(i) {
          arr[i] = function() {
            console.log(i);
          };
        })(i);
      }
      // 目的：调用数组对应的项，输出它的对应下标
      arr[0](); //0
      arr[1](); //1
      arr[2](); //2
    </script>
  </body>
</html>
```

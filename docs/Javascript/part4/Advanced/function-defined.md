# 函数定义方式

## 函数的定义方式

- 函数声明
- 函数表达式
- new Function

## 1. 函数声明
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
      // 3. 函数声明提升
      fun(); //1
      fn(); //Uncaught TypeError: fn is not a function
      // 1.函数声明
      // 必须定义函数名
      function fun() {
        console.log(1);
      }
      // 2.函数表达式
      // 是将函数赋值给一个变量，可以是一个匿名函数
      var fn = function() {
        console.log(2);
      };
      // fun(); //1
      // fn();//2
    </script>
  </body>
</html>
```
### 函数声明与函数表达式的区别

- 函数声明必须有名字
- 函数声明会函数提升，在预解析阶段就已创建，声明前后都可以调用
- 函数表达式类似于变量赋值
- 函数表达式可以没有名字，例如匿名函数
- 函数表达式没有函数提升，在执行阶段创建，必须在表达式执行之后才可以调用

## 2. 函数表达式
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
      // 提前调用
      // 现代浏览器进行的是变量声明提升
      // fn();
      // console.log(fn);
      // 低版本浏览器可以进行函数声明提升
      // 进行 if 语句中的函数提升

      var fn;
      // if (true) {
      //   function fn() {
      //     console.log("fn-true");
      //   }
      // } else {
      //   function fn() {
      //     console.log("fn-false");
      //   }
      // }
      if (true) {
        fn = function() {
          console.log("fn-true");
        };
      } else {
        fn = function() {
          console.log("fn-false");
        };
      }
      fn();
    </script>
  </body>
</html>
```


## 3. 函数也是对象（工作中不常使用）

- 函数本身也是一种对象，可以调用属性和方法

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
      function fn(a, b) {
        var a = 1;
        console.log(a + b);
      }
      // 通过构造函数方法定义函数，代码执行效率低
      // 函数本身也是一种对象
      var fun = new Function("a", "b", 'var a = "1";console.log(a+b)');
      fun(2, 3);
      console.dir(fun);
    </script>
  </body>
</html>
```

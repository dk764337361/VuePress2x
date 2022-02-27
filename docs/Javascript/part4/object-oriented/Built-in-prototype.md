# 原生构造函数的原型对象

所有函数都有 prototype 属性对象。

JavaScript 中的内置构造函数也有 prototype 原型对象属性：

- Object.prototype
- Function.prototype
- Array.prototype
- String.prototype
- Number.prototype
- ...

## 练习：为数组对象扩展原型方法。

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
      // 内置构造函数的原型对象
      // console.dir(Object.prototype);
      // console.dir(Function.prototype);
      // console.dir(Array.prototype);
      // console.dir(String.prototype);
      // console.dir(Number.prototype);

      // 扩展数组的原型方法↡↡↡↡↡↡

      // 不能直接给原型对象添加一个对象字母量的值，内置构造函数的原型对象不允许被更改
      // Array.prototype = {
      //   // 增加一个获取偶数项的和
      //   getEvenSum: function () {
      //     // 获取数组中每一项的方式
      //     // this[i]
      //     var sum = 0;
      //     for (var i = 0 ; i < this.length ; i++) {
      //       if (i % 2 === 0) {
      //         sum += this[i];
      //       }
      //     }
      //     return sum;
      //   }
      // };


      // 直接给原型对象添加一条新的属性
      // 不允许更改内置的原型对象
      Array.prototype.getEvenSum = function() {
        // 获取数组中每一项的方式
        // this[i]
        var sum = 0;
        for (var i = 0; i < this.length; i++) {
          if (i % 2 === 0) {
            sum += this[i];
          }
        }
        return sum;
      };
      // 定义一个数组
      var arr = [2, 4, 5, 7, 9];
      console.log(arr.getEvenSum());
      console.dir(Array.prototype);
    </script>
  </body>
</html>
```

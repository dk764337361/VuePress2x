# prototype原型对象

- 任何函数都具有一个 prototype 属性，该属性是一个对象。
- 可以在原型对象上添加属性和方法。
- 构造函数的 prototype 对象默认都有一个 constructor 属性，指向 prototype 对象所在函数。
- 通过构造函数得到的实例对象内部会包含一个指向构造函数的 prototype 对象的指针**proto**。
- 实例对象可以（通过 prototype 对象的指针**proto**）直接访问原型对象成员。

## 构造函数、实例、原型对象三者之间的关系

<img src="/images/Javascript/object/04.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

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
      // 定义构造函数
      function Person(name, age) {
        this.name = name;
        this.age = age;
      }
      // 获取 构造函数 的 prototype 属性
      console.log(Person.prototype);
      // 属性值是一个对象，通常叫做原型对象
      // 对象内部可以添加一些属性和方法
      Person.prototype.type = "human";
      Person.prototype.sayHi = function() {
        console.log("hello");
      };
      // Person.prototype.constructor = Array;
      // 构造函数的 原型对象上面都默认有一个 constructor 属性
      // console.log(Person.prototype.constructor);

      // 创建实例对象
      var p1 = new Person("Mike", 18);
      // 所有的对象都有一个 __proto__ 的属性，是一个指针，指向的就是生成实例对象的 构造函数的原型对象
      console.log(p1.__proto__);
      console.log(p1.__proto__ === Person.prototype);
      // __proto__ 属性并不是一个标准的属性，是浏览器自己根据语法自动生成的
      // p1.__proto__.sayHi();
      // 在真正开发的过程中，是不会书写 __proto__ 属性的
      p1.sayHi();
      // console.log(p1.constructor);
      // console.log(p1 instanceof Person);
    </script>
  </body>
</html>
```

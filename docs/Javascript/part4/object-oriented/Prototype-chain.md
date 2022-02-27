# 原型链

思考：为什么实例对象可以调用构造函数的 prototype 原型对象的属性和方法？

<img src="/images/Javascript/object/05.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## 原型链查找机制

每当代码读取某个对象的某个属性时，都会执行一次搜索，目标是具有给定名字的属性：

1. 搜索首先从对象实例本身开始
2. 如果在实例中找到了具有给定名字的属性，则返回该属性的值
3. 如果没有找到，则继续搜索指针指向的原型对象，在原型对象中查找具有给定名字的属性
4. 如果在原型对象中找到了这个属性，则返回该属性的值

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
      // 自定义构造函数
      function Person(name, age) {
        this.name = name;
        this.age = age;
        // this.sayName = function () {
        //   console.log("hello");
        // }
      }
      // 将所有实例共享的属性和方法，都添加给原型对象
      Person.prototype.type = "human";
      // Person.prototype.sayName = function () {
      //   console.log(this.name);
      // };
      // 生成对象实例
      var person1 = new Person("Bob", 18);
      var person2 = new Person("Mike", 20);

      // 方法的调用查找
      // person1.sayName();//hello
      console.log(person1.valueOf()); //Person
      // console.log(person1); //Person {name: 'Bob', age: 18 [[Prototype]]: Object}

      // var o = person1.__proto__;   //指向的是 Person 构造函数的原型对象
      // // 任何一个对象都有 __proto__ 属性，指向的就是该对象的 构造函数的 原型对象
      // var o2 = o.__proto__;
      // console.log(o2.constructor);  //ƒ Object() { [native code] }
      // console.dir(o2);              //Object
      // console.dir(o2.__proto__);    //null
    </script>
  </body>
</html>
```

## 实例对象读写原型对象成员

### 读取：

- 先在自己身上找，找到即返回
- 自己身上找不到，则沿着原型链向上查找，找到即返回
- 如果一直到原型链的末端还没有找到，则返回 undefined

### 值类型成员写入（实例对象.值类型成员 = xx）：

- 当实例期望重写原型对象中的某个普通数据成员时实际上会把该成员添加到自己身上
- 也就是说该行为实际上会屏蔽掉对原型对象成员的访问引用类型成员写入（实例对象.引用类型成员 = xx）：
- 同上

### 复杂类型成员修改（实例对象.成员.xx = xx）：

- 同样会先在自己身上找该成员，如果自己身上找到则直接修改
- 如果自己身上找不到，则沿着原型链继续查找，如果找到则修改
- 如果一直到原型链的末端还没有找到该成员，则报错（实例对象.undefined.xx = xx）

```js
// 自定义构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
}
// 将所有实例共享的属性和方法，都添加给原型对象
Person.prototype.type = "human";
Person.prototype.sayName = function() {
  console.log(this.name);
};
// 添加一个新的属性给原型对象，值是一个对象类型
Person.prototype.address = {
  city: "北京",
};
// 生成对象实例
var person1 = new Person("Bob", 18);
var person2 = new Person("Mike", 20);

// 读取 属性和方法
// console.log(person1.type);
// console.log(person1.city);
// console.log(person1.sayName);
// person1.sayName();

// 通过实例对象添加新成员,会直接添加给自己，会屏蔽掉对原型对象的访问
person1.sex = "male";
person1.sayAge = function() {
  console.log(this.age);
};

// 如果通过实例对象更改原型对象的属性和方法,会直接添加给自己，会屏蔽掉对原型对象的访问
person1.type = "person";
person1.sayName = function() {
  console.log(this.name);
};

// 通过实例对象更改原型对象中复杂类型数据中的内容,还是会进行原型链的查找
person1.address.city = "上海";

console.dir(person1);
```

<img src="/images/Javascript/object/06.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## 更简单的原型语法

前面在原型对象每添加一个属性和方法就要书写一遍 Person.prototype 。

为减少不必要的输入，更常见的做法是用一个包含所有属性和方法的对象字面量来重写整个原型对象，将 Person.prototype 重置到一个新的对象。

::: danger 注意
原型对象会丢失 constructor 成员，所以需要手动将 constructor 指向正确的构造函数。
:::

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
      // 自定义构造函数
      function Person(name, age) {
        this.name = name;
        this.age = age;
      }
      // 将所有实例共享的属性和方法，都添加给原型对象
      // Person.prototype.type = "human";
      // Person.prototype.sayName = function () {
      //   console.log(this.name);
      // };

      // 直接使用一个对象字面量对 原型对象进行赋值
      Person.prototype = {
        constructor: Person, // 需要手动 将 constructor 属性指向正确的构造函数
        type: "human",
        sayName: function() {
          console.log(this.name);
        },
      };
      // 生成对象实例
      var person1 = new Person("Bob", 18);
      var person2 = new Person("Mike", 20);

      person1.sayName();
      console.log(person2.constructor);
    </script>
  </body>
</html>
```

## 原型对象使用建议

在定义构造函数时，可以根据成员的功能不同，分别进行设置：

- 私有成员（一般就是非函数成员）放到构造函数中
- 共享成员（一般就是函数）放到原型对象中
- 如果重置了 prototype 记得修正 constructor 的指向

# 创建对象的几种方式

- new Object()构造函数
- 对象字面量 {}
- 工厂函数
- 自定义构造函数

::: tip 提示
面向对象编程中，使用的定义对象的方法是`自定义构造函数`
:::

<CodeGroup>
<CodeGroupItem title="new Object()构造函数" active>

```js
// 简单方式：new Object()
var person = new Object();
person.name = "Bob";
person.age = 18;
person.sayName = function() {
  console.log(this.name);
};
person.sayName();
```

  </CodeGroupItem>

  <CodeGroupItem title="对象字面量 {}" >

```js
// 对象字面量化简
var person1 = {
  name: "Bob",
  age: 18,
  sayName: function() {
    console.log(this.name);
  },
};
var person2 = {
  name: "Mike",
  age: 20,
  sayName: function() {
    console.log(this.name);
  },
};
person1.sayName();
person2.sayName();
```

  </CodeGroupItem>

  <CodeGroupItem title="工厂函数" >

```js
// 工厂函数
function createPerson(name, age) {
  // 添加一个新对象
  var person = new Object();
  person.name = name;
  person.age = age;
  person.sayName = function() {
    console.log(this.name);
  };
  // 必须有返回值
  return person;
}
// 工厂函数化简
// function createPerson(name, age) {
//   return {
//     name: name,
//     age: age,
//     sayName: function() {
//       console.log(this.name);
//     },
//   };
// }

// 生成真正的对象
var person1 = createPerson("John", 19);
var person2 = createPerson("Mike", 18);
person1.sayName();
```

  </CodeGroupItem>

  <CodeGroupItem title="自定义构造函数" >

```js
// 自定义构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayName = function() {
    console.log(this.name);
  };
}
var person1 = new Person("Bob", 18);
var person2 = new Person("Mike", 20);
person1.sayName();
person2.sayName();
```

  </CodeGroupItem>

</CodeGroup>

## 构造函数和实例对象的关系

- 构造函数是根据具体的事物抽象出来的抽象模板
- 实例对象是根据抽象的构造函数模板得到的具体实例对象
- 每一个实例对象都通过一个 `constructor` 属性，指向创建该实例的构造函数
  ::: warning 注意
  `constructor` 是实例的属性的说法不严谨，具体后面的原型会讲到
  :::
- 可以通过 `constructor` 属性判断实例和构造函数之间的关系

::: warning 注意
这种方式不严谨，推荐使用 `instanceof` 操作符，后面学原型会解释为什么
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
        this.sayName = function() {
          console.log(this.name);
        };
      }
      // 生成对象实例
      // new 关键字的用途
      // 1.创建一个新对象
      // 2.将函数内部的 this 指向了这个新对象
      // 3.执行构造函数内部的代码
      // 4.将新对象作为返回值
      var person1 = new Person("Bob", 18);
      var person2 = new Person("Mike", 20);
      // 演示 new 的功能↡↡↡↡↡↡
      // function Person(name,age) {
      //   // var instance = new Object();
      //   // this = instance;
      //   this.name = name;
      //   this.age = age;
      //   this.sayName = function () {
      //     console.log(this.name);
      //   };
      //   // return instance;
      // }
      // 调用方法
      person1.sayName();
      person2.sayName();

      // 通过构造函数生成的实例是可以找到自己当初的构造函数的
      var arr = new Array(1, 2);
      console.log(arr);
      // constructor 属性，构造器、构造函数
      // 每个对象的 constructor 属性值就是生成这个对象的构造函数
      // console.log(arr.constructor);
      // console.log(person1.constructor);

      // 判断一个对象的具体对象类型，需要使用 instanceof 进行判断
      console.log(person1 instanceof Person);
      console.log(person1 instanceof Array);
    </script>
  </body>
</html>
```

## 静态成员和实例成员

- 使用构造函数方法创建对象时，可以给构造函数和创建的实例对象添加属性和方法，这些属性和方法都叫做成员。
  - 实例成员：在构造函数内部添加给 this 的成员，属于实例对象的成员，在创建实例对象后必须由对象调用。
  - 静态成员：添加给构造函数自身的成员，只能使用构造函数调用，不能使用生成的实例对象调用。

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
        // 实例成员  ，通过将来生成的实例对象进行调用的成员
        // 创建时，是直接添加给函数内部的 this
        this.name = name;
        this.age = age;
        this.sayName = function() {
          console.log(this.name);
        };
      }
      // 静态成员 -- 直接给构造函数添加的成员
      Person.version = "1.0";
      // 生成对象实例
      var person1 = new Person("Bob", 18);
      var person2 = new Person("Mike", 20);

      // 调用实例成员
      console.log(person1.name); //Bob
      // 使用构造函数调用实例成员会出错
      // console.log(Person.name); //输出Person，而不是Bob
      // Person.sayName(); //Person.sayName is not a function

      // 调用静态成员,只能通过构造函数进行调用
      console.log(Person.version); //1.0
      console.log(person1.version); //undefined
    </script>
  </body>
</html>
```

## 构造函数的问题

- 浪费内存

为什么会浪费内？

创建实例 person1 和实例 person2 相当于在内存开辟了两个`Person`构造函数，且他们俩指代的`Person`构造函数是不一样的，

```js
// 自定义构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
  // this 内部的 type 属性值是不变的
  this.type = "human";
  // 每个对象的 sayName 方法也是一样的
  this.sayName = function() {
    console.log(this.name);
  };
}
// 生成对象实例
var person1 = new Person("Bob", 18);
var person2 = new Person("Mike", 20);
// 判断各自的方法是否是同一个函数
console.log(person1.sayName === person2.sayName); //false
```

### 解决方法 1： 将公共的函数提取到构造函数之外(不推荐)

```js
// 解决方法1： 将公共的函数提取到构造函数之外
function sayName() {
  console.log(this.name);
}
// 问题：如果有多个公共函数，需要在外部创建多个函数，可能会造成命名冲突
function sayAge() {
  console.log(this.age);
}
function Person(name, age) {
  this.name = name;
  this.age = age;
  // this 内部的 type 属性值是不变的
  this.type = "human";
  // 每个对象的 sayName 方法也是一样的
  this.sayName = sayName;
  this.sayAge = sayAge;
}
```

### 解决方法第 2：将多个公共的函数封装到一个对象(不推荐)

```js
// 解决方法第2种：将多个公共的函数封装到一个对象
var fns = {
  sayName: function() {
    console.log(this.name);
  },
  sayAge: function() {
    console.log(this.age);
  },
};
function Person(name, age) {
  this.name = name;
  this.age = age;
  // this 内部的 type 属性值是不变的
  this.type = "human";
  // 每个对象的 sayName 方法也是一样的
  this.sayName = fns.sayName;
  this.sayAge = fns.sayAge;
}
// 生成对象实例
var person1 = new Person("Bob", 18);
var person2 = new Person("Mike", 20);

// person1.sayName();
console.log(person1.sayName === person2.sayName);
console.log(person1.sayAge === person2.sayAge);
```

### 解决方法第 3：通过构造函数的 prototype 属性

- JavaScript 规定，每一个构造函数都有一个 [prototype 属性](/Javascript/part4/object-oriented/prototype.md#prototype原型对象)，指向构造函数的原型对象。
- 这个原型对象的所有属性和方法，都会被构造函数的实例对象所拥有。
- 因此，我们可以把所有对象实例需要共享的属性和方法直接定义在 prototype 对象上。
- 解决内存浪费问题

```js
// 自定义构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
}
// 更优的解决方法，将所有实例共享的属性和方法，都添加给原型对象
Person.prototype.type = "human";
Person.prototype.sayName = function() {
  // 方法调用时，哪个对象调用，this 指向的就是谁
  console.log(this.name);
};
Person.prototype.sayAge = function() {
  // 方法调用时，哪个对象调用，this 指向的就是谁
  console.log(this.age);
};
// 生成对象实例
var person1 = new Person("Bob", 18);
var person2 = new Person("Mike", 20);

// 调用原型对象上公用的属性和方法
person2.sayAge();
console.log(person1.sayAge === person2.sayAge);
```

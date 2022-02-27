# 创建对象的方式

## 方法一：[对象字面量创建对象【重点】](../object/literal#对象字面量)

## 方法二：new Object()方法创建对象

- Object() 构造函数 ，是一种特殊的函数。主要用来在创建对象时初始化对象 即为对象成
  员变量赋初始值，总与 new 运算符一起使用在创建对象的语句中。
  - 构造函数用于创建一类对象，首字母要大写。
  - 构造函数要和 new 一起使用才有意义。

### new 在执行时会做四件事情

- new 会在内存中创建一个新的空对象
- new 会让 this 指向这个新的对象
- 执行构造函数 目的：给这个新对象加属性和方法
- new 会返回这个新对象

```js
// new Object() 方法创建
var person1 = new Object(); //创建了一个新的空的对象
// 添加属性和方法
person1.name = "zs";
person1.age = 18;
person1.sex = true;
person1.sayHi = function() {
  console.log("你好");
  // console.log(this.name + "向你说您好");
};
```

## 方法三：工厂方法创建对象

- 如果要创建多个类似的对象，可以将 new Object() 过程封装到一个函数中，将来调用函数就能创建一个对象，相当于一个生产对象的函数工厂，用来简化代码。

```js
// 工厂方法就是相当于对 new Object() 方法的一个封装
function createPerson(name, age, sex) {
  // 创建一个空对象
  var person = new Object();
  // 添加属性和方法，属性可以接受参数的值
  person.name = name;
  person.age = age;
  person.sex = sex;
  person.sayHi = function() {
    console.log("hello");
  };
  // 将对象作为函数的返回值
  return person;
}
// 想创建一个对象，可以调用工厂函数
var p1 = createPerson("zs", 18, true);
var p2 = createPerson("ls", 19, false);
// 输出
console.log(p1);
console.log(p2);
```

## 方法四：自定义构造函数创建对象【重点】

- 比工厂方法更加简单。
- 自定义一个创建具体对象的构造函数，函数内部不需要 new 一个构造函数的过程，直接使用 this 代替对象进行属性和方法的书写，也不需要 return 一个返回值。
- 使用时，利用 new 关键字调用自定义的构造函数即可。

::: warning 注意
构造函数的函数名首字母需要大写，区别于其他普通函数名。
:::

```js
// 自己定义一个构造函数
function Person(name, age, sex) {
  // 不需要使用 new 一个新对象
  // 用 this 替代将来创建的新对象
  this.name = name;
  this.age = age;
  this.sex = sex;
  this.sayHi = function() {
    console.log("hello");
  };
  // 不需要添加 return
}
// 用 new 关键字调用构造函数
var p1 = new Person("zs", 18, true);
console.log(p1);
```

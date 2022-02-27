# class 类

```js
// class 类
//旧方法
// function Person(name, age) {
//   this.name = name;
//   this.age = age;
// }
// Person.prototype.sayHi = function () {
//   console.log(`hi,my name is ${this.name}`)
// }

//ES6方法
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  sayHi() {
    console.log(`hi,my name is ${this.name}`);
  }
}
const p1 = new Person("tom", 18);
console.log(p1);
p1.sayHi();
```

<img src="/images/Javascript/ES6/06.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

## 静态方法 static

静态方法 vs 实例方法

ES2015 中新增添加静态方法的关键词 static

::: warning 注意
静态方法里的`this`不是指向某个实例对象，而是指向类型自己（class Person）
:::

```js
// 静态方法
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  sayHi() {
    console.log(`hi,my name is ${this.name}`);
  }
  static create(name, age) {
    console.log(this);
    return new Person(name, age);
  }
}
const p1 = Person.create("zs", 19);
console.log(p1);
```

<img src="/images/Javascript/ES6/07.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

## 类的继承 extends

```js
// 静态方法
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  sayHi() {
    console.log(`hi,my name is ${this.name}`);
  }
}
class Student extends Person {
  constructor(name, age, number) {
    super(name, age); //使用父类的super(),调用父类的constructor
    this.number = number;
  }
  hello() {
    super.sayHi();//使用父类的super(),调用父类的 sayHi()
    console.log(`学号是 ${this.number}`);
  }
}
const s1 = new Student("tom", 18, 101);
s1.hello();
```

# 构造函数的属性继承

- 借用构造函数

## 借用构造函数的原型方法继承

### 1. 拷贝继承（for-in）

```html{27-35}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <script>
      // 构造函数的属性的继承
      // 人类类型
      function Person(name, age, sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
      }
      // 父类型的原型对象中有方法也需要继承
      Person.prototype.sayHi = function() {
        console.log("你好");
      };
      // 学生类型
      function Student(name, age, sex, score) {
        Person.call(this, name, age, sex);
        this.score = score;
      }
      // 子类型的原型对象上，需要继承父类型原型对象的方法
      // 方法1：对象拷贝继承
      for (var k in Person.prototype) {
        // 保留自己的 constructor 不要进行继承
        if (k === "constructor") {
          continue;
        }
        Student.prototype[k] = Person.prototype[k];
      }

      // 老师类型
      function Teacher(name, age, sex, salary) {
        Person.call(this, name, age, sex);
        this.salary = salary;
      }
      // 创建学生的实例对象
      var s1 = new Student("zs", 18, "男", 89);
      var s2 = new Student("ls", 19, "男", 92);
      console.dir(s1);
      console.dir(s2);
      s1.sayHi();
    </script>
  </body>
</html>
```

### 2. 原型继承的方法一：原型链

- 原型对象，可以将自己的属性和方法继承给将来的实例对象使用
- 缺点：new Person("zs",18,"男");传参只能传一次

```html{29-32}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      // 封装的构造函数就是用来创建一类对象
      // 继承指的是 类型 和 类型之间的继承
      // 学生类型  老师类型  --> 抽象，提取所有的公共的属性，放到一个 父类型中
      // 当前学习阶段，没有一个专门的用来继承的方法

      // 人类类型
      function Person(name, age, sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
      }
      // 学生类型
      function Student(score) {
        this.score = score;
      }
      // 老师类型
      function Teacher(salary) {
        this.salary = salary;
      }
      // 原型对象，可以将自己的属性和方法继承给将来的实例对象使用
      // 缺点：new Person("zs",18,"男");传参只能传一次
      Student.prototype = new Person("zs", 18, "男");
      Student.prototype.constructor = Student;
      // 生成一个实例
      var s1 = new Student(89);
      var s2 = new Student(100);
      console.dir(s1);
      console.dir(s2);
      console.log(s1.name);
      console.log(s1.constructor);
    </script>
  </body>
</html>
```

### 2.1 原型继承的方法二：对父类型的构造函数进行一个普通调用

<!-- ### 原型继承的缺点改进
- 直接对父类型的构造函数进行一个普通调用 -->

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
      // 构造函数的属性的继承
      // 人类类型
      function Person(name, age, sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
      }
      // 学生类型
      function Student(name, age, sex, score) {
        // 直接对父类型的构造函数进行一个普通调用
        // Person 普通调用过程中，内部的 this 指向的是 window
        // 可以通过 call 方法更改Person 内部的 this
        Person.call(this, name, age, sex); //this更改后指向Student
        this.score = score;
      }
      // 老师类型
      function Teacher(name, age, sex, salary) {
        Person.call(this, name, age, sex);
        this.salary = salary;
      }
      // 创建学生的实例对象
      var s1 = new Student("zs", 18, "男", 89);
      var s2 = new Student("ls", 19, "男", 92);
      console.dir(s1);
      console.dir(s2);
    </script>
  </body>
</html>
```

### 3. 组合继承(推荐)

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
      // 组合继承：属性在构造函数内部继承，方法通过原型继承
      function Person(name, age) {
        this.name = name;
        this.age = age;
      }
      Person.prototype.sayHi = function() {
        console.log("你好");
      };
      // 生成一个子类型
      function Teacher(name, age, salary) {
        // 继承父类的属性
        Person.call(this, name, age);
        this.salary = salary;
      }
      // 方法继承，通过原型对象继承
      Teacher.prototype = new Person();
      Teacher.prototype.constructor = Teacher;
      // 生成老师的一个实例
      var t1 = new Teacher("wang", 45, 10000);
      console.dir(t1);
      console.log(t1.name);
      t1.sayHi();
    </script>
  </body>
</html>
```

# 对象数据的调用和更改

## 调用方法

- 用对象的变量名打点调用某个属性名，得到属性值。

```js
console.log(person1.name);
console.log(person1.age);
console.log(person1.sex);
```

- 用对象的变量名后面加 [] 调用，[] 内部是字符串格式的属性名。

```js
console.log(person1["name"]);
person1["sayHi"]();
```

- 调用方法时，需要在方法名后加 () 执行。

```js
person1.sayHi();
```

- 在对象内部用 this 打点调用属性名。 this 替代对象。

```js{7}
// 通过对象字面量方式创建一个对象
var person1 = {
  name: "zs",
  age: 18,
  sex: "male",
  sayHi: function() {
    console.log(this.name + "向你说您好");
  },
};
person1.sayHi();
```

## 更改对象内部属性和方法的语法

- 更改属性的属性值方法：先调用属性，再等号赋值。

```js
// 更改数据
person1.age = 19;
```

- 增加新的属性和属性值：使用`点语法`或者`[]方法`直接定义新属性，等号赋值。

```js
// 添加新数据
person1.weight = 140;
```

- 删除一条属性：使用一个 delete 关键字，空格后面加属性调用。

```js
// 删除属性
delete person1.sex;
```

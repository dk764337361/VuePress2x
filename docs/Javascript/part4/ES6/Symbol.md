# Symbol() 一种全新的原始数据类型

## 功能和特性

主要功能：就是为对象添加独一无二的`属性`标识符

特性：通过 Symbol()函数产生的数据都是唯一的

```js
// shared.js =============================
// const cache = {}
// // a.js ==================================
// cache['a_foo'] = Math.random()
// // b.js ==================================
// cache['b_foo'] = 123

// console.log(cache)

// Symbol 符号，作用就是表示一个独一无二的值
// const s = Symbol()
// console.log(s)
// console.log(typeof s)
// console.log(Symbol() === Symbol()) //false,表示两个Symbol()都是独一无二的
// console.log(Symbol('foo'))
// console.log(Symbol('bar'))
// console.log(Symbol('baz'))

const obj = {
  [Symbol()]: 789,
  name: "zs",
};
obj[Symbol()] = 123;
obj[Symbol()] = 456;
console.log(obj[Symbol()]); //undefined，外部读取不了obj内部的私有成员
console.log(obj.name);
```
## Symbol.for()
```js
//Symbol.for()方法自动把非字符串转换为字符串
const a = Symbol.for(true);
const b = Symbol.for("true");
console.log(a === b); //true
```

## Symbol.toStringTag
```js
//Symbol.toStringTag修改对象的toString标签
const obj = {};
console.log(obj.toString()); //[object Object]

const obj = {
  [Symbol.toStringTag]: "XObject",
};
console.log(obj.toString()); //[object XObject]
```

## 获取内部的[Symbol()]
```js
const obj = {
  [Symbol()]: "Symbol value",
  foo: "foo value",
};
for (var k in obj) {
  console.log(k); //foo ，拿不到内部的[Symbol()]
}
console.log(Object.getOwnPropertySymbols(obj)); //可以拿到内部的[Symbol()]，但是拿不到值
console.log(Object.keys(obj)); //['foo']  ，拿不到内部的[Symbol()]
console.log(JSON.stringify(obj)); //{"foo":"foo value"}，拿不到内部的[Symbol()]
```

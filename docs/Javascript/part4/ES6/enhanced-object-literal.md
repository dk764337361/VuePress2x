# 对象字面量增强

```js
// 对象字面量增强
const bar = "bar";
// const bar = "123";
const age = "age";
const obj = {
  name: "tom",
  //旧方法
  // bar: bar
  //ES6方法
  bar,
  //旧方法
  // sayHi: function () {
  //   console.log("hi");
  //   console.log(this);
  // },
  //ES6方法
  sayHi() {
    console.log("hi");
    console.log(this);
  },
};
console.log(obj);
```

```js
// 对象字面量增强
const bar = "bar";
const age = "age";
const obj = {
  name: "tom",
  bar,
  sayHi() {
    console.log("hi");
    console.log(this);
  },
  // 计算属性名
  //ES6方法
  [1 + 2]: 18,
  [age]: 19,
};
//旧方法
// obj[age] = 18
console.log(obj);
obj.sayHi();
```

# 箭头函数与 this

箭头函数内部没有 `this` 机制，需要从外部进行查找。

```js
// 箭头函数与 this
const person = {
  name: "tom",
  // sayHi: function () {
  //   console.log(`hi,my name is ${this.name}`) //(4) [1, 3, 5, 7]
  // }
  // sayHi: () => {
  //   console.log(`hi,my name is ${this.name}`)//什么都没输出
  // }
  sayHi: function() {
    // const _this = this;
    setTimeout(() => {
      //利用箭头函数内部没有 `this` 机制，解决setTimeout()内部this指向windows的缺陷。
      //此时this指向const person
      console.log(`hi,my name is ${this.name}`);
    }, 1000);
  },
};
person.sayHi();
```

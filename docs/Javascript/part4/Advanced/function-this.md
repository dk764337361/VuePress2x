# 函数的调用和 this

## 函数的调用方法

### 普通函数

```js
// 1. 普通的函数，是通过 给函数名或者变量名添加 （） 方式执行
// 内部的 this 默认指向 window
function fun() {
  console.log(this);
}
fun();
```

### 构造函数

```js
// 2.构造函数，是通过 new 关键字进行调用
// 内部的 this 指向的是将来创建的实例对象
function Person(name) {
  this.name = name;
  console.log(this);
}
var p1 = new Person("zs");
Person();
```

### 对象方法

```js
function fun() {
  console.log(this); //Window
}
fun();
// 3.对象中的方法，是通过对象打点调用函数，然后加小括号
// 内部的 this 默认指向的是调用的对象自己
var o = {
  sayHi: function() {
    console.log("haha");
  },
  fn: fun,
};
// this 的指向是要联系执行的上下文，在调用的时候，是按照什么方式调用，指向是不一样的
o.fn(); //Object
// o.sayHi();
```

### 事件函数

```js
// 4.事件函数，不需要加特殊的符号，只要事件被触发，会自动执行函数
// 事件函数的内部 this 指向的是事件源
document.onclick = function() {
  console.log("事件");
};
```

### 定时器、延时器的函数

```js
// 5.定时器和延时器中的函数，不需要加特殊的符号，只要执行后，在规定的时间自动执行
// 默认内部的 this 指向的是 window
setInterval(function() {
  console.log("time");
}, 1000);
```

## 函数内 this 指向的不同场景

- 函数的调用方式决定了 this 指向的不同：
  <img src="/images/Javascript/object/09.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

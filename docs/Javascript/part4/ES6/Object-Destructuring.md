# 对象的解构

```js
// 对象解构
const obj = { name: "zs", age: 18 };
const { name } = obj;
console.log(name); //zs
```

```js
const obj = { name: "zs", age: 18 };
const name = "tom";
const { name: newName = "jack" } = obj; //把变量名newName代替name，并初始化默认值newName = "jack"
console.log(name); //tom
console.log(newName);//zs
```
- console对象解构
```js
const { log } = console;
log("haha");//haha
```

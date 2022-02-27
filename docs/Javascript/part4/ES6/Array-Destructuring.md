# 数组的解构

## 解构化简

```js
// 数组解构
const arr = [100, 200, 300];
const foo = arr[0];
const bar = arr[1];
const baz = arr[2];
console.log(foo, bar, baz);

// 数组解构·化简
const arr = [100, 200, 300];
const [foo, bar, baz] = arr;
console.log(foo, bar, baz); //100 200 300
```

## 解构位置

```js
//输出指定位置
const arr = [100, 200, 300];
const [, , baz] = arr;
console.log(baz); //300

const arr = [100, 200, 300];
const [foo] = arr;
console.log(foo); //foo

//输出其余所有
const arr = [100, 200, 300];
const [foo, ...rest] = arr;
console.log(rest); //(2) 200 300
```

## 解构过程

```js
const arr = [100, 200, 300];
const [foo, bar, baz, more] = arr;
console.log(more); //undefined

const arr = [100, 200, 300];
const [foo, bar, baz = 400, more = 123] = arr;
console.log(more); //123
console.log(baz); //300

const path = "foo/bar/baz";

//过去使用的方法
// const temp = path.split("/")
// const a = temp[1]

//现在使用数组解构更方便
const [, , a] = path.split("/");
console.log(a);
```

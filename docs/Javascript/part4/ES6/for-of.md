# for…of 循环

- 以往的循环遍历有
  - for(){} 普通 for 循环
  - for in 遍历对象
  - forEach 遍历数组、Set 和 Map 数据解构

然而这些遍历数据方式都有一定的局限性

现在引入了一种全新的遍历方式 for...of 循环，作为遍历所有数据结构的统一方式

## 遍历普通数组

```js
// for……of 循环
const arr = [100, 200, 300, 400];

for (const item of arr) {
  console.log(item);
}

arr.forEach((item) => {
  //forEach没有办法打断遍历
  console.log(item);
});

for (const item of arr) {
  //for……of可以打断遍历
  console.log(item);
  if (item >= 200) {
    break;
  }
}
```

## 遍历 Set 和 Map 数据解构

```js
const s = new Set(["foo", "bar", "baz"]);
for (const item of s) {
  console.log(item);
}

const m = new Map();
m.set("foo", 1);
m.set("bar", 2);
for (const item of m) {
  console.log(item);
}
for (const [key, value] of m) {
  console.log(key, value);
}
```

## 遍历对象

::: danger 注意
使用 for……of 遍历`对象字面量`，会报错，暂时使用 for in 。
:::

```js
const obj = {
  name: "zs",
  age: 18,
};
for (const item of obj) {
  console.log(item); //Uncaught TypeError: obj is not iterable
}
```

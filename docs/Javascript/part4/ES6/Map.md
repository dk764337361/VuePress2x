# Map 数据解构

功能：解决对象里的键只能是字符串类型的缺点，扩展更多类型。

Map 数据结构 的方法

<img src="/images/Javascript/ES6/09.jpg" style="width: 50%; display:inline-block; margin: 0 ;">


```js
// Map 数据结构

//以前：
// const obj = {}
// obj[true] = "boolean"
// obj[123] = "number"
// obj[{a: 1}] = "object"

// console.log(Object.keys(obj))
// console.log(obj[{}])
// console.log(obj['[object Object]'])

//现在：使用ES6的Map 解决对象里的键只能是字符串类型的缺点，扩展更多类型。
const map = new Map();
const a = { a: 1 };
map.set(a, 100);
console.log(map);
console.log(map.get(a)); //100

// map.has()
// map.delete()
// map.clear()

map.forEach((value, key) => {
  console.log(key, value); //{a: 1} 100
});
```

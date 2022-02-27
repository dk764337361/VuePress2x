# Set 数据结构

Set 数据结构 的方法

<img src="/images/Javascript/ES6/08.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

```js
// Set 数据结构
const s = new Set()
s.add(1).add(2).add(3).add(4).add(2)
console.log(s)

// s.forEach(i => console.log(i)) //set的遍历数组方法

// for (let i of s) {  //ES6的 for of 遍历方法
//   console.log(i)
// }

// console.log(s.size) //size：数据长度

// console.log(s.has(4))//has()是否包含某项数据，包含则true

// console.log(s.delete(100))//delete()删除某项数据，删除成功则返回true,失败则false。删除的数据不可恢复。
// console.log(s)

// s.clear()//删除所有的数据，删除的数据不可恢复。
// console.log(s)
```

## 应用场景：数组去重

```js
// 数组去重
const arr = [1.3, 4, 6, 2, 4, 7, 5, 8];
//方法一：
//ES2015新增 Array.from() 把对象中的每一项转为数组的每一项
// const b = Array.from(new Set(arr))

//方法二：
const b = [...new Set(arr)];
console.log(b);
```

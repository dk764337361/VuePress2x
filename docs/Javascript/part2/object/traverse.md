# 遍历对象(for in循环)方式

对象遍历
- `for in` 循环也是循环的一种，专门用来遍历对象，内部会定义一个 k 变量， k 变量在每次循环时会从第一个开始接收属性名，一直接收到最后一条属性名，执行完后跳出循环。
- 简单的循环遍历：输出每一项的属性名和属性值。

```js
//循环遍历输出每一项
for (var k in obj) {
  console.log(k + "项的属性值是 " + obj[k]);
}
```

## 案例：

```js
// 通过对象字面量方式创建一个对象
var person1 = {
  name: "zs",
  age: 18,
  sex: "male",
  sayHi: function() {
    console.log(this.name + "向你说您好");
  },
};

// 遍历对象
for (var k in person1) {
  // k 存储的是每一条数据的属性名或者方法名
  console.log(k + "属性的属性值为" + person1[k]);
}
```

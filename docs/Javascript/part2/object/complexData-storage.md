# 复杂数据类型的存储

## 复杂类型在内存中的存储

如果将复杂类型的数据赋值给一个变量，复杂类型的数据会在内存中创建一个原型，而变量中存储的是指向对象的一个地址，如果将变量赋值给另一个变量，相当于将地址复制一份给了新的变量，两个变量的地址相同，指向的是同一个原型，不论通过哪个地址更改了原型，都是在原型上发生的更改，两个变量下次访问时，都会发生变化。

<img src="/images/Javascript/026.jpg" style="width: 100%; display:inline-block; margin: 0 auto;">

```js
// 复杂数据类型
var p1 = {
  name: "zs",
  age: 18,
  sex: "male",
};
var p = p1; //p1 将内部存储的指向对象原型的地址复制给了 p
// 两个变量之间是一个联动的关系，一个变化，会引起另一个变化
p.name = "ls";
console.log(p);
console.log(p1);

// 数组和函数存储在变量中时，也是存储的地址
var arr = [1, 2, 3, 4];
var arr2 = arr;
arr[4] = 5;
console.log(arr);
console.log(arr2);
```

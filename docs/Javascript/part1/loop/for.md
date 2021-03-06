# for 循环

- for 循环是一种前测试循环语句，在反复执行一段代码之前，都要先测试入口条件，如果条件为真，可以继续循环，如果条件为假，必须跳出循环不再执行。
- for 循环是一种反复执行一段代码直到测试条件为假时停止。

## 语法

```js
 for (;;) {
}
呆板的语法：
    for(定义循环变量;变量的最大值或最小值;步长){
         循环体；
    }
这种解释只能涵盖 for 循环的一部分特殊结构，不能表示所有的 for 循环实现的情况。
```

## for 循环执行过程

- 应该掌握 for 循环运行的一个轨迹、路径，自己去推导 for 循环运行的过程。

<img src="/images/Javascript/011.png" style="width: 100%; display: block; margin: 0 auto;">

```js
// for 循环呆板语法
for (var i = 1; i <= 100; i++) {
  console.log("小明今年" + i + "岁了");
}
console.log("小明百岁了");
console.log(i); //101
```

for 循环执行过程：遇到 for 循环，立即执行 ① 位置的语句，

执行完毕后立即执行 ② 位置的语句，

② 位置会强制得到一个 true 或 false 的结果，
如果为 true 表示入口条件为真，下一步执行 ③ 位置的语句，

如果为 false 表示入口条件为假，不再往下执行，直接跳出循环执行后面的 ⑤ 位置的语句。

如果能够执行到 ③ 位置，③ 是一个结构体必须执行完毕，再执行 ④ 位置的语句，执行完毕后再执行 ② 位置的语句，

回到了判断真假，如果为 true，继续执行 ③，再执行 ④……直到 ② 位置得到一个 false 的结果，循环结束跳出执行 ⑤。

## 注意事项

- 小括号内部必须有两个分号。

```js{1}
for (var i = 1; i <= 100; i++) {
  console.log("小明今年" + i + "岁了");
}
```

- for 循环 {} 后面不需要加分号。

```js{3}
for (var i = 1; i <= 100; i++) {
  console.log("小明今年" + i + "岁了");
} // {} 后面不需要加分号
```

- 如果 ② 位置语句不写，相当于没有设置入口条件，或者条件永远为真，没法限制什么时候停止循环了，出现死循环。

```js
// 注意：②位置如果为空，或者，②条件设置的不合理，也会出现死循环
for (var i = 1; ; i++) {
  console.log(i);
}
for (var i = 1; i > 0; i++) {
  console.log(i);
}
```

- ③ 位置是循环的结构体，每次进入循环都要执行完后，才能执行语句 ④，③ 位置的语句是可以人为自定义的，甚至可以书写 if 语句。

```js
// ①②③④位置的条件可以随意设置
// for (var i = 1;i < 10;i++) {
//   console.log(i);
// }

var i = 1;
for (console.log("haha"); i < 10; console.log("heihei")) {
  console.log(i);
  i++;
}
```

- for 循环嵌套 if 语句：表示既要能够执行循环，还要满足 if 语句的条件。

```js
// for 内部可以嵌套 if 语句
for (var i = 1; i <= 30; i += 4) {
  if (i % 3 == 0) {
    console.log(i); //9、21
  }
}
```

- for 循环嵌套 for 循环：外层循环执行一次，内层循环作为外层 ③ 位置的结构体，必须执行完所有的内层循环，才能进入外层循环下一次的 ④。

```js
// for 循环内部嵌套 for 循环
for (var i = 1; i <= 4; i++) {
  for (var j = 5; j <= 8; j++) {
    console.log(i, j);
  }
}
```
<img src="/images/Javascript/012.png" style="width: 80%; display: block;">


- 循环内的变量是全局变量，必须避免循环嵌套时起相同的变量名，内层和外层变量名必须不同，常用的变量名 i，j，k。

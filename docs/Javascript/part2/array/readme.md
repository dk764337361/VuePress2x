# 数组

## 概念

1. 为什么学习数组？
   之前学习的数据类型，只能存储一个值（比如：Number/String）。如果我们想存储班级中所有学生的成绩，此时该如何存储？

### 数组的概念

- 所谓数组（Array），就是将多个元素（通常是同一类型）按一定顺序排列放到一个集合中，那么这个集合我们就称之为数组。

### 数组的定义

- 数组是一组有序的数据集合。数组内部可以存放多个数据，不限制数据类型，并且数组的长度可以动态的调整。
- 创建数组最简单的方式就是数组字面量方式。
- 数组的字面量：[]
- 一般将数组字面量赋值给一个变量，方便后期对数组进行操作。
- 如果存放多个数据，每个数据之间用逗号分隔，最后一个后面不需要加逗号。

```js
// 创建一个空数组
var arr = [];
// 创建包含多个数据的数组，数据类型是不限制
var arr2 = [1, true, false, null, undefined, "haha", [7, 8], 9, 10];
// console.log(arr2);
```

## 获取数组元素

- 数组可以通过一个 index（索引值、下标）去获取对应的某一项的数据，进行下一步操作。
- index：从 0 开始，按照整数排序往后顺序排序，例如 0,1,2,3……
- 可以通过 index 获取某一项值之后，使用或者更改数组项的值。
- 调用数据：利用数组变量名后面直接加 `[index]` 方式。

```js
// 创建一个空数组
var arr = [];
// 创建包含多个数据的数组，数据类型是不限制
var arr2 = [1, true, false, null, undefined, "haha", [7, 8], 9, 10];
// console.log(arr2);

// 获取 arr2 中下标为 0 的项
console.log(arr2[0]); // 1
// console.log(arr2[1]);
// console.log(arr2[2]);
// console.log(arr2[6]);
// console.log(arr2[8]);
```

::: tip 提示
如果索引值超过了数组最大项，相当于这一项没有赋值，内部存储的就是 undefined。
:::

### 更改数组数据

- arr[index] 调用这一项数据，后面等号赋值更改数据。

```js
// 更改数组中某一项的值
arr2[4] = 5;
console.log(arr2);
```

## 数组的长度

- 数组有一个 length 的属性，记录的是数组的数据的总长度。
- 使用方法：变量名.length

```js
console.log(arr.length);
```

- 数组的长度与数组最后一项的下标存在关系，最后一项的下标等于数组的 length-1。
  - 获取最后一项的数据时，可以这样书写：

```js
console.log(arr[arr.length - 1]);
```

- 数组的长度不是固定不变的，可以发生更改。
- 增加数组长度：直接给数组 length 属性赋一个大于原来长度的值。赋值方式使用等号赋值。
- 或者，可以给一个大于最大下标的项直接赋值，也可以强制拉长数组。

```js
// 更改数组的长度
arr2.length = 12;
console.log(arr2.length);
console.log(arr2[11]);
```

```js
arr2[13] = 13;
console.log(arr2);
console.log(arr2.length);
console.log(arr2[12]);
```

- 缩短数组长度：强制给 length 属性赋值，后面数据被会直接删除，删除是不可逆的。

```js
arr2.length = 5;
console.log(arr2);
arr2.length = 9;
console.log(arr2);
```

## 数组遍历

- 遍历：遍及所有，对数组的每一个元素都访问一次就叫遍历。利用 for 循环，将数组中的每一项单独拿出来，进行一些操作。
- 根据下标在 0 到 arr.length-1 之间，进行 for 循环遍历。

```js
// 定义一个数组
var arr = [45, 56, 76, 88, 89, 90, 100, 34, 56];
// 数组遍历
for (var i = 0; i <= arr.length - 1; i++) {
  console.log(arr[i]);
}
```

- 案例:给数组中每一项数据加 5

```js
// 给数组中每一项数据加 5
for (var i = 0; i < arr.length; i++) {
  // 获取每一项数组的数据，等号赋新值
  arr[i] += 5;
}
console.log(arr);
```

## 数组应用案例

- 求一组数中的所有数的和以及平均值。

```js
// 定义一个数组
var arr = [45, 56, 76, 88, 89, 90, 100, 34, 56];
// 累加器。累积数组每一项的和，初始值是 0
var sum = 0;
// 数组遍历，将每一项累加到 sum 里
for (var i = 0; i <= arr.length - 1; i++) {
  sum += arr[i];
}
// 输出 sum
console.log("这组成绩的总和是" + sum);
// 求取平均值 = 总和 / 班级人数
var avg = sum / arr.length;
console.log("这个班的平均成绩是" + avg);
```

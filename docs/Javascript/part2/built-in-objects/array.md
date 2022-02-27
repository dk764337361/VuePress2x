# Array 对象

## 创建数组对象的两种方式

1. 字面量方式： [ ]
2. 构造函数方法： new Array()

```js
// 字面量方法
var arr = [1, 2, 3];

// 数组也是对象，可以通过构造函数生成
// 空数组
var arr1 = new Array();
// 添加数据，可以传参数
var arr2 = new Array(1, 2, 3);
var arr3 = new Array("zs", "ls", "ww");
// console.log(arr1);
// console.log(arr2);
// console.log(arr3);
```

## 判断数据类型

- `instanceof` 检测某个实例是否是某个对象类型

```js
// 检测数组的数据类型
// console.log(typeof(arr));
// console.log(typeof(arr3));
var a = {};
// 检测某个实例对象是否属于某个对象类型
console.log(arr instanceof Array); //true
console.log(arr2 instanceof Array); //true
console.log(a instanceof Array); //false

function fun() {
  console.log(1);
}
console.log(fun instanceof Function); //true
```

## toString()

- toString() 把数组转换成字符串，逗号分隔每一项。

```js
var arr = [1, 2, 3, 4];

// toString() 方法：转字符串
// console.log(arr.toString()); //1,2,3,4
```

## 数组常用方法

### push()尾推

- push() 在数组末尾添加一个或多个元素，并返回数组操作后的长度

```js
var arr = [1, 2, 3, 4];
// 首尾操作方法
// 尾推,参数是随意的，可以有一个或多个
console.log(arr.push(5, 6, 7, 8)); //8, 返回数组长度
console.log(arr.push([5, 6, 7, 8])); //9, 返回数组长度
console.log(arr); //(9) [1, 2, 3, 4, 5, 6, 7, 8, Array(4)]
```

### pop()删最后

- pop() 删除数组最后一项，返回删除项

```js
var arr = [1, 2, 3, 4];
// 尾删，删除最后一项数据
// 不需要传参
console.log(arr.pop());
console.log(arr);
```

### shift()首删

- shift() 删除数组第一项，返回删除项

```js
var arr = [1, 2, 3, 4];
// 首删，删除第一项数据，不需要传参
console.log(arr.shift());
console.log(arr);
```

### unshift()头推

- unshift() 在数组开头添加一个或多个元素，并返回数组的新长度

```js
var arr = [1, 2, 3, 4];
// 首添，参数与 push 方法类似
console.log(arr.unshift(-1, 0));
console.log(arr);
```

### 案例(首尾数据操作)

- 将数组的第一项移动到最后一项

```js
// 字面量方法
var arr = [1, 2, 3, 4];
// 将数组的第一项移动到最后一项
// shift()删除第一项
// push()将删除的项添到最后一项
arr.push(arr.shift());
console.log(arr); //(4) [2, 3, 4, 1]
arr.push(arr.shift());
console.log(arr); //(4) [3, 4, 1, 2]
arr.push(arr.shift());
console.log(arr); //(4) [4, 1, 2, 3]
arr.push(arr.shift());
console.log(arr); //(4) [1, 2, 3, 4]
```

- 将数组的最后一项移动到第一项

```js
// 字面量方法
var arr = [1, 2, 3, 4];
// 将数组的最后一项移动到第一项
// pop()删除最后一项
// unshift()将删除的项添到第一项
arr.unshift(arr.pop());
console.log(arr); //(4) [4, 1, 2, 3]
arr.unshift(arr.pop());
console.log(arr); //(4) [3, 4, 1, 2]
arr.unshift(arr.pop());
console.log(arr); //(4) [2, 3, 4, 1]
arr.unshift(arr.pop());
console.log(arr); //(4) [1, 2, 3, 4]
```

### concat() 合并

- 将两个数组合并成一个新的数组，原数组不受影响。参数位置可以是一个数组字面量、数组变量、零散的值。

```js
// 字面量方法
var arr = [1, 2, 3, 4, 5];
// 合并方法
// 参数：数组、数组的变量、零散的值
// 返回值：一个新的拼接后的数组
var arr1 = arr.concat([5, 6, 7]);
var ar = [8, 9, 10];
// var arr1 = arr.concat(ar);
var arr1 = arr.concat(11, 12, 13);
console.log(arr);
console.log(arr1);
```

### slice(start,end) 拆分

- 从当前数组中截取一个新的数组，不影响原来的数组，返回一个新的数组，包含从 start 到
  end （不包括该元素）的元素。
- 参数区分正负，正值表示下标位置，负值表示从后面往前数第几个位置，参数可以只传递
  一个，表示从开始位置截取到字符串结尾。

```js
// 拆分方法
// 参数为正
// var arr1 = arr.slice(3,7);
// 参数为负
// var arr1 = arr.slice(-7,-1);
// 只书写一个参数
var arr1 = arr.slice(7);
console.log(arr);
console.log(arr1);
```

### splice() 删除、插入、替换

splice() 删除、插入、替换
splice(index,howmany,element1,element2,……)

- 用于插入、删除或替换数组的元素
  - index：删除元素的开始位置
  - howmany：删除元素的个数，可以是 0
  - element1,element2：要替换的新的数据。

```js
// 字面量方法
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// 删除功能，传前两个参数
//删除数组的某个值
console.log(arr.splice(6, 1)); //[7]
console.log(arr); //(9) [1, 2, 3, 4, 5, 6, 8, 9, 10]

// 替换功能，传3个及以上的参数
// arr.splice(2,5,"haha","hello");
// console.log(arr);

// 插入功能，传3个及以上的参数，但是第二个参数必须为0
arr.splice(2, 0, "hello");
console.log(arr);
```

### 查找数组某位置

indexOf() 查找数据在数组中最先出现的下标

lastIndexOf() 查找数据在数组中最后一次出现的下标

::: warning 注意
如果没找到返回 `-1`
:::

```js
// 字面量方法
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 4, 5];

// 查找某个元素在数组中从前往后第一次 出现位置的下标
console.log(arr.indexOf(4)); //3
// 查找某个元素在数组中从前往后最后一次出现位置的下标
console.log(arr.lastIndexOf(4)); //10
console.log(arr.lastIndexOf(11)); //-1
```

### reverse()倒序：

reverse() 将数组完全颠倒，第一项变成最后一项，最后一项变成第一项。

```js
// 字面量方法
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30];
// 倒序排列
console.log(arr.reverse());
console.log(arr);
```

### sort()按字符编排序：

sort(); 默认根据字符编码顺序，从小到大排序
如果想要根据数值大小进行排序，必须添加 sort 的比较函数参数。

该函数要比较两个值，然后返回一个用于说明这两个值的相对顺序的数字。比较函数应该具有两个参数 a 和 b ，根据 a 和 b 的关系作为判断条件，返回值根据条件分为三个分支，正数、负数、 0:

- 返回值是负数-1 a 排在 b 前面。
- 返回值是正数 1 a 排在 b 后面。
- 返回值是 0 a 和 b 的顺序保持不变。
  人为能控制的是判断条件。

```js
// 字面量方法
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30];
// 排序，默认按照字符编码顺序从小到大排列
// arr.sort();
// 添加一个比较函数的参数
arr.sort(function(a, b) {
  if (a > b) {
    return -1; //表示 a 要排在 b 前面
  } else if (a < b) {
    return 1; //表示 a 要排在 b 后面
  } else {
    return 0; //表示 a 和 b 保持原样，不换位置
  }
});
console.log(arr); //(12) [30, 20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```

```js
// 思路2
var arr = [3, 4, 1, 2, 6, 5];
// 思路1：sort 方法排序
function unique(arr) {
  arr.sort(function(a, b) {
    return a - b;
  });
  return arr;
}
console.log(unique(arr));
```

### join()转字符串

转字符串方法：将数组的所有元素连接到一个字符串中。

join() 通过参数作为连字符将数组中的每一项用连字符连成一个完整的字符串

```js
// 字面量方法
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30];

// 转字符串方法
// var str = arr.join("*"); //1*2*3*4*5*6*7......
var str = arr.join("");
console.log(str);
```

## 清空数组

- 方式 1 推荐
  arr = [];
- 方式 2
  arr.length = 0;
- 方式 3
  arr.splice(0, arr.length);

  ```js
  // 字面量方法
  var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30];

  // 清空数组
  // arr = [];
  // arr.length = 0;
  arr.splice(0, arr.length);
  console.log(arr);
  ```

## 三种重要排序

之前学过[sort()按字符编排序](../built-in-objects/array.html#sort-按字符编排序)。
现在增加三种排序原理，理解此对面试时很重要。

### 冒泡排序

数组：`[89,34,76,15,98,25,67]`

<img src="/images/Javascript/sort01.jpg" style="width: 100%; display: block; margin: 0 auto;">

```js
var arr = [89, 34, 76, 66, 98, 25, 67];

// 数组有几项，外部比较项数减 1 次
for (var i = 1; i < arr.length; i++) {
  // 第 1 次判断次数为：循环数组项 - 1
  // 第 2 次判断次数为：循环数组项 - 2
  // 第 3 次判断次数为：循环数组项 - 3
  // ……
  for (var j = 0; j < arr.length - i; j++) {
    if (arr[j] > arr[j + 1]) {
      // 值小的往前拿，值大的往后拿
      var jVal = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = jVal;
    }
  }
}
console.log(arr);
```

### 选择排序

数组：`[89,34,76,15,98,25,67]`

<img src="/images/Javascript/sort02.jpg" style="width: 100%; display: block; margin: 0 auto;">

```js
var arr = [89, 34, 76, 66, 98, 25, 67];

for (var i = 0; i < arr.length - 1; i++) {
  // 记录一下当前的数组的下标 i,当做判断依据
  var m = i;
  // 判断 i 项以后的项，有没有比当前项大的，如果有，替换掉 m 的记录下标
  for (var j = i + 1; j < arr.length; j++) {
    if (arr[j] > arr[m]) {
      m = j;
    }
  }
  if (m !== i) {
    var old = arr[i];
    arr[i] = arr[m];
    arr[m] = old;
  }
}
console.log(arr);
```

### 插入排序

数组：`[89,34,76,15,98,25,67]`
<img src="/images/Javascript/20200909202344100.gif" style="width: 100%; display: block; margin: 0 auto;">

```js
var arr = [89, 34, 76, 66, 98, 25, 67];
// 从下标为 1 的项开始，跟前面的进行对比
for (var i = 1; i < arr.length; i++) {
  // 定义一个对比 项的下标
  var m = i - 1;
  // 记录当前循环的数据项
  var current = arr[i];
  // 判断 i 项以前的项，有没有比当前项大的，如果有，就排到下一项
  // 最终到 0 项结束，如果期间遇到比 i 项小的，停止循环判断
  while (m >= 0 && arr[m] > current) {
    arr[m + 1] = arr[m]; //大的拿到后面
    // 让 i 项继续跟前面一项进行对比
    m--;
  }
  // 循环结束后，要么 m 为 -1，要么就是当前的 m 项比 i 项小
  // 将原来的 i 项插入到 m 项之后
  arr[m + 1] = current;
}
console.log(arr);
```

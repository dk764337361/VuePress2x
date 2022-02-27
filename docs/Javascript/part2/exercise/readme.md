# 练习题

## 1. 用户输入一个整数 n：

求 1! + 2! + 3! + 4! + …… + n!的和

叹号表示阶乘，如`4! = 1 _ 2 _ 3 \* 4`

- 举例一：

```js
function cheng(a) {
  var s = 1;
  for (var i = 1; i <= a; i++) {
    s *= i;
  }
  return s;
}
function jia(a) {
  var sum = 0;
  for (var i = 1; i <= a; i++) {
    sum += cheng(i);
  }
  console.log(sum);
}
jia(4);
```

- 举例二：

```js
function calculate(nums) {
  this.factorial = function() {
    console.log("您输入数字的是" + nums);
    var n = 0;
    var c = 1;
    for (var i = 1; i <= nums; i++) {
      c *= i;
      console.log("c是：" + c);
      n += c;
      console.log("n是：" + n);
    }
    console.log(nums + "的阶乘是：" + n);
    alert(nums + "的阶乘是：" + n);
  };
}
var nums = parseInt(prompt("请输入一个正整数"));
// var comply = new calculate(nums);
// comply.factorial();
var comply = new calculate(nums).factorial();
```

## 2. 求一个三位数，叫做“喇叭花数”，该三位数等与其每位数字的阶乘之和。输出 100~999 的所有喇叭花数。

```js
function jiecheng(a) {
  var s = 1;
  for (var i = 1; i <= a; i++) {
    s *= i;
  }
  return s;
}
function tol(b) {
  var gewei = b % 10;
  var shiwei = parseInt((b / 10) % 10);
  var baiwei = parseInt((b / 100) % 10);
  if (jiecheng(gewei) + jiecheng(shiwei) + jiecheng(baiwei) == b) {
    console.log(b);
  }
}
for (var i = 100; i <= 999; i++) {
  tol(i);
}
```

- 举例二：

```js
function calculate(n) {
  var nums = 1;
  for (var i = 1; i <= n; i++) {
    nums *= i;
  }
  return nums;
}

for (var i = 100; i <= 999; i++) {
  var ge = i % 10,
    shi = parseInt(i / 10) % 10,
    bai = parseInt(i / 100);
  if (calculate(ge) + calculate(shi) + calculate(bai) == i) {
    console.log("个:" + ge + "，十:" + shi + "，百:" + bai + " =" + i);
  }
}
```

```js
// 思路：输出三位数的喇叭花数 → 判断喇叭花数 → 求阶乘函数
// 求一个数的阶乘函数
// 说明：传入一个数，返回这个数的阶乘
function jc(a) {
  // 累乘器
  var mul = 1;
  // 循环累乘，从 a 乘到 1
  for (var i = 1; i <= a; i++) {
    mul *= i;
  }
  // 循环结束后，mul 存了 a 的阶乘
  return mul;
}
// 制作判断喇叭花数函数
// 说明：传入一个数，返回是否是喇叭花数
function isLbh(a) {
  // 拆分位数
  var ge = a % 10,
    shi = parseInt(a / 10) % 10,
    bai = parseInt(a / 100);
  // 计算阶乘之和
  var sum = jc(ge) + jc(shi) + jc(bai);
  // 判断阶乘和 sum 是否等于 a，等于就是喇叭花数
  if (sum === a) {
    return true;
  } else {
    return false;
  }
}
// 输出所有三位的喇叭花数
for (var i = 100; i <= 999; i++) {
  if (isLbh(i)) {
    console.log(i);
  }
}
```

## 3. 验证哥德巴赫猜想。一个偶数可以拆分成两个质数之和。

- 举例一：

```js
function yueshu(a) {
  var sum = 0;
  for (var i = 1; i < a; i++) {
    if (a % i == 0) {
      sum += i;
    }
  }
  return sum;
}
for (var i = 1; i <= 2000; i++) {
  var j = yueshu(i);
  if (i == yueshu(j) && i != j) {
    console.log(i, j);
  }
}
```

- 举例二：

```js
function zhishu(a) {
  var count = 0;
  for (var i = 1; i <= a; i++) {
    if (a % i == 0) {
      //循环出数字的约数
      count++;
      //   console.log(count);
    }
  }
  //如果打印count两次就是质数（质数只有1和它本身）
  if (count == 2) {
    return true;
  } else {
    return false;
  }
}
for (var i = 4; i <= 100; i += 2) {
  for (var j = 2; j < i; j++) {
    if (zhishu(j) && zhishu(i - j)) {
      console.log(i + "的质数和等于" + j + "与" + (i - j));
    }
  }
}
```

- 举例三：

```js
// 用户输入
var n = parseInt(prompt("请输入一个大于2的偶数"));
// 思路：将一个偶数拆分成任意两个质数之和 → 判断质数函数
// 判断质数函数
// 说明：输入一个数，返回是否是质数
function isZs(a) {
  // 循环累加，看在 2 到根号 a 之间有没有其他约数，有就肯定不是质数，直接返回
  for (var i = 2; i <= Math.sqrt(a); i++) {
    if (a % i === 0) {
      // 说明肯定不是质数
      return false;
    }
  }
  // 如果能走到这个位置，说明没遇到 return，没有其他的约数，就是质数
  if (a != 1) {
    return true;
  } else {
    return false;
  }
}
// 输出 n 的所有质数之和的可能性
for (var i = 2; i <= n / 2; i++) {
  // 定义另一个质数可能性
  var j = n - i;
  // 判断 i 和 j 同时都是质数，输出
  if (isZs(i) && isZs(j)) {
    console.log(n + "可以拆分成两个质数" + i + "与" + j + "的和");
  }
}
```

## 4. 编写函数 rev(char) 实现将字符串 char 倒置，比如 rev("spring") 返回"gnirps"

- 举例一：

```js
function rev(str) {
  var arr = str.split("");
  arr.reverse();
  str = arr.join("");
  console.log(str);
}
rev("spring");
```

- 举例二：

```js
function rev(n) {
  var str = n;
  str = str
    .split("")
    .reverse()
    .join("");
  return console.log(str);
}
rev("spring");
```

## 5. 将字符串"i come from beijing"倒置，即控制台输出"beijing from come i"

将字符串"i come from beijing"倒置，即控制台输出"beijing from come i"

语句直接写在程序中，不需要用户输入

- 举例一：

```js
var str = "i come from beijing";
var arr = str.split(" ");
arr.reverse();
str = arr.join(",");
console.log(str);
```

## 6. 有 10 个学生的成绩存在数组中，请统计大于等于平均成绩的人数。

有 10 个学生的成绩存在数组中，请统计大于等于平均成绩的人数。

成绩直接以数组形式写在程序中，不需要用户输入。

- 举例一：

```js
var arr = [91, 89, 92, 88, 93, 87, 94, 86, 95, 85];
function fun(num) {
  var all = 0;
  var peo = 0;

  for (var i = 0; i < num.length; i++) {
    all += num[i];
  }
  all = all / 10;

  for (var k = 0; k < num.length; k++) {
    if (num[k] >= all) {
      peo++;
    }
  }
  console.log("平均分为：" + all + "分，大于等于平均成绩的人数：" + peo + "人");
}
fun(arr);
```

- 举例二：

```js
function chengji(n) {
  var nums = 0,
    count = 0;
  for (var i = 0; i < n.length; i++) {
    nums += n[i];
    // console.log(nums);
    var average = Math.round(nums / n.length);
    if (n[i] >= average) {
      // console.log(classArray[i]);
      count++;
      // console.log("人数是："+count);
    }
  }
  console.log("平均分是：" + average, "超出平均分的人数是：" + count);
}
var classArray = [59, 37, 64, 87, 25, 55, 94, 48, 32];
chengji(classArray);
```

## 7. 将"i love javascript very much"的每个单词的第一个字母，变为大写。

- 举例一：

```js
function toUpper(str) {
  var arr = str.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    str = arr.join(" ");
  }
  return str;
}
console.log(toUpper("i love javascript very much"));
```

## 8. 求一组数中的最大值和最小值，以及所在位置的下标。

- 举例一：

```js
var arr = [9, 2, 3, 15, 5];
function find() {
  var max = arr[0],
    min = arr[0];
  var maxindex = 0;
  var minindex = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
      maxindex = i;
    } else if (arr[i] < min) {
      min = arr[i];
      minindex = i;
    }
  }
  console.log("最大值为：" + max + "，位置为：" + maxindex);
  console.log("最小值为：" + min + "，位置为：" + minindex);
}

find();
```

- 举例二：

```js
function size(n) {
  var max = Math.max.apply(Math, n);
  var min = Math.min.apply(Math, n);
  // console.log(max);
  // console.log(min);
  for (var i = 0; i <= n.length; i++) {
    if (n[i] == max) {
      var maxIndex = i;
      console.log("最大值为:" + max, "下标为:" + maxIndex);
    } else if (n[i] == min) {
      var minIndex = i;
      console.log("最小值为:" + min, "下标为:" + minIndex);
    }
  }
}
var classArray = [59, 37, 64, 87, 25, 55, 94, 48, 32];
size(classArray);
```

## 9. 将数组用 | 或其他符号连接成一个字符串。

- 举例一：

```js
var names = ["阿萨德", "阿斯顿", "大声道", "发生", "发搭嘎", "大事", "自行车"];
var str = "";
for (var i = 0; i < names.length - 1; i++) {
  str += names[i] + "|";
}
console.log(str + names[names.length - 1]);
```

- 举例二：

```js
function strArray(n) {
  var num = n.join("|");
  console.log(num);
  // console.log(typeof n);
  // console.log(typeof num);
}
var classArray = [59, 37, 64, 87, 25, 55, 94, 48, 32];
strArray(classArray);
```

## 10. 将数组中值为 0 的项去掉，将不为 0 的值存入一个新的数组，生成新的数组。

- 举例一：

```js
var arr = [4, 0, 7, 9, 0, 0, 2, 6, 0, 3, 1, 0];

function removeByvalue(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == val) {
      arr.splice(i, 1);
      i--;
    }
  }
}
removeByvalue(arr, 0);
console.log(arr);
```

- 举例二：

```js
function xiabiao(n) {
  var count = 0;
  var newArray = [];
  for (var i = 0; i < n.length; i++) {
    if (n[i] !== 0) {
      newArray.push(n[i]);
    }
  }
  console.log(newArray);
  return n;
}
var date = [1, 1, 0, 2, 2, 3, 4, 5, 6, 3, 4, 2, 4, 0];
xiabiao(date);
```

## 11. 数组去重；

- 举例一：

  ```js

  [1,1,1,2,2,3,4,5,6,3,4,2,4,1,] ---> [1,2,3,4,5,6]

  ```

```js
// 思路1：比较第 i 项和后面的项是否相同，相同则删除数组后面的项
var arr = [1, 1, 1, 2, 2, 3, 4, 5, 6, 3, 4, 2, 4, 1, 2];
function unique(arr) {
  for (var i = 0; i <= arr.length - 1; i++) {
    // 比较当前项和后面所有的项
    for (var j = i + 1; j <= arr.length - 1; j++) {
      if (arr[i] === arr[j]) {
        // 删除第 j 项
        arr.splice(j, 1);
        // 当前项没有后，不能直接 j++，会跳过一项，必须给 当前的 j 减 1
        j--;
      }
    }
  }
  return arr;
}
```

```js
// 思路2：利用 indexOf() 方法，判断某一项是否存在于数组中
var arr = [1, 1, 1, 2, 2, 3, 4, 5, 6, 3, 4, 2, 4, 1, 2];
function unique(arr) {
  var newArr = [];
  for (var i = 0; i <= arr.length - 1; i++) {
    // 如果第 i 项不存在与新数组中，添加到新数组
    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}
console.log(unique(arr));
```

## 12. 数组排序；

```
[3,4,1,2,6,5] ---> [1,2,3,4,5,6]
```

- 举例一：

```js
var arr = [3, 4, 1, 2, 6, 5];
function XzPx() {
  var a = 0;
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = i + 1; j <= arr.length - 1; j++) {
      if (arr[i] > arr[j]) {
        a = arr[j];
        arr[j] = arr[i];
        arr[i] = a;
      }
    }
  }
  return arr;
}
console.log(XzPx());
```

- 举例二：

```js
function order(n) {
  n.sort(function(a, b) {
    if (a < b) {
      return -1; //表示 a 要排在 b 前面
    } else if (a > b) {
      return 1; //表示 a 要排在 b 后面
    } else {
      return 0; //表示 a 和 b 保持原样，不换位置
    }
  });
  return console.log(n);
}
var date = [3, 4, 1, 2, 6, 5];
order(date);
```

## 13. 数组转对象；

```
 ['a','a','a','b','b','c','c','c','c','d','d','d','d']
--->
    {

        a: 3,

        b: 2,

        c: 4,

        d: 4

    }
```

- 举例一：

```js
var arr = ["a", "a", "a", "b", "b", "c", "c", "c", "c", "d", "d", "d", "d"];
var o = {};
for (var i = 0; i < arr.length; i++) {
  var item = arr[i];
  if (o[item]) {
    o[item]++;
  } else {
    o[item] = 1;
  }
}
console.log(o);
```

- 举例二：

```js
function size(n) {
  var obj = {};
  for (var i = 0; i < n.length; i++) {
    var k = n[i];
    var v = n.lastIndexOf(n[i]) - n.indexOf(n[i]) + 1;
    obj[k] = v;
  }
  console.log(obj);
  return obj;
}

var date = ["a", "a", "a", "b", "b", "c", "c", "c", "c", "d", "d", "d", "d"];
size(date);
```

```js
var arr = ["a", "a", "a", "b", "b", "c", "c", "c", "c", "d", "d", "d", "d"];
// 思路：如果对象中存在对应的属性名，就加1，如果不存在就定义初始值1
function transformToObj(arr) {
  var obj = {};
  //数组遍历
  for (var i = 0; i < arr.length; i++) {
    if (!obj[arr[i]]) {
      // 如果对象中没有属性 arr[i]，那么就在对象中增加这一项，初始值定义为数字 1
      obj[arr[i]] = 1;
    } else {
      // 如果已经存在了这一项，在原有计数的基础上加 1
      obj[arr[i]] += 1;
    }
  }
  return obj;
}
console.log(transformToObj(arr));
```

## 14. 使用 js 将 99 乘法表输出在控制台

- 举例一：

```js
for (var i = 1; i <= 9; i++) {
  var num = "";
  for (var j = 1; j <= i; j++) {
    num += i + "x" + j + "=" + i * j + "  ";
  }
  console.log(num);
}
```

## 15

15. 买卖股票的最佳时机；给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。如果你最多只允许完成一笔交易（即买入和卖出一支股票一次）设计一个算法来计算你所能获取的最大利润。

注意：你不能再买入股票前卖出股票

示例：

```
输入：[7, 1, 5, 3, 6, 4]

输出：5

解释：在第2天（当天股票价格等于1）的时候买入，在第五天（当天股票价格等于6）的时候卖出，最大利润为 6 - 1 = 5。

注意：利润不能使7 - 1 = 6，因为第二天的价格为1，第一天的价格为7，你是不可能在第二天买入股票然后等到第一天卖出的
```

- 举例一：

```js
var arr = [7, 1, 5, 3, 6, 4];

var maxProfit = function(prices) {
  let minPrice = 0,
    maxProfit = 0;

  for (let i = 0; i < prices.length; i++) {
    if (!i || prices[i] < minPrice) {
      minPrice = prices[i];
    } else if (prices[i] > minPrice && prices[i] - minPrice > maxProfit) {
      maxProfit = prices[i] - minPrice;
    }
  }

  return maxProfit;
};

console.log(maxProfit(arr));
```

- 举例二：

```js
function size(n) {
  var max = Math.max.apply(Math, n);
  var min = Math.min.apply(Math, n);
  for (var i = 0; i <= n.length; i++) {
    if (n[i] == max) {
      var maxIndex = i;
      console.log("最大值为:" + max, "下标为:" + maxIndex);
    } else if (n[i] == min) {
      var minIndex = i;
      console.log("最小值为:" + min, "下标为:" + minIndex);
    }
  }

  if (maxIndex < minIndex) {
    var dele = n.splice(maxIndex, 1);
    console.log("需要删除的数字" + dele);
    console.log("返回新数组" + n);
    return size(n);
  }

  if (maxIndex > minIndex) {
    var date = max - min;
    console.log("最大利润为：" + date);
    return n;
  }
}
var classArray = [7, 1, 5, 3, 6, 4];

size(classArray);
```

# 练习题

## 1. 请写出两种将 Javascript 应用到网页的方式

```html
<script type="text/javascript"></script>
<script type="text/javascript" src="./index.js"></script>
```

## 2. 如何定义一个变量？变量的命名规则有哪些？

定义方法：使用一个 var 的关键字进行定义，后面必须加一个空格，空格后面自定义变量名

变量的命名规则和规范：

- 规则 --- 必须遵守，不遵守会报错
  - 由字母、数字、下划线、\$符号组成，不能以数字开头
  - 字母区分大小写
  - 不能是关键字和保留字
    - 关键字指的是 js 中有特殊功能的小词语，比如 var、for 等
    - 保留字指的是现在没有特殊功能，但是将来新语法中有可能作为关键字使用
- 规范 --- 建议遵守的，不遵守不会报错
  - 变量名必须有意义
  - 遵守驼峰命名法

## 3. == 和 === 的区别

== 会帮我们做一个隐式类型转换，对比时不会对比两边的数据类型

=== 对比时会对比两边的数据类型

## 4. JS 的简单数据类型有哪些并简单描述

- Number 类型

  - 数字类型，不区分整数、浮点数、特殊值，都是 Number 类型。

- String 类型

  - 字符串类型，所有的字符串都是 String 类型

- Boolean 类型

  - Boolean 字面量：只有 true 和 false 两个字面量的值，必须是小写字母。
  - 计算机内部存储：true 为 1，false 为 0

- undefined 类型

  - undefined 本身就是一个数据，表示为定义
  - 变量只声明的时候值默认是 undefined

- null 类型
  - null 本身就是一个数据
  - 从逻辑角度，null 值表示一个空对象指针
  - 如果定义的变量准备在将来用于保存对象，最好该变量初始化为 null

## 5. JS 的算数运算符有哪些

```
+ - * / % ()
```

## 6. JS 的比较运算符有哪些

```
>, <, >=, <=, ==, !=, ===, !==
```

## 7. JS 的逻辑运算符有哪些

```
&&，||，!
```

## 8. var i = 100; i++; j = i++;y = ++j;请问 j 和 y 分别是多少?

j == 102, y == 102

## 9.计算下列算式，并将结果输出：

<img src="/images/Javascript/013.png" style="width: 50%; display: block; margin: 0 auto;">

```js
// 9题
var dyt = (324 * (23 + 214)) / (568 - 129) - 11 * (235 - 24);
console.log("第一题---" + dyt);
//-2146.084282460137
```

## 10.住房公积金缴纳金额与工资

住房公积金缴纳金额与工资两者的关系是：
住房公积金 = 税前工资 _ 0.1 _ 2 ;编写程序，让用户输入税前工资，弹出对应的公积金数额。

```js
var gongzi = parseInt(prompt("请输入您的税前工资数目"));
var gongjijin = gongzi * 0.1 * 2;
alert("您的税前工资是：" + gongzi + "，您的住房公积金是：" + gongjijin);
```

## 11.用 JS 计算下列算式，并将结果在弹出：

<img src="/images/Javascript/014.png" style="width: 20%; display: block; margin: 0 auto;">

- 举例一：

```js
var num = Math.pow(23 + Math.pow(5, 7) / 45, 2);
// alert(num);
console.log(num);
```

- 举例二：

```js
var equation = (23 + 5 * 5 * 5 * 5 * 5 * 5 * 5) / 45;
equation *= equation;
console.log("第三题---" + equation);
```

## 12. 编写程序，提示用户输入圆锥的底面半径和高，然后弹出它的体积，计算圆锥体积的公式是：体积 V=1/3π 半径 2\*高

- 举例一：

```js
var radius = parseInt(prompt("请输入输入圆锥的底面半径"));
var height = parseInt(prompt("请输入输入圆锥的高"));
var volume = parseInt((1 / 3) * Math.PI * Math.pow(radius, 2) * height);
alert("圆锥的体积是：" + volume);
```

- 举例二：

```js
var radius = parseFloat(prompt("请输入圆锥的底面半径"));
var he = parseFloat(prompt("请输入圆锥的高"));
var volume = 0.3 * 3.14 * radius * radius * he;
console.log("第四题---" + volume);
```

## 13. 如果今天是星期二，那么 1000 天后是星期几？用户输入一个天数，计算这个天数后是星期几。

- 举例一：

```js
//https://www.cnblogs.com/smivico/p/7714659.html
var day = parseInt(prompt("请输入天数"));
// 今天星期二，7天后也是星期二
//14天后，14 % 7=0 。0+2=2星期二;
//15天后，15 % 7=1 。1+2=星期三 ;
//16天后，16 % 7=2 。2+2=星期四;
//17天后，17 % 7=3 。3+2=星期五;
//18天后，18 % 7=4 。4+2=星期六;
//19天后，19 % 7=5 。5+2=星期天;
//......
//21天后，21 % 7=0 。0+2=星期二;
//1000天后，1000 % 7=0 。0+2=星期二;
var date = 2;
var xingqi = (day % 7) + date;
if (xingqi > 7) {
  xingqi = xingqi % 7;
} else {
  xingqi;
}
switch (xingqi) {
  case 1:
    alert("今天是星期一");
    break;
  case 2:
    alert("今天是星期二");
    break;
  case 3:
    alert("今天是星期三");
    break;
  case 4:
    alert("今天是星期四 ");
    break;
  case 5:
    alert("今天是星期五");
    break;
  case 6:
    alert("今天是星期六");
    break;
  default:
    alert("今天是星期天");
    break;
}
```

- 举例二：

```js
var remainder = 1000 % 7;
var days = remainder + 2;
var c;
if (days > 7) {
  week = days - 7;
} else {
  week = days;
}
console.log("第五题---" + "星期" + week);
```

## 14. 用户输入一个三位数，弹出各个数位的和。

比如：

用户输入 155，就弹出 11

用户输入 316，就弹出 10

用户输入 989，就弹出 26

用户输入 678，就弹出 21

- 举例一：

```js
var num = prompt("请输入一个三位数");
var gewei = parseInt(num.charAt(0));
var shiwei = parseInt(num.charAt(1));
var baiwei = parseInt(num.charAt(2));
var zongshu = gewei + shiwei + baiwei;
console.log("此数字的各个数位的和的值是：" + zongshu);
alert("此数字的各个数位的和的值是：" + zongshu);
```

- 举例二：

```js
var a = parseFloat(prompt("请输入一个三位数"));
var b = a % 10;
var c = parseInt(a / 10) % 10;
var d = parseInt(a / 100);
var e = b + c + d;
console.log("第六题---" + e);
```

## 15. 用户输入一个数字，然后判断这个数字能否被 5、6 整除的情况，根据情况弹出下面 4 种警告框：

<img src="/images/Javascript/015.png" style="width: 60%; display:inline-block; margin: 0 auto;">
比如30
<img src="/images/Javascript/016.png" style="width: 60%; display:inline-block; margin: 0 auto;">
比如15
<img src="/images/Javascript/017.png" style="width: 60%; display:inline-block; margin: 0 auto;">
比如18
<img src="/images/Javascript/018.png" style="width: 60%; display:inline-block; margin: 0 auto;">
比如14

- 举例一：

```js
var num = prompt("请输入一个数目");
if (num % 5 == 0 && num % 6 == 0) {
  alert("这个数字能被5、6整除");
} else if (num % 5 == 0 && num % 6 != 0) {
  alert("这个数字能被5、但是不能被6整除");
} else if (num % 5 != 0 && num % 6 == 0) {
  alert("这个数字能被6整除、但是不能被5整除");
} else if (num % 5 != 0 && num % 6 != 0) {
  alert("这个数字能既不能被5整除、也不能被6整除");
}
```

- 举例二：

```js
// 15题
var a = parseFloat(prompt("请输入一个数"));
if (a % 5 == 0 && a % 6 == 0) {
  alert("这个数字能同时被5和6整除");
} else if (a % 5 == 0) {
  alert("这个数字能被5整除，但是不能被6整除");
} else if (a % 6 == 0) {
  alert("这个数字能被6整除，但是不能被5整除");
} else {
  alert("这个数字既不能被5整除，也不能被6整除");
}
```

## 16. 用户输入一个数字，然后再输入一个数字。然后弹出警告框：

<img src="/images/Javascript/019.png" style="width: 60%; display:inline-block; margin: 0 auto;">
比如用户输入3、147，都是奇数
<img src="/images/Javascript/020.png" style="width: 60%; display:inline-block; margin: 0 auto;">
比如用户输入6、171，不一样
- 注意，我们并不关心他们“都为奇数”、“都为偶数”，只是关心奇偶性一致的情况

- 举例一：

```js
var jishu = prompt("请输入第一个数字");
var oushu = prompt("请输入第二个数字");
if (jishu % 2 == 0 && oushu % 2 == 0) {
  alert("你好，这两个数字的奇偶性相同");
} else {
  alert("你好，这两个数字的奇偶性不相同");
}
```

- 举例二：

```js
// 16题
var a = parseFloat(prompt("请输入一个数"));
var b = parseFloat(prompt("请在输入一个数"));

if (a % 2 && b % 2) {
  alert("你好，这两个数字的奇偶性相同");
} else {
  alert("你好，这两个数字的奇偶性不同");
}
```

## 17. 用户输入一个年份，判断这个年是否是闰年。

判断闰年条件：

① 非整百年数除以 4，无余为闰，有余不闰；

② 整百年数除以 400，无余为闰，有余不闰。

比如：

2000 年，整百数年，就要用 ② 公式，除以 400，无余数，所以是闰年。

1900 年，整百年数，就要用 ② 公式，除以 400，有余数，所以不是闰年。

2100 不是

……

2016

2012

2008

2004

2000

……

……

1904

1900 不是

自己把中文判断条件转为计算机语言。

- 举例一：

```js
var num = parseInt(prompt("请输入一个年份，判断这个年是否是闰年。"));
if (num % 4 == 0) {
  alert("你好，这个年份是闰年");
} else if (num % 4 != 0) {
  alert("你好，这个年份不是闰年");
} else if (num % 400 == 0) {
  alert("你好，这个年份是闰年");
} else if (num % 400 != 0) {
  alert("你好，这个年份不是闰年");
}
```

- 举例二：

```js
var a = parseFloat(prompt("请输入一个年份"));
if (a % 100 == 0) {
  if (a % 400 == 0) {
    alert("是闰年");
  } else {
    alert("不是闰年");
  }
} else {
  if (a % 4 == 0) {
    alert("是闰年");
  } else {
    alert("不是闰年");
  }
}
```

## 18. 推导循环执行的顺序，用文字进行说明，并推导出可能的结果。

```js
for (var m = 1, n = 2; m + n < 25; m++) {
  n += 3;
  console.log(m);
}
```

答案：

- 第 1 次循环 m = 1 n = 2 m+n = 3 小于 25 --- 输出 1
- 第 2 次循环 m = 2 n = 5 m+n = 7 小于 25 --- 输出 2
- 第 3 次循环 m = 3 n = 8 m+n = 11 小于 25 --- 输出 3
- 第 4 次循环 m = 4 n = 11 m+n = 15 小于 25 --- 输出 4
- 第 5 次循环 m = 5 n = 14 m+n = 19 小于 25 --- 输出 5
- 第 6 次循环 m = 6 n = 17 m+n = 21 小于 25 --- 输出 6
- 第 7 次循环 m = 7 n = 20 m+n = 27 大于 25 --- 不执行

## 19. 推导循环执行的顺序，用文字进行说明，并推导出可能的结果。

```js
for (var i = 30; i > 5; i -= 7) {
  console.log(i--);
}
```

答案：

- 第 1 次循环 i=30 条件成功 输出 i--后自减 7
- 第 2 次循环 i=22 条件成功 输出 i--后自减 7
- 第 3 次循环 i=14 条件成功 输出 i--后自减 7
- 第 4 次循环 i=6 条件成功 输出 i--后自减 7
- 第 5 次循环 i=1 条件失败 不执行

## 20. 用户输入一个数字 n，计算 1+2+3+4+……n 的和。

```js
var a = parseFloat(prompt("请输入一个数字"));
var n = 0;
for (var i = 1; i <= a; i++) {
  n += i;
}
console.log(n);
```

## 21. 用户输入一个整数 n，计算 n 的阶乘。即 n*(n-1)*(n-2)*……*3*2*1.

```js
var a = parseFloat(prompt("请输入一个数字"));
var n = 1;
for (var i = a; i > 0; i--) {
  n *= i;
}
console.log(n);
```

## 22. 用户输入一个数字 n,计算

<img src="/images/Javascript/021.png" style="width: 60%; display:inline-block; margin: 0 auto;">

```js
var a = parseFloat(prompt("请输入一个数字"));
var n = 0;
for (var i = 2; i <= a; i++) {
  n += (i + 1) / i;
}
console.log(n);
```

## 23. 用户输入一个数字，在控制台中列出它的所有约数。

```js
var n = parseInt(prompt("请输入一个正整数"));
// 穷举思想，外层一一列举可能性，内层判断
for (var i = 1; i <= n; i++) {
  // 内层判断 i 是否是 n 的约数
  if (n % i == 0) {
    console.log(i + "是" + n + "的一个约数");
  }
}
```

## 24. 水仙花数是一种特殊的四位数，它的特点就是，每个数位的四次方和，等于它本身。

请编程找出来。

```js
for (var i = 1000; i <= 9999; i++) {
  // i 的三个数位的三次方的和，等于 i 自己
  // 找到个位、十位、百位的数字
  var ge = i % 10,
    shi = parseInt(i / 10) % 10,
    bai = parseInt(i / 100) % 10;
  qian = parseInt(i / 1000);
  // 计算三个数位的三次方的和
  // console.log("ge是" + ge);
  // console.log("shi是" + shi);
  // console.log("bai是" + bai);
  // console.log("qian是" + qian);
  var sum =
    Math.pow(ge, 4) + Math.pow(shi, 4) + Math.pow(bai, 4) + Math.pow(qian, 4);
  // 判断 sum 是否等于 i 自己，如果是，就是水仙花数，需要输出
  if (sum == i) {
    console.log(i);
  }
}
```

## 25. 如果一个数恰好等于它的约数之和，则称该数为“完美数”。

例如：

第 1 个完全数是 6，它有约数 1、2、3、6，除去它本身 6 外，其余 3 个数相加，1+2+3=6。第 2 个完全数是 28，它有约数 1、2、4、7、14、28，除去它本身 28 外，其余 5 个数相加，1+2+4+7+14=28。

试寻找 1~10000 之间的所有完美数。

```js
// 25题
for (var i = 1; i <= 10000; i++) {
  var sum = 0;
  for (var j = 1; j < i; j++) {
    if (i % j == 0) {
      sum += j;
    }
  }
  if (sum == i) {
    console.log(i + "是完美数");
  }
}
```

```js
// 用户输入
var n = parseInt(prompt("请输入一个正整数"));
function isWm(n) {
  //用于计算一个数的约数和
  var sum = 0;
  for (var j = 1; j < n; j++) {
    if (i % j == 0) {
      sum += j;
    }
  }
  // 如果一个数恰好等于它的约数之和，则称该数为“完美数”
  if (sum == i) {
    alert("是完美数");
  }
}
```

```js
// 用户输入
var n = parseInt(prompt("请输入一个正整数"));

//模块化封装函数
// 思路：判断用户输入的是否是完美数→判断完美数函数 → 求约数和函数
// 求约数和函数
// 说明：传入一个整数，返回这个整数的约数和
function yueshuhe(a) {
  // 累加器
  var sum = 0;
  // 循环累加约数
  for (var i = 1; i < a; i++) {
    if (a % i === 0) {
      sum += i;
    }
  }
  // 循环结束后，sum 中存了 a 的约数和
  return sum;
}
// 判断完美数函数
// 说明：传入一个整数，返回是否是完美数，true 或 false
function isWm(a) {
  if (yueshuhe(a) === a) {
    return true;
  } else {
    return false;
  }
}
// 判断用户输入的数据是否是完美数，弹出结果
if (isWm(n)) {
  alert(n + "是一个完美数");
} else {
  alert(n + "不是一个完美数");
}
```

## 26. 用户输入一个数字，判断这个数字是否是质数。

质数就是指它的约数只有 1 和它本身。看约数个数是否是 2.

- 举例一：

```js
// 用户输入一个数字，判断这个数字是否是质数。
// 质数就是指它的约数只有1和它本身。看约数个数是否是2.

//实现思路：
// 先求出余数非0的数字 n % i ==0。
// 把求出的的因数，放进一个空数组，判断数组的长度，如果为长度为2（因为质数只有1和它本身），则说明是质数。
var n = parseInt(prompt("请输入一个正整数"));
console.log("您输入的数字是：" + n);
var zhishuArray = new Array();
for (var i = 1; i <= n; i++) {
  if (n % i == 0) {
    zhishuArray.push(i);
  }
}
// console.log("该数组的值是:" + zhishuArray);
// console.log("该数组的长度是:" + zhishuArray.length);
if (zhishuArray.length == 2) {
  alert("您输入的数字：" + n + "，是质数");
  // console.log("该质数的因数的个数有2个" + "，该数组的长度是" + zhishuArray.length);
  //  alert("该质数的因数的个数有2个" + "，该数组的长度是" + zhishuArray.length);
} else {
  alert("您输入的数字：" + n + "，不是质数");
  // console.log("该质数的因数的个数>3" + "，该数组的长度是" + zhishuArray.length);
}
```

- 举例二：

```js
var n = prompt("请输入一个数字");
var count = 0;
for (var j = 1; j <= n; j++) {
  if (n % j == 0) {
    count++;
  }
}
if (count == 2) {
  alert("是质数");
} else {
  alert("不是质数");
}
```

- 举例三

```js
// 利用 break 简化代码
//  如果除了 1 和 自身之外，还有其他的任何一个约数，说明就不是质数
// 在 1到 根号n 之间要是没有约数，在根号n 到 n 之间也不会有约数
var count = 0;
for (var i = 2; i <= Math.sqrt(num); i++) {
  if (num % i === 0) {
    // 如果这个条件成立说明肯定有其他约数，就不是质数
    // 记录一下他不是质数的证据
    count = 1;
    break;
  }
}
// 如果循环结束后都没有遇到 break，count依旧会是 0 ，说明是个质数
if (count == 0 && num !== 1) {
  alert("这个数是一个质数");
} else {
  alert("这个数不是一个质数");
}
```

## 27. 列出 1~10000 的所有质数。

- 举例一

```js
for (var i = 1; i <= 10000; i++) {
  var zhishuArray = new Array();
  for (var j = 1; j <= i; j++) {
    if (i % j == 0) {
      // console.log(i + "的因数有：" + j);
      zhishuArray.push(j);
    }
  }
  if (zhishuArray.length == 2) {
    console.log(i + "：" + "该数字是质数");
  }
}
```

- 举例二

```js
for (var i = 2; i < 10000; i++) {
  var count = 0;
  for (var j = 1; j <= i; j++) {
    if (i % j == 0) {
      count++;
    }
  }
  if (count == 2) {
    console.log(i);
  }
}
```

- 举例三：

```js
// 化简条件
waiceng: for (var j = 2; j <= 10000; j++) {
  // 判断在 2 到 根号j 之间有没有其他的约数，如果有肯定不是质数，跳过这一次
  for (var i = 2; i <= Math.sqrt(j); i++) {
    if (j % i == 0) {
      // 如果存在一个约数，直接跳出这一次判断下一个质数就可以了
      continue waiceng;
    }
  }
  // 只要能够执行到这个位置，说明没遇到过 continue
  console.log(j);
}
```

## 28. 苹果 3 元一个，鸭梨 2 元一个，桃子 1 元一个。现在想用 200 元正好买 100 个水果，在控制台中列出所有可能性。

```js
for (var i = 1; i <= 10000000; i++) {
  var apple = Math.ceil(Math.random() * 200);
  var pear = Math.ceil(Math.random() * 200);
  var peach = Math.ceil(Math.random() * 200);
  if ((apple % 3 == 0) & (pear % 2 == 0)) {
    apple = apple / 3;
    pear = pear / 2;
    if (apple + pear + peach == 100) {
      if (apple * 3 + pear * 2 + peach === 200) {
        console.log(
          "apple" +
            apple +
            "个" +
            apple * 3 +
            "元" +
            "+ pear" +
            pear +
            "个" +
            pear * 2 +
            "元" +
            "+ peach" +
            peach +
            "个" +
            peach +
            "元" +
            "=" +
            (apple + pear + peach) +
            "个" +
            (apple * 3 + pear * 2 + peach) +
            "元"
        );
        continue;
      }
    }
  }
}
```

```js
// 苹果3元一个，鸭梨2元一个，桃子1元一个。现在想用200元正好买100个水果
// 最多买100个水果
for (var apple = 0; apple <= 100; apple++) {
  for (var pear = 0; pear <= 100; pear++) {
    for (var peach = 0; peach <= 100; peach++) {
      if (
        3 * apple + 2 * pear + 1 * peach == 200 &&
        apple + pear + peach == 100
      ) {
        console.log(
          "苹果的个数" + apple,
          "梨的个数" + pear,
          "桃的个数" + peach
        );
      }
    }
  }
}
```

- 举例三：

```js
// 化简写法
for (var i = 0; i <= 50; i++) {
  // 通过方程运算
  // 3 * i + 2 * j + k == 200
  // i + j + k == 100
  var j = 100 - 2 * i;
  var k = i;
  console.log(i, j, k);
}
```

## 29 .有这样一个代码,请用 if 来实现上面的效果

```js
switch(name)
     case "jt
    alert('金团网
    brea
    case "ejt
              alert('金团相相贷'
    brea
    case "ejin
             alert("网上综合金融体验馆"
             brea
    defaul
             alert("金团网络典当"
}
```

答案：

```js
if (name == "jt") {
  alert("金团网");
} else if (name == "ejt") {
  alert("金团相相贷");
} else if (name == "ejin") {
  alert("网上综合金融体验馆");
} else {
  alert("金团网络典当");
}
```

## 30. JS 有几种循环，分别是什么

1. While
2. Do…while
3. for 循环语句

## 31. break 和 continue 的区别是什么

- break 语句可以立即退出循环;
- continue 语句只是退出当前循环;

## 32. 请用循环计算出 1+2+3+4+5+...+100 的值

```js
var sum = 0;
for (i = 1; i <= 100; i++) {
  sum += i;
}
```

## 33. 开发一款软件，根据公式（身高-108）\*2=体重，可以有 10 斤左右的浮动。判断测试者体重为标准体重还是超重还是偏瘦

```js
// 身高 height
var height = prompt("请输入身高");
// 体重 weight
var weight = prompt("请输入体重");
// 标准体重 standard
var standard = (height - 108) * 2;
if (weight >= standard - 10 && weight <= standard + 10) {
  alert(
    "您的标准体重为：" +
      standard +
      "，恭喜您，您符合标准体重的范围！请继续坚持！"
  );
} else if (weight < standard - 10) {
  alert("您的标准体重为：" + standard + "，不好意思，您的体重偏瘦，加油哦！");
} else if (weight > standard + 10) {
  alert("您的标准体重为：" + standard + "，不好意思，您的体重偏胖，加油哦！");
}
```

## 34. 将上述代码使用 switch 写法的另一种方式实现，以及使用 if 判断实现一次

```js
var score = prompt("请输入分数");
switch (true) {
  // case 后面不一定都是值
  case score >= 90:
    alert("你的成绩等级为优秀");
    break;
  case score >= 60 && score <= 89:
    alert("你的成绩等级为良好");
    break;
  case score <= 59:
    alert("你的成绩等级为不及格，继续加油哦！");
    break;
}
// 分数 grade
var grade = prompt("请输入分数");
if (grade >= 90) {
  alert("你的成绩等级为优秀");
} else if (grade >= 60 && grade <= 89) {
  alert("你的成绩等级为良好");
} else {
  alert("你的成绩的等级为不及格，继续加油哦！");
}
```

```js
var grade = prompt("请输入分数");
switch (parseInt(grade / 10)) {
  case 10:
    alert("你的成绩等级为优秀");
    break;
  case 9:
    alert("你的成绩等级为优秀");
    break;
  case 8:
    alert("你的成绩等级为良好");
    break;
  case 7:
    alert("你的成绩等级为良好");
    break;
  case 6:
    alert("你的成绩等级为良好");
    break;
  default:
    alert("你的成绩等级为不及格，继续加油哦！");
}
```

```js
var grade = prompt("请输入分数");

// switch 语句中，通过 小括号 内部的表达式的值，与 case后的值进行对比
switch (true) {
  case grade >= 9:
    alert("你的成绩等级为优秀");
    break;
  case grade >= 6:
    alert("你的成绩等级为良好");
    break;
  default:
    alert("你的成绩等级为不及格，继续加油哦！");
}
```

## 35. 输入月份，显示当月天数（输入 2 月时需要再次输入年份判断是不是闰年后在显示当月天数）

```js
var inputMonth = parseInt(prompt("请输入一个月份"));
var date = new Date();
var curMonth = date.getMonth();
date.setMonth(curMonth + inputMonth);
date.setDate(0);
alert("这个月有" + date.getDate() + "天");
if (inputMonth === 2) {
  var num = parseInt(prompt("请输入一个年份，判断这个年是否是闰年。"));
  date = new Date(num, inputMonth, 0);
  if (num % 4 == 0) {
    alert(
      "你好，这个年份" +
        num +
        "是闰年" +
        "且这年的2月有" +
        date.getDate() +
        "天"
    );
    // console.log("你好，这个年份"+num+"是闰年"+"且这年的2月有"+date.getDate()+"天");
  } else if (num % 4 != 0) {
    alert(
      "你好，这个年份" +
        num +
        "不是闰年" +
        "且这年的2月有" +
        date.getDate() +
        "天"
    );
    // console.log("你好，这个年份"+num+"不是闰年"+"且这年的2月有"+date.getDate()+"天");
  } else if (num % 400 == 0) {
    alert(
      "你好，这个年份" +
        num +
        "是闰年" +
        "且这年的2月有" +
        date.getDate() +
        "天"
    );
    console.log(
      "你好，这个年份" +
        num +
        "是闰年" +
        "且这年的2月有" +
        date.getDate() +
        "天"
    );
  } else if (num % 400 != 0) {
    alert(
      "你好，这个年份" +
        num +
        "不是闰年" +
        "且这年的2月有" +
        date.getDate() +
        "天"
    );
    // console.log("你好，这个年份"+num+"不是闰年"+"且这年的2月有"+date.getDate()+"天");
  }
}
```

```js
// 月份 month
var month = prompt("请输入月份");
// 将输入的月份转换成Number类型，默认String
month = Number(month);
// 当输入月份为2月时，提示输入年份，来判断是否闰年
if (month === 2) {
  // 年份
  var year = prompt("请输入年份");
}
// 判断输入年份是否闰年
if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
  // 是闰年
  alert("该年是闰年，二月29天");
} else {
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      alert("该月份为31天");
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      alert("该月份为30天");
      break;
    case 2:
      alert("该年是平年，二月28天");
  }
}
```

# String 对象

## 基本包装类型

- 基本类型是没有方法的。

```js
// 基本类型的数据：没有属性和方法
// 对象数据类型：有属性和方法
// 但是字符串是可以调用一些属性和方法
var str = "这是一个字符串";
var str2 = str.slice(3, 5);
console.log(str2); //个字
```

- 为了方便操作简单数据类型，JavaScript 还提供了特殊的简单类型对象： String

```js
// 基本包装类型：基本类型的数据在进行一些特殊操作时，会暂时被包装成一个对象，结束后再被销毁
// 字符串也有一种根据构造函数创建的方法
var str = "这是一个字符串";
var str3 = new String("abcdef");
console.log(str); //这是一个字符串
console.log(str3); //String {'abcdef'}
```

```js
// 模拟计算机的工作
var str = "这是一个字符串";
// 进行了一个临时的包装
var str4 = new String(str);
var str2 = str4.slice(3, 5);
str4 = null;
```

当调用`str .substring()` 等方法的时候，先把`str` 包装成 `String` 类型的临时对象，再调用 `substring`方法，最后销毁临时对象。

可以使用 `new String()`构造函数方法创建字符串对象。

## 字符串的特点

- 字符串是不可变的。

由于字符串的不可变，在大量拼接字符串的时候会有效率问题。

```js
// 定义一个字符串
// 特点：字符串是不可变的
// var a = "abc";
// a = "cde";

// 大量拼接字符串时，会有效率问题
var sum = "";
for (var i = 1; i <= 1000000; i++) {
  sum += i;
}
console.log(sum);
```

## 字符串属性

长度属性：`str.length`

字符串长度指的是一个字符串中所有的字符总数。
## 字符串对象的常用方法

字符串所有的方法，都不会修改字符串本身（字符串是不可变的），操作完成会返回一个新的字符串。

### charAt() 返回指定位置

方法可返回指定位置的字符。

- char charator ，字符
- at ：在哪儿
- 参数是 index 字符串的下标。也是从 0 开始。
- 表示返回指定的下标位置的字符。

```js
// 定义一个字符串
var str = "这是一个普通的字符串，abc，   ￥%#";

// 长度属性
// console.log(str.length);

// charAt() 返回指定下标位置的字符
console.log(str.charAt(6));
```

### indexOf() 返回首位置

方法可返回某个指定的字符串值在字符串中首次出现的位置。

- 找到指定的子字符串在原字符串中第一次出现的位置的下标。如果子字符串在原字符串中没有，返回值是`-1`。

```js
// 定义一个字符串
var str = "这是一个普通的字符串，abc，   ￥%#";
// indexOf() 返回子串在原始字符串中第一次出现位置的下标
console.log(str.indexOf("字 符串"));
```

### concat() 拼接字符串

方法用于连接两个或多个字符串。

- 参数比较灵活，可以是字符串、或者字符串变量、多个字符串。
- 生成的是一个新的字符串，原字符串不发生变化。

```js
// 定义一个字符串
var str = "这是一个普通的字符串，abc，   ￥%#";
// concat() 字符串拼接
var str2 = str.concat("哈哈哈", "普通");
console.log(str);
console.log(str2);
```

### split() 分割字符串成数组

方法用于把一个字符串分割成字符串数组。

- 参数部分是分割符，利用分割符将字符串分割成多个部分，多个部分作为数组的每一项组成数组。
- 如果分割符是空字符串，相当于将每个字符拆分成数组中的每一项。

```js
// 定义一个字符串
var str = "这是一个普通的字符串，abc，   ￥%#";
// split() 分割字符串成一个数组
// var arr = str.split("");//括号里默认使用英文逗号，
//(21) ['这', '是', '一', '个', '普', '通', '的', '字', '符', '串', '，', 'a', 'b', 'c', '，', ' ', ' ', ' ', '￥', '%', '#']
var arr = str.split("，"); //括号里添加中文逗号，
//(3) ['这是一个普通的字符串', 'abc', '   ￥%#']
console.log(arr);
```

### reverse()字符串内容倒置

```js
// 定义一个字符串
var str = "这是一个普通的字符串，abc，   ￥%#";
// 字符串内容倒置(复杂版)
// var arr = str.split("");
// arr.reverse();
// str = arr.join("");

// 字符串内容倒置(简写版)
str = str
  .split("")
  .reverse()
  .join("");
console.log(str);
```

### 字符串英文大小写转换

- toLowerCase()把字符串转换为小写。
- toUpperCase()把字符串转换为大写。
  - 将所有的英文字符转为大写或者小写。
  - 生成的是新的字符串，原字符串不发生变化。

```js
// 定义一个字符串
var str = "这是一个普通的字符串，abc，   ￥%#";
// 大小写转换
var str1 = str.toUpperCase();
var str2 = str1.toLowerCase();
console.log(str);
console.log(str1);
console.log(str2);
```

## 截取字符串三种方法：

### slice() 提取字符串某部分

slice() 方法可提取字符串的某个部分，并以新的字符串返回被提取的部分。

- 语法： slice(start end)
- 从开始位置截取到结束位置（不包括结束位置）的字符串。
- 参数区分正负，正值表示下标位置，负值表示从后面往前数第几个位置，参数可以只传递一个，表示从开始位置截取到字符串结尾。

```js
// 定义一个字符串
var str = "这是一个普通的字符串，abc，   ￥%#";
// 截取字符串方法：三种
// slice(start,end) 从开始位置截取到结束位置，但是不包含结束位置
// var str1 = str.slice(3,7);
// var str1 = str.slice(-7,-3);
var str1 = str.slice(-7);
console.log(str1);
```

### substr()从某位置截取，截取多少

substr()方法可在字符串中抽取从 start 下标开始的指定数目的字符

- 语法： substr(start,howmany)
- 从开始位置截取到指定长度的字符串。
- start 参数区分正负。正值表示下标位置，负值表示从后往前数第几个位置。
- howmany 参数必须为正数，也可以不写，不写表示从 start 截取到最后。

```js
// 定义一个字符串
var str = "这是一个普通的字符串，abc，   ￥%#";
// substr(start,howmany) 从开始位置截取一定长度
// var str2 = str.substr(3,7);
// var str2 = str.substr(-9,7);
var str2 = str.substr(-9);
console.log(str2);
```

### substring() 提取两个位置中间的字符

substring()方法用于提取字符串中介于两个指定下标之间的字符。

- 语法： substring(start,end)
- 参数只能为正数。
- 两个参数都是指代下标，两个数字大小不限制，执行方法之前会比较一下两个参数的大小，会用小当做开始位置，大的当做结束位置，从开始位置截取到结束位置但是不包含结束位置。
- 如果不写第二个参数，从开始截取到字符串结尾

```js
// 定义一个字符串
var str = "这是一个普通的字符串，abc，   ￥%#";
// substring(start,end) 参数必须是整数，比较两个数的大小，小的作为开始，大的作为结束
// var str3 = str.substring(3,7);
// var str3 = str.substring(7,3);
var str3 = str.substring(7);
console.log(str3);
```

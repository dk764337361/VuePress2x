# 正则表达式语法

## 语法

- 在 JavaScript 中，正则表达式也是对象，是一种索引类型。
- 使用一个正则表达式字面量是最简单的方式。两个 / 是正则表达式的定界符。
- 你可以通过下面两种方法创建一个正则表达式：

## 创建正则表达式

### 1. 正则表达式字面量

- 使用一个正则表达式字面量，如下所示：

```js
var reg = /abc/;
```

正则表达式字面量在脚本加载后编译。若你的正则表达式是常量，使用这种方式可以获得更好的性能。

### 2. 调用 RegExp 对象的构造函数

如下所示：

```js
var re = new RegExp("abc");
```

## 相关正则方法

### 字符串的方法：

- split() 根据匹配字符串切割父字符串
- match() 使用正则表达式与字符串相比较，返回一个包含匹配结果的数组。
- search() 对正则表达式或指定字符串进行搜索，返回第一个出现的匹配项的下标。
- replace() 用正则表达式和字符串直接比较，然后用新的子串来替换被匹配的子串。

### String：split

1. 根据匹配字符串切割父字符串

eg: 根据空格切割字符串：'aa bbb c dd eeeeee'

```js
// split 方法：分割字符串，成为一个数组
var str = "aa bbb    c dd eeeeee";
// 使用一个空格字符进行的精确分割
var arr = str.split(" ");
// 使用正则表达式可以进行模糊匹配分割("\d" 是数字，"\s"是空白字符，"+"是匹配是多个)
var arr1 = str.split(/\s+/);
console.log(arr1); //["aa", "bbb", "c", "dd", "eeeeee"]
```

练习：根据字母 a 切割字符串'bbaacaaaadddaeeeeeaaf'

```js
var str2 = "bbaacaaaadddaeeeeeaaf";
var arr2 = str2.split(/a+/);
console.log(arr2);
```

### String：search

寻找匹配字符串在父字符串中位置，如果找到了返回>0 的数值，如果没找到则返回-1。

eg：在‘abcdefg’中寻找‘cd’位置

```js
// search 方法：查询子串在父字符串中出现的位置
var str = "abcdefg";
console.log(str.search("cdf")); //2
console.log(str.search(/eff/)); //-1
```

练习：在字符串'aaaa o o bbb aaa'中寻找‘o o’位置

```js
var str2 = "aaaa o o bbb aaa";
console.log(str2.search(/o\so/));
```

### String：match

l 在父字符串中寻找匹配字符串

在 'abbcccbbbbbddbbbdabbb' 中查询重复 'b' 字符串

```js
// match 方法：在父字符串中去匹配符合的子字符串，将结果输出到数组中
var str = "abbcccbbbbbddbbbdabbb";
var arr = str.match(/b+/); //在匹配到第一个之后就结束
var arr = str.match(/b+/g); //如果有全局修饰符 g，会在找到所有匹配的字符串后结束
console.log(arr);
```

练习：'aaaa o o bbb o o aaa'找寻所有‘o o’字符串

```js
var str1 = "aaaa o  o bbb o     o  aaa";
var arr1 = str1.match(/o\s+o/g);
console.log(arr1);
```

### String：replace

替换父字符串中匹配字符串

eg：将'www.hello.com'替换成'www.byebye.com'

```js
// replace 方法：替换字符串的指定部分，返回值是一个新的替换后的字符串，原始字符串不受影响
var str = "www.hello.com";
var str1 = str.replace(/hello/, "byebye");
console.log(str);
console.log(str1);
```

练习：过滤字符串中空格：'aa b c d e f ' => "aabcdef"

```js
var str = "aa b c d e f ";
var str1 = str.replace(/\s+/g, "");
console.log(str);
console.log(str1);
```

### 正则表达式方法：

- exec() 在目标字符串中执行一次正则匹配操作。
- test() 测试当前正则是否能匹配目标字符串。

### RegExp：exec

- 在字符串中寻找匹配字符串，该方法比其他正则方法或字符串方法支持的更复杂

eg：在'aaaabccccbacabc'中查找'abc'字符串

var result = /abc/.exec('aaaabccccbacabc')

result => ["abc"]

result.index => 3

```js
// exec 方法：查找匹配的字符串，输出到数组中
// 不论有没有全局修饰符，都只会在找到第一个之后停止
var str = "aaaabccccbacabc";
var reg = /abc/;
var arr = reg.exec(str);
console.log(arr); //["abc"]
console.log(arr.index); //3
```

练习：在'ooooo 0 0 ooooooooooo'字符串中匹配["o 0 0 o"]

```js
var str = "ooooo 0 0 ooooooooooo";
var reg = /o\s0\s0\so/;
var arr = reg.exec(str);
console.log(arr); //["o 0 0 o"]
console.log(arr.index); //4
```

### RegExp：test

- 检测字符串是否匹配正则表达式

eg：判断'aaddccddabcddeeddfff'是否包含'abc'字符串

/abc/.test('aaddccddabcddeeddfff')

=> true

```js
// test 方法：检测字符串中是否满足正则表达式的匹配规则，返回值是布尔值
var reg = /abc/;
console.log(reg.test("aaddccddabcddeeddfff")); //true
```

练习：检测'a bc'和'abc'是否包含空格

```js
console.log(/\s/.test("a bc")); //true
console.log(/\s/.test("abc")); //false
```

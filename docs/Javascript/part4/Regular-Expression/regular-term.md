# 正则的术语

## 字符集

- 简单类: 正则的多个字符对应一个字符，我们可以用 [] 把它们括起来，让 [] 这个整体对应一个字符[abc]

例子：o[usb]t——obt、ost、out

```js
// 简单类：多个可能匹配的字符连续书写在一起，只要其中一个匹配成功即可
var reg = /[abc]/;
console.log(reg.test("eeeb"));
```

- 范围类: 有时匹配的东西过多，而且类型又相同，全部输入太麻烦，我们可以在中间加了个横线。[a-z]、[0-9]、[A-Z]

例子：id[0-9]——id0、id5

```js
// 范围类：将匹配同一类型且连续在一起的字符写到集合中，中间使用 - 连接
// var reg = /[0-9]/;
// var reg = /[a-z]/;
var reg = /[A-Q]/;
console.log(reg.test("A123456"));
```

- 负向类: [] 前面加个元字符进行取反，表示匹配不能为括号里面的字符。[^a]

例子：o[^0-9]t——oat、o?t、o t

```js
// 负向类：取反的意思，不包含字符集内部书写的字符
var reg = /[^A-Q]/;
// console.log(reg.test("A123456"));  //true
console.log(reg.test("A")); //false
```

- 组合类: 允许用中括号匹配不同类型的单个字符。[0-9a-b]

例子：o[0-9a-b]t——oat、o?t、o

```js
// 组合类：单一类型或者简单类不能匹配所有结果，可以将多个写法连在一起书写
// 特殊的：如果数字、大写字母、小写字母，按照这种顺序写的完整的范围，可以缩写
// var reg = /[0-9a-z]/;
// var reg = /[0-9A-Z]/;
var reg = /[0-z]/;
console.log(reg.test("a"));
```

## 修饰符

- `g`修饰符用于执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。

'12a34b56c78d90e'.match(/\d+/) => ["12"]

'12a34b56c78d90e'.match(/\d+/g) => ["12", "34", "56", "78", "90"]

```js
// g 修饰符：可以实现全局查找
var str = "aabblsdddbbbdlBBdllbbbbb";
var reg = /b+/g;
console.log(str.match(reg));
```

- `i`修饰符用于执行对大小写不敏感的匹配。

'aabAAcAa'.match(/aa/g) => ["aa"]

'aabAAcAa'.match(/aa/gi) => ["aa", "AA", "Aa"]

```js
// i 修饰符：字母大小写可以不敏感，a 可以匹配 a 或 A
var str = "aabblsdddbbbdlBBdllbbbbb";
var reg = /A/gi;
console.log(str.match(reg));
```

## 边界

- `^`开头注意不能紧跟于左中括号的后面

/^hello/.test('hello javascript') => true

/^javascript/.test('hello javascript') => false

```js
// 边界
// ^  表示限制开头，后面的正则内容匹配的结果必须出现在字符串开始
var str = "hello Javascript";
console.log(/^hello/.test(str)); //true
console.log(/^hhello/.test(str)); //false
```

- `$` 结尾

/javascript\$/.test('hello javascript') => true

/hello\$/.test('hello javascript') => false

```js
// $ 表示限制结尾，前面的正则内容匹配的结果必须出现在字符串结尾
console.log(/script$/.test(str)); //true
console.log(/scripthaha$/.test(str)); //false
```

- 实际应用中，会同时限制开头和结尾

```js
// 实际应用中，会同时限制开头和结尾
var str1 = "hello Javascript";
var str2 = "hello ll Javascript";
console.log(/^hello\s+Javascript$/.test(str1)); //true
console.log(/^hello\s+Javascript$/.test(str2)); //false
```

## 预定义类

- `.` [^\n\r] 除了换行和回车之外的任意字符

```js
// 非回车非换行字符 .
console.log(/^.+$/.test(`asldjf2830&*^`)); //true
console.log(
  /^.+$/.test(`asldjf
        2830&*^`)
); //false
```

- `\d` [0-9] 数字字符
- `\D` [^0-9] 非数字字符

```js
// \d 数字字符 \D 非数字字符
console.log(/^\d+$/.test(`0123456789`));
console.log(/^\d+$/.test(`01234z56789`));
console.log(/^\D+$/.test(`askdAK  *&^`));
console.log(/^\D+$/.test(`askdAK  *&^7`));
```

- `\s` [ \t\n\x0B\f\r] 空白字符
- `\S` [^ \t\n\x0B\f\r] 非空白字符

```js
// \s 空白字符 \S 非空白字符
console.log(
  /^\s+$/.test(`  1    
        `)
);
console.log(
  /^\s+$/.test(`      
        `)
);
console.log(/^\S+$/.test(`AJO456`));
console.log(/^\S+$/.test(`AJO  456`));
```

- `\w` [a-zA-Z_0-9] 单词字符(所有的字母/数字/下划线)
- `\W` [^a-za-z_0-9] 非单词字符

```js
// \w 单词字符 \W 非单词字符
console.log(/^\w+$/.test(`abc09_A`));
console.log(/^\w+$/.test(`abc*09_A`));
console.log(/^\W+$/.test(`*&^%$ *`));
console.log(/^\W+$/.test(`a*&^%$ *`));
```

## 量词

- `{n}` 硬性量词对应零次或者 n 次
- `{n,m}` 软性量词至少出现 n 次但不超过 m 次(中间不能有空格)
- `{n,}` 软性量词至少出现 n 次(+的升级版)
- `?` 软性量词出现零次或一次
- `*` 软性量词出现零次或多次(任意次)
- `+` 软性量词出现一次或多次（至少一次）

```js
// 量词
// {n}  硬性量词   对应前面的内容必须在字符串中出现 n 次连续
// var reg = /^\d{5}$/;
// console.log(reg.test("1234"));
// console.log(reg.test("12345"));
// console.log(reg.test("123456"));

// {n,m}  软性量词  对应前面的内容必须在字符串中出现 n-m 次连续
// var reg = /^\d{5,7}$/;
// console.log(reg.test("1234"));
// console.log(reg.test("12345"));
// console.log(reg.test("123456"));
// console.log(reg.test("1234567"));
// console.log(reg.test("12345678"));

// {n,}  软性量词  对应前面的内容必须在字符串中出现至少 n 次连续
// var reg = /^\d{5,}$/;
// console.log(reg.test("1234"));
// console.log(reg.test("12345"));
// console.log(reg.test("123456"));
// console.log(reg.test("1234567"));
// console.log(reg.test("123456789101112"));

// ?  软性量词  {0,1} 表示前面的内容出现 0 次或 1次
// var reg = /^\d?$/;
// console.log(reg.test("1"));
// console.log(reg.test(""));
// console.log(reg.test("12345"));

// *  软性量词  {0,} 表示前面的内容出现 0 次或 任意次
// var reg = /^\d*$/;
// console.log(reg.test("1"));
// console.log(reg.test(""));
// console.log(reg.test("12345"));

// +  软性量词  {1,} 表示前面的内容出现 1 次或 以上
var reg = /^\d+$/;
console.log(reg.test(""));
console.log(reg.test("1"));
console.log(reg.test("12345"));
```

## 分组

虽然量词的出现，能帮助我们处理一排密紧密相连的同类型字符。但这是不够的，我们用中括号
表示范围内选择，大括号表示重复次数。如果想获取重复多个字符，我们就要用小括号进行分组
了。

/(bye){2}/.test('byebye')

=> true

/(bye){2}/.test('bye')

=> false

```js
// 分组
var reg = /^(bye){2}$/;
console.log(reg.test("byebye"));
console.log(reg.test("bbyyee"));
```

## 或操作符

可以使用竖线（|）字符表示或者的关系。

/a|bcd/ 匹配 a 或 bcd 字符。

/(ab)+|(cd)+/ 匹配出现一次或多次的 ab 或者 cd

```js
//或操作符 |
// var reg = /^a|bcd$/;    //匹配时，要么匹配以a开头的，要么匹配以 bcd 结尾的
// console.log(reg.test("cbcde"));
// console.log(reg.test("acbcde"));
// console.log(reg.test("abcd"));

// 如果想在正则中，在两个规则之间只能选其中一个，不能包含其他的开头结尾，需要去讲或运算放到分组里
var reg = /^(ab|cd)$/;
console.log(reg.test("abcd"));
console.log(reg.test("ab"));
console.log(reg.test("cd"));
```

## 分组的反向引用

反向引用标识是对正则表达式中的匹配组捕获的子字符串进行编号，通过“\编号(在表达式
中)”，“\$编号（在表达式外）”进行引用。从 1 开始计数。

```js
// 正则中通过分组匹配到的字符串，会被进行编号，从 1 开始
// 在正则内部可以通过 \1 方式，去对字符串进行反向引用
// console.log(/^([a-z]{3})\1$/.test("byebye"));
// console.log(/^([a-z]{3})\1$/.test("byelie"));

// 正则表达式以外通过 $1 ,进行字符串的引用
// var str = "123*456".replace(/^(\d{3})\*(\d{3})$/,"$2*$1");
// 第二个参数可以是一个函数
var str = "123*456".replace(/^(\d{3})\*(\d{3})$/, function(match, $1, $2) {
  return $1 * 3 + "/" + $2 * 2;
});
console.log(str);
```

## 中文字符

匹配中文：[\u4e00-\u9fa5]

/[\u4e00-\u9fa5]+/.test('中文内容')

=> true

/[\u4e00-\u9fa5]+/.test('aaa')

=> false

```js
// 匹配中文字符
var reg = /^[a-z\u4e00-\u9fa5]+$/;
console.log(reg.test("只有中文的文字内容"));
console.log(reg.test("只有中文的文 字内容"));
console.log(reg.test("只有中文的文a字内容"));
```

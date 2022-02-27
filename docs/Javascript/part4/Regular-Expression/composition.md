# 正则表达式的组成

- 由一些普通字符和一些特殊字符（又叫元字符--metacharacters）组成。普通字符包括大小写的字母和数字，而元字符则具有特殊的含义。

## 普通字符

```js
// 普通字符组成的正则
var reg = /abc/;
// 表示正则匹配时，需要进行精确匹配，必须包含a、b、c三个字符，并且顺序不能颠倒，而且要连续书写
console.log(reg.test("asldfjwefabcsld"));
```

## 特殊字符

- 特殊字符：javascript 中常用特殊字符有 `()` `[]` `{}` `\` `^` `\$` `|` `?` `\*` `+` `.`

```js
// 特殊字符，匹配字符串中对应的普通的符号字符时，需要进行转义
var reg1 = /a*/; //匹配一个a,后面有*
var reg2 = /a\*/; //匹配一个a,后面紧挨着*
console.log(reg1.test("alsdj*sd")); //true
console.log(reg2.test("alsdj*sd")); //false
```

## 预定义特殊字符

- 若想匹配这类字符必须用转移符号 \ 如：\(,\^,\\
- 预定义特殊字符：

1. `\t /\t/ 制表符`

```js
console.log(/\t/.test(" "));
```

2.  `\n /\n 回车符`

::: warning 注意
使用双引号或单引号换行会报错，反引号` `` `可以。
:::

```js
console.log(/\n/.test(`aaabbb`)); //false
var str1 = `sdlfkjw
      eofoa`;
var str2 = "sdlfkjw
eofoa";
var str3 = 'sdlfkjw
eofoa';
console.log(/\n/.test(str1)); //true
console.log(/\n/.test(str2)); //报错
console.log(/\n/.test(str3)); //报错
```

3.  `\f /\f/ 换页符`
4.  `\b /\b/ 空格`

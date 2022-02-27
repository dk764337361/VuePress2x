# switch 语句

- 开关语句允许一个程序求一个表达式的值，并且尝试去匹配表达式的值到一个 case 标签。如果匹配成功，这个程序执行相关的语句。

## switch 语句语法

```js
    switch (表达式) {
	case 值1:
		结构体1;
		break;
	case 值2:
		结构体2;
		break;
	……
	default:
		结构体n；
		break;
     }
```

## switch 语句结构解析

- switch：关键字表示开始进入一个开关语句。
- 表达式：会求出一个具体的值，将这个值去与 {} 内部的 case 后面的值进行对比、匹配，如果值相等表示匹配成功。匹配相等时，方式是进行全等于匹配，不止值要相等，数据类型也要相等。
- case：示例的意思，作为关键字后面必须跟一个空格，书写匹配的值。
- case 后面的结构体：每个 case 匹配成功之后要执行的语句。
- break：用于打断结构体，直接跳出程序，模拟跳楼现象。
- default：相当于 if 语句中的 else，否则的情况，如果前面的 case 都不匹配，执行 default 后面的语句。

## switch 语句运行机制

- switch 语句首先会将小括号内的表达式计算出一个结果，用结果去匹配结构体内部的 case；
- 从上往下进行匹配，如果匹配成功，会立即执行这个 case 后面的语句，直到遇到一个 break 跳出整个 switch 语句；
- 如果前面的 case 没有匹配成功，会跳过 case 之间的语句，去匹配下一个 case，直到匹配成功，如果都不成功就执行 default 后面的语句。

::: tip 提示
如果是通过一个变量匹配多个值时，使用 switch 语句判断更好（比 if 更好）
:::

## 案例 1

输出星座运势。

```js
// 用户输入
var xingzuo = prompt("请输入您的星座", "白羊座");
// 进行匹配
switch (xingzuo) {
  case "白羊座":
    alert("运势持续在线，将会是忙而充实的一天。");
    break;
  case "金牛座":
    alert("你或许需要付出更多的努力，才能实现自己的大志。");
    break;
  case "双子座":
    alert("你的脾气比较大，容易把负面情绪波及到最亲近的人。");
    break;
  case "巨蟹座":
    alert("人际关系会给你带来一些便利，善加把握会得到很多。");
    break;
  default:
    alert("对不起，数据库不全，不能找到您的星座");
    break;
}
```

```js
// 用 if 语句书写
if (xingzuo === "白羊座") {
  alert("运势持续在线，将会是忙而充实的一天。");
} else if (xingzuo === "金牛座") {
  alert("你或许需要付出更多的努力，才能实现自己的大志。");
} else if (xingzuo === "双子座") {
  alert("你的脾气比较大，容易把负面情绪波及到最亲近的人。");
} else if (xingzuo === "巨蟹座") {
  alert("人际关系会给你带来一些便利，善加把握会得到很多。");
} else {
  alert("对不起，数据库不全，不能找到您的星座");
}
```

## 注意事项

- `default` 可以不写，相当于 if 语句没有 else。
- `break` 关键字：根据结构需要有时必须在每个 case 后面都要写，为了模拟跳楼现象，如果不写 break，对应的 case 后面的语句执行之后，不会跳出结构体，会继续想下执行其他 case - 的后面的语句，直到遇到一个 break。
- 可以利用 break 不写的情况制作一些特殊的案例

## 案例 2

用户输入一个月份的数字，请返回给用户对应月份的天数。

```js
var month = parseInt(prompt("请输入一个月份的数字", "1"));
// 输出对应的天数
switch (month) {
  case 1:
  case 3:
  case 5:
  case 7:
  case 8:
  case 10:
  case 12:
    alert("这个月有31天");
    break;
  case 2:
    alert("这个月有28天或29天");
    break;
  default:
    alert("这个月有30天");
}
```

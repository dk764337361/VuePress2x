# 代码练习

## 1. 使用解构赋值，实现两个变量的值的交换

```js
let a = 5;
let b = 3;
[a, b] = [b, a];
```

## 2. 使用 set 实现数组去重

```js
let list = [1, 3, 4, 6, 2, 2, 2, 3, 1, 2, 3, 4];
let set = new Set(list);
let newList = Array.from(set);
```

## 3. 使用箭头函数改写下列代码

```js
arr.forEach(function(v, i) {
  console.log(v, i);
});

// ====

arr.forEach((v, i) => {
  console.log(v, i);
});
```

## 4. 检测是否是数字，包括整数，小数

```js
var num = prompt("请输入数字");
var reg = /^\-?(0|([1-9]\d*))(\.\d+)?$/;
if (reg.test(num)) {
  alert("right");
} else {
  alert("wrong");
}
```

## 5. 检测是否是本地电话，如 010-12345678,0418-12345678

```js
var call = prompt("请输入本地电话");
var reg = /^\d{3,4}\-\d{8}$/;
if(reg.test(call)){
	alert("right");
}else{
	alert("wrong");
}alert("false");
}
```

## 6. 将用户输入的网址全部转化成我们的官网。如 www.baidu.com=>www.lagou.com

```js
var web = prompt("请输入网址");
// 用户按常规输入
web = web.replace(/^(\w{3}\.)(\w+)(\.\w{3})$/, function(match, $1, $$3) {
  return $1 + "lagou" + $3;
});
// 用户不按常规输入
web = web.replace(/^.+$/, "www.lagou.com");
alert(web);
```

## 7. 实现 trim(str)方法，过滤字符串首位空白

```js
function trim(str) {
  // str = str.replace(/^\s+/,"");
  // 如果过滤前后的空白
  // str = str.replace(/^\s+|\s+$/g,"");
  str = str.replace(/^\s*(\S.*\S)\s*$/, "$1");
  return str;
}
console.log(trim("   h   a s  "));
console.log(trim("   h   a s  ").length);
```

## 8. 获取`<p class='demo'>hello JavaScript</p>`内部文案

```js
var str = "<p class='demo'>hello JavaScript</p>";
var str = `<p class='demo'>
	hello
	<span>JavaScript</span>
	</p>`;
function innerHTML(str) {
  // 简单版
  // str = str.replace(/^<.+>(.*)<.+>$/,"$1");
  // 防止出现多个 <> 版
  str = str.replace(/^<[^>]+>([\s\S]*)<[^<]+>$/, "$1");
  return str;
}
console.log(innerHTML(str));
```

## 9. 将 div#demo.demo 转化成`<div id="demo" class="demo"></div>`

```js
var str = "div#demo.box";
function quick(str) {
  str = str.replace(/^(\w+)(#|\.)(\w+)(#|\.)(\w+)$/, function(
    match,
    $1,
    $2,
    $3,
    $4,
    $5
  ) {
    // return '<' + $1 + ' id="' + $3 + '" class="' + $5 + '"></' + $1 + '>';
    // return `<${$1} id="${$3}" class="${$5}"></${$1}>`;
    // 顺序不确定版
    var cname = "";
    var iname = "";
    if ($2 === "#") {
      iname = $3;
    } else {
      cname = $3;
    }
    if ($4 === "#") {
      iname = $5;
    } else {
      cname = $5;
    }
    return `<${$1} id="${iname}" class="${cname}"></${$1}>`;
  });
  return str;
}
// quick(str);
console.log(quick(str));
```

## 10. 检测是否是 2 到 4 位汉字

```js
function jchz(str) {
  var reg = /^[\u4e00-\u9fa5]{2,4}$/;
  if (reg.test(str)) {
    alert("right");
  } else {
    alert("wrong");
  }
}
```

## 11. 检测昵称是否是有汉字字母数字下划线组成，6-8 位

```js
function jcnc(str) {
  var str = prompt("请输入一个昵称");
  if (str.length <= 8 && str.length >= 6) {
    var reg = /^([\u4e00-\u9fa5]|\w){6,8}$/;
    if (reg.test(str)) {
      alert("昵称格式正确");
    } else {
      alert("昵称格式错误，昵称由汉字字母数字下划线组成");
    }
  } else {
    alert("请输入6-8位字符");
  }
}
```

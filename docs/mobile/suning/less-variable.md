# Less 使用

我们首先新建一个后缀名为 `.less`的文件，在这个 less 文件里面书写 Less 语句。

## Less 变量

- 变量是指没有固定的值，可以动态改变的。因为我们 CSS 中的一些颜色和数值等经常使用。
- @变量名：值；

  1.变量命名规范

- 必须有@为前缀
- 不能包含特殊字符
- 不能以数字开头
- 大小写敏感

```css
@color: pink;
```

2. 变量使用规范

```css
body {
  color: @color;
}
a:hover {
  color: @color;
}
```

## 举例

- new.less

```css
// less 变量
// 创建变量
// 变量命名规则：1、必须以 @ 开头， 2、不能包含特殊符号，3、数字不能作为开头，4、大小写敏感
@color: pink;
@Color: deeppink;
@fs14: 14px; //font-size的简写
// 变量使用
div {
  background-color: @color;
}
h2 {
  background-color: @color;
}
```

## Less 编译

- 本质上,Less 包含一套自定义的语法及一个解析器,用户根据这些语法定义自己的样式
  规则,这些规则最终会通过解析器,编译生成对应的 CSS 文件。
- 所以,我们需要把我们的 less 文件,编译生成为.css 文件,这样我们的 html 页面才能使用。

### 命令行编译

- 推荐方法(nodejs):在当前文件夹,使用 cmd 命令或 git bash 命令,再回车，自动生成编译后的文件

```bash
less 文件名称.less>文件名称.css
```

<img src="/images/mobile/rem/007.png" style="width: 100%; display:block; margin: 0 ;">
<img src="/images/mobile/rem/008.png" style="width: 100%; display:block; margin: 0 ;">

### VS code 插件编译

- `Easy Less`插件用来把 less 文件编译为 css 文件
- 安装完毕插件，重新加载下 vscode。
- 只要保存以下 less 文件，会自动生成 CSS 文件。

<img src="/images/mobile/rem/009.png" style="width: 100%; display:block; margin: 0 ;">

## Less 嵌套

### 普通嵌套

<img src="/images/mobile/rem/010.png" style="width: 100%; display:block; margin: 0 ;">

### 复杂嵌套

如过遇见（交集|伪类|伪元素选择器）

- 内层选择器的前面没有`&符号`，则它被解析为父选择器的后代;
- 如果有&符号，它就被细节为父元素自身或父元素的伪类。
  <img src="/images/mobile/rem/011.png" style="width: 100%; display:block; margin: 0 ;">

### 嵌套举例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="css/nest.css" />
  </head>
  <body>
    <div class="header">
      <div class="logo">logo</div>
    </div>
    <div class="nav">
      <a href="#">文字</a>
      <a href="#" class="box">盒子</a>
    </div>
  </body>
</html>
```

```css
// less 普通嵌套
.header {
  width: 200px;
  height: 200px;
  background-color: pink;
  .logo {
    width: 100px;
    height: 100px;
    background-color: green;
  }
}

// less 复杂嵌套
.nav {
  width: 200px;
  height: 200px;
  background-color: pink;
  a {
    display: block;
    width: 100px;
    height: 100px;
    background-color: skyblue;
    &.box {
      //交集嵌套
      background-color: yellowgreen;
    }
    &:hover {
      //伪类嵌套
      background-color: deeppink;
    }
  }
}
```

## Less 运算

<img src="/images/mobile/rem/012.png" style="width: 50%; display:block; margin: 0 ;">

- 任何数字、颜色或者变量都可以参与运算。
- Less 提供了加（+）、减（-）、乘（\*）、除（/）算数运算。

::: warning 注意

- 乘号（\*）和除号（/）的写法
- 对于两个不同单位的值之间的运算，运算结果的值取第一个值得单位。
- 如果两个值之间只有一个值有单位，则运算结果就取该单位
- 运算符中间左右有个空格隔开 1px + 5rem
- 进行除法运算要加括号,乘法运算则不用

```css
  // width: (200rem / 50px);
```

:::

### 举例

- count.less

```css
// less 运算
@baseFont: 50px;
html {
  font-size: @baseFont;
}
div {
  // width: 200px + 50;
  // height: 200px * 1.5;
  // rem 的单位
  // width: (200rem / 50px);
  // height: (300rem / 50);
  // width: (200rem / @baseFont);
  width: 200px + 2rem;
  height: (300rem / @baseFont);
  background-color: #999 - #333;
}
// 1.参与运算的两个数字，可以一个有单位，一个没有单位，最终单位就是唯一的那个单位
// 2.参与运算的两个数字，两个都有单位，最终单位取第一个数字的单位
// 3.less的运算符左右必须加空格
```

- 转换后：count.css

```css
html {
  font-size: 50px;
}
div {
  width: 202px;
  height: 6rem;
  background-color: #666666;
}
```

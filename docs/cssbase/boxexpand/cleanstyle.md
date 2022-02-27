# 清除默认样式

::: tip 提示

大部分标签都有一个浏览器加载的默认样式，会对布局造成一些影响。为了避免默认样式对整体布局效果造成影响，一定要清除默认样式。
盒模型属性中内外边距：大部分容器级标签都有默认边距，

要么用`标签选择器`的并集方式，要么`通配符*`清除。

:::

`<ul>` 和 `<ol>` 两种列表有默认的列表前缀：清除 list-­style 属性。

`<a>` 标签的默认样式，顺带设置页面中常用的 a 的公共样式：设置 color 和 text­-decoration。

清除默认加粗效果：设置 font-­weight。


::: details 点击查看代码

```css
body,
div,
p,
h1,
h2,
h3,
h4,
h5,
h6,
ul,
ol,
li,
dl,
dt,
dd,
td,
th {
  margin: 0;
  padding: 0;
}
ul,
ol {
  list‐style: none;
}
a {
  color: #666;
  text‐decoration: none;
}
h1,
h2,
h3,
h4,
h5,
h6,
b,
strong {
  font‐weight: normal;
}
```
:::

还可以给 `<body>` 标签设置整体文字样式，让大部分后代标签全部去继承。

```css
/*设置初始公共样式*/
body {
  color: #666;
  font‐size: 14px;
  font‐family: "Arial", "consolas", "Microsoft Yahei", "SimSun";
}
```

# 语义化标签：
## 以往的标签语义化
- 以前制作网页布局，基本用div来做。然而div就是一个普通的块级标签，对于搜索引擎来说，是没有语义的。
```html
<div class="header"><div>
<div class="nav"><div>
<div class="content"><div>
<div class="footer"><div>
```

## HTML5的标签语义化
<img src="/images/html5/002.png" style="width: 100%; display: block; margin: 0 ;">

- `<header>`:头部标签
- `<nav>`:导航标签
- `<main>`:主体标签
- `<article>`:独立的内容标签
- `<section>`:区段标签
- `<aside>`:侧边栏标签
- `<footer>`:标签

### 案例

<img src="/images/html5/003.png" style="width: 100%; display: block; margin: 0 ;">

:::details 点击查看代码
```html
  <head>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      /* 防止IE9以下浏览器不兼容，需要格式化为块级元素显示 */
      header,nav,article,aside,main,footer {
        display: block;
      }
      header {
        width: 1000px;
        height: 100px;
        margin: 0 auto;
        background-color: gold;
      }
      nav {
        width: 1000px;
        height: 50px;
        margin: 10px auto 0;
        background-color: gold;
      }
      main {
        width: 1000px;
        height: 400px;
        margin: 10px auto 0;
        background-color: gold;
      }
      main aside {
        float: left;
        width: 150px;
        height: 400px;
        margin-right: 10px;
        background-color: hotpink;
      }
      main article {
        float: left;
        width: 840px;
        height: 400px;
        background-color: yellowgreen;
      }
      footer {
        width: 1000px;
        height: 80px;
        margin: 10px auto 0;
        background-color: gold;
      }
    </style>
  </head>
  <body>
    <header>头部</header>
    <nav>导航栏</nav>
    <main>
      <aside>侧边栏</aside>
      <article>主题内容</article>
    </main>
    <footer>底部</footer>
  </body>
```
:::

## 注意事项

- `HTML5的标签语义化`标准主要针对搜索引擎的
- 这种新标签可以在页面中使用多次
- 这种新标签更适用于移动端
- 在IE9中，需要把这些元素转换为块级元素
- HTML5还增加了很多标签，后面再列举
- [查询手册](https://developer.mozilla.org/zh-CN/docs/web/html/element)





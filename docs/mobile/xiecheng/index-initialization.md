# 携程网首页-初始化设置

[携程网移动端首页](https://m.ctrip.com/html5/)

## 技术选型

- 方案：采取单独制作移动页面方案
- 技术：布局采取 flex 布局

## 搭建相关文件夹结构

```
 ├─── xiecheng
    ├──  css
    ├──  images
    └──  index.html
```

## 设置视口标签以及引入初始化样式
- index.html
```css
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <title>Document</title>
    <!-- 引入初始化CSS文件 -->
    <link rel="stylesheet" href="css/normalize.css" />
    <!-- 引入首页的CSS -->
    <link rel="stylesheet" href="css/index.css" />
```

## 初始化常用样式&添加特俗样式
- index.css
```css
/* 初始化样式 */
body {
  max-width: 540px;
  min-width: 320px;
  margin: 0 auto;
  font: normal 14px/1.5 Tahoma, "Lucida Grande", Verdana, "Microsoft	Yahei", STXihei,
    hei;
  color: #000;
  background: #f2f2f2;
  overflow-x: hidden;
  -webkit-tap-highlight-color: transparent;
}

/*CSS3盒子模型*/
/* box-sizing: border-box; */
/* -webkit-box-sizing: border-box; */

/*点击高亮我们需要清除清除 设置为transparent 完成透明*/
* {
  -webkit-tap-highlight-color: transparent;
}
/*在移动端浏览器默认的外观在iOS上加上这个属性才能给按钮和输入框自定义样式*/
input {
  -webkit-appearance: none;
}
/*禁用长按页面时的弹出菜单*/
img,
a {
  -webkit-touch-callout: none;
}

```


# 京东移动首页准备工作

[京东移动首页](https://m.jd.com)

## 技术选型

- 方案我们采取单独制作移动页面方案
- 技术布局采取流式布局

## 搭建相关文件夹结构

```
 ├─── JD
    ├──  css
    ├──  images
    └──  index.html
```

## 设置视口标签以及引入初始化样式

- index.html

```html
<meta
  name="viewport"
  content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
/>
<!-- 引入初始化CSS文件 -->
<link rel="stylesheet" href="css/normalize.css" />
<!-- 引入自己的首页的CSS -->
<link rel="stylesheet" href="css/index.css" />
```

## 添加常用初始化样式和特殊样式

- index.css

```css
/* 给body进行样式初始化 */
body {
  /* 首先设置盒模型属性 */
  margin: 0 auto;
  min-width: 320px;
  max-width: 540px;

  background: #fff;
  font-size: 14px;
  font-family: -apple-system, Helvetica, sans-serif;
  line-height: 1.5;
  color: #666;
}

/* 添加特殊样式 */
* {
  /*点击高亮我们需要清除清除设置为 transparent 完成透明*/
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

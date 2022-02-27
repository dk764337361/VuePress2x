# 移动端技术解决方案

移动端浏览器基本以`webkit`内核为主，因此我们就考虑`webkit`兼容性问题。

我们可以放心使用 H5 标签和 CSS3 样式。

同时我们浏览器的私有前缀我们只需要考虑添加 `-webkit-`即可。

<img src="/images/mobile/mobilebase/008.png" style="width: 100%; display:inline-block; margin: 0 ;">

## CSS 初始化 normalize.css

移动端 CSS 初始化推荐使用 normalize.css。
[normalize 官网地址](http://necolas.github.io/normalize.css/)

优点：

- Normalize.css:保护了有价值的默认值
- Normalize.css:修复了浏览器的 bug
- Normalize.css:是模块化的
- Normalize.css:拥有详细的文档

## CSS3 盒子模型 box-sizing

- 传统盒模型 content-box: 计算盒子的宽度＝ CSS 中设置的 width + border + padding
- CSS3 盒子模型 border-box：盒子的宽度＝ CSS 中设置的宽度 width 里面包含了 border 和 padding 也就是说， 我们的 CSS3 中的盒子模型， padding 和 border 不会撑大盒子了

<img src="/images/mobile/mobilebase/009.png" style="width: 50%; display:inline-block; margin: 0 ;">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, user-scalable=no,maximum=1.0,minimum=1.0"
    />
    <title>Document</title>
    <link rel="stylesheet" href="css/normalize.css" />
    <style>
      .box1 {
        /* 传统盒模型：边框、内边距会在宽高之外进行扩展 */
        width: 200px;
        height: 200px;
        padding: 20px;
        border: 10px solid #f00;
        background-color: pink;
      }
      /* css3盒模型：元素占有的整体宽高不变，添加内边距和边框后，自动内减 */
      .box2 {
        width: 200px;
        height: 200px;
        padding: 20px;
        border: 10px solid #f00;
        box-sizing: border-box;
        background-color: pink;
      }
    </style>
  </head>
  <body>
    <div class="box1">1</div>
    <div class="box2">2</div>
  </body>
</html>
```

## 传统 or CSS3 盒子模型？

- 移动端可以全部 CSS3 盒子模型
- PC 端如果完全需要兼容，我们就用传统模式， 如果不考虑兼容性，我们就选择 CSS3 盒子模型

## 添加特殊样式

```css
* {
  /* CSS3盒子模型*/
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
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

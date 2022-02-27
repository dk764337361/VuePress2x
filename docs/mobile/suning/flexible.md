# 适配方案 2-flexible.js

## 简洁高效的 rem 适配方案 flexible.js

手机淘宝团队出的简洁高效移动端适配库。

我们再也不需要在写不同屏幕的媒体查询， 因为里面 js 做了处理。

它的原理是把当前设备划分为 10 等份，但是不同设备下， 比例还是一致的。

我们要做的，就是确定好我们当前设备的 html 文字大小就可以了

比如当前设计稿是 750px, 那么我们只需要把 html 文字大小 设置为 75px(750px / 10)就可以

里面页面元素 rem 值：页面元素的 px 值／ 75

剩余的，让 flexible.js 来去算

github 地址： https://github.com/amfe/lib-flexible

### 1.技术选型

方案：我们采取单独制作移动页面方案。

技术：布局采取 rem 适配布局 2 (flexible.js + rem)

设计图：本设计图采用 750px 设计尺寸

### 1.搭建相关文件夹结构

```
 suningyigou
    ├─── css
    ├──  images
    └──  index.html
```

### 2.设置视口标签以及引入初始化样式

```html
<meta
  name="viewport"
  content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
/>
<!-- 引入初始化CSS文件 -->
<link rel="stylesheet" href="css/normalize.css" />
<!-- 引入index首页CSS文件 -->
<link rel="stylesheet" href="css/index.css" />
```

### 3.引入 flexible.js

在 index.html 中引入 flexible.js 这个文件

```html
<script src="js/flexible.js"></script>
```

### 4.更改 flexible.js 默认字号

::: tip 提示
使用`flexible.js`之后就不能很方便使用less了，需要使用[VScode：px转rem插件](../suning/flexible.md/#px转rem插件)配合less使用。
:::

- index.css

```css
/* 媒体查询限制最大屏幕超过750px，让字号始终保持在75px */
@media screen and (min-width: 750px) {
  html {
    font-size: 75px !important;
  }
}
```

### 5.添加 body 样式

- index.css

```css
/* body样式 */
body {
  min-width: 320px;
  width: 10rem; /*750px÷75（默认字号）=10*/
  margin: 0 auto;
  line-height: 1.5;
  font-family: Arial, Helvetica, STHeiTi, sans-serif;
  background: #f2f2f2;
}
```
### px转rem插件

- cssrem

- 插件需要重启VScode后生效

<img src="/images/mobile/rem/024.png" style="width: 100%; display:block; margin: 0 ;">
<img src="/images/mobile/rem/025.png" style="width: 100%; display:block; margin: 0 ;">
<img src="/images/mobile/rem/023.png" style="width: 100%; display:block; margin: 0 ;">



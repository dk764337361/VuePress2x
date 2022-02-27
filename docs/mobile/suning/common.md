# 苏宁首页-公共 common.less 文件制作

1. [苏宁首页](m.suning.com)
   <img src="/images/mobile/rem/015.png" style="width: 50%; display:block; margin: 0 ;">

## 技术选型

- 方案：我们采取单独制作移动页面方案
- 技术：布局采取 rem 适配布局（less + rem + 媒体查询）
- 设计图：本设计图采用 750px 设计尺寸

## 搭建相关文件夹结构

```
 suning
    ├─── css
    ├──  images
    └──  index.html
```

## 设置视口标签以及引入初始化样式

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

## 设置公共 common.less 文件

1. 新建 common.less 设置好最常见的屏幕尺寸,利用媒体查询设置不同的 html 字体大小,因为
   除了首页其他页面也需要。
2. 苏宁网站首页的开发尺寸有 320px360px、375px、384px、400px、414px、424px
   480px、540px、720px、750px 等。
3. 划分的份数我们定为 15 等份。 
4. 因为我们pc端也可以打开我们苏宁移动端首页,我们默认 html 字体大小为 50px,注意这句话写到最上面。

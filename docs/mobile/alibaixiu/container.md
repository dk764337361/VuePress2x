# 响应式布局-容器

- 响应式需要一个父级作为布局容器，来配合子级元素来实现变化效果。
- 原理就是在不同屏幕下，通过媒体查询来改变这个布局容器的大小，再改变里面子元素的排列方式和大小，从而实现不同屏幕下，看到不同的页面布局和样式变化。

# 响应式尺寸划分

- 超小屏幕（手机，小于768px）：设置宽度为100%。
- 小屏幕（手机，大于等于768px）：设置宽度为750px。
- 中等屏幕（桌面显示器，大于等于992px）：宽度设置为970px。
- 大屏幕（大桌面显示器，大于等于1200px）：宽度设置为1170px。

- 我们也可以根据实际情况定义，自己定义划分。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }
    /* 通过媒体查询，设置版心容器的宽度 */
    /* 超小屏幕（手机，小于 768px）：设置宽度为 100%
    小屏幕（平板，大于等于 768px）：设置宽度为 750px
    中等屏幕（桌面显示器，大于等于 992px）：宽度设置为 970px
    大屏幕（大桌面显示器，大于等于 1200px）：宽度设置为 1170px
    */
    .container {
      height: 100px;
      margin: 0 auto;
    }

    /* 超小屏幕 */
    @media screen and (max-width: 767px) {
      .container {
        width: 100%;
        background-color: pink;
      }
    }
    /* 小屏幕 */
    @media screen and (min-width: 768px) {
      .container {
        width: 750px;
        background-color: skyblue;
      }
    }
    /* 中等屏幕 */
    @media screen and (min-width: 992px) {
      .container {
        width: 970px;
        background-color: yellowgreen;
      }
    }
    /* 宽屏幕 */
    @media screen and (min-width: 1200px) {
      .container {
        width: 1170px;
        background-color: plum;
      }
    }
  </style>
</head>
<body>
  <div class="container"></div>
</body>
</html>
```
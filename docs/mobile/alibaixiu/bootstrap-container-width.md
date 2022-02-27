# container 宽度修改

因为本效果采取 1280 的宽度，而 Bootstrap 里面 container 宽度最大为 1170px，因此我们需要手动改下 container 宽度。

-index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <!-- 要求当前网页使用IE浏览器最高版本的内核来渲染 -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!-- 视口的设置：视口的宽度和设备一致，默认的缩放比例和PC端一致，用户不能自行缩放 -->
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
      ,
      user-scalable="no"
    />
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" href="css/index.css" />
    <!-- [if it IE9] -->
    <!-- 解决IE9以下浏览器对HTML5新增标签的不识别，并导致CSS不起作用的问题 -->
    <script src="https://cdn.jsdelivr.net/npm/html5shiv@3.7.3/dist/html5shiv.min.js"></script>
    <!-- 解决IE9以下浏览器对css3 Media Query的不识别 -->
    <script src="https://cdn.jsdelivr.net/npm/respond.js@1.4.2/dest/respond.min.js"></script>
    <!-- endif -->
    <title>Document</title>
    <style>
    </style>
  </head>
  <body>
    <div class="container">我是container</div>
  </body>
</html>
```

- index.css

```css
/* 利用媒体查询修改container宽度适合效果图宽度 */
@media screen and (min-width: 1280px) {
  .container {
    width: 1280px;
  }
}
```

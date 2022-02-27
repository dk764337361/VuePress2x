# 几种常见的网页布局

- 两列自适应布局：一列由内容撑开，另一列撑满剩余宽度
- 圣杯布局、双飞翼布局：两边固定宽度，中间自适应
- 等高布局：子元素在父元素中高度相等
- 粘连布局：垂直方向，后面的元素在前面元素足够高时，紧跟在前面元素底部，
  前面元素高度不够时，后面的元素自动加载到页面的底部

## 两列自适应布局
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
    .content {
      width: 1000px;
      height: 500px;
      background-color: lightblue;
    }
    .left {
      float: left;
      background-color: pink;
    }
    .left img {
      width: 400px;
    }
    .right {
      height: 300px;
      /* 触发 BFC，不会与浮动的元素重叠 */
      overflow: hidden;
      background-color: lightyellow;
    }
  </style>
</head>
<body>
  <div class="content">
    <div class="left">
      <p>左侧盒子宽度自适应内容宽度</p>
      <img src="images/smile01.jpg" alt="">
    </div>
    <div class="right">
      <p>右侧盒子占有父级剩余的宽度部分</p>
    </div>
  </div>
</body>
</html>
```

## 圣杯布局、双飞翼布局
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      .container {
        position: relative;
        box-sizing: border-box;
        max-width: 1500px;
        height: 500px;
        /* 用内边距为左右固定的两个子元素留取空位 */
        padding-left: 200px;
        padding-right: 200px;
        margin: 0 auto;
        background-color: lightyellow;
      }
      /* 定位在左侧，padding 区域 */
      .left {
        position: absolute;
        left: 0;
        top: 0;
        width: 190px;
        height: 300px;
        background: skyblue;
      }
      .center {
        width: 100%;
        height: 400px;
        background: yellowgreen;
      }

      /* 定位在右侧，padding 区域 */
      .right {
        position: absolute;
        right: 0;
        top: 0;
        width: 190px;
        height: 400px;
        background: skyblue;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="center">
        <h2>圣杯布局，中间自适应宽度</h2>
      </div>
      <div class="left">左侧固定宽度</div>
      <div class="right">右侧固定宽度</div>
    </div>
  </body>
</html>
```

## 等高布局
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
    .container {
      position: relative;
      box-sizing: border-box;
      max-width: 1500px;
      /* 父级不设置高度，被中间标准流内容撑开 */
      /* 用内边距为左右固定的两个子元素留取空位 */
      padding-left: 200px;
      padding-right: 200px;
      margin: 0 auto;
      background-color: lightyellow;
    }
    /* 定位在左侧，padding 区域 */
    .left {
      position: absolute;
      left: 0;
      top: 0;
      width: 190px;
      /* 高度设置为父级的 100%，与父级共同变化 */
      height: 100%;
      background: skyblue;
    }
    /* 定位在右侧，padding 区域 */
    .center {
      width: 100%;
      height: 300px;
      background: yellowgreen;
    }
    .right {
      position: absolute;
      right: 0;
      top: 0;
      width: 190px;
      height: 100%;
      background: skyblue;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="center">
      <h2>等高布局，中间自适应宽度，自身高度决定父级高度</h2>
    </div>
    <div class="left">左侧固定宽度，高度自动等于中间内容高度</div>
    <div class="right">右侧固定宽度，高度自动等于中间内容高度</div>
  </div>

</body>

</html>
```


## 粘连布局
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
    html,
    body {
      height: 100%;
    }
    .wrapper {
      min-height: 100%;
      padding-bottom: 100px;
      box-sizing: border-box;
      background: lightyellow;
      text-align: center;
      overflow: hidden;
    }
    .wrapper .main {
      background-color: skyblue;
    }
    .wrapper .main p {
      height: 500px;
    }
    .footer {
      height: 100px;
      margin-top: -100px;
      line-height: 50px;
      background: pink;
      text-align: center;
    }    
  </style>
</head>

<body>
  <div class="wrapper">
    <div class="main">
      <p>主体内容 1</p>
      <p>主体内容 2</p>
      <p>主体内容 3</p>
    </div>
  </div>
  <div class="footer">底部</div>
</body>
</html>
```
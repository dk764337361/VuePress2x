<!-- --- -->
<!-- # title: 使用 VuePress 搭建个人博客
sidebar: auto
sidebarDepth: 2 -->
<!-- --- -->
# 流式布局(百分比布局)

- 流式布局,就是百分比布局,也称`非固定像素布局`。
- 通过将盒子的宽度设置成百分比,从而根据屏幕的宽度来进行伸缩,不受固定像素的限制,内容向两侧填充。
- 流式布局方式是移动web开发使用的比较常见的布局方式。

<img src="/images/mobile/mobilebase/010.png" style="width: 100%; display:inline-block; margin: 0 ;">

## 注意事项

制作过程中,需要定义页面的最大和最小支持宽度。
- max -width-最大宽度(max-height最大高度)
- min -width-最小宽度(min-height-最小高度)

<img src="/images/mobile/mobilebase/011.png" style="width: 100%; display:inline-block; margin: 0 ;">

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no,maximum=1.0,minimum=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="css/normalize.css">
  <style>  
    body {
      min-width: 320px;
      max-width: 980px;
    } 
    section {
      width: 100%;
      height: 100px;
      background-color: pink;
    }
    section div {
      float: left;
      width: 50%;
      height: 100px;
      border: 10px solid #ff0;
      box-sizing: border-box;
      background-color: skyblue;
    }
  </style>
</head>
<body>
  <section>
    <div>1</div>
    <div>2</div>
  </section>
</body>
</html>
```


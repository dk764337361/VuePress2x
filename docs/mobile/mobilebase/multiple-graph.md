# 多倍图


## 二倍图
::: warning 注意
- 问题:如果个50 * 50px的图片放到手机屏幕中,占有的物理像素点是100 * 100个,会造成图片模糊。
- 解决方法:使用个本身就是100 * 100px的图片去进行制作,替换原来图片,然后设置图片尺寸为50 * 50px。
:::

- 在标准的 viewport 设置中， 使用倍图来提高图片质量， 解决在高清设备中的模糊间题
- 通常使用二倍图，因为 iPhone 6\7\8 的影响，但是现在还存在 3 倍图 4 倍图的清况， 这个看实际开发公司需求。
- 背景图片注意缩放问题

```html{15-18,23-27}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" 
  content="width=device-width, initial-scale=1.0, user-scalable=no,maximum=1.0,minimum=1.0">
  <title>Document</title>
  <!-- 问题：如果一个 50 * 50 px的图片放到手机屏幕中，占有的物理像素点是 100 * 100 个，会造成图片模糊
  解决方法： 使用一个本身就是 100 * 100 px 的图片去进行制作，替换原来图片，然后设置图片尺寸为 50 * 50 px-->
  <style>
    *{
      margin: 0;
      padding: 0;
    }
    img:nth-child(2) {
        /* 在iphoto8下面 */
        /* 原始图片 100 * 100 px */
      width: 50px;
      height: 50px;
    }
    .box {
      width: 50px;
      height: 50px;
      border: 1px solid #000;
      /* 背景图也需要使用高倍图进行添加 */
        /* 原始图片 100 * 100 px */
      background: url(images/apple100.jpg) no-repeat;
      background-size: 50px 50px;
    }
  </style>
</head>
<body>
  <img src="images/apple50.jpg" alt="">
  <img src="images/apple100.jpg" alt="">
  <div class="box"></div>
</body>
</html>
```

<img src="/images/mobile/mobilebase/006.png" style="width: 100%; display:inline-block; margin: 0 ;">

## 多倍图切图

- @3X 3倍图
- @2X 2倍图
- @1X 1倍图原图

<img src="/images/mobile/mobilebase/007.png" style="width: 50%; display:inline-block; margin: 0 ;">

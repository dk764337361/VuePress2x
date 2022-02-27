# 媒体查询+rem实现元素动态大小变化

- rem单位是跟着`<html>`来走的,有了rem页面元素可以设置不同大小尺寸
- 媒体查询可以根据不同设备宽度来修改样式
- 媒体查询+rem就可以实现不同设备`宽度`和`高度`,实现页面元素大小的动态变化

## 案例
<img src="/images/mobile/rem/003.png" style="width: 100%; display:block; margin: 0 ;">

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
    /* rem 单位 */
    /* 这是默认的 html 的字号 */
    html {
      font-size: 20px;
    }
    /* 屏幕小于640px，让 html 的字号为 20px */
    /* @media screen and (max-width: 639px) {
      html {
        font-size: 20px;
      }
    } */
    /* 屏幕大于等于640px，让 html 的字号为 30px */
    @media screen and (min-width: 640px) {
      html {
        font-size: 30px;
      }
    }
    .box {
      width: 100%;
      height: 3rem;
      background-color: green;
      font-size: 1.5rem;
      line-height: 3rem;
      color: #fff;
      text-align: center;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="box">购物车</div>
</body>
</html>
```

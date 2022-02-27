# rem 实际开发适配方案 1

rem + 媒体查询 + less 技术

## 设计稿常见尺寸宽度

<img src="/images/mobile/rem/014.png" style="width: 100%; display:block; margin: 0 ;">

一般情况下，我们以一套或两套效果图应用大部分的屏幕，放弃极端屏幕或对齐优雅降级，降低一些效果。

::: tip 提示
现在基本以 750 为准。
:::

## 动态设置 htm 标签 font-size 大小

1. 假设设计稿是 750px
2. 假设我们把整个屏幕划分为 15 等份(划分标准不一可以是 20 份也可以是 10 等份)
3. 每一份作为 html 字体大小,这里就是 50px
4. 那么在 320px 设备的时候,字体大小为 320/15 就是 21.33px
5. 用我们页面元素的大小除以不同的 html 字体大小会发现他们比例还是相同的。

- 比如我们以 750 为标准设计稿:
1. 一个 100 * 100 像素的页面元素在 750 屏幕下,就是 100/50 转换为 rem 是 2rem * 2rem 比例是 1比1
2. 320 屏幕下,html字体大小为21.33，则2rem=42.66px 此时宽和高都是42.66 但是宽和高的比例还是1比1
3. 但是已经能实现不同屏幕下页面元素盒子等比例缩放的效果。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    /* 媒体查询设置不同屏幕下的 html 的字号 */
    /* 设计图参考 750px */
    /* 将屏幕宽度划分为 15 份 */
    /* 字号 = 屏幕宽度 / 15 */
    @media screen and (min-width: 320px) {
      html {
        font-size: 21.33px;
      }
    }
    @media screen and (min-width: 750px) {
      html {
        font-size: 50px;
      }
    }
    /* 设置页面中元素大小时，参考 750px 屏幕的字号 */
    /* 宽高为 100 * 100 px 的盒子 */
    .box {
      width: 2rem;
      height: 2rem;
      background-color: pink;
    }
  </style>
</head>
<body>
  <div class="box"></div>
</body>
</html>
```

## 元素大小取值方法
1. 最后的公式:页面元素的rem值=页面元素值(px)/(屏幕宽度/划分的份数)
2. 屏幕宽度划分的份数就是 html font-size的大小
3. 或者:页面元素的rem值=页面元素值(px)/ html font-size字体大小

# 媒体查询案例-背景变色

① 按照从大到小的或者从小到大的思路.

② 注意我们有最大值 `max-width` 和最小值 `min-width` 都是包含等于的。

③ 当屏幕小于 540 像素,背景颜色变为蓝色`(x<=539)`。

④ 当屏幕大于等于 540 像素并且小于等于 969 像素的时候背景颜色为绿色`(540=<X<=969)`。

⑤ 当屏幕大于等于 970 像素的时候,背景颜色为红色`(x>=970)`

::: warning 注意
为了防止混乱，对`媒体查询`我们要按照从小到大或者从大到小的顺序来写。

但是我们`最喜欢`的还是从小到大来写，这样代码更简洁。
:::

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /* 1.屏幕小于等于539px 时，背景为蓝色 */
      @media screen and (max-width: 539px) {
        body {
          background-color: blue;
        }
      }
      /* 2.屏幕大于等于540px 并且 小于等于 969px 时，背景为绿色 */
      /* @media screen and (min-width: 540px) and (max-width: 969px) {
      body {
        background-color: green;
      }
    } */
      @media screen and (min-width: 540px) {
        body {
          background-color: green;
        }
      }
      /* 3.屏幕大于等于 970px 时，背景为红色 */
      @media screen and (min-width: 970px) {
        body {
          background-color: red;
        }
      }
    </style>
  </head>
  <body></body>
</html>
```

## 媒体查询从小到大优势代码分析

<img src="/images/mobile/rem/002.png" style="width: 100%; display:block; margin: 0 ;">

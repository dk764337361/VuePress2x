# 响应式导航案例

## 案例需求分析

1. 当我们屏幕大于等于 800 像素，我们给 nav 宽度为 800px, 因为里面子盒子需要浮动， 所以 nav 需要清除浮动。
2. nav 里面包含 8 个小 li 盒子， 每个盒子的宽度定为 100px, 高度为 30px, 浮动一行显示。
3. 当我们屏幕缩放，宽度小于 800 像素的时候， nav 盒子宽度修改为 100％宽度。
4. nav 里面的 8 个小 li，宽度修改为 33.33%，这样一行就之恶能显示 3 个小 li，剩余下行显示。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      .nav {
        width: 800px;
        margin: 0 auto;
        background-color: green;
        overflow: hidden;
        list-style: none;
      }
      .nav li {
        float: left;
        width: 100px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        color: #fff;
      }
      /* 小屏幕中要更改nav容器的宽度，以及子元素的排列方式 */
      @media screen and (max-width: 799px) {
        .nav {
          width: 100%;
        }
        .nav li {
          width: 33.33%;
        }
      }
    </style>
  </head>
  <body>
    <ul class="nav">
      <li>首页</li>
      <li>首页</li>
      <li>首页</li>
      <li>首页</li>
      <li>首页</li>
      <li>首页</li>
      <li>首页</li>
      <li>首页</li>
    </ul>
  </body>
</html>
```

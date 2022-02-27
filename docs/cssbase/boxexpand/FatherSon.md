# 父子盒模型

父盒型内部的一行可以放多个子盒型，但子盒型们的总宽度不能超过父盒型，否则会出现溢出。
<img src="/images/css/028.png" style="width: 100%; display: block; margin: 0 ;">
::: tip 提示
解决方法：计算或量取时一定要精确
:::
<img src="/images/css/027.png" style="width: 100%; display: block; margin: 0 ;">

## 盒模型宽度自动内减

假设 父盒型只有一个子盒型，且子盒型是类似`<div><p>`独占一行标签时，子盒型不设`width`时，会自动继承父盒型的`width`
<img src="/images/css/029.png" style="width: 100%; display: block; margin: 0 ;">

::: details 点击查看代码
```html
    <style>
      *{
        margin: 0;
        padding: 0;
      }
      .box {
        width: 1000px;
        height: 100px;
        border: 5px solid rgb(248, 105, 10);
      }
      .boxx {
        float: left;
        width: 200px;
        height: 100px;
        margin-right: 40px;
        border: 1px solid rgb(248, 105, 10);
      }

      .boxx p{            /* 盒模型宽度自动内减 */
        background-color: pink;
        height: 100px;
        text-align: center;
        line-height: 40px;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="boxx">
        <p>1</p>
      </div>
      <div class="boxx">
        <p>2</p>
      </div>
      <div class="boxx">
        <p>3</p>
      </div>
      <div class="boxx">
        <p>4</p>
      </div>
    </div>
  </body>
```
:::

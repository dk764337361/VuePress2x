# 浮动的问题

标准流中的元素，不设置高度的情况下，都能被内部的标准流元素自动撑高。

- 如果内部的子元素进行了浮动，浮动的子元素是撑不高标准流父亲的。

<!-- ![](/images/css/052.png)
![](/images/css/053.png) -->
<img src="/images/css/052.png" style="width: 300px; display: inline-block; margin: 0 ;">
<img src="/images/css/053.png" style="width: 400px; display: inline-block; margin: 0 ;">

- 另外，父元素没有高度，会影响后面元素的标准流位置，如果浮动的子元素足够高时，有可能影响到后面浮动元素的贴边:
<img src="/images/css/054.png" style="width: 100%; display: inline-block; margin: 0 ;">
```html
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      .box {
        width: 1000px;
        border: 10px solid black;
      }
      .box p {
        float: left;
        margin-right: 10px;
        width: 100px;
        height: 100px;
        background-color: skyblue;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <p></p>
      <p></p>
      <p></p>
      <p></p>
    </div>
    <div class="box">
      <p></p>
      <p></p>
      <p></p>
      <p></p>
    </div>
```

以上的问题需要被解决，解决方法是清除浮动带来的影响。


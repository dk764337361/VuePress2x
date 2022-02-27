# 静态轮播图布局
<img src="/images/css/112.png" style="width: 100%; display: block; margin: 0 ;">

```html
    <style>
      /* 清楚默认样式 */
      * {
        margin: 0;
        padding: 0;
      }
      ul,ol {
        list-style: none;
      }
      .lunbo {
        position: relative;
        margin: 100px auto;
        width: 1280px;
        height: 800px;
      }
      .lunbo .pic li {
        position: absolute;
        left: 0;
        top: 0;
        width: 1280px;
        height: 800px;
        display: none;
      }
      .lunbo .pic .current {
        display: block;
      }
      /* 按钮 */
      .lunbo .but a {
        position: absolute;
        top: 50%;
        width: 80px;
        height: 80px;
        margin-top: -50px;
        background-color: rgba(226, 225, 225, 0.3);
        font: 40px/80px "宋体";
        text-align: center;
        text-decoration: none;
        color: #fff;
        font-weight: bold;
      }
      .lunbo .but .butright {
        right: 20px;
      }
      .lunbo .but .butleft {
        left: 20px;
      }
      .lunbo .but a:hover {
        background-color: rgba(226, 225, 225, 0.6);
      }
      /* 下标 */
      .lunbo .sub {
        position: absolute;
        left: 100px;
        bottom: 50px;
        width: 240px;
      }
      .lunbo .sub li{
        float: left;
        width: 20px;
        height: 20px;
        margin-right: 20px;
        background-color: rgba(226, 225, 225, 0.3);
        font: 12px/20px "微软雅黑";
        text-align: center;
        color: #666;
        /* cursor光标变小手 */
        cursor: pointer;
      }
      .lunbo .sub .current{
        background-color: #fff;
      }
      
    </style>
  </head>
  <body>
    <!-- 轮播图大结构 -->
    <div class="lunbo">
      <!-- 图片部分 -->
      <ul class="pic">
        <li class="current"><img src=".\images\lunbo\1.jpeg" alt="" /></li>
        <li><img src=".\images\lunbo\2.jpeg" alt="" /></li>
        <li><img src=".\images\lunbo\3.jpeg" alt="" /></li>
        <li><img src=".\images\lunbo\4.jpeg" alt="" /></li>
        <li><img src=".\images\lunbo\5.jpeg" alt="" /></li>
        <li><img src=".\images\lunbo\6.jpeg" alt="" /></li>
      </ul>
      <!-- 按钮 -->
      <div class="but">
        <a class="butleft" href="javascript:;">&lt;</a>
        <a class="butright" href="javascript:;">&gt;</a>
      </div>
      <!-- 小圆点 -->
      <ol class="sub">
        <li class="current">1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
      </ol>
    </div>
  </body>
```

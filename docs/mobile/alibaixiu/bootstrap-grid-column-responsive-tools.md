# Bootstrap 响应式工具

为了加快对移动设备友好的页面开发工作，利用媒体查询功能，并使用这些工具类可以方便的针对不同设备展示或隐藏页面的内容。
<img src="/images/mobile/bootstrap/014.png" style="width: 100%; display:inline-block; margin: 0 ;">

与之相反的，`visible-xs`、`visible-sm`、`visible-md`、`visible-lg`是针对不同设备`显示`某个内容。

- Bootstrap 其他（按钮、表单、表格）请参考 Bootstrap 文档。

````html
<div class="container">
  <div class="row">
    <!-- 在小屏幕中进行隐藏 -->
    <div class="col-lg-4 hidden-sm">1</div>
    <div class="col-lg-8">2</div>
    <!-- 在大屏幕进行显示，其他屏幕隐藏 -->
    <div class="col-lg-8 visible-lg">3</div>
  </div>
</div>
```
````

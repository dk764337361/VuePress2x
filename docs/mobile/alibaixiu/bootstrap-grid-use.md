# Bootstrap 栅格系统使用方法

栅格系统用于一系列的行（row）与列（column）的组合来创建页面布局，你的内容就可以放入这些创建好的布局中。
<img src="/images/mobile/bootstrap/006.png" style="width: 100%; display:inline-block; margin: 0 ;">

- 按照不同屏幕划分 1-12 等份
- 行（row）可以去除父容器作用 15px 的边距。
- xs-extra small：超小；sm-small：大；md-medium：中等；lg-large：大；
- 列（column）大于 12，多余的“列（column）”所在的元素将被作为一个整体另起一行排列。
- 每一列默认有左右 15 像素的 padding
- 可以同时为一列指定多个设备的类名，以便划分不同份数，例如`class="col-md-4 col-sm-6"`。

```html
<div class="container">
  <div class="row">
    <!-- 内部添加4列元素 -->
    <div class="col-lg-3 col-md-6">1</div>
    <div class="col-lg-3 col-md-6">2</div>
    <div class="col-lg-3 col-md-6">3</div>
    <div class="col-lg-3 col-md-6">4</div>
  </div>
  <div class="row">
    <!-- 内部添加4列元素 -->
    <div class="col-lg-6">1</div>
    <div class="col-lg-2">2</div>
    <div class="col-lg-2">3</div>
    <div class="col-lg-2">4</div>
  </div>
  <div class="row">
    <!-- 内部的列的子元素占有的栅格份数总和小于12份，会留一些空白 -->
    <div class="col-lg-6">1</div>
    <div class="col-lg-2">2</div>
    <div class="col-lg-2">3</div>
    <div class="col-lg-1">4</div>
  </div>
  <div class="row">
    <!-- 内部的列的子元素占有的栅格份数总和大于12份，多出的部分会换行显示 -->
    <div class="col-lg-6">1</div>
    <div class="col-lg-2">2</div>
    <div class="col-lg-3">3</div>
    <div class="col-lg-4">4</div>
  </div>
</div>
```

<img src="/images/mobile/bootstrap/008.png" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/mobile/bootstrap/007.png" style="width: 100%; display:inline-block; margin: 0 ;">

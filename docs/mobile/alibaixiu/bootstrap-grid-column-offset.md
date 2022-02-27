# Bootstrap 栅格系统-列偏移

使用`.col-md-offset-*`类可以将列向右侧偏移。这些类实际是通过使用`*`选择器为当前元素增加了左侧的边距（margin）。

<img src="/images/mobile/bootstrap/010.png" style="width: 100%; display:inline-block; margin: 0 ;">

```html
<div class="container">
  <div class="row">
    <!-- 嵌套一个新的栅格系统 -->
    <div class="col-lg-4">左侧</div>
    <div class="col-lg-4 col-lg-offset-4">右侧</div>
    <div class="col-lg-8 col-lg-offset-2">居中</div>
  </div>
</div>
```
## 设置居中
::: tip 提示

```html
<!-- 利用偏移，设置居中 -->
    <div class="col-lg-8 col-lg-offset-2">居中</div>
```

:::
<img src="/images/mobile/bootstrap/011.png" style="width: 100%; display:inline-block; margin: 0 ;">


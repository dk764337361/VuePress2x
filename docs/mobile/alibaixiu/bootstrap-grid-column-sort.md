# Bootstrap 栅格系统-列偏移

通过使用`.col-md-push-*`往右推和`.col-md-pull-*`往左拉，两个类就可以很容易的改变列（column）的顺序。
<img src="/images/mobile/bootstrap/012.png" style="width: 100%; display:inline-block; margin: 0 ;">

```html
<div class="container">
  <div class="row">
    <!-- 左侧的元素往后推8份位置 -->
    <div class="col-lg-4 col-lg-push-8">左侧</div>
    <!-- 右侧的元素往前拉4份位置 -->
    <div class="col-lg-8 col-lg-pull-4">右侧</div>
    <!-- 利用推拉，设置居中 -->
    <div class="col-lg-8 col-lg-push-2">3</div>
  </div>
</div>
```
## 设置居中
::: tip 提示

```html
<!-- 利用推拉，设置居中 -->
<div class="col-lg-8 col-lg-push-2">3</div>
```

:::
<img src="/images/mobile/bootstrap/013.png" style="width: 100%; display:inline-block; margin: 0 ;">

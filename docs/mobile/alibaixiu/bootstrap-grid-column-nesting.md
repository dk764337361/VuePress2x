# Bootstrap栅格系统-列嵌套

栅格系统内置的栅格系统将内容再次嵌套。简单理解就是一个列内再分为若干份小列。
我们可以通过添加一个新的`.row`元素和一系列`.col-sm-*`元素到已经存在的`.col-sm-*`元素内。
<img src="/images/mobile/bootstrap/009.png" style="width: 100%; display:inline-block; margin: 0 ;">

```html
<div class="container">
  <div class="row">
    <!-- 嵌套一个新的栅格系统 -->
    <div class="col-lg-4 row">
      <p class="col-lg-6">1</p>
      <p class="col-lg-6">2</p>
    </div>
    <div class="col-lg-4">3</div>
    <div class="col-lg-4">4</div>
  </div>
</div>
```

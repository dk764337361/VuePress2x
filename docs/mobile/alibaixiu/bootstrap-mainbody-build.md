# 阿里百秀-主体搭建

<img src="/images/mobile/bootstrap/018.png" style="width: 100%; display:inline-block; margin: 0; border:1px solid rgba(0,0,0,0.7);">


- index.html

```html
<div class="container">
  <!-- 添加row自动清除父级container的内边距 -->
  <div class="row">
    <header class="col-md-2">头部</header>
    <main class="col-md-7">主要内容</main>
    <aside class="col-md-3">侧边栏</aside>
  </div>
</div>
```

- index.css

```css
/* 初始样式 */
body {
  background-color: #f5f5f5;
}
/* 容器样式 */
.container {
  background-color: #fff;
}
```

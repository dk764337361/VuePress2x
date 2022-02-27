# 阿里百秀-logo 区域

<img src="/images/mobile/bootstrap/023.png" style="width: 30%; display:inline-block; margin: 0; border:1px solid rgba(0,0,0,0.7);">

-index.html

```html
<div class="container">
  <!-- 添加row自动清除父级container的内边距 -->
  <div class="row">
    <header class="col-md-2">
      <!-- Logo区域 -->
      <h1 class="logo">
        <a href="index.html">
          <!-- 响应式图片class="img-responsive"：https://v3.bootcss.com/css/#helper-classes -->
          <img src="images/logo.png" />
          <span>阿里百秀</span>
        </a>
      </h1>
      <!-- Logo区域结束 -->
    </header>
    <main class="col-md-7">主要内容</main>
    <aside class="col-md-3">侧边栏</aside>
  </div>
</div>
```

-index.css

```css
/* header 区域 */
/* 清除默认边距 */
header {
  /*标签选择器的权重小于类选择器（col-md-2），需要!important提高权重*/
  padding-left: 0 !important;
}
header .logo {
  margin: 0; /*清除h标签默认边距*/
  background-color: #6c94d5;
}
header .logo a {
  display: block;
}
```

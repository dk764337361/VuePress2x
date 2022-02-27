# 阿里百秀-aside 侧边栏区域
<img src="/images/mobile/bootstrap/025.png" style="width: 50%; display:inline-block; margin: 0 ;">


- index.html

```html
<!-- 侧边栏 区域 开始 -->
<aside class="col-md-3">
  <a href="#" class="banner">
    <img src="images/zgboke.jpg" alt="" class="img-responsive" />
  </a>
  <a href="#" class="hot">
    <button class="btn btn-primary">热搜</button>
    <h4 class="text-primary">欢迎加入中国博客联盟</h4>
    <p class="text-muted">
      这里收录国内各个领域的优秀博客，是一个全人工编辑的开放式博客联盟交流和展示平台......
    </p>
  </a>
</aside>
<!-- 侧边栏 区域 结束 -->
```

- index.css

```css
/* 侧边栏  区域开始*/
aside .banner {
  display: block;
  width: 100%;
  margin-bottom: 20px;
}
aside .hot {
  display: block;
  padding: 0 20px 20px;
  border: 1px solid #ccc;
}
aside .hot button {
  border-radius: 0;
  margin-bottom: 10px;
}
aside .hot:hover {
  text-decoration: none;
}
aside .hot p {
  font-size: 12px;
}
/* 侧边栏  区域结束*/
```

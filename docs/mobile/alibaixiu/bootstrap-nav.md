# 阿里百秀-nav 导航区域

<img src="/images/mobile/bootstrap/020.png" style="width: 30%; display:inline-block; margin: 0; border:1px solid rgba(0,0,0,0.7);">

- index.html

```html
<!-- 侧边栏 区域 开始 -->
<nav>
  <!-- a标签里的Glyphicons字体图标: https://v3.bootcss.com/components/ -->
  <a href="#" class="glyphicon glyphicon-camera">生活馆</a>
  <a href="#" class="glyphicon glyphicon-picture">自然汇</a>
  <a href="#" class="glyphicon glyphicon-phone">科技潮</a>
  <a href="#" class="glyphicon glyphicon-gift">奇趣事</a>
  <a href="#" class="glyphicon glyphicon-glass">美食节</a>
</nav>
<!-- 侧边栏 区域 结束 -->
```

- index.css

```css
/* 侧边栏 区域 开始 */
header nav {
  background-color: #eee;
  border-bottom: 1px solid #ccc;
}
header nav a {
  display: block !important;
  height: 50px;
  padding-left: 30px;
  color: #666;
  font-size: 16px;
  line-height: 50px !important;
}
header nav a::before {
  margin-right: 5px;
  vertical-align: middle;
}

header nav a:hover {
  background-color: #fff;
  color: #333;
  text-decoration: none;
}
/* 侧边栏 logo区域 结束 */
```

# 阿里百秀-main 区域响应式制作
<img src="/images/mobile/bootstrap/026.png" style="width: 50%; display:inline-block; margin: 0; border:1px solid rgba(0,0,0,0.7);">

- index.html

- 添加了`hidden-xs` 和`img-responsive`

```html
<div class="row publish-box">
  <div class="col-sm-9">
    <h3>生活馆 关于指甲的10个健康知识 你知道几个？</h3>
    <p class="text-muted hidden-xs">alibaixiu 发布于 2015-11-23</p>
    <p class="hidden-xs">
      指甲是经常容易被人们忽略的身体部位，
      事实上从指甲的健康状况可以看出一个人的身体健康状况，
      快来看看10个暗藏在指甲里知识吧！
    </p>
    <p class="text-muted">
      阅读(2417)评论(1)赞 (18)
      <span class="hidden-xs"
        >标签：健康 / 感染 / 指甲 / 疾病 / 皮肤 / 营养 / 趣味生活</span
      >
    </p>
  </div>
  <div class="col-sm-3 hidden-xs">
    <img src="images/3.jpg" class="img-responsive" />
  </div>
</div>
```

- index.css

```css
/* 超小屏幕 */
@media screen and (max-width: 767px) {
  header nav a {
    font-size: 14px;
  }
  main .news li {
    width: 50%; /*在不同尺寸下，li的width为父级*/
  }
  main .news li:nth-child(1) {
    width: 100%; /*在不同尺寸下，li的width为父级*/
  }
  main .publish .publish-box h3 {
    font-size: 16px;
  }
}
```

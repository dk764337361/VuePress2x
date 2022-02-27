# 阿里百秀-publish 区域

<img src="/images/mobile/bootstrap/024.png" style="width: 100%; display:inline-block; margin: 0 ;">

- index.html

```html
<div class="publish">
  <div class="row publish-box">
    <!-- 从小盒子开始写 -->
    <div class="col-sm-9">
      <!--h标签排版： https://v3.bootcss.com/css/#type/排版 -->
      <h3>生活馆 关于指甲的10个健康知识 你知道几个？</h3>
      <!--p标签： https://v3.bootcss.com/css/#type/页面主体 -->
      <!--p标签颜色 class="text-muted"： https://v3.bootcss.com/css/#type/情境文本颜色 -->
      <p class="text-muted">alibaixiu 发布于 2015-11-23</p>
      <p>
        指甲是经常容易被人们忽略的身体部位，
        事实上从指甲的健康状况可以看出一个人的身体健康状况，
        快来看看10个暗藏在指甲里知识吧！
      </p>
      <p class="text-muted">
        阅读(2417)评论(1)赞 (18) 标签：健康 / 感染 / 指甲 / 疾病 / 皮肤 / 营养 /
        趣味生活
      </p>
    </div>
    <div class="col-sm-3">
      <!-- 响应式图片class="img-responsive"：https://v3.bootcss.com/css/#helper-classes -->
      <img src="images/3.jpg" class="img-responsive" alt="" />
    </div>
  </div>
</div>
```

- index.css

```css
/* publish 部分 */
main .publish .publish-box {
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}
main .publish .publish-box img {
  padding-top: 10px;
}
/* publish 部分结束 */
```

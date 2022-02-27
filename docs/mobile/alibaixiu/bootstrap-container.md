# Bootstrap 布局容器

Bootstrap 需要为页面内容和栅格系统包裹一个`.container`容器，它提供了两个作此用处的类。

1. container 类

- 响应式布局的容器 固定宽度
- 大屏（>=1200px）宽度定位 1170px
- 中屏（>=992px）宽度定位 970px
- 小屏（>=768px）宽度定位 750px
- 超小屏（100%）

2. container-fluid 类

- 流式布局容器 百分比宽度
- 占据全部视口（viewport）的容器。
- 适合于制作移动端页面开发

```html
<div class="container">我是container</div>
<div class="container-fluid">我是container-fluid</div>
```

<img src="/images/mobile/bootstrap/004.png" style="width: 100%; display:inline-block; margin: 0 ;">

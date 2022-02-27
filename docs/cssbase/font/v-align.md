# vertical-align 垂直对齐（行内元素）

属性：设置元素的垂直对齐方式。

该属性定义`行内元素`的基线相对于该元素所在行的基线的垂直对齐。允许指定负长度值和百分比值。这会使元素降低而不是升高。在表单元格中，这个属性会设置单元格框中的单元格内容的对齐方式。

| 值          | 描述                                                          |
| ----------- | ------------------------------------------------------------- |
| baseline    | 默认。元素放置在父元素的基线上。                              |
| sub         | 垂直对齐文本的下标。                                          |
| super       | 垂直对齐文本的上标                                            |
| top         | 把元素的顶端与行中最高元素的顶端对齐                          |
| text-top    | 把元素的顶端与父元素字体的顶端对齐                            |
| middle      | 把此元素放置在父元素的中部。                                  |
| bottom      | 把元素的顶端与行中最低的元素的顶端对齐。                      |
| text-bottom | 把元素的底端与父元素字体的底端对齐。                          |
| length      |                                                               |
| %           | 使用 "line-height" 属性的百分比值来排列此元素。允许使用负值。 |
| inherit     | 规定应该从父元素继承 vertical-align 属性的值。                |

<img src="/images/css/vertical-align.png" style="width: 50%; display: block; margin: 0 ;">

```html{15,23,26}
<div class="login-method">
  <a href="#" class="login-method-btn">
    <!-- i和span并排写在一起，避免空白折叠现象 -->
    <i></i><span>下载拉钩APP</span>
  </a>
</div>
<style>
  .footer .login-method .login-method-btn {
    display: block;
    width: 180px;
    height: 40px;
    border: 1px solid #00b38a;
    color: #00b38a;
    line-height: 40px;
    text-align: center;
  }
  .footer .login-method .login-method-btn i {
    display: inline-block;
    width: 12px;
    height: 15px;
    margin-right: 7px;
    background: url(../images/sprite_02.png) no-repeat -150px -220px;
    vertical-align: middle;
  }
  .footer .login-method .login-method-btn span {
    vertical-align: middle;
  }
</style>
```

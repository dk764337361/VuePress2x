# 盒模型类型 
## box-sizing 

- CSS3中可以通过`box-sizing`来指定`盒模型类型`,这样就可以设置如何计算一个元素的总宽度和高度。

<!-- | 属性值   | 简介                                                                                                                                                           |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| content-box | 默认值，标准盒子模型，盒模型是外扩的。<br/>width与height只包括内容的宽和高。<br/><p style="color: red;">在width和height之外绘制元素的内边距和边框。</p> |
| border-box  | 怪异模式，盒模型是内减的。<br/>width与height属性包括内容，内边距和边框，但不包括外边距。<br/> <p style="color: red;">为元素指定的任何内边距和边框都将在已设定的width和height内进行绘制。</p>| -->

### content-box
<img src="/images/CSS3/037.png" style="width: 70%; display: block; margin: 0 ;">

- Standard 模式：标准模式中，盒子总体大小为 `width(height)`+`padding`+`border`（不包括margin），内容区域是`width`和`height`部分。

<img src="/images/CSS3/002.png" style="width: 100%; display: block; margin: 0 ;">

### border-box
<img src="/images/CSS3/036.png" style="width: 70%; display: block; margin: 0 ;">

- Quirks模式：怪异模式中，盒子总体大小为width和height，添加了`padding`和`border`后，内容区域会收缩。

::: tip
如果`width`和`height`是固定的，内部内容是可以随意变换，那用`border-box`比较好。

border-box在移动端应用较广。
:::
<img src="/images/CSS3/003.png" style="width: 100%; display: block; margin: 0 ;">

## 浏览器兼容

IE8开始支持CSS3属性box-sizing ,让我们可以自由选择采用哪种盒模型属性值：

content-box：默认值，采用Standard box model

border-box：采用IE box model

inherit：继承父元素属性值
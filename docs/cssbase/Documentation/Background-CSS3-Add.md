# Background-CSS3新增属性

[背景半透明](../css/readme.md#背景半透明)

[background-size](../css/readme.md#background-size)

[多个背景](../css/readme.md#多个背景)


## 背景半透明

背景半透明(html5 新增背景属性)

​CSS3支持背景半透明的写法语法格式是:
```css
background: rgba(0,0,0,0.3);
```
​ 最后一个参数是alpha 透明度，取值范围 0~1之间

​ 注意： 背景半透明是指盒子背景半透明， 盒子里面的内容不受影响。

​ 同样， 可以给文字和边框透明，都是 rgba 的格式来写。
```css
color: rgba(0,0,0,0.3);
border: 1px solid rgba(0,0,0,0.3);
```




## background-size

​ 通过background-size设置背景图片的尺寸，就像我们设置img的尺寸一样，在移动Web开发中做屏幕适配应用非常广泛。

​ 其参数设置如下：

​ a) 可以设置长度单位(px)或百分比（设置百分比时，参照盒子的宽高）

​ b) 设置为cover时，会自动调整缩放比例，把背景图像扩展至足够大，以使背景图像完全覆盖背景区域。如有溢出部分则会被隐藏。

​ c) 设置为contain会自动调整缩放比例，把图像图像扩展至最大尺寸，保证图片始终完整显示在背景区域。

```css
background-image: url('images/gyt.jpg');
			background-size: 300px 100px;
			/* background-size: contain; */
			/* background-size: cover; */
```

## 多个背景
​ CSS3中规定，一个盒子上，可以添加多个背景图片。

​ background-image的属性值书写时，以逗号分隔多背景的URL路径地址。

```css
background-image:url(/i/bg_flower.gif),url(/i/bg_flower_2.gif);
/*
bg_flower.gif为蓝色图片
bg_flower_2.gif为灰色图片
*/
```
<img src="/images/css/079.png" style="width: 100%; display: block; margin: 0 ;">

::: tip
注意：背景加载时，先写的背景压盖后写的背景图片。
:::


# Background的应用
背景属性在实际应用中有很多使用场景，我们需要了解几个比较常见的场景。

[应用一替换插入图](../css/readme.md#应用一替换插入图)

[应用二padding区域背景图](../css/readme.md#应用二padding区域背景图)

[应用三精灵图技术](../css/readme.md#应用三精灵图技术)


## 替换插入图
`<h1>` 标签是权重最高的标签，一般会在内部书写最重要的内容，比如 logo 图片。

另外 `<h1>` 内部的文字，可以帮助提高 SEO 搜索排名。

如果使用插入图，就不能书写搜索关键字。
```html
<h1> 
    <a href="#"><img src="images/logo.png" alt="" /></a>
</h1>
```
如果想解决 SEO 问题，可以将 HTML 结构中，插入图换成搜索关键字，然后使用 css 添加背景图给 `<a>` 标签或 `<h1>` 标签。
```html
<h1> 
    <a href="#">淘宝网|购物|六一</a> 
</h1>
<style>
	.header h1 a {
		display: block; 
        width: 146px; 
        height: 58px; 
        background: url(images/logo.png) no‐repeat; 
    }
</style>
```

下一步将文字进行隐藏设置：
- 方法一：将字号设置为 0。IE8 及以上或高版本浏览器可以隐藏文字，但是 IE7 及以下有兼容问题。

```css
font‐size: 0;
```

- 方法二：可以设置给 `<a>` 标签一个 text-­indent 属性，属性值为负的很大的值，文字会走到盒子外部，直接再设置溢出隐藏属性，将溢出文字隐藏。

```css
text‐indent: ‐100em; 
overflow: hidden;
```

<!-- <img src="/images/css/taobaologo.png" style="width: 40%; display: inline-block; margin: 0 ;"> -->

## padding区域背景图
在一个盒子中有背景图部分，而且有文字内容，文字会让开背景图区域进行加载，背景区域应该使用 padding 挤出位置。

四个方向的 padding 都可能用于添加背景图。

padding-­left 区域背景：

<img src="/images/css/076.png" style="width: 40%; display: inline-block; margin: 0 ;">

```html
    <style>
      .lists {
        /* font:大小/行高、字体 */
        font: 16px/40px "微软雅黑"; 
        border: 1px solid black;
        padding-left: 5px;
        width: 300px;
        display: block;
        margin: 10px;
      }
      .lists li {
        list-style: none;
        padding-left: 30px;
        background: url(images/start.png) no-repeat left center;
        background-size: 20px 20px;
      }

      .lists a {
        text-decoration: none;
        color: black;
      }
    </style>
    <ul class="lists">
      <li><a href="">新闻列表新闻列表新闻列表新闻列表</a></li>
      <li><a href="">新闻列表新闻列表新闻列表新闻列表</a></li>
      <li><a href="">新闻列表新闻列表新闻列表新闻列表</a></li>
      <li><a href="">新闻列表新闻列表新闻列表新闻列表</a></li>
      <li><a href="">新闻列表新闻列表新闻列表新闻列表</a></li>
    </ul>
```

## 精灵图技术
当用户访问一个网站时，需要向服务器发送请求，网页上的每张图像都要经过一次请求才能展现给用户。

然而，一个网页中往往会应用很多小的背景图像作为修饰，当网页中的图像过多时，服务器就会频繁地接受和发送请求，这将大大降低页面的加载速度。为了有效地减少服务器接受和发送请求的次数，提高页面的加载速度，出现了 CSS 精灵技术（也称 CSS Sprites、CSS 雪碧）。

CSS 精灵是一种处理网页背景图像的方式。它将一个页面涉及到的所有零星背景图像都集中到一张大图中去，然后将大图应用于网页，这样，当用户访问该页面时，只需向服务发送一次请求，网页中的背景图像即可全部展示出来。通常情况下，这个由很多小的背景图像合成的大图被称为精灵图。

技术依据：

①将网页中需要用到的小尺寸背景图制作成一张背景透明的 png 图片。

②利用背景定位技术，将精灵图的每个小图片加载到对应的标签上。

制作精灵图的注意事项：

a. 精灵图上放的都是小的装饰性质的背景图片，插入图片不能往上放。

b. 精灵图的宽度取决于最宽的那个背景图片的标签宽度。

c. 精灵图可以横向摆放也可以纵向摆放，但是每个图片之间必须留够足够的空白，保证背景图片加载时不能出现多余内容。

d. 在精灵图的最底端，尽量留一点空白，方便以后添加其他精灵图。



::: tip
精灵图打包网站：
https://www.toptal.com/developers/css/sprite-generator/
:::


<!-- <img src="/images/css/sprites.png" style="width: 40%; display: block; margin: 0 ;"> -->
<img src="/images/css/077.png" style="width: 100%; display: block; margin: 0 ;">

```html
      .sprites p{
        width: 112px;
        height: 31px;
        background: url(images/sprites.png) no-repeat -290px -207px;
      }
      <div class="sprites"><p></p></div>
```

<img src="/images/css/078.png" style="width: 40%; display: block; margin: 0 ;">


 
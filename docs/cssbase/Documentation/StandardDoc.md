
# 标准文档流

定义：标准文档流，指的是元素排版布局过程中，元素会默认自动`从左往右`，`从上往下`的流式排列方式。
前面内容发生了变化，后面的内容位置也会随着发生变化。

HTML 就是一种标准文档流文件。

HTML 中的标准文档流特点通过两种方式体现：[微观现象](../css/readme.md#微观现象)和[元素等级](../css/readme.md#元素等级)。

## 微观现象

①`空白折叠`现象。

② 文字类的元素如果排在一行会出现一种高低不齐、底边对齐效果。
![](/images/css/image-20200612170139722.png)

<!-- <img src="/images/css/030.png" style="width: 100%; display: block; margin: 0 ;"> -->

<!-- image-20200612170139722.png -->

③`自动换行`:元素内一行内容写满元素的 width 时会自动进行换行。

## 元素等级

在标准流中，大部分元素是区分等级的，习惯将元素划分为几种常见的加载级别：块级元素、行内元素、行内块元素等。

- [块级元素](../css/readme.md#块级元素表)：可以包含行内元素和其他块级元素,可制作超大型结构。比如 `<div>、 <h1> <p>`等。各种等级的元素有自己的加载特点。

- [行内元素](../css/readme.md#行内元素表)：大部分的文本级标签，比如 `<span>、<a>、<b>`等。

- 行内块元素：比如 `<img>、<input>、<textarea>、`等。

## 块级元素

- a、支持宽高

```css
width: 200px;
height: 100px;
```
<img src="/images/css/a31.png" style="width: 100%; display: block; margin: 0 ;">
<!-- ![](/images/css/3-1.png) -->

- b、必须独占一行，不能与其他任何标签并排一行。
<img src="/images/css/a32.png" style="width: 100%; display: block; margin: 0 ;">

<!-- ![](/images/css/3-2.png) -->

- c、如果不设置宽度，会自动撑满父级的 width 区域；高度不设置，会被内容自动撑开高度。
<img src="/images/css/a33.png" style="width: 100%; display: block; margin: 0 ;">

  <!-- ![](/images/css/3-3.png) -->

## 行内元素

- a、不支持宽高，其他的盒模型属性虽然能设置，但是容易出现加载问题。

```css
span {
  width: 100px;
  height: 100px;
  padding: 10px;
  border: 3px solid #f00;
  margin: 10px;
  background‐color: pink;
}
```
<img src="/images/css/a34.png" style="width: 100%; display: block; margin: 0 ;">

<!-- ![](/images/css/3-4.png) -->

- b、行内元素可以与其他的行内或行内块元素并排一行显示。
<img src="/images/css/a35.png" style="width: 100%; display: block; margin: 0 ;">

  <!-- ![](/images/css/3-5.png) -->

- c、行内元素不论是否设置宽高，宽度和高度都只能被内容自动撑开。

## 行内块元素

a、行内块元素可以设置宽度和高度。

b、行内块元素可以与其他的行内或行内块并排一行显示。

c、行内块元素如果不设置宽高，要么以原始尺寸加载要么被内容自动撑开。

d、行内块依旧具有标准流的微观性质，例如空白折叠现象。
<img src="/images/css/a36.png" style="width: 100%; display: block; margin: 0 ;">

<!-- ![](/images/css/3-6.png) -->


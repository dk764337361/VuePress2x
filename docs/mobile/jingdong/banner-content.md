# 京东首页-焦点图-线形渐变背景

[MDN文档](https://developer.mozilla.org/zh-CN/)

线形渐变背景[函数linear-gradient()](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient())

## 制作效果
  <img src="/images/mobile/mobilebase/028.png" style="width: 80%; display:block; margin: 0 ;">

- index.css

```css{9}
.banner .banner-bg{
position: absolute;
left: -25%; /*拽回自身（150%）的25%*/
width: 150%;
height: 145px;
border-bottom-left-radius: 100%;
border-bottom-right-radius: 100%;
background-color: #f00;
background-image: linear-gradient(0deg,#f1503b,#c82519 50%);
}
```
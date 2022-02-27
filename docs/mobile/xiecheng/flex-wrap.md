# flex-wrap 设置子元素是否换行

- 默认情况下，项目都排在一条线上（又称“轴线”）上。
- flex-wrap 属性定义，flex 布局中默认是不换行的。

| 属性值 | 解释说明       |
| ------ | -------------- |
| nowrap | 默认值，不换行 |
| wrap   | 换行           |

```html
<div>
  <span>1</span>
  <span>2</span>
  <span>3</span>
  <span>4</span>
  <span>5</span>
  <span>6</span>
  <span>7</span>
</div>
```

```css
* {
  margin: 0;
  padding: 0;
}
div {
  display: flex;
  width: 800px;
  height: 800px;
  background-color: pink;
  /* 默认值，不进行换行 */
  /* flex-wrap: nowrap; */
  /* 换行效果 */
  flex-wrap: wrap;
}
span {
  width: 150px;
  height: 100px;
  background-color: purple;
}
```

<img src="/images/mobile/flex/013.png" style="width: 70%; display:block; margin: 0 ;">
<img src="/images/mobile/flex/014.png" style="width: 70%; display:block; margin: 0 ;">


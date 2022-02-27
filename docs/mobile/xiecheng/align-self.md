# align-self 控制子项自己在侧轴上的排列方式

- align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。
- 默认值为 auto，表示继承父元素的 align-items 属性，如果没有父元素，则等同于 seretch。

```html
<div>
  <span>1</span>
  <span>2</span>
  <span>3</span>
</div>
```

```css{21,22}
div {
  display: flex;
  width: 800px;
  height: 800px;
  background-color: pink;
  justify-content: center;
  /* 侧轴，默认值就是从上往下加载 */
  align-items: flex-start;
}
span {
  font-size: 30px;
  text-align: center;
  color: #fff;
  line-height: 100px;
  width: 150px;
  height: 100px;
  margin-right: 10px;
  background-color: purple;
}
span:nth-child(2) {
  /*设置自己在侧轴上的排列方式*/
  align-self: flex-end;
}
```

  <img src="/images/mobile/flex/031.png" style="width: 100%; display:block; margin: 0 ;">

## order 属性定义项目的排列顺序

- 数值越小，排列越靠前，默认为 0。

```css
.item {
  order: <number>;
}
```

::: warning 注意
和 z-index 不一样。
:::
  <img src="/images/mobile/flex/030.png" style="width: 100%; display:block; margin: 0 ;">

  <img src="/images/mobile/flex/032.png" style="width: 100%; display:block; margin: 0 ;">

```html
<div>
  <span>1</span>
  <span>2</span>
  <span>3</span>
</div>
```

```css{21,22}
div {
  display: flex;
  width: 800px;
  height: 800px;
  background-color: pink;
  justify-content: center;
  /* 侧轴，默认值就是从上往下加载 */
  align-items: flex-start;
}
span {
  font-size: 30px;
  text-align: center;
  color: #fff;
  line-height: 100px;
  width: 150px;
  height: 100px;
  margin-right: 10px;
  background-color: purple;
}
span:nth-child(2) {
  /*设置自己在侧轴上的排列方式*/
  /* align-self: flex-end; */
  /* 调整子项加载的顺序，默认值是0，如果想往前提，属性值可以为负数 */
  order: -1;
  /* 如果前面的元素想往后移动，属性值要比前面的都大 */
  /* order: 2; */
}
```

# flex 布局子项常见属性

- flex 子项目占的份数
- align-self 控制子项自己在侧轴的排列方式
- order 属性定义子项的排列顺序（前后顺序）

## flex 属性

- flex 属性 定义子项目分配父盒子的剩余空间，用 flex 来表示占多少份数。
- 属性值为数字，数字为 1，表示占份数中的 1 份。默认值为 0。

```css
.item {
  flex: <number>; /*default 0*/
}
```

## 举例 1

<img src="/images/mobile/flex/028.png" style="width: 100%; display:block; margin: 0 ;">

```html
<section>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</section>
```

```css{15}
section {
  display: flex;
  width: 60%;
  height: 80px;
  margin: 50px auto;
  background-color: pink;
}
section div:nth-child(1),
section div:nth-child(3) {
  width: 80px;
  height: 80px;
  background-color: skyblue;
}
section div:nth-child(2) {
  flex: 1;
  height: 80px;
  background-color: green;
}
```

## 举例 2
<img src="/images/mobile/flex/029.png" style="width: 100%; display:block; margin: 0 ;">

```html
<div class="box">
  <span>1</span>
  <span>2</span>
  <span>3</span>
</div>
```

```css{9,12}
.box {
  display: flex;
  width: 60%;
  height: 80px;
  background-color: pink;
  margin: 0 auto;
}
.box span {
  flex: 1;
}
.box span:nth-child(2) {
  flex: 2;
  background-color: purple;
}
```

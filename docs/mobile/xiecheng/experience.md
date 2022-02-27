# Flex 布局体验

## 传统布局与 flex 布局

### 传统布局

- 兼容性好
- 布局繁琐
- 局限性：不能在移动端很好的布局。

### flex 布局

- 操作方便，布局极为简单，移动端应用广泛。
- PC 端浏览器支持情况较差。
- IE 11 或更低版本，不支持或仅部分支持。

::: tip 建议

1. 如果是 PC 端页面布局，我们还是传统布局。
2. 如果是移动端或者不考虑兼容性问题的 PC 端页面布局，我们还是使用 flex 弹性布局。
   :::

## flex 布局体验
<img src="/images/mobile/flex/001.png" style="width: 100%; display:inline-block; margin: 0 ;">

```html
<div>
  <span>1</span>
  <span>2</span>
  <span>3</span>
</div>
```

```css{6,10,17}
* {
  margin: 0;
  padding: 0;
}
div {
  display: flex;
  width: 800px;
  height: 200px;
  background-color: pink;
  justify-content: space-around;
}
span {
  width: 150px;
  height: 100px;
  margin-right: 10px;
  background-color: purple;
  flex: 1;
}
```

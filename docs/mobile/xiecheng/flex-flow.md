# flex-flow

- flex-flow 属性是`flex-direction`和`flex-wrap`属性的复合属性。

```css
flex-flow: row nowrap;
```

## 举例：

```css
div {
  display: flex;
  width: 800px;
  height: 800px;
  background-color: pink;
  /* 默认主轴方向为水平向右 */
  /* flex-direction: row;
      flex-wrap: wrap; */
  /* 可以将主轴方向的设置和子元素是否换行的设置进行合写 */
  flex-flow: column wrap;
  /* 侧轴整体居中 */
  align-content: center;
}
```

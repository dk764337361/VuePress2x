# flex布局父项常见属性

以下由6个属性是对父元素设置的

- `flex-direction`：设置主轴的方向
- `justify-content`：设置主轴上的子元素排列方式
- `flex-wrap`：设置子元素是否换行
- `align-content`：设置侧轴上的子元素的排列方式（多行）
- `align-items`：设置侧轴上的子元素的排列方式（单行）
- `flex-flow`：复合属性，相当于同时设置了 `flex-direction`和`flex-wrap`

## `flex-direction` 设置主轴的方向

### 主轴与侧轴
体验中 `div`就是flex父容器。

在flex布局中，分为主轴和侧轴两个方向，同样的叫法由：行和列、X轴和Y轴
<img src="/images/mobile/flex/003.png" style="width: 50%; display:block; margin: 0 ;">

- `flex-direction`属性决定主轴的方向（即项目的排列方向）
- 默认主轴方向就是X轴方向，水平向右
- 默认侧轴方向就是Y轴方向，垂直向下

::: warning 注意
主轴和侧轴是会变化的，就看`flex-direction`设置谁为主轴，剩下的就是侧轴，而我们的子元素是跟着主轴来排列的。
:::

## `flex-direction`的属性

| 属性值      | 解释说明   |
| -------------- | -------------- |
| row            | 默认值从左到右 |
| row-reverse    | 从右到左   |
| column         | 从上到下   |
| column-reverse | 从下到上   |

```html
  <div>
    <span>1</span>
    <span>2</span>
    <span>3</span>
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
      /* 默认主轴为水平从左往右 */
      /* flex-direction: row; */
      /* 主轴为水平从右往左 */
      /* flex-direction: row-reverse; */
      /* 主轴为垂直从上往下 */
      /* flex-direction: column; */
      /* 主轴为垂直从下往上 */
      flex-direction: column-reverse;
    }
    span {
      width: 150px;
      height: 100px;
      margin-right: 10px;
      color: #fff;
      background-color: purple;
    }
```

<img src="/images/mobile/flex/004.png" style="width: 70%; display:block; margin: 0 ;">
<img src="/images/mobile/flex/005.png" style="width: 70%; display:block; margin: 0 ;">
<img src="/images/mobile/flex/006.png" style="width: 70%; display:block; margin: 0 ;">
<img src="/images/mobile/flex/007.png" style="width: 70%; display:block; margin: 0 ;">
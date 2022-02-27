# align-items 设置侧轴单行子项目对齐（单行）

align-items 侧轴上子元素排列方式（单行）

- 该属性是控制子项在侧轴（默认是 y 轴）上的排列方式
- 在子项为单项（单行）的时候使用

| 属性值     | 解释说明                 |
| ---------- | ------------------------ |
| flex-start | 从上到下                 |
| flex-end   | 从下到上                 |
| center     | 挤在一起居中（垂直居中） |
| stretch    | 拉伸                     |

## flex-start

<img src="/images/mobile/flex/015.png" style="width: 70%; display:block; margin: 0 ;">

```html
<div>
  <span>1</span>
  <span>2</span>
  <span>3</span>
</div>
```

```css{10-13}
    * {
      margin: 0;
      padding: 0;
    }
    div {
      display: flex;
      width: 800px;
      height: 800px;
      background-color: pink;
      /* 默认主轴方向为水平向右 */
      flex-direction: row;
      /* 侧轴，默认值就是从上往下加载 */
      align-items: flex-start;
    }
    span {
      width: 150px;
      height: 100px;
      margin-right: 10px;
      background-color: purple;
    }
```

## flex-end

<img src="/images/mobile/flex/016.png" style="width: 70%; display:block; margin: 0 ;">

```html
<div>
  <span>1</span>
  <span>2</span>
  <span>3</span>
</div>
```

```css{10-13}
    * {
      margin: 0;
      padding: 0;
    }
    div {
      display: flex;
      width: 800px;
      height: 800px;
      background-color: pink;
      /* 默认主轴方向为水平向右 */
      flex-direction: row;
      /* 侧轴，从下往上加载 */
      align-items: flex-end;
    }
    span {
      width: 150px;
      height: 100px;
      margin-right: 10px;
      background-color: purple;
    }
```
## center

<img src="/images/mobile/flex/017.png" style="width: 70%; display:block; margin: 0 ;">

```html
<div>
  <span>1</span>
  <span>2</span>
  <span>3</span>
</div>
```

```css{10-14}
    * {
      margin: 0;
      padding: 0;
    }
    div {
      display: flex;
      width: 800px;
      height: 800px;
      background-color: pink;
      /* 默认主轴方向为水平向右 */
      flex-direction: row;
      justify-content: center;
      /* 侧轴，从中间加载 */
      align-items: center;
    }
    span {
      width: 150px;
      height: 100px;
      margin-right: 10px;
      background-color: purple;
    }
```
## stretch

### 竖向拉伸
<img src="/images/mobile/flex/018.png" style="width: 70%; display:block; margin: 0 ;">

```html
<div>
  <span>1</span>
  <span>2</span>
  <span>3</span>
</div>
```

```css{10-15,19}
    * {
      margin: 0;
      padding: 0;
    }
    div {
      display: flex;
      width: 800px;
      height: 800px;
      background-color: pink;
      /* 默认主轴方向为水平向右 */
      flex-direction: row;
      /* flex-direction: column; */
      justify-content: center;
      /* 拉伸 */
      align-items: stretch;
    }
    span {
      width: 150px;
      /* height: 100px; */
      margin-right: 10px;
      background-color: purple;
    }
```
### 横向拉伸
<img src="/images/mobile/flex/019.png" style="width: 70%; display:block; margin: 0 ;">

```html
<div>
  <span>1</span>
  <span>2</span>
  <span>3</span>
</div>
```

```css{10-13,16}
    * {
      margin: 0;
      padding: 0;
    }
    div {
      display: flex;
      width: 800px;
      height: 800px;
      background-color: pink;
      flex-direction: column;
      justify-content: center;
      /* 拉伸 */
      align-items: stretch;
    }
    span {
      /* width: 150px; */
      height: 100px;
      margin-right: 10px;
      background-color: purple;
    }
```
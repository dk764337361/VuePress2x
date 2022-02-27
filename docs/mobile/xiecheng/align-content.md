# align-content 设置侧轴多行子项目对齐（多行）

- 设置子项在侧轴上的排列方式，并且只能用于子项出现`换行``多行`），在单行下是没有效果的。


| 属性值     | 解释说明                           |
| ------------- | -------------------------------------- |
| flex-start    | 在侧轴的头部开始排列         |
| flex-end      | 在侧轴的尾部开始排列         |
| center        | 在侧轴中间显示                  |
| space-around  | 子项在侧轴平分剩余空间      |
| space-between | 子项在侧轴先分布在两头，再平分剩余空间 |
| stretch       | 设置子项元素高度平分父元素高度 |

```html
  <div>
    <span>1</span>
    <span>2</span>
    <span>3</span>
    <span>4</span>
    <span>5</span>
    <span>6</span>
    <span>7</span>
    <span>8</span>
    <span>9</span>
  </div>
```
```css{11-12,20}
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
      flex-wrap: wrap;
      /* 侧轴整体居于开始位置 */
      /* align-content: flex-start; */
      /* 侧轴整体居于结束位置 */
      /* align-content: flex-end; */
      /* 侧轴整体居中 */
      /* align-content: center; */
      /* 侧轴方向拉伸 */
      align-content: stretch;
      /* 侧轴方向平均分布 */
      /* align-content: space-around; */
      /* 侧轴方向，两边对齐，中间的行进行平均分布 */
      /* align-content: space-between; */
    }
    span {
      width: 250px;
      height: 100px;
      margin-right: 10px;
      margin-bottom: 10px;
      background-color: purple;
    }
```

## flex-start
<img src="/images/mobile/flex/020.png" style="width: 70%; display:block; margin: 0 ;">

## flex-end 
<img src="/images/mobile/flex/021.png" style="width: 70%; display:block; margin: 0 ;">

## center
<img src="/images/mobile/flex/022.png" style="width: 70%; display:block; margin: 0 ;">

## space-stretch 
### 有高度
<img src="/images/mobile/flex/023.png" style="width: 70%; display:block; margin: 0 ;">

### 无高度
<img src="/images/mobile/flex/024.png" style="width: 70%; display:block; margin: 0 ;">

## space-around

<img src="/images/mobile/flex/025.png" style="width: 70%; display:block; margin: 0 ;">

## space-between 
<img src="/images/mobile/flex/026.png" style="width: 70%; display:block; margin: 0 ;">




## align-content和align-items 区别

- `align-items` 适用于单行情况下，只有`上对齐`、`下对齐`、`居中`和`拉伸`
- `align-content` 适用于换行（多行）的情况下（单行情况下无效），可以设置`上对齐`、`下对齐`、`居中`和`拉伸`以及平均分配剩余空间等属性值。
- 总结：单行找`align-items`。多行找`align-content`

<img src="/images/mobile/flex/027.png" style="width: 100%; display:block; margin: 0 ;">

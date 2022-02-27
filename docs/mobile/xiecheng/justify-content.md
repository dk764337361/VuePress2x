# justify-content 设置主轴上子项目对齐

`justify-content` 属性定义了项目在主轴上的对齐方式

::: warning 注意
使用这个属性之前一定要确定好主轴是哪个
:::

| 属性值     | 解释说明                                |
| ------------- | ------------------------------------------- |
| flex-start    | 默认值，从头开始，如果主轴是X轴，则从左到右 |
| flex-end      | 从尾部开始排列                       |
| center        | 在主轴居中对齐（如果主轴是x轴则水平居中） |
| space-around  | 平分剩余空间                          |
| space-between | 先两边贴边，再平分剩余空间（重要） |

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
      /* 默认值，在主轴开始位置 */
      justify-content: flex-start;
      /* 在主轴结束位置对齐 */
      /* justify-content: flex-end; */
      /* 在主轴居中对齐 */
      /* justify-content: center; */
      /* 在主轴平分剩余空间 */
      justify-content: space-around;
      /* 先两边对齐，其他的子项目平分剩余空间 */
      /* justify-content: space-between; */
    }
    span {
      width: 150px;
      height: 100px;
      background-color: purple;
    }
```

<img src="/images/mobile/flex/008.png" style="width: 70%; display:block; margin: 0 ;">
<img src="/images/mobile/flex/009.png" style="width: 70%; display:block; margin: 0 ;">
<img src="/images/mobile/flex/010.png" style="width: 70%; display:block; margin: 0 ;">
<img src="/images/mobile/flex/011.png" style="width: 70%; display:block; margin: 0 ;">
<img src="/images/mobile/flex/012.png" style="width: 70%; display:block; margin: 0 ;">


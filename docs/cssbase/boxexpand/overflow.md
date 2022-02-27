# overflow

| 属性值  | 说明                                                                                                                       |
| ------- | -------------------------------------------------------------------------------------------------------------------------- |
| visible | 默认溢出                                                                                                                   |
| hidden  | 溢出部分直接隐藏，隐藏超过边框范围的内容                                                                                   |
| scroll  | 溢出的部分出现滚动条，可以拖动滚动条看到隐藏部分，多出盒子高度的部分不显示，不论有没有溢出，水平和垂直方向都会出现滚动条。 |
| auto    | 自动的，如果没有溢出就正常显示，如果有溢出，溢出的方向自动出现滚动条。                                                     |

```css
overflow: hidden;
```

<img src="/images/css/018.png" style="width: 50%; display: block; margin: 0 auto;">

```css
overflow: scroll;
```

<img src="/images/css/019.png" style="width: 50%; display: block; margin: 0 auto;">

```css
overflow: auto;
```

<img src="/images/css/020.png" style="width: 50%; display: block; margin: 0 auto;">
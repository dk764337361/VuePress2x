# 2D转换-位移

- 属性名：transform
- 作用：对元素进行移动、缩放、转动、拉长或拉伸。配合过渡和即将学习的动画知识，可以取代大量
之前那只能靠Flash才可以实现的效果。
- 属性值：多种转换方法的属性值，可以实现不同的转换效果。

## 位移 translate()

当transform的属性值为translate()时，可以实现位移效果。
<img src="/images/CSS3/016.png" style="width: 30%; display: block; margin: 0 ;">
<img src="/images/CSS3/009.png" style="width: 50%; display: block; margin: 0 ;">
::: tip
`translate()`位移宽度可以参考整体宽度的百分比，可以设置居中效果。
:::


### 书写语法：

| 值            | 说明                                                          |
| -------------- | --------------------------------------------------------------- |
| translate(x,y) | x,y分别为水平和垂直方向位移的距离，可以为px值或百分比，区分正负 |
| translate(x)   | 只有一个数值，表示水平方向的位移                |

<img src="/images/CSS3/017.png" style="width: 50%; display: block; margin: 0 ;">
<img src="/images/CSS3/018.png" style="width: 50%; display: block; margin: 0 ;">

::: details 点击查看代码
```html
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      .box1 {
        margin: 50px;
        width: 192px;
        height: 192px;
        border: 2px solid red;
      }
      .box1 img {
        transform: translate(100px, 100px);
      }
      .box2 {
        position: relative;
        margin: 150px;
        width: 500px;
        height: 100px;
        border: 2px solid red;
      }
      .box2 p {
        position: absolute;
        left: 50%;
        width: 100px;
        height: 100px;
        background-color: skyblue;
        padding: 0 20px;

        /* margin-left: -70px; */
        /* 等同于 */
        transform: translate(-50%);
      }
    </style>
  </head>
  <body>
    <div class="box1">
      <img src="../images/android-chrome-192x192.png" alt="" />
    </div>
    <div class="box2">
      <p></p>
    </div>
  </body>
```
:::


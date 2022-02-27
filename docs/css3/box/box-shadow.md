# 边框阴影

- 在 CSS3 中，`box-shadow`属性用于对盒子边框添加阴影。

| 属性值   | 简介                             |
| -------- | -------------------------------- |
| h-shadow | 必须。水平阴影的位置。允许负值。 |
| v-shadow | 必须。垂直阴影的位置。允许负值。 |
| blur     | 可选。模糊的距离                 |
| spread   | 可选。阴影的尺寸                 |
| color    | 可选。阴影的颜色                 |
| inset    | 可选。将外部阴影改为内部阴影     |

## 语法

### 单层阴影

`box-shadow`属性向文本添加阴影，属性值有 2-3 个长度值、可选的颜色值、可选的 inset 关键词来规定，省略的长度是 0。

::: warning 注意
外部的边框阴影不需要进行设置，默认是`outset`值，如果增加`outset`值反而出现错误
:::
::: details 点击查看代码

```html
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      .box {
        width: 200px;
        height: 200px;
        margin: 40px 40px;
        background-color: pink;
        border: 10px solid chartreuse;
        /* 边框阴影：X、Y、模糊程度、扩展大小、颜色、是否内边框阴影*/
        /* 注意：外部的边框阴影不需要进行设置，他是默认的，如果增加outset值反而出现错误*/
        /* box-shadow: 20px 20px 10px 5px  #808080 inset; */
        box-shadow: 20px 20px 10px 5px  #808080 ;
      }
    </style>
  </head>
  <body>
    <div class="box"></div>
  </body>
```

:::

<img src="/images/CSS3/012.png" style="width: 50%; display: block; margin: 0 ;">

### 多层阴影

`box-shadow`属性也可以向文本添加多个阴影，逗号分隔多个阴影的属性值。
::: warning 注意
多层阴影中，先写的阴影压盖在后写的阴影上。
:::
::: details 点击查看代码

```html
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      .box {
        width: 200px;
        height: 200px;
        margin: 40px 40px;
        background-color: pink;
        border: 10px solid chartreuse;
        /* 边框阴影：X、Y、模糊程度、扩展大小、颜色、是否内边框阴影*/
        /* 注意：外部的边框阴影不需要进行设置，他是默认的，如果增加outset值反而出现错误*/
        /* box-shadow: 20px 20px 10px 5px  #808080 inset; */
        box-shadow: 20px 20px 10px 5px  #808080 ,40px 40px 10px 5px red,60px 60px 10px 5px blue;
      }
    </style>
  </head>
  <body>
    <div class="box"></div>
  </body>
```

:::

<img src="/images/CSS3/013.png" style="width: 50%; display: block; margin: 0 ;">

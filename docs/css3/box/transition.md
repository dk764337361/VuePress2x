# 过渡动画 transition

## 动画效果

- CSS3 出现之前，前端一般使用 Flash 动画或 JavaScript 制作动画。

- 帧动画：通过一帧一帧的画面按照固定顺序和速渡播放，如电影胶片。

## 过渡属性

- 属性名：transition

作用：在不使用 Flash 动画或 JavaScript 的情况下，使用 transition 可以实现补间动画（过渡效果），
并且当前元素只要有“属性”发生变化时即存在两种状态（我们用 A 和 B 代指），那么 A 和 B 之间就可以实现平滑的过渡的动画效果。
为了方便查看，我们使用`:hover`切换状态。

- 属性值

transition: 过渡的属性`空格`过渡时间`空格`运动曲线`空格`延迟时间

### 单一属性写法

| 属性                       | 描述                                       |
| -------------------------- | ------------------------------------------ |
| transition                 | 简写属性，用在一个属性中设置四个过渡属性。 |
| transition-properth        | 规定应用过渡的 CSS 属性的名称。            |
| transition-duration        | 定义过渡效果花费的时间是 0。               |
| transition-timing-function | 规定过渡效果的时间曲线，默认是"ease"。     |
| transition-delay           | (设置延迟时间)规定过渡效果何时开始.默认是 0。            |

### transition-properth 过渡的属性

- `none`表示没有属性过渡
- `all`表示所有变化的属性都过渡
- 使用具体的属性名，多个属性名中间逗号分隔

### transition-duration 过渡的时间

- 过渡时间：以 s 秒为单位。
- 延迟时间：以 s 秒为单位。`0s`也必须加单位。

### transition-timing-function 时间曲线

| 值                        | 描述                                                                                                                         |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| linear                    | 规定以相同速渡开始至结束的过渡效果。                                                                                         |
| ease                      | 规定慢速开始，然后变快，然后慢速结束的过渡效果。                                                                             |
| ease-in                   | 规定以慢速开始的过渡效果。                                                                                                   |
| ease-out                  | 规定以慢速结束的过渡效果。                                                                                                   |
| ease-in-out               | 规定以慢速开始和结束的过渡效果。                                                                                             |
| cubic-bezier(x1,y1,x2,y2) | 在 cubic-bezier 函数中定义自己的值。<br/>x1,x2 取是 0 至 1 之间的数值。<br/>y1,y2 取值任意，四个数值表示拉扯的点的两个坐标。 |

<img src="/images/CSS3/014.png" style="width: 100%; display: block; margin: 0 ;">
<img src="/images/CSS3/015.png" style="width: 30%; display: block; margin: 0 ;">

```css
transition: all 2s ease-in 0s;
```
等同于
```css
transition: all 2s cubic-bezier(0.63, -0.02, 1, 1) 0s;
```

### 综合属性写法

```html
    <style>
      .BoxTransition {
          width: 100px;
          height: 100px;
          background-color: chartreuse;
          /*过渡属性：属性 过渡时间 时间曲线 延迟时间*/
          /* transition: all 2s ease-in 0s; */
          transition: all 2s cubic-bezier(0.63,-0.02, 1, 1) 0s;
          /* Safari前缀-webkit */
          /* -webkit-transition: all 2s ease-in 0s; */
      }
      .BoxTransition:hover{
          width: 300px;
      }
    </style>
  </head>
  <body>
    <div class="BoxTransition"></div>
  </body>
```
光标移到图片试试看:laughing::laughing:

<BoxTransition />

### 浏览器兼容

- IE10、Firefox、Chorme 以及 Opera 支持 transition 属性。

- Safari 需要前缀-webkit

::: warning 注意
IE9 以及更早的版本，不支持 transition 属性。
:::



# 文字阴影 text-shadow

- 在 CSS3 中，`text-shadow`可向文本应用阴影。通过属性值能够规定水平阴影、垂直阴影、模糊距离，以及阴影的颜色：

| 属性值   | 简介                             |
| -------- | -------------------------------- |
| h-shadow | 必须。水平阴影的位置。允许负值。 |
| v-shadow | 必须。垂直阴影的位置。允许负值。 |
| blur     | 可选。模糊的距离                 |
| color    | 可选。模糊的颜色                 |

<img src="/images/CSS3/009.png" style="width: 70%; display: block; margin: 0 ;">

## 语法

### 单层阴影

`text-shadow`属性向文本添加阴影，属性值有 2-3 个长度值和一个可选的颜色值进行规定，省略的长度是 0。

```css
p {
  font: bold 20px/40px "宋体";
  text-shadow: 3px 3px 5px red; /*X、 Y、模糊程度、颜色（可选）*/
}
```

<img src="/images/CSS3/010.png" style="width: 30%; display: block; margin: 0 ;">

### 多层阴影

`text-shadow`属性也可以向文本添加多个阴影，逗号分隔多个阴影的属性值。
::: warning 注意
多层阴影中，先写的阴影压盖在后写的阴影上。
:::

```css
h1 {
  font: bold 20px/40px "宋体";
  text-shadow: 3px 3px 3px #ff0000, 6px 6px 3px #00ff00, 9px 9px 3px #0000ff;
}
```
<img src="/images/CSS3/011.png" style="width: 30%; display: block; margin: 0 ;">


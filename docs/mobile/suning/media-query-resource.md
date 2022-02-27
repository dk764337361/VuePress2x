# 媒体查询引入资源方法

- 当样式比较繁多的时候，我们可以针对不同的灭提使用不同 styleheets(样式表)。
- 原理，就是直接在`<link>`中判断设备的尺寸，然后引用不同的 CSS 文件。

<img src="/images/mobile/rem/004.png" style="width: 50%; display:inline-block; margin: 0 ;">
<img src="/images/mobile/rem/005.png" style="width: 50%; display:inline-block; margin: 0 ;">

1. 语法规范

```css
<link rel=stylesheet media="mediatype and|not|only(media feature)" href="mystylesheet.css">
```

2. 示例

```css
<link rel=stylesheet media="screen and (min-width:400px)" href="styleA.css">
```

## 举例


```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /* 1.需求一：屏幕宽度小于640px，大于320px时，让两个div单独占一行 */
      /* 2.需求二：屏幕宽度大于640px，让两个div并排一行显示 */
      /* 建议：从小到大进行引入 */
      /* 根据媒体查询条件，分别引入 css 文件 */
    </style>
    <link
      rel="stylesheet"
      href="css/style320.css"
      media="screen and (min-width: 320px)"
    />
    <link
      rel="stylesheet"
      href="css/style640.css"
      media="screen and (min-width: 640px)"
    />
  </head>
  <body>
    <div>1</div>
    <div>2</div>
  </body>
</html>
```

- style320.css

```css
div {
  width: 100%;
  height: 100px;
}
div:nth-child(1) {
  background-color: pink;
}
div:nth-child(2) {
  background-color: skyblue;
}
```

- style640.css

```css
div {
  float: left;
  width: 50%;
  height: 100px;
}
div:nth-child(1) {
  background-color: pink;
}
div:nth-child(2) {
  background-color: skyblue;
}
```

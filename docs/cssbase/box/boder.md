# boder

| 属性值        | 说明                                    | 说明                                                   |                        |
| ------------- | --------------------------------------- | ------------------------------------------------------ | ---------------------- |
| boder(三值法) | boder-width、 boder-style、 boder-color |                                                        |                        |
| boder-color   | 上、右、下、左                          |                                                        |                        |
| boder-width   | 上、右、下、左                          |                                                        |                        |
| boder-style   | none                                    | 定义无边框。                                           |                        |
|               | solid                                   | 定义实线。                                             |                        |
|               | dashed                                  | 定义虚线。在大多数浏览器中呈现为实线。                 |                        |
|               | dotted                                  | 定义点状边框。在大多数浏览器中呈现为实线。             |                        |
|               | double                                  | 定义双线。双线的宽度等于 border-width 的值。           |                        |
|               | groove                                  | 定义 3D 凹槽边框。其效果取决于 border-color 的值。     | 外凸内凹               |
|               | ridge                                   | 定义 3D 垄状边框。其效果取决于 border-color 的值。     | 外凸内凹(外凸颜色反转) |
|               | inset                                   | 定义 3D 内容凹陷效果。其效果取决于 border-color 的值。 |                        |
|               | outset                                  | 定义 3D 内容凸出效果。其效果取决于 border-color 的值。 |                        |
| boder 边框    |                                         |                                                        |                        |
|               | boder-top                               | boder-width、boder-style、boder-color                  |                        |
|               | boder-top-color                         |                                                        |                        |
|               | boder-top-width                         |                                                        |                        |
|               | boder-top-style                         |                                                        |                        |
|               |                                         |                                                        |                        |
|               | boder-left                              | boder-width、boder-color                               |                        |
|               | boder-left-color                        |                                                        |                        |
|               | boder-left-width                        |                                                        |                        |
|               | boder-left-style                        |                                                        |                        |
|               |                                         |                                                        |                        |
|               | boder-right                             | boder-width、boder-style、boder-color                  |                        |
|               | boder-right-color                       |                                                        |                        |
|               | boder-right-width                       |                                                        |                        |
|               | boder-right-style                       |                                                        |                        |
|               |                                         |                                                        |                        |
|               | boder-bottom                            | boder-width、boder-style、boder-color                  |                        |
|               | boder-bottom-color                      |                                                        |                        |
|               | boder-bottom-width                      |                                                        |                        |
|               | boder-bottom-style                      |                                                        |                        |
|               |                                         |                                                        |                        |
|               | boder-left                              | boder-width、boder-style、boder-color                  |                        |
|               | boder-left-color                        |                                                        |                        |
|               | boder-left-width                        |                                                        |                        |
|               | boder-left-style                        |                                                        |                        |
|               |                                         |                                                        |                        |

## boder(三值法)

```css
table,
th,
td {
  border: 2px solid black;
  border-collapse: collapse;
}
```

等同于 ↓

```html
<table border="1" style="border-collapse: collapse;"></table>
```

## boder-width (上、右、下、左)`

```css
.box {
  width: 300px;
  height: 300px;
  padding: 15px 54px;
  border: solid rgb(255, 0, 0);
  border-width: 15px 20px 25px 30px;
  background-color: rgb(253, 137, 4);
}
```

<img src="/images/css/010.png" style="width: 50%; display: block; margin: 0 auto;">

## boder-style

```css
border-style: solid dashed dotted double;
```

<img src="/images/css/011.png" style="width: 50%; display: block; margin: 0 auto;">

```css
border-style: groove;
```

<img src="/images/css/012.png" style="width: 50%; display: block; margin: 0 auto;">

```css
border-style: ridge;
```

<img src="/images/css/013.png" style="width: 50%; display: block; margin: 0 auto;">

```css
border-style: inset;
```

<img src="/images/css/014.png" style="width: 50%; display: block; margin: 0 auto;">

```css
border-style: outset;
```

<img src="/images/css/015.png" style="width: 50%; display: block; margin: 0 auto;">

## boder-color

```css
border-style: dotted solid dashed double;
border-color: aqua rebeccapurple red palevioletred;
```

<img src="/images/css/016.png" style="width: 50%; display: block; margin: 0 auto;">
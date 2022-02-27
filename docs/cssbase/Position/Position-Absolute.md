# 绝对定位
属性值：absolute，绝对的意思。

参考元素：参考的是距离最近的有定位的祖先元素，如果祖先都没有定位，参考 `<body>`。

必须搭配偏移量属性才会发生位置移动。
```css
position: absolute; 
left: 50px; 
top: 50px;
```
<img src="/images/css/085.png" style="width: 20%; display: block; margin: 0 ;">

## 绝对定位的性质
绝对定位的元素脱离标准流，会让出标准流位置；
可以设置宽高，也可以随时定义位置；
绝对定位的元素不设置宽高只能被内容撑开。


::: tip
注意：绝对定位的参考元素是不固定的，不同的参考元素以及不同的偏移量组合，会导致绝对定位元素的参考点不同，具体位移效果不同。
:::

- `<body>` 为参考元素的参考点
以 `<body>` 为参考元素时，参考点的确定与偏移量方向有关。


## 以`<body>`为参考元素的参考点
### 有top参与

如果有 top 参与的定位，参考点就是 `<body>` 页面的左上顶点和右上顶点。自身的对比点是盒子的所有盒模型属性最外面的左上角或右上角。

<img src="/images/css/086.png" style="width: 100%; display: block; margin: 0 ;">


```css
position: absolute; 
right: 50px; 
top: 50px;
```
<img src="/images/css/088.png" style="width: 30%; display: block; margin: 0 ;">

```css
position: absolute; 
left: 50px; 
top: 50px;
```
<img src="/images/css/089.png" style="width: 30%; display: block; margin: 0 ;">


::: tip
注意：在绝对定位中，由于参考点不同，left 正值不再等价于 right 的负值。
:::

### 有bottom参与

第二，如果有 bottom 参与的绝对定位，参考点是 `<body>` 页面首屏的左下顶点或右下顶点。对比点是盒子的所有盒模型属性最外面的左下角或右下角。

```css
left: 50px; 
bottom: 50px;
```
<img src="/images/css/090.png" style="width: 30%; display: block; margin: 0 ;">

```css
right: 100px; 
bottom: 100px;
```
<img src="/images/css/087.png" style="width: 30%; display: block; margin: 0 ;">

::: warning
实际应用中，如果以 `<body>` 为参考元素，不同分辨率的浏览器中，绝对定位的元素位置是不同的，所以较少使用 `<body>` 作为参考元素。
:::

::: details 点击查看代码
```html
<!-- 案例代码 -->
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      body {
        height: 4000px;
      }
      .box {
        margin-top: 100px;
        margin-left: 100px;
        width: 200px;
        /* border: 2px solid black; */
        /* float: left; */
      }
      .box p {
        width: 100px;
        height: 100px;
        background-color: skyblue;
        line-height: 100px;
        text-align: center;
        margin-bottom: 40px;
      }
      .box .para {
        background-color: yellowgreen;
        position: absolute;
        /* top: 50px; */
        /* left: 50px; */
        bottom: 100px;
        right: 100px;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <p>1</p>
      <p>2</p>
      <p class="para">3</p>
      <p>4</p>
    </div>
```
:::

## 祖先级为参考元素

如果祖先级中有定位的元素，就不会去参考 `<body>` 。

参考元素：就近原则（参考的是祖先元素中有任意定位的，在 HTML 结构中距离目标最近的祖先。）

<img src="/images/css/092.png" style="width: 50%; display: block; margin: 0 ;">
图中P标签离谁近就跟谁，父元素的absolute与relative同等效力。

::: details
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        padding: 0;
        margin: 0;
      }
      .box1 {
        border: 10px solid red;
        width: 400px;
        height: 400px;
        padding: 50px;
        margin: 100px;
        /* position: relative; */
        position: absolute;

      }
      .box2 {
        border: 10px solid green;
        width: 280px;
        height: 280px;
        padding: 50px;
        /* position: absolute; */
        position: relative;
      }
      .box3 {
        border: 10px solid gold;
        width: 160px;
        height: 160px;
        padding: 50px;
        /* position: absolute; */
      }
      p {
        width: 60px;
        height: 60px;
        left: 50px;
        top: 50px;
        background-color: hotpink;
        position: absolute;
      }
    </style>
  </head>
  <body>
    <div class="box1">
      <div class="box2">
        <div class="box3">
          <p></p>
        </div>
      </div>
    </div>
  </body>
</html>
```
:::


## 祖先元素参考点
如果绝对定位的参考元素是某个祖先级，参考点是盒子 border 以内的四个顶点，组合方向决定了参考点。绝对定位的元素只关心对比点和参考点之间的距离，会忽视参考元素的 padding 区域。

left、top：参考点是祖先的 border 以内的左上顶点，对比点是盒子自身的左上角。

right、top：参考点是祖先的 border 以内的右上顶点，对比点是盒子自身的右上角。

left、bottom：参考点是祖先的 border 以内的左下顶点，对比点是盒子自身的左下角。

right、bottom：参考点是祖先的 border 以内的右下顶点，对比点是盒子自身的右下角。

```css
left: 50px; 
top: 50px;
```
<img src="/images/css/093.png" style="width: 50%; display: block; margin: 0 ;">

```css
right: 50px; 
top: 50px;
```
<img src="/images/css/094.png" style="width: 50%; display: block; margin: 0 ;">

```css
left: 50px; 
bottom: 50px;
```
<img src="/images/css/095.png" style="width: 50%; display: block; margin: 0 ;">

```css
right: ‐150px; 
bottom: 50px;
```
<img src="/images/css/096.png" style="width: 50%; display: block; margin: 0 ;">

# 压盖顺序

实际使用中，可能出现多个定位的元素加载到同一个位置的情况，这时候压盖的顺序是可以控制的。

## 默认压盖顺序

### 定位的元素都会去压盖标准流或浮动的元素。

<img src="/images/css/103.png" style="width: 50%; display: block; margin: 0 ;">
<img src="/images/css/104.png" style="width: 50%; display: block; margin: 0 ;">
<img src="/images/css/105.png" style="width: 50%; display: block; margin: 0 ;">


::: details 情况1：

```css
    <style>
    * {
        padding: 0;
        margin: 0;
      }
      .box1 {
        float: left;
        width: 200px;
        height: 200px;
        background-color: skyblue;
      }
      .box2 {
        width: 150px;
        height: 150px;
        position: relative;
        background-color: pink;
      }
    </style>
    <div class="box1"></div>
    <div class="box2"></div>
```
:::


::: details 情况2：

```css
      * {
        padding: 0;
        margin: 0;
      }
      .box1 {
        float: left;
        width: 200px;
        height: 200px;
        background-color: skyblue;
      }
      .box2 {
        position: relative;
        top: -200px;
        width: 150px;
        height: 150px;
        background-color: pink;
      }
      .box3 {
        position: absolute;
        top: 0;
        left: 0;
        width: 100px;
        height: 100px;
        background-color: yellowgreen;
      }
      .box4 {
        position: fixed;
        top: 0;
        left: 0;
        width: 50px;
        height: 50px;
        background-color: gold;
      }
    </style>
    <div class="box1"></div>
    <!-- <div class="box2"></div> -->
    <div class="box3"></div>
    <!-- <div class="box4"></div> -->
```

:::


::: details 情况3：
```css
    <style>
      * {
        padding: 0;
        margin: 0;
      }
      .box1 {
        float: left;
        width: 200px;
        height: 200px;
        background-color: skyblue;
      }
      .box2 {
        position: relative;
        top: -200px;
        width: 150px;
        height: 150px;
        background-color: pink;
      }
      .box3 {
        position: absolute;
        top: 0;
        left: 0;
        width: 100px;
        height: 100px;
        background-color: yellowgreen;
      }
      .box4 {
        position: fixed;
        top: 0;
        left: 0;
        width: 50px;
        height: 50px;
        background-color: gold;
      }
    </style>
  </head>
  <body>
    <div class="box1"></div>
    <!-- <div class="box2"></div> -->
    <!-- <div class="box3"></div> -->
    <div class="box4"></div>
```
::: 
### 如果都是定位的元素，在HTML中后写的定位压盖先写的定位。

因此，书写代码时，需要注意压盖效果，必须合理设置HTML书写顺序。
<img src="/images/css/106.png" style="width: 50%; display: block; margin: 0 ;">
::: details
```css
    <style>
      * {
        padding: 0;
        margin: 0;
      }
      .box1 {
        float: left;
        width: 200px;
        height: 200px;
        background-color: skyblue;
      }
      .box2 {
        position: relative;
        /* top: -200px; */
        width: 150px;
        height: 150px;
        background-color: pink;
      }
      .box3 {
        position: absolute;
        top: 0;
        left: 0;
        width: 100px;
        height: 100px;
        background-color: yellowgreen;
      }
      .box4 {
        position: fixed;
        top: 0;
        left: 0;
        width: 50px;
        height: 50px;
        background-color: gold;
      }
    </style>
    <div class="box1"></div>
    <div class="box2"></div>
    <div class="box3"></div>
    <div class="box4"></div>
```
:::

## 自定义压盖顺序
如果想更改定位的元素的压盖顺序，可以设置一个 z-­index 属性。

属性值：数字。

### ①属性值大的会压盖属性值小的，设置z­-index属性的会压盖没有设置的。
<img src="/images/css/107.png" style="width: 50%; display: block; margin: 0 ;">

:::details
```css
    <style>
      * {
        padding: 0;
        margin: 0;
      }
      .box1 {
        float: left;
        width: 200px;
        height: 200px;
        background-color: skyblue;
      }
      .box2 {
        position: relative;
        /* top: -200px; */
        width: 150px;
        height: 150px;
        background-color: pink;
        z-index: 20;
      }
      .box3 {
        position: absolute;
        top: 0;
        left: 0;
        width: 100px;
        height: 100px;
        background-color: yellowgreen;
        z-index: 3;

      }
      .box4 {
        position: fixed;
        top: 0;
        left: 0;
        width: 50px;
        height: 50px;
        background-color: gold;
        z-index: 3;
      }
    </style>
    <div class="box1"></div>
    <div class="box2"></div>
    <div class="box3"></div>
    <div class="box4"></div>
```
:::

### ②如果属性值相同，比较HTML书写顺序，后写的压盖先写的。
<img src="/images/css/108.png" style="width: 50%; display: block; margin: 0 ;">

:::details
```html
    <style>
      * {
        padding: 0;
        margin: 0;
      }
      .box1 {
        float: left;
        width: 200px;
        height: 200px;
        background-color: skyblue;
      }
      .box2 {
        position: relative;
        /* top: -200px; */
        width: 150px;
        height: 150px;
        background-color: pink;
        /* z-index: 20; */
      }
      .box3 {
        position: absolute;
        top: 0;
        left: 0;
        width: 100px;
        height: 100px;
        background-color: yellowgreen;
        z-index: 3;

      }
      .box4 {
        position: fixed;
        top: 0;
        left: 0;
        width: 50px;
        height: 50px;
        background-color: gold;
        z-index: 3;
      }
    </style>
  <body>
    <div class="box1"></div>
    <div class="box2"></div>
    <div class="box3"></div>
    <div class="box4"></div>
  </body>
```
:::

### ③z­index属性只能设置给定位的元素才会生效，如果给没有定位的元素设置，不会生效。

### ④父子盒模型中，如果父子盒子都进行了定位，与其他的父子级有压盖的部分：

父级盒子：如果不设置z­index，后写的压盖先写的；如果设置了z­index，值大的压盖值小的。
<img src="/images/css/109.png" style="width: 50%; display: block; margin: 0 ;">


:::details
```css{13,30}
    <style>
      * {
        padding: 0;
        margin: 0;
      }
      .father {
        position: absolute;
        top: 0;
        left: 0;
        width: 200px;
        height: 200px;
        border: 10px solid red;
        z-index: 2;
      }
      .son {
        position: absolute;
        top: 0;
        left: 0;
        width: 150px;
        height: 150px;
        background-color: pink;
      }
      .fuqin {
        position: absolute;
        top: 0;
        left: 0;
        width: 200px;
        height: 200px;
        border: 10px solid yellowgreen;
        z-index: 1;
      }
      .erzi {
        position: absolute;
        top: 0;
        left: 0;
        width: 150px;
        height: 150px;
        background-color: skyblue;
      }
    </style>
  </head>
  <body>
    <div class="father">
      <div class="son">
      </div>
    </div>
    <div class="fuqin">
      <div class="erzi">
      </div>
    </div>
```
:::

- 子级盒子：如果父级没有设置z­index属性，子级z­index大的会压盖小的；
<img src="/images/css/110.png" style="width: 50%; display: block; margin: 0 ;">

:::details
```css{22,40}
    <style>
      * {
        padding: 0;
        margin: 0;
      }
      .father {
        position: absolute;
        top: 0;
        left: 0;
        width: 200px;
        height: 200px;
        border: 10px solid red;
        /* z-index: 2; */
      }
      .son {
        position: absolute;
        top: 0;
        left: 0;
        width: 150px;
        height: 150px;
        background-color: pink;
        z-index: 10;
      }
      .fuqin {
        position: absolute;
        top: 0;
        left: 0;
        width: 200px;
        height: 200px;
        border: 10px solid yellowgreen;
        /* z-index: 1; */
      }
      .erzi {
        position: absolute;
        top: 0;
        left: 0;
        width: 150px;
        height: 150px;
        background-color: skyblue;
        z-index: 5;
      }
    </style>
  </head>
  <body>
    <div class="father">
      <div class="son">
      </div>
    </div>
    <div class="fuqin">
      <div class="erzi">
      </div>
    </div>
```
:::
- 如果父级设置了z­index值，无论子级值是多少，都是父级的值大的子级压盖父级值小的子级，俗称“从父效应”。
<img src="/images/css/111.png" style="width: 50%; display: block; margin: 0 ;">


:::details
```css{13,22,31,40}
    <style>
      * {
        padding: 0;
        margin: 0;
      }
      .father {
        position: absolute;
        top: 0;
        left: 0;
        width: 200px;
        height: 200px;
        border: 10px solid red;
        z-index: 10;
      }
      .son {
        position: absolute;
        top: 0;
        left: 0;
        width: 150px;
        height: 150px;
        background-color: pink;
        z-index: 20;
      }
      .fuqin {
        position: absolute;
        top: 0;
        left: 0;
        width: 200px;
        height: 200px;
        border: 10px solid yellowgreen;
        z-index: 15;
      }
      .erzi {
        position: absolute;
        top: 0;
        left: 0;
        width: 150px;
        height: 150px;
        background-color: skyblue;
        z-index: 21;
      }
    </style>
  </head>
  <body>
    <div class="father">
      <div class="son">
      </div>
    </div>
    <div class="fuqin">
      <div class="erzi">
      </div>
    </div>
```
:::

案例：轮播图静态结构。
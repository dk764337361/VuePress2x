# 浮动的元素依次贴边

浮动属性值：left、right。

浮动方向设置不同，进行布局时，加载位置方向不同。

以 left 为例：

父元素宽度足够，所有子元素会按照 HTML 书写顺序，依次向左进行贴边，父元素左边 ← 子元素 1← 子元素 2← 子元素 3← 子元素 4。

- 父元素宽度如果不够，例如不能放下一个子元素 4，那么子元素 4 在贴边时，会跳过上一个子元素 3，向更上一个子元素 2 进行贴边，如果子元素 2 后面位置不够，继续跳过子元素 2 向前面的子元素 1 进行贴边。

<img src="/images/css/037.png" style="width: 40%; display: block; margin: 0 ;">

- 如果子元素 4 在跳过子元素 3 向更前面的子元素 2 贴边时，子元素 2 的高度不高于子元素 3，子元素 2 没有延伸出一个高度的边让子元素 4 贴边，那么子元素 4 就会跳过子元素 2 向子元素 1 进行贴边。

<img src="/images/css/038.png" style="width: 40%; display: block; margin: 0 ;">

- 如果贴边的这个子元素 4 宽度小于子元素 2，子元素 2 的高度低于子元素 1 和子元素 3，形成一个凹陷，子元素 4 会受前面子元素 3 高度影响，不会出现钻空现象。

<img src="/images/css/039.png" style="width: 40%; display: block; margin: 0 ;">

- 如果子元素 1 后面的距离也放不下子元素 4，子元素 4 最终会贴到父元素左边，如果子元素 4 的宽度超过了父元素，只会出现溢出现象。

<img src="/images/css/040.png" style="width: 40%; display: block; margin: 0 ;">

- 应用：利用浮动依次贴边的性质，用列表结构模拟表格布局结构。
  <img src="/images/css/041.png" style="width: 100%; display: block; margin: 0 ;">
::: details 点击查看代码
```html{7,8}
<style>
  * {
    margin: 0;
    padding: 0;
  }
  .ulbox {
    padding-top: 2px;
    padding-left: 2px;
    margin-top: 100px;
    margin-left: 100px;
    width: 808px;
    height: 304px;
    background-color: rgb(194, 194, 194);
  }
  .ulbox li {
    list-style: none;
    line-height: 100px;
    text-align: center;
    margin-right: 2px;
    margin-bottom: 2px;
    float: left;
    width: 200px;
    height: 100px;
    background-color: rgb(10, 136, 240);
  }
</style>
<ul class="ulbox">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
  <li>6</li>
  <li>7</li>
  <li>8</li>
  <li>9</li>
  <li>10</li>
  <li>11</li>
  <li>12</li>
</ul>
```
:::

::: tip 提示
注意：同一个盒子中，可以有左浮动和右浮动的子盒子并存，子盒子会根据浮动方向，向上一个同方向的子盒子进行贴边，如果空间不够，也会发生之前依次贴边的各种情况。
:::


① 浮动依次贴边，可以完成多种网页布局效果

<img src="/images/css/042.png" style="width: 100%; display: block; margin: 0 ;">

::: details 点击查看代码：浮动依次贴边
```html
<style>
  .ulbox {
    margin-top: 100px;
    margin-left: 100px;
    background-color: rgb(175, 175, 175);
    width: 612px;
    height: 126px;
    padding-top: 2px;
    padding-left: 2px;
  }
  .ulbox li {
    list-style: none;
    margin-right: 2px;
    margin-bottom: 2px;
    line-height: 40px;
    text-align: center;
    height: 40px;
    background-color: rgb(12, 198, 231);
  }
  .ulleft {
    float: left;
    width: 100px;
  }

  .ulright4 {
    float: right;
    width: 100px;
  }
  .ulleft5 {
    float: left;
    width: 105px;
  }
  .ulright6 {
    float: right;
    width: 100px;
  }
  .ulright7 {
    float: right;
    width: 105px;
  }

  .ulright9 {
    float: right;
    width: 105px;
  }

  .ulright11 {
    float: right;
    width: 100px;
  }
</style>
<ul class="ulbox">
  <li class="ulleft">1</li>
  <li class="ulleft">2</li>
  <li class="ulleft">3</li>
  <li class="ulright4">4</li>
  <li class="ulleft5">5</li>
  <li class="ulright6">6</li>
  <li class="ulright7">7</li>
  <li class="ulleft">8</li>
  <li class="ulright9">9</li>
  <li class="ulleft">10</li>
  <li class="ulright11">11</li>
  <li class="ulleft">12</li>
</ul>
```
:::



② 导航栏效果。
<img src="/images/css/043.png" style="width: 100%; display: block; margin: 0 ;">
::: details 点击查看代码：导航栏效果
```html
<!-- ②导航栏效果。 -->
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        .Navul a {
            text-decoration:none;
            font-family: '微软雅黑';
            color: #777777;
            display:inline-block;

        }
        .NavLi{
            list-style: none;
            height: 48px;
            width: 161px;
            float: left;
            line-height: 48px;
            margin-right: 10px;
            text-align: center;
        }
        .NavLi:hover{
            background-color: black;
            /* color: white; */
        }
        a:hover{
            color: white;
        }

        .Navul {
            margin: 100px auto;
            width: 1200px;
            height: 48px;
            background-color: #E8E7E3;
        }
    </style>
</head>
<body>
    <ul class="Navul">
        <li class="NavLi"><a href="" target="_blank" title="点击查看源网页">HTML/CSS</li>
        <li class="NavLi"><a href="" target="_blank" title="点击查看源网页">JavaScript</li>
        <li class="NavLi"><a href="" target="_blank" title="点击查看源网页">Server Side</li>
        <li class="NavLi"><a href="" target="_blank" title="点击查看源网页">ASP.NET</li>
        <li class="NavLi"><a href="" target="_blank" title="点击查看源网页">XML</li>
        <li class="NavLi"><a href="" target="_blank" title="点击查看源网页">Web Services</li>
        <li class="NavLi"><a href="" target="_blank" title="点击查看源网页">Web Building</li>
    </ul>
</body>
```
:::

③ 常见的电商或企业网站布局。
<img src="/images/css/044.png" style="width: 100%; display: block; margin: 0 ;">


::: details 点击查看代码：常见的电商或企业网站布局
```html
<!-- ③ 常见的电商或企业网站布局。 -->
<style>
      * {
        margin: 0;
        padding: 0;
      }
      .box {
        margin-left: 100px;
        margin-top: 100px;
        padding: 10px;
        width: 940px;
        height: 440px;
        border: 2px solid black;
      }
      .box0 {
        float: left;
        background-color: #E968A1;
        width: 300px;
        height: 260px;
      }
      .box1 {
        float: left;
        background-color: #80CEF5;
        width: 240px;
        height: 260px;
      }
      .box2 {
        float: left;
        background-color: #FEF898;
        width: 200px;
        height: 130px;
      }
      .box3 {
        float: left;
        background-color: #89C995;
        width: 200px;
        height: 130px;
      }
      .box4 {
        float: left;
        background-color: #89C995;
        width: 200px;
        height: 130px;
      }
      .box5 {
        float: left;
        background-color: #FEF898;
        width: 200px;
        height: 130px;
      }
      .box6 {
        float: left;
        background-color: #99BFFD;
        width: 300px;
        height: 180px;
      }
      .box7 {
        float: left;
        background-color: #D899FF;
        width: 160px;
        height: 180px;
      }
      .box8 {
        float: left;
        background-color: #B4FE9B;
        width: 160px;
        height: 180px;
      }
      .box9 {
        float: left;
        background-color: #D899FF;
        width: 160px;
        height: 180px;
      }
      .box10 {
        float: left;
        background-color: #B4FE9B;
        width: 160px;
        height: 180px;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="box0"></div>
      <div class="box1"></div>
      <div class="box2"></div>
      <div class="box3"></div>
      <div class="box4"></div>
      <div class="box5"></div>
      <div class="box6"></div>
      <div class="box7"></div>
      <div class="box8"></div>
      <div class="box9"></div>
      <div class="box10"></div>
    </div>
  </body>
```
:::

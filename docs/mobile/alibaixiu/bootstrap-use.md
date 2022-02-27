# bootstrap 的使用方法

现阶段我们还没有接触 JS 相关课程，所以我们只考虑使用它的样式库。
控制权在框架本身，使用者要按照框架所规定的某种规范进行开发。

bootstrap 使用四部曲：

## 1. 创建文件夹结构

<img src="/images/mobile/bootstrap/003.png" style="width: 100%; display:inline-block; margin: 0 ;">

## 2. 创建 html 骨架结构

```html
<!-- 要求当前网页使用IE浏览器最高版本的内核来渲染 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<!-- 视口的设置：视口的宽度和设备一致，默认的缩放比例和PC端一致，用户不能自行缩放 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
  ,
  user-scalable="no"
/>
<!-- [if it IE9] -->
<!-- 解决IE9以下浏览器对HTML5新增标签的不识别，并导致CSS不起作用的问题 -->
<script src="https://cdn.jsdelivr.net/npm/html5shiv@3.7.3/dist/html5shiv.min.js"></script>
<!-- 解决IE9以下浏览器对css3 Media Query的不识别 -->
<script src="https://cdn.jsdelivr.net/npm/respond.js@1.4.2/dest/respond.min.js"></script>
<!-- endif -->
```

## 3. 引入相关样式文件

```html
<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css" />
```

## 4. 书写内容

- 直接拿 Bootstrap 预先定义好的样式来使用。
- 修改 Bootstrap 原先的样式，注意权重问题。

```html
    <style>
      button.we-btn {
        background-color: greenyellow;
      }
    </style>
  </head>
  <body>
    <!-- https://v3.bootcss.com/css/#buttons -->
    <!-- Provides extra visual weight and identifies the primary action in a set of buttons -->
    <button type="button" class="btn btn-primary we-btn">（首选项）Primary</button>
  </body>
```

- 学好 Bootstrap 的关键在于知道它定义了那些样式，以及这些样式能实现什么样的效果。

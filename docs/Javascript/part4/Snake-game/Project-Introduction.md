# 项目介绍

## 目标

游戏的目的是用来体会 JavaScript 高级语法的使用，暂时不需要具备抽象对象的能力。使用面向对象的方式分析问题，需要一个漫长的积累过程。

<img src="/images/Javascript/object/Greedy-snake.gif" style="width: 70%; display:inline-block; margin: 0 ;">

## 搭建页面结构

```
Greedy snake
    ├─── index.html
    ├─── css
    │    └── index.css
    └─── js
         ├── food.js
         ├── game.js
         └── index.js
         └── index.min.js
         └── index.min.js
         └── main.js
         └── snake.js
         └── tools.js
```

## 搭建页面

放一个容器盛放游戏场景 div#map，设置样式#map

- index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="css/index.css">
</head>
<body>
  <div class="map" id="map"></div>
  <!-- 引入多个 js 文件 -->
  <script src="js/tools.js"></script>
  <script src="js/food.js"></script>
  <script src="js/snake.js"></script>
  <script src="js/game.js"></script>
  <script src="js/main.js"></script>

  <!-- 为了进行性能优化，需要减少浏览器发送 HTTP 请求的次数 -->
  <!-- <script src="js/index.js"></script> -->
  <!-- <script src="js/index.js"></script> -->
</body>
</html>
```

- index.css

```css
* {
  margin: 0;
  padding: 0;
}
.map {
  position: relative;
  width: 800px;
  height: 600px;
  background-color: lightgray;
}
```

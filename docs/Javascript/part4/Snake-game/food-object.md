# 食物对象

## 分析对象

- 游戏对象 Game
- 蛇对象 Snake
- 食物对象 Food

## 目标与逻辑过程

1. 创建 Food 的构造函数，并设置属性
  - x
  - y
  - width
  - height
  - color
2. 通过原型设置方法
  - render 随机创建一个食物对象，并输出到 map 上
3. 通过自调用函数，进行封装，通过 window 暴露 Food 对象

### 引入 JS 文件

- index.html 引入 JS 文件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="css/index.css" />
  </head>
  <body>
    <div class="map" id="map"></div>
    <!-- 引入多个 js 文件 -->
    <script src="js/tools.js"></script>
    <script src="js/food.js"></script>
  </body>
</html>
```

- 创建 tool.js

```js
// 制作一个工具对象，内部添加多种工具的方法
var Tools = {
  // 获取一个范围内部的随机整数
  getRandom: function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
  },
  // 获取随机颜色的方法
  getColor: function() {
    // rgb(r,g,b)  三个色值的颜色可以随机获取 0-255 之间的数字
    // 获取三个色值
    var r = this.getRandom(0, 255);
    var g = this.getRandom(0, 255);
    var b = this.getRandom(0, 255);
    // 返回一个 颜色值
    return "rgb(" + r + "," + g + "," + b + ")";
  },
};
```

## 创建食物对象

- food.js

```js
// 全局的变量(position后期不改变，所以把绝对位置做成全局变量)
var ps = "absolute";

// 创建 食物 的构造函数
function Food(option) {
  // 避免传入的参数数据类型不对，或者没有传参
  option = option instanceof Object ? option : {};
  // 传入的数据可能是类似数组等对象，所以需要进一步判断
  this.width = option.width || 20;
  this.height = option.height || 20;
  this.x = option.x || 0;
  this.y = option.y || 0;
  this.color = option.color || "green";
}

// 渲染一个元素到页面之上，需要添加到原型对象的方法中
Food.prototype.render = function(map) {
  // 创建一个新的 div 元素
  var ele = document.createElement("div");
  // 添加对应的样式
  ele.style.width = this.width + "px";
  ele.style.height = this.height + "px";
  ele.style.left = this.x + "px";
  ele.style.top = this.y + "px";
  ele.style.backgroundColor = this.color;
  ele.style.position = ps;
  // 让新元素添加到指定的父级中
  map.appendChild(ele);
};

//获取父级地图元素
var map = document.getElementById("map");
//测试
var food = new Food();
food.render();
```

## 食物对象的随机位置

- food.js

```js{20-22}
// 全局的变量(position后期不改变，所以把绝对位置做成全局变量)
var ps = "absolute";

// 创建 食物 的构造函数
function Food(option) {
  // 避免传入的参数数据类型不对，或者没有传参
  option = option instanceof Object ? option : {};
  // 传入的数据可能是类似数组等对象，所以需要进一步判断
  this.width = option.width || 20;
  this.height = option.height || 20;
  this.x = option.x || 0;
  this.y = option.y || 0;
  this.color = option.color || "green";
}

// 渲染一个元素到页面之上，需要添加到原型对象的方法中
Food.prototype.render = function(map) {
  // 创建一个新的 div 元素
  var ele = document.createElement("div");
  // 每次设置样式之前，都随机获取一个 x 和 y 的值
  this.x = Tools.getRandom(0, map.clientWidth / this.width - 1) * this.width;
  this.y = Tools.getRandom(0, map.clientHeight / this.height - 1) * this.height;
  // 添加对应的样式
  ele.style.width = this.width + "px";
  ele.style.height = this.height + "px";
  ele.style.left = this.x + "px";
  ele.style.top = this.y + "px";
  ele.style.backgroundColor = this.color;
  ele.style.position = ps;
  // 让新元素添加到指定的父级中
  map.appendChild(ele);
};

//获取父级地图元素
var map = document.getElementById("map");
//测试
var food = new Food();
food.render();
```

## 删除食物元素

- food.js

```js{14-15,34-35,38-45}
// 全局的变量(position后期不改变，所以把绝对位置做成全局变量)
var ps = "absolute";

// 创建 食物 的构造函数
function Food(option) {
  // 避免传入的参数数据类型不对，或者没有传参
  option = option instanceof Object ? option : {};
  // 传入的数据可能是类似数组等对象，所以需要进一步判断
  this.width = option.width || 20;
  this.height = option.height || 20;
  this.x = option.x || 0;
  this.y = option.y || 0;
  this.color = option.color || "green";
  // 增加一个属性，存储将来这个对象渲染出来的所有 div 元素
  this.elements = [];
}

// 渲染一个元素到页面之上，需要添加到原型对象的方法中
Food.prototype.render = function(map) {
  // 创建一个新的 div 元素
  var ele = document.createElement("div");
  // 每次设置样式之前，都随机获取一个 x 和 y 的值
  this.x = Tools.getRandom(0, map.clientWidth / this.width - 1) * this.width;
  this.y = Tools.getRandom(0, map.clientHeight / this.height - 1) * this.height;
  // 添加对应的样式
  ele.style.width = this.width + "px";
  ele.style.height = this.height + "px";
  ele.style.left = this.x + "px";
  ele.style.top = this.y + "px";
  ele.style.backgroundColor = this.color;
  ele.style.position = ps;
  // 让新元素添加到指定的父级中
  map.appendChild(ele);
  // 将新元素添加的 数组中，方便后期调用删除
  this.elements.push(ele);
};

// 删除一个食物 div 元素
Food.prototype.remove = function(map, i) {
  // 可以通过一些方法获取要被删除的食物的下标
  // 将元素 从 html结构中删除
  map.removeChild(this.elements[i]);
  // 将元素 从 数组中删除
  this.elements.splice(i, 1);
};

//获取父级地图元素
var map = document.getElementById("map");
//测试
var food = new Food();
food.render();
```


## 自调用函数关注作用域

创建自调用函数（匿名函数），把food.js构造函数的全局变量`var ps = "absolute"`和全局函数`function Food()`放进自调用函数里，变成局部变量，避免造成全局命名污染。

- food.js

```js
// 需要去缩小定义 构造函数的作用
// 匿名函数,自调用函数，IIFE，关住作用域
(function () {
  // 全局的变量
  var ps = "absolute";

  // 创建 食物 的构造函数
  function Food(option) {
    // 避免传入的参数数据类型不对，或者没有传参
    option = option instanceof Object ? option : {};
    // 传入的数据可能是类似数组等对象，所以需要进一步判断
    this.width = option.width || 20;
    this.height = option.height || 20;
    this.x = option.x || 0;
    this.y = option.y || 0;
    this.color = option.color || "green";
    // 增加一个属性，存储将来这个对象渲染出来的所有 div 元素
    this.elements = [];
  }

  // 渲染一个元素到页面之上，需要添加到原型对象的方法中
  Food.prototype.render = function (map) {
    // 创建一个新的 div 元素
    var ele = document.createElement("div");
    // 每次设置样式之前，都随机获取一个 x 和 y 的值
    this.x = Tools.getRandom(0, map.clientWidth / this.width - 1) * this.width;
    this.y = Tools.getRandom(0, map.clientHeight / this.height - 1) * this.height;
    // 添加对应的样式
    ele.style.width = this.width + "px";
    ele.style.height = this.height + "px";
    ele.style.left = this.x + "px";
    ele.style.top = this.y + "px";
    ele.style.backgroundColor = this.color;
    ele.style.position = ps;
    // 让新元素添加到指定的父级中
    map.appendChild(ele);
    // 将新元素添加的 数组中，方便后期调用删除
    this.elements.push(ele);
  };

  // 删除一个食物 div 元素
  Food.prototype.remove = function (map, i) {
    // 可以通过一些方法获取要被删除的食物的下标
    // 将元素 从 html结构中删除
    map.removeChild(this.elements[i]);
    // 将元素 从 数组中删除
    this.elements.splice(i, 1);
  };

  // 利用 window 对象暴露 Food 函数可以给外部使用
  window.Food = Food;
})();
// 需要想办法在外面调用到这个 Food 函数

```
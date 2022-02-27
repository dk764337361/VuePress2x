# 案例：随机方块

  <img src="/images/Javascript/object/random-block.gif" style="width: 50%; display:inline-block; margin: 0 ;">


## 搭建页面结构

```
random blocks
    ├─── index.html
    ├─── css
    │    └── index.css
    └─── js
         ├── block.js
         └── index.js
         └── tools.js
```

- index.html

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
    <div class="stage" id="stage"></div>
    <script src="js/tools.js"></script>
    <script src="js/block.js"></script>
    <script src="js/index.js"></script>
  </body>
</html>
```

- index.css

```css
* {
  margin: 0;
  padding: 0;
}
.stage {
  position: relative;
  width: 800px;
  height: 600px;
  background-color: lightgray;
}
.stage div {
  position: absolute;
}
```

## 工具对象

- tools.js

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

## 方块对象

- block.js

```js
// 自定义一个 随机方块 的构造函数
function Block(parent, option) {
  // 设置方块的属性：宽度，高度，背景颜色，定位位置
  // 需要做一步操作，确保用户输入的是一个对象
  option = option || {};
  // 通过 this 添加属性
  this.width = option.width || 20;
  this.height = option.height || 20;
  this.backgroundColor = option.backgroundColor || "red";
  this.x = option.x || 0;
  this.y = option.y || 0;
  // 存储自己的父级到对象上
  this.parent = parent;
}
// 需要生成的随机方块对象，渲染到页面上，设置给原型对象
Block.prototype.render = function() {
  // 创建一个新的元素
  this.ele = document.createElement("div");
  // 需要添加给指定的父级
  this.parent.appendChild(this.ele);
  // 添加css样式
  this.ele.style.width = this.width + "px";
  this.ele.style.height = this.height + "px";
  this.ele.style.backgroundColor = this.backgroundColor;
  this.ele.style.left = this.x + "px";
  this.ele.style.top = this.y + "px";
};
```

## 随机颜色选择

- index.js

```js
// console.log(tools.getColor());
var stage = document.getElementById("stage");

// 循环添加是个方块到页面上
for (var i = 1; i <= 10; i++) {
  // 生成一个实例
  var block = new Block(stage, { backgroundColor: Tools.getColor() });
  block.render();
}
```

## 随机位置选择

- block.js

```js{28-37}
// 自定义一个 随机方块 的构造函数
function Block(parent,option) {
  // 设置方块的属性：宽度，高度，背景颜色，定位位置
  // 需要做一步操作，确保用户输入的是一个对象
  option = option || {};
  // 通过 this 添加属性
  this.width = option.width || 20;
  this.height = option.height || 20;
  this.backgroundColor = option.backgroundColor || "red";
  this.x = option.x || 0;
  this.y = option.y || 0;
  // 存储自己的父级到对象上
  this.parent = parent;
}
// 需要生成的随机方块对象，渲染到页面上，设置给原型对象
Block.prototype.render = function () {
  // 创建一个新的元素
  this.ele = document.createElement("div");
  // 需要添加给指定的父级
  this.parent.appendChild(this.ele);
  // 添加css样式
  this.ele.style.width = this.width + "px";
  this.ele.style.height = this.height + "px";
  this.ele.style.backgroundColor = this.backgroundColor;
  this.ele.style.left = this.x + "px";
  this.ele.style.top = this.y + "px";
};
// 随机更改位置的方法
Block.prototype.positionRandom = function () {
  // 获取元素的坐标，随机的
  this.x = Tools.getRandom(0,this.parent.clientWidth / this.width - 1) * this.width;
  this.y = Tools.getRandom(0,this.parent.clientHeight / this.height - 1) * this.height;
  // 赋值给样式
  // 这个方法内部不能调用另外一个方法内部的变量
  this.ele.style.left = this.x + "px";
  this.ele.style.top = this.y + "px";
};
```

- index.js

```js{4-5,16-22}
// console.log(tools.getColor());
var stage = document.getElementById("stage");
    
// 通过一个空数组，记录添加的所有方块对象
var arr = [];
// 循环添加是个方块到页面上
for (var i = 1 ; i <= 10 ; i++) {
  // 生成一个实例
  var block = new Block(stage,{backgroundColor: Tools.getColor()});
  block.render();
  // 初始阶段就让元素随机位置
  block.positionRandom();
  // 数组中添加记录一项
  arr.push(block);
}
// 需要每隔一段时间让位置再次随机变化
// 开启定时器
setInterval(function () {
  for (var i = 0 ; i < arr.length ; i++) {
    arr[i].positionRandom();
  }
},1000);
```
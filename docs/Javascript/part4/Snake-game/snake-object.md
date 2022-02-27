# 创建蛇对象

## 目标与逻辑过程

1. 创建 Snake 的构造函数，并设置属性
   - width 蛇节的宽度 默认 20
   - height 蛇节的高度 默认 20
   - body 数组，蛇的头部和身体，第一个位置是蛇头
   - direction 蛇运动的方向 默认 right 可以是 left top bottom

2. 通过原型设置方法
   - render 随机创建一个蛇对象，并输出到 map 上

3. 通过自调用函数，进行封装，通过 window 暴露 Snake 对象

## 蛇对象-设置属性

- snake.js

```js
// 使用自调用函数关住作用域
(function() {
  // 创建 蛇 的构造函数
  function Snake(option) {
    // 避免传入的参数数据类型不对，或者没有传参
    option = option instanceof Object ? option : {};
    // 给对象添加属性
    // 设置蛇节的宽度和高度属性
    this.width = option.width || 20;
    this.height = option.height || 20;
    // 设置蛇身的数据
    this.body = [
      { x: 3, y: 2, color: "red" },
      { x: 2, y: 2, color: "blue" },
      { x: 1, y: 2, color: "blue" },
    ];
    // 设置蛇移动的方向,还可以设置为 left 、top 、bottom
    this.direction = "right";
  }
})();
```

## 蛇对象-render 方法

- snake.js

```js{4,23-44}
// 使用自调用函数关住作用域
(function () {
  // 全局变量
  var ps = "absolute";
  // 创建 蛇 的构造函数
  function Snake(option) {
    // 避免传入的参数数据类型不对，或者没有传参
    option = option instanceof Object ? option : {};
    // 给对象添加属性
    // 设置蛇节的宽度和高度属性
    this.width = option.width || 20;
    this.height = option.height || 20;
    // 设置蛇身的数据
    this.body = [
      { x: 3, y: 2, color: "red" },
      { x: 2, y: 2, color: "blue" },
      { x: 1, y: 2, color: "blue" }
    ];
    // 设置蛇移动的方向,还可以设置为 left 、top 、bottom
    this.direction = "right";

  }
  // 添加一个将元素渲染到页面上的方法
  Snake.prototype.render = function (map) {
    // 生成对应个数的 div 元素
    // 遍历数组
    for (var i = 0, len = this.body.length; i < len; i++) {
      // 根据数组的每一项的数据生成一个新的 div 元素
      var piece = this.body[i];
      // 创建新元素
      var ele = document.createElement("div");
      // 添加样式
      ele.style.width = this.width + "px";
      ele.style.height = this.height + "px";
      ele.style.left = piece.x * this.width + "px";
      ele.style.top = piece.y * this.height + "px";
      ele.style.position = ps;
      ele.style.backgroundColor = piece.color;
      // 渲染到指定的父级内部
      map.appendChild(ele);
  };

  // 通过 window 暴露构造函数
  window.Snake = Snake;
})();
```


# 创建游戏对象

## 目标与逻辑过程

1. 创建 Game 的构造函数，并设置属性
   - food
   - snake
   - map
2. 通过原型设置方法
   - start 开始游戏（绘制所有游戏对象，渲染食物对象和蛇对象）
3. 通过自调用函数，进行封装，通过 window 暴露 Game 对象

- game.js

```js
// 自调用函数封闭作用域
(function() {
  // 创建一个 游戏 的构造函数
  function Game(map) {
    // 设置三个属性，存储 食物、 蛇、地图
    this.food = new Food();
    this.snake = new Snake();
    this.map = map;
  }
  // 添加一个游戏开始的方法，方法内初始化蛇和食物
  Game.prototype.start = function() {
    // 1.添加蛇和食物到 地图上
    this.food.render(this.map);
    this.snake.render(this.map);
    // 2.让游戏逻辑开始
  };
  // 将构造函数通过 window 暴露
  window.Game = Game;
})();

// 测试
var map = document.getElementById("map");
var game = new Game(map);
game.start();
```

## 蛇的运动方法

### 游戏逻辑 1

写蛇的 move 方法

- 在蛇对象 (snake.js) 中，在 Snake 的原型上新增 move 方法

  - 1. 让蛇移动起来，把蛇身体的每一部分往前移动一下
  - 2. 蛇头部分根据不同的方向决定 往哪里移动

- snake.js

```js{42-70}
// 使用自调用函数关住作用域
(function() {
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
      { x: 1, y: 2, color: "blue" },
    ];
    // 设置蛇移动的方向,还可以设置为 left 、top 、bottom
    this.direction = "right";
  }
  // 添加一个将元素渲染到页面上的方法
  Snake.prototype.render = function(map) {
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
    }
  };
  // 添加 蛇 运动的方法
  Snake.prototype.move = function() {
    // 蛇身的每一节都要变成上一节的位置
    // 循环需要从最后一项开始，为了避免前面的数据提前发生变化
    for (var i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }
    // 存储一下蛇头的数据
    var head = this.body[0];
    // 蛇头要根据方向发生位置变化
    switch (this.direction) {
      case "right":
        head.x += 1;
        break;
      case "left":
        head.x -= 1;
        break;
      case "top":
        head.y -= 1;
        break;
      case "bottom":
        head.y += 1;
    }
  };
  // 通过 window 暴露构造函数
  window.Snake = Snake;
})();
```

- game.js

```js
// 自调用函数封闭作用域
(function() {
  // 创建一个 游戏 的构造函数
  function Game(map) {
    // 设置三个属性，存储 食物、 蛇、地图
    this.food = new Food();
    this.snake = new Snake();
    this.map = map;
  }
  // 添加一个游戏开始的方法，方法内初始化蛇和食物
  Game.prototype.start = function() {
    // 1.添加蛇和食物到 地图上
    this.food.render(this.map);
    this.snake.render(this.map);
    // 2.让游戏逻辑开始
    //让蛇运动起来
    this.snake.move();
    this.snake.render(this.map);
  };
  // 将构造函数通过 window 暴露
  window.Game = Game;
})();

// 测试
var map = document.getElementById("map");
var game = new Game(map);
game.start();
```

## 蛇的删除方法

- snake.js

```js{21-22,42-43}
// 使用自调用函数关住作用域
(function() {
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
      { x: 1, y: 2, color: "blue" },
    ];
    // 设置蛇移动的方向,还可以设置为 left 、top 、bottom
    this.direction = "right";
    // 添加一个元素的数组，存储所有渲染的 div
    this.elements = [];
  }
  // 添加一个将元素渲染到页面上的方法
  Snake.prototype.render = function(map) {
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
      // 将添加的新元素存在数组里
      this.elements.push(ele);
    }
  };
  // 添加 蛇 运动的方法
  Snake.prototype.move = function() {
    // 蛇身的每一节都要变成上一节的位置
    // 循环需要从最后一项开始，为了避免前面的数据提前发生变化
    for (var i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }
    // 存储一下蛇头的数据
    var head = this.body[0];
    // 蛇头要根据方向发生位置变化
    switch (this.direction) {
      case "right":
        head.x += 1;
        break;
      case "left":
        head.x -= 1;
        break;
      case "top":
        head.y -= 1;
        break;
      case "bottom":
        head.y += 1;
    }
  };
  // 删除上一次渲染的蛇的所有div元素
  Snake.prototype.remove = function(map) {
    // 遍历数组删除所有元素
    // 将元素从html结构中删掉
    for (var i = this.elements.length - 1; i >= 0; i--) {
      map.removeChild(this.elements[i]);
    }
    // 数组也需要进行清空
    this.elements = [];
  };

  // 通过 window 暴露构造函数
  window.Snake = Snake;
})();
```

- game.js

```js{18-19}
// 自调用函数封闭作用域
(function() {
  // 创建一个 游戏 的构造函数
  function Game(map) {
    // 设置三个属性，存储 食物、 蛇、地图
    this.food = new Food();
    this.snake = new Snake();
    this.map = map;
  }
  // 添加一个游戏开始的方法，方法内初始化蛇和食物
  Game.prototype.start = function() {
    // 1.添加蛇和食物到 地图上
    this.food.render(this.map);
    this.snake.render(this.map);
    // 2.让游戏逻辑开始
    //让蛇运动起来
    this.snake.move();
    //删掉上一次的蛇
    this.snake.remove(this.map);
    //渲染新位置的蛇
    this.snake.render(this.map);
  };
  // 将构造函数通过 window 暴露
  window.Game = Game;
})();

// 测试
var map = document.getElementById("map");
var game = new Game(map);
game.start();
```

## 蛇的运动和停止

### 游戏逻辑 2

让蛇自己动起来

- 在 snake 中添加删除蛇的私有方法，在 render 中调用
- 在 game.js 中添加 runSnake 的私有方法，开启定时器调用蛇的 move 和 render 方法，让蛇动起来
- 判断蛇是否撞墙
- 在 game.js 中添加 bindKey 的私有方法，通过键盘控制蛇的移动方向,在 start 方法中调用 bindKey

* game.js

```js{3-4,12,20-21,26-54}
// 自调用函数封闭作用域
(function() {
  // 定义一个全局变量，存储 this
  var that;

  // 创建一个 游戏 的构造函数
  function Game(map) {
    // 设置三个属性，存储 食物、 蛇、地图
    this.food = new Food();
    this.snake = new Snake();
    this.map = map;
    that = this;
  }
  // 添加一个游戏开始的方法，方法内初始化蛇和食物
  Game.prototype.start = function() {
    // 1.添加蛇和食物到 地图上
    this.food.render(this.map);
    this.snake.render(this.map);
    // 2.让游戏逻辑开始
    //2.1让蛇运动起来
    runSnake();
    // 2.2 通过上下左右箭头控制蛇的运动方向
    // 2.3 判断蛇头与食物是否碰撞，吃掉食物
  };

  // 封装一个私有函数，这个函数只能在模块内部进行调用
  function runSnake() {
    // 开启一个定时器，让蛇连续运动起来
    var timer = setInterval(function() {
      // 定时器函数内部的 this 指向的是 window
      // 让蛇运动起来
      that.snake.move();
      // 删掉上一次的蛇
      that.snake.remove(that.map);
      // 渲染新位置的蛇
      that.snake.render(that.map);
      // 记录一下最大的位置
      var maxX = that.map.offsetWidth / that.snake.width;
      var maxY = that.map.offsetHeight / that.snake.height;
      // 找到当前蛇头的位置
      var headX = that.snake.body[0].x;
      var headY = that.snake.body[0].y;

      // 每移动一次，都要判断是否出了地图，游戏是否结束
      // 2.4 判断是否超出地图范围，结束游戏
      // 进行判断
      if (headX < 0 || headX >= maxX || headY < 0 || headY >= maxY) {
        // 停止定时器
        clearInterval(timer);
        // 弹出提醒
        alert("Game over");
      }
    }, 150);
  }

  // 将构造函数通过 window 暴露
  window.Game = Game;
})();
// 测试
var map = document.getElementById("map");
var game = new Game(map);
game.start();
```

## 按键改变蛇的运动方向

- game.js

```js{22-23,27-52}
// 自调用函数封闭作用域
(function() {
  // 定义一个全局变量，存储 this
  var that;

  // 创建一个 游戏 的构造函数
  function Game(map) {
    // 设置三个属性，存储 食物、 蛇、地图
    this.food = new Food();
    this.snake = new Snake();
    this.map = map;
    that = this;
  }
  // 添加一个游戏开始的方法，方法内初始化蛇和食物
  Game.prototype.start = function() {
    // 1.添加蛇和食物到 地图上
    this.food.render(this.map);
    this.snake.render(this.map);
    // 2.让游戏逻辑开始
    //2.1让蛇运动起来
    runSnake();
    // 2.2 通过上下左右箭头控制蛇的运动方向
    bindKey();
    // 2.3 判断蛇头与食物是否碰撞，吃掉食物
  };

  // 封装一个私有函数，控制上下左右按键更改的方向
  function bindKey() {
    // 给文档绑定键盘按下事件
    document.onkeydown = function(e) {
      // console.log(e.keyCode);
      // 键盘的编码
      // 37 -- left
      // 38 -- top
      // 39 -- right
      // 40 -- bottom
      switch (e.keyCode) {
        case 37:
          that.snake.direction = "left";
          break;
        case 38:
          that.snake.direction = "top";
          break;
        case 39:
          that.snake.direction = "right";
          break;
        case 40:
          that.snake.direction = "bottom";
          break;
      }
    };
  }

  // 封装一个私有函数，这个函数只能在模块内部进行调用
  function runSnake() {
    // 开启一个定时器，让蛇连续运动起来
    var timer = setInterval(function() {
      // 定时器函数内部的 this 指向的是 window
      // 让蛇运动起来
      that.snake.move();
      // 删掉上一次的蛇
      that.snake.remove(that.map);
      // 渲染新位置的蛇
      that.snake.render(that.map);
      // 记录一下最大的位置
      var maxX = that.map.offsetWidth / that.snake.width;
      var maxY = that.map.offsetHeight / that.snake.height;
      // 找到当前蛇头的位置
      var headX = that.snake.body[0].x;
      var headY = that.snake.body[0].y;

      // 每移动一次，都要判断是否出了地图，游戏是否结束
      // 2.4 判断是否超出地图范围，结束游戏
      // 进行判断
      if (headX < 0 || headX >= maxX || headY < 0 || headY >= maxY) {
        // 停止定时器
        clearInterval(timer);
        // 弹出提醒
        alert("Game over");
      }
    }, 150);
  }

  // 将构造函数通过 window 暴露
  window.Game = Game;
})();
// 测试
var map = document.getElementById("map");
var game = new Game(map);
game.start();
```

## 吃到食物和增加蛇节操作

### 游戏逻辑 3

判断蛇是否吃到食物

- 在 Snake 的 move 方法中判断在移动的过程中蛇是否吃到食物
- 如果蛇头和食物的位置重合代表吃到食物
- 食物的坐标是像素，蛇的坐标是几个宽度，需要进行转换
- 吃到食物，往蛇节的最后加一节
- 最后把现在的食物对象删除，并重新随机渲染一个食物对象

* game.js

```js{71-92}
// 自调用函数封闭作用域
(function() {
  // 定义一个全局变量，存储 this
  var that;

  // 创建一个 游戏 的构造函数
  function Game(map) {
    // 设置三个属性，存储 食物、 蛇、地图
    this.food = new Food();
    this.snake = new Snake();
    this.map = map;
    that = this;
  }
  // 添加一个游戏开始的方法，方法内初始化蛇和食物
  Game.prototype.start = function() {
    // 1.添加蛇和食物到 地图上
    this.food.render(this.map);
    this.snake.render(this.map);
    // 2.让游戏逻辑开始
    //2.1让蛇运动起来
    runSnake();
    // 2.2 通过上下左右箭头控制蛇的运动方向
    bindKey();
    // 2.3 判断蛇头与食物是否碰撞，吃掉食物
  };

  // 封装一个私有函数，控制上下左右按键更改的方向
  function bindKey() {
    // 给文档绑定键盘按下事件
    document.onkeydown = function(e) {
      // console.log(e.keyCode);
      // 键盘的编码
      // 37 -- left
      // 38 -- top
      // 39 -- right
      // 40 -- bottom
      switch (e.keyCode) {
        case 37:
          that.snake.direction = "left";
          break;
        case 38:
          that.snake.direction = "top";
          break;
        case 39:
          that.snake.direction = "right";
          break;
        case 40:
          that.snake.direction = "bottom";
          break;
      }
    };
  }

  // 封装一个私有函数，这个函数只能在模块内部进行调用
  function runSnake() {
    // 开启一个定时器，让蛇连续运动起来
    var timer = setInterval(function() {
      // 定时器函数内部的 this 指向的是 window
      // 让蛇运动起来
      that.snake.move();
      // 删掉上一次的蛇
      that.snake.remove(that.map);
      // 渲染新位置的蛇
      that.snake.render(that.map);
      // 记录一下最大的位置
      var maxX = that.map.offsetWidth / that.snake.width;
      var maxY = that.map.offsetHeight / that.snake.height;
      // 找到当前蛇头的位置
      var headX = that.snake.body[0].x;
      var headY = that.snake.body[0].y;
      // 每一次蛇走到新的位置，都要判断一下是否吃到食物了
      // 2.3 判断蛇头与食物是否碰撞，吃掉食物 ，让自己增加一节
      // 记录一下食物的坐标
      var foodX = that.food.x;
      var foodY = that.food.y;
      // 获取蛇头的具体坐标位置，px值
      var hX = headX * that.snake.width;
      var hY = headY * that.snake.height;
      // 判断
      if (foofX === hX && foodY === hY) {
        // 吃到了食物
        // 让食物删除，然后渲染一个新的食物
        that.food.remove(that.map, 0);
        that.food.render(that.map);
        // 添加一个新的蛇节
        var last = that.snake.body[that.snake.body.length - 1];
        that.snake.body.push({
          x: last.x,
          y: last.y,
          color: last.color,
        });
      }
      // 每移动一次，都要判断是否出了地图，游戏是否结束
      // 2.4 判断是否超出地图范围，结束游戏
      // 进行判断
      if (headX < 0 || headX >= maxX || headY < 0 || headY >= maxY) {
        // 停止定时器
        clearInterval(timer);
        // 弹出提醒
        alert("Game over");
      }
    }, 150);
  }

  // 将构造函数通过 window 暴露
  window.Game = Game;
})();
// 测试
var map = document.getElementById("map");
var game = new Game(map);
game.start();
```

## 吃到食物的个数

- game.js

```js{71-93}
// 自调用函数封闭作用域
(function() {
  // 定义一个全局变量，存储 this
  var that;

  // 创建一个 游戏 的构造函数
  function Game(map) {
    // 设置三个属性，存储 食物、 蛇、地图
    this.food = new Food();
    this.snake = new Snake();
    this.map = map;
    that = this;
  }
  // 添加一个游戏开始的方法，方法内初始化蛇和食物
  Game.prototype.start = function() {
    // 1.添加蛇和食物到 地图上
    //1.1创建三个随机食物
    this.food.render(this.map);
    this.food.render(this.map);
    this.food.render(this.map);
    // 1.2让蛇动起来
    this.snake.render(this.map);
    // 2.让游戏逻辑开始
    //2.1让蛇运动起来
    runSnake();
    // 2.2 通过上下左右箭头控制蛇的运动方向
    bindKey();
    // 2.3 判断蛇头与食物是否碰撞，吃掉食物
  };

  // 封装一个私有函数，控制上下左右按键更改的方向
  function bindKey() {
    // 给文档绑定键盘按下事件
    document.onkeydown = function(e) {
      // console.log(e.keyCode);
      // 键盘的编码
      // 37 -- left
      // 38 -- top
      // 39 -- right
      // 40 -- bottom
      switch (e.keyCode) {
        case 37:
          that.snake.direction = "left";
          break;
        case 38:
          that.snake.direction = "top";
          break;
        case 39:
          that.snake.direction = "right";
          break;
        case 40:
          that.snake.direction = "bottom";
          break;
      }
    };
  }

  // 封装一个私有函数，这个函数只能在模块内部进行调用
  function runSnake() {
    // 开启一个定时器，让蛇连续运动起来
    var timer = setInterval(function() {
      // 定时器函数内部的 this 指向的是 window
      // 让蛇运动起来
      that.snake.move();
      // 删掉上一次的蛇
      that.snake.remove(that.map);
      // 渲染新位置的蛇
      that.snake.render(that.map);
      // 记录一下最大的位置
      var maxX = that.map.offsetWidth / that.snake.width;
      var maxY = that.map.offsetHeight / that.snake.height;
      // 找到当前蛇头的位置
      var headX = that.snake.body[0].x;
      var headY = that.snake.body[0].y;
      // 每一次蛇走到新的位置，都要判断一下是否吃到食物了
      // 2.3 判断蛇头与食物是否碰撞，吃掉食物 ，让自己增加一节
      // 记录一下食物的坐标
      //   var foodX = that.food.x;
      //   var foodY = that.food.y;
      // 获取蛇头的具体坐标位置，px值
      var hX = headX * that.snake.width;
      var hY = headY * that.snake.height;
      // 判断
      // 将食物的数组中每一个都要进行对比，谁被吃掉，删除自己，渲染一个新的元素
      for (var i = 0; i < that.food.elements.length; i++) {
        if (
          that.food.elements[i].offsetLeft === hX &&
          that.food.elements[i].offsetTop === hY
        ) {
          // 吃到了食物
          // 让食物删除，然后渲染一个新的食物
          that.food.remove(that.map, i);
          that.food.render(that.map);
          // 添加一个新的蛇节
          var last = that.snake.body[that.snake.body.length - 1];
          that.snake.body.push({
            x: last.x,
            y: last.y,
            color: last.color,
          });
        }
      }
      // 每移动一次，都要判断是否出了地图，游戏是否结束
      // 2.4 判断是否超出地图范围，结束游戏
      // 进行判断
      if (headX < 0 || headX >= maxX || headY < 0 || headY >= maxY) {
        // 停止定时器
        clearInterval(timer);
        // 弹出提醒
        alert("Game over");
      }
    }, 150);
  }

  // 将构造函数通过 window 暴露
  window.Game = Game;
})();
// 测试
var map = document.getElementById("map");
var game = new Game(map);
game.start();
```

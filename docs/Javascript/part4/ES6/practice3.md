# 用ES6重构贪吃蛇

## Html
### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="css/index.css" />
  </head>
  <body>
    <div class="map" id="map"></div>
    <!-- <script src="js/common.js"></script>
    <script src="js/tools.js"></script>
    <script src="js/snake.js"></script>
    <script src="js/food.js"></script>
    <script src="js/game.js"></script>
    <script src="js/main.js"></script> -->
    
    <!-- <script src="js/index.js"></script>  -->
    <script src="js/index.min.js"></script> 
  </body>
</html>
```

## JS

### common.js
```js
// 定义一个获取元素的函数
function my$(id) {
  return document.getElementById(id);
}
function getName$(id) {
  return document.getElementsByTagName(id);
}
function getClass$(id) {
  return document.getElementsByClassName(id);
}

// DOM 2 级事件绑定方式
// 自己制作一个兼容所有浏览器的绑定事件的函数
// 参数：事件源，事件类型，事件函数
function addEvent(ele, type, fn) {
  // IE 9 及以上的浏览器和其他浏览器，使用 addEventListener 方法
  // IE 9 以下的浏览器，使用 attachEvent 方法
  // 浏览器能力检测
  if (ele.addEventListener) {
    ele.addEventListener(type, fn);
  } else if (ele.attachEvent) {
    ele.attachEvent("on" + type, fn);
  }
}

// 兼容所有浏览器的 解除绑定事件的函数
// 参数：事件源，事件类型，事件函数
function removeEvent(ele, type, fn) {
  // 浏览器能力检测
  if (ele.removeEventListener) {
    ele.removeEventListener(type, fn);
  } else if (ele.detachEvent) {
    ele.detachEvent("on" + type, fn);
  }
}
```

### food.js
```js
(() => {
  const position = "absolute";
  class Food {
    constructor(options) {
      options = options || {};
      this.width = options.width || 20;
      this.height = options.height || 20;
      this.x = options.x || 0;
      this.y = options.y || 0;
      this.color = options.color || "black";
      this.length = options.length || 3;
      this.position = position;
      this.elemntArr = [];
    }
    render(map) {
      const div = document.createElement("div");
      this.x =
        Tools.getRandom(0, map.clientWidth / this.width - 1) * this.width;
      this.y =
        Tools.getRandom(0, map.clientHeight / this.height - 1) * this.height;
      div.style.width = this.width + "px";
      div.style.height = this.height + "px";
      div.style.backgroundColor = this.color;
      div.style.position = this.position;
      div.style.left = this.x + "px";
      div.style.top = this.y + "px";
      map.appendChild(div);
      this.elemntArr.push(div);
      // console.log(this.elemntArr)
    }
    remove(map, i) {
      map.removeChild(this.elemntArr[i]);
      this.elemntArr.splice(i, 1);
    }
  }
  window.Food = Food;
})();
```
### game.js
```js
(() => {
  class Game {
    constructor(map) {
      this.food = new Food();
      this.snake = new Snake();
      this.map = map;
    }
    start() {
      this.food.render(this.map);
      this.food.render(this.map);
      this.food.render(this.map);
      this.bindkey();
      this.runsnake();
      this.snake.render(this.map);
    }
    runsnake() {
      let timer = setInterval(() => {
        this.snake.move();
        this.snake.remove(this.map);
        this.snake.render(this.map);

        // 最大的位置
        let maxX = this.map.clientWidth / this.snake.width;
        let maxY = this.map.clientHeight / this.snake.height;
        //蛇头的位置
        let headX = this.snake.body[0].x;
        let headY = this.snake.body[0].y;

        let snakeHeadX = headX * this.snake.width;
        let snakeHeadY = headY * this.snake.height;
        if (headX < 0 || headX >= maxX || headY < 0 || headY >= maxY) {
          clearInterval(timer);
          alert("Game over");
        }
        for (var i = 0; i < this.food.elemntArr.length; i++) {
          if (
            snakeHeadX === this.food.elemntArr[i].offsetLeft &&
            snakeHeadY === this.food.elemntArr[i].offsetTop
          ) {
            this.food.remove(this.map, i);
            this.food.render(this.map);
            let lastfood = this.snake.body[this.snake.body.length - 1];
            this.snake.body.push({
              x: lastfood.x,
              y: lastfood.y,
              color: lastfood.color,
            });
          }
        }
      }, 200);
    }
    bindkey() {
      document.onkeydown = (e) => {
        switch (e.keyCode) {
          case 37:
            this.snake.direction = "left";
            break;
          case 38:
            this.snake.direction = "top";
            break;
          case 39:
            this.snake.direction = "right";
            break;
          case 40:
            this.snake.direction = "bottom";
            break;
        }
      };
    }
  }
  window.Game = Game;
  //   const map = my$("map");
  //   const games = new Game(map);
  //   games.bindkey();
  //   games.runsnake();
  //   games.start();
})();
```

### tools.js
```js
(() => {
  // 制作一个工具对象，内部添加多种工具的方法
  var Tools = {
    // 获取一个范围内部的随机整数
    getRandom: (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
    },
    // getPosition: function (max) {
    //   let arr = [];
    //   for (let i = 0; i <=max; i++) {
    //     if (i % 20 == 0) {
    //       arr.push(i);
    //     }
    //   }
    //   let index = Math.floor(Math.random() * arr.length);
    //   return arr[index];
    // },
    // 获取随机颜色的方法
    getColor: () => {
      // rgb(r,g,b)  三个色值的颜色可以随机获取 0-255 之间的数字
      // 获取三个色值
      var r = this.getRandom(0, 255);
      var g = this.getRandom(0, 255);
      var b = this.getRandom(0, 255);
      // 返回一个 颜色值
      return "rgb(" + r + "," + g + "," + b + ")";
    },
  };
  window.Tools = Tools;
})();

```

### main.js
```js
(() => {
  const map = my$("map");
  const games = new Game(map);
  games.start();
})();

```

### snake.js
```js
(() => {
  const position = "absolute";
  class Snake {
    constructor(options) {
      options = options || {};
      this.width = options.width || 20;
      this.height = options.height || 20;
      this.color = options.color;
      this.length = options.length || 3;
      this.x = options.x;
      this.y = options.y;
      this.position = position;
      this.body = [
        { x: 3, y: 2, color: "red" },
        { x: 2, y: 2, color: "blue" },
        { x: 1, y: 2, color: "blue" },
      ];
      this.direction = "right";
      this.elements = [];
    }

    render(map) {
      for (let i = 0; i < this.body.length; i++) {
        let elemt = document.createElement("div");
        elemt.style.width = this.width + "px";
        elemt.style.height = this.height + "px";
        elemt.style.backgroundColor = this.body[i].color;
        elemt.style.position = this.position;
        elemt.style.left = this.body[i].x * this.width + "px";
        elemt.style.top = this.body[i].y * this.height + "px";
        elemt.style.position = this.position;
        map.appendChild(elemt);
        this.elements.push(elemt);
      }
    }
    move() {
      for (let i = this.body.length - 1; i > 0; i--) {
        this.body[i].x = this.body[i - 1].x;
        this.body[i].y = this.body[i - 1].y;
      }
      var head = this.body[0];
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
    remove(map) {
      for (let i = this.elements.length - 1; i >= 0; i--) {
        map.removeChild(this.elements[i]);
      }
      this.elements = [];
    }
  }
  window.Snake = Snake;
})();
```


### index.js
```js

// ================common.js===================
// 定义一个获取元素的函数
function my$(id) {
    return document.getElementById(id);
  }
  function getName$(id) {
    return document.getElementsByTagName(id);
  }
  function getClass$(id) {
    return document.getElementsByClassName(id);
  }
  
  // DOM 2 级事件绑定方式
  // 自己制作一个兼容所有浏览器的绑定事件的函数
  // 参数：事件源，事件类型，事件函数
  function addEvent(ele, type, fn) {
    // IE 9 及以上的浏览器和其他浏览器，使用 addEventListener 方法
    // IE 9 以下的浏览器，使用 attachEvent 方法
    // 浏览器能力检测
    if (ele.addEventListener) {
      ele.addEventListener(type, fn);
    } else if (ele.attachEvent) {
      ele.attachEvent("on" + type, fn);
    }
  }
  
  // 兼容所有浏览器的 解除绑定事件的函数
  // 参数：事件源，事件类型，事件函数
  function removeEvent(ele, type, fn) {
    // 浏览器能力检测
    if (ele.removeEventListener) {
      ele.removeEventListener(type, fn);
    } else if (ele.detachEvent) {
      ele.detachEvent("on" + type, fn);
    }
  }
// ================tools=======================
(() => {
    // 制作一个工具对象，内部添加多种工具的方法
    var Tools = {
      // 获取一个范围内部的随机整数
      getRandom: (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
      },
      // 获取随机颜色的方法
      getColor: () => {
        // rgb(r,g,b)  三个色值的颜色可以随机获取 0-255 之间的数字
        // 获取三个色值
        var r = this.getRandom(0, 255);
        var g = this.getRandom(0, 255);
        var b = this.getRandom(0, 255);
        // 返回一个 颜色值
        return "rgb(" + r + "," + g + "," + b + ")";
      },
    };
    window.Tools = Tools;
  })();
// ================Food=======================
(() => {
  const position = "absolute";
  class Food {
    constructor(options) {
      options = options || {};
      this.width = options.width || 20;
      this.height = options.height || 20;
      this.x = options.x || 0;
      this.y = options.y || 0;
      this.color = options.color || "black";
      this.length = options.length || 3;
      this.position = position;
      this.elemntArr = [];
    }
    render(map) {
      const div = document.createElement("div");
      this.x =
        Tools.getRandom(0, map.clientWidth / this.width - 1) * this.width;
      this.y =
        Tools.getRandom(0, map.clientHeight / this.height - 1) * this.height;
      div.style.width = this.width + "px";
      div.style.height = this.height + "px";
      div.style.backgroundColor = this.color;
      div.style.position = this.position;
      div.style.left = this.x + "px";
      div.style.top = this.y + "px";
      map.appendChild(div);
      this.elemntArr.push(div);
      // console.log(this.elemntArr)
    }
    remove(map, i) {
      map.removeChild(this.elemntArr[i]);
      this.elemntArr.splice(i, 1);
    }
  }
  window.Food = Food;
})();

// ================Snake=======================
(() => {
  const position = "absolute";
  class Snake {
    constructor(options) {
      options = options || {};
      this.width = options.width || 20;
      this.height = options.height || 20;
      this.color = options.color;
      this.length = options.length || 3;
      this.x = options.x;
      this.y = options.y;
      this.position = position;
      this.body = [
        { x: 3, y: 2, color: "red" },
        { x: 2, y: 2, color: "blue" },
        { x: 1, y: 2, color: "blue" },
      ];
      this.direction = "right";
      this.elements = [];
    }

    render(map) {
      for (let i = 0; i < this.body.length; i++) {
        let elemt = document.createElement("div");
        elemt.style.width = this.width + "px";
        elemt.style.height = this.height + "px";
        elemt.style.backgroundColor = this.body[i].color;
        elemt.style.position = this.position;
        elemt.style.left = this.body[i].x * this.width + "px";
        elemt.style.top = this.body[i].y * this.height + "px";
        elemt.style.position = this.position;
        map.appendChild(elemt);
        this.elements.push(elemt);
      }
    }
    move() {
      for (let i = this.body.length - 1; i > 0; i--) {
        this.body[i].x = this.body[i - 1].x;
        this.body[i].y = this.body[i - 1].y;
      }
      var head = this.body[0];
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
    }
    remove(map) {
      for (let i = this.elements.length - 1; i >= 0; i--) {
        map.removeChild(this.elements[i]);
      }
      this.elements = [];
    }
  }
  window.Snake = Snake;
})();

// ================Game=======================
(() => {
  class Game {
    constructor(map) {
      this.food = new Food();
      this.snake = new Snake();
      this.map = map;
    }
    start() {
      this.food.render(this.map);
      this.food.render(this.map);
      this.food.render(this.map);
      this.bindkey();
      this.runsnake();
      this.snake.render(this.map);
    }
    runsnake() {
      let timer = setInterval(() => {
        this.snake.move();
        this.snake.remove(this.map);
        this.snake.render(this.map);

        // 最大的位置
        let maxX = this.map.clientWidth / this.snake.width;
        let maxY = this.map.clientHeight / this.snake.height;
        //蛇头的位置
        let headX = this.snake.body[0].x;
        let headY = this.snake.body[0].y;

        let snakeHeadX = headX * this.snake.width;
        let snakeHeadY = headY * this.snake.height;
        if (headX < 0 || headX >= maxX || headY < 0 || headY >= maxY) {
          clearInterval(timer);
          alert("Game over");
        }
        for (var i = 0; i < this.food.elemntArr.length; i++) {
          if (
            snakeHeadX === this.food.elemntArr[i].offsetLeft &&
            snakeHeadY === this.food.elemntArr[i].offsetTop
          ) {
            this.food.remove(this.map, i);
            this.food.render(this.map);
            let lastfood = this.snake.body[this.snake.body.length - 1];
            this.snake.body.push({
              x: lastfood.x,
              y: lastfood.y,
              color: lastfood.color,
            });
          }
        }
      }, 200);
    }
    bindkey() {
      document.onkeydown = (e) => {
        switch (e.keyCode) {
          case 37:
            this.snake.direction = "left";
            break;
          case 38:
            this.snake.direction = "top";
            break;
          case 39:
            this.snake.direction = "right";
            break;
          case 40:
            this.snake.direction = "bottom";
            break;
        }
      };
    }
  }
  window.Game = Game;
  //   const map = my$("map");
  //   const games = new Game(map);
  //   games.bindkey();
  //   games.runsnake();
  //   games.start();
})();

// ================Main=======================
(() => {
  const map = my$("map");
  const games = new Game(map);
  games.start();
})();
```

## CSS

- index.css
```css
* {
    margin: 0;
    padding: 0;
  }
  .map {
    position: relative;
    /* position: absolute; */
    /* background-color: b; */
    width: 800px;
    height: 600px;
    background-color: lightgray;
    /* background-color: yellowgreen; */
  }
```
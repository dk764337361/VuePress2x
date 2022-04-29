# 修饰符

- 修饰符是以点开头的指令后缀，用于给当前指令设置特殊操作。

## 事件修饰符

[官方文档：事件修饰符](https://cn.vuejs.org/v2/guide/events.html#%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6)

### .prevent 阻止默认行为（a 标签跳转）

- 用于阻止默认事件行为，相当于 event.preventDefault()。
  <img src="/images/vue/005.gif" style="width: 100%; display:inline-block; margin: 0 ;">

```html{11-12}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <div id="app">
      <a @click.prevent="fn" href="https://kaiwu.lagou.com/">链接</a>
      <a @click.prevent href="https://kaiwu.lagou.com/">链接</a>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      new Vue({
        el: "#app",
        data: {},
        methods: {
          fn() {
            console.log("这是 a 标签的点击事件");
          },
        },
      });
    </script>
  </body>
</html>
```

### .stop 阻止事件冒泡

- 用于阻止事件传播，相当于 event.stopPropagation()。
- Vue.js 中允许修饰符进行连写，例如：@click.prevent.stop
  <img src="/images/vue/006.gif" style="width: 100%; display:inline-block; margin: 0 ;">

```html{18,21}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      #app div {
        width: 100px;
        height: 100px;
        border: 1px solid #ccc;
      }
    </style>
  </head>
  <body>
    <div id="app">
      <div @click="fn1">
        <button @click.stop="fn2">按钮</button>
      </div>
      <div @click="fn1">
        <a @click.prevent.stop="fn3" href="https://kaiwu.lagou.com/">链接</a>
      </div>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      new Vue({
        el: "#app",
        data: {},
        methods: {
          fn1() {
            console.log("div 的点击事件");
          },
          fn2() {
            console.log("button 的点击事件");
          },
          fn3() {
            console.log("a 的点击事件");
          },
        },
      });
    </script>
  </body>
</html>
```

### .once 事件只会触发一次

- 用于设置事件只会触发一次。

<img src="/images/vue/007.gif" style="width: 100%; display:inline-block; margin: 0 ;">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      <button @click="fn1">按钮1</button>
      <button @click.once="fn2">按钮2</button>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      new Vue({
        el: "#app",
        data: {},
        methods: {
          fn1() {
            console.log("按钮1被点击了");
          },
          fn2() {
            console.log("按钮2被点击了");
          },
        },
      });
    </script>
  </body>
</html>
```

## 按键修饰符

### 按键码

- 按键码指的是将按键的按键码作为修饰符使用以标识按键的操作方式。

### 特殊按键(内置别名)

- 特殊按键指的是键盘中类似 esc、enter、delete 等功能按键，为了更好的兼容性，应首选内置别名。
  - .page-down
  - .enter
  - .tab
  - .delete (捕获“删除”和“退格”键)
  - .esc
  - .space
  - .up
  - .down
  - .left
  - .right
    <img src="/images/vue/064.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      <!-- <input type="text" @keyup="fn"> -->

      <!-- keycode:49 等于数字1，此时输入1 -->
      <!-- <input type="text" @keyup.49="fn"> -->

      <!-- 字母a等于keycode:65，此时输入a -->
      <input type="text" @keyup.a="fn" />

      <!-- 内置别名 -->
      <!-- <input type="text" @keyup.esc="fn"> -->

      <!-- 输入其中按键a|b|c其中之一都可以触发 -->
      <!-- <input type="text" @keyup.a.b.c="fn"> -->
    </div>
    <script src="lib/vue.js"></script>
    <script>
      new Vue({
        el: "#app",
        data: {},
        methods: {
          fn(event) {
            console.log(event);
            console.log("输入了对应内容");
          },
        },
      });
    </script>
  </body>
</html>
```

## 系统修饰符

[官方文档：系统修饰符](https://cn.vuejs.org/v2/guide/events.html#%E6%8C%89%E9%94%AE%E4%BF%AE%E9%A5%B0%E7%AC%A6)

- 系统按键指的是 `.ctrl` 、`.alt` 、`.shift` 等按键。
- 单独点击系统操作符无效。
- 系统按键通常与其他按键组合使用，例如：Ctrl+A

### .ctrl 用法

<img src="/images/vue/008.gif" style="width: 100%; display:inline-block; margin: 0 ;">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      <!-- 17代表ctrl,此时只有按下ctrl可以触发-->
      <p>17代表ctrl,此时只有按下ctrl可以触发</p>
      <input type="text" @keyup.17="fn1" />

      <!-- 此时只有按下ctrl+q可以触发清空"input输入框" -->
      <!-- <input type="text" @keyup.17.q="fn2"> -->
      <p>此时只有按下ctrl+q可以触发清空"input输入框:</p>
      <input type="text" @keyup.ctrl.q="fn2" v-model="inputValue" />
    </div>
    <script src="lib/vue.js"></script>
    <script>
      new Vue({
        el: "#app",
        data: {
          inputValue: "",
        },
        methods: {
          fn1(event) {
            console.log(event);
          },
          fn2(event) {
            // console.log(event);
            this.inputValue = "";
          },
        },
      });
    </script>
  </body>
</html>
```

## 鼠标修饰符

- 用于设置点击事件由鼠标哪个按键来完成。

### .left 左键

### .right 右键

### .middle 中间滚轮

<img src="/images/vue/09.gif" style="width: 100%; display:inline-block; margin: 0 ;">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <div id="app">
      <button @click.left="fn">按钮1</button>
      <button @click.right="fn">按钮2</button>
      <button @click.middle="fn">按钮3</button>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      new Vue({
        el: "#app",
        data: {},
        methods: {
          fn() {
            console.log("点击了元素");
          },
        },
      });
    </script>
  </body>
</html>
```

## v-model 修饰符

### .trim 去除首尾空格

- 用于自动过滤`用户输入内容（input输入框）`首尾两端的空格。

<img src="/images/vue/010.gif" style="width: 50%; display:inline-block; margin: 0 ;">
  
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="app">
    <input type="text" v-model.trim="inputValue">
    <p>{{ inputValue }}</p>
  </div>
  <script src="lib/vue.js"></script>
  <script>
    var vm = new Vue({
      el: '#app',
      data: {
        inputValue: ''
      }
    });
  </script>
</body>
</html>
```
### .lazy 懒更新触发

- 用于将 v-model 的触发方式由 input 事件触发更改为 change 事件触发。
  <img src="/images/vue/011.gif" style="width: 50%; display:inline-block; margin: 0 ;">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      <input type="text" v-model.lazy="inputValue" />
      <p>{{ inputValue }}</p>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      var vm = new Vue({
        el: "#app",
        data: {
          inputValue: "",
        },
      });
    </script>
  </body>
</html>
```

### .number :等同parseFloat()转换

- 用于自动将用户输入的值转换为数值类型，如无法被 parseFloat() 转换，则返回原始内容。

<img src="/images/vue/012.gif" style="width: 50%; display:inline-block; margin: 0 ;">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      <input type="text" v-model.number="inputValue" />
      <p>{{ inputValue }}</p>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      var vm = new Vue({
        el: "#app",
        data: {
          inputValue: "",
        },
      });
    </script>
  </body>
</html>
```

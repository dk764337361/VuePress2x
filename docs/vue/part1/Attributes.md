# 属性绑定 v-bind
## 绑定属性 

### 动态绑定 HTML 属性

#### v-bind 指令用于动态绑定 HTML 属性。

<img src="/images/vue/021.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
<img src="/images/vue/022.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

### 简写方式

#### Vue.js 还为 v-bind 指令提供了简写方式。

<img src="/images/vue/023.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
<img src="/images/vue/024.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

### 允许使用表达式

#### 与插值表达式类似，v-bind 中也允许使用表达式。

  <img src="/images/vue/026.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 绑定多个属性-对象形式

#### 如果需要一次绑定多个属性，还可以绑定对象。

  <img src="/images/vue/025.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### Class 绑定

#### 1. class 是 HTML 属性，可以通过 v-bind 进行绑定，并且可以与 class 属性共存。

  <img src="/images/vue/028.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
  <img src="/images/vue/029.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

#### 2. 对于 class 绑定， Vue.js 中还提供了特殊处理方式。

- 对象处理方式

  <img src="/images/vue/030.jpg" style="width: 60%; display:inline-block; margin: 0 ;">
  <img src="/images/vue/031.jpg" style="width: 40%; display:inline-block; margin: 0 ;">

- 数组处理方式

  - 可将需要动态处理的数据写在数组里的对象中

  <img src="/images/vue/032.jpg" style="width: 60%; display:inline-block; margin: 0 ;">
  <img src="/images/vue/033.jpg" style="width: 40%; display:inline-block; margin: 0 ;">

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
      <p v-bind:class="cls1">标签内容</p>
      <p class="a" :class="cls1">标签内容</p>

      <!-- 下面是错误写法，要注意 -->
      <!-- <p class="a b c" :class="cls1 cls2 cls3"></p> -->
      <!-- 下面是正确写法 -->
      <p :class="cls"></p>

      <p :class="bool ? cls1 : cls2"></p>

      <p :class="{ x: isX, y: false, z: true }"></p>

      <p :class="['a', classB, {c: isC}]"></p>
    </div>

    <script src="lib/vue.js"></script>
    <script>
      var vm = new Vue({
        el: "#app",
        data: {
          classB: "b",
          isC: true,
          isX: true,
          bool: true,
          cls: "q w e",
          cls1: "x",
          cls2: "y",
          cls3: "z",
        },
      });
    </script>
  </body>
</html>
```

### Style 绑定

#### 1.style 是 HTML 属性，可以通过 v-bind 进行绑定，并且可以与 style 属性共存。

  <img src="/images/vue/034.jpg" style="width: 60%; display:inline-block; margin: 0 ;">
  <img src="/images/vue/035.jpg" style="width: 40%; display:inline-block; margin: 0 ;">

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
      <!-- <p v-bind:style="{width: '100px', height: '100px'}"></p> -->
      <!-- <p :style="styleObj">标签内容</p> -->

      <p style="width: 100px" :style="styleObj"></p>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      var vm = new Vue({
        el: "#app",
        data: {
          styleObj: {
            // width: '200px',
            height: "200px",
            backgroundColor: "red",
            "font-size": "30px",
          },
        },
      });
    </script>
  </body>
</html>
```

#### 2. 当我们希望给元素绑定多个样式对象时，可以设置为数组。

  <img src="/images/vue/036.jpg" style="width: 60%; display:inline-block; margin: 0 ;">
  <img src="/images/vue/037.jpg" style="width: 40%; display:inline-block; margin: 0 ;">

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
      <p :style="[baseStyle, styleObj1]">第一个 p 标签</p>
      <p :style="[baseStyle, styleObj2]">第二个 p 标签</p>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      var vm = new Vue({
        el: "#app",
        data: {
          // 公共样式
          baseStyle: {
            width: "100px",
            height: "100px",
          },
          styleObj1: {
            backgroundColor: "red",
          },
          styleObj2: {
            backgroundColor: "blue",
          },
        },
      });
    </script>
  </body>
</html>
```

  <img src="/images/vue/038.jpg" style="width: 100%; display:inline-block; margin: 0 ;">



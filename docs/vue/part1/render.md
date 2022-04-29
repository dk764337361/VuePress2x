# 渲染指令 v-for、v-show

## v-for 指令

### 1.用于遍历数据渲染结构，常用的数组、对象、单个数值均可遍历。

  <img src="/images/vue/039.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
  <img src="/images/vue/040.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

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
      <ul>
        <!-- 以下是数组遍历 -->
        <li v-for="item in arr">元素内容为：{{ item }}</li>
        <li v-for="(item, index) in arr">
          元素内容为：{{ item }}, 索引为：{{ index }}
        </li>

        <!-- 以下是对象遍历 -->
        <li v-for="value in obj">元素内容为：{{ value }}</li>
        <li v-for="(value, key, index) in obj">
          元素内容为: {{ value }}, 键为： {{ key }}, 索引值为： {{ index }}
        </li>
      </ul>

      <!-- 以下对单个数值遍历 -->
      <ul>
        <li v-for="(item, index) in 5">
          这是第{{ item }}个元素，索引值为：{{ index }}
        </li>
      </ul>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      new Vue({
        el: "#app",
        data: {
          arr: ["内容1", "内容2", "内容3"],
          obj: {
            content1: "内容1",
            content2: "内容2",
            content3: "内容3",
          },
        },
      });
    </script>
  </body>
</html>
```

### 2.使用 v-for 的同时，应始终指定唯一的 key 属性，可以提高渲染性能并避免问题。

<img src="/images/vue/041.jpg" style="width: 60%; display:inline-block; margin: 0 ;">
<img src="/images/vue/042.jpg" style="width: 40%; display:inline-block; margin: 0 ;">
<img src="/images/vue/043.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

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
      <ul>
        <li v-for="(item, index) in arr" :key="item">
          输入框{{ item }}: <input type="text" />
        </li>
        <li v-for="(item, index) in itemList" :key="item.id">
          输入框{{ item.value }}: <input type="text" />
        </li>
      </ul>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      var vm = new Vue({
        el: "#app",
        data: {
          arr: [1, 2, 3],
          itemList: [
            {
              id: 1,
              value: 2,
            },
            {
              id: 2,
              value: 3,
            },
            {
              id: 3,
              value: 3,
            },
          ],
        },
      });
    </script>
  </body>
</html>
```

### 3.通过 `<template>` 标签设置模板占位符，可以将部分元素或内容作为整体进行操作。

<img src="/images/vue/044.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

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
      <template v-for="item in obj">
        <span>{{ item }}</span>
        <br />
      </template>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      var vm = new Vue({
        el: "#app",
        data: {
          obj: {
            content1: "内容1",
            content2: "内容2",
            content3: "内容3",
          },
        },
      });
    </script>
  </body>
</html>
```

::: warning 注意
`<template>` 模板占位符没办法设置`:key=""`,需要把`:key=""`设置到一个真实的节点元素上
:::

<img src="/images/vue/045.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## v-show(元素的隐藏和显示)

### 1.用于控制元素显示与隐藏，适用于显示隐藏频繁切换时使用。

<img src="/images/vue/046.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

::: warning 注意
`<template>` 无法使用 v-show 指令。
:::

## v-if 指令(元素的移除和创建)

### 1.用于根据条件控制元素的创建与移除。

<img src="/images/vue/047.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

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
      <p v-if="bool">这是标签内容</p>
      <p v-else-if="false">这是第二个p标签</p>
      <p v-else-if="false">这是第三个p标签</p>
      <p v-else>最后一个p标签</p>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      var vm = new Vue({
        el: "#app",
        data: {
          bool: false,
        },
      });
    </script>
  </body>
</html>
```

### 2. 给使用 v-if 的同类型元素绑定不同的 key

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
      <div v-if="type==='username'" :key="'username'">
        用户名输入框：<input type="text" />
      </div>
      <div v-else :key="'email'">邮箱输入框：<input type="text" /></div>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      var vm = new Vue({
        el: "#app",
        data: {
          bool: true,
          type: "username",
        },
      });
    </script>
  </body>
</html>
```

### 3.出于性能考虑，应避免将 v-if 与 v-for 应用于同一标签

::: tip 提示
`v-for` 的优先级比`v-if` 高
:::

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
      <!-- 此写法消耗性能 -->
      <!-- <ul >
        <li v-if="false" v-for="item in items">{{item}}</li>
      </ul> -->

      <!-- 此写法正确 -->
      <ul v-if="false">
        <li v-for="item in items">{{item}}</li>
      </ul>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      var vm = new Vue({
        el: "#app",
        data: {
          items: {
            content1: "内容1",
            content2: "内容2",
            content3: "内容3",
          },
        },
      });
    </script>
  </body>
</html>
```
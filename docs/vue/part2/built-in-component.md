# 内置组件

## 动态组件

- 动态组件适用于多个组件频繁切换的处理。
- `<component>` 用于将一个‘元组件’渲染为动态组件，以 is 属性值决定渲染哪个组件。

<img src="/images/vue/217.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- 用于实现多个组件的快速切换，例如选项卡效果。

<img src="/images/vue/218.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/219.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/220.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- is 属性会在每次切换组件时，Vue 都会(卸载原来组件并)创建一个新的组件实例。

<img src="/images/vue/221.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

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
      <!-- 按钮代表选项卡的标题功能 -->
      <button v-for="title in titles" :key="title" @click="currentCom = title">
        {{ title }}
      </button>

      <!-- component 设置动态组件 -->
      <component :is="currentCom"></component>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      // 设置要切换的子组件选项对象
      var ComA = {
        template: `<p>这是组件A的内容：<input type="text"></p>`,
      };
      var ComB = {
        template: `<p>这是组件B的内容：<input type="text"></p>`,
      };
      var ComC = {
        template: `<p>这是组件C的内容：<input type="text"></p>`,
      };

      new Vue({
        el: "#app",
        data: {
          // 所有组件名称
          titles: ["ComA", "ComB", "ComC"],
          // 当前组件名称
          currentCom: "ComA",
        },
        components: {
          ComA,
          ComB,
          ComC,
        },
      });
    </script>
  </body>
</html>
```

<img src="/images/vue/030.gif" style="width: 100%; display:inline-block; margin: 0 ;">

## keep-alive 组件

### 1.主要用于保留组件状态或避免组件重新渲染。

<img src="/images/vue/222.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 2.include 属性用于指定哪些组件会被缓存，具有多种设置方式。

<img src="/images/vue/223.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/224.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/225.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 3.exclude 属性用于指定哪些组件不会被缓存。

<img src="/images/vue/226.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 4.max 属性用于设置最大缓存个数。

<img src="/images/vue/227.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 代码演示

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      <button v-for="title in titles" :key="title" @click="currentCom = title">
        {{title}}
      </button>

      <!-- 通过 include 设置哪些组件会被缓存 -->
      <!-- <keep-alive include="ComA,ComB,ComC"> -->
      <!-- <keep-alive :include="['ComA', 'ComB', 'ComC']"> -->
      <!-- <keep-alive :include="/Com[ABC]/"> -->

      <!-- 通过 exclude 设置哪些组件不会被缓存 -->
      <!-- <keep-alive exclude="ComD"> -->
      <!-- <keep-alive :exclude="['ComD']"> -->
      <keep-alive :exclude="/ComD/">
        <!-- <keep-alive max="2"> -->
        <!-- 动态组件 -->
        <component :is="currentCom"></component>
      </keep-alive>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
      var ComA = {
        template: `
        <div>
          请选择主食：
          <br>
          <label for="mantou">馒头：</label>
          <input id="mantou" type="radio" name="zhushi" value="mantou">
          <br>
          <label for="mifan">米饭：</label>
          <input id="mifan" type="radio" name="zhushi" value="mifan">
        </div>
      `,
      };
      var ComB = {
        template: `
        <div>
          请选择菜品：
          <br>
          <label for="luobo">炒萝卜：</label>
          <input id="luobo" type="checkbox" name="cai" value="luobo">
          <br>
          <label for="niurou">炒牛肉：</label>
          <input id="niurou" type="checkbox" name="cai" value="niurou">
          <br>
          <label for="pingguo">炒苹果：</label>
          <input id="pingguo" type="checkbox" name="cai" value="pingguo">
        </div>
      `,
      };
      var ComC = {
        template: `
        <div>
          请选择汤：
          <br>
          <label for="tang1"">西红柿鸡蛋汤：</label>
          <input id="tang1"" type="radio" name="tang" value="tang1"">
          <br>
          <label for="tang2">紫菜蛋花汤：</label>
          <input id="tang2" type="radio" name="tang" value="tang2">
          <br>
          <label for="tang3">清汤</label>
          <input id="tang3" type="radio" name="tang" value="tang3">
        </div>
      `,
      };

      var ComD = {
        template: `
        <div>
          请输入支付信息：
          <br>
          <label for="account"">请输入账号：</label>
          <input id="account"" type="text" name="account">
          <br>
          <label for="password">请输入密码：</label>
          <input id="password" type="password" name="password">
          <br>
        </div>
      
      `,
      };

      new Vue({
        el: "#app",
        data: {
          titles: ["ComA", "ComB", "ComC", "ComD"],
          currentCom: "ComA",
        },
        components: {
          ComA,
          ComB,
          ComC,
          ComD,
        },
      });
    </script>
  </body>
</html>
```

<img src="/images/vue/031.gif" style="width: 100%; display:inline-block; margin: 0 ;">

## 过渡组件

- 用于在 Vue 插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡、动画效果。

### transition 组件

- 用于给元素和组件添加进入/离开过渡：

  - 条件渲染 (使用 v-if )
  - 条件展示 (使用 v-show )
  - 动态组件
  - 组件根节点

- 组件提供了 6 个 class，用于设置过渡的具体效果。
  - 进入的类名：
    - v-enter(入场前的状态)
    - v-enter-to(入场完毕后的状态)
    - v-enter-active(入场过程的过渡的状态)
  - 离开的类名：
    - v-leave(准备离开前的状态)
    - v-leave-to(离场以后的状态)
    - v-leave-active(立场过程的过渡的状态)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /* 用于设置出场的最终状态 */
      .v-leave-to {
        opacity: 0;
      }

      /* 用于设置过渡的执行过程 */
      .v-leave-active {
        transition: opacity 1s;
      }

      /* 用于设置入场的初始状态 */
      .v-enter {
        opacity: 0;
      }

      /* 用于设置入场的最终状态 */
      .v-enter-to {
        opacity: 0.5;
      }

      /* 用于设置入场的过程 */
      .v-enter-active {
        transition: all 1s;
      }
    </style>
  </head>
  <body>
    <div id="app">
      <button @click="show = !show">切换</button>

      <transition>
        <p v-if="show">hello world</p>
      </transition>
    </div>
    <script src="./lib/vue.js"></script>
    <script>
      new Vue({
        el: "#app",
        data: {
          show: true,
        },
      });
    </script>
  </body>
</html>
```

<img src="/images/vue/032.gif" style="width: 100%; display:inline-block; margin: 0 ;">

### transition 组件的相关属性

- 给组件设置 name 属性，可用于给多个元素、组件设置不同的过渡效果，这时需要将 v- 更改为对应 name- 的形式。
- 例如：
  - `<transition name="demo">` 的对应类名前缀为：
  - demo-enter
  - demo-leave
  - ..
- 通过 appear 属性，可以让组件在初始渲染时实现过渡。

::: tip 提示
appear 的效果取决于离场后的效果
:::

<img src="/images/vue/230.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /* 第一组过渡效果设置 */
      .v-enter,
      .v-leave-to {
        opacity: 0;
      }

      .v-enter-active,
      .v-leave-active {
        transition: opacity 0.5s;
      }

      /* 第二组过渡效果设置 */
      .demo-enter,
      .demo-leave-to {
        opacity: 0;
        transform: translateX(200px);
      }

      .demo-enter-active,
      .demo-leave-active {
        transition: all 0.5s;
      }
    </style>
  </head>
  <body>
    <div id="app">
      <button @click="show = !show">切换1</button>
      <!-- 没有设置 name 命名的 transition 组件，类名采用 v- 前缀 -->
      <transition appear>
        <p v-if="show">这是要切换的元素1</p>
      </transition>

      <br />

      <button @click="showDemo = !showDemo">切换2</button>
      <!-- 设置了 name 的 transition 组件，类名需要将 v- 修改为 demo- -->
      <transition name="demo" appear>
        <p v-if="showDemo">这是要切换的元素2</p>
      </transition>
    </div>
    <script src="./lib/vue.js"></script>
    <script>
      new Vue({
        el: "#app",
        data: {
          show: true,
          showDemo: true,
        },
      });
    </script>
  </body>
</html>
```

<img src="/images/vue/033.gif" style="width: 100%; display:inline-block; margin: 0 ;">

### 自定义过渡类名

- 自定义类名比普通类名优先级更高，在使用第三方 CSS 动画库时非常有用。
- 用于设置自定义过渡类名的属性如下：
  - enter-class
  - enter-active-class
  - enter-to-class
  - leave-class
  - leave-active-class
  - leave-to-class
- 用于设置初始过渡类名的属性如下：
  - appear-class
  - appear-to-class
  - appear-active-class

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .v-enter,
      .v-leave-to {
        opacity: 0;
      }

      .v-enter-active,
      .v-leave-active {
        transition: all 0.5s;
      }

      .test {
        transition: all 3s;
      }
    </style>
  </head>
  <body>
    <div id="app">
      <button @click="show = !show">切换</button>

      <transition enter-active-class="test" leave-active-class="test">
        <p v-if="show">这是 p 标签</p>
      </transition>
    </div>
    <script src="./lib/vue.js"></script>
    <script>
      new Vue({
        el: "#app",
        data: {
          show: true,
        },
      });
    </script>
  </body>
</html>
```

<img src="/images/vue/034.gif" style="width: 100%; display:inline-block; margin: 0 ;">

- [Animate.css](https://animate.style/) 是一个第三方 CSS 动画库，通过设置类名来给元素添加各种动画效果。
- 使用注意：
  - animate\_\_ 前缀与 compat 版本
  - 基础类名 animated

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
    />

    <!-- 不需要添加 animate__ 的兼容版本，但是官方建议使用完整版本 -->
    <!-- "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.compat.css" -->
  </head>
  <body>
    <div id="app">
      <button @click="show = !show">按钮</button>

      <!-- 通过自定义过渡类名设置，给组件添加第三方动画库的类名效果 -->
      <transition
        enter-active-class="animate__bounceInDown"
        leave-active-class="animate__bounceOutDown"
      >
        <!-- 必须给要使用动画的元素设置基础类名 animate__animated -->
        <p v-if="show" class="animate__animated">hello world</p>
      </transition>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      new Vue({
        el: "#app",
        data: {
          show: true,
        },
      });
    </script>
  </body>
</html>
```

<img src="/images/vue/035.gif" style="width: 100%; display:inline-block; margin: 0 ;">

### transition-group 组件

- `<transition-group> `用于给列表统一设置过渡动画。
  - tag 属性用于设置容器元素，默认为 `<span>`。
  - 过渡会应用于内部元素，而不是容器。
  - 子节点必须有独立的 key，动画才能正常工作。
  - 当列表元素变更导致元素位移，可以通过 .v-move 类名设置移动时的效果。


```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      ul {
        position: relative;
      }

      .v-enter,
      .v-leave-to {
        opacity: 0;
        transform: translateX(100px);
      }

      .v-enter-active,
      .v-leave-active {
        transition: all 0.5s;
      }

      /* 让元素在离场的过程中脱离标准流 */
      .v-leave-active {
        position: absolute;
      }

      .v-move {
        transition: all 0.5s;
      }
    </style>
  </head>
  <body>
    <div id="app">
      <input type="text" v-model="newTitle" @keyup.enter="addItem" />

      <transition-group tag="ul">
        <li v-for="item in items" :key="item.id" @click="removeItem(item)">
          {{ item.title }}
        </li>
      </transition-group>
    </div>
    <script src="./lib/vue.js"></script>
    <script>
      new Vue({
        el: "#app",
        data: {
          items: [
            { id: 1, title: "示例内容1" },
            { id: 2, title: "示例内容2" },
            { id: 3, title: "示例内容3" },
            { id: 4, title: "示例内容4" },
            { id: 5, title: "示例内容5" },
          ],
          newTitle: "",
          latestId: 5,
        },
        methods: {
          addItem() {
            this.items.push({
              id: this.latestId + 1,
              title: this.newTitle,
            });
            this.latestId++;
            this.newTitle = "";
          },
          removeItem(item) {
            var i = this.items.indexOf(item);
            this.items.splice(i, 1);
          },
        },
      });
    </script>
  </body>
</html>
```

<img src="/images/vue/036.gif" style="width: 100%; display:inline-block; margin: 0 ;">

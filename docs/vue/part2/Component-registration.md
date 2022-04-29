# 组件注册

## 全局注册

- 全局注册的组件在`注册后`可以用于任意实例或组件中。

  <img src="/images/vue/144.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

::: tip 注意
全局注册必须设置在根 Vue 实例创建之前。
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
      <p>这是p标签</p>
      <my-component></my-component>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      Vue.component("my-component", {
        template: "<div>这是我们全局注册的组件</div>",
      });

      // 根实例
      new Vue({
        el: "#app",
        data: {},
      });
    </script>
  </body>
</html>
```

### 组件基础概念

- 本质上，组件是可复用的 Vue 实例，所以它们可与 new Vue 接收相同的选项，例如 data、methods 以及生命周期钩子等。
- 仅有的例外是像 el 这样根实例特有的选项。

### 组件命名规则

- 组件具有两种命名规则：
  - kebab-case：'my-component’
  - PascalCase：'MyComponent'
- 示例如下：
  <img src="/images/vue/145.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

::: tip 注意
无论采用哪种命名方式，在 DOM 中都只有 kebab-case 可
以使用。
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
      <my-com-a></my-com-a>
      <!-- 错误写法： -->
      <!-- <MyComA></MyComA> -->

      <my-com-b></my-com-b>
      <!-- 错误写法： -->
      <!-- <MyComB></MyComB> -->
    </div>
    <script src="lib/vue.js"></script>
    <script>
      // kebab-case 进行注册
      Vue.component("my-com-a", {
        template: "<div>这是a组件的内容</div>",
      });

      // PascalCase 进行注册
      Vue.component("MyComB", {
        template: "<div>这是b组件的内容</div>",
      });

      new Vue({
        el: "#app",
        data: {},
      });
    </script>
  </body>
</html>
```

### template 选项

- template 选项用于设置组件的结构，最终被引入根实例或其他组件中。
  <img src="/images/vue/146.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

::: tip 提示
组件必须只有一个根元素。
:::
<img src="/images/vue/147.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

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
      <my-com-a></my-com-a>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      Vue.component("MyComA", {
        template: `
        <div>
          这是组件 A 的内容: {{ 1 + 2 * 3 }}
        </div>
      `,
      });

      new Vue({
        el: "#app",
        data: {},
      });
    </script>
  </body>
</html>
```

### data 选项

- data 选项用于存储组件的数据，与根实例不同，组件的 data 选项必须为函数，数据设置在返回值对象中。
- 这种实现方式是为了确保每个组件实例可以维护一份被返回对象的独立的拷贝，不会相互影响。
  <img src="/images/vue/148.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
  <img src="/images/vue/022.gif" style="width: 100%; display:inline-block; margin: 0 ;">

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
      <my-com-a></my-com-a>
      <my-com-a></my-com-a>
      <my-com-a></my-com-a>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      Vue.component("my-com-a", {
        template: `
        <div>
        <h3>{{title}}</h3>
        <p>{{content}}</p>
        </div>
        `,
        // data:function(){
        //   return {
        //     titile:'实力内容'
        //   }

        //ES6写法
        data() {
          return {
            title: "这是组件标题1",
            content: "这是组件内容",
          };
        },
      });

      new Vue({
        el: "#app",
        data: {},
      });
    </script>
  </body>
</html>
```

## 局部注册

### 局部注册的组件只能用在当前实例或组件中。

  <img src="/images/vue/149.jpg" style="width: 60%; display:inline-block; margin: 0 ;">

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
      <my-com-a></my-com-a>
      <my-com-b></my-com-b>
    </div>
    <!-- <div id="app2">
      <my-com-a></my-com-a>
    </div> -->
    <script src="lib/vue.js"></script>
    <script>
      new Vue({
        el: "#app",
        data: {},
        components: {
          //写法一：
          "my-com-a": {
            template: `
            <div>
            <h3>{{title}}</h3>
            <p>{{content}}</p>
            </div>
            `,
            data() {
              return {
                title: "组件A标题",
                content: "组件A内容",
              };
            },
          },
          //写法二：
          MyComB: {
            template: `
            <div>
            <h3>{{title}}</h3>
            <p>{{content}}</p>
            </div>
            `,
            data() {
              return {
                title: "组件B",
                content: "组件B内容",
              };
            },
          },
        },
      });

      // new Vue({
      //   el: '#app2'
      // })
    </script>
  </body>
</html>
```

### 单独配置组件的选项对象：

  <img src="/images/vue/150.jpg" style="width: 60%; display:inline-block; margin: 0 ;">

#### ES6 的对象属性简写：

  <img src="/images/vue/151.jpg" style="width: 60%; display:inline-block; margin: 0 ;">

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
      <my-componnent-a></my-componnent-a>
      <my-componnent-b></my-componnent-b>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      //组件A的选项对象
      var MyComponnentA = {
        template: `
            <div>
            <h3>{{title}}</h3>
            <p>{{content}}</p>
            </div>
            `,
        data() {
          return {
            title: "组件A标题",
            content: "组件A内容",
          };
        },
      };
      //组件B的选项对象
      var MyComponnentB = {
        template: `
            <div>
            <h3>{{title}}</h3>
            <p>{{content}}</p>
            </div>
            `,
        data() {
          return {
            title: "组件B",
            content: "组件B内容",
          };
        },
      };

      new Vue({
        el: "#app",
        data: {},
        components: {
          //写法一：
          "my-componnent-a": MyComponnentA,
          //写法二：
          MyComponnentB,
        },
      });
    </script>
  </body>
</html>
```

# 组件通信

- 在组件间传递数据的操作，称为`组件通信`。
  - 子组件如何获取父组件中的数据？
  - 父组件如何得知子组件的数据变更？
  - 如果是更加复杂的组件关系呢？

## A:父组件向子组件传值

### 1.子组件设置方式如下：

- 通过子组件的 props 选项接收父组件的传值。

  <img src="/images/vue/152.jpg" style="width: 60%; display:inline-block; margin: 0 ;">

::: warning 注意
props 不要与 data 存在同名属性。
:::

### 2.父组件设置方式如下：

  <img src="/images/vue/153.jpg" style="width: 60%; display:inline-block; margin: 0 ;">
  <img src="/images/vue/154.jpg" style="width: 40%; display:inline-block; margin: 0 ;">

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
      <!-- 静态属性设置 -->
      <my-component-a
        title="这是静态的内容"
        content="这是静态的内容"
      ></my-component-a>

      <!-- 动态属性绑定 -->
      <!-- 提示： ""冒号里包含的是JS内容，''双引号代表字符串 -->
      <my-component-a
        :title="'这是静态的标题'"
        :content="'这是静态的内容'"
      ></my-component-a>

      <!-- 动态属性绑定：常用操作 -->
      <my-component-a
        :title="item.title"
        :content="item.content"
      ></my-component-a>
    </div>

    <script src="lib/vue.js"></script>
    <script>
      //创建自组件
      Vue.component("my-component-a", {
        props: ["title", "content"],
        template: `
      <div>
        <h3>{{title}}</h3>
        <p>{{content}}</p>
      </div>
     `,
      });

      new Vue({
        el: "#app",
        data: {
          item: {
            title: "这是示例标题",
            content: "这是示例内容",
          },
        },
      });
    </script>
  </body>
</html>
```

### [3.认识子组件中的 Props](Props.md)

## B:子组件向父组件传值

### 1.子传值需要通过自定义事件实现

- 商品为子组件，购物车为父组件，父组件需要统计商品个数，就需要在子组件个数变化时传值给父组件。

- 父组件：

<img src="/images/vue/174.jpg" style="width: 40%; display:inline-block; margin: 0 ;">
<img src="/images/vue/175.jpg" style="width: 60%; display:inline-block; margin: 0 ;">

- 子组件：

<img src="/images/vue/176.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- 子组件数据变化时，通过 \$emit() 触发自定义事件。

<img src="/images/vue/177.jpg" style="width: 70%; display:inline-block; margin: 0 ;">

::: tip 提示
自定义事件名称建议使用 kebab-case。
:::

- 父组件监听子组件的自定义事件，并设置处理程序。

<img src="/images/vue/178.jpg" style="width: 70%; display:inline-block; margin: 0 ;">

```html{15,36}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      <h3>购物车</h3>
      <product-item
        v-for="product in products"
        :key="product.id"
        :title="product.title"
        @count-change="totalCount++"
      ></product-item>
      <p>商品总个数为：{{ totalCount }}</p>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      Vue.component("ProductItem", {
        props: ["title"],
        template: `
        <div>
          <span>商品名称： {{ title }}, 商品个数： {{ count }}</span>
          <button @click="countIns">+1</button>
        </div>
      `,
        data() {
          return {
            count: 0,
          };
        },
        methods: {
          countIns() {
            this.$emit("count-change");
            this.count++;
          },
        },
      });

      new Vue({
        el: "#app",
        data: {
          products: [
            {
              id: 1,
              title: "苹果一斤",
            },
            {
              id: 2,
              title: "香蕉一根",
            },
            {
              id: 3,
              title: "橙子一个",
            },
          ],
          totalCount: 0,
        },
      });
    </script>
  </body>
</html>
```

<img src="/images/vue/026.gif" style="width: 100%; display:inline-block; margin: 0 ;">

### 2.自定义事件传值

- 子组件触发事件时可以向父组件传值。

<img src="/images/vue/179.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- 父组件在监听事件时需要接收子组件传递的数据。
  - 写法一：

<img src="/images/vue/180.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- 写法二：

<img src="/images/vue/181.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
<img src="/images/vue/182.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

```html{15,38,44,71-73}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      <h3>购物车</h3>
      <product-item
        v-for="product in products"
        :key="product.id"
        :title="product.title"
        @count-change="onCountChange"
      ></product-item>
      <p>商品总个数为：{{ totalCount }}</p>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      // 子组件
      Vue.component("ProductItem", {
        props: ["title"],
        template: `
        <div>
          <span>商品名称： {{ title }}, 商品个数： {{ count }}</span>
          <button @click="countIns1">+1</button>
          <button @click="countIns5">+5</button>
        </div>
      `,
        data() {
          return {
            count: 0,
          };
        },
        methods: {
          countIns1() {
            this.$emit("count-change", 1);
            //$emit是Vue根实例的一方法
            //https://cn.vuejs.org/v2/api/#vm-emit
            this.count++;
          },
          countIns5() {
            this.$emit("count-change", 5);
            this.count += 5;
          },
        },
      });

      // 父组件
      new Vue({
        el: "#app",
        data: {
          products: [
            {
              id: 1,
              title: "苹果一斤",
            },
            {
              id: 2,
              title: "香蕉一根",
            },
            {
              id: 3,
              title: "橙子一个",
            },
          ],
          totalCount: 0,
        },
        methods: {
          onCountChange(productCount) {
            this.totalCount += productCount;
          },
        },
      });
    </script>
  </body>
</html>
```

### 3.组件与 v-model

- v-model 用于组件时，需要通过 props 与自定义事件实现。

- 父组件

<img src="/images/vue/183.jpg" style="width: 60%; display:inline-block; margin: 0 ;">
<img src="/images/vue/184.jpg" style="width: 40%; display:inline-block; margin: 0 ;">

- 子组件
  <img src="/images/vue/185.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

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
      <p>输入框内容为：{{ iptValue }}</p>
      <com-input v-model="iptValue"></com-input>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      // 子组件
      var ComInput = {
        props: ["value"],
        template: `
        <input
          type="text"
          :value="value"
          @input="onInput"
        >
      `,
        methods: {
          onInput(event) {
            this.$emit("input", event.target.value);
          },
        },
      };

      // 根实例
      new Vue({
        el: "#app",
        data: {
          iptValue: "",
        },
        components: {
          ComInput,
        },
      });
    </script>
  </body>
</html>
```

## C:非父子组件传值

- 非父子组件指的是兄弟组件或完全无关的两个组件。

### 1.兄弟组件传值

#### 方法一：兄弟组件可以通过父组件进行数据中转

<img src="/images/vue/186.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
<img src="/images/vue/187.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
<img src="/images/vue/188.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
<img src="/images/vue/189.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
<img src="/images/vue/190.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

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
      <!-- 父组件接收子组件A的数据 -->
      <com-a @value-change="value = $event"></com-a>
      <!-- 父组件将数据传递给子组件B -->
      <com-b :value="value"></com-b>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      // 子组件A：发送数据
      Vue.component("ComA", {
        template: `
        <div>
          组件A的内容： {{ value }}
          <button
            @click="$emit('value-change', value)"
          >发送</button>
        </div>
      `,
        data() {
          return {
            value: "这是组件A中的数据",
          };
        },
      });

      // 子组件B：接收数据
      Vue.component("ComB", {
        props: ["value"],
        template: `
        <div>
          组件B接收到： {{ value }}
        </div>  
      `,
      });

      // 根实例（父组件）
      new Vue({
        el: "#app",
        data: {
          // 用于数据中转
          value: "",
        },
      });
    </script>
  </body>
</html>
```

<img src="/images/vue/027.gif" style="width: 100%; display:inline-block; margin: 0 ;">

### 2.EventBus(任意组件传值)

::: tip 兄弟组件传值的缺点

- 当组件嵌套关系复杂时，根据组件关系传值会较为繁琐。
- 组件为了数据中转，data 中会存在许多与当前组件功能无关的数据。
  :::

- EventBus （事件总线）是一个独立的事件中心，用于管理不同组件间的传值操作。
- EventBus 通过一个新的 Vue 实例来管理组件传值操作，组件通过给实例注册事件、调用事件来实现数据传递。

<img src="/images/vue/191.jpg" style="width: 70%; display:inline-block; margin: 0 ;">

- 发送数据的组件触发 bus 事件，接收的组件给 bus 注册对应事件。

<img src="/images/vue/192.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- 给 bus 注册对应事件通过 \$on() 操作。

<img src="/images/vue/193.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- 最后创建根实例执行代码即可。

<img src="/images/vue/194.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

#### 代码演示：

- EventBus.js

```js
var bus = new Vue();
```

- index.html

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
      <h3>购物车</h3>
      <product-item></product-item>
      <product-total></product-total>
    </div>
    <script src="lib/vue.js"></script>
    <script src="EventBus.js"></script>
    <script>
      //商品组件
      Vue.component("ProductItem", {
        template: `
        <div>
          <span>商品名称：苹果，商品个数：{{count}}</span>
          <button @click="countIns">+1</button>
        </div>
        `,
        data() {
          return {
            count: 0,
          };
        },
        methods: {
          countIns() {
            //给bus触发自定义事件，传递数据
            bus.$emit("countChange", 1);
            this.count++;
          },
        },
      });
      //计数组件
      Vue.component("ProductTotal", {
        template: `
        <p>总个数为：{{totalCount}}</p> 
        `,
        data() {
          return {
            totalCount: 0,
          };
        },
        created() {
          //给bus注册事件，并接收数据
          bus.$on("countChange", (productCount) => {
            //实例创建完毕，可以使用data等功能
            this.totalCount += productCount;
          });
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

<img src="/images/vue/028.gif" style="width: 100%; display:inline-block; margin: 0 ;">

## E.其他传值方式(不推荐|适用简单应用)

### 1. \$root

- \$root 用于访问当前组件树根实例，设置简单的 Vue 应用时可以通过此方式进行组件传值。
  <img src="/images/vue/195.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
  <img src="/images/vue/196.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
  <img src="/images/vue/197.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
  <img src="/images/vue/198.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

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
      <com-a></com-a>
    </div>

    <script src="lib/vue.js"></script>
    <script>
      //根实例的子组件A的子组件B
      var ComB = {
        template: `
        <div>
              组件B：{{ $root.count }}
         <button @click="clickFn">按钮</button>
        </div>
         `,
        methods: {
          clickFn() {
            this.$root.count = 200;
          },
        },
      };

      var ComA = {
        template: `
        <div>
            组件：{{ $root.count }}
            <button @click="clickFn">按钮</button>
            <com-b></com-b>
        </div>
    `,
        methods: {
          clickFn() {
            this.$root.count = 100;
          },
        },
        components: {
          ComB,
        },
      };
      new Vue({
        el: "#app",
        data: {
          count: 0,
        },
        components: {
          ComA,
        },
      });
    </script>
  </body>
</html>
```

<img src="/images/vue/029.gif" style="width: 100%; display:inline-block; margin: 0 ;">

- 除了 $root , Vue.js 中还提供了 $parent 与 \$children 用于便捷访问父子组件。

[官方相应 API 文档](https://cn.vuejs.org/v2/api/#vm-root)

### 2. \$refs

#### \$refs 用于获取设置了 ref 属性的 HTML 标签或子组件。

- 给普通 HTML 标签设置 ref 属性，\$refs 可以获取 DOM 对象。

<img src="/images/vue/199.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
<img src="/images/vue/200.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

- 给子组件设置 ref 属性，渲染后可通过 \$refs 获取子组件实例。

<img src="/images/vue/201.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
<img src="/images/vue/202.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
<img src="/images/vue/203.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

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
      <!-- 给HTML标签设置ref属性 -->
      <input type="text" ref="inp" />
      <button @click="fn">按钮</button>
      <!-- 给子组件设置ref属性 -->
      <com-a ref="ComA"></com-a>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      var ComA = {
        template: `
         <div>这是组件A的内容:{{value}}</div> 
        `,
        data() {
          return {
            value: "示例内容",
          };
        },
      };
      new Vue({
        el: "#app",
        data: {},
        methods: {
          fn() {
            //点击后修改HTML标签焦点状态
            this.$refs.ComA.value = "新的内容";
          },
        },
        components: {
          ComA,
        },
        //vue的生命周期函数：mounted()
        mounted() {
          console.log(this.$refs);
          this.$refs.ComA.value = "修改后的内容";
        },
      });
    </script>
  </body>
</html>
```

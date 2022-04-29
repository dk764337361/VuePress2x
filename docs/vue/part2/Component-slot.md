# 组件插槽

- 组件插槽可以便捷的设置组件内容。

<img src="/images/vue/204.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## 单个插槽

- 如果我们希望组件标签可以像 HTML 标签一样设置内容，那么组件的使用灵活度会很高。
- 但平常我们书写的组件，组件首尾标签中书写的内容会被抛弃。

<img src="/images/vue/205.png" style="width: 100%; display:inline-block; margin: 0 ;">

### 1.需要通过 `<slot>` 进行插槽设置。

<img src="/images/vue/205.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
<img src="/images/vue/206.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

### 2.需要注意模板内容的渲染位置：

<img src="/images/vue/207.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
<img src="/images/vue/208.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
<img src="/images/vue/209.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

### 3.可以在 `<slot>`中为插槽设置默认值，也称为后备内容。

<img src="/images/vue/210.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
<img src="/images/vue/211.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

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
      <com-a>这是组件的内容</com-a>

      <com-a>
        这是第二个组件的内容：
        <span>这是span的内容</span>
      </com-a>

      <com-a>
        这里是父组件的视图模板，只能使用父组件的数据: {{ parValue }}
      </com-a>

      <com-a></com-a>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      Vue.component("ComA", {
        template: `
        <div>
          <h3>组件标题</h3>
          <slot>
            这是插槽的默认内容
          </slot>
        </div>
      `,
        data() {
          return {
            value: "子组件的数据",
          };
        },
      });

      new Vue({
        el: "#app",
        data: {
          parValue: "这是父组件的数据",
        },
      });
    </script>
  </body>
</html>
```

## 具名插槽

- 如果组件中有多个位置需要设置插槽，据需要给 `<slot>` 设置 name，称为具名插槽。

<img src="/images/vue/206.png" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/207.png" style="width: 100%; display:inline-block; margin: 0 ;">

<img src="/images/vue/212.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

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
      <com-a>
        <template v-slot:header>
          <h3>组件的头部内容</h3>
        </template>

        <!-- <template v-slot:default>
        <p>组件的主体内容1</p>
        <p>组件的主体内容2</p>
      </template> -->

        <p>组件的主体内容1</p>
        <p>组件的主体内容2</p>

        <template #footer>
          <p>组件底部内容</p>
        </template>
      </com-a>
    </div>

    <script src="lib/vue.js"></script>
    <script>
      // 子组件
      Vue.component("ComA", {
        template: `
        <div>
          <header>
            <slot name="header"></slot>
          </header>
          <main>
            <slot></slot>
          </main>
          <footer>
            <slot name="footer"></slot>
          </footer>
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

## 作用域插槽

### 基本使用

- 作用域插槽：用于让插槽可以使用子组件的数据。
- 组件将需要被插槽使用的数据通过 v-bind 绑定给 `<slot>`，这种用于给插槽传递数据的属性称为插槽 prop。
- 组件绑定数据后，插槽中需要通过 v-slot 接收数据。

<img src="/images/vue/213.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
<img src="/images/vue/208.png" style="width: 50%; display:inline-block; margin: 0 ;">

### 如果只存在默认插槽，同时又需要接收数据，可以进行简写：

<img src="/images/vue/214.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```html
<div id="app">
  <!-- 或者简写成 -->
  <com-a v-slot="dataobj"> {{dataobj.value}} </com-a>
</div>
```

```html
<div id="app">
  <!-- 或者简写成 -->
  <com-a #default="dataobj"> {{dataobj.value}} </com-a>
</div>
```

### 还可以通过 ES6 的解构操作进行数据接收。

<img src="/images/vue/216.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

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
      <!-- 多个插槽的作用域插槽书写方式 -->
      <com-a>
        <template v-slot:default="dataObj">
          {{ dataObj.value }} {{ dataObj.num }}
        </template>

        <template v-slot:footer="dataObj">
          {{ dataObj.value }}
        </template>
      </com-a>

      <!-- 只具有默认插槽的作用域插槽书写方式 -->
      <!-- <com-b v-slot="dataObj"> -->
      <com-b #default="dataObj">
        {{ dataObj }}
      </com-b>

      <!-- 通过 ES6 的解构操作接收作用域插槽的数据 -->
      <com-b v-slot="{ value, num }">
        {{ value }} {{ num }}
      </com-b>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      // 子组件B的选项对象
      var ComB = {
        template: `
        <div>
          <p>组件B的内容: </p>
          <slot
            :value="value"
            :num="num"
          ></slot>
        </div>
      `,
        data() {
          return {
            value: "这是组件B内部的数据",
            num: 200,
          };
        },
      };

      // 子组件A的选项对象
      var ComA = {
        template: `
        <div>
          <p>组件A的内容: </p>
          <slot
            v-bind:value="value"
            :num="num"
          ></slot>
          <slot name="footer"
            :value="value"
          ></slot>
        </div>
      `,
        data() {
          return {
            value: "这是组件A内部的数据",
            num: 100,
          };
        },
      };

      new Vue({
        el: "#app",
        components: {
          ComA,
          ComB,
        },
      });
    </script>
  </body>
</html>
```

# Vue.js 基础语法

## Vue 实例

Vue 实例是通过 Vue 函数创建的对象，是使用 Vue 功能的基础。
<img src="/images/vue/003.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

## 基础选项

### el 选项

- 用于选取`一个DOM 元素`作为 Vue 实例的挂载目标。
- 只有挂载元素内部才会被 Vue 进行处理，外部为普通 HTML 元素。
- 代表 MVVM 中的 View 层（视图）。

#### 可以为 CSS 选择器格式的字符串 或 HTMLElement 实例，但不能为 html 或 body。

<img src="/images/vue/004.jpg" style="width: 40%; display:inline-block; margin: 0 ;">
<img src="/images/vue/005.jpg" style="width: 60%; display:inline-block; margin: 0 ;">

#### 挂载完毕后，可以通过 vm.\$el 进行访问。

<img src="/images/vue/006.jpg" style="width: 60%; display:inline-block; margin: 0 ;">

#### 未设置 el 的 vue 实例，也可以通过 vm.\$mount() 进行挂载，参数形式与 el 规则相同。

<img src="/images/vue/007.jpg" style="width: 60%; display:inline-block; margin: 0 ;">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <!-- 挂载元素 -->
    <div id="app"></div>

    <script src="lib/vue.js"></script>
    <script>
      var vm = new Vue({
        el: "#app",
      });
      console.log(vm.$el);

      /* var app = document.querySelector('#app');
    var vm = new Vue({
      el: app
    });
    console.log(vm.$el); */

      // var app = document.getElementById('app');
      // var vm = new Vue({});
      // // vm.$mount('#app');
      // vm.$mount(app);
      // console.log(vm.$el);
    </script>
  </body>
</html>
```

### 插值表达式

- 挂载元素可以使用 Vue.js 的模板语法，模板中可以通过插值表达式为元素进行动态内容设置，写法为

```html
{{ }}
```

<img src="/images/vue/008.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

::: warning 注意

- 插值表达式只能书写在标签内容区域，可以与其它内容混合。
- 内部只能书写 JavaScript 表达式，不能书写语句。

```html
<ul>
  <li>第一段示例内容：{{ 10 + 20 + 30 }}</li>
  <li>第二段示例内容：{{ 22 > 3 ? '22比3大' : '3比22大' }}</li>
  <!-- <li id="{{ 1 + 2 }}"></li> -->
  //报错
  <!-- <li>{{ var num = 100; }}</li> -->
  //报错
</ul>
```

:::

### data 选项

- 用于存储 Vue 实例需要使用的数据，值为对象类型。
  <img src="/images/vue/009.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

- data 中的数据可以通过 vm.\$data.数据 或 vm.数据 访问。
  <img src="/images/vue/010.jpg" style="width: 60%; display:inline-block; margin: 0 ;">

* data 中的数据可以直接在视图中通过插值表达式访问。
* data 中的数据为响应式数据，在发生改变时，视图会自动更新。

<img src="/images/vue/011.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

<img src="/images/vue/012.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

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
      <p>{{ title }}</p>
      <ul>
        <li>{{ arr[0] }}</li>
        <li>{{ arr[1] }}</li>
        <li>{{ arr[2] }}</li>
      </ul>
    </div>

    <script src="lib/vue.js"></script>
    <script>
      var vm = new Vue({
        el: "#app",
        data: {
          // title: '标题文本',
          arr: ["内容1", "内容2", "内容55555"],
          title: "ssss",
        },
      });

      console.log(vm.$data.title);
      console.log(vm.title); // 更常用
    </script>
  </body>
</html>
```

- data 中存在数组时，索引操作与 length 操作无法自动更新视图，这时可以借助 Vue.set() 方法替代操作。

<img src="/images/vue/013.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/014.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```js
//浏览器控制台，逐行输入试试看
vm.arr[0];
vm.arr[0] = "12345";
vm.arr.length;
vm.arr.length = 0;
vm.arr.pop();
vm.arr.push("新插入的内容");
Vue.set(vm.arr, 0, "123456");
```

### methods 选项

- 用于存储需要在 Vue 实例中使用的函数。

<img src="/images/vue/015.jpg" style="width: 40%; display:inline-block; margin: 0 ;">
<img src="/images/vue/016.jpg" style="width: 60%; display:inline-block; margin: 0 ;">

- methods 中的方法可以通过 vm.方法名 访问。
- 方法中的 this 为 vm 实例，可以便捷的访问 vm 数据等功能。

<img src="/images/vue/017.jpg" style="width: 80%; display:inline-block; margin: 0 ;">

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
      <p>{{ title1.split('-').join('') }}</p>
      <p>{{ title2.split('-').join('') }}</p>

      <p>{{ fn(title1) }}</p>
      <p>{{ fn(title2) }}</p>
    </div>

    <script src="lib/vue.js"></script>
    <script>
      var vm = new Vue({
        el: "#app",
        data: {
          prefix: "处理的结果为：",
          title1: "a-b-c-d-e",
          title2: "x-y-z",
        },
        methods: {
          fn(value) {
            // console.log(this);
            this.fn1();
            this.fn2();
            return this.prefix + value.split("-").join("");
          },
          fn1() {
            console.log("执行了 fn1 的代码");
          },
          fn2() {
            console.log("执行了 fn2 的代码");
          },
        },
      });

      // console.log(vm)
    </script>
  </body>
</html>
```

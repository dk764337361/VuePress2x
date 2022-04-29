# props 验证

- 当 prop 需要设置多种规则时，可以将 prop 的值设置为选项对象。

## 之前的类型检测功能通过 type 选项设置。

<img src="/images/vue/163.jpg" style="width: 70%; display:inline-block; margin: 0 ;">

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
      <my-component :par-str="str" :par-data="arr"></my-component>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      Vue.component("MyComponent", {
        props: {
          parStr: {
            type: String,
          },
          parData: {
            type: [Array, Object],
          },
        },
        templata: `<div></div>`,
      });
      new Vue({
        el: "#app",
        data: {
          str: "示例内容",
          arr: [1, 2, 3],
          obj: {
            content1: "内容1",
            content2: "内容2",
          },
        },
      });
    </script>
  </body>
</html>
```

## required 用于设置数据为必填项。

<img src="/images/vue/164.jpg" style="width: 70%; display:inline-block; margin: 0 ;">

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
      <my-component
        :par-str="str"
        :par-data="arr"
        :par-num="num"
      ></my-component>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      Vue.component("MyComponent", {
        props: {
          parStr: {
            type: String,
          },
          parData: {
            type: [Array, Object],
          },
          parNum: {
            type: Number,
            required: true,
          },
        },
        template: `<div></div>`,
      });
      new Vue({
        el: "#app",
        data: {
          str: "示例内容",
          arr: [1, 2, 3],
          obj: {
            content1: "内容1",
            content2: "内容2",
          },
          num: 100,
        },
      });
    </script>
  </body>
</html>
```

## default 用于给可选项指定默认值，当父组件未传递数据时生效。

- 当当父组件传递了数据，便会使用传递的数据代替默认值。
  <img src="/images/vue/165.jpg" style="width: 70%; display:inline-block; margin: 0 ;">

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
      <my-component
        :par-str="str"
        :par-data="arr"
        :par-num="num"
        :par-num2="2000"
      ></my-component>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      Vue.component("MyComponent", {
        props: {
          parStr: {
            type: String,
          },
          parData: {
            type: [Array, Object],
          },
          parNum: {
            type: Number,
            required: true,
          },
          parNum2: {
            type: Number,
            default: 100,
          },
        },
        template: `<div>{{parStr}}</div>`,
      });
      new Vue({
        el: "#app",
        data: {
          str: "示例内容",
          arr: [1, 2, 3],
          obj: {
            content1: "内容1",
            content2: "内容2",
          },
          num: 100,
        },
      });
    </script>
  </body>
</html>
```

## 注意：当默认值为数组或对象时，必须为工厂函数返回的形式。

<img src="/images/vue/166.jpg" style="width: 70%; display:inline-block; margin: 0 ;">

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
      <my-component
        :par-str="str"
        :par-data="arr"
        :par-num="num"
        :par-num2="2000"
        :par-arr="arr"
      ></my-component>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      Vue.component("MyComponent", {
        props: {
          parStr: {
            type: String,
          },
          parData: {
            type: [Array, Object],
          },
          parNum: {
            type: Number,
            required: true,
          },
          parNum2: {
            type: Number,
            default: 100,
          },
          parArr: {
            type: Array,
            // default:100, //报错
            // default:[1,2,3] //报错

            default: function() {
              return [1, 2, 3];
            },
            // default() {
            //   return [1, 2, 3];
            // },
          },
        },
        template: `<div>{{parStr}}</div>`,
      });
      new Vue({
        el: "#app",
        data: {
          str: "示例内容",
          arr: [10, 20, 30],
          obj: {
            content1: "内容1",
            content2: "内容2",
          },
          num: 100,
        },
      });
    </script>
  </body>
</html>
```

## validator 用于给传入的 prop 设置校验函数，return 值为 false 时 Vue.js 会发出警告。

<img src="/images/vue/167.jpg" style="width: 70%; display:inline-block; margin: 0 ;">


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
      <my-component
        :par-str="str"
        :par-data="arr"
        :par-num="num"
        :par-num2="2000"
        :par-arr="arr"
        par-content="lagou hello world"
      ></my-component>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      Vue.component("MyComponent", {
        props: {
          parStr: {
            type: String,
          },
          parData: {
            type: [Array, Object],
          },
          parNum: {
            type: Number,
            required: true,
          },
          parNum2: {
            type: Number,
            default: 100,
          },
          parArr: {
            type: Array,
            // default:100, //报错
            // default:[1,2,3] //报错

            default: function() {
              return [1, 2, 3];
            },
            // default() {
            //   return [1, 2, 3];
            // },
          },
          parContent: {
            type: String,
            validator(value) {
              console.log(this);
              return value.startsWith("lagou");  //startsWith()函数：以什么开头
            },
          },
        },
        template: `<div>{{parStr}}</div>`,
      });
      new Vue({
        el: "#app",
        data: {
          str: "示例内容",
          arr: [10, 20, 30],
          obj: {
            content1: "内容1",
            content2: "内容2",
          },
          num: 100,
        },
      });
    </script>
  </body>
</html>
```

::: warning 注意
验证函数中无法使用实例的 data、methods 等功能。
:::

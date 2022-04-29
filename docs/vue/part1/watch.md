# 侦听器 watch

## 侦听器用于监听数据变化并执行指定操作。

<img src="/images/vue/091.jpg" style="width: 70%; display:inline-block; margin: 0 ;">

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
      <input type="text" v-model="value" />
    </div>

    <script src="lib/vue.js"></script>
    <script>
      new Vue({
        el: "#app",
        data: {
          value: "",
        },
        watch: {
          value() {
            console.log("侦听器执行了");
          },
        },
      });
    </script>
  </body>
</html>
```

<img src="/images/vue/013.gif" style="width: 70%; display:inline-block; margin: 0 ;">

## 监听对象内部值的变化

- 为了监听对象内部值的变化，需要将 watch 书写为对象，并设置选项 deep: true，这时通过 handler 设置处理函数。

<img src="/images/vue/092.jpg" style="width: 70%; display:inline-block; margin: 0 ;">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>

    <script src="lib/vue.js"></script>
    <script>
      var vm = new Vue({
        el: "#app",
        data: {
          title: "这是内容",
          obj: {
            content1: "内容1",
            content1: "内容2",
          },
        },
        watch: {
          title(val, oldVal) {
            console.log("title被修改了", val, oldVal);
          },
          // obj(){
          //   console.log('obj被修改了');
          // }
          obj: {
            deep: true,
            handler() {
              console.log("obj被修改了");
            },
          },
        },
      });
    </script>
  </body>
</html>
```

<img src="/images/vue/093.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## 监听数组内部值的变化

::: warning 注意
当更改（非替换）数组或对象时，回调函数中的新值与旧值相同，因为它们的引用都指向同一个数组 、对象。
:::

::: warning 注意
数组操作不要使用索引与 length，无法触发侦听器函数。
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
    <div id="app"></div>

    <script src="lib/vue.js"></script>
    <script>
      var vm = new Vue({
        el: "#app",
        data: {
          title: "这是内容",
          obj: {
            content1: "内容1",
            content1: "内容2",
          },
          arr: [1, 2, 3, 4, 5],
        },
        watch: {
          title(val, oldVal) {
            console.log("title被修改了", val, oldVal);
          },
          // 当更改（非替换）数组或对象时，回调函数中的新值与旧值相同，因为它们的引用都指向同一个数组 、对象。
          obj: {
            deep: true, //deep只对对象生效
            handler(val, oldVal) {
              console.log("obj被修改了", val, oldVal);
              console.log("是否全等：", val === oldVal);
            },
          },
          arr(val, oldVal) {
            console.log("arr被修改了", val, oldVal);
          },

          //数组操作不要使用索引与 length，无法触发侦听器函数。
          //控制台输入 vm.arr[0]=2 ，然而无法触发侦听器函数。
          // arr: {
          //   deep: true,  //deep只对对象生效
          //   handler(val, oldVal) {
          //     console.log("arr被修改了", val, oldVal);
          //     console.log("是否全等：", val === oldVal);
          //   },
          // },
        },
      });
    </script>
  </body>
</html>
```

<img src="/images/vue/095.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
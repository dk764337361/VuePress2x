# 事件处理 v-on 

## 1.用于进行元素的事件绑定。

<img src="/images/vue/048.jpg" style="width: 60%; display:inline-block; margin: 0 ;">
<img src="/images/vue/049.jpg" style="width: 40%; display:inline-block; margin: 0 ;">

## 2.Vue.js 还为 v-on 指令提供了简写方式。

<img src="/images/vue/050.jpg" style="width: 60%; display:inline-block; margin: 0 ;">
<img src="/images/vue/049.jpg" style="width: 40%; display:inline-block; margin: 0 ;">

## 3.事件程序代码较多时，可以在 methods 中设置函数，并设置为事件处理程序。

<img src="/images/vue/051.jpg" style="width: 60%; display:inline-block; margin: 0 ;">
<img src="/images/vue/052.jpg" style="width: 40%; display:inline-block; margin: 0 ;">

## 4.设置事件处理程序后，可以从参数中接收`事件对象`。

<img src="/images/vue/053.jpg" style="width: 60%; display:inline-block; margin: 0 ;">

## 5.在视图中可以通过 \$event 访问事件对象。

<img src="/images/vue/054.jpg" style="width: 60%; display:inline-block; margin: 0 ;">
<img src="/images/vue/055.jpg" style="width: 40%; display:inline-block; margin: 0 ;">

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
      <p>{{ content }}</p>
      <button v-on:click="content='这是新的内容'">按钮</button>

      <button @click="content='这是按钮2设置的内容'">按钮2</button>

      <button @click="fn">按钮3</button>

      <button @click="fn2(200, $event)">按钮4</button>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      new Vue({
        el: "#app",
        data: {
          content: "这是默认内容",
        },
        methods: {
          fn(event) {
            console.log(event);
            this.content = "这是按钮3设置的内容";
          },
          fn2(value, event) {
            console.log(value, event);
          },
        },
      });
    </script>
  </body>
</html>
```
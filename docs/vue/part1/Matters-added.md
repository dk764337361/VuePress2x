# 事项新增

<!-- <img src="/images/vue/016.gif" style="width: 100%; display:inline-block; margin: 0 ;"> -->
<!-- <img src="/images/vue/104.jpg" style="width: 100%; display:inline-block; margin: 0 ;"> -->

## 输入框内容绑定

- 在 data 中设置 newTodo 用于存储数据，并绑定给新增输入框。
  <img src="/images/vue/107.jpg" style="width: 40%; display:inline-block; margin: 0 ;">
  <img src="/images/vue/108.jpg" style="width: 60%; display:inline-block; margin: 0 ;">

## 回车新增事项

### 方法一：

- 输入框回车时检测内容，并根据输入内容新增事项到 todos。

<img src="/images/vue/109.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/110.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 方法二：（效率高）

- app.js

```js{62-73}
(function(window) {
  "use strict";

  // Your starting point. Enjoy the ride!
  new Vue({
    el: "#app",
    data: {
      //todos用于存储所有事项信息
      todos: [
        {
          id: 1,
          title: "示例内容1",
          completed: true,
        },
        {
          id: 2,
          title: "示例内容2",
          completed: false,
        },
        {
          id: 3,
          title: "示例内容3",
          completed: true,
        },
      ],
      //存储新增输入框的数据
      newTodo: "",
    },
    computed: {
      //用于获取待办事项个数
      remaining() {
        // return this.todos.filter(function (todo) {
        // 	return !todo.completed;
        // }).length;
        return this.todos.filter((todo) => !todo.completed).length;
      },
      //用于设置全部切换选框状态
      // allDone() {
      // 	return this.remaining === 0;
      // },
      //最新功能书写方式
      allDone: {
        get() {
          return this.remaining === 0;
        },
        set(value) {
          //value代表全部切换选框的状态
          this.todos.forEach((todo) => {
            todo.completed = value;
          });
        },
      },
    },
    methods: {
      //进行单位复数处理
      // pluralize() {
      // 	return this.remaining === 1 ? "item" : "items";
      // },
      pluralize(word) {
        return word + (this.remaining === 1 ? "" : "s");
      },
      //用于新增事项
      addTodo() {
        var value = this.newTodo.trim();
        if (!value) return;
        this.todos.push({
          id: this.todos.length + 1,
          title: value,
          completed: false,
        }),
          (this.newTodo = "");
      },
    },
  });
})(window);
```

- index.html

```html{7}
<header class="header">
  <h1>todos</h1>
  <input
    class="new-todo"
    placeholder="What needs to be done?"
    autofocus
    v-model="newTodo"
    @keyup.enter="addTodo"
  />
</header>
```

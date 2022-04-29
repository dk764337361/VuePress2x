# 事项列表展示

## 1.引入 vue.js 文件，创建 Vue 实例设置挂载元素。

- index.html

```html{21}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Template • TodoMVC</title>
    <link rel="stylesheet" href="node_modules/todomvc-common/base.css" />
    <link rel="stylesheet" href="node_modules/todomvc-app-css/index.css" />
    <!-- CSS overrides - remove if you don't need it -->
    <link rel="stylesheet" href="css/app.css" />
  </head>
  <body>
    <!-- 挂载元素 -->
    <section class="todoapp" id="app">

      <!-- 此处省略 -->

    </section>
    <!-- Scripts here. Don't remove ↓ -->
    <!-- <script src="node_modules/todomvc-common/base.js"></script> -->
    <script src="node_modules/_vue@2.6.12@vue/dist/vue.js"></script>
    <script src="js/app.js"></script>
  </body>
</html>
```

## 2.在 data 中设置 todos 存储初始数据

  <img src="/images/vue/096.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- app.js

```js
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
          completed: false,
        },
      ],
    },
  });
})(window);
```

## 3.设置事项视图

<img src="/images/vue/097.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## 4.设置有无事项时的显示状态

<img src="/images/vue/098.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/014.gif" style="width: 100%; display:inline-block; margin: 0 ;">

- index.html

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>Template • TodoMVC</title>
		<link rel="stylesheet" href="node_modules/todomvc-common/base.css" />
		<link rel="stylesheet" href="node_modules/todomvc-app-css/index.css" />
		<!-- CSS overrides - remove if you don't need it -->
		<link rel="stylesheet" href="css/app.css" />
	</head>
	<body>
		<!-- 挂载元素 -->
		<section class="todoapp" id="app">
			<!-- 输入框区域 -->
			<header class="header">
				<h1>todos</h1>
				<input
					class="new-todo"
					placeholder="What needs to be done?"
					autofocus
				/>
			</header>
			<!-- 事项列表区域 -->
			<section class="main" v-show="todos.length">
				<input id="toggle-all" class="toggle-all" type="checkbox" />
				<label for="toggle-all">Mark all as complete</label>
				<ul class="todo-list">
					<!-- 已完成事项的li -->
					<!-- <li class="completed">
						<div class="view">
							<input class="toggle" type="checkbox" checked />
							<label>Taste JavaScript</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template" />
					</li> -->
					<!-- 待办事项的li -->
					<!-- <li>
						<div class="view">
							<input class="toggle" type="checkbox" />
							<label>Buy a unicorn</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Rule the web" />
					</li> -->
					<li
						v-for="todo in todos"
						:key="todo.id"
						:class="{completed:todo.completed}"
					>
						<div class="view">
							<input class="toggle" type="checkbox" v-model="todo.completed" />
							<label>{{todo.title}}</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Rule the web" />
					</li>
				</ul>
			</section>
			<!-- 状态栏区域 -->
			<footer class="footer" v-show="todos.length">
				<!-- This should be `0 items left` by default -->
				<span class="todo-count"><strong>0</strong> item left</span>
				<!-- Remove this if you don't implement routing -->
				<ul class="filters">
					<li>
						<a class="selected" href="#/">All</a>
					</li>
					<li>
						<a href="#/active">Active</a>
					</li>
					<li>
						<a href="#/completed">Completed</a>
					</li>
				</ul>
				<!-- Hidden if no completed items are left ↓ -->
				<button class="clear-completed">Clear completed</button>
			</footer>
		</section>
		<!-- Scripts here. Don't remove ↓ -->
		<!-- <script src="node_modules/todomvc-common/base.js"></script> -->
		<script src="node_modules/_vue@2.6.12@vue/dist/vue.js"></script>
		<script src="js/app.js"></script>
	</body>
</html>

```
# 目录结构说明

## 介绍⽬录结构

- 介绍⽬录结构与 Vue Router 的引⼊⽅式说明。

```
.
├── node_modules 第三⽅包存储⽬录
├── public 静态资源⽬录，内部的静态资源都会被简单的复制，⽽不经过 webpack
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── assets 资源⽬录，存储图⽚等资源
│   │   └── logo.png
│   ├── components 组件⽬录
│   │   └── HelloWorld.vue
│   ├── router 路由模块⽬录
│   │   └── index.js
│   ├── store 容器模块⽬录（Vuex）
│   │   └── index.js
│   ├── views 路由⻚⾯组件⽬录
│   │   ├── About.vue
│   │   └── Home.vue
│   ├── App.vue 根组件，最终被渲染到 index.html 中的 #app
│   └── main.js ⼊⼝⽂件
├── .browserslistrc 指定项⽬的⽬标浏览器范围，会被 @babel/preset-env 和 Autoprefixer ⽤来确定要转移的 JS 特性与 CSS 前缀
├── .editorconfig 编辑器配置⽂件，⽤来维护跨编辑器（或 IDE）的统⼀代码⻛格
├── .eslintrc.js ESLint 配置⽂件
├── .gitignore Git 的忽略配置⽂件
├── README.md 说明⽂档
├── babel.config.js Babel 配置⽂件
├── package-lock.json 记录包安装时的版本号
└── package.json 第三⽅包的说明⽂件，记录包的依赖信息等内容
```

## 调整初始⽬录

Vue CLI 初始化的项⽬中有许多示例⽂件，应予以删除；同时根据需求增加或修改其他⽂件与⽬录。

- 要删除默认的初始化⽂件
  - src/assets/logo.png
  - src/components/HelloWorld.vue
  - src/views/About.vue
  - src/views/Home.vue
- 新增以下⽬录：
  - src/services ⽬录，⽤于存放接⼝功能模块
  - src/styles ⽬录，⽤于存放全局样式
  - src/utils ⽬录，⽤于存放⼯具模块
- 调整结果如下：

```
├── node_modules
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── assets
│   ├── components
│   ├── router
│   │ └── index.js
│   ├── services
│   ├── store
│   │ └── index.js
│   ├── styles
│   ├── utils
│   ├── views
│   ├── App.vue
│   └── main.js
├── .browserslistrc
├── .editorconfig
├── .eslintrc.js
├── .gitignore
├── README.md
├── babel.config.js
├── package-lock.json
└── package.json
```

## 文件删除和修改

- 修改 App.vue：

```vue
// App.vue
<template>
  <div id="app">
    <!-- 示例内容 -->
    <h1>拉勾教育</h1>
    <!-- 根路由出⼝，⽤于渲染路由组件 -->
    <router-view />
  </div>
</template>
<style lang="scss" scoped></style>
```

- 修改 src/router/index.js 路由模块，删除路由规则，删除 HelloWorld.vue 引⼊。

```js
// router/index.js
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
// 路由规则
const routes = [];
const router = new VueRouter({
  routes,
});

export default router;
```

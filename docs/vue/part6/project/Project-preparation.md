# 项目准备

## 项目简介

此项目采用最新技术栈（Vue3+Vite2+Vue Router4+Vuex4+Vant3）实现的综合电商平台项目

配备 H5、PC 后台、Flutter 等版本

## 创建 Vite 项目

```sh
$ npm create vite@latest
--------------------------------------------------------------
√ Project name: ... lagou-shop-mobil
? Select a framework: » - Use arrow-keys. Return to submit.
    vanilla
>   vue
    react
    preact
    lit
    svelte
--------------------------------------------------------------
? Select a variant: » - Use arrow-keys. Return to submit.
>   vue
    vue-ts
--------------------------------------------------------------
√ Project name: ... lagou-shop-mobil
√ Select a framework: » vue
√ Select a variant: » vue

Scaffolding project in D:\LaGou\Practise\lagou-shop-mobil...

Done. Now run:

  cd lagou-shop-mobil
  npm install
  npm run dev
```

<!-- <img src="/images/vue/097.gif" style="width: 100%; display:inline-block; margin: 0 ;"> -->

## 安装项目依赖

### 有赞前端库 Vant

```sh
npm i vant@next -S
```

### Vue-router

```sh
npm i vue-router@4
```

### VueX 状态管理

```sh
npm i vuex@next -S
```

### CSS 扩展语言-Sass

```sh
npm i -D sass
```

## 添加版本控制

### git 初始化

```sh
git init
git add .
git commit -m "安装项目依赖"
```

### 在 Github 创建仓库

<img src="/images/vue/459.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```sh
git remote add origin https://github.com/dk764337361/lagou-edu-mobil.git
git branch -M main
git push -u origin main
```

## 配置代码校验规则-ESlint

### 安装 eslint

```sh
# 安装
npm i eslint -S
```

### 生成 .eslintrc.js 配置文件

```sh
# 生成 .eslintrc.js 配置文件
npx eslint --init
------------------------------------------------------
You can also run this command directly using 'npm init @eslint/config'.
? How would you like to use ESLint? ...
  To check syntax only
  To check syntax and find problems
> To check syntax, find problems, and enforce code style
------------------------------------------------------
? What type of modules does your project use? ...
> JavaScript modules (import/export)
  CommonJS (require/exports)
  None of these
------------------------------------------------------
? Which framework does your project use? ...
  React
> Vue.js
  None of these
------------------------------------------------------
? Does your project use TypeScript? » No
------------------------------------------------------
? Where does your code run? ...  (Press <space> to select, <a> to toggle all, <i> to invert selection)
√ Browser
√ Node
------------------------------------------------------
? How would you like to define a style for your project? ...
> Use a popular style guide
  Answer questions about your style
------------------------------------------------------
? Which style guide do you want to follow? ...
  Airbnb: https://github.com/airbnb/javascript
> Standard: https://github.com/standard/standard
  Google: https://github.com/google/eslint-config-google
  XO: https://github.com/xojs/eslint-config-xo
------------------------------------------------------
? What format do you want your config file to be in? ...
> JavaScript
  YAML
  JSON
------------------------------------------------------
? Would you like to install them now? » Yes
------------------------------------------------------
? Which package manager do you want to use? ...
> npm
  yarn
  pnpm
------------------------------------------------------
......此处省略一万字
Successfully created .eslintrc.js file in D:\LaGou\Practise\lagou-shop-mobil
```

### 配置.eslintrc 文件

[Vue3 基础笔记传送门](/vue/part6/Vue3-base/vue-base.html#配置-eslintrc-文件)

## 项目目录准备

### 对已有文件删改

```
lagou-shop-mobil
├─ public
│ └─ favicon.ico
├─ src
│ ├─ assets
│ │ └─ logo.png (删)
│ ├─ components
│ │ └─ HelloWorld.vue(删)
│ ├─ App.vue (改)
│ └─ main.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ README.md
└─ vite.config.js
```

```vue
<!-- src\App.vue -->
<script setup></script>

<template>
  项目准备中
</template>

<style></style>
```

### 新增文件

```
lagou-shop-mobil
├─ public
│ └─ favicon.ico
├─ src
│ ├─ api (新增，放置 API)
│ ├─ assets
│ ├─ components
│ ├─ router (新增，放置路由配置)
│ ├─ store (新增，放置 Vuex 配置)
│ ├─ styles (新增，放置 css 样式文件)
│ ├─ utils (新增，放置工具配置)
│ ├─ views (新增，放置视图文件)
│ ├─ App.vue
│ └─ main.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ README.md
└─ vite.config.js
```

## 请求模块 Axios

```sh
npm i axios -S
```

```
utils
└─ request.js  （新增）
```

```js
// src\utils\request.js
import axios from 'axios'

const request = axios.create({
  // 项目基地址
  baseURL: 'https://shop.fed.lagounews.com/api',
})

export default request
```

```sh
# 最后进行eslint检查
npm run lint
```

### 项目接口文档与测试账号

[语雀·传送门](https://www.yuque.com/docs/share/1337b971-64aa-42b1-9814-8433e8f91bfe?#)

- 测试账号：17201234567
- 密码：qwer1234


## 路由页面准备

views 目录下新增相对应目录和文件

```
src
├─ views
   ├─ Cart            （新增，购物车）
   │  └─ index.vue    （新增）
   ├─ Category        （新增，分类）
   │  └─ index.vue    （新增）
   ├─ CategoryDetail  （新增，分类详情）
   │  └─ index.vue    （新增）
   ├─ Home            （新增，首页）
   │  └─ index.vue    （新增）
   ├─ Login           （新增，登陆）
   │  └─ index.vue    （新增）
   ├─ NotFound        （新增，404页）
   │  └─ index.vue    （新增）
   ├─ Order           （新增，订单）
   │  └─ index.vue    （新增）
   ├─ OrderConfirm    （新增，订单确认）
   │  └─ index.vue    （新增）
   ├─ OrderDetail     （新增，订单详情）
   │  └─ index.vue    （新增）
   ├─ Pay             （新增，支付）
   │  └─ index.vue    （新增）
   ├─ Product         （新增，产品）
   │  └─ index.vue    （新增）
   ├─ Recommend       （新增，推荐）
   │  └─ index.vue    （新增）
   ├─ Search          （新增，搜索）
   │  └─ index.vue    （新增）
   └─ User            （新增，用户）
      └─ index.vue    （新增）

```

## 路由别名与路由规则

因为 Vue3 必须搭配 VueRouter4 使用，需要注意 VueRouter3 和 VueRouter4 的区别

### 路由规则

#### 1. 新增路由规则配置

```
src
├─ router
   └─ index.js  (新增)
```

```js
// src\router\index.js
import {
  createRouter,
  createWebHashHistory,
  // createWebHistory,
} from 'vue-router'

// 路由规则配置

const routes = [
  {
    path: '',
    name: '',
    // 路由懒加载
    component: () => import(''),
  },
]

// 创建router 实例
const router = createRouter({
  // history: createWebHistory() // History 模式
  history: createWebHashHistory(), // hash 模式
  routes,
})

export default router
```

#### 2. 在 main.js 引入 router

```js
// src\main.js
import { createApp } from 'vue'
import App from './App.vue'
// 引入router
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
```

#### 3.App.vue 设置根路由出口

```vue
<!-- src\App.vue -->
<script setup></script>

<template>
  <!-- 根路由出口 -->
  <router-view />
</template>

<style></style>
```

### 配置路由别名

```js
// vite.config.js
......
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
......
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') }
    ]
  }
})

```

#### 补全路由配置

```js
// src\router\index.js

import {
  createRouter,
  createWebHashHistory,
  //  createWebHistory
} from 'vue-router'

// 路由规则配置

const routes = [
  {
    path: '/login',
    name: 'login',
    // 路由懒加载
    // 注意：尤雨溪在VueRouter4提出必须补全.vue后缀名
    // 注意：Vite的小缺点：目录名(Login)是大写开头，在这（vite.config.js）里写也必须是大写开头。
    //       如果在以小写开头，build不影响但热更新会失效
    component: () => import('@/views/Login/index.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home/index.vue'),
  },
  {
    path: '/category',
    name: 'category',
    component: () => import('@/views/Category/index.vue'),
  },
  {
    path: '/category-detail/:categoryId',
    name: 'category-detail',
    component: () => import('@/views/CategoryDetail/index.vue'),
    props: true,
  },
  // {
  //   path: '/address',
  //   name: 'address',
  //   component: () => import('@/views/Address/index.vue'),
  //   props: true,
  //   meta: { requireAuth: true }
  // },
  {
    path: '/order-confirm',
    name: 'order-confirm',
    component: () => import('@/views/OrderConfirm/index.vue'),
    props: true,
    meta: { requireAuth: true },
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/Order/index.vue'),
    meta: { requireAuth: true },
  },
  {
    path: '/order-detail/:orderId',
    name: 'order-detail',
    component: () => import('@/views/OrderDetail/index.vue'),
    props: true,
    meta: { requireAuth: true },
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('@/views/Pay/index.vue'),
    meta: { requireAuth: true },
  },
  {
    path: '/product/:productId',
    name: 'product',
    component: () => import('@/views/Product/index.vue'),
    props: true,
  },
  // {
  //   path: '/comment/:productId',
  //   name: 'comment',
  //   component: () => import('@/views/Comment/index.vue'),
  //   props: true
  // },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import('@/views/Recommend/index.vue'),
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/Cart/index.vue'),
    meta: { requireAuth: true },
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search/index.vue'),
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/User/index.vue'),
    meta: { requireAuth: true },
  },
  {
    // 注意：与webpack不同，vite不能以*为标识了，需要pathMatch进行处理
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound/index.vue'),
  },
]

// 创建router 实例
const router = createRouter({
  // history: createWebHistory() // History 模式
  history: createWebHashHistory(), // hash 模式
  routes,
})

export default router
```

最后 npm run dev 跑起来测试下吧

<img src="/images/vue/098.gif" style="width: 100%; display:inline-block; margin: 0 ;">

## 移动端适配

[以往笔记传送门](/vue/part4/Project-Architecture.html#移动端适配)

::: warning 注意
vite 中已集成了 postcss，无需再单独安装，[Vite 官方文档](https://vitejs.cn/config/#css-postcss)
:::

```sh
# 额外安装
npm i autoprefixer -D
```

<img src="/images/vue/099.gif" style="width: 100%; display:inline-block; margin: 0 ;">

## 公共样式文件

### 创建 base.css

```
src
├─ styles
│  └─ base.css  (新增)

......
```

```css
/* src\styles\base.css */
* {
  margin: 0;
  padding: 0;
}
```

### 引入到 main.js

```js
// src\main.js
......
import '@/styles/base.css'
......

```

## 引入 Vant

[以往笔记传送门](/vue/part4/Project-Architecture.html#vant-组件库)

## 公共组件 LayoutFooter

### 创建

```
src
├─ api
├─ assets
├─ components
   └─ LayoutFooter.vue  (新增)
```

```vue
<!--
 * LayoutFooter.vue
-->
<template>
  <div class="index">
    公共底部
  </div>
</template>

<script setup>
import {} from 'vue'
</script>

<style lang="scss" scoped></style>
```

### 引入

1. 引入写法

```vue
<template>
  xxx页面
  <layout-footer />
</template>

<script setup>
import LayoutFooter from '@/components/LayoutFooter.vue'
</script>

<style scoped></style>
```

2. 需要引入到的文件

```
src
├─ views
│  ├─ Cart
│  │  └─ index.vue  (引入)
│  ├─ Category
│  │  └─ index.vue   (引入)
│  ├─ CategoryDetail
│  │  └─ index.vue
│  ├─ Home
│  │  └─ index.vue   (引入)
│  ├─ Login
│  │  └─ index.vue
│  ├─ NotFound
│  │  └─ index.vue
│  ├─ Order
│  │  └─ index.vue
│  ├─ OrderConfirm
│  │  └─ index.vue
│  ├─ OrderDetail
│  │  └─ index.vue
│  ├─ Pay
│  │  └─ index.vue
│  ├─ Product
│  │  └─ index.vue
│  ├─ Recommend
│  │  └─ index.vue   (引入)
│  ├─ Search
│  │  └─ index.vue
│  └─ User
│     └─ index.vue   (引入)
├─ App.vue
└─ main.js

```

### 介绍官方示例和需要使用的属性

1. Vant组件 官方示例

```
<van-tabbar v-model="active">
  <van-tabbar-item icon="home-o">标签</van-tabbar-item>
  <van-tabbar-item icon="search">标签</van-tabbar-item>
  <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
  <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
</van-tabbar>


import { ref } from 'vue';

export default {
  setup() {
    const active = ref(0);
    return { active };
  },
};

```

2. Tabbar 的[to 属性](https://youzan.github.io/vant/#/zh-CN/tabbar#tabbaritem-props)

| 参数 | 说明                                                   | 类型   | 默认值 |
| ---- | ------------------------------------------------------ | ------ | ------ |
| to   | 点击后跳转的目标路由对象，等同于 vue-router 的 to 属性 | string | object | - |

3. Tabbar 的[路由模式](https://youzan.github.io/vant/#/zh-CN/tabbar#lu-you-mo-shi)，使在点击图标时产生颜色高亮。

4. [icon 组件](https://youzan.github.io/vant/#/zh-CN/icon)


### 修改LayoutFooter.vue

```vue
<!-- LayoutFooter.vue -->

<template>
  <van-tabbar route>
    <van-tabbar-item icon="home-o" to="/">
      首页
    </van-tabbar-item>
    <van-tabbar-item icon="apps-o" to="/category">
      分类
    </van-tabbar-item>
    <van-tabbar-item icon="gift-o" to="/recommend">
      推荐
    </van-tabbar-item>
    <van-tabbar-item icon="cart-o" to="/cart">
      购物车
    </van-tabbar-item>
    <van-tabbar-item icon="user-o" to="/user">
      我的
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup></script>

<style lang="scss" scoped></style>
```

#### CSS问题

随着导航的切换，每次组件文件加载都是异步操作，加载时就可能出现顺序的问题。后续做导航切换就可能出现上面样式和下面样式分组不同文件。某些样式，某些文件加载样式顺序时，样式生效的效果出现变化。这时为了避免这个问题，将这些核心的样式添加`权重`


<img src="/images/vue/460.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```vue
<!-- LayoutFooter.vue -->

<style lang="scss" scoped>
// 增加fixed 样式的权重
.vant-tabbar{
  position: fixed !important;
}
</style>

```
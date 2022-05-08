# 搭建项目架构

## 项目后台 API 文档地址

<img src="/images/vue/392.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/393.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## 项目准备

### 使⽤ Vue CLI 创建项⽬

<img src="/images/vue/379.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/380.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/381.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/382.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/383.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/384.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/385.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/386.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 加⼊ Git 管理

- .gitignore 文件

```
.DS_Store
node_modules
/dist


# local env files
.env.local
.env.*.local

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
node_modules

```

### 进⾏初始⽂件处理

- 删除 src/assets/logo.png
- 删除 src/components/HelloWorld.vue
- 删除 src/views/AboutView.vue
- 删除 src/views/HomeView.vue
- 修改 src/router/index.js，去除 route 内容

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = []

const router = new VueRouter({
  routes,
})

export default router
```

- 修改 src/App.vue，只保留根路由出⼝

```vue
<template>
  <!-- 根路由出口 -->
  <router-view />
</template>

<style lang="scss"></style>
```

- 添加 src/services ⽬录，⽤于存放 API 请求模块
- 添加 src/utils ⽬录，⽤于存放⼯具模块

## Vant 组件库

::: tip 提示
Vant 是有赞前端团队开源的移动端组件库，是业界主流的移动端组件库之⼀。
:::

⽬前 Vant 官⽅提供了 [Vue 2 版本](https://vant-contrib.gitee.io/vant)、[Vue 3 版本](https://vant-contrib.gitee.io/vant/next)和[微信⼩程序版本](http://vant-contrib.gitee.io/vant-weapp)，并由社区团队维护 React 版本。

官⽹：https://vant-contrib.gitee.io/vant/#/zh-CN/

Github 仓库：https://github.com/youzan/vant

### 安装

1. 通过 npm 安装

```sh
# Vue 3 项目，安装最新版 Vant
npm i vant

# Vue 2 项目，安装 Vant 2
npm i vant@latest-v2
```

2. 通过 CDN 安装

```html
<!-- 引⼊样式⽂件 -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/vant@2.12/lib/index.css"
/>

<!-- 引⼊ Vue 和 Vant 的 JS ⽂件 -->
<script src="https://cdn.jsdelivr.net/npm/vue@2.6/dist/vue.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vant@2.12/lib/vant.min.js"></script>
...
```

3. 通过脚⼿架安装
   利⽤图形化界⾯进⾏安装，本质还是命令。

```
# 安装 Vue Cli
npm install -g @vue/cli
# 创建⼀个项⽬
vue create hello-world
# 创建完成后，可以通过命令打开图形化界⾯，如下图所示
vue ui
```

添加项⽬后，选择依赖 -> 安装依赖

<img src="/images/vue/387.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

搜索 vant，选中并安装，等待安装完成。

<img src="/images/vue/388.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

安装成功。

<img src="/images/vue/389.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
<img src="/images/vue/390.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 引入

在 main.js 中引⼊ Vant，即可在所有组件中使⽤任意组件，⼗分⽅便。

```vue
import Vue from 'vue' import Vant from 'vant' import 'vant/lib/index.css'
Vue.use(Vant)
```

## 浏览器适配

- Vant 中的样式默认使⽤ px 作为单位，如果需要使⽤ rem 单位，推荐使⽤以下两个⼯具：
  - [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) 是⼀款 postcss 插件，⽤于将单位转化为 rem 。
  - [lib-flexible](https://github.com/amfe/lib-flexible) ⽤于设置 rem 基准值。

### lib-flexible(F12，动态看 rem)

lib-flexible ⽤于动态设置 rem 基准值。

1. 安装

```sh
npm i -S amfe-flexible
```

2. 在 `main.js` 中加载执⾏该模块：

```sh
import 'amfe-flexible'
```

通过模拟器切换设备，查看 html 元素 font-size 是否能够⾃动变化。

### postcss-pxtorem(辅助代码设置 rem)

⽤于将 px 设置为 rem 。

1. 安装

```sh
npm install postcss-pxtorem -D
```

2. 在项⽬根⽬录创建 .postcssrc.js ⽂件，并设置以下配置

```js
module.exports = {
  plugins: {
    autoprefixer: {
      // browsers: ['Android >= 4.0', 'iOS >= 8']
    },
    'postcss-pxtorem': {
      // rootValue：设计图与分割分数，默认为37.5一份
      rootValue: 37.5,
      // propList：告诉浏览器哪些属性(例如width、height.....)需要将px设置为rem,
      propList: ['*'],
    },
  },
}
```

设置测试代码，在浏览器中查看是否能将 px ⾃动转换为 rem 。

### PostCSS（样式兼容-浏览器前缀）

- postcss-pxtorem 是 PostCSS 的一个子功能

- 官⽹：https://www.postcss.com.cn/
  PostCSS 是⼀个允许使⽤ JS 插件转换样式的⼯具。 这些插件可以检查（lint）你的 CSS，⽀持 CSS Variables 和 Mixins， 编译尚未被浏览器⼴泛⽀持的先进的 CSS 语法，内联图⽚，以及其它很多优秀的功能。

PostCSS 被⼴泛地应⽤，其中不乏很多有名的⾏业领导者，如：维基百科，Twitter，阿⾥巴巴，JetBrains。PostCSS 的 [Autoprefixer](https://github.com/postcss/autoprefixer) 插件是最流⾏的 CSS 处理⼯具之⼀。

- PostCSS 是⼀个处理 CSS 的处理⼯具，本身功能⽐较单⼀，它主要负责解析 CSS 代码，再交由插件来进⾏处理，它的插件体系⾮常强⼤，所能进⾏的操作是多种多样的，例如：
  - [Autoprefixer](https://github.com/postcss/autoprefixer) 插件可以实现⾃动添加浏览器相关的声明前缀
  - [PostCSS Preset Env](https://github.com/csstools/postcss-preset-env) 插件可以让你使⽤更新的 CSS 语法特性并实现向下兼容
  - [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) 可以实现将 px 转换为 rem

PostCSS ⼀般不单独使⽤，⽽是与已有的构建⼯具进⾏集成。
[Vue CLI](https://cli.vuejs.org/zh/guide/css.html#postcss) 内部集成了 PostCSS，并默认开启了[autoprefixer](https://github.com/postcss/autoprefixer) 插件，如果要配置⽬标浏览器，可使⽤
package.json 的 [browserslist](https://cli.vuejs.org/zh/guide/browser-compatibility.html#browserslist) 字段。

之前我们设置的 .postcssrc.js 就是 PostCSS 的配置⽂件，但需要注意的时，内部 autoprefixer 设置 browsers 配置兼容浏览器信息的写法不被推荐，应添加到`.browserlistrc.js` 中

<img src="/images/vue/391.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

修改 .browserlistrc.js。

```
> 1%
last 2 versions
not dead
Android >= 4.0
iOS >= 8
```

## 路由处理

### 初始化路由组件

在 views ⽬录下创建以下⽬录与⽂件，并进⾏初始内容设置。

```
views
├── course 选课⻚⾯
│ └── index.vue
├── error-page 错误⻚⾯
│ └── index.vue
├── learn 学习⻚⾯
│ └── index.vue
├── login 登录⻚⾯
│ └── index.vue
 └── user ⽤户⻚⾯
 └── index.vue
```

### 配置路由规则

```js
// router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: 'login' */ '@/views/login/index'),
  },
  {
    path: '/',
    name: 'course',
    component: () =>
      import(/* webpackChunkName: 'course' */ '@/views/course/index'),
  },
  {
    path: '/learn',
    name: 'learn',
    component: () =>
      import(/* webpackChunkName: 'learn' */ '@/views/learn/index'),
  },
  {
    path: '/user',
    name: 'user',
    component: () =>
      import(/* webpackChunkName: 'user' */ '@/views/user/index'),
  },
  {
    path: '*',
    name: 'error-page',
    component: () =>
      import(/* webpackChunkName: 'error-page' */ '@/views/error-page/index'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
```

## 封装请求模块

封装请求模块，便于统⼀处理请求功能，安装 Axios

```sh
npm i axios
```

初始化 axios，观察接⼝⽂档，将基地址 http://edufront.lagounews.com 设置给 baseURL 即可。

```js
// src/utils/request.js
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://edufront.lagounews.com',
})

export default request
```

- 测试数据

```vue
<template>
  <!-- 根路由出口 -->
  <router-view />
</template>

<script>
import request from '@/utils/request'

request({
  method: 'GET',
  url: '/front/ad/getAdList',
})

export default {}
</script>

<style lang="scss"></style>
```

<img src="/images/vue/394.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## 公共组件 LayoutFooter

<img src="/images/vue/395.jpg" style="width: 70%; display:inline-block; margin: 0 ;">

选课、学习、⽤户都具有共同的底部导航，将导航封装为公共组件，并保存在 src/components 中。
导航使⽤ Vant 的 [Tabbar](https://vant-contrib.gitee.io/vant/#/zh-CN/tabbar) 组件，图标可以通过 [Icon](https://vant-contrib.gitee.io/vant/#/zh-CN/icon)组件设置。

```vue
// Vant 官⽅示例：Tabbar 组件 路由模式
<router-view />
<van-tabbar route>
<van-tabbar-item replace to="/home" icon="home-o">标签</van-tabbar-item>
<van-tabbar-item replace to="/search" icon="search">标签</van-tabbar-item>
</van-tabbar>
```

- 设置给 src/components/LayoutFooter.vue ，并进⾏路由跳转设置
  - to 属性⽤于设置跳转的⽬标路由对象，同 vue-router 的 to 属性。

```vue
// layout/components/LayoutFooter.vue
<template>
  <div class="layout-footer">
    <van-tabbar route>
      <van-tabbar-item replace to="/" icon="orders-o">选课</van-tabbar-item>
      <van-tabbar-item replace to="/learn" icon="desktop-o"
        >学习</van-tabbar-item
      >
      <van-tabbar-item replace to="/user" icon="user-o">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutFooter',
}
</script>

<style lang="scss" scoped></style>
```

```vue
// /src/views/course/index.vue
<template>
  <div class="course">
    <layout-footer></layout-footer>
  </div>
</template>

<script>
import LayoutFooter from '@/components/LayoutFooter.vue'
export default {
  name: 'CourseIndex',
  props: {},
  components: {
    LayoutFooter,
  },
  data() {
    return {}
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {},
  methods: {},
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
}
</script>
<style lang="scss" scoped></style>
```
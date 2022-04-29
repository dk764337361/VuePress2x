# 样式和布局

## 饿了么Element

- Element 是饿了么官⽅提供的组件库，⾮常适合开发后台管理系统等相关类型的项⽬。
  - 官⽹：https://element.eleme.cn/
  - GitHub 仓库：https://github.com/ElemeFE/element

### 安装

```sh
npm i element-ui -S
```

### 2. 在 main.js 中导⼊

element-ui 中有许多组件，引⼊是可以采⽤两种⽅式，完整引⼊或按需引⼊，不同的引⼊⽅式根据组
件的使⽤数量决定，最终影响打包后的⽂件体积。这⾥的项⽬采⽤完整引⼊⽅式。

```js
// main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引⼊ element 组件库
import ElementUI from 'element-ui'
// 引⼊ element 主题⽂件
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
// 注册为Vue插件
Vue.use(ElementUI)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

```

### 3. 测试使⽤（例如在 App.vue 中设置 element 组件）

```vue
// App.vue
<template>
  <div id="app">
    <h1>拉钩教育</h1>
    <!-- 根路由出口 -->
    <router-view />
    <!-- Element的按钮组件，测试后删除 -->
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
  </div>
</template>

<style lang="scss"></style>
```

## 样式文件

- Element ⾃定义主题样式
- 在 /src/styles ⽬录下创建以下样式⽂件

```
.
├── index.scss 全局样式⽂件
├── mixin.scss 公共的 mixin 混⼊⽂件，⽤于保存复⽤样式
├── reset.scss 重置样式⽂件
└── variables.scss 样式变量⽂件
```

- 在 variables.scss 中添加以下样式变量（符合项⽬⻛格的颜⾊、字体），设置样式时可以直接使⽤，便于维护。

```scss
// styles/variables.scss
$primary-color: #40586F;
$success-color: #51cf66;
$warning-color: #fcc419;
$danger-color: #ff6b6b;
$info-color: #868e96; // #22b8cf;

$body-bg: #E9EEF3; // #f5f5f9;
$sidebar-bg: #F8F9FB;
$navbar-bg: #F8F9FB;

$font-family: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
```
- 在 index.scss 中添加以下样式，作为全局样式。

```scss
// styles/index.scss
@import './variables.scss';

// globals
html {
  font-family: $font-family;
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  // better Font Rendering
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  background-color: $body-bg;
}

// custom element theme 更改 element 主题色
$--color-primary: $primary-color;
$--color-success: $success-color;
$--color-warning: $warning-color;
$--color-danger: $danger-color;
$--color-info: $info-color;
// change font path, required 改变 icon 字体路径变量，必需
$--font-path: '~element-ui/lib/theme-chalk/fonts';
// import element default theme 引入 element 默认主题文件（样式文件）
@import '~element-ui/packages/theme-chalk/src/index';
// node_modules/element-ui/packages/theme-chalk/src/common/var.scss

// overrides
// .el-menu-item, .el-submenu__title {
//   height: 50px;
//   line-height: 50px;
// }

.el-pagination {
  color: #868e96;
}

// components
.status {
  display: inline-block;
  cursor: pointer;
  width: .875rem;
  height: .875rem;
  vertical-align: middle;
  border-radius: 50%;

  &-primary {
    background: $--color-primary;
  }

  &-success {
    background: $--color-success;
  }

  &-warning {
    background: $--color-warning;
  }

  &-danger {
    background: $--color-danger;
  }

  &-info {
    background: $--color-info;
  }
}
```

- 在⼊⼝⽂件 src/main.js 中引⼊全局样式⽂件 index.scss，同时移除⼊⼝⽂件中的 element 样式⽂件引⼊。

```js
//main.js
 // 引⼊ element 样式⽂件 (在全局样式⽂件中修改 element 主题后引⼊了)
 import 'element-ui/lib/theme-chalk/index.css'
// 引⼊全局样式
import './styles/index.scss'
```

## 共享全局样式变量

当我们需要在组件中使⽤ variable.scss 中定义的变量时，需要先引⼊⽂件，然后才能访问变量，如果每
个组件都要使⽤的话就可以通过共享访问。
例如，在 App.vue 中根据样式变量进⾏颜⾊设置，~@ 代表 src ⽬录。

- 由于 css 与 sass 的相对路径写法没有区别，如果要使⽤特殊写法，必须设置 ~。
- @ 代表 /src ⽬录，为 webpack 别名，如果要在 sass 中使⽤，则需要书写为 ~@。

```vue {19-24}
// App.vue
<template>
  <div id="app">
    <h1>拉钩教育</h1>
    <!-- 根路由出口 -->
    <router-view />
    <!-- Element的按钮组件，测试后删除 -->
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
div {
  background-color: $success-color;
}
</style>
```

- 如果其他组件也需要操作，就可以配置 [Vue CLI【向预处理器 Loader 传递选项】](https://cli.vuejs.org/zh/guide/css.html#%E5%90%91%E9%A2%84%E5%A4%84%E7%90%86%E5%99%A8-loader-%E4%BC%A0%E9%80%92%E9%80%89%E9%A1%B9) 向所有 Sass/Less 样式传⼊共享的全局变量(Vue
  CLI ⽂档)。

sass-loader ⽂档：[addtionalData](https://www.npmjs.com/package/sass-loader)
sass-loader v8 指的是 8.x 版本，从 9.x 更新为了 addtionalData，现⾏ 10.x。
具体版本应查看 package.json 中的版本信息再进⾏对应设置。
在 package.json 同级创建 [vue.config.js](https://cli.vuejs.org/zh/config/#vue-config-js) ⽂件，并设置以下配置：

```vue {19-24}
// App.vue
<template>
  <div id="app">
    <h1>拉钩教育</h1>
    <!-- 根路由出口 -->
    <router-view />
    <!-- Element的按钮组件，测试后删除 -->
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
// @import "~@/styles/variables.scss";
div {
  background-color: $success-color;
}
</style>
```

```js
// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时⽣效
      // 因为 `scss` 语法在内部也是由 sass-loader 处理的
      // 但是在配置 `prependData` 选项的时候
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 在这种情况下，我们可以使⽤ `scss` 选项，对 `scss` 语法进⾏单独配置
      scss: {
        // prependData是sass v8版本API，在sass v9+之后改为additionalData
        // 将路径修改为实际路径，添加 /styles 部分
        // prependData: '@import "~@/styles/variables.scss";'
        additionalData: '@import "~@/styles/variables.scss";'
      }
    }
  }
}
```

完成啦~保存配置后，重新 npm run serve 。

<img src="/images/vue/279.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

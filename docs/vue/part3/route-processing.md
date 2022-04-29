# 路由处理

## 初始化路由⻚⾯组件

在 views ⽬录中创建路由⻚⾯组件，设置⽅式如下：

- 每个⻚⾯组件设置独⽴⽬录，内部的 index.vue 为默认组件，如果当前⻚⾯还有其他组件，例如新建等功能，在 index.vue 同级设置即可。如果要拆分⼦组件，可以在 index.vue 同级创建 components ⽬录存储。
- login 与 error-page 对应⼀级路由，⽽ user、menu 等其他组件对应⼆级路由，这时单独创建 layout 组件⽤来设置后台常规⻚⾯的⼀级路由，这样 App.vue 中只设置根路由出⼝即可。

```
 # views
 .
 ├── advert ⼴告管理
 │   └── index.vue
 ├── advert-space ⼴告位管理
 │   └── index.vue
 ├── course 课程管理
 │   └── index.vue
 ├── error-page 错误⻚⾯
 │   └── index.vue
 ├── home 主⻚
 │   └── index.vue
 ├── layout 布局组件
 │   └── index.vue
 ├── login 登录
 │   └── index.vue
 ├── menu 菜单管理
 │   └── index.vue
 ├── resource 资源管理
 │   └── index.vue
 ├── role ⻆⾊管理
 │   └── index.vue
 └── user ⽤户管理
 └── index.vue
```
<img src="/images/vue/282.jpg" style="width: 100%; display:inline-block; margin: 0 ;">


## 路由处理-配置路由规则

在 router/index.js 中定义路由规则，传统⽅式需要先引⼊每个组件模块，再进⾏路由规则设置。

- ⼀级路由为：login、layout、error-page
- error-page 设置 path 为 '\*'，⽤于匹配未知路由地址并显示 404 ⻚⾯。
- 剩余组件均设置为 layout 的⼆级路由，其中 home 为 layout 的默认路由组件。

```js
// router/index.js
import Vue from "vue";
import VueRouter from "vue-router"
import Login from "@/views/login/index"
import Layout from "@/views/layout/index"
import Home from "@/views/home/index"
import Role from "@/views/role/index"
import Menu from "@/views/menu/index"
import Resource from "@/views/resource/index"
import Course from "@/views/course/index"
import User from "@/views/user/index"
import Advert from "@/views/advert/index";
import AdvertSpace from "@/views/advert-space/index"
import ErrorPage from "@/views/error-page/index"
Vue.use(VueRouter)

// 路由规则
const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "",
        name: "home",
        component: Home,
      },
      {
        path: "/role",
        name: "role",
        component: Role,
      },
      {
        path: "/menu",
        name: "menu",
        component: Menu,
      },
      {
        path: "/resource",
        name: "resource",
        component: Resource,
      },
      {
        path: "/course",
        name: "course",
        component: Course,
      },
      {
        path: "/user",

        name: "user",
        component: User,
      },
      {
        path: "/advert",
        name: "advert",
        component: Advert,
      },
      {
        path: "/advert-space",
        name: "advert-space",
        component: AdvertSpace,
      },
    ],
  },
  {
    path: "*",
    name: "error-page",
    component: ErrorPage,
  },
];

const router = new VueRouter({
  routes,
});

export default router
```


## 路由处理-功能优化
当 webpack 打包时，所有组件⼀起打包会使得 JavaScript 包⾮常⼤。下图展示了打包情况

<img src="/images/vue/280.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
<img src="/images/vue/281.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### Vue的路由懒优化
- 为了进⾏组件加载优化，应设置[Vue路由懒加载](https://v3.router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E6%8A%8A%E7%BB%84%E4%BB%B6%E6%8C%89%E7%BB%84%E5%88%86%E5%9D%97)，这时可以使⽤ import()（mdn、Vue）来进⾏模块动态加载，模块（和⼦模块）会分割到单独的 chunk 中；
- ⽅法返回的 Promise 对象设置给 component，这种组件只有在被需要时才会被 Vue 执⾏并渲染。通过以上处理，可以优化项⽬的加载速度。

```js
// router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 路由规则
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    component: () => import('@/views/layout/index'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/index')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import('@/views/role/index')
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import('@/views/menu/index')
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import('@/views/resource/index')
      },
      {
        path: '/course',
        name: 'course',
        component: () => import('@/views/course/index')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/user/index')
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import('@/views/advert/index')
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import('@/views/advert-space/index')
      }
    ]
  },
  {
    path: '*',
    name: 'error-page',
    component: () => import('@/views/error-page/index')
  }
]

const router = new VueRouter({
  routes
})

export default router
```

打包时各个路由⻚⾯组件会存储在单独的 chunk 中，每个路由组件只有在被访问时才会加载，具体效果如下：

<img src="/images/vue/283.jpg" style="width: 40%; display:inline-block; margin: 0 ;">
<img src="/images/vue/284.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 把组件按组分块

可以发现 chunk 的名称都是编号形式，没有实际语义。webpack 允许通过[webpack-魔法注释](https://webpack.docschina.org/api/module-methods#magic-comments)给 chunk 定义名称，可读性更强。

```js
// router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 路由规则
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */'@/views/login/index')
  },
  {
    path: '/',
    component: () => import(/* webpackChunkName: 'layout' */'@/views/layout/index'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */'@/views/home/index')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'role' */'@/views/role/index')
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'menu' */'@/views/menu/index')
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'resource' */'@/views/resource/index')
      },
      {
        path: '/course',

        name: 'course',
        component: () => import(/* webpackChunkName: 'course' */'@/views/course/index')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */'@/views/user/index')
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */'@/views/advert/index')
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName: 'advert-space' */'@/views/advert-space/index')
      }
    ]
  },
  {
    path: '*',
    name: 'error-page',
    component: () => import(/* webpackChunkName: 'error-page' */'@/views/error-page/index')
  }
]

const router = new VueRouter({
  routes
})

export default router

```

<img src="/images/vue/285.jpg" style="width: 40%; display:inline-block; margin: 0 ;">
<img src="/images/vue/286.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
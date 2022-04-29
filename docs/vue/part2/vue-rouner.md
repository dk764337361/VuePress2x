# Vue Router

- 是 Vue.js 官方的路由管理器，让构建单页面应用变得易如反掌。

## 基本使用

### 下载方式

- 方法一：直接下载 / CDN
  - 最新版本：https://unpkg.com/vue-router/dist/vue-router.js
  - 指定版本：https://unpkg.com/vue-router@3.4.9/dist/vue-router.js
- 方法二：npm
  - cnpm install vue-router

### 路由简介

- Vue Router 提供了用于进行路由设置的组件 `<router-link>` 与`<router-view>`。

- 定义路由中需要的组件，并进行路由规则设置。

<img src="/images/vue/243.jpg" style="width: 60%; display:inline-block; margin: 0 ;">
<img src="/images/vue/244.jpg" style="width: 60%; display:inline-block; margin: 0 ;">

- 创建 Vue Router 实例，通过 routes 属性配置路由。

<img src="/images/vue/245.jpg" style="width: 60%; display:inline-block; margin: 0 ;">

- 创建 Vue 实例，通过 router 属性注入路由。

<img src="/images/vue/246.jpg" style="width: 60%; display:inline-block; margin: 0 ;">

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
      <!-- 设置用于进行路由操作的组件 -->
      <router-link to="/">首页</router-link>
      <router-link to="/user">用户</router-link>
      <router-link to="/category">分类</router-link>

      <router-view></router-view>
    </div>
    <script src="lib/vue.js"></script>
    <script src="lib/vue-router.js"></script>
    <script>
      var Index = {
        template: `<div>首页功能</div>`,
      };
      var User = {
        template: `<div>用户功能</div>`,
      };
      var Category = {
        template: `<div>分类功能</div>`,
      };

      // 定义路由规则
      var routes = [
        { path: "/", component: Index },
        { path: "/user", component: User },
        { path: "/category", component: Category },
      ];

      // 创建 Vue Router 实例
      var router = new VueRouter({
        routes,
      });

      // 创建 Vue 实例，注入 router
      var vm = new Vue({
        el: "#app",
        router,
      });

      console.log(vm);
    </script>
  </body>
</html>
```

### 命名试图

- 如果导航后，希望同时在同级展示多个视图（组件），这时就需要进行命名视图。

<img src="/images/vue/247.jpg" style="width: 70%; display:inline-block; margin: 0 ;">

- 路由中通过 components 属性进行设置不同视图的对应组件。

<img src="/images/vue/248.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
<img src="/images/vue/249.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

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
      <router-link to="/">首页</router-link>
      <router-link to="/user">用户</router-link>

      <router-view name="sidebar"></router-view>
      <!-- 没有设置 name 的 router-view 默认 name 为 default-->
      <router-view></router-view>
    </div>
    <script src="lib/vue.js"></script>
    <script src="lib/vue-router.js"></script>
    <script>
      var SideBar1 = {
        template: `<div>侧边栏1功能</div>`,
      };

      var SideBar2 = {
        template: `<div>侧边栏2功能</div>`,
      };

      var Index = {
        template: `<div>首页功能</div>`,
      };

      var User = {
        template: `<div>用户功能</div>`,
      };

      // 定义路由规则
      var routes = [
        {
          path: "/",
          components: {
            // router-view 的 name : 组件配置对象
            default: Index,
            sidebar: SideBar1,
          },
        },
        {
          path: "/user",
          components: {
            default: User,
            sidebar: SideBar2,
          },
        },
      ];

      // 创建 Vue Router 实例
      var router = new VueRouter({
        routes,
      });

      // 创建 Vue 实例
      new Vue({
        el: "#app",
        router,
      });
    </script>
  </body>
</html>
```

<img src="/images/vue/039.gif" style="width: 100%; display:inline-block; margin: 0 ;">

## 动态路由

- 当我们需要将某一类 URL 都映射到同一个组件，就需要使用动态路由。
- 定义路由规则时，将路径中的某个部分使用 `:` 进行标记，即可设置为动态路由。

<img src="/images/vue/250.jpg" style="width: 70%; display:inline-block; margin: 0 ;">

- 设置为动态路由后，动态部分为任意内容均跳转到同一组件。

<img src="/images/vue/251.jpg" style="width: 70%; display:inline-block; margin: 0 ;">

- `:` 部分对应的信息称为路径参数，存储在 vm.\$route.params 中。

<img src="/images/vue/252.jpg" style="width: 70%; display:inline-block; margin: 0 ;">

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
      <router-link to="/user/1">用户1</router-link>
      <router-link to="/user/2">用户2</router-link>
      <router-link to="/user/3">用户3</router-link>

      <router-view></router-view>
    </div>
    <script src="lib/vue.js"></script>
    <script src="lib/vue-router.js"></script>
    <script>
      // 设置组件
      var User = {
        template: `<div>这是用户 {{ $route.params.id }} 的功能</div>`,
      };

      // 设置路由规则
      var routes = [
        {
          path: "/user/:id",
          component: User,
        },
      ];

      var router = new VueRouter({ routes });
      var vm = new Vue({
        el: "#app",
        router,
      });
    </script>
  </body>
</html>
```

<img src="/images/vue/253.jpg" style="width: 70%; display:inline-block; margin: 0 ;">

<img src="/images/vue/040.gif" style="width: 100%; display:inline-block; margin: 0 ;">

### 侦听路由参数

#### 通过 watch 监听 \$route。

- 如果要响应路由的参数变化，可以通过 watch 监听 \$route。

<img src="/images/vue/254.jpg" style="width: 70%; display:inline-block; margin: 0 ;">

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
      <router-link to="/user/1">用户1</router-link>
      <router-link to="/user/2">用户2</router-link>
      <router-link to="/user/3">用户3</router-link>

      <router-view></router-view>
    </div>
    <script src="lib/vue.js"></script>
    <script src="lib/vue-router.js"></script>
    <script>
      // 设置组件
      var User = {
        template: `
        <div>
          这是用户 {{ $route.params.id }} 的功能
          <input type="text">
        </div>`,
        // 由于组件没有重新创建，所以生命周期钩子只能执行一次
        /* created () {
        console.log('创建了组件的实例');
      } */
        watch: {
          $route(route) {
            // console.log(route);
            console.log(route.params.id);
          },
        },
      };

      // 设置路由规则
      var routes = [
        {
          path: "/user/:id",
          component: User,
        },
      ];

      var router = new VueRouter({ routes });
      var vm = new Vue({
        el: "#app",
        router,
      });
    </script>
  </body>
</html>
```

<img src="/images/vue/041.gif" style="width: 100%; display:inline-block; margin: 0 ;">

### 路由传参处理

- 这里通过路由的 props 设置数据，并通过组件 props 接收。

#### 方式一：\$route.params.id（不推荐）

#### 方式二：通过 props 传 id,降低耦合

<img src="/images/vue/255.jpg" style="width: 70%; display:inline-block; margin: 0 ;">
<img src="/images/vue/256.jpg" style="width: 70%; display:inline-block; margin: 0 ;">

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
      <router-link to="/user/1">用户1</router-link>
      <router-link to="/user/2">用户2</router-link>
      <router-link to="/user/3">用户3</router-link>

      <router-link to="/category/1">分类1</router-link>
      <router-link to="/category/2">分类2</router-link>
      <router-link to="/category/3">分类3</router-link>

      <router-view></router-view>
    </div>
    <script src="lib/vue.js"></script>
    <script src="lib/vue-router.js"></script>
    <script>
      // 组件的配置对象
      var User = {
        template: `<div>这是用户 {{ $route.params.id }} 功能</div>`,
      };

      var Category = {
        props: ["id"],
        template: `<div>这是分类 {{ id }} 功能</div>`,
      };

      // 设置路由规则
      var routes = [
        {
          path: "/user/:id",
          component: User,
        },
        {
          path: "/category/:id",
          component: Category,
          props: true,
        },
      ];

      var router = new VueRouter({ routes });
      var vm = new Vue({
        el: "#app",
        router,
      });
    </script>
  </body>
</html>
```

### 包含多个命名视图时，需要将路由的 props 设置为对象。

<img src="/images/vue/257.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
<img src="/images/vue/258.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

### 如果希望设置静态数据，可将 props 中的某个组件对应的选项设置为对象，内部属性会绑定给组件的 props。

<img src="/images/vue/259.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
<img src="/images/vue/260.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

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
      <router-link to="/user/1">用户1</router-link>
      <router-link to="/user/2">用户2</router-link>
      <router-link to="/user/3">用户3</router-link>

      <router-link to="/category/1">分类1</router-link>
      <router-link to="/category/2">分类2</router-link>
      <router-link to="/category/3">分类3</router-link>

      <router-view></router-view>
      <router-view name="sidebar"></router-view>
      <router-view name="sidebar2"></router-view>
    </div>
    <script src="lib/vue.js"></script>
    <script src="lib/vue-router.js"></script>
    <script>
      // 组件的配置对象
      var User = {
        template: `<div>这是用户 {{ $route.params.id }} 功能</div>`,
      };

      var Category = {
        props: ["id"],
        template: `<div>这是分类 {{ id }} 功能</div>`,
      };

      var SideBar1 = {
        template: `<div>侧边栏功能</div>`,
      };

      var SideBar2 = {
        props: ["a", "b"],
        template: `
      <div>
        侧边栏2功能: {{ a }} {{ b }}
      </div>`,
      };

      // 设置路由规则
      var routes = [
        {
          path: "/user/:id",
          component: User,
        },
        {
          path: "/category/:id",
          components: {
            default: Category,
            sidebar: SideBar1,
            sidebar2: SideBar2,
          },
          props: {
            default: true, //第一个Category传id
            sidebar: false, //第二个Category的sidebar设置为false
            sidebar2: {
              //第三个Category的sidebar设置传静态数据
              a: "状态1",
              b: "状态2",
            },
          },
        },
      ];

      var router = new VueRouter({ routes });
      var vm = new Vue({
        el: "#app",
        router,
      });
    </script>
  </body>
</html>
```

<img src="/images/vue/042.gif" style="width: 100%; display:inline-block; margin: 0 ;">

## 嵌套路由

- 实际场景中，路由通常由多层嵌套的组件组合而成，这时需要使用嵌套路由配置。
- 使用 children 来进行嵌套路由中的子路由设置。

<img src="/images/vue/261.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

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
      <router-link to="/user">用户功能</router-link>
      <router-view></router-view>
    </div>

    <script src="lib/vue.js"></script>
    <script src="lib/vue-router.js"></script>
    <script>
      //组件的配置对象
      var User = {
        template: `
        <div>
        <h3>这是User组件的功能</h3>
        <router-link to='/user/hobby'>爱好功能</router-link>
        <router-link to='/user/info'>用户信息</router-link>
        <router-view></router-view>
    </div>
        `,
      };
      var UserHobby = {
        template: `
        <div>UserHobby组件</div>
        `,
      };
      var UserInfo = {
        template: `
        <div>
        UserInfo组件
        <router-link to='/user/info/school'>学校信息</router-link>
        <router-view></router-view>
    </div>
        `,
      };
      var UserInfoSchool = {
        template: `
        <div>这是UserInfoSchool组件</div>
        `,
      };

      //设置路由规则
      var routes = [
        {
          path: "/user",
          component: User,
          children: [
            {
              path: "hobby",
              component: UserHobby,
            },
            {
              path: "info",
              component: UserInfo,
              children: [
                {
                  path: "school",
                  component: UserInfoSchool,
                },
              ],
            },
          ],
        },
      ];
      var router = new VueRouter({
        routes,
      });
      var vm = new Vue({
        el: "#app",
        router,
      });
    </script>
  </body>
</html>
```

<img src="/images/vue/043.gif" style="width: 100%; display:inline-block; margin: 0 ;">

## 编程式导航

- router.push() 用来导航到一个新 URL。
  - router.push()方法属于 VueRouter 实例原型的操作方法
    <img src="/images/vue/264.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

<img src="/images/vue/262.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- `<router-link>` 的 to 属性使用`v-bind`时可以在内部书写 JS 表达式（属性对象结构。）

<img src="/images/vue/263.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

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
      <!-- 声明式导航 -->
      <!-- <router-link to="/user/200">用户200</router-link> -->

      <!-- 编程式导航 -->
      <router-link :to="{ path: '/user/700' }">用户700</router-link>

      <router-view></router-view>
    </div>
    <script src="./lib/vue.js"></script>
    <script src="./lib/vue-router.js"></script>
    <script>
      var User = {
        template: `<div> 这是用户 {{ $route.params.id }} </div>`,
      };

      var routes = [
        {
          path: "/user/:id",
          component: User,
        },
      ];

      var router = new VueRouter({ routes });
      var vm = new Vue({
        el: "#app",
        router,
      });
    </script>
  </body>
</html>
```

### 命名路由

- 设置路由时添加 name 属性。

<img src="/images/vue/265.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- 在 push() 中通过 name 导航到对应路由，参数通过 params 设置。

<img src="/images/vue/266.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- 也可以在 `<router-link>` 中使用。

<img src="/images/vue/267.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

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
      <router-link :to="{ name: 'school', params: { id: 10 } }"
        >学校10</router-link
      >

      <router-view></router-view>
    </div>
    <script src="lib/vue.js"></script>
    <script src="lib/vue-router.js"></script>
    <script>
      var School = {
        template: `<div>School 组件的功能： {{ $route.params }}</div>`,
      };

      var routes = [
        {
          path: "/user/:id/info/school",
          name: "school",
          component: School,
        },
      ];

      var router = new VueRouter({ routes });
      var vm = new Vue({
        el: "#app",
        router,
      });
    </script>
  </body>
</html>
```

<img src="/images/vue/044.gif" style="width: 100%; display:inline-block; margin: 0 ;">

## 其他功能

### 重定向

- 示例如下：

<img src="/images/vue/268.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

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
      <router-link to="/">首页</router-link>
      <router-link to="/category/2">分类2</router-link>
      <router-link to="/category"> /category </router-link>

      <router-view></router-view>
    </div>
    <script src="./lib/vue.js"></script>
    <script src="./lib/vue-router.js"></script>
    <script>
      var Index = {
        template: `<div>首页功能</div>`,
      };

      var Category = {
        template: `<div>分类 {{ $route.params.id }} 功能</div>`,
      };

      var router = new VueRouter({
        routes: [
          {
            path: "/",
            component: Index,
          },
          {
            path: "/category/:id",
            component: Category,
          },
          {
            path: "/category",
            redirect: "/",
          },
        ],
      });

      var vm = new Vue({
        el: "#app",
        router,
      });
    </script>
  </body>
</html>
```

<img src="/images/vue/045.gif" style="width: 100%; display:inline-block; margin: 0 ;">

### 别名

- 示例如下：

<img src="/images/vue/269.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/270.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

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
      <router-link :to="{ name:'school',params:{ id:10,date:'0612' } }"
        >获取学校信息</router-link
      >
      <router-link to="/10/0612">【别名】获取学校信息</router-link>
      <router-view></router-view>
    </div>
    <script src="./lib/vue.js"></script>
    <script src="./lib/vue-router.js"></script>
    <script>
      // 组件
      var School = {
        template: `<div>School 组件</div>`,
      };
      // 路由规则
      var router = new VueRouter({
        routes: [
          {
            path: "/user/:id/info/school/:date",
            name: "school",
            component: School,
            alias: "/:id/:date",
          },
        ],
      });

      var vm = new Vue({
        el: "#app",
        router,
      });
    </script>
  </body>
</html>
```

<img src="/images/vue/046.gif" style="width: 100%; display:inline-block; margin: 0 ;">

### 导航守卫

- 示例如下：

<img src="/images/vue/271.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

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
      <router-link to="/">首页</router-link>
      <router-link to="/user">用户</router-link>
      <router-link to="/login">登录</router-link>
      <router-view></router-view>
    </div>
    <script src="lib/vue.js"></script>
    <script src="lib/vue-router.js"></script>
    <script>
      var Index = {
        template: `<div>这是首页功能</div>`,
      };
      var User = {
        template: `<div>这是用户功能</div>`,
      };
      var Login = {
        template: `<div>跳转到登录功能</div>`,
      };

      var router = new VueRouter({
        routes: [
          { path: "/", component: Index },
          { path: "/user", component: User },
          { path: "/login", component: Login },
        ],
      });

      // 设置导航守卫
      router.beforeEach(function(to, from, next) {
        // console.log(to, from);
        // next();
        // next(false);

        if (to.path === "/user") {
          next("/login");
        } else {
          next();
        }
      });

      var vm = new Vue({
        el: "#app",
        router,
      });
    </script>
  </body>
</html>
```

<img src="/images/vue/047.gif" style="width: 100%; display:inline-block; margin: 0 ;">


### History 模式

- 需要通过 Vue Router 实例的 mode 选项来设置，这样 URL 会更加美观，但同样需要后端支持避免问题。

<img src="/images/vue/272.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```html{29}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="app">
    <router-link to="/">首页</router-link>
    <router-link to="/user">用户</router-link>
    <router-link to="/category">分类</router-link>
    <router-view></router-view>
  </div>
  <script src="lib/vue.js"></script>
  <script src="lib/vue-router.js"></script>
  <script>
    var Index = {
      template: `<div>这是首页功能</div>`
    };
    var User = {
      template: `<div>这是用户功能</div>`
    };
    var Category = {
      template: `<div>这是分类功能</div>`
    };

    var router = new VueRouter({
      mode: 'history',
      routes: [
        { path: '/', component: Index },
        { path: '/user', component: User },
        { path: '/category', component: Category },
      ]
    });

    var vm = new Vue({
      el: '#app',
      router
    })
  </script>
</body>
</html>
```
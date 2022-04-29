# 身份认证

## 登录状态存储

### 登录状态存储在 Vuex 中

为了能在任意组件中访问⽤户的登录信息，我们将状态存储在 Vuex 中。

```js
// store/index.js
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {},
  actions: {},
  modules: {},
});
```

- 声明 mutation ⽤于修改 user 数据，具体内容采⽤ payload ⽅式传⼊。通过 DevTools 查看。
  - 要存储的数据为响应的 data.content，内部为⽤户的相关信息。

```js
// login/index.js
methods: {
async onSubmit () {
try {
...
// 当登录成功时，记录登录状态，存储到 Vuex 中
this.$store.commit('setUser', data.content)
this.$router.push({
name: 'home'
 })
 this.$message.success('登录成功')
 } catch (err) {
 console.log('验证失败', err)
 }
 }
 }
```

由于数据为 JSON 格式，为了后期使⽤⽅便，在 mutation setUser 中转换为对象保存。通过 DevTools 查看。

```js
 mutations: {
 setUser (state, payload) {
 state.user = JSON.parse(payload)
 }
 },
```

通过 Vuex 存储后，组件操作共享状态⼗分⽅便。

下⼀步我们可以将状态通过本地存储⽅式对 user 进⾏数据持久化，避免⻚⾯刷新后状态丢失。

```js
 mutations: {
 setUser (state, payload) {
 state.user = JSON.parse(payload)
 // 通过本地存储对 user 进⾏数据持久化
 // - 注意，本地存储只能保存字符串
 window.localStorage.setItem('user', payload)
 }
 },
```

- 存储成功后，将 user 的初始值更改为本地存储获取 user 的数据。
  - 需要考虑不存在 user 数据的初始情况

```js
 state: {
 // user: null
 user: JSON.parse(window.localStorage.getItem('user') || null)
 },
```

### 代码演示

```js
//src/store/index.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 用于在登录成功后保存用户信息(初始值尝试读取本地存储)
    user: JSON.parse(window.localStorage.getItem("user") || null),
  },
  getters: {},
  mutations: {
    // 存储用户数据
    setUser(state, payload) {
      // 将payload转换为对象后再进行存储
      state.user = JSON.parse(payload);
      // 将payload 数据添加到 本地存储中
      // - 注意，本地存储只能保存字符串
      window.localStorage.setItem("user", payload);
    },
  },
  actions: {},
  modules: {},
});
```

```vue{81-82}
<template>
  <div class="login">
    {{ $store.state.count }}
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
      label-position="top"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="isLoginLoading" @click="onSubmit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 引入封装的接口功能组件
import { login } from "@/services/user";

export default {
  name: "LoginIndex",
  data() {
    return {
      // 存储表单数据的对象
      form: {
        phone: "17201234567",
        password: "111111",
      },
      // 用于设置表单校验规则
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1\d{10}$/,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "密码长度为 6 到 18 位",
            trigger: "blur",
          },
        ],
      },
      // 用于保存加载状态
      isLoginLoading: true,
    };
  },
  methods: {
    // 登录功能
    async onSubmit() {
      try {
        // 1.设置校验成功后的功能（请求发送）
        await this.$refs.form.validate();
        this.isLoginLoading = true;
        // 2. 发送请求
        const { data } = await login(this.form);
        console.log(data);
        this.isLoginLoading = false;

        // 3. 响应处理
        if (data.state === 1) {
          this.$router.push({
            name: "home",
          });
          this.$message.success("登录成功");
          // 将用户信息存储到Vuex中
          this.$store.commit("setUser", data.content);
        } else {
          this.$message.error("登录失败");
          // this.$message.error(data.message)
        }
      } catch (err) {
        // 设置校验失败后的功能（提示）
        console.log("没有通过校验");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  // 容器撑满⾼度
  height: 100vh;
  display: flex;
  // 内容⽔平垂直居中
  align-items: center;
  justify-content: center;

  .el-form {
    background-color: #fff;
    width: 300px;
    padding: 20px;
    border-radius: 10px;
    .el-button {
      width: 100%;
    }
  }
}
</style>
```

## 校验⻚⾯访问权限

路由跳转时，需要校验登录状态，并根据结果进⾏后续处理。

这⾥使⽤ Vue Router 的导航守卫 beforeEach ，在任务导航被触发时进⾏登录状态检测。

```js
// router/index.js
...
const router = new VueRouter({
routes
})
// 全局前置守卫
router.beforeEach((to, from, next) => {
console.log('to:', to)
 console.log('from:', from)

 next()
 })
 ...
```

当前后台⻚⾯均需要登录状态，但如果需求中只有部分⻚⾯需要登录状态的话，该如何判断处理呢？ 我们可以通过 Vue Router 中的 [路由元信息](https://router.vuejs.org/zh/guide/advanced/meta.html) 功能来设置。

### 给需要登录状态的路由添加路由元信息

下⾯给需要登录状态的路由添加路由元信息

- 例如将 '/' 的⼦路由的部分设置为需要登录（'/'路由设置之后，children 路由就不能设置 meta）
  - meta ⽤于保存与路由相关的⾃定义数据
  - requiresAuth 表示是否需要认证，true 为需要认证

```js
// router/index.js
import Vue from "vue";
import VueRouter from "vue-router";
// 引入 store
import store from "@/store";
Vue.use(VueRouter);

// 路由规则（添加需要认证的requiresAuth 信息）
const routes = [
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: 'login' */ "@/views/login/index"),
  },
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: 'layout' */ "@/views/layout/index"),
    // 直接给某个路由设置，这时内部的子路由都需要认证（包含当前路由）
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        name: "home",
        component: () =>
          import(/* webpackChunkName: 'home' */ "@/views/home/index"),
        // meta: {
        //   requiresAuth: true
        // }
      },
      {
        path: "/role",
        name: "role",
        component: () =>
          import(/* webpackChunkName: 'role' */ "@/views/role/index"),
        // meta: {
        //   requiresAuth: true
        // }
      },
      {
        path: "/menu",
        name: "menu",
        component: () =>
          import(/* webpackChunkName: 'menu' */ "@/views/menu/index"),
        // meta: {
        //   requiresAuth: true
        // }
      },
      {
        path: "/resource",
        name: "resource",
        component: () =>
          import(/* webpackChunkName: 'resource' */ "@/views/resource/index"),
        // meta: {
        //   requiresAuth: true
        // }
      },
      {
        path: "/course",

        name: "course",
        component: () =>
          import(/* webpackChunkName: 'course' */ "@/views/course/index"),
        // meta: {
        //   requiresAuth: true
        // }
      },
      {
        path: "/user",
        name: "user",
        component: () =>
          import(/* webpackChunkName: 'user' */ "@/views/user/index"),
        // meta: {
        //   requiresAuth: true
        // }
      },
      {
        path: "/advert",
        name: "advert",
        component: () =>
          import(/* webpackChunkName: 'advert' */ "@/views/advert/index"),
        // meta: {
        //   requiresAuth: true
        // }
      },
      {
        path: "/advert-space",
        name: "advert-space",
        component: () =>
          import(
            /* webpackChunkName: 'advert-space' */ "@/views/advert-space/index"
          ),
        // meta: {
        //   requiresAuth: true
        // }
      },
    ],
  },
  {
    path: "*",
    name: "error-page",
    component: () =>
      import(/* webpackChunkName: 'error-page' */ "@/views/error-page/index"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
```

在导航守卫中检测 to 的路由是否需要登录

```js
// router/index.js
router.beforeEach((to, from, next) => {
  console.log("to:", to);
  console.log("from:", from);
  // 官⽅示例，检测路由是否需要登录
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // to 路由要求具有登录状态，检测⽤户是否登录
  }

  next();
});
```

### ⽤户登录状态保存在 store (Vuex) 中

⽤户登录状态保存在 store (Vuex) 中，引⼊⽂件读取数据检测。

```js
// router/index.js
import store from "@/store";
// router/index.js
// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 官⽅示例，检测路由是否需要登录
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // 检测 store 中的 user是否存在
    if (!store.state.user) {
      // 未登录，导航跳转到登录⻚
      next({ name: "login" });
    } else {
      // 已经登录，允许通过
      next();
    }
  } else {
    // ⽆需登录，允许通过
    next();
  }
});
```

测试功能，成功。

如果某个⽗路由下的所有⼦路由均需要登录，这时可以直接给⽗路由设置 meta 处理（统⼀处理）

### 代码演示

```js
// router/index.js
import Vue from "vue";
import VueRouter from "vue-router";
// 引入 store
import store from "@/store";
Vue.use(VueRouter);

// 路由规则（添加需要认证的requiresAuth 信息）
const routes = [
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: 'login' */ "@/views/login/index"),
  },
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: 'layout' */ "@/views/layout/index"),
    // ⼦路由请求会经过⽗路由，直接给⽗路由设置登录检测更加简单，适合所有⼦路由均需要登录的情况
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        name: "home",
        component: () =>
          import(/* webpackChunkName: 'home' */ "@/views/home/index"),
      },
      {
        path: "/role",
        name: "role",
        component: () =>
          import(/* webpackChunkName: 'role' */ "@/views/role/index"),
      },
      {
        path: "/menu",
        name: "menu",
        component: () =>
          import(/* webpackChunkName: 'menu' */ "@/views/menu/index"),
      },
      {
        path: "/resource",
        name: "resource",
        component: () =>
          import(/* webpackChunkName: 'resource' */ "@/views/resource/index"),
      },
      {
        path: "/course",

        name: "course",
        component: () =>
          import(/* webpackChunkName: 'course' */ "@/views/course/index"),
      },
      {
        path: "/user",
        name: "user",
        component: () =>
          import(/* webpackChunkName: 'user' */ "@/views/user/index"),
      },
      {
        path: "/advert",
        name: "advert",
        component: () =>
          import(/* webpackChunkName: 'advert' */ "@/views/advert/index"),
      },
      {
        path: "/advert-space",
        name: "advert-space",
        component: () =>
          import(
            /* webpackChunkName: 'advert-space' */ "@/views/advert-space/index"
          ),
      },
    ],
  },
  {
    path: "*",
    name: "error-page",
    component: () =>
      import(/* webpackChunkName: 'error-page' */ "@/views/error-page/index"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  // 验证to 路由是否需要进行身份验证
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // console.log('当前页面需要认证')
    // 验证 vuex 的store 中的登录用户信息是否存储
    if (!store.state.user) {
      // 未登录，跳转到登录页
      return next({ name: "login" });
    }
    next(); // 确保一定要调用 next()
  } else {
    console.log("当前页面不需要认证");
    next(); // 确保一定要调用 next()
  }
});

export default router;
```

## 登录后跳转到上次访问⻚⾯

### 路由的 query 属性

例如我当前访问⼴告管理 /advert，这时我想访问⽤户管理 /user，但因为⻓时间没操作，登录状态过期了（⼿动请求 store 模拟），就会⾃动跳回 /login，当我再次登录后，默认会跳转到 / ⾸⻚。

如果希望登录后能跳转到上次正在访问的⻚⾯，该如何操作呢？这时我们应当在每次跳转到 /login 时记录`当前 to ⽬标路由信息`，这时可以通过跳转路由的 `query` 属性进⾏设置。

```js
// router/index.js
// 检测 store 中的 user是否存在
if (!store.state.user) {
  // 未登录，导航跳转到登录⻚
  next({
    name: "login",
    // 通过 query 属性给 URL 设置查询字符串参数（键值均为⾃定义）
    query: {
      // path 仅包含路径，fullpath 为完整 url（包含查询字符串参数等信息）
      redirect: to.fullPath,
    },
  });
} else {
  // 已经登录，允许通过
  next();
}
```

登录功能中，登录成功的跳转时，应该检测是否存在登录前的⻚⾯信息，如果有则跳转，否则默认跳转⾸⻚。

```js
// login/index.vue
methods: {
async onSubmit () {
try {
...
// 登录成功后跳转路由
// 1. 如果路由信息中存在 redirect 则跳转到这个路由
// 2. 如果不存在，说明是正常登录，跳转⾸⻚ home 即可
/* this.$router.push({
 name: 'home'
 }) */
 this.$router.push(this.$route.query.redirect || '/')
 ...
 } catch (err) {
 console.log('验证失败', err)
 }
 }
 }
```

除了登录过期以外，例如将⻚⾯存储书签、或点击其他⼈发送的链接访问时，都可以在登录后⾃动跳转到对应路由，增强体验。

### 代码演示

```js
// router/index.js
import Vue from "vue";
import VueRouter from "vue-router";
// 引入 store
import store from "@/store";
Vue.use(VueRouter);

// 路由规则（添加需要认证的requiresAuth 信息）
const routes = [
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: 'login' */ "@/views/login/index"),
  },
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: 'layout' */ "@/views/layout/index"),
    // ⼦路由请求会经过⽗路由，直接给⽗路由设置登录检测更加简单，适合所有⼦路由均需要登录的情况
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        name: "home",
        component: () =>
          import(/* webpackChunkName: 'home' */ "@/views/home/index"),
      },
      {
        path: "/role",
        name: "role",
        component: () =>
          import(/* webpackChunkName: 'role' */ "@/views/role/index"),
      },
      {
        path: "/menu",
        name: "menu",
        component: () =>
          import(/* webpackChunkName: 'menu' */ "@/views/menu/index"),
      },
      {
        path: "/resource",
        name: "resource",
        component: () =>
          import(/* webpackChunkName: 'resource' */ "@/views/resource/index"),
      },
      {
        path: "/course",

        name: "course",
        component: () =>
          import(/* webpackChunkName: 'course' */ "@/views/course/index"),
      },
      {
        path: "/user",
        name: "user",
        component: () =>
          import(/* webpackChunkName: 'user' */ "@/views/user/index"),
      },
      {
        path: "/advert",
        name: "advert",
        component: () =>
          import(/* webpackChunkName: 'advert' */ "@/views/advert/index"),
      },
      {
        path: "/advert-space",
        name: "advert-space",
        component: () =>
          import(
            /* webpackChunkName: 'advert-space' */ "@/views/advert-space/index"
          ),
      },
    ],
  },
  {
    path: "*",
    name: "error-page",
    component: () =>
      import(/* webpackChunkName: 'error-page' */ "@/views/error-page/index"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  // 验证to 路由是否需要进行身份验证
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // console.log('当前页面需要认证')
    // 验证 vuex 的store 中的登录用户信息是否存储
    if (!store.state.user) {
      // 未登录，跳转到登录页
      return next({
        name: "login",
        query: {
          // 将本次路由的fullpath 传递给 login页面
          redirect: to.fullPath,
        },
      });
    }
    next(); // 确保一定要调用 next()
  } else {
    console.log("当前页面不需要认证");
    next(); // 确保一定要调用 next()
  }
});

export default router;
```

```vue
// login/index.vue
<template>
  <div class="login">
    {{ $store.state.count }}
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
      label-position="top"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="isLoginLoading" @click="onSubmit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 引入封装的接口功能组件
import { login } from "@/services/user";

export default {
  name: "LoginIndex",
  data() {
    return {
      // 存储表单数据的对象
      form: {
        phone: "17201234567",
        password: "111111",
      },
      // 用于设置表单校验规则
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1\d{10}$/,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "密码长度为 6 到 18 位",
            trigger: "blur",
          },
        ],
      },
      // 用于保存加载状态
      isLoginLoading: true,
    };
  },
  methods: {
    // 登录功能
    async onSubmit() {
      try {
        // 1.设置校验成功后的功能（请求发送）
        await this.$refs.form.validate();
        this.isLoginLoading = true;
        // 2. 发送请求
        const { data } = await login(this.form);
        console.log(data);
        this.isLoginLoading = false;

        // 3. 响应处理
        if (data.state === 1) {
          this.$message.success("登录成功");
          // 将用户信息存储到Vuex中
          this.$store.commit("setUser", data.content);
          // 根据可能存储的redirect 数据进行跳转设置
          // this.$router.push({
          //   name: 'home'
          // })
          this.$router.push(this.$route.query.redirect || "/");
        } else {
          this.$message.error("登录失败");
          // this.$message.error(data.message)
        }
      } catch (err) {
        // 设置校验失败后的功能（提示）
        console.log("没有通过校验");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  // 容器撑满⾼度
  height: 100vh;
  display: flex;
  // 内容⽔平垂直居中
  align-items: center;
  justify-content: center;

  .el-form {
    background-color: #fff;
    width: 300px;
    padding: 20px;
    border-radius: 10px;
    .el-button {
      width: 100%;
    }
  }
}
</style>
```

## ⽤户基本信息展示（接⼝鉴权）

### ⽤户信息接⼝测试

⽤户基本信息接⼝：[地址](https://www.lagou.com/lagouhtml/a44.html#/edu-front-boot/%E7%94%A8%E6%88%B7%E6%8E%A5%E5%8F%A3/getInfoUsingGET)

⾸先进⾏接⼝测试，可通过⽂档测试⼯具或 postman 操作，这⾥演示 postman。

1. 在 Edu Boss 集合中添加⼀个请求，并设置基本信息：

<img src="/images/vue/313.jpg" style="width: 40%; display:block; margin: 0 ;">
<img src="/images/vue/314.jpg" style="width: 40%; display:block; margin: 0 ;">

2. 添加完毕，选择新添加的请求，并在右侧设置请求⽅式与接⼝地址：

<img src="/images/vue/315.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
<img src="/images/vue/316.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

3. 这时进⾏请求发送，会发现请求没有成功，HTTP 状态码为 401，状态⽂本为‘Unauthorized’。
4.

<img src="/images/vue/317.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

401 与‘Unauthorized’指的是“未授权”，说明访问接⼝需要进⾏授权才能使⽤。查询接⼝⽂档可以得知，需要传⼊名为‘Authotization’的请求参数（位于请求头中），⽤于验证授权信
息，这种验证接⼝的授权的处理⽅式，称为接⼝鉴权。

<img src="/images/vue/318.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

现在我们知道了，后端提供的接⼝不能随便访问，使⽤接⼝前⾸先要进⾏接⼝鉴权处理。鉴权的流程是怎样的？客户端如何获取授权信息？如何将授权信息通过接⼝发送给服务端呢？请移步下⼀
⼩节。

### Token

<img src="/images/vue/319.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

Token 是⼀种常⽤的接⼝鉴权⽅式。

Token 是在⽤户登录成功后，由服务端⽣成的⼀段保存了⽤户身份信息的、加密的字符串。⽣成后，服务端通过响应⽅式将 token 信息响应到客户端，通过之前的登录接⼝响应（成功时）可以看
到。

<img src="/images/vue/320.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

得到这个 Token 信息后，以后请求接⼝时，将 Token 信息通过请求头发送给服务端，这样就服务端就知
道当前⽤户已经登录，具备接⼝访问权限了。这⾥通过 postman 演示如何传递 Token ，⾸先复制 Token 信息（注意不要复制错误）：

<img src="/images/vue/321.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

切换到⽤户基本信息接⼝，根据⽂档设置‘Authorazation’，并将 Token 信息放⼊

<img src="/images/vue/322.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

发送请求，正确接收响应信息，接⼝鉴权成功。

<img src="/images/vue/323.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## 通过 Postman 统⼀设置 Token

后续接⼝都需要鉴权，每次都书写 Token 较为繁琐，Postman 提供了统⼀设置⽅式。

<!-- <img src="/images/vue/324.jpg" style="width: 50%; display:inline-block; margin: 0 ;"> -->
<img src="/images/vue/325.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
<img src="/images/vue/326.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

右侧添加 Key 为‘Authorization’，Value 设置为 Token 字符串，Add to 选择 Header 表示添加到请求头中，保存更新即可。

<img src="/images/vue/327.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

这时回到⽤户信息接⼝会发现之前单独设置的‘Authorization’提示会被统⼀设置的‘Authorization’覆盖，
说明统⼀设置⽣效了，这⾥的‘Authorization’去除即可。

<img src="/images/vue/328.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

再次发送请求，接⼝测试的 Token 处理成功。

<img src="/images/vue/329.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## 实现⽤户信息展示

测试处理完毕后，我们需要在代码中进⾏ Token 处理与功能实现。

⾸先封装⽤于⽤户信息请求的⽅法，在 header 中设置 Token 信息。

```js
// services/user.js
// 用户基本信息接口
export const getUserInfo = () => {
  return request({
    method: "GET",
    url: "/front/user/getInfo",
    // 在 header 中设置 Token 信息
    headers: {},
  });
};
```

引⼊ store ⽤于读取 token

```js
// services/user.js
// 用户基本信息接口
export const getUserInfo = () => {
  return request({
    method: "GET",
    url: "/front/user/getInfo",
    // 在 header 中设置 Token 信息
    headers: {
      Authorization: store.state.user.access_token,
    },
  });
};
```

在 app-header 组件中引⼊功能，并在 created 钩⼦中请求数据

```vue{16-19,24,36-58}
// layout/components/AppHeader.vue
<template>
  <div class="app-header">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 右侧用户信息展示 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        <!-- 用户头像。使用Avatar 组件 -->
        <el-avatar
          :size="30"
          :src="
            userInfo.portrait ||
              'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
          "
        ></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
        <el-dropdown-item divided>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
// 引入用户信息接口功能
import { getUserInfo } from "@/services/user";

export default {
  name: "AppHeader",
  // 实例创建时请求数据
  created() {
    // 加载用户信息
    // 不建议在钩⼦函数中直接书写逻辑，应封装到 methods 中
    this.loadUserInfo();
  },
  data() {
    return {
      // 声明存储⽤户信息的数据，绑定到视图中
      userInfo: {},
    };
  },
  methods: {
    // 加载用户信息功能
    async loadUserInfo() {
      // 调⽤⽅法请求⽤户信息
      const { data } = await getUserInfo();
      // 保存在 data 的数据中
      this.userInfo = data.content;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}
</style>
```

<img src="/images/vue/330.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## 通过 Axios 请求拦截器统⼀设置 Token

跟多请求都需要在 header 设置 Token 信息，可以通过`Axios 拦截器`统⼀处理。

Axios 拦截器与导航守卫相似，可以在任意请求和响应前进⾏拦截处理，功能分为`请求拦截器`与`响应拦截器`。

通过请求拦截器参数 config.headers 可以访问请求头，将 store 中的 Token 统⼀设置即可。

```js
// utils/request.js
...
// 引⼊ store
import store from '@/store'
...
// 设置请求拦截器
request.interceptors.request.use(function (config) {
// 基地址处理
config.baseURL = getBaseURL(config.url)

 // Token 统⼀处理
 // 为了严谨，可以读取 store 中的 user 后进⾏ Token 检测
 const { user } = store.state
 if (user && user.access_token) {
 // 设置 Token
 config.headers.Authorization = user.access_token
 }

 return config
 })
 ...
```

统⼀设置后，services/user.js 中的 getUserInfo 的 Token 设置就可以去除了，store 的引⼊也可以删除了。

```js
// services/user.js
...
// import store from '@/store'
...
// ⽤户基本信息请求
export const getUserInfo = () => {
return request({
method: 'GET',
url: '/front/user/getInfo'
 // 在 header 中设置 Token 信息（统⼀设置后去除，记得去除上⼀⾏的分号）
 /* headers: {
 Authorization: store.state.user.access_token
 } */
 })
 }
```

## 身份认证-用户退出

⾸先给退出按钮设置点击事件，发现点击事件没有⽣效，因为这⾥的退出按钮为组件，⽽组件设置的都是`⾃定义事件`。

```vue
// app-header.vue
<el-dropdown-item divided @click="handleLogout">退出</el-dropdown-item>
... methods: { ... // 退出按钮功能 handleLogout () { console.log('点击退出') } }
```

这时可以使⽤事件修饰符 .nat ive 来监听组件根元素的原⽣事件。

```vue
// app-header.vue
<el-dropdown-item divided @click.native="handleLogout">退出</el-dropdown-item>
```

- 点击退出后，清除 store 中的⽤户信息，同时跳转回登录⻚⾯。
  - 通过 mutation 中的 setUser 清空 user，由于 setUser 也设置了本地存储，这时也会⾃动清空。

```js
 // app-header.vue
 ...
 handleLogout () {
 // 删除 store 中的⽤户信息
 this.$store.commit('setUser', null)
 // 跳转到登录⻚
 this.$router.push('/login')
 }
 ...
```

- 可以通过 Element 的 [MessageBox 弹框](https://element.eleme.cn/#/zh-CN/component/message-box)组件进⾏退出确认提示，增强体验。
  - 确认提示使⽤ \$confirm()，确定触发 then()，取消触发 catch()
  - 按钮内容默认为确定和取消，如不更改可删除。

```vue
// app-header.vue // Element 官⽅示例：MessageBox - 确认消息
<template>
  <el-button type="text" @click="open">点击打开 Message Box</el-button>
</template>
<script>
export default {
  methods: {
    open() {
      // 通过⽅法进⾏设置
      this.$confirm("此操作将永久删除该⽂件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
```

- 在点击退出按钮时，通过 this.\$confirm() 进⾏确认消息设置。
  - 将前⾯设置的退出功能移动到确认退出的代码区域。

### 代码演示

```vue
// layout/components/AppHeader.vue
<template>
  <div class="app-header">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 右侧用户信息展示 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        <!-- 用户头像。使用Avatar 组件 -->
        <el-avatar
          :size="30"
          :src="
            userInfo.portrait ||
              'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
          "
        ></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
        <el-dropdown-item divided @click.native="handleLogout"
          >退出</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
// 引入用户信息接口功能
import { getUserInfo } from "@/services/user";

export default {
  name: "AppHeader",
  // 实例创建时请求数据
  created() {
    // 加载用户信息
    // 不建议在钩⼦函数中直接书写逻辑，应封装到 methods 中
    this.loadUserInfo();
  },
  data() {
    return {
      // 声明存储⽤户信息的数据，绑定到视图中
      userInfo: {},
    };
  },
  methods: {
    // 加载用户信息功能
    async loadUserInfo() {
      // 调⽤⽅法请求⽤户信息
      const { data } = await getUserInfo();
      // 保存在 data 的数据中
      this.userInfo = data.content;
    },
    // 退出功能
    handleLogout() {
      this.$confirm("确认退出吗?", "退出提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 1. 清除store 中的用户信息
          this.$store.commit("setUser", null);
          // 2. 跳转登录页
          // this.$router.push('/login')
          this.$router.push({
            name: "login",
          });

          this.$message({
            type: "success",
            message: "退出成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.app-header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}
</style>
```

<img src="/images/vue/049.gif" style="width: 100%; display:inline-block; margin: 0 ;">

## Token 过期处理[概念介绍]

Token ⽤于进⾏接⼝鉴权，但 Token 具有由后端设置的过期时间，当 Token 过期后，就⽆法再请求接⼝数据了。

项⽬中后端设置的过期时间为 24 h，测试时我们可以⼿动修改 token 值让 Token 失效。

- 处理⽅式：
  - ⽅式 1：⽤户重新登录，获取新的 Token 即可。但当过期时间较短时，⽤户每次都要重新登录，体验不好。
    - 为了提⾼⽤户信息安全性，Token 的过期时间都⽐较短（就算万⼀泄露了，过⼀会⼉就过期⽆效了）
  - ⽅式 2：根据⽤户信息，⾃动给⽤户⽣成新的 Token ，减少重新登录次数。
- 观察前⾯的功能，接⼝的响应信息中具有三个与 Token 相关的信息。
  - access_token：当前使⽤的 Token ，⽤于访问需要授权的接⼝。
  - expires_in：access_token 的过期时间
  - refresh_token：刷新获取新的 access_token
- 刷新 Token 的⽅法有两种：
  - ⽅法⼀：在每个请求发起前进⾏拦截，根据 expires_in 判断 token 是否过期，如果过期则刷新后再继续请求接⼝。
    - 优点：请求前拦截处理，能节省请求次数。
    - 缺点：后端需要提供 Token 过期时间字段（例如 expires_in），并且需要结合计算机本地时间判断，如果计算机时间被篡改（特别是⽐服务器时间满）时，拦截会失败。
  - ⽅法⼆：在每个请求响应后进⾏拦截，如果发现请求失败（Token 过期导致的）时，刷新 Token 再重新请求接⼝。
    - 优点：⽆需 Token 过期时间字段，⽆需判断时间。
    - 缺点：多消耗⼀次请求。


    这⾥推荐使⽤⽅法⼆，相⽐⽅发⼀，⽅法⼆更加稳定，不会出现意外的问题。

## Token 过期处理-使⽤ Axios 响应拦截器

[Axios 响应拦截器](https://axios-http.com/zh/docs/interceptors)

响应拦截器会在响应接收完毕，在对应请求处理前被拦截器拦截。

响应拦截器参数 response 中保存了响应的信息。

```js
// Axios 官⽅⽂档：响应拦截器

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },
  function(error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
```

- 将响应拦截器设置到 utils/request.js 中，将 axios 更改为创建的 request（注意去除所有分号）
  - error 需要通过 console.dir() 输出。

```js
// utils/request.js
...
// 设置响应拦截器
request.interceptors.response.use(function (response) {
// 状态码为 2xx 都会进⼊这⾥
console.log('请求响应成功了：', response)
return response
}, function (error) {
// 超出 2xx 都会进⼊这⾥
 console.dir(error)
 return Promise.reject(error)
 })
 export default request
```

### Axios 错误处理

```js
// Axios 官⽅⽂档：错误处理

axios.get("/user/12345").catch(function(error) {
  if (error.response) {
    // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // 请求已经成功发起，但没有收到响应
    // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
    // 而在node.js中是 http.ClientRequest 的实例
    console.log(error.request);
  } else {
    // 发送请求时出了点问题
    console.log("Error", error.message);
  }
  console.log(error.config);
});
```

- 当出现错误时，通过 Element 中的 Message 组件设置提示，这⾥采⽤引⼊⽅式操作。
  - 引⼊的 Message 与之前使⽤的 this.\$message 是相同的，只是引⼊⽅式与操作⽅式不同。

```js
// 设置响应拦截器
request.interceptors.response.use(
  function(response) {
    // 状态码为 2xx 都会进⼊这⾥
    console.log("请求响应成功了：", response);
    return response;
  },
  function(error) {
    // 超出 2xx 都会进⼊这⾥
    if (error.response) {
      // 请求发送成功，也收到了响应，到状态码超过了2xx（常⻅错误处理位置）
      // 1. 保存状态码
      const { status } = error.response;
      // 2. 判断
      let errorMessage = "";
      if (status === 400) {
        errorMessage = "请求参数错误";
      } else if (status === 401) {
        // token ⽆效
      } else if (status === 403) {
        errorMessage = "没有权限，请联系管理员";
      } else if (status === 404) {
        errorMessage = "请求资源不存在";
      } else if (status >= 500) {
        errorMessage = "服务端错误，请联系管理员";
      }
      Message.error(errorMessage);
    } else if (error.request) {
      // 请求发送成功，但没有收到响应
      Message.error("请求超时，请重试");
    } else {
      // 在设置请求时发⽣了⼀些失去，触发了错误（未知型错误）
      Message.error(`请求失败${error.message}`);
    }
    // 将请i失败的错误对象继续抛出，传递给接收响应的处理函数
    return Promise.reject(error);
  }
);
```

### 刷新 Token

- HTTP 状态码 401 表示未授权，可以导致 401 的情况有很多：
  - 没有 Token
  - Token ⽆效
  - Token 过期
- 判断⽅式如下：
  - 检测是否存在 refresh_token：（后端通常会限制每个 refresh_token 只能获取⼀次新 Token）
    - 如果有，则通过 refresh_token 获取新的 access_token
      - 获取成功，重启发送请求，请求接⼝数据即可。 -- 结束
      - 获取失败，跳转登录⻚。 -- 结束
    - 如果没有，跳转登录⻚。 -- 结束

由于要进⾏跳转，在 utils/request.js 中引⼊ router/index.js。

```js
// utils/request.js
// 引⼊ router
import router from "@/router";
```

⾸先检测 store 中是否存在 user 信息（有 user 说明为正常登录，⼀定存在 refresh_token）。

```js
// utils/request.js
...
} else if (status === 401) {
// token ⽆效
// 1. 检测: 如果 store 不存在 user，跳转登录⻚
if (!store.state.user) {
router.push({
name: 'login',
query: {
 // router.currentRoute ⽤于获取当前路由对应的路由信息对象
 redirect: router.currentRoute.fullPath
 }
 })
 // 阻⽌后续操作，向下抛出错误对象
 return Promise.reject(error)
 }
 } else if (...) {
```

- 如果存在 refresh_token 则请求新的 access token。
  - 这⾥需要使⽤刷新 token 接⼝：[地址](https://passport.lagou.com/login/login.html?signature=C36078E4846A5D2E2F64707F3D9E69F5&service=http%253A%252F%252Fwww.lagou.com%252Ffront%252Fdoc.html&action=login&serviceId=lagou&ts=1650120830218#/edu-front-boot/%E7%94%A8%E6%88%B7%E6%8E%A5%E5%8F%A3/refreshTokenUsingPOST)

```js
// utils/request.js
...
// 引⼊ qs
import qs from 'qs'
...
// 设置响应拦截器
request.interceptors.response.use(function (response) {
...
}, function (error) {
 if (error.response) {
 ...
 if (status === 400) {
 ...
 } else if (status === 401) {
 // token ⽆效
 // 1. 检测: 如果 store 不存在 user，跳转登录⻚
 if (!store.state.user) {
 router.push({
 name: 'login',
 query: {
 // router.currentRoute ⽤于获取当前路由对应的路由信息对象
 redirect: router.currentRoute.fullPath
 }
 })
 // 阻⽌后续操作，向下抛出错误对象
 return Promise.reject(error)
 }
 // 2. 根据 refresh_token 请求新的 access_token
 // - 当前 else if 应当设置 return，就不会执⾏整个 if 后⾯的错误信息 return 了（严谨些）
 return request({
 method: 'POST',
 url: '/front/user/refresh_token',
 data: qs.stringify({
 refreshtoken: store.state.user.refresh_token
 })
 })
 } else if (status === 403) {
 ...
 })
```

- 检测是否成功得到新的 access_token
  - 失败，清除⽤户信息，并跳转登录⻚。
    - 跳转登录操作与之前的跳转操作相同，下⼀步会进⾏封装。
- 成功，更新 access_token，同时重新请求之前 401 的接⼝

```js
// utils/request.js
...
} else if (status === 401) {
...
return request({
...
}).then(res => {
// 检测，是否成功请求到新的 access_token
// 1. 如果没有请求到新的 access_token，跳转回登录⻚
 if (res.data.state !== 1) {
 // 清除已经⽆效的⽤户信息
 store.commit('setUser', null)
 // 跳转登录⻚
 router.push({
 name: 'login',
 query: {
 // router.currentRoute ⽤于获取当前路由对应的路由信息对象
 redirect: router.currentRoute.fullPath
 }
 })
 // 阻⽌后续操作，向下抛出错误对象
 return Promise.reject(error)
 }
 // 2. 如果成功，将新的 access_token 更新到容器与本地存储中
 store.commit('setUser', res.data.content)
 // 这时再对之前报 401 的接⼝重新请求，同时 return
 // - error.config 是之前失败的请求的配置信息
 // - request() 内部已经将原请求的所有功能包含了，⽆需接收结果返回。
 return request(error.config)
 }).catch(() => {
 // 这⾥⽤于处理 HTTP 报错的情况（我们的服务器使⽤的为响应⾃定义状态 -1来标识失败）
 // - 此处的操作与 then() 中失败的处理⽅式相同
 // - 由于不需要使⽤ catch 参数中的错误信息 err，所以没有接收
 store.commit('setUser', null)
 router.push({
 name: 'login',
 query: {
 redirect: router.currentRoute.fullPath
 }
 })
 return Promise.reject(error)
 })
 } else if (status === 403) {
 ...
```

最后将跳转登录功能封装即可。

### 代码演示

```js
import axios from "axios";
// 引入Vuex的数据
import store from "@/store";
// 通过局部引入方式引入Element 的Message 组件功能
import { Message } from "element-ui";
// 引入 Router
import router from "@/router";
// 引入 qs 用于进行请求参数处理
import qs from "qs";

// create 创建axios 实例
const request = axios.create({
  // timeout: 2000
  // baseURL:
  // headers:
});

function getBaseURL(url) {
  if (url.startsWith("/boss")) {
    return "http://eduboss.lagounews.com";
  } else {
    return "http://edufront.lagounews.com";
  }
}

// 请求拦截器
request.interceptors.request.use(function(config) {
  // 判断config.url 的前缀，来进行请求 baseURL 的设置
  config.baseURL = getBaseURL(config.url);
  // console.log(config)

  // 统一设置Token 信息
  const { user } = store.state;
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token;
  }

  // 响应拦截器
  request.interceptors.response.use(
    function(response) {
      // 状态码 2xx 会执行这里
      console.log("响应成功了：", response);
      return response;
    },
    function(error) {
      if (error.response) {
        // 请求发送成功，响应接受完毕，但状态码为失败的情况
        // 1. 判断失败的状态码情况（主要处理401的情况）
        const { status } = error.response;
        let errorMessage = "";
        if (status === 400) {
          errorMessage = "请求参数错误";
        } else if (status === 401) {
          // 1.1 无Token 信息
          if (!store.state.user) {
            // 跳转登录页
            router.push({
              name: "login",
              query: {
                // currentRoute 就是存储了路由信息的对象(相当于$route)
                redirect: router.currentRoute.fullPath,
              },
            });
            return Promise.reject(error);
          }
          // 2. Token 无效（过期）处理
          // 发送请求，获取新的 access_token
          return request({
            method: "POST",
            url: "/front/user/refresh_token",
            data: qs.stringify({
              refreshtoken: store.state.user.refresh_token,
            }),
          })
            .then((res) => {
              // console.log(res)
              // 刷新 token 失败
              if (res.data.state !== 1) {
                store.commit("setUser", null);
                // 跳转到登录页
                router.push({
                  name: "login",
                  query: {
                    // currentRoute 就是存储了路由信息的对象(相当于$route)
                    redirect: router.currentRoute.fullPath,
                  },
                });
                return Promise.reject(error);
              }
              // 刷新 token 成功
              // - 存储新的token
              store.commit("setUser", res.data.content);
              // - 重新发送失败的请求。services/user.js
              // - error.config ：本次失败的请求的配置对象
              return request(error.config);
            })
            .catch((err) => {
              console.log(err);
            });
        } else if (status === 403) {
          errorMessage = "没有权限，请联系管理员";
        } else if (status >= 500) {
          errorMessage = "服务端错误，请联系管理员";
        }
        // console.log(errorMessage)
        Message.error(errorMessage);
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        Message.error("请求超时，请重试");
      } else {
        // 发送请求时出了点问题
        Message.error(error.message);
      }
      // 将本次请求的错误对象继续向后抛出，让接受响应的处理函数进行操作
      return Promise.reject(error);
    }
  );

  return config;
});

export default request;
```

## 多个请求重复刷新 Token 处理

如果⻚⾯中存在多个请求（⼤多数⻚⾯中都不会只有⼀个请求），如果 Token 过期，每个请求都会刷新 Token，这时重复刷新多次没有意义，⼜增加了请求个数，还会出现额外的问题（下⾯演示时会跳转登录⻚）。

例如将 app-header.vue 的 created 钩⼦中调⽤多次 this.loadUserInfo()，设置 Token 失效并刷新⻚⾯，此时观察请求。

```js
 // layout/components/app-header.vue
 ...
 created () {
 // 第⼀次请求
 this.loadUserInfo()
 // 第⼆次请求
 this.loadUserInfo()
 },
 ...
```

- 通过浏览器 Network ⾯板观察请求，发现有 2 次重复的刷新 Token 请求，由于 2 次刷新 Token 携带的 refresh_token 相同，会导致⼀次成功⼀次失败，⽽失败的⼀次会导致⻚⾯跳转登录⻚。
  - 好⽐我去饮⽔机接⽔，我的朋友⼩明⽐我早到⼀步，但是发现饮⽔机的⽔桶空了，这时⼩明就将⼀桶新的⽔放进去。由于⼩明已经把⽔桶换过了，我就不⽤再去换⼀桶了，⽽是在他换完以后直接接⽔就可以了。

<img src="/images/vue/331.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- 为了避免多次请求重复刷新 Token，可以通过⼀个变量 isRefreshing 标记 Token 的刷新状态
  - 默认状态为 false，并在发送刷新 Token 请求前检测，当状态为 false 才能发送。
  - 发送刷新请求时，设置标记为 true
  - 请求完毕，设置标记为 false

```js
 // layout/components/app-header.vue
 ...
 // 是否正在更新 Token
 let isRefreshing = false

 request.interceptors.response.use(function (response) {
...
} else if (status === 401) {
if (!store.state.user) {...}
 // 发送刷新请求前判断 isRefreshing 是否存在其他已发送的刷新请求
 // 1 如果有，则将当前请求挂起，等到 Token 刷新完毕再重发，这⾥先设置为 return
 if (isRefreshing) {
 return
 }
 // 2. 如果没有，则更新 isRefreshing 并发送请求，继续执⾏后续操作
 isRefreshing = true
 // 发送刷新请求
 return request({
 ...
 }).then(res => {
 ...
 }).catch(() => {
 ...
 }).finally(() => {
 // 3 请求完毕，⽆论成功失败，设置 isRefreshing 为 false
 isRefreshing = false
 })
 } else if (status === 403) {
 ...
```

处理完毕，观察浏览器 Network ⾯板，refresh_token 请求减少为 1 次。

<img src="/images/vue/332.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

虽然刷新 Token 的问题解决了，但之前发送的两个请求只有⼀个成功执⾏，其余的请求被阻⽌了。

我们声明⼀个数组存储所有被挂起的请求，当 Token 刷新完毕再将这些请求重新发送。

```js
 // layout/components/app-header.vue
 ...
 // 存储因等待 Token 刷新⽽挂起的请求
 let requests = []

 // 设置响应拦截器
 request.interceptors.response.use(function (resp
 ...
 }, function (error) {
 ...
 if (isRefreshing) {
 // 将发送请求保存在函数中，存储到 requests 中等待执⾏，并 return中⽌操作
 return requests.push(() => {
 request(error.config)
 })
 }
 isRefreshing = true
 return request({
 ...
 }).then(res => {
 ...
 store.commit('setUser', res.data.content
 // Token 刷新成功后，将 requests 中的请求重新发送
 requests.forEach(callback => callback())
 // 随后清空已被重新发送的请求
 requests = []
 return request(error.config)
 }).catch(() => {
 ...
```

浏览器测试后发现，刷新 Token 请求⼀次，其他请求也可正常发送。

<img src="/images/vue/333.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

处理完成。


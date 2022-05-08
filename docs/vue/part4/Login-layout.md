# 登陆功能

## 布局处理

<img src="/images/vue/071.gif" style="width: 100%; display:inline-block; margin: 0 ;">

观察示例，发现⻚⾯分为上下两部分，顶部为导航，底部为登录表单。

⾸先创建登录组件，并配置路由

```vue
// views/login/index.vue
<template>
  <div class="login">登录功能</div>
</template>

<script>
export default {
  name: 'Login',
}
</script>

<style lang="scss" scoped></style>
```

配置路由，跳转以后再设置。

```js
 const routes = [
 {
 path: '/login',
 name: 'login',
 component: () => import(/* webpackChunkName: 'login' */'@/views/login/index'),
 },
 ...
 ]
```

## 导航栏布局

顶部使⽤ Vant 的[NavBar 导航栏](https://vant-contrib.gitee.io/vant/#/zh-CN/nav-bar) 组件。

```vue
// Vant 官⽅示例：NavBar 导航栏
<van-nav-bar
  title="标题"
  left-text="返回"
  right-text="按钮"
  left-arrow
  @click-left="onClickLeft"
  @click-right="onClickRight"
/>
<script>
export default {
  methods: {
    onClickLeft() {
      Toast('返回')
    },
    onClickRight() {
      Toast('按钮')
    },
  },
}
</script>
```

设置到⻚⾯中，保存返回按钮

```vue
<template>
  <div class="login">
    <van-nav-bar
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    onClickLeft() {
      this.$router.go(-1)
      //   this.$toast('返回')
    },
  },
}
</script>
```

## 登陆表单布局与校验

- 使⽤ Vant 的 [Form 表单](https://vant-contrib.gitee.io/vant/#/zh-CN/form) 组件设置。
  - van-field 为 [Field 输⼊框](https://vant-contrib.gitee.io/vant/#/zh-CN/field) 组件，代表⼀个表单项，可通过 rules 属性设置⽅法进⾏校验。
  - submit 事件仅在提交表单且验证通过后触发。

```vue
 // Vant 官⽅示例：Form 表单组件
 <van-form @submit="onSubmit">
 <van-field
 v-model="username"
 name="⽤户名"
 label="⽤户名"
 placeholder="⽤户名"
 :rules="[{ required: true, message: '请填写⽤户名' }]"
 />
 <van-field
 v-model="password"
 type="password"
 name="密码"
 label="密码"
 placeholder="密码"
 :rules="[{ required: true, message: '请填写密码' }]"
 />
 <div style="margin: 16px;">
 <van-button round block type="info" native-type="submit">登 录
van-button>
 </div>
 </van-form>

 <script>
 export default {
 data() {
 return {
 username: '',
 password: '',
 };
 },
 methods: {
 onSubmit(values) {
 console.log('submit', values);
 },
 },
 };
 </script>
```

设置到⻚⾯中，绑定数据并进⾏校验。

```vue
// login/index.vue ...
<van-field
  v-model="form.phone"
  name="phone"
  label="⼿机号"
  placeholder="请输⼊⼿机号"
  :rules="[
    {
      required: true,
      message: '请填写⼿机号',
    },
    {
      validator: phoneCheck,
      message: '格式有误，请重新输⼊',
    },
  ]"
/>
<van-field
  v-model="form.password"
  type="password"
  name="密码"
  label="密码"
  placeholder="请输⼊密码"
  :rules="[
    {
      required: true,
      message: '请填写密码',
    },
    {
      validator: passwordCheck,
      message: '格式有误，请重新输⼊',
    },
  ]"
/>
...
<script>
...
data () {
return {
form: {
phone: '',
password: ''
}
}
},
methods: {
phoneCheck (value) {
return /^1\d{10}$/.test(value)
},
passwordCheck (value) {
return /^[a-zA-Z0-9]{6,12}$/.test(value)
},
onSubmit(values) {
console.log('submit', values)
},
onClickLeft() {
// go() ⽤于跳转历史，-1 代表后退⼀个⻚⾯，⽤法类似 history.go()
this.$router.go(-1)
}
}
...
</script>
```

## 登陆请求

### 接口封装

<img src="/images/vue/401.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

创建 services/user.js，封装登录接⼝：[地址](http://eduboss.lagou.com/front/doc.html#/edu-front-boot/用户接口/loginUsingPOST)

::: warning 注意
请求参数为 urlencoded 格式，可以通过 qs 模块来处理。

除了 qs 模块外，还可通过[ URLSearchParams](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams) 对象来处理。
:::

```js
// services/user.js
import request from '@/utils/request'
import qs from 'qs'

// ⽤户登录
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    data: qs.stringify(data),
    // URLSearchParams是浏览器的实验性功能，和qs模块有同样功能
    // data: new URLSearchParams(data).toString
  })
}
```

引⼊使⽤

```js
// login/index.vue
...
import { login } from '@/services/user'
...
async onSubmit () {
const { data } = await login(this.form)
console.log(data)
},
...
```

登录成功，提示。

```js
 // login/index.vue
 ...
 async onSubmit () {
 const { data } = await login(this.form)
 // 登录成功
 if (data.state === 1) {
 // 提示，$toast 也可以通过内部⽅法触发不同提示效果，使⽤⽅式类似 element-ui
 this.$toast.success('登录成功!')
 } else {
 this.$toast.fail('登录失败!')
 }
 },
 ...
```

### 避免重复请求

可以使⽤ [Button 按钮](https://vant-contrib.gitee.io/vant/#/zh-CN/button) 组件的 loading 属性进⾏加载设置。

通过 loading 属性设置按钮为加载状态，加载状态下默认会隐藏按钮⽂字，可以通过 loading-text 设置

加载状态下的⽂字。

```vue
// Vant 官⽅示例: Button 按钮组件 加载状态
<van-button loading type="primary" />
<van-button loading type="primary" loading-type="spinner" />
<van-button loading type="info" loading-text="加载中..." />
```

设置给按钮，并根据请求状态进⾏加载控制。

```vue
// login/index.vue ...
<van-button ... :loading="isLoading">登 录</van-button>
...
<script>
data () {
return {
...
// 登录按钮加载中状态
isLoading: false
}
},
methods: {
async onSubmit () {
this.isLoading = true
const ...
if (data.state === 1) {
...
}
this.isLoading = false
},
}
</script>
```

### 登陆状态存储

学习⻚⾯与⽤户⻚⾯在登录前后的访问结果不同，为了能在其他组件中访问登录状态，可通过 Vuex 统⼀管理。

```js
 // store/index.js
 ...
 state: {
 // 存储登录⽤户数据
 user: null
 },
 mutations: {
 // ⽤于修改 user
 setUser (state, payload) {
 // payload 为请求到的⽤户数据，JSON 格式不便操作，转换为对象存储
 state.user = JSON.parse(payload)
 }
 },
 ...
```

登录成功后提交 mutation 存储⽤户数据

```js
 // login/index.vue
 ...
 async onSubmit () {
 ...
 if (data.state === 1) {
 // 将数据保存到本地存储中
 this.$store.commit('setUser', data.content)
 ...
 }
 ...
 },
```

### 本地存储

将数据设置到本地存储，避免刷新导致重新登录

```js
 // store/index.js
 ...
 state: {
 // 存储登录⽤户数据，尝试读取本地存储数据
 user: JSON.parse(window.localStorage.getItem('lagou-edu-mobile-user')|| null)
 },
 mutations: {
 // ⽤于修改 user
 setUser (state, payload) {
 state.user = JSON.parse(payload)
 // 将数据设置到本地存储，注意本地存储⽆法存储对象
 window.localStorage.setItem('lagou-edu-mobile-user', payload)
 }
 },
 ...
```

## 身份认证

<img src="/images/vue/072.gif" style="width: 100%; display:inline-block; margin: 0 ;">

### 登陆状态检测

`⽤户功能`与`学习功能`需要登录才能访问，如果未登录，应跳转到登录⻚⾯。

这⾥通过 `Vue Router` 的导航守卫处理。

```js
 // router/index.js
 ...
 import store from '@/store'
 ...
 {
 path: '/learn',
 name: 'learn',
 component: () => import(/* webpackChunkName: 'learn' */'@/views/learn/index'),
 meta: { requiresAuth: true }
 },
 {
 path: '/user',
 name: 'user',
 component: () => import(/* webpackChunkName: 'user' */'@/views/user/index'),
 meta: { requiresAuth: true }
 }
 ...
 // 导航守卫进⾏登录检测与跳转
 router.beforeEach((to, from, next) => {
 // 验证 to 路由是否需要进⾏身份认证
 if (to.matched.some(record => record.meta.requiresAuth)) {
 // 验证 Vuex 的 store 中的登录⽤户信息是否存储
 if (!store.state.user) {
 // 未登录，跳转到登录⻚
 return next({
 name: 'login'
 })
 }
 // 已经登录，允许通过
 next()
 } else {
 next()
 }
 })
 export default router
```

### 登录成功跳转上次访问的⻚⾯

- 登录后，应当跳转到上次访问的⻚⾯，处理⽅式如下：
  - 导航守卫跳转 login 同时传递跳转⻚信息
  - 登录成功后根据信息跳转对应⻚⾯即可。

```js
 // router/index.js
 ...
 router.beforeEach((to, from, next) => {
 ...
 if (!store.state.user) {
 return next({
 name: 'login',
 query: {
 // 将本次路由的 fullPath 传递给 login ⻚⾯
 redirect: to.fullPath
 }
 })
 }
 ...
```

login 登录成功的跳转需要取决于 redirect

```js
// login/index.vue
...
async onSubmit () {
...
if (data.state === 1) {
...
// 跳转
this.$router.push(this.$route.query.redirect || '/')
}
...
```

## 接⼝鉴权

`⽤户功能`需要⽤户登录才能访问，接⼝同样，如果不登录就请求⽤户功能接⼝是很不合理且不安全的，所以在进⾏这类接⼝请求时需要进⾏接⼝访问权限验证，称为`接⼝鉴权`。

在项⽬中通过 `Token` ⽅式进⾏接⼝鉴权，Token 数据由服务器⽣成，在登录成功后响应到客户端。

从接⼝⽂档中可以得知，客户端请求接⼝时，通过请求头的 `Authorization` 字段发送 `access_token` 以进⾏身份认证，失败时状态码为 `401`。

### 通过请求拦截器设置 Token

<img src="/images/vue/402.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

由于要进⾏鉴权的接⼝有很多，我们在 request.js 中通过 Axios 的请求拦截器统⼀处理。

- 步骤如下：
  - 引⼊ store 并读取存储的 user 信息。
  - 如果 user 中存在 access_token，则设置给请求头的 Authorization 字段。

```js
 // utils/request.js
 ...
 import store from '@/store'
 ...

 // 设置请求拦截器进⾏接⼝鉴权
 request.interceptors.request.use(config => {
 // 读取 store 中存储的 user 数据
 const { user } = store.state
 // 检测 user 是否存在数据，如果有，则进⾏ token 设置
 if (user && user.access_token) {
 config.headers.Authorization = user.access_token
 }
 return config
 })
 ...
```

尝试请求⽤户信息接⼝（⽆需封装），验证请求成功即可。

```vue
<!-- src\views\user\index.vue -->
<template>
  <div class="user">
    用户页面
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  name: 'UserIndex',
  // 生命周期 - 创建完成（访问当前this实例）
  created() {
    request({
      method: 'GET',
      url: '/front/user/getInfo',
    })
  },
}
</script>
<style lang="scss" scoped></style>
```

<img src="/images/vue/073.gif" style="width: 100%; display:inline-block; margin: 0 ;">

### 刷新 Token

<img src="/images/vue/403.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- Token 具有过期时间，过期后 Token ⽆法继续使⽤，这时有两种⽅式解决：
  - ⽤户重新登录，获取新的 access_token 即可。
  - 当 Token 过期时，⾃动刷新 Token 减少⽤户登录次数。（体验更好）
- 刷新 Token 的⽅式为：
  - 将登录成功后响应的 refresh_token 发送给刷新 Token 接⼝获取新的 access_token，再利⽤新的
  - access_token 进⾏接⼝鉴权。

#### 通过响应拦截器刷新 Token

- Token 过期可能发⽣在任意接⼝操作时，可通过 Axios 响应拦截器统⼀处理。
- 步骤如下：
  - 判断是否为 Token 过期导致状态码为 401
  - 获取 refresh_token
  - 请求刷新 Token 接⼝
  - 记录刷新状态，避免多个接⼝重复刷新 Token
- 代码如下：

```js
 // request.js
 ...
 // 封装函数，用于跳转登录页
function RedirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

// 标记token刷新状态
let isRefreshing = false
// 存储刷新时等待的请求
// eslint-disable-next-line prefer-const
let requests = []

// 通过响应拦截器刷新 Token
request.interceptors.response.use(response => {
  return response
}, async (error) => {
// 存在相应内容，但是出错（401、404）
  if (error.response) {
    // 检测状态码是否为401
    if (error.response.status === 401) {
      // 检测是否存在用户的登陆信息
      if (!store.state.user) {
        RedirectLogin()
        // 如果不存在 ，结束即可
        return Promise.reject(error)
      }

      // 发送请求前检测，是否已经存在刷新 token 的请求了
      if (isRefreshing) {
        return requests.push(() => {
          // error.config 指的是失败请求的配置对象
          requests(error.config)
        })
      }
      isRefreshing = true

      // 假如access_token错误,refresh_token是争取的。用refresh_token发送请求，请求新的access_token
      const { data } = await request({
        method: 'POST',
        url: '/front/user/refresh_token',
        data: new window.URLSearchParams({
          refreshtoken: store.state.user.refresh_token
        }).toString()
        // data:qs.stringify({data})
      })
      // 假如refresh_token也是错误的，此接口请求返回-1时
      if (data.state !== 1) {
        // 刷新token失败，清空store和本地存储
        store.commit('setUser', null)
        RedirectLogin()
        return Promise.reject(error)
      }
      // 假如refresh_token是正确的，发送请求成功，请求新的access_token
      store.commit('setUser', data.content)

      // 将 requests 中的所有请求重新发送
      requests.forEach(callback => callback())
      requests = []
      isRefreshing = false
      return requests(error.config)
    }
  }
  return Promise.reject(error)
})
```

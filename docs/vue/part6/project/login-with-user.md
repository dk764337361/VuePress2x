# 登录与用户

## 1. 登录页布局

### 1.使用 Vant 表单组件

- 官方示例：

```vue
<van-form @submit="onSubmit">
  <van-cell-group inset>
    <van-field
      v-model="username"
      name="用户名"
      label="用户名"
      placeholder="用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <van-field
      v-model="password"
      type="password"
      name="密码"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
  </van-cell-group>
  <div style="margin: 16px;">
    <van-button round block type="primary" native-type="submit">
      提交
    </van-button>
  </div>
</van-form>
<script>
import { ref } from 'vue'

export default {
  setup() {
    const username = ref('')
    const password = ref('')
    const onSubmit = (values) => {
      console.log('submit', values)
    }

    return {
      username,
      password,
      onSubmit,
    }
  },
}
</script>
```

### 2. 添加布局

```vue
<!--
src\views\Login\index.vue
-->
<template>
  <van-form @submit="SubmitHandle">
    <img class="logo" src="" alt="" />
    <van-cell-group inset>
      <van-field
        v-model="state.username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
      />
      <van-field
        v-model="state.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
      />
      <van-field
        v-model="state.captche"
        name="验证码"
        label="短信验证码"
        placeholder="短信验证码"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup>
import { reactive } from 'vue'
const SubmitHandle = () => {
  console.log('提交了表单')
}

const state = reactive({
  username: '',
  password: '',
  captche: '', // 验证码
})
</script>

<style scoped></style>
```

### 3. 解决`输入框`的`发送验证码`按钮

::: warning 注意

- 验证码输入框需要用到[Fild 输入框](https://vant-contrib.gitee.io/vant/#/zh-CN/field#cha-ru-an-niu)组件的插槽
- 官方示例：

```vue
<van-cell-group inset>
  <van-field
    v-model="sms"
    center
    clearable
    label="短信验证码"
    placeholder="请输入短信验证码"
  >
    <template #button>
      <van-button size="small" type="primary">发送验证码</van-button>
    </template>
  </van-field>
</van-cell-group>
```

:::

```vue
<!--
src\views\Login\index.vue
-->
<template>
  <van-form @submit="SubmitHandle">
    <img class="logo" src="" alt="" />
    <van-cell-group inset>
      <van-field
        v-model="state.username"
        clearable
        name="用户名"
        label="用户名"
        placeholder="用户名"
      />
      <van-field
        v-model="state.password"
        type="password"
        clearable
        name="密码"
        label="密码"
        placeholder="密码"
      />
      <van-field
        v-model="state.captche"
        center
        clearable
        name="验证码"
        label="短信验证码"
        placeholder="短信验证码"
      >
        <template #button>
          <van-button size="small" type="primary">
            发送验证码
          </van-button>
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup>
import { reactive } from 'vue'
const SubmitHandle = () => {
  console.log('提交了表单')
}

const state = reactive({
  username: '',
  password: '',
  captche: '', // 验证码
})
</script>

<style scoped></style>
```

<img src="/images/vue/117.gif" style="width: 50%; display:inline-block; margin: 0 ;">

### 4.完善样式与布局

<img src="/images/vue/477.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

```vue
<!--
src\views\Login\index.vue
-->
<template>
  <van-form @submit="SubmitHandle">
    <img
      class="logo"
      src="https://pic1.zhimg.com/80/v2-62737246ecd625f0a78377432f475060_1440w.jpg"
      alt=""
    />
    <van-cell-group inset>
      <van-field
        v-model="state.username"
        clearable
        name="用户名"
        label="用户名"
        placeholder="用户名"
      />
      <van-field
        v-model="state.password"
        type="password"
        clearable
        name="密码"
        label="密码"
        placeholder="密码"
      />
      <van-field
        v-model="state.captche"
        center
        clearable
        name="验证码"
        label="短信验证码"
        placeholder="短信验证码"
      >
        <template #button>
          <van-button size="small" type="primary">
            发送验证码
          </van-button>
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        登陆
      </van-button>
      <span class="change-button">快速登陆</span>
      <span class="change-button">测试账号：，密码：</span>
    </div>
  </van-form>
</template>

<script setup>
import { reactive } from 'vue'
const SubmitHandle = () => {
  console.log('提交了表单')
}

const state = reactive({
  username: '',
  password: '',
  captche: '', // 验证码
})
</script>

<style lang="scss" scoped>
.van-form {
  display: flex;
  flex-direction: column;
}
.logo {
  width: 150px;
  height: 150px;
  align-self: center;
  margin: 70px 0 10px;
}
.change-button {
  display: block;
  text-align: center;
  font-size: 14px;
  color: #999;
  margin-top: 10px;
}
</style>
```

## 2. 登陆模式切换

### 1.模式切换

<img src="/images/vue/118.gif" style="width: 50%; display:inline-block; margin: 0 ;">

```vue
<!--
src\views\Login\index.vue
-->
<template>
  <van-form @submit="SubmitHandle">
    <van-cell-group inset>
      ......

      <van-field
        v-model="state.password"
        type="password"
        clearable
        +
        v-if="state.isPassword"
        name="密码"
        label="密码"
        placeholder="密码"
      />
      <van-field
        v-model="state.captche"
        center
        clearable
        +
        v-else
        name="验证码"
        label="短信验证码"
        placeholder="短信验证码"
      >
        ......
      </van-field>
    </van-cell-group>
    <div style="margin: 16px;">
      <span class="change-button" @click="changeMode">快速登陆</span>
      <span class="change-button">测试账号：，密码：</span>
    </div>
  </van-form>
</template>
......

<script setup>
import { reactive, computed } from 'vue'
......


const state = reactive({
 + // 登陆模式 'captcha'
 + loginMode: 'password',
 + // 检测是否为密码登陆模式，返回布尔值
 + isPassword: computed(() =>
 +   state.loginMode === 'password'
 + ),
  username: '',
  password: '',
  captche: '' // 验证码
})

// 切换登陆模式处理
const changeMode = () => {
  state.loginMode = state.isPassword ? 'captcha' : 'password'
}
</script>

......
```

### 2. 模式切换时，清除密码和验证码输入框内容

<img src="/images/vue/119.gif" style="width: 50%; display:inline-block; margin: 0 ;">

```vue
<!--
src\views\Login\index.vue
-->
<script>
// 切换登陆模式处理
const changeMode = () => {
  state.loginMode = state.isPassword ? 'captcha' : 'password'
  // 清除密码和验证码输入框内容
  state.password = ''
  state.captche = ''
}
</script>
```

### 3.模式切换时，切换文本也切换

<img src="/images/vue/120.gif" style="width: 50%; display:inline-block; margin: 0 ;">

```vue
<!--
src\views\Login\index.vue
-->
<template>
    <div style="margin: 16px;">
      <van-button
        round
        block
        type="primary"
        native-type="submit"
      >
        登陆
      </van-button>
      <span
        class="change-button"
        v-text="state.changeText"
        @click="changeMode"
      />
      <span class="change-button">测试账号：，密码：</span>
    </div>
      </van-form>
</template>
<script>
const state = reactive({
  // 登陆模式 'captcha'
  loginMode: 'password',
  // 检测是否为密码登陆模式，返回布尔值
  isPassword: computed(() =>
    state.loginMode === 'password'
  ),
  changeText: computed(() =>
    state.isPassword ? '快速登陆' : '密码登陆'
  ),
  username: '',
  password: '',
  captche: '' // 验证码
})
</script>
```

## 3. 发送验证码

### 1. API 功能封装

```
src
├─ api
   ├─ ......
   └─ user.js (新建)
```

```js
// src\api\user.js
import request from '@/utils/request'

// 获取用户验证码，验证用户真实性，避免重复发送

export const getVerifyCode = () =>
  request({
    method: 'GET',
    url: 'verify_code',
  })

// 获取短信验证码
export const getVerify = (data) =>
  request({
    method: 'POST',
    url: '/register/verify',
    data,
  })
```

### 2. API 引入与测试用户名字段

<img src="/images/vue/121.gif" style="width: 50%; display:inline-block; margin: 0 ;">

```vue
<!--
src\views\Login\index.vue
-->
<template>
  <van-form @submit="SubmitHandle">
......
    <van-cell-group inset>
......
      <van-field
        v-model="state.captche"
        center
        clearable
        v-else
        name="验证码"
        label="短信验证码"
        placeholder="短信验证码"
      >
        <template #button>
          <van-button
            size="small"
            type="primary"
          +  @click="sendCaptcha"
          >
            发送验证码
          </van-button>
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button
        round
        block
        type="primary"
        native-type="submit"
      >
        登陆
      </van-button>
      <span
        class="change-button"
        v-text="state.changeText"
        @click="changeMode"
      />
      <span class="change-button">测试账号：17201234567，密码：</span>
    </div>
  </van-form>
</template>
<script setup>
+ // ···········验证码API引入···········
+ import { getVerifyCode, getVerify } from '@/api/user'
+ import { Toast } from 'vant'
+ // ·······························
+ ......
+ // ----------验证码处理----------
+ const sendCaptcha = async () => {
+ // 1.手机号规则校验
+  if (!/^1\d{10}$/.test(state.username)) {
+    return Toast('请检查用户名')
+  }
+  // 2. 测试数据
+  const { data } = await getVerifyCode()
+  console.log(data)
+ }
......
</scrip>
```

### 3. 发送 API 数据

<img src="/images/vue/122.gif" style="width: 100%; display:inline-block; margin: 0 ;">

```js
......
<scrip>
// ----------验证码处理----------
const sendCaptcha = async () => {
// 1.手机号规则校验
  if (!/^1\d{10}$/.test(state.username)) {
    return Toast('请检查用户名')
  }
  // 2. 发送校验请求,得到data中的key
  const { data: v1 } = await getVerifyCode()
  console.log(v1)
  console.log(v1.data.key)
  if (v1.status !== 200) return
  // 3. 发送校验码请求（把data中的key发送 API getVerify)

  const { data: v2 } = await getVerify({
    type: 'login',
    phone: state.username,
    key: v1.data.key
  })
  console.log(v2)
  if (v2.status !== 200) {
    return Toast('网络开小差了，请稍后再试')
  }
}
</scrip>
```

### 4.验证码倒计时

<img src="/images/vue/123.gif" style="width: 50%; display:inline-block; margin: 0 ;">

- 使用 Vant 的[倒计时组合式 API](https://youzan.github.io/vant/#/zh-CN/use-count-down)

```vue
<!--
src\views\Login\index.vue
-->
<template>
  ......

    <van-cell-group inset>
  ......

      <van-field
        v-model="state.captche"
        center
        clearable
        v-else
        name="验证码"
        label="短信验证码"
        placeholder="短信验证码"
      >
        <template #button>
          <van-button
            size="small"
            type="primary"
            @click="sendCaptcha"
          +  :disabled="state.isSend"
          >
          +  <!-- 发送验证码 -->
          +  {{ state.currentText }}
          </van-button>
        </template>
      </van-field>
    </van-cell-group>
  ......

    </div>
  </van-form>
</template>

<script setup>
......
// ···········验证码API引入···········
import { getVerifyCode, getVerify } from '@/api/user'
// - 使用Vant的提示组件
import { Toast } from 'vant'
// - 使用Vant的倒计时组合式API
+ import { useCountDown } from '@vant/use'
// ·······························
// ----------数据处理----------
const state = reactive({
......
  + // 存储发送状态，用于控制显示效果
  + isSend: false,
  + // 倒计时实例
  + countDown: null,
  + // 根据状态设置要显示的内容
  + currentText: computed(() => state.isSend ? state.countDown.seconds : '发送验证码')
})

......

// ----------验证码处理----------
const sendCaptcha = async () => {
......

+  // 3. 验证码发送完毕后，设置倒计时实例
+  const countDown = useCountDown({
+    // 倒计时10秒
+    time: 10 * 1000, // 实际为60*1000 此处为演示值
+    onFinish () {
+      state.isSend = false
+    }
+  })

+  // 开始倒计时
+  countDown.start()
+  state.countDown = countDown.current
+  // 更改发送状态
+  state.isSend = true
}

</script>
```

## 5. 登陆请求

### 1. API 功能封装

```js
......

// 密码登录
export const loginByPassword = data => request({
  method: 'POST',
  url: '/login',
  data
})

// 验证码登录
export const loginByCaptcha = data => request({
  method: 'POST',
  url: '/login/mobile',
  data
})
```

### 2. 用户名、密码、验证码检测与返回数据

<img src="/images/vue/124.gif" style="width: 100%; display:inline-block; margin: 0 ;">

```vue
<!--
src\views\Login\index.vue
-->
<template>
  ......

    <van-cell-group inset>
  ......

      <van-field
        v-model="state.captche"
        center
        clearable
        v-else
        name="验证码"
        label="短信验证码"
        placeholder="短信验证码"
      >
        <template #button>
          <van-button
            size="small"
            type="primary"
            @click="sendCaptcha"
          +  :disabled="state.isSend"
          >
          +  <!-- 发送验证码 -->
          +  {{ state.currentText }}
          </van-button>
        </template>
      </van-field>
    </van-cell-group>
  ......

    </div>
  </van-form>
</template>

<script setup>
......
// ···········验证码API引入···········
+ import {
+   getVerifyCode,
+   getVerify,
+   loginByPassword,
+   loginByCaptcha
+ } from '@/api/user'
......
// ·······························


// ----------数据处理----------
const state = reactive({
......
  + // 存储发送状态，用于控制显示效果
  + isSend: false,
  + // 倒计时实例
  + countDown: null,
  + // 根据状态设置要显示的内容
  + currentText: computed(() => state.isSend ? state.countDown.seconds : '发送验证码')
})

......

+ // ----------登陆处理----------
+ const SubmitHandle = async () => {
-   // console.log('提交了表单')
+
+   // 用户名检测
+   const username = state.username.trim()
+   if (username === '') { return Toast('请检查用户名') }
+
+   // 为了统一存储API响应结果，使用变量保存
+   let data = ''
+   if (state.isPassword) {
+     // 1. 密码模式
+     const password = state.password.trim()
+     if (password === '') { return Toast('请检查密码') }
+     // eslint-disable-next-line no-unused-vars
+     ({ data } = await loginByPassword({
+       account: username,
+       password
+     }))
+   } else {
+     // 2. 验证码模式
+     const captcha = state.captcha.trim()
+     if (captcha === '') { return Toast('请检查验证码') }
+     // eslint-disable-next-line no-unused-vars
+     ({ data } = await loginByCaptcha({
+       phone: username,
+       captcha
+     }))
+   }
+   // 接收响应数据
+   console.log(data)
}
</script>
```

## 6. 登陆状态管理

此处 Vuex4 配合 Vue3 使用

### 1. 新建 Vuex 配置文件

```
src
├─ store
   └─ index.js  (新建)
```

```js
import { createStore } from 'vuex'

export default createStore({
  // state相当于Vue的data
  state() {
    return {
      user: window.localStorage.getItem('USER_TOKEN'),
    }
  },
  // mutations用于更改state
  mutations: {
    setUser(state, payload) {
      state.user = payload
      window.localStorage.setItem('USER_TOKEN', payload)
    },
  },
})
```

### 2. 在入口文件 main.js 引入

```js
......

// 引入Vuex
import store from './store'

......

app.use(store)

......
```

### 3. 在用户登陆后把 Token 存储到本地

```vue
<!--
src\views\Login\index.vue
-->

<script setup>
// 引入Vuex 状态管理
// - useStore是Vuex的一个组合式API
import {useStore} from 'vuex'
const store = useStore()

......

// ----------登陆处理----------
const SubmitHandle = async () => {

......

  // 接收响应数据
  // console.log(data)
 + if (data.status !== 200) { return Toast('用户名或密码错误') }
 + // 成功时，通过muation 提交新的Token信息
 + // - 通过commit调用muation提交state
 + store.commit('setUser', data.data.token)
}
</script>
```

<img src="/images/vue/125.gif" style="width: 100%; display:inline-block; margin: 0 ;">

### 4. 跳转到 user 用户页

```vue
<script setup>
......
// 引入VueRouter
import { useRouter } from 'vue-router'
const router = useRouter()

// ----------登陆处理----------
const SubmitHandle = async () => {

......

  // 接收响应数据
  // console.log(data)
  if (data.status !== 200) { return Toast('用户名或密码错误') }
  // 成功时，通过muation 提交新的Token信息
  // - 通过commit调用muation提交state
  store.commit('setUser', data.data.token)
 + Toast('登陆成功')
 + // 跳转页面
 + router.push('/user')
}

```

## 7. 页面访问权限与接口鉴权

### 1. 用 meta 设置需要登陆权限的路由

- meta(路由元信息)

```js
// 路由规则配置

const routes = [

......

  {
    path: '/order-confirm',
    name: 'order-confirm',
    component: () => import('@/views/OrderConfirm/index.vue'),
    props: true,
    meta: { requireAuth: true }
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/Order/index.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/order-detail/:orderId',
    name: 'order-detail',
    component: () => import('@/views/OrderDetail/index.vue'),
    props: true,
    meta: { requireAuth: true }
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('@/views/Pay/index.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/Cart/index.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search/index.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/User/index.vue'),
    meta: { requireAuth: true }
  },

  ......
]

  ......

```

### 2. 通过导航守卫检测登陆状态

```js
......

// 引入Vuex中的组合API：useStore
import store from '@/store'

......

// 通过导航守卫检测登陆状态
// to（目标路由）
router.beforeEach(to => {
  // 1.对无需登陆的页面进行放行
  if (!to.meta.requireAuth) {
    return true
  }
  // 校验登陆状态
  // 情况1：如果Token没有就做登录页跳转
  // 情况2：用户登陆过，登陆完毕后刷新页面了（此时vuex数据被清除了，但本地token没有清除）。
  //  然后用户并没有访问需要登陆的页面，此时不能从vuex里读取数据，且uesr里没有值。
  if (!store.state.token || !window.localStorage.getItem('USER_TOKEN')) {
    // 2. 如果Vuex或本地存储里都没有数据，跳转登陆页
    // return 是to的返回值
    return {
      name: 'login',
      // 3.通过重定向，跳转到登陆访问前的页面
      //  - 比如开始点击购物车页，但此时没有登陆，登陆成功后，跳转回购物车页
      query: {
        redirect: to.fullPath
      }
    }
  }
})

export default router

```

<img src="/images/vue/126.gif" style="width: 100%; display:inline-block; margin: 0 ;">

### 3. 修改 index.vue 里的跳转页

```vue

```

```vue
<script setup>
......
// 引入VueRouter
// useRouter是操作路由方法，useRoute是记录路由信息
+ import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
+ const route = useRoute()


// ----------登陆处理----------
const SubmitHandle = async () => {

  ......

  // 接收响应数据
  // console.log(data)
  if (data.status !== 200) { return Toast('用户名或密码错误') }
  // 成功时，通过muation 提交新的Token信息
  // - 通过commit调用muation提交state
  store.commit('setUser', data.data.token)
  Toast('登陆成功')
  // 跳转页面
  + // 如果有重定向就跳转重庆向页，没有就默认跳转到user页
  + // 写法一：
  + // router.push(route.query.redirect || '/user')
  + // 写法二：?? 空值合并操作符
  + router.push(route.query.redirect ?? '/user')
}

```

<img src="/images/vue/127.gif" style="width: 100%; display:inline-block; margin: 0 ;">

### 4.接口鉴权

```js
// src\utils\request.js

import axios from 'axios'

+ // 引入 store
+ import store from '@/store'

......

const request = axios.create({
  baseURL: 'https://shop.fed.lagounews.com/api'
})

+ // 在请求拦截器中进行 token 设置
+ request.interceptors.request.use(config => {
+   // 获取 Token
+   const { token } = store.state
+   if (token) {
+     // 设置请求头
+     config.headers.Authorization = 'Bearer ' + token
+   }
+   return config
+ })

export default request

```

## 8. 登录页的 Logo 图处理

```js
// src\api\index.js

......

+ export const getLogo = () => request({
+   method: 'GET',
+   url: '/wechat/get_logo'
+ })

```

```vue
<!--
src\views\Login\index.vue
-->
<template>
  <van-form @submit="SubmitHandle">
    <img
      class="logo"
      :src="state.logoUrl"
      alt=""
    >
    ......

    </template>
    <script setup>
// -----------------头像处理-------------
import { getLogo } from '@/api/index'

// ----------数据处理----------
const state = reactive({
......
  logoUrl: ''
})

const loadLogo = async () => {
  const { data } = await getLogo()
  if (data.status !== 200) {
    return
  }
  state.logoUrl = data.data.logo_url
  console.log(data)
}
loadLogo()
</script>
<style>
.logo {
+ width:100%;
  align-self: center;
  margin: 70px 0 10px;
}

</style>

```

此时 logo API 挂了

<img src="/images/vue/478.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## 9. 用户页--布局

### 1. 头部

<img src="/images/vue/479.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

1. cell 单元格 的卡片风格 示例

```vue
<van-cell-group inset>
  <van-cell title="单元格" value="内容" />
  <van-cell title="单元格" value="内容" label="描述信息" />
</van-cell-group>
```

2. 基础布局与样式

```vue
<!--
 * @author: chendaokuan
 * @since: 2022-05-17
 * index.vue
-->
<template>
  <div class="container">
    <!-- 头部 -->
    <div class="header">
      <img
        class="logo"
        src="https://pic1.zhimg.com/80/v2-62737246ecd625f0a78377432f475060_1440w.jpg"
        alt=""
      />
      <div class="user-info">
        <div class="user-name">
          小吴
        </div>
        <div class="user-id">
          ID:3
        </div>
      </div>
      <van-icon name="setting-o" />
    </div>
    <!-- 主体菜单区域 -->
    <van-cell-group inset>
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" label="描述信息" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group>

    <!-- 公共底部 -->
    <layout-footer />
  </div>
</template>

<script setup>
import LayoutFooter from '@/components/LayoutFooter.vue'
</script>

<style lang="scss" scoped>
.container {
  height: 600px;
  padding: 15px 0;

  background-color: #f6f7f9;

  .header {
    padding: 0 15px 15px;
    display: flex;
    align-items: center;

    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .user-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;

      .user-name {
        font-size: 14px;
        font-weight: 700;
        padding-bottom: 10px;
      }

      .user-id {
        font-size: 10px;
      }
    }
  }
}
</style>
```

3. 径向渐变

<img src="/images/vue/481.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

```vue
<style lang="scss" scoped>
.container {
  height: 600px;
  padding: 15px 0;
 + background: radial-gradient(circle at 50% -10%,#FBC546 72%,#F6F7F9 72%) #F6F7F9 0 -300px no-repeat;

 ......
}
</style>
```

### 2. 主体区域

1. 使用 Vant 的 Grid 宫格

```vue
<van-grid>
  <van-grid-item icon="photo-o" text="文字" />
  <van-grid-item icon="photo-o" text="文字" />
  <van-grid-item icon="photo-o" text="文字" />
  <van-grid-item icon="photo-o" text="文字" />
</van-grid>
```

2. 主体布局

```vue
<!--
 * @author: chendaokuan
 * @since: 2022-05-17
 * index.vue
-->
<template>
  <div class="container">
    <!-- 头部 -->
    ......

    <!-- 主体菜单区域 -->
    <div class="main">
      <van-cell-group inset class="user-detail">
        <van-cell>
          <van-grid :border="false">
            <van-grid-item icon="photo-o" text="1">
              <template #icon>
                收藏
              </template>
            </van-grid-item>
            <van-grid-item icon="photo-o" text="15083">
              <template #icon>
                积分
              </template>
            </van-grid-item>
            <van-grid-item icon="photo-o" text="555">
              <template #icon>
                优惠券
              </template>
            </van-grid-item>
            <van-grid-item icon="photo-o" text="9999">
              <template #icon>
                余额
              </template>
            </van-grid-item>
          </van-grid>
        </van-cell>
      </van-cell-group>
      <van-cell-group inset>
        <van-cell title="订单中心" value="查看全部" is-link to="/order" />
        <van-grid column-num="5" :border="false">
          <van-grid-item icon="bill-o" text="待付款" />
          <van-grid-item icon="tosend" text="待发货" />
          <van-grid-item icon="logistics" text="待收货" />
          <van-grid-item icon="comment-o" text="待评价" />
          <van-grid-item icon="sign" text="已完成" />
        </van-grid>
      </van-cell-group>
    </div>
    <!-- 公共底部 -->
    <layout-footer />
  </div>
</template>

<script setup>
import LayoutFooter from '@/components/LayoutFooter.vue'
</script>

<style lang="scss" scoped>
.container {
  ......

  // 主体
  .van-cell-group {
    margin-bottom: 10px;
  }
  // 用户账户信息卡片设置样式
  .user-detail {
    .van-cell {
      padding: 0;
    }
  }
}
</style>
```

3. 如果数据没有及时加载，主体头部会出现塌陷

<img src="/images/vue/480.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

```vue
<style>
  // 主体
  .van-cell-group {
    margin-bottom: 10px;
  }
  // 用户账户信息卡片设置样式
  .user-detail {
    .van-cell {
      padding: 0;
     + // 避免内容没有加载出来时出现短暂的塌陷
     + min-height: 74px;
    }
  }
}
</style>
```

## 11. 用户页--测试用户数据

### 1. API 功能封装

```js
// src\api\user.js
......

// 获取用户页信息
export const getUserInfo = () => request({
  method: 'GET',
  url: '/user'
})

```

### 2. API 引入与测试数据

```vue
<script setup>
......
import { getUserInfo } from '@/api/user'
import { ref } from 'vue'

// 数据处理
const userData = ref({})

// 初始化用户数据
const initUserInfo = async () => {
  const { data } = await getUserInfo()
  console.log(data)
  if (data.status !== 200) return
  userData.value = data.data
}
</script>
```

<img src="/images/vue/128.gif" style="width: 100%; display:inline-block; margin: 0 ;">

此时出现状态码为 4100，原因是在不同后端进行处理的时候，有可能后端会通过 http 状态进行相应，来标记到底是 401 或其他。

也有可能后端在是以 400 来代表相应成功，但是没通过一些状态码进行标记来处理，比如没做登陆、认证等等问题.....

### 3. 用响应拦截器处理请求与失败处理

```js
// src\utils\request.js

......

// 引入router
+ import router from '@/router'

......

+ // 在响应拦截器中进行失败处理
+ request.interceptors.response.use(config => {
+   // 根据我们的后端响应数据，发现响应的状态信息为 410000 时，说明用户未登录访问了相关接口
+   // 跳转登录页
+   if (config.data.status === 410000) {
+     router.push({
+       name: 'login',
+       query: {
+         redirect: router.currentRoute.fullPath
+       }
+     })
+   }
+
+   return config
+ })

export default request

```

## 12. 用户页--数据处理

<img src="/images/vue/482.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

通过计算属性把数据进行处理，再把数据放到页面进行渲染

```vue
<!--
 * @author: chendaokuan
 * @since: 2022-05-17
 * index.vue
-->
<template>
  <div class="container">
    <!-- 头部 -->
    <div class="header">
      <img
        class="logo"
        + :src="userAvatar"
        alt=""
      >
      <div class="user-info">
        <div
          class="user-name"
          + v-text="usrename"
        />
        <div
          class="user-id"
          + v-text="userID"
        />
      </div>
      <van-icon name="setting-o" />
    </div>
    <!-- 主体菜单区域 -->
    <div class="main">
      <van-cell-group
        inset
        class="user-detail"
      >
        <van-cell>
          <van-grid :border="false">
           + <van-grid-item :text="collectCount">
              <template #icon>
                收藏
              </template>
            </van-grid-item>
            +<van-grid-item :text="integral">
              <template #icon>
                积分
              </template>
            </van-grid-item>
           + <van-grid-item :text="couponCount">
              <template #icon>
                优惠券
              </template>
            </van-grid-item>
           + <van-grid-item :text="now_money">
              <template #icon>
                余额
              </template>
            </van-grid-item>
          </van-grid>
        </van-cell>
      </van-cell-group>
......
    </div>
    <!-- 公共底部 -->
    <layout-footer />
  </div>
</template>

<script setup>
......

// 数据处理
const userData = ref({})
// 用户头像
+ const userAvatar = computed(() => userData.value?.switchUserInfo?.[0].avatar || 'https://pic1.zhimg.com/80/v2-62737246ecd625f0a78377432f475060_1440w.jpg')
+ // 用户昵称
+ const usrename = computed(() => userData.value?.nickname || '')
+ // 用户ID
+ const userID = computed(() => 'ID:' + (userData.value?.uid || ''))
+ // 用户详情信息
+ const collectCount = computed(() => userData.value?.collectCount?.toString() || '')
+ const integral = computed(() => userData.value?.integral?.toString() || '')
+ const couponCount = computed(() => userData.value?.couponCount?.toString() || '')
+ const now_money = computed(() => userData.value?.now_money?.toString() || '')

......
</script>
```

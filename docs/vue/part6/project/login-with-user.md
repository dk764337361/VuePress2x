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

### 2. API引入与测试用户名字段

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
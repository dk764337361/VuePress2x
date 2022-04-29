# Vuex

## 什么是 Vuex？

- Vuex 是⼀个专为 Vue.js 应⽤程序开发的状态管理模式。
- Vuex ⽂档：https://vuex.vuejs.org/zh/

- Vuex 是专⻔为 Vue.js 设计的状态管理库
- 采⽤集中式的⽅式存储需要共享的数据
- 本质就是⼀个 JavaScript 库
- ⽤来解决复杂组件通信，数据共享的问题

简单来说，Vuex ⽤来统⼀存储需要在多个组件间共享的状态（数据），状态可以被任意组件操作，使组件通信变得易如反掌。

```
官⽅⽂档：
Vuex 可以帮助我们管理共享状态，并附带了更多的概念和框架。这需要对短期和⻓期效益进⾏权衡。如果您不打算开发⼤型单⻚应⽤，使⽤ Vuex 可能是繁琐冗余的。确实是如此——如果您的应⽤够简
单，您最好不要使⽤ Vuex。⼀个简单的 store 模式 (opens new window)就⾜够您所需了。但是，如果您需要构建⼀个中⼤型单⻚应⽤，您很可能会考虑如何更好地在组件外部管理状态，Vuex 将会成为
⾃然⽽然的选择。
```

## 如何判断是否需要使⽤ Vuex？

- 多个视图依赖于同⼀状态。
- 来⾃不同视图的⾏为需要变更同⼀状态。

## Vuex 的安装与引入

通过 npm 安装：

```sh
npm install vuex -S
```

::: tip 提示
使⽤ Vue CLI 创建项⽬时可以在项⽬选项中选择 Vuex，这时就⽆需单独安装了。
:::

## 使用

### 1. 创建 Vuex 实例 store

store 通常称为‘容器’。

```js
// store/index.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 创建⼀个 Vuex 容器实例，⽤来存储需要在组件中共享的状态
export default new Vuex.Store({
  state: {
    count: 0,
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
```

### 2. 在根 Vue 实例中引⼊ Vuex 作为插件。

```js
// src/main.js
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
```

### 3.通过 \$store 访问内部功能

通过 Vue.use() 引⼊ Vuex 后，Vuex 的功能被注⼊到根实例下的所有⼦组件中，可通过 \$store 访问内部功能。

我们的项⽬通过 Vue CLI 创建时选择了 Vuex，所以创建与引⼊已经被 Vue CLI ⾃动完成了。

## State

- 容器中的 state ⽤于存储需要在组件间共享的数据，特点如下：
  - 容器中的数据可以被任意组件访问。
  - 容器中的数据为响应式数据。

```js
// store/index.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    user: 100,
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
```

在浏览器中查看 Vue DevTools 的 Vuex 选项卡可以看到 Vuex 管理的状态。

<img src="/images/vue/311.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

在组件中通过 vm.\$store.state.状态名 访问。

```vue
// login/index.vue
<script>
...
methods: {
   async onSubmit () {
   console.log(this.$store.state.user)
   ...
   }
}
</script>
```

```vue
// src/views/advert/index.vue
<template>
  <div class="advert">广告管理 {{ $store.state.count }}</div>
</template>

<script>
export default {
  name: "AdvertIndex",
};
</>

<style lang="scss" scoped></style>
```

<video src="/videos/vuex.mp4" controls="controls" loop="loop" height="500"></video>

## Mutation（同步操作）

```
更改 Vuex 的 store 中的状态的唯⼀⽅法是提交 mutation。Vuex 中的 mutation ⾮常类
似于事件：每个 mutation 都有⼀个字符串的 事件类型 (type) 和 ⼀个 回调函数 (handler)。
这个回调函数就是我们实际进⾏状态更改的地⽅，并且它会接受 state 作为第⼀个参数：-
- 官⽅⽂档
```

### 参数一：commit()

简单来说，如果要修改 Vuex 中的 state，必须提前定义 Mutation 函数，需要时再进⾏ commit()提交（触发）。Mutation 接收 state 对象为第⼀个参数，⽤于操作 state 内的数据。

```js
// store/index.js
export default new Vuex.Store({
  state: {
    user: 100,
  },
  mutations: {
    setUser(state) {
      state.user++;
    },
  },
  actions: {},
  modules: {},
});
```

在组件中通过 vm.\$store.commit('Mutation 名称') 提交 Mutation，执⾏操作。

```js
 // login/index.vue
 methods: {
 async onSubmit () {
 console.log(this.$store.state.user)
 this.$store.commit('setUser')
 console.log(this.$store.state.user)
 ...
 }
 }
```

### 参数二：payload

Mutation 还接收 提交载荷（payload）作为第⼆个参数，指的是 commit() 传⼊的额外数据，常在需要根据上下⽂数据修改 state 时使⽤。

```js
 // store/index.js
 mutations: {
 setUser (state, payload) {
 state.user = payload
 }
 },
```

```js
 // login/index.vue
 methods: {
 async onSubmit () {
 this.$store.commit('setUser', '示例内容')
 ...
 }
 }
```

Mutation 的设置⽅式使 Vuex 的状态修改有迹可循，易于维护。假象⼀下，如果 state 可以通过赋值修改，⼀旦出错将⽆从下⼿。

除此以外，Vue DevTools 还提供了⽤于 Vuex 更⾼级的调试⽅式 Time Travel。

<img src="/images/vue/312.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

::: warning 注意
Mutation 必须为同步函数

由于 DevTools 提供了 Mutation ⽇志功能，为了确保功能正常，内部不能存在异步任务，否则 DelTools
将⽆法得知 Mutation 的准确调⽤顺序。如果需要进⾏异步操作，则需要使⽤ Vuex 的 Action。
:::

## Action（异步操作）

::: warning 注意
- Action 类似于 mutation，不同在于：
  - Action 提交的是 mutation，⽽不是直接变更状态。
  - Action 可以包含任意异步操作。
:::

### 参数一：context 对象

- Action 函数接受⼀个与 store 实例具有相同⽅法和属性的 context 对象，因此你可以调⽤ `context.commit` 提交⼀个 mutation。

```js
 // store/index.js
 actions: {
 addAction (context) {
 setTimeout(function () {
 context.commit('setUser')
 }, 1000)
 }
 },
```

### 参数二：payload

- Action 通过 vm.\$store.dispatch ⽅法触发，参数 1 为 action 名称，参数 2 为 payload.

```js
// login/index.vue
 methods: {
 async onSubmit () {
 this.$store.dispatch('addAction')
 ...
 }
 }
```

### 代码演示

```js
// store/index.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
  },
  getters: {},
  mutations: {
    jia(state, payload) {
      state.count = payload;
      // setTimeout(() => {
      //   state.count = payload.count
      // }, payload.delay)
    },
  },
  actions: {
    jiaHandle(context, payload) {
      setTimeout(() => {
        // context 与 store 功能完全相同
        context.commit("jia", payload.count);
      }, payload.delay);
    },
  },
  modules: {},
});
```

```vue{64-81}
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
        password: "qsryja",
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
      this.$store.dispatch("jiaHandle", { count: 5, delay: 2000 });
      this.$store.dispatch("jiaHandle", { count: 2, delay: 1000 });
      this.$store.dispatch("jiaHandle", { count: 1, delay: 500 });

      // this.$store.commit('jia', {
      //   count: 5,
      //   delay: 2000
      // })
      // this.$store.commit('jia', {
      //   count: 2,
      //   delay: 1000
      // })
      // this.$store.commit('jia', {
      //   count: 1,
      //   delay: 500
      // })
      try {
        // 1.设置校验成功后的功能（请求发送）
        await this.$refs.form.validate();
        this.isLoginLoading = true;
        // 2. 发送请求
        // const { data } = await request({
        //   methods: 'POST',
        //   // headers: { 'content-type': 'application/x-www-form-urlencoded' },
        //   url: '/font/user/login',
        //   // axios默认是发送JSON格式
        //   // 需要用第三方插件qs将JSON对象格式转换成urlencoded格式。urlencoded格式：名=值&名=值
        //   data: qs.stringify(this.form)
        // })

        const { data } = await login(this.form);
        this.isLoginLoading = false;

        // 3. 响应处理
        if (data.state === 1) {
          this.$router.push({
            name: "home",
          });
          this.$message.success("登录成功");
          // this.$message.success(data.message)
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

Vuex 核⼼概念还有 [Getter](https://vuex.vuejs.org/zh/guide/getters.html) 与 [Module](https://vuex.vuejs.org/zh/guide/modules.html) 功能，可通过⽂档学习。


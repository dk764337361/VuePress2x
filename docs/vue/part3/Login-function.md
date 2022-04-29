# 登录功能

## 页面布局

### 登录⻚主体为表单，使⽤ Element 的 Form 表单 即可。

- 由于使⽤了 ESLint，拷⻉组件配置对象时注意分号与函数名后的空格。
- 给密码的 `<el-input>` 设置 type="password" 。

```vue
// login/index.vue
<template>
  <div class="login">
    <!-- Form 组件 -->
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="⼿机号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">⽴即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "LoginIndex",
  data() {
    return {
      form: {
        name: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style lang="scss" scoped></style>
```

### 将表单域标签（label）的对⻬⽅式调整为顶部对⻬

```vue
// login/index.vue <el-form label-position="top" // 设置顶部对⻬ ref="form"
:model="form" label-width="80px" >
```

### 设置细节样式处理

```vue
// login/index.vue
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

## 登录功能-接口测试

演示 URL：http://eduboss.lagou.com/#/login

测试⼿机号：17201234567，密码：111111

- 数据绑定
- 表单验证
- 请求登录
- 请求结果处理（响应处理）
  - 成功
  - 失败

### 接口测试 1

登录接⼝：[地址](https://www.lagou.com/lagouhtml/a44.html#/edu-front-boot/%E7%94%A8%E6%88%B7%E6%8E%A5%E5%8F%A3/loginUsingPOST)

通过接⼝⽂档提供的测试功能（如有）进⾏测试。

- 登录成功：

<img src="/images/vue/292.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- 登录失败：
  <img src="/images/vue/293.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 接⼝测试⽅式 2

- Postman 是⼀款⽤于进⾏接⼝测试的⼯具。

  - 下载地址：https://www.postman.com/downloads/

- 登录成功

<img src="/images/vue/294.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- 登录失败

<img src="/images/vue/295.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

在书写功能时，如果经常需要操作某些接⼝，可以在 Postman 中创建集合，保存接⼝信息便于测试。

#### 新建集合：

<img src="/images/vue/296.jpg" style="width: 50%; display:block; margin: 0 ;">
<img src="/images/vue/297.jpg" style="width: 50%; display:block; margin: 0 ;">
<img src="/images/vue/298.jpg" style="width: 50%; display:block; margin: 0 ;">
<img src="/images/vue/299.jpg" style="width: 50%; display:block; margin: 0 ;">
<img src="/images/vue/300.jpg" style="width: 50%; display:block; margin: 0 ;">
<img src="/images/vue/301.jpg" style="width: 50%; display:block; margin: 0 ;">
<img src="/images/vue/302.jpg" style="width: 50%; display:block; margin: 0 ;">

- 以后需要时点击左侧列表中的某个接⼝进⾏测试即可。
  <img src="/images/vue/303.jpg" style="width: 50%; display:block; margin: 0 ;">

- 如果测试的接⼝都具有相同的基地址，可以给集合设置变量，简化书写。
  <img src="/images/vue/304.jpg" style="width: 50%; display:block; margin: 0 ;">
  <img src="/images/vue/305.jpg" style="width: 100%; display:block; margin: 0 ;">

- 在接⼝中通过 {{变量名}} 的⽅式使⽤；更新已有接⼝地址后，点击右侧 Save 保存更新。

<img src="/images/vue/306.jpg" style="width: 100%; display:block; margin: 0 ;">

## 登录功能-登录请求

### 1.准备⼯作，声明存储表单内容的数据

```js
// login/index.vue
<script>
export default {
name: 'LoginIndex',
data () {
return {
form: {
phone: '',
password: ''
}
 }
 }
 }
</script>
```

2. 绑定给⼿机号和密码输⼊框

```vue
// login/index.vue
<el-form-item label="⼿机号">
 <el-input v-model="form.phone"></el-input>
 </el-form-item>
<el-form-item label="密码">
 <el-input type="password" v-model="form.password"></el-input>
 </el-form-item>
```

测试是否绑定成功。

## 登录功能-表单验证

通过 Element 中 [Form 组件的表单验证功能](https://element.eleme.cn/#/zh-CN/component/form) 进⾏验证。
功能中需要使⽤的属性说明如下

- 需要给 `<el-form>` 绑定的属性：
  - model：绑定表单数据的对象。
  - rules：表单验证对象，内部的属性名对应要验证的 `<el-form-item>` 的 prop（属性设置为数组，内部可同时指定多条规则）。
    - required：是否必选
    - message：验证失败的提示信息
    - trigger：触发⽅式，传⼊事件名
    - max：最⼤⻓度
    - min：最⼩⻓度
    - pattern：验证的正则规则
- 给要进⾏验证的 `<el-form-item>` 设置的属性：
  - prop：对应 model 中的哪个属性

### 实现步骤

1. ⾸先在 data 中声明 rules 规则对象

```js
// login/index.vue
 data () {
   return
   { form: { phone: '', password: '' }, //规则对象
     rules: {}
   }
},
```

2. 给 `<el-form>` 设置属性，指定数据对象 form 与规则对象 rules。

```vue
 // login/index.vue
 <el-form
    label-position="top"
    :model="form"
    :rules="rules"
    label-width="80px"
 >
```

3. 给 `<el-form-item>` 设置 prop 指定名称。（注意设置为 `<el-form-item>` 的属性）

```vue
// login/index.vue
<el-form-item label="⼿机号" prop="phone">
 <el-input v-model="form.phone"></el-input>
 </el-form-item>
<el-form-item label="密码" prop="password">
 <el-input type="password" v-model="form.password"></el-input>
 </el-form-item>
```

4. 在 rules 中设置⼿机号和密码验证规则

```js
// login/index.vue
rules: { phone: [ { required: true, message: '请输⼊⼿机号',
trigger: 'blur' }, { pattern: /^1\d{10}$/, message: '请输⼊正确的⼿机号',
trigger:'blur' } ], password: [ { required: true, message: '请输⼊密码',
trigger: 'blur' }, { min: 6, max: 18, message: '密码⻓度为 6 到 18 个字符',
trigger: 'blur' } ] },
```

5. 验证设置完毕，但⽆论验证结果如何，请求都可以正常发送，应根据验证结果进⾏相应处理。在 onSubmit 中对表单校验结果进⾏判断

- 给 `<el-form>` 添加 ref 属性，以便在 onSubmit 中通过 this.\$refs 访问。

```vue
// login/index.vue <el-form label-position="top" ref="form" // 添加 ref
:model="form" :rules="rules" label-width="80px" >
```

- 通过 Form 组件的验证⽅法 validate() 进⾏处理。
  - ⽂档示例：传⼊回调处理

```js
// Element ⽂档示例：validate 传⼊回调函数的参数1为验证结果，布尔类型
this.$refs[formName].validate((valid) => {
  if (valid) {
    alert("submit!");
  } else {
    console.log("error submit!!");
    return false;
  }
})``;
```

6. 如果 validate() 不传⼊回调，则返回 promise，这时可以通过 await 处理。

```js
 async onSubmit () {
 // 1. 表单验证
 console.log(await this.$refs.form.validate())
 // 2. 请求
 ...
 }
```

测试后发现，通过检验结果为 true，未通过检验时会出现异常，通过 try..catch 处理即可。

- try 中设置常规代码
- catch 中可以设置验证失败提示，可选。

```js
async onSubmit () {
try {
// 1. 表单验证
await this.$refs.form.validate()
// 2. 请求
// 3. 响应处理
} catch (err) {
console.log('验证失败', err)
}
 }
```

### 代码演示

```vue
// login/index.vue
<template>
  <div class="login">
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
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "LoginIndex",
  data() {
    return {
      // 存储表单数据的对象
      form: {
        phone: "",
        password: "",
      },
      // 用于设置表单校验规则
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
    };
  },
  methods: {
    // 登录功能
    async onSubmit() {
      try {
        // 设置校验成功后的功能（请求发送）
        await this.$refs.form.validate();
        console.log("通过了校验");
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

## 登录功能-登录请求发送

### 实现步骤

1. 引⼊请求模块 request

```vue
import request from '@/utils/request'
```

2. 提交时发送请求：

- 通过 async 与 await 处理异步操作

```vue
// login/index.vue methods: { async onSubmit () { // 1. 表单验证 ... // 2. 请求
const { data } = await request({ method: 'POST', url: '/front/user/login', data:
{ phone: this.form.phone, password: this.form.password } }) console.log(data) //
3. 响应处理 }
```

3. 由于 axios 的请求参数默认为 application/json 格式，⽽接⼝需要 x-www-form-urlencoded 格式，导致请求参数处理失败。

<img src="/images/vue/307.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/308.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- 这时我们需要根据接⼝需要将 axios 的请求参数格式进⾏转换，操作⽅式可以在 [axios ⽂档](https://github.com/axios/axios#using-applicationx-www-form-urlencoded-format) 中查看。这⾥我们使⽤ qs 模块进⾏处理，⾸先通过 npm 安装 qs 模块。

```sh
npm i qs
```

4. 引⼊ qs 模块

```vue
// login/index.vue
<script>
import request from '@/utils/request'
import qs from 'qs'

...
</script>
```

5. 使⽤ qs 模块处理请求参数格式

```vue
// login/index.vue ... const { data } = await request({ method: 'POST', //
header 可省略，qs.stringify() 会⾃动设置 headers: { 'content-type':
'application/x-www-form-urlencoded' }, url: '/front/user/login', data:
qs.stringify(this.form) }) console.log(data) ...
```

6. 为了便于测试，将 data 中的数据默认设置为测试⼿机号和密码，简化操作（实际功能中不需要此步
   骤）。

```vue
// login/index.vue ... data () { return { form: { phone: '17201234567',
password: '111111' }, ... } }, ...
```

7. 保存，在浏览器中进⾏测试，请求参数格式设置正确，请求成功。

<img src="/images/vue/309.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/310.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 代码演示

```vue
<template>
  <div class="login">
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
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from "@/utils/request";
import qs from "qs";

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
    };
  },
  methods: {
    // 登录功能
    async onSubmit() {
      try {
        // 1.设置校验成功后的功能（请求发送）
        await this.$refs.form.validate();
        // console.log('通过了校验')
        console.log(qs.stringify(this.form));
        // 2. 发送请求
        request({
          methods: "POST",
          // headers: { 'content-type': 'application/x-www-form-urlencoded' },
          url: "/font/user/login",
          // axios默认是发送JSON格式
          // 需要用第三方插件qs将JSON对象格式转换成urlencoded格式。urlencoded格式：名=值&名=值
          data: qs.stringify(this.form),
        });
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

## 登录功能- 响应处理

### 实现步骤

1. 根据接⼝⽂档中提供的⾃定义状态码判断，除了 1 或 200 为成功（实际操作中 1 为成功），其余均为失
   败。

- 成功时跳转后台⾸⻚ /home
  - 使⽤ \$router.push() 编程式导航⽅法
- 失败时进⾏提示

```vue
// login/index.vue // 3. 响应处理 // 失败时提示 if (data.state !== 1) { return
alert(data.message) } // 成功时跳转到⾸⻚，使⽤ this.$router.push()
this.$router.push({ name: 'home' })
```

2. 通过 Element 的[message 消息提示](https://element.eleme.cn/#/zh-CN/component/message) 组件进⾏错误提示美化。

- Element 除了提供组件之外，还给 Vue 实例提供了⼀些⽅法，通过⽅法可以触发功能。
  - 这⾥使⽤ message 组件中的 $message.error() 与 $message.success() 。

```vue
// login/index.vue // 3. 响应处理 // 失败时提示 if (data.state !== 1) { //
return alert(data.message) return this.$message.error(data.message) } //
成功时跳转到⾸⻚，使⽤ this.$router.push() this.$router.push({ name: 'home' })
this.$message.success(data.message)
```

### 代码演示

```vue
<template>
  <div class="login">
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
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from "@/utils/request";
import qs from "qs";

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
    };
  },
  methods: {
    // 登录功能
    async onSubmit() {
      try {
        // 1.设置校验成功后的功能（请求发送）
        await this.$refs.form.validate();
        // console.log('通过了校验')
        // console.log(qs.stringify(this.form))
        // 2. 发送请求
        const { data } = await request({
          methods: "POST",
          // headers: { 'content-type': 'application/x-www-form-urlencoded' },
          url: "/font/user/login",
          // axios默认是发送JSON格式
          // 需要用第三方插件qs将JSON对象格式转换成urlencoded格式。urlencoded格式：名=值&名=值
          data: qs.stringify(this.form),
        });

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

### 登录功能-处理重复请求

- 当请求速度较慢时（⽹速慢），如果多次点击登录按钮会导致重复触发请求，⽆意义。
  - 在请求期间禁⽤登录按钮点击事件。
  - 通过 Element 中 Button 组件的加载中功能设置即可。

<video src="/videos/login-repeat-request.mp4" controls="controls" loop="loop" height="500"></video>

```
// Element ⽂档示例代码
<el-button type="primary" :loading="true">加载中</el-button>
```

1. 给登录按钮设置 :loading 属性，并绑定布尔值控制。

```vue
// login/index.vue
<el-button
  type="primary"
  :loading="isLoginLoading"
  @click="onSubmit">登录</el-button>
... data () { return { ... // 默认不处于加载中 isLoginLoading: false } }, ...
```

2. 请求开始时，设置 isLoginLoading 为 true，当响应完毕后，⽆论成功还是失败都要设置 isLoginLoading: false。

```vue
// login/index.vue ... async onSubmit () { // 1. 表单验证 // 2. 请求 //
设置按钮加载中 this.isLoginLoading = true const { data } = await request({...})
// 取消按钮加载中状态 this.isLoginLoading = false // 3. 响应处理 ... }
```

设置成功，进⾏测试。

### 代码演示

```vue
<template>
  <div class="login">
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
import request from "@/utils/request";
import qs from "qs";

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
        const { data } = await request({
          methods: "POST",
          // headers: { 'content-type': 'application/x-www-form-urlencoded' },
          url: "/boss/v2/api-docs?group=edu-boss-boot",
          // url: '/font/user/login',
          // axios默认是发送JSON格式
          // 需要用第三方插件qs将JSON对象格式转换成urlencoded格式。urlencoded格式：名=值&名=值
          data: qs.stringify(this.form),
        });
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

<img src="/images/vue/048.gif" style="width: 100%; display:inline-block; margin: 0 ;">

## 登录功能-封装请求方法

### 实现步骤

1. 在 services ⽬录下创建 user.js ，封装⽤户请求的功能模块。

- 对⽤户登录接⼝的请求进⾏封装：

```js
// services/user.js
import request from "@/utils/request";
import qs from "qs";
// 用户登录接口

export const login = (data) => {
  return request({
    methods: "POST",
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
    url: "/font/user/login",
    // axios默认是发送JSON格式
    // 需要用第三方插件qs将JSON对象格式转换成urlencoded格式。urlencoded格式：名=值&名=值
    data: qs.stringify(data),
  });
};
```

2. 在登录⻚⾯引⼊封装模块并调⽤⽅法。

```js{2-5,43-59}
// login/index.vue
<script>
// import request from '@/utils/request'
// import qs from 'qs'
// 引入封装的接口功能组件
import { login } from '@/services/user'

export default {
  name: 'LoginIndex',
  data () {
    return {
      // 存储表单数据的对象
      form: {
        phone: '17201234567',
        password: 'qsryja'
      },
      // 用于设置表单校验规则
      // 用于设置表单校验规则
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1\d{10}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 18,
            message: '密码长度为 6 到 18 位',
            trigger: 'blur'
          }
        ]
      },
      // 用于保存加载状态
      isLoginLoading: true
    }
  },
  methods: {
    // 登录功能
    async onSubmit () {
      try {
        // 1.设置校验成功后的功能（请求发送）
        await this.$refs.form.validate()
        this.isLoginLoading = true
        // 2. 发送请求
        // const { data } = await request({
        //   methods: 'POST',
        //   // headers: { 'content-type': 'application/x-www-form-urlencoded' },
        //   url: '/font/user/login',
        //   // axios默认是发送JSON格式
        //   // 需要用第三方插件qs将JSON对象格式转换成urlencoded格式。urlencoded格式：名=值&名=值
        //   data: qs.stringify(this.form)
        // })

        const { data } = await login(this.form)
        this.isLoginLoading = false

        // 3. 响应处理
        if (data.state === 1) {
          this.$router.push({
            name: 'home'
          })
          this.$message.success('登录成功')
          // this.$message.success(data.message)
        } else {
          this.$message.error('登录失败')
          // this.$message.error(data.message)
        }
      } catch (err) {
        // 设置校验失败后的功能（提示）
        console.log('没有通过校验')
      }
    }
  }
}
</script>
```

测试成功，以后将所有接⼝请求都封装在模块中即可。

### 代码演示

```vue
// login/index.vue
<template>
  <div class="login">
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
// import request from '@/utils/request'
// import qs from 'qs'
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

## 登录功能-身份认证简介

- 虽然完成了登录功能，但实际上现在的后台不登录也能访问（访问对应 URL），这种 "有⻔⽆墙" 的情况好像让我们实现的登录功能变得毫⽆意义。
- 为了让登录变得有意义：

1. 应当在⽤户登录成功后给⽤户⽣成⼀个标记（令牌），并将这个令牌保存起来。
2. 在⽤户访问任意需要登录的⻚⾯（组件）时都去验证令牌；
3. 从⽽识别⽤户是否登录或是否有权访问对应功能。

- a. 成功时，访问组件。
- b. 失败时，进⾏提示。
- 如何能够让 login 组件中的数据可以被任意其他组件访问呢？这时可以使⽤ Vue 官⽅的状态管理⼯具

### Vue官方插件：Vuex

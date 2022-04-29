# 接口处理

- 接⼝⽂档：
  - [edu-front-boot](http://eduboss.lagou.com/front/doc.html#/home)
  - [edu-boss-boot](http://eduboss.lagou.com/boss/doc.html#/home)

## 封装请求模块

1. 项⽬中我们需要通过接⼝进⾏数据请求，为了便于操作，我们要封装⽤于请求操作的函数。
   在 Vue.js 中通常搭配 Axios 进⾏ AJAX 请求操作，⾸先来安装 Axios。

```sh
npm install axios
```

2. 在 utils/ 中创建 request.js ⽂件作为请求功能模块，在⽂件中引⼊ Axios。

```js
// utils/request.js
// 引⼊ axios
import axios from "axios";

// axios.create() 可以使⽤⾃定义配置新建⼀个 axios 实例
const request = axios.create({});

export default request;
```

3. 观察发现接⼝的基地址有 2 个，每次请求接⼝书写完整地址较为繁琐。

```js
// App.vue
<script>
import request from '@/utils/request'
request({
method: 'GET',
// 某个后台接⼝ url
// url: 'http://eduboss.lagou.com/boss/v2/api-docs?group=edu-boss-boot'
// 某个前台接⼝ url
url: 'http://edufront.lagou.com/front/ad/getAdList'
 }).then(res => {
 console.log(res)
 })

 export default {
 name: 'App'
 }
 </script>
```

4. 这时可以给 request 设置拦截器来判断 url 前缀，再将对应基地址设置给 config.baseURL。

- axios 具有请求拦截器与响应拦截器，⽤于在请求与响应前进⾏提前处理。
- 请拦截器参数 config 为本次请求的相关配置信息，这⾥通过 baseURL 来修改请求的基地址。
- 操作完毕，最后⼀定要返回 config 让配置修改⽣效，否则请求⽆法发送成功。

```js
//utils/request.js
import axios from "axios";

// create 创建axios 实例
const request = axios.create({
  timeout: 2000,
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
  console.log(config);
  return config;
});

export default request;
```

5. 再次请求时前缀设置为 /boss 或 /front 即可。（测试后删除）

```vue
// App.vue
<template>
  <div id="app">
    <h1>拉钩教育</h1>
    <!-- 根路由出口 -->
    <router-view />
  </div>
</template>

<script>
import request from "@/utils/request";

request({
  method: "GET",
  // url: 'front/ad/getAdList'
  url: "/boss/v2/api-docs?group=edu-boss-boot",
}).then((res) => {
  console.log(res);
});
export default {
  name: "AppPage",
};
</script>
<style lang="scss" scoped></style>
```

<img src="/images/vue/291.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

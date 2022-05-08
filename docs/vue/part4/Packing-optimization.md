# 打包优化

项⽬功能制作完毕，⾸先通过打包命令进⾏打包。

```sh
npm run build
```

打包结果如下（此为示例，具体根据实际情况⽽定）。

<img src="/images/vue/419.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- 打包优化主要体现在两个⽅⾯，`打包过程优化`与`打包结果优化`。
- 打包过程优化指的是`打包速度`⽅⾯，例如减少项⽬中没有使⽤到的包，去除未使⽤的样式等。
- 打包结果优化指的是`打包后的⽂件体积`，例如压缩⽂件⼤⼩等。
- 当然，也有很多优化项既可以对过程优化，也可以对结果进⾏优化。

如果我们要对打包进⾏优化，就需要更改打包配置，由于 Vue CLI 是基于 webpack 构建的，打包配置其实就是配置 webpack。

## Vue CLI 配置⽂件

Vue CLI 内部包含了对 webpack 的默认配置，所以项⽬中⼤多数情况都⽆需进⾏配置处理。但如果要⼿动添加或修改配置，就需要在项⽬根⽬录下创建 `vue.config.js` 配置⽂件。
对于此⽂件的项⽬配置，Vue CLI 提供了详细的配置⽂档。

### productionSourceMap

当项⽬打包后，如果出现了代码错误，可以从控制台找到错误对应的源码位置，这是由于打包时⽣成了`.map` ⽂件，可以帮助定位错误信息。

⽤户不可能对我们的代码进⾏调试，所以 .map ⽂件就没有存在的意义了。这时设置 productionSourceMap 为 false，不仅可以不⽣成 .map ⽂件，同时会对源码加密，防⽌代码被盗⽤。

设置⽅式：

```js
// vue.config.js
module.exports = {
productionSourceMap: false,
...
}
```

- 以下为默认打包结果：
  - 在 dist/js ⽬录下可以看到 .map ⽂件。
  - 在浏览器中可以看到源码的信息以及报错的具体信息。

<img src="/images/vue/420.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
<img src="/images/vue/421.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- 以下为设置了 productionSourceMap : false 后的打包结果：
  - dist/js ⽬录下只存在 .js ⽂件。
  - 浏览器中⽆法查看源代码内容以及报错的具体信息。

<img src="/images/vue/422.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
<img src="/images/vue/423.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### css.extract

打包时，css 默认会打包为独⽴⽂件，这样会增加⻚⾯的请求数量，由于项⽬单个⻚⾯组件的 css 体积通常不是很⼤，可以设置为⾏内引⼊⽅式，以减少⽹⻚请求次数。

设置⽅式：

```js
// vue.config.js
module.exports = {
css: {
extract: false
},
...
}
```

- 未设置时的打包结果：
  - css 打包为单独⽂件

<img src="/images/vue/424.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

- 设置后的打包结果：
  - css 不再单独打包，⽽是打包到 js ⽂件内部，最终会以内嵌式引⼊到⻚⾯中。

<img src="/images/vue/425.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

### 图⽚压缩

图⽚压缩会在⼀定程度上影响图⽚的质量，使⽤时根据具体场景选择是否使⽤。

#### 安装

需要使⽤ `image-webpack-loader` ⾸先进⾏安装：

```sh
npm install image-webpack-loader -D
```

::: warning 注意
由于此 loader 内部依赖的⽂件并未全部处于 npm 中，所以安装此 loader 时可能出现失败的情况。需要在安装前进⾏以下配置
:::

1. 修改 hosts文件（C:\WINDOWS\system32\drivers\etc），添加以下内容

```sh
# windows 系统下 hosts ⽂件位置：C:\Windows\System32\drivers\etc\hosts
# GitHub Start =================================================================
52.74.223.119 github.com
192.30.255.116 api.github.com
140.82.112.25 live.github.com
8.7.198.45 gist.github.com
192.0.66.2 github.blog
185.199.108.154 github.githubassets.com
50.17.56.103collector.githubapp.com
52.217.67.172 github-cloud.s3.amazonaws.com
140.82.114.22 central.github.com
199.232.96.133 raw.githubusercontent.com
199.232.96.133 user-images.githubusercontent.com
199.232.96.133 desktop.githubusercontent.com
199.232.96.133 camo.githubusercontent.com
199.232.96.133 avatars.githubusercontent.com
199.232.96.133 avatars0.githubusercontent.com
199.232.96.133 avatars1.githubusercontent.com
199.232.96.133 avatars2.githubusercontent.com
199.232.96.133 avatars3.githubusercontent.com
199.232.96.133 avatars4.githubusercontent.com
199.232.96.133 avatars5.githubusercontent.com
199.232.96.133 avatars6.githubusercontent.com
199.232.96.133 avatars7.githubusercontent.com
199.232.96.133 avatars8.githubusercontent.com
199.232.96.133 avatars9.githubusercontent.com
199.232.96.133 avatars10.githubusercontent.com
199.232.96.133 avatars11.githubusercontent.com
199.232.96.133 avatars12.githubusercontent.com
199.232.96.133 avatars13.githubusercontent.com
199.232.96.133 avatars14.githubusercontent.com
199.232.96.133 avatars15.githubusercontent.com
199.232.96.133 avatars16.githubusercontent.com
199.232.96.133 avatars17.githubusercontent.com
199.232.96.133 avatars18.githubusercontent.com
199.232.96.133 avatars19.githubusercontent.com
199.232.96.133 avatars20.githubusercontent.com
# GitHub End ===================================================================
```

2. 修改 .npmrc，添加以下内容，如果没有此⽂件可⾃定创建。

```
 # windows 系统下 .npmrc ⽂件位置：c:\Users\你的名字\.npmrc

 sharp_binary_host = https://npm.taobao.org/mirrors/sharp
 sharp_libvips_binary_host = https://npm.taobao.org/mirrors/sharplibvips
 profiler_binary_host_mirror = https://npm.taobao.org/mirrors/node-inspector/
 fse_binary_host_mirror = https://npm.taobao.org/mirrors/fsevents
 node_sqlite3_binary_host_mirror = https://npm.taobao.org/mirrors
 sqlite3_binary_host_mirror = https://npm.taobao.org/mirrors
 sqlite3_binary_site = https://npm.taobao.org/mirrors/sqlite3
 sass_binary_site = https://npm.taobao.org/mirrors/node-sass
 electron_mirror = https://npm.taobao.org/mirrors/electron/
 puppeteer_download_host = https://npm.taobao.org/mirrors
 chromedriver_cdnurl = https://npm.taobao.org/mirrors/chromedriver
 operadriver_cdnurl = https://npm.taobao.org/mirrors/operadriver
 phantomjs_cdnurl = https://npm.taobao.org/mirrors/phantomjs
 python_mirror = https://npm.taobao.org/mirrors/python
 registry = https://registry.npm.taobao.org/
 disturl = https://npm.taobao.org/dist
 //registry.npmjs.org/:_authToken=43331cb5-0c98-4e1c-8585-a2f8eb9db797
```

如果安装失败，则必须删除项⽬中的 node_modules 再重新安装依赖。

#### 配置

在 vue.config.js 中设置以下配置信息，⽤来对 webpack 进⾏ loader 配置。

```js
// vue.config.js
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  css: {
    extract: false
  },
  // 图⽚压缩 loader 配置
  chainWebpack: config => {
  // 配置图⽚压缩
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true
      })
      .end()
  }
})

```

## Vant 组件⾃动按需引⼊组件

官⽅介绍中说到，引⼊所有组件会增加代码包的体积，不推荐整体引⼊。

⾃动按需引⼊需要使⽤ babel 的插件 babel-plugin-import，这个插件会在编译过程中将 import 写法⾃动转换为按需引⼊⽅式。

⾸先安装插件：

```sh
npm install babel-plugin-import -D
```

- 在 bable.config.js 中添加配置：
  - ⽂档要求在 .babelrc 中设置，.babelrc 与 bable.config.js ⽂件作⽤相同，⼀般有 bable.config.js就不⽤ .babelrc 了。

```sh
 // 在.babelrc 中添加配置
 // 注意：webpack 1 ⽆需设置 libraryDirectory
 {
 "plugins": [
 ["import", {
 "libraryName": "vant",
 "libraryDirectory": "es",
 "style": true
 }]
 ]
 }
```

在任意组件中按以下⽅式引⼊ Vant 组件，插件会在编译时⾃动转换为按需引⼊（引⼊ JS 与 CSS）形式。

```js
import { Button } from 'vant'
...
components: {
Button
}
```

Toast 这种需要进⾏⽅法调⽤的组件需要在引⼊后将 this.$toast() 更换为 Toast()。

```js
// pay/index.vue 示例
import { ..., Toast } from 'vant'
...
// this.$toast.success('购买成功！')
Toast.success('购买成功！')
```

同时，main.js 中的整体引⼊就可以去除了。

```js
// main.js
- import Vant from 'vant'
- import 'vant/lib/index.css'
- Vue.use(Vant)
```

- 具体修改内容⻅示例代码，打包结果如下。
  - 从数值中可以看出，体积明显减⼩。

<img src="/images/vue/426.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

### 错误说明

`如果`出现以下类似的报错，说明在`不同组件`中进⾏`相同⼦组件引⼊`（包括 Vant 组件）的顺序不同，

例如A 组件内先引组件 X 后引⼊组件 Y，B 组件内先引组件 Y 后引⼊组件 X，当 Webpack 将这些代码`打包到同⼀个⽂件中`时，就会⽆法处理从⽽导致 webpack 的 mini-css-extract-plugin 插件报错。`调整引⼊顺序即可`。

报错示意图如下：

<img src="/images/vue/427.jpg" style="width: 50%; display:inline-block; margin: 0 ;">


## CDN介绍

::: tip 提示
CDN 的全称是 Content Delivery Network，即内容分发⽹络。CDN是构建在现有⽹络基础之上的智能虚拟⽹络，依靠部署在各地的边缘服务器，通过中⼼平台的负载均衡、内容分发、调度等功能模块，使⽤户就近获取所需内容，降低⽹络拥塞，提⾼⽤户访问响应速度和命中率。CDN的关键技术主要有内容存储和分发技术。
:::

总的来说，CDN 可以将`源站内容分发⾄最接近⽤户的节点`，使⽤户可就近取得所需内容，提⾼⽤户访问的响应速度和成功率。

其实在我们以前使⽤过的框架与库的安装⻚⾯中都看到过 CDN 的安装⽅式。

- [CDN 安装 Vant](https://vant-contrib.gitee.io/vant/#/zh-CN/quickstart#tong-guo-cdn-an-zhuang)
- [CDN 安装 Vue.js](https://cn.vuejs.org/v2/guide/installation.html#CDN)
- [CDN 安装 jQuery](https://cdnjs.com/libraries/jquery)
- ...

也有免费的前端开源项⽬项⽬ CDN 加速服务，如 [BootCDN](https://www.bootcdn.cn/)。

也可以把我们⾃⼰的代码放到 CDN 上，但需要收费，如[阿⾥云 CDN 全站加速服务](https://common-buy.aliyun.com/?spm=5176.7933777.J_1398157.3.4ff4163dDGZ92r&commodityCode=dcdnpaybag#/buy)。

我们最好把项⽬中⽐较⼤的第三⽅包都使⽤ CDN 链接

- 提⾼项⽬的构建速度（打包过程优化）
- 提⾼⻚⾯的响应速度（打包结果优化）

将项⽬中的第三⽅包通过 CDN ⽅式安装，可以减少打包⽂件的体积、提⾼打包速度，还可以让⻚⾯响应速度更快，⼀举多得。

## 通过 CDN ⽅式安装 Vue / Vant

在 public/index.html 中通过 CDN 的⽅式引⼊ Vue、Vant，这样就⽆需在 main.js 中进⾏引⼊了。

当我们在项⽬中使⽤ CDN 链接之后，就没必要下载打包第三⽅包了

```html
 // public/index.html
 <!DOCTYPE html>
 <html lang="">
 <head>
 ...
 <!-- Vant 样式 -->
 <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vant@2.12/lib/index.css" />
 </head>
 <body>
 ...
 <!-- 引⼊ Vue -->
 <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
 <!-- 引⼊ Vant -->
 <script src="https://cdn.jsdelivr.net/npm/vant@2.12/lib/vant.min.js"></script>
 ...
 </body>
 </html>    
```

```js
 // vue.config.js
 module.exports = {
 ...
 configureWebpack: {
 // 通过 CDN 引⼊
 externals: {
 'vue': 'Vue',
 'vant': 'vant'
 }
 }
 }
```

npm 安装⽅式打包结果：

<img src="/images/vue/428.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

将 Vue 与 Vant 更改为 CDN 安装⽅式的打包结果：

<img src="/images/vue/429.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

对⽐后可以看出，打包体积有了明显变化。

这⾥演示的仅为 Vue 与 Vant 的 CDN 引⼊⽅式，其他⼯具也可以如此操作，但通常我们只会将`体积⽐较⼤`的第三⽅⽂件进⾏ CDN 引⼊，⽽不会将所有包都设置为这种⽅式（⽂件数多，⾸次的请求数也会变多）。
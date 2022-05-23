# 首页功能

## 设计图分解

## 顶部导航区域

### 创建

```
src
├─ views
   ├─ Home
      ├─ componeents
      │  ├─ HomeMain.vue  (新建)
      │  └─ HomeNav.vue   (新建)
      └─ index.vue    (修改)
```

1. 修改 index.vue

```vue
<!-- src\views\Home\index.vue -->

<template>
  <!-- 顶部导航 -->
  <home-nav />
  <!-- 主体区域 -->
  <home-main />
  <!-- 公共底部 -->
  <layout-footer />
</template>

<script setup>
import HomeNav from './componeents/HomeNav.vue'
import HomeMain from './componeents/HomeMain.vue'
import LayoutFooter from '@/components/LayoutFooter.vue'
</script>

<style lang="scss" scoped>
......
</style>
```

2. 新增 HomeNav.vue 内容

```vue
<!--
 * HomeNav.vue
-->
<template>
  <div class="home-nav">
    <!-- logo区域 -->
    <img height="20" src="@/assets/logo.png" alt="" />
    <!-- 搜索区域 -->
    <div class="search">
      <van-icon name="search" size="0.5rem" />
    </div>
    <!-- 分类跳转 -->
    <van-icon name="wap-nav" />
  </div>
</template>

<script setup>
import {} from 'vue'
</script>

<style lang="scss" scoped>
.home-nav {
  position: fixed;
  width: 100%;
  height: 50px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding-right: 10px;
  box-sizing: border-box;

  img {
    padding: 0 10px;
  }

  .search {
    background-color: #f7f7f7;
    width: 100%;
    border-radius: 25px;
    padding-left: 12px;
    margin-right: 10px;
  }
}
</style>
```

<img src="/images/vue/461.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

## 主体内容组件

### 基础布局

1. 给 HomeMain 加 class （在组件外部设置样式，方便日后修改，在组建内部写也可以）

```vue
<!-- src\views\Home\index.vue -->

<template>
  <!-- ...... -->
  <!-- 主体区域 -->
  <home-main class="home-main" />
  <!-- ...... -->
</template>

<script setup>
// ......
import HomeMain from './componeents/HomeMain.vue'
</script>

<style lang="scss" scoped>
// ......
.home-main {
  background-color: #f7f7f7;
}
</style>
```

1. 新增 HomeMain.vue 内容

```vue
<!--
 * Main.vue
-->
<template>
  <div class="home-main">
    home的主体区域
  </div>
</template>

<script setup>
import {} from 'vue'
</script>

<style lang="scss" scoped>
.home-main {
  //测试滚动条
  height: 1500px;
}
</style>
```

<img src="/images/vue/100.gif" style="width: 50%; display:inline-block; margin: 0 ;">

- 此时内容被顶部导航遮住，设置上下 padding
  <!-- ，高度导致滚动条在整个页面滚动，需要设置滚动条在内容区域滚动 -->

```vue
<!-- src\views\Home\index.vue -->

<style lang="scss" scoped>
...... .home-main {
  ......//滚动条在内部区域滚动padding: 50px 0;
}
</style>
```

<img src="/images/vue/462.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

### 轮播区域

#### 基础布局

##### 介绍官方示例和需要使用的属性

- Vant 的[Swipe 轮播示例](https://youzan.github.io/vant/#/zh-CN/swipe)

```
<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
  <van-swipe-item>1</van-swipe-item>
  <van-swipe-item>2</van-swipe-item>
  <van-swipe-item>3</van-swipe-item>
  <van-swipe-item>4</van-swipe-item>
</van-swipe>

<style>
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
</style>
```

#### 修改 HomeMain.vue

```vue
<!--
 * HomeMain.vue
-->
<template>
  <div class="home-main">
    <!-- 区域一：轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.home-main {
  // 区域一：轮播图
  .my-swipe img {
    width: 100%;
  }
}
</style>
```

<img src="/images/vue/101.gif" style="width: 50%; display:inline-block; margin: 0 ;">

### 请求后台数据

1. 新建 index.js

```
src
├─ api
   └─ index.js  (新建)
```

```js
// src\api\index.js

import request from '@/utils/request'
//  请求首页数据
export const getDefaultData = () =>
  request({
    method: 'Get',
    url: '/v2/diy/get_diy/moren',
  })
```

2. 在 HomeMain.vue 里请求数据

```js
// src\views\Home\componeents\HomeMain.vue

......

<script setup>
import { getDefaultData } from '@/api/index'

// 封装首页数据初始化功能
const initIndexData = async () => {
  const { data } = await getDefaultData()
  // console.log(data)
  if (data.status !== 200) return
}
initIndexData()
</script>
```

3. HomeMain.vue 里设置响应式数据

```js
// src\views\Home\componeents\HomeMain.vue

<script setup>
// 引入ref API
import { ref } from 'vue'
import { getDefaultData } from '@/api/index'

// 存储首页的所有数据（声明响应式数据）
const indexData = ref({})

// 封装首页数据初始化功能
const initIndexData = async () => {
  const { data } = await getDefaultData()
  // console.log(data)
  if (data.status !== 200) return
  indexData.value = data.data
}
initIndexData()
</script>
```

此时可以在 Vue tools 看到数据

<img src="/images/vue/463.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

#### 数据处理

1. 通过`计算属性`将整体数据进行分割，避免取数据麻烦

```js
// src\views\Home\componeents\HomeMain.vue

<script setup>
import { ref, computed } from 'vue'

import { getDefaultData } from '@/api/index'

// 存储首页的所有数据（声明响应式数据）
const indexData = ref({})

// 封装首页数据初始化功能
const initIndexData = async () => {
  const { data } = await getDefaultData()
  // console.log(data)
  if (data.status !== 200) return
  indexData.value = data.data
}
initIndexData()

// 通过计算属性保存需要使用的数据
// 1. 轮播图数据
const swipeData = computed(() => {
  return indexData.value.swiperBg.default.imgList.list
})

</script>
```

2. 计算属性内部无法正常读取对象属性而抛出报错

```
<!-- 控制台报错 -->
HomeMain.vue:43

    Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'default')
 at ReactiveEffect.fn (HomeMain.vue:43:35)
 at ReactiveEffect.run (reactivity.esm-bundler.js:185:25)
 at ComputedRefImpl.get value [as value] (reactivity.esm-bundler.js:1126:39)
 at unref (reactivity.esm-bundler.js:1034:29)
 at Object.get (reactivity.esm-bundler.js:1037:37)
 at HomeMain.vue:13:33
 at Proxy.renderFnWithContext (runtime-core.esm-bundler.js:852:21)
 at Proxy.<anonymous> (Swipe.js:346:54)
 at renderComponentRoot (runtime-core.esm-bundler.js:895:44)
 at ReactiveEffect.componentUpdateFn [as fn] (runtime-core.esm-bundler.js:5059:57)
```

此时控制台报错，原因是 swipeData 早于`initIndexData()`（异步操作）执行，所以此时`indexData`是空值

可通过 [?.可选链操作符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Optional_chaining#try_it)处理：如果前面对象里没有值，整个表达式原地返回 unndefined 或 null

```js
// src\views\Home\componeents\HomeMain.vue

......
const swipeData = computed(() => indexData.value.swiperBg?.default.imgList.list)
```

<img src="/images/vue/102.gif" style="width: 50%; display:inline-block; margin: 0 ;">

### 菜单列表

#### 官方组件示例和需要使用的属性

1. 官方[Grid 组件示例](https://youzan.github.io/vant/#/zh-CN/grid)

```vue
<van-grid>
  <van-grid-item icon="photo-o" text="文字" />
  <van-grid-item icon="photo-o" text="文字" />
  <van-grid-item icon="photo-o" text="文字" />
  <van-grid-item icon="photo-o" text="文字" />
</van-grid>
```

2. 使用 Grid 组件[icon 属性的图片链接](https://youzan.github.io/vant/#/zh-CN/tabbar#tabbaritem-props)

GridItem Props:
| 参数 | 说明 | 类型 | 默认值 |
| ---- | ------------------------------------------------------ | ------ | ------ |
| icon | 图标名称或图片链接，等同于 Icon 组件的 [name 属性](https://youzan.github.io/vant/#/zh-CN/icon#props) | string | - |

3. 使用 Grid 组件[icon-size 属性](https://youzan.github.io/vant/#/zh-CN/grid#grid-props)

Grid Props:
| 参数 | 说明 | 类型 | 默认值 |
| ---- | ------------------------------------------------------ | ------ | ------ |
| icon-size |图标大小，默认单位为 px | number | string | 28px |

#### 修改 HomeMain.vue

```vue
<!--
 * HomeMain.vue
-->
<template>
  <div class="home-main">
    ......
    <!-- 区域二：菜单列表 -->
    <van-grid icon-size="40">
      <van-grid-item
        v-for="(item, index) in menuData"
        :key="index"
        :icon="item.img"
        :text="item.info[0].value"
      />
    </van-grid>
  </div>
</template>

<script setup>
......
// 2. 菜单列表数据
const menuData = computed(() => indexData.value.menus?.default.imgList.list)
</script>
......
```

### 公告区域

#### 官方组件示例和需要使用的属性

- NoticeBar 通知栏-官方示例

```vue
<van-notice-bar left-icon="volume-o" :scrollable="false">
  <van-swipe
    vertical
    class="notice-swipe"
    :autoplay="3000"
    :show-indicators="false"
  >
    <van-swipe-item>明月直入，无心可猜。</van-swipe-item>
    <van-swipe-item>仙人抚我顶，结发受长生。</van-swipe-item>
    <van-swipe-item>今人不见古时月，今月曾经照古人。</van-swipe-item>
  </van-swipe>
</van-notice-bar>

<style>
.notice-swipe {
  height: 40px;
  line-height: 40px;
}
</style>
```

#### 基础布局

- 修改 HomeMain.vue

```vue
<!-- src\views\Home\componeents\HomeMain.vue -->
......
<!-- 区域三：公告栏 -->
<van-notice-bar left-icon="fire-o" :scrollable="false">
      <span>热点资讯公告：</span>
      <van-swipe
        vertical
        class="notice-swipe"
        :autoplay="3000"
        :show-indicators="false"
      >
        <van-swipe-item>明月直入，无心可猜。</van-swipe-item>
        <van-swipe-item>仙人抚我顶，结发受长生。</van-swipe-item>
        <van-swipe-item>今人不见古时月，今月曾经照古人。</van-swipe-item>
      </van-swipe>
    </van-notice-bar>

<style lang="scss" scoped>
......
// 区域三：公告区域
// - Vue3样式穿透:deep()
:deep(.van-notice-bar__content) {
  display: flex;
  align-items: center;
}

.notice-swipe {
  height: 40px;
  line-height: 40px;
}
</style>
```

::: warning 注意
Vue2 的样式穿透写法是：`v-deep`，Vue3 的样式穿透写法是：`:deep()`
:::

#### 请求数据与数据处理

```vue
<!-- src\views\Home\componeents\HomeMain.vue -->

<template>
  <div class="home-main">
    ......
    <!-- 区域三：公告栏 -->
    <van-notice-bar left-icon="fire-o" :scrollable="false">
      <span>热点资讯公告：</span>
      <van-swipe
        vertical
        class="notice-swipe"
        :autoplay="3000"
        :show-indicators="false"
      >
        <van-swipe-item
          v-for="(item, index) in newsData"
          :key="index"
          v-text="item.chiild[0].val"
        />
      </van-swipe>
    </van-notice-bar>
  </div>
</template>

<script setup>
......
// 3. 公告栏数据
const newsData = computed(() => indexData.value.news?.default.newList.list)
</script>
......
```

<img src="/images/vue/465.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 商品列表

由于商品列表的页面布局和分类、推荐、收藏列表一样，所以把`商品列表`封装到公共组件文件夹

```
src
├─ components
   ├─ ......
   └─ ProductList.vue   (新建)
```

#### 官方组件示例和需要使用的属性

1. Grid 宫格组件

```
<van-grid>
  <van-grid-item icon="photo-o" text="文字" />
  <van-grid-item icon="photo-o" text="文字" />
  <van-grid-item icon="photo-o" text="文字" />
  <van-grid-item icon="photo-o" text="文字" />
</van-grid>
```

2. Grid 宫格组件 的[自定义列数 column-num](https://youzan.github.io/vant/#/zh-CN/grid#zi-ding-yi-lie-shu)

#### ProductList.vue 添加测试数据

```vue
<!--
 * ProDuctList.vue
-->
<template>
  <van-grid class="product-list" :column-num="2">
    <van-grid-item icon="photo-o" text="文字" />
    <van-grid-item icon="photo-o" text="文字" />
    <van-grid-item icon="photo-o" text="文字" />
    <van-grid-item icon="photo-o" text="文字" />
    <van-grid-item icon="photo-o" text="文字" />
    <van-grid-item icon="photo-o" text="文字" />
  </van-grid>
</template>

<script setup></script>

<style lang="scss" scoped></style>
```

#### 导入到 HomeMain.vue

```vue
<!-- 区域四：商品列表 -->
<product-list />
import ProductList from '@/components/ProductList.vue'
```

#### 出现问题

<img src="/images/vue/103.gif" style="width: 50%; display:inline-block; margin: 0 ;">

::: warning 原因
此时主体区域内容遮住了 nav 导航，原因是主体区域的轮播图是`后面的（相对）定位`压盖前面`nav的（固定）`定位
:::

<img src="/images/vue/466.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

#### 修复问题

```vue
<style lang="scss" scoped>
.home-nav {
  // ......
  z-index: 1000;
}
</style>
```

#### ProductList.vue 添加测试数据

```vue
<!--
 * ProDuctList.vue
-->
<template>
  <van-grid class="product-list" :column-num="2" :gutter="10">
    <van-grid-item v-for="item in 8" :key="item">
      <!-- 商品图 -->
      <van-image
        src="https://consumer.huawei.com/content/dam/huawei-cbg-site/greate-china/cn/mkt/pdp/phones/p50-pro/images/new/kv@2x.webp"
      />
      <!-- 商品标题 -->
      <p class="title">
        重心偏移设计，锋锐纤薄机身 | 8:7.1 折叠屏黄金显示比例，沉浸纯粹 | 麒麟
        9000 芯片，震撼体验
      </p>
      <!-- 商品价格 -->
      <p class="price">
        ￥3999.9
      </p>
      <!-- 商品销量 -->
      <p class="sales">
        已售19件
      </p>
    </van-grid-item>
  </van-grid>
</template>

<script setup>
import {} from 'vue'
</script>

<style lang="scss" scoped>
.product-list {
  margin: 10px 0;

  :deep(.van-grid-item) {
    border-radius: 10px;
  }
}
</style>
```

#### 出现问题

圆角属性设置了，但不见圆角。

原因是被.van-grid-item 内容区域的背景色遮盖了

<img src="/images/vue/467.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/468.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```vue
<!--
 * ProDuctList.vue
-->
<script setup>
import {} from 'vue'
</script>

<style lang="scss" scoped>
.product-list {
  // ...
  :deep(.van-grid-item__content) {
    // ...
    overflow: hidden;
  }
}
</style>
```

#### 设置宫格之间的间距

需要用到 Grid 的[gutter 属性](https://youzan.github.io/vant/#/zh-CN/grid#grid-props)

| 参数   | 说明                          | 类型                | 默认值 |
| ------ | ----------------------------- | ------------------- | ------ |
| gutter | 格子之间的间距，默认单位为 px | number \| string \| | -      |

```vue
<!--
 * ProDuctList.vue
-->
<template>
  <van-grid
  ...
    :gutter="10"
  >
</template>
```

#### 使宫格内容贴边

需要用到 Grid 的[center 属性](https://youzan.github.io/vant/#/zh-CN/grid#grid-props)

| 参数   | 说明                   | 类型    | 默认值 |
| ------ | ---------------------- | ------- | ------ |
| center | 是否将格子内容居中显示 | boolean | true   |
| border | 是否显示边框           | boolean | true   |

```vue
<!--
 * ProDuctList.vue
-->
<template>
  <!-- 不需要居中显示，关闭即可，同时关闭边框显示 -->
  <van-grid
......
    :center="false"
    :border="false"
  >
</template>
<script setup>
import {} from 'vue'
</script>

<style lang="scss" scoped>
.product-list {
  // ...
  :deep(.van-grid-item__content) {
    // ...
    //同时格式化内部padding，使内容贴边
    padding: 0;
    // 给底部留有空间
    margin-bottom: 10px;
  }
}
</style>
```

#### 标题、价格、销量的样式

```vue
<!--
 * ProDuctList.vue
-->
<script setup>
import {} from 'vue'
</script>

<style lang="scss" scoped>
.product-list {
  // ...
  :deep(.van-grid-item__content) {
    // ...
    //标题
    .title {
      font-size: 14px;
      padding: 5px 8px 0;
      // 给文字设置省略号
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    // 价格
    .price {
      color: #ee3e3e;
      font-size: 22px;
      font-weight: 700;
      padding-left: 6px;
    }
    // 销量
    .sales {
      color: #ccc;
      font-size: 14px;
      padding-left: 8px;
    }
  }
}
</style>
```

#### 请求处理

```
src
├─ api
   ├─ ......
   └─ product.js  (新建)
```

```js
import request from '@/utils/request'

//  请求首页数据
export const getProductsData = (params) =>
  request({
    method: 'Get',
    url: '/products',
    params,
  })
```

##### 引入到 HomeMain.vue

```vue
<!-- HomeMain.vue -->

<template>
  <!-- 区域四：商品列表 -->
  <product-list :products-data="productsData" />
</template>

<script setup>
// ......
import { getProductsData } from '@/api/product'

// --------------商品功能--------------------
const productsData = ref([])
let page = 1
// 请求指定页的商品数据
const initProductsData = async () => {
  const { data } = await getProductsData({
    limit: 4,
    page,
  })
  if (data.status !== 200) return
  // 请求每次得到的是新一段数据，需要将新数据添加到productsData中
  productsData.value.push(...data.data)
  // 变更页数，准备下次数据请求
  page++
}
initProductsData()
</script>
```

#### 数据处理

##### ProductList.vue 做数据接收

```vue
<!--
 * ProDuctList.vue
-->
<template>
  <!-- 不需要居中显示，关闭即可，同时关闭边框显示 -->
  <van-grid
    class="product-list"
    :column-num="2"
    :gutter="10"
    :center="false"
    :border="false"
  >
    <van-grid-item v-for="item in productsData" :key="item.id">
      <!-- 商品图 -->
      <van-image :src="item.image" height="165" />
      <!-- 商品标题 -->
      <p class="title" v-text="item.store_name" />
      <!-- 商品价格 -->
      <p class="price">￥{{ item.price }}</p>
      <!-- 商品销量 -->
      <p class="sales">已售{{ item.sales }}件</p>
    </van-grid-item>
  </van-grid>
</template>

<script setup>
// 接收父组件传递的数据，并进行结构使用
const { productsData } = defineProps({
  productsData: {
    type: Array,
    required: true,
  },
})
</script>
```

### 设置触底加载功能

- 在 HomeMain.vue 设置触底加载功能

1. List 列表 官方示例

```vue
<van-list
  v-model:loading="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <van-cell v-for="item in list" :key="item" :title="item" />
</van-list>
```

```js
import { ref } from 'vue'

export default {
  setup() {
    const list = ref([])
    const loading = ref(false)
    const finished = ref(false)

    const onLoad = () => {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          list.value.push(list.value.length + 1)
        }

        // 加载状态结束
        loading.value = false

        // 数据全部加载完成
        if (list.value.length >= 40) {
          finished.value = true
        }
      }, 1000)
    }

    return {
      list,
      onLoad,
      loading,
      finished,
    }
  },
}
```

#### 修改 HomeMain.vue

```vue
<!-- HomeMain.vue -->

......
<!-- 区域四：商品列表 -->
<!-- 用van-list组件 把 product-list 组件包裹起来 -->
<van-list
  v-model:loading="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="initProductsData"
>
  <product-list :products-data="productsData" />
</van-list>
<script>
// --------------商品功能--------------------
const productsData = ref([])
// 引入van-list组件的JS参数
const loading = ref(false)
const finished = ref(false)

let page = 1
//自定义每次请求个数
let limit = 4
// 请求指定页的商品数据
const initProductsData = async () => {
  const { data } = await getProductsData({
    limit,
    page,
  })
  if (data.status !== 200) return
  // 请求每次得到的是新一段数据，需要将新数据添加到productsData中
  productsData.value.push(...data.data)

  // 1. 将本次加载状态更改为完成
  loading.value = false
  // console.log(data.data)
  // console.log(data.data.length)

  // 2. 判断是否已经加载完全部数据
  // - 每次加载加载的数据长度为4，最后一次到底了，数据为长度0。
  if (data.data.length < limit) {
    finished.value = true
    return
  }

  // 变更页数，准备下次数据请求
  page++
}
// 使用List组件后，会根据触底情况加载首屏一级后续数据
// initProductsData()
</script>
```

### 下拉刷新

使用[List 组件的下拉刷新](https://youzan.github.io/vant/#/zh-CN/list#xia-la-shua-xin)

```vue
<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell v-for="item in list" :key="item" :title="item" />
  </van-list>
</van-pull-refresh>
```

```js
import { ref } from 'vue'

export default {
  setup() {
    const list = ref([])
    const loading = ref(false)
    const finished = ref(false)
    const refreshing = ref(false)

    const onLoad = () => {
      setTimeout(() => {
        if (refreshing.value) {
          list.value = []
          refreshing.value = false
        }

        for (let i = 0; i < 10; i++) {
          list.value.push(list.value.length + 1)
        }
        loading.value = false

        if (list.value.length >= 40) {
          finished.value = true
        }
      }, 1000)
    }

    const onRefresh = () => {
      // 清空列表数据
      finished.value = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      loading.value = true
      onLoad()
    }

    return {
      list,
      onLoad,
      loading,
      finished,
      onRefresh,
      refreshing,
    }
  },
}
```

#### 修改 HomeMain.vue

```vue
<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <div class="home-main">
      ......
    </div>
  </van-pull-refresh>
</template>

<script setup>
......
// --------------首页功能--------------------
......

// 封装首页数据初始化功能
const initIndexData = async () => {
......

  // 加载完毕，将下拉刷新状态更改为完成
  refreshing.value = false
}
......


// -----------------下拉刷新功能-----------------
const refreshing = ref(false)

const onRefresh = () => {
  // 1. 清空列表数据
  indexData.value = {}
  productsData.value = []
  // 2. 页码还原
  page = 1
  // 3. 触底加载的状态还原
  loading.value = false
  finished.value = false
  // 4. 重新发送请求
  initIndexData()
  initProductsData()
}
</script>
```

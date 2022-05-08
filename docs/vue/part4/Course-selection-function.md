# 选课功能

## 组件准备

<img src="/images/vue/396.jpg" style="width: 70%; display:inline-block; margin: 0 ;">

Course 组件为选课⻚⾯，分为上中下三部分，顶部为显示 logo 的导航区域，中间为课程选择区域（含轮播图和课程列表），底部使⽤公共组件 LayoutFooter。

⾸先进⾏如下结构设置：

```
course
├── components
│ ├── CourseHeader.vue
│ └── CourseContent.vue
└── index.vue
```

在 course/index.vue 中引⼊ CourseHeader、CourseContent、LayoutFooter

```vue
// course/index.vue
<template>
  <div class="course">
    <course-header></course-header>
    <course-content></course-content>
    <layout-footer></layout-footer>
  </div>
</template>

<script>
import CourseHeader from './components/CourseHeader'
import CourseContent from './components/CourseContent'
import LayoutFooter from '@/components/LayoutFooter'

export default {
  name: 'Course',
  components: {
    CourseHeader,
    CourseContent,
    LayoutFooter,
  },
}
</script>
<style lang="scss" scoped></style>
```

```vue
// CourseHeader.vue
<template>
  <div class="course-header">头部</div>
</template>

<script>
export default {
  name: 'CourseHeader',
}
</script>
<style lang="scss" scoped></style>
```

```vue
// CourseContent.vue
<template>
  <div class="course-content">内容</div>
</template>

<script>
export default {
  name: 'CourseContent',
}
</script>
<style lang="scss" scoped></style>
```

## CourseHeader 组件

导航部分只有 logo 图显示，直接设置即可。
logo 图使⽤ Vant 的 [Image](https://vant-contrib.gitee.io/vant/#/zh-CN/image) 组件，引⼊图⽚，调整样式即可。

```vue
<template>
  <div class="course-header">
    <van-image :src="require('@/assets/logo.png')" />
  </div>
</template>

<script>
export default {
  name: 'CourseHeader',
}
</script>

<style lang="scss" scoped>
.course-header {
  height: 50px;
  display: flex;
  align-items: center;
}
.van-image {
  width: 180px;
  margin-left: -20px;
}
</style>
```

#### VUE 中的 img 的:src 动态加载图片的问题

问题描述：

写的一个系统，用户登录后会使用数据库的数据作为用户头像，需要显示在页面上，那头像链接就需要用变量表示，那就用到了:src 做动态绑定，直接加变量

问题解决：

1、使用 require

由于我们在写代码用的链接是编译前的，编译后图片文件，require 中直接写死是没有错误的（里面全是字符串的话），但是如果只用一个变量，就会报错

2、使用 require 的小技巧

查找到了一篇有用的教程——[前端 es6 require 动态引入图片报错 Error: Cannot find module](https://blog.csdn.net/hzxonlineok/article/details/96307270)，“因为 require 它是打包工具所需要的标识，你搞成运行时通过变量去定义的话，

它就没办法打包了啊”，那就加个字符串，做个前缀吧

```js
<img :src="imgUrl" class="user-avator" alt />

computed: {
        imgUrl: function () {
            return this.photo;
        }
 }

this.photo = require("../../assets/img/"+obj.photo);

```

obj 即为用户信息对象，里面的 photo 存储用户头像文件名，加上前缀文件夹，用 require 就可以动态获取了
————————————————
版权声明：本文为 CSDN 博主「曾某人啊」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qq_41170600/article/details/108732424

## CourseContent 组件

选课内容区域分为上下两部分，顶部为轮播图，底部为课程列表。

<img src="/images/vue/397.jpg" style="width: 70%; display:inline-block; margin: 0 ;">

<img src="/images/vue/398.jpg" style="width: 70%; display:inline-block; margin: 0 ;">

### ⼴告轮播图

<img src="/images/vue/399.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

#### 布局处理

使⽤ Vant 的 [Swipe 轮播](https://vant-contrib.gitee.io/vant/#/zh-CN/swipe)组件。

```vue
// Vant 官⽅示例：Swipe 轮播
<van-swipe class="my-swipe" :autoplay="3000" indicator-color="whit
>
<van-swipe-item>1</van-swipe-item>
<van-swipe-item>2</van-swipe-item>
<van-swipe-item>3</van-swipe-item>
<van-swipe-item>4</van-swipe-item>
</van-swipe>
```

结构设置完毕，还需要请求⼴告数据动态创建

#### 封装接⼝

- 需要使⽤以下接⼝：
  - 获取所有⼴告位：地址
  - 获取⼴告位及其对应⼴告：地址
- 这⾥的 “获取所有⼴告位” 接⼝⽆需封装，我们可以通过接⼝响应数据得知 “⾸⻚顶部轮播”的位置标记 `spaceKey` 为 999，我们可以将这个数值固定使⽤，相当于设置⼴告位时的⼀种约定。

这⾥新建 src/services/course.js 封装获取⼴告的接⼝功能即可：

```js
// src/services/course.js
import request from '@/utils/request'

// 获取⼴告位及其对应⼴告
export const getAllAds = (params) => {
  return request({
    method: 'GET',
    url: '/front/ad/getAllAds',
    params,
  })
}
```

- 引⼊到 CourseContent.vue，请求数据，保存在 data 中。
  - 响应数据中的 content[0].adDTOList 为当前⼴告位的⼴告列表
    - img 为需要的⼴告图⽚地址。
    - id 为 课程 ID

```js
 <script>
 import { getAllAds } from '@/services/course'

 export default {
 name: 'CourseContent',
 data () {
 return {
 // 轮播图图⽚列表
 adList: []
 }
 },
 created () {
 this.loadAds()
 },
 methods: {
 async loadAds () {
 const { data } = await getAllAds({
 spaceKeys: '999'
 })
 // 保存⼴告信息
 this.adList = data.content[0].adDTOList
 }
 }
 }
 </script>

 <style lang="scss" scoped></style>
```

将轮播图项根据⼴告数据设置，并进⾏样式处理。

```vue
// course/components/CourseContent.vue
<template>
  <div class="course-content">
    <!-- 顶部⼴告轮播 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in adList" :key="item.id">
        <img :src="item.img" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
...
<style lang="scss" scoped>
.my-swipe {
  width: 100%;
}

.my-swipe .van-swipe-item {
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.my-swipe img {
  height: 170px;
}
</style>
```

### 轮播图-状态筛选

⼴告数据中只有上架的数据需要展示，上架状态通过 status 标识，1 为上架，0 为下架。

由于需要对结果进⾏遍历，我们可以将数据筛选通过计算属性进⾏处理。

```vue{6,15-17}
// CourseContent.vue
<template>
  <div class="course-content">
    <!-- 顶部⼴告轮播 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in activeAdList" :key="item.id">
        <img :src="item.img" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
computed: {
activeAdList () {
return this.adList.filter(item => item.status === 1)
}
},
</script>
```

## 课程基础列表

### 基础布局

```vue
<!-- CourseContentList.vue-->
<template>
  <div class="course-content-list"></div>
</template>

<script>
export default {
  name: 'CourseContentList',
}
</script>

<style lang="scss" scoped></style>
```

引⼊到 CourseContent.vue 中

```vue
 // CourseContent.vue
 <template>
 <div class="course-content">
 <!-- 顶部⼴告轮播 -->
 ...
 <!-- 底部课程列表 -->
 <course-content-list></course-content-list>
 </div>
 </template>

 <script>
 import CourseContentList from './CourseContentList'
 ...
 export default {
 ...
  components: {
    CourseContentList
  },
 ...
 }
 </scri
```

功能采⽤ Vant 的 [List](https://vant-contrib.gitee.io/vant/#/zh-CN/list) 列表组件。

```vue
// Vant 官⽅示例：List 列表
<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
 <van-cell v-for="item in list" :key="item" :title="item" />
 </van-list>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
    }
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中⼀般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
  },
}
</script>
```

设置到⻚⾯中

- load 事件：⽤于进⾏数据请求
  - list 组件初始化后会触发⼀次 load 事件，⽤于加载⾸屏的数据。
  - 如果⼀次请求加载的数据较少，列表内容⽆法铺满屏幕，会⾃动再次触发 load，直到内容铺满屏
  - 幕或加载全部数据。
  - 滑动列表触底时也会触发 load
- loading：控制（触底后）新数据是否加载
  - 未加载时 loading 为 false，当 load 事件触发，loading ⾃动变更为 true，显示加载状态提示，
  - 且请求过程中⽆法再次触发 load 事件。请求完毕设置 loading 为 false 取消加载提示即可。
- finished：
  - 在每次请求完毕后，需要⼿动将 loading 设置为 false，表示本次加载结束
  - 所有数据加载结束，finished 为 true，此时不会触发 load 事件

```vue
// CourseContentList.vue
<template>
  <div class="course-content-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'CourseContentList',
  data() {
    return {
      // 数据列表
      list: [],
      // 是否要进⾏加载
      loading: false,
      // 是否加载完毕
      finished: false,
    }
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中⼀般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
  },
}
</script>
```

### 固定列表

- 问题：
  - 列表滚动时实际上是整个 Course 组件都在滚动，这时顶部的导航与轮播也会滚动。
  - 加载完毕后，列表底部的提示内容被 LayoutFooter 的路由按钮功能遮挡。
- 解决⽅式：
  - 设置列表固定定位
    - CourseHeader ⾼度 50px
    - 轮播⾼度 170px
    - LayoutFooter ⾼度 50px

```vue
// CourseContentList.vue ...
<style lang="scss" scoped>
.course-content-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 220px;
  bottom: 50px;
  overflow-y: auto;
}
</style>
```

功能操作正确，说明设置是成功的，但我们要深⼊思考⼀下。

我们的课程列表组件是⼀个独⽴组件功能，应只对⾃身负责。当前操作中设置的 top 与 bottom 实际上是根据⽗组件的布局设置的，如果以后⽗组件布局变化，或其他组件需要使⽤课程列表组件，都需要来修改⼦组件的数据，这是⼗分不合理的。总的来说，CourseContentList 与 CourseContent 耦合。

结论，我们应该将与⽗组件布局相关的 top 与 left 由⽗组件设置，来进⾏解耦。

将 CourseContentList 的 top 与 bottom 修改为 0。

```vue
// CourseContentList.vue ...
<style lang="scss" scoped>
.course-content-list {
  ...top: 0;
  bottom: 0;
}
</style>
```

在⽗组件 CourseContent 中设置⼦组件容器的位置即可。

```css
// CourseContent.vue
...
// 底部课程列表的位置样式，不应该设置在组件内容
.course-content-list {
  top: 220px;
  bottom: 50px;
}
```

## 封装接口

- 需要使⽤以下接⼝：
  - 分⻚查询课程内容：[地址](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/课程/getQueryCoursesUsingPOST)
    - 由于前台接⼝有问题未修复，此处使⽤后台接⼝

<img src="/images/vue/400.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```js
 // services/course.js
 ...
 // 分⻚查询课程内容
 export const getQueryCourses = data => {
 return request({
 method: 'POST',
 url: '/boss/course/getQueryCourses',
 data
 })
 }
```

- 引⼊并请求数据

```js
 // CourseContentList.vue
 ...
 import { getQueryCourses } from '@/services/course'
 ...
 data () {
 return {
 ...
 // 数据⻚数
 currentPage: 1
 }
 },
  methods: {
    async onLoad () {
      const { data } = await getQueryCourses({
        currentPage: this.currentPage,
        pageSize: 10,
        // 代表上架课程
        status: 1
      })
      console.log(data)
      // 下次请求下一页
      this.currentPage++
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (data.data.records.length < 10) {
        this.finished = true
      }
    }
  }
 }
```

## 布局与数据绑定

<img src="/images/vue/070.gif" style="width: 100%; display:inline-block; margin: 0 ;">

根据数据进⾏布局设置，并绑定数据

```vue
// CourseContentList.vue ...
<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
 <van-cell
 v-for="item in list"
 :key="item.id"
 >
 <div>
 <img :src="item.courseImgUrl" alt="">
 </div>
 <div class="course-info">
 <h3 v-text="item.courseName"></h3>
 <p class="course-preview" v-html="item.previewFirstField"></p>
 <p class="price-container">
 <span class="course-discounts">￥{{item.discounts}}</span>
 <s class="course-price">￥{{item.price}}</s>
 </p>
 </div>
 </van-cell>
 </van-list>
...
<script>
...
methods: {
async onLoad () {
const { data } = await getQueryCourses(...)
// 检测，如果没有数据了，结束，如果有，保存
if (data.data && data.data.records && data.data.records.length !== 0) {
this.list.push(...data.data.records)
}
...
}
}
...
</script>
...
<style lang="scss" scoped>
.course-content-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 220px;
  bottom: 50px;
  overflow-y: auto;
}
// 课程条⽬设置flex，内部元素左右显示
.van-cell__value {
  height: 100px;
  padding: 10px 0;
  display: flex;
}
// 左侧图设置固定尺⼨
.van-cell__value img {
  width: 75px;
  height: 100%;
  border-radius: 5px;
}
// 右侧内容区域 flex: 1 撑满⽗元素
.course-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
}
.course-info .course-preview {
  flex-grow: 1;
}
.course-info .course-discounts {
  color: #ff7452;
  margin-right: 10px;
}
p,
h3 {
  margin: 0;
}
</style>
```

## 下拉刷新

<img src="/images/vue/069.gif" style="width: 100%; display:inline-block; margin: 0 ;">

下拉时，CourseContentList 需要刷新。

- 这⾥使⽤ Vant 的 [PullRefresh 下拉刷新](https://vant-contrib.gitee.io/vant/#/zh-CN/pull-refresh)组件。
  - 示例中使⽤了 [Toast 轻提示](https://vant-contrib.gitee.io/vant/#/zh-CN/toast)组件，此处为引⼊⽤法，也可通过 this.\$toast() 调⽤。
  - 也可以使⽤下拉刷新组件的 success-text 与 success-duration 配合进⾏提示。

```vue
// Vant 官⽅示例：PullRefresh 下拉刷新组件
<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
 <p>刷新次数: {{ count }}</p>
 </van-pull-refresh>
...
<script>
export default {
  data() {
    return {
      count: 0,
      isLoading: false,
    }
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        Toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 1000)
    },
  },
}
</script>
```

设置到组件中：

```vue
 // CourseContentList.vue
 <template>
 <div class="course-content-list">
 <!-- 下拉刷新组件 -->
 <van-pull-refresh
 v-model="isRefreshing"
 7 @refresh="onRefresh"
>
<!-- 课程列表 -->
 <van-list ...>
 ...
 </van-list>
 </van-pull-refresh>

 </div>
 </template>
 ...
 <script>
 ...
 data () {
 return {
 ...
 // 下拉刷新状态
 isRefreshing: false
 }
 },
 ...
    async onRefresh () {
      // 还原数据页数为1
      this.currentPage = 1
      // 重新请求数据
      const { data } = await getQueryCourses({
        currentPage: this.currentPage,
        pageSize: 10,
        // 代表上架课程
        status: 1
      })
      // console.log(data)
      // 下拉刷新，需要清除所有数据，直接赋值给this.list
      if (data.data && data.data.records && data.data.records.length !== 0) {
        this.list = data.data.records
      }

      // 提示组件
      // 全局引入
      this.$toast('刷新成功')
      // 局部引入
      // Toast('刷新成功')

      // 关闭下拉提示框
      this.isRefreshing = false
    },
 ...
```

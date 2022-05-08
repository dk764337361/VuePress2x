# 学习功能

## 布局处理

整体分为上中下两部分，顶部为标题，中间为学习课程列表，底部为导航。

⾸先引⼊ LayoutFooter 组件。

```vue
// learn/index.vue
<template>
  <div class="learn">
    <!-- 顶部功能 -->
    <!-- 底部导航 -->
    <layout-footer></layout-footer>
  </div>
</template>

<script>
import LayoutFooter from '@/components/LayoutFooter'
export default {
  name: 'Learn',
  components: {
    LayoutFooter,
  },
}
</script>
```

### 头部功能

头部设置 NarBar 进⾏标题显示即可。

```vue
// learn/index.vue
<template>
  <div class="learn">
    <van-nav-bar title="已购课程" />
    ...
  </div>
</template>
...
<style lang="scss" scoped>
// 设置顶部与底部位置
.course-content-list {
  top: 50px;
  bottom: 50px;
}
</style>
```

### 课程列表公共组件

顶部列表与 Course 中使⽤的列表⾮常相似，可封装为公共组件。

Course 展示的是所有课程，⽽学习展示的是⽤于已经购买的课程，数据不同，但结构相同。

`这⾥将 CourseContentList.vue 作为公共组件移动到 src/components 中。`

CourseContent 中对 CourseContentList 的引⼊路径要随之修改。

```js
// course/components/CourseContent.vue
...
import CourseContentList from '@/components/CourseContentList'
...
```

## :star2:接口抽离[父传子，传函数]

课程列表组件初始设置时使⽤的是所有课程接⼝，如果更改为其他数据（如已购课程），应由⽗组件进⾏接⼝功能设置，再将传⼊⼦组件，由⼦组件内部在适当时机进⾏调⽤。

```js
// CourseContentList.vue
...
-import { getQueryCourses } from '@/services/course'
...
+props: {
+ // ⽤于请求数据的函数
+ fetchData: {
+ type: Function,
+ required: true
+ }
+},
...
async onRefresh () {
...
- // 重新请求数据
- const { data } = await getQueryCourses({
+ const { data } = await this.fetchData({
...
},
async onLoad () {
+ const { data } = await getQueryCourses({
- const { data } = await this.fetchData({
...
}
```

修改 ContentContent

```js
// CourseContent.vue
...
<course-content-list
+ :fetchData="fetchData"
></course-content-list>
...
-import { getAllAds } from '@/services/course'
+import { getAllAds, getQueryCourses } from '@/services/course'
...
methods: {
// 传⼊请求
+ fetchData (options) {
+ return getQueryCourses(options)
+ },
...
```

## 接口封装与数据绑定改进

### 接口封装

这⾥使⽤获取已购课程：[地址](http://eduboss.lagou.com/front/doc.html#/edu-front-boot/课程接口/getPurchaseCourseUsingGET)

<img src="/images/vue/406.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```js
// services/course.js
...
// 获取已购课程
export const getPurchaseCourse = () => {
  return request({
    method: 'GET',
    url: '/front/course/getPurchaseCourse'
  })
}
```

引⼊到⻚⾯中，发送请求

```js
 // learn/index.vue
 ...
 import { getPurchaseCourse } from '@/services/course'

 export default {
 ...
 data () {
 return {
 // 课程信息
 courseList: []
 }
 },
 created () {
 this.loadCourse()
 },
 methods: {
 async loadCourse () {
 const { data } = await getPurchaseCourse()
 console.log(data)
 }
 }
 }
```

#### 引⼊ CourseContentList

```js
 // learn/index.vue
 ...
 +<course-content-list
 + :fetchData="fetchData"
 +></course-content-list>
 ...
 +import CourseContentList from '@/components/CourseContentList'
 ...
 components: {
 ...
 + CourseContentList
 },
 ...
 -created () {
 - this.loadCourse()
 -},
 methods: {
 fetchData () {
 return getPurchaseCourse()
 }
 - async loadCourse () {
 - const { data } = await getPurchaseCourse()
 - console.log(data)
 }
 }
 ...
```

### 数据绑定改进

- 由于所有课程接⼝与已购课程接⼝响应的数据格式不同，在进⾏数据绑定时需要进⾏检测。
  - 响应数据的格式：
    - 所有课程数据位置为：data.data.records
    - 已购课程数据位置为：data.content
  - 数据对应的键不同：
    - 课程名称不同
    - 课程图⽚不同
    - 已购课程没有价格相关数据

```js
// CourseContentList.vue 响应数据格式检测
 ...
 async onRefresh () {
 ...
 // 如果存在数据，清空并课程数据，否则结束
 if (data.data && data.data.records && data.data.records.length !== 0) {
 this.list = data.data.records
 + } else if (data.content && data.content.length !== 0) {
 + this.list = data.content
 }
 ...
 },
 async onLoad () {
 ...
 // 检测，如果没有数据了，结束，如果有，保存
 if (data.data && data.data.records && data.data.records.length !== 0) {
 this.list.push(...data.data.records)
 + } else if (data.content && data.content.length !== 0) {
 + this.list.push(...data.content)
 }
 ...
 // 数据全部加载完成
 + if (data.data && data.data.records && data.data.records.length < 10) {
 this.finished = true
 + } else if (data.content && data.content.length < 10) {
 + this.finished = true
 }
 }
 }
 ...
```

#### 数据绑定改进

```vue
// CourseContentList.js ...
<div>
<!-- 所有课程与已购课程的图⽚数据属性名不同，检测后使⽤ -->
 + <img :src="item.courseImgUrl || item.image" alt="">
 </div>
<div class="course-info">
 <!-- 名称检测 -->
 + <h3 v-text="item.courseName || item.name"></h3>
 <p class="course-preview" v-html="item.previewFirstField"></p>
 <!-- 如果为已购课程，⽆需显示价格区域 -->
 <p
 + v-if="item.price"
 class="price-container"
 >
 <span class="course-discounts">￥{{ item.discounts }}</span>
 <s class="course-price">￥{{ item.price }}</s>
 </p>
 </div>
```

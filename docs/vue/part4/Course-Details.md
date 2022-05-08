# 课程详情

## :star2:组件准备【动态路由传参（id）】

<img src="/images/vue/074.gif" style="width: 100%; display:inline-block; margin: 0 ;">

创建 src/views/course-info/index.vue

```vue
// views/course-info/index.vue
<template>
  <div class="course-info">课程详情</div>
</template>

<script>
export default {
  name: 'CourseInfo',
}
</script>

<style lang="scss" scoped></style>
```

设置路由规则

```js
// router/index.js
...
{
path: '/course-info/:courseId/',
name: 'course-info',
component: () => import(/* webpackChunkName: 'course-info' */'@/views/course/info'),
props: true
},
...
```

设置跳转

```vue
 // course/components/CourseContentList.vue
 ...
        <van-cell
          v-for="item in list"
          :key="item.id"
          @click="
            $router.push({
              name: 'course-info',
              params: {
                courseId: item.id,
              },
            })
          "
        >
 ...
```

在组件中通过 props 接收路径传参

```vue
// course-info/index.vue
<template>
  <div class="course-info">课程的id为{{ courseId }}</div>
</template>

<script>
export default {
  name: 'CourseInfo',
  props: {
    courseId: {
      type: [String, Number],
      required: true,
    },
  },
}
</script>
<style lang="scss" scoped></style>
```

## 封装接口

<img src="/images/vue/407.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

这⾥使⽤获取已购课程：[地址](http://eduboss.lagou.com/front/doc.html#/edu-front-boot/课程接口/getCourseByIdUsingGET)

```js
// services/course.js
...
// 获取课程详情

export const getCourseById = params => {
  return request({
    method: 'GET',
    url: '/front/course/getCourseById',
    params
  })
}

```

引⼊到⻚⾯中，发送请求

```vue
// course-info/index.vue
<script>
import { getCourseById } from '@/services/course'
export default {
  name: 'CourseInfo',
  props: {
    courseId: {
      type: [String, Number],
      required: true,
    },
  },
  components: {},
  data() {
    return {
      // 课程信息
      course: {},
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {
    this.loadCourse()
  },
  methods: {
    async loadCourse() {
      const { data } = await getCourseById({
        courseId: this.courseId,
      })
      this.course = data.content
      console.log(data)
    },
  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
}
</script>
```

## 主体内容区域处理

整体采⽤ Vant 的 Cell 单元格组件。

```vue
// course-info/index.vue
<template>
  <div class="course-info">
    <van-cell-group>
      <!-- 课程图⽚ -->
      <van-cell class="course-img"></van-cell>
      <!-- 课程描述 -->
      <van-cell class="course-desctription"></van-cell>
      <!-- 课程详细内容 -->
      <van-cell class="course-detail"></van-cell>
    </van-cell-group>
  </div>
</template>
```

### 顶部图⽚与课程信息

<img src="/images/vue/408.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```vue
// course-info/index.vue
...
      <!-- 课程图⽚ -->
      <van-cell class="course-img">
        <img :src="course.courseImgUrl" alt="" />
      </van-cell>
      <!-- 课程描述 -->
      <van-cell class="course-desctription">
        <!-- 课程名称 -->
        <h2 v-text="course.courseName"></h2>
        <!-- 课程概述 -->
        <p v-text="course.previewFirstField"></p>
        <!-- 课程销售信息 -->
        <div class="course-sale-info">
          <p class="course-price">
            <span class="discounts">￥{{ course.discounts }}</span>
            <span>￥ {{ course.price }}</span>
          </p>
          <span class="tag">{{ course.sales }}人已购</span>
          <span class="tag">每周三、五更新</span>
        </div>
      </van-cell>
 ...
 <style lang="scss" scoped>
// 课程图片区域
.van-cell {
  padding: 0;
}
.course-img {
  height: 280px;
}

// 课程描述区域
.course-desctription {
  padding: 10px 20px;
  height: 150px;
}
.course-desctription h2 {
  padding: 0;
}
.course-sale-info {
  display: flex;
}
.course-sale-info .course-price {
  flex: 1;
  margin: 0;
}
.course-price .discounts {
  color: #ff7452;
  font-size: 24px;
  font-weight: 700;
}
.course-sale-info .tag {
  background-color: #f8f9fa;
  font-size: 12px;
  font-weight: 700;
  color: #666;
  margin-left: 10px;
  padding: 7px;
  line-height: 15px;
  border-radius: 3px;
}
```

### 主体选项卡

<img src="/images/vue/075.gif" style="width: 50%; display:inline-block; margin: 0 ;">

选项卡使⽤ Vant 的 [Tab 标签⻚](https://vant-contrib.gitee.io/vant/#/zh-CN/tab) 组件。

```vue
// Vant 官⽅示例：Tab 标签⻚
<van-tabs v-model="active">
 <van-tab title="标签 1">内容 1</van-tab>
 <van-tab title="标签 2">内容 2</van-tab>
 <van-tab title="标签 3">内容 3</van-tab>
 <van-tab title="标签 4">内容 4</van-tab>
 </van-tabs>
... export default { data(){ return { active: 2, }; }, };
```

设置到⻚⾯中

```vue
// course-info/index.vue
<van-cell class="course-detail">
<!-- 选项卡 -->
<van-tabs>
<van-tab title="详情">内容 1</van-tab>
<van-tab title="内容">内容 2</van-tab>
</van-tabs>
</van-cell>
```

### 课程详情

设置详情部分数据

```vue
// course-info/index.vue ...
<van-tab title="详情">
<!-- 详情在后台是通过富⽂本编辑器设置的，内容为 HTML ⽂本 -->
<div v-html="course.courseDescription"></div>
</van-tab>
...
```

当详情内容⽐较⻓时，将选项卡标题部分固定，这⾥使⽤ Tab 组件的[粘性定位](https://vant-contrib.gitee.io/vant/#/zh-CN/tab#nian-xing-bu-ju)功能。

```vue
// course-info/index.vue <van-tabs sticky scrollspy>...</van-tabs>
```

## 章节列表处理

<img src="/images/vue/076.gif" style="width: 50%; display:inline-block; margin: 0 ;">

课程内容要显示课程的章节与课时信息。

### 封装接口

接⼝为获取课程章节：[地址](http://eduboss.lagou.com/front/doc.html#/edu-front-boot/课程章节接口/getSectionAndLessonUsingGET)

封装到 course.js 中

```js
// course.js
...
// 获取课程章节
export const getSectionAndLesson = params => {
return request({
method: 'GET',
url: '/front/course/session/getSectionAndLesson',
params
})
 }
```

### 封装章节组件

Vant 中没有提供与需求相似的⽤于显示章节与课时的组件，我们⾃⾏封装。

准备组件⽂件，CourseSectionAndLesson ⽤于`单个章节与内部课时展示`。

```vue
// course-info/components/CourseSectionAndLesson
<template>
  <div class="section-and-lesson">
    章节信息
  </div>
</template>

<script>
export default {
  name: 'CourseSectionAndLesson',
  props: {
    sectionData: {
      type: Object,
      required: true,
    },
  },
}
</script>
<style lang="scss" scoped></style>
```

#### 引⼊组件

将 `接⼝`与 `CourseSectionAndLesson` 引⼊到 course-info/index.vue 中

```vue
// course-info/index.vue ...
<van-tab title="内容">
 <course-section-and-lesson></course-section-and-lesson>
 </van-tab>
...
<script>
import CourseSectionAndLesson from './components/CourseSectionAndLesson'
import { getCourseById, getSectionAndLesson } from '@/services/course'
...
components: {
CourseSectionAndLesson
},
...
data () {
return {
...
// 章节信息
sections: {}
}
},
created () {
...
this.loadSection()
},
...
methods: {
async loadSection () {
// 请求数据
const { data } = await getSectionAndLesson({
courseId: this.courseId
})
this.sections = data.content.courseSectionList
console.log(data)
},
...
</script>
```

- 遍历 sections，根据元素个数创建 CourseSectionAndLesson 组件。

```vue
<van-tab title="内容">
<course-section-and-lesson
v-for="item in sections"
:key="item.id"
:section-data="item">
</course-section-and-lesson>
</van-tab>
```

### 章节组件布局处理

<img src="/images/vue/077.gif" style="width: 50%; display:inline-block; margin: 0 ;">

```vue
<template>
  <div class="section-and-lesson">
    <!-- 章节 -->
    <h2 class="section" v-text="sectionData.sectionName"></h2>
    <!-- 课时 -->
    <p v-for="item in sectionData.courseLessons" :key="item.id" class="lesson">
      <!-- 课时标题 -->
      <span v-text="item.theme"></span>
      <!-- 课时图标，使⽤ Vant 的 icon 图标组件 -->
      <van-icon v-if="item.canPlay" name="play-circle" size="20" />
      <van-icon v-else name="lock" size="20" />
    </p>
  </div>
</template>

...

<style lang="scss" scoped>
.section-and-lesson {
  padding: 0 20px;
}
// 让课时标题与图标两端显示
.lesson {
  display: flex;
  justify-content: space-between;
}
</style>
```

## 底部⽀付功能

### 布局处理

整体采⽤ Vant 的 Tabbar 组件，也可⾃⾏设置元素进⾏固定定位处理。

```vue
// course-info/index.vue
<template>
  <div class="course-info">
    <!-- 如果已购，去除底部⽀付区域并设置主体内容区域占满屏幕 -->
    <van-cell-group :style="styleOptions">
      ...
    </van-cell-group>
    <!-- 底部⽀付功能 -->
    <van-tabbar v-if="!course.isBuy">
      <div class="price">
        <span v-text="course.discountsTag"></span>
        <span class="discounts">￥{{ course.discounts }}</span>
        <span>￥{{ course.price }}</span>
      </div>
      <van-button type="primary">⽴即购买</van-button>
    </van-tabbar>
  </div>
</template>
<script>
...
 data () {
 return {
 ...
 // 样式信息
 styleOptions: {}
 }
 },
 ...
 async loadCourse () {
 ...
 if (data.content.isBuy) {
 this.styleOptions.bottom = 0
 }
 }
</script>
<style lang="scss" scoped>
...
 // 修改 discounts 选择器范围，让顶部与底部均可使⽤
 .discounts {
  color: #ff7452;
  font-size: 24px;
  font-weight: 700;
}
...

 // 添加底部导航后设置
 .van-cell-group {
  position: fixed;
  // 预留底部⽀付区域⾼度
  width: 100%;
  top: 0;
  bottom: 50px;
  overflow-y: auto;
}

// 调整内部⽂字位置
.van-tabbar {
  line-height: 50px;
  // 设置 padding 后元素超出窗⼝
  padding: 0 20px;
  // 设置 box-sizing
  box-sizing: border-box;
  display: flex;
  // 内部元素左右显示
  justify-content: space-between;
  // 内容居中
  align-items: center;
}

span {
  font-size: 14px;
}
// 尺⼨调整
.van-button {
  width: 50%;
  height: 80%;
}
</style>
```

<img src="/images/vue/078.gif" style="width: 50%; display:inline-block; margin: 0 ;">

- 如果是已经购买了课程，则⽆需显示此功能。
  - 显隐控制
  - 主体内容区域位置处理

```vue
// course-info/index.vue
<template>
  <div class="course-info">
    <!-- 如果已购，去除底部⽀付区域并设置主体内容区域占满屏幕 -->
    <van-cell-group :style="styleOptions">
      ...
    </van-cell-group>
    <!-- 底部⽀付功能 -->
    <van-tabbar v-if="!course.isBuy">
      ...
    </van-tabbar>
  </div>
</template>
...
<script>
data () {
return {
...
// 样式信息
styleOptions: {}
}
},
...
async loadCourse () {
...
if (data.content.isBuy) {
this.styleOptions.bottom = 0
}
}
</script>
...
```


# 课程管理

## 布局与准备

- 课程前台展示：http://edufront.lagou.com/#/
- 功能分析：
  - 展示上架状态
  - 上下架操作
  - 添加课程
  - 编辑课程
  - 课程内容管理
- 基础布局展示等重复功能⾃⾏完成。

```vue
// course/index.vue 课程组件
<template>
  <div class="course">
    <course-list></course-list>
  </div>
</template>
<script>
import CourseList from './components/list.vue'

export default {
  name: 'CourseIndex',
  components: {
    CourseList,
  },
}
</script>

<style lang="scss" scoped></style>
```

```vue
// course/components/list.vue 课程列表组件（新建）
<template>
  <div class="course-list">
    <el-card>
      <div slot="header">
        <span>数据筛选</span>
      </div>
      <el-form
        :inline="true"
        ref="form"
        label-position="left"
        :model="filterParams"
      >
        <el-form-item label="课程名称：" prop="courseName">
          <el-input v-model="filterParams.courseName"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-select v-model="filterParams.status">
            <el-option label="全部" value=""></el-option>
            <el-option label="上架" value="1"></el-option>
            <el-option label="下架" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="isLoading" @click="handleReset">重置</el-button>
          <el-button type="primary" :disabled="isLoading" @click="handleFilter"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <div slot="header">
        <span>查询结果：</span>
        <el-button style="float: right; margin-top: -10px" type="primary"
          >添加课程</el-button
        >
      </div>
      <el-table
        :data="courses"
        v-loading="isLoading"
        style="width: 100%; margin-bottom: 20px"
      >
        <el-table-column prop="id" label="ID" width="100"> </el-table-column>
        <el-table-column prop="courseName" label="课程名称" width="230">
        </el-table-column>
        <el-table-column prop="price" label="价格"> </el-table-column>
        <el-table-column prop="sortNum" label="排序"> </el-table-column>
        <el-table-column prop="status" label="上架状态">
          待处理
        </el-table-column>
        <el-table-column prop="price" label="操作" width="200" align="center">
          <template>
            <el-button>编辑</el-button>
            <el-button>内容管理</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount"
        :disabled="isLoading"
        :current-page="filterParams.currentPage"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script>
import { getQueryCourses } from '@/services/course'

export default {
  name: 'CourseList',
  data() {
    return {
      // 筛选功能参数（表单数据）
      filterParams: {
        currentPage: 1,
        pageSize: 10,
        courseName: '',
        status: '',
      },
      // 课程信息
      courses: [],
      // 数据总条数
      totalCount: 0,
      // 加载状态
      isLoading: true,
    }
  },

  created() {
    // 加载课程
    this.loadCourses()
  },

  methods: {
    // 加载课程
    async loadCourses() {
      this.isLoading = true
      const { data } = await getQueryCourses(this.filterParams)
      if (data.code === '000000') {
        // 保存课程信息
        this.courses = data.data.records
        this.totalCount = data.data.total
        this.isLoading = false
      }
    },
    // 分⻚⻚码点击操作
    handleCurrentChange(page) {
      this.filterParams.currentPage = page
      this.loadCourses()
    },
    // 筛选操作
    handleFilter() {
      this.filterParams.currentPage = 1
      this.loadCourses()
    },
    // 重置操作
    handleReset() {
      this.$refs.form.resetFields()
      this.filterParams.currentPage = 1
      this.loadCourses()
    },
  },
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 20px;
}
</style>
```

```js
// services/course.js 课程接⼝模块（新建）
import request from '@/utils/request'
// 分⻚查询课程信息
export const getQueryCourses = (data) => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data,
  })
}
```

## 上下架状态

### 布局(作用域插槽)

<img src="/images/vue/355.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

使⽤ Element 的 [Switch 开关](https://element.eleme.cn/#/zh-CN/component/switch)组件进⾏设置，这样可以将状态展示与上下架操作合并为⼀个组件，操作更直观。

```vue
// Element 官⽅示例：switch 开关
<el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949">
</el-switch>
<script>
export default {
  data() {
    return {
      value: true,
    }
  },
}
</script>
```

- 添加到上架状态对应的“待处理”标记位置。（⽂字为标记⽆实际意义）
  - 后端返回的每条数据中的 status 代表上架状态，上架为 1，下架为零。
  - 需要使用[Switch 开关的两个属性](https://element.eleme.cn/#/zh-CN/component/switch#attributes)
  - 通过 v-model 并结合作⽤域插槽获取数据进⾏绑定
    - 由于组件默认通过布尔值判断，需要通过组件扩展的 value 类型进⾏设置

```vue{9-10}
// course/components/list.vue ...
<el-table-column prop="status" label="上架状态">
<!-- 设置上架状态展示 -->
<template slot-scope="scope">
<el-switch
v-model="scope.row.status"
 active-color="#13ce66"
 inactive-color="#ff4949"
 :active-value="1"
 :inactive-value="0">
 </el-switch>
 </template>
 </el-table-column>
...
```

### 逻辑实现

<img src="/images/vue/356.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

通过课程上下架接⼝操作：[地址](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/课程/changeStateUsingGET)

```js
// services/course.js
...

// 课程上下架接口
// params为GET发送的参数合集
// 写法一：
// export const changeState = (data) => {
//   return request({
//     method: 'GET',
//     url: '/boss/course/changeState',
//     params: data
//   })
// }
// 写法二：
export const changeState = params => {
  return request({
    method: 'GET',
    url: '/boss/course/changeState',
    // params: params
    params
  })
}
```

- 引⼊

```js
// src\views\course\components\List.vue
import { getQueryCourses, changeState } from '@/services/course'
```

- 切换开关时发送请求，通过⽂档得知，Switch 组件具有 change 事件，进⾏设置。
  - 默认参数为切换后新的状态值，这⾥我们需要的是要切换的课程信息⽤于请求操作

```vue
<el-switch ... @change="onStateChange(scope.row)">
</el-switch>
...
<script>
...
// 上下架按钮操作
async onStateChange (course) {
 // 接收操作的课程对象，并发送请求更改上下架状态
 const { data } = await changeState({
 courseId: course.id,
 status: course.status
 })
 if (data.code === '000000') {
 this.$message.success(`${course.status === 0 ? '下架' :'上架'}成功`)
 }
 }
 }
 }
</script>
```

### 上下架状态优化

<video src="/videos/Listing-status.mp4" controls="controls" loop="loop" height="500"></video>

- 设置完毕，为了避免⽤户在⼀次上下架未完成时频繁点击，可进⾏触发限制。
  - 在请求课程信息后，给每条课程信息对象添加 isStatusLoading 属性。

```js
// list.vue
...
// 加载课程（准备⼯作中设置）
async loadCourses () {
this.isLoading = true
const { data } = await getQueryCourses(this.filterParams)
if (data.code === '000000') {
// 给媒体数据设置属性，标识状态是否处于切换中，默认 false（本⼩节添加的功能）
data.data.records.forEach(item => {
 item.isStatusLoading = false
 })
 // 保存课程信息
 this.courses = data.data.records
 this.totalCount = data.data.total
 this.isLoading = false
 }
 },
 ...
```

- 将属性绑定给 Switch 组件的 disabled 属性，当状态更改过程中，组件⾃动禁⽤。

```vue
// list.vue ...
<el-switch :disabled="scope.row.isStatusLoading" ...>
</el-switch>
...
```

- 最后，在请求操作过程中设置 isStatusLoading 属性值即可。

```js
// list.vue
...
// 上下架按钮操作
async onStateChange (course) {
// 请求发送前，更改课程操作状态
course.isStatusLoading = true
...
if (data.code === '000000') {
...
 // 请求完毕，更改课程操作状态
 course.isStatusLoading = false
 }
 }
 ...
```

## 课程管理

### 布局

- 准备⼯作，在 course/ 中创建 create.vue 组件，并设置路由与 list.vue 点击的跳转操作。
  - 设置 Card 进⾏基础布局。

```vue
// course/create.vue
<template>
  <div class="course-create">
    <el-card>添加课程</el-card>
  </div>
</template>
<script>
export default {
  name: 'CourseCreate',
}
</script>

<style lang="scss" scoped></style>
```

- 添加路由

```js
 // router/index.js
 ...
 {
 path: '/course/create',
 name: 'course-create',
 component: () => import(/* webpackChunkName: 'course-create'*/ '@/views/course/create.vue')
 }
 ]
```

- 点击添加课程进⾏路由跳转

```vue
// course/list.vue ...
<el-button
  style="float: right; margin-top: -10px"
  type="primary"
  @click="$router.push({ name: 'course-create' })">添加课程</el-button>
...
```

### 步骤条布局

<img src="/images/vue/061.gif" style="width: 100%; display:inline-block; margin: 0 ;">

对于功能⽐较多的操作，可以通过步骤条的⽅式引导⽤户操作，增强体验。

这⾥使⽤ Element 的 Steps 步骤条组件处理。

```vue
// Element 官⽅示例：Steps 步骤条 // - active 代表步骤进度，默认为 0
<el-steps :active="1" simple>
<el-step title="步骤 1" icon="el-icon-edit"></el-step>
<el-step title="步骤 2" icon="el-icon-upload"></el-step>
<el-step title="步骤 3" icon="el-icon-picture"></el-step>
</el-steps>
```

- 添加到 create.vue 的头部区域
  - 将 active 动态绑定，以便在操作中更改步骤条进度。

```vue
// create.vue
<template>
  <div class="course-create">
    <el-card>
      <!-- 设置 slot 后 Element 会⾃动设置为上下两部分的布局样式（具有分割线） -->
      <div slot="header">
        <el-steps :active="activeStep" simple>
          <el-step title="基本信息" icon="el-icon-edit"></el-step>
          <el-step title="课程封⾯" icon="el-icon-upload"></el-step>
          <el-step title="销售信息" icon="el-icon-picture"></el-step>
          <el-step title="秒杀信息" icon="el-icon-picture"></el-step>
          <el-step title="课程详情" icon="el-icon-picture"></el-step>
        </el-steps>
      </div>
    </el-card>
  </div>
</template>
...
<script>
...
data () {
return {
// 步骤条进度
activeStep: 0
}
}
}
</script>
```

- 由于步骤条的每部分结构类似，建议将数据保存在 data 中，将结构更改为遍历创建⽅式。

```vue
// create.vue
...
<el-steps :active="activeStep" simple>
<el-step
v-for="(item, i) in steps"
:key="item.id"
:title="item.title"
:icon="item.icon"
></el-step>
 </el-steps>
 ...
 <script>
 export default {
 ...
 steps: [
 { id: 1, title: '基本信息', icon: 'el-icon-edit' },
 { id: 2, title: '课程封⾯', icon: 'el-icon-upload' },
{ id: 3, title: '销售信息', icon: 'el-icon-picture' },
{ id: 4, title: '秒杀信息', icon: 'el-icon-picture' },
{ id: 5, title: '课程详情', icon: 'el-icon-picture' }
]
...
```

- 给不同步骤设置对应的布局容器。
  - 根据 activeStep 设置对应容器显示隐藏
  - 设置下⼀步按钮，点击后切换功能模块
  - 操作到最后⼀步，隐藏下⼀步按钮，并设置提交按钮。

```vue
// create.vue
<el-card>
      <div slot="header">
        <el-steps :active="activeStep" simple>
          <el-step
            v-for="item in steps"
            :key="item.id"
            :title="item.title"
            :icon="item.icon"
          ></el-step>
        </el-steps>
      </div>
      <!-- 步骤对应的表单结构 -->
      <el-form>
        <div v-show="activeStep === 0">基本信息</div>
        <div v-show="activeStep === 1">课程信息</div>
        <div v-show="activeStep === 2">销售信息</div>
        <div v-show="activeStep === 3">秒杀信息</div>
        <div v-show="activeStep === 4">课程详情
        <!-- 最后步骤中设置保存按钮 -->
          <el-form-item>
            <el-button type="primary">保存</el-button>
          </el-form-item>
        </div>
        <!-- 下一步按钮 -->
        <el-form-item v-if="activeStep !== steps.length - 1">
          <el-button @click="activeStep++">下一步</el-button>
        </el-form-item>
      </el-form>
    </el-card>
```

### 步骤条-优化(click 事件添加.native)

<img src="/images/vue/062.gif" style="width: 100%; display:inline-block; margin: 0 ;">

- 点击步骤标题按钮，跳转到对应步骤，并修改⿏标样式。
  - 由于组件没有 click 事件应添加 .native 设置原⽣事件
  - 设置样式，修改⿏标样式

```vue
// create.vue
<div slot="header">
        <el-steps :active="activeStep" simple>
          <el-step
            v-for="(item, index) in steps"
            :key="item.id"
            :title="item.title"
            :icon="item.icon"
            @click.native="activeStep = index"
          ></el-step>
        </el-steps>
      </div>

</script>
<style lang="scss" scoped>
.el-step {
  cursor: pointer;
}
</style>
</style>
```

### 基本信息-布局

#### 布局

<img src="/images/vue/357.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- 完善表单结构（封⾯放到第⼆步骤）
  - 课程排序功能使⽤了 Element 的 InputNumber 计数器组件。

```vue
// create.vue ...
<div v-show="activeStep === 0">
<el-form-item label="课程名称">
<el-input></el-input>
</el-form-item>
<el-form-item label="课程简介">
<el-input></el-input>
</el-form-item>
 <el-form-item label="课程概述">
 <el-input></el-input>
 </el-form-item>
 <el-form-item label="讲师姓名">
 <el-input></el-input>
 </el-form-item>
 <el-form-item label="讲师简介">
 <el-input></el-input>
 </el-form-item>
 <el-form-item label="课程排序">
 <!-- 计数器组件 -->
 <el-input-number
 label="描述⽂字"
 ></el-input-number>
 </el-form-item>
 </div>
...
```

### 课程封面-布局

<img src="/images/vue/358.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

使⽤ Element 中的 [Upload 上传](https://element.eleme.cn/#/zh-CN/component/upload)组件完成。

```vue
// Element 官⽅示例：Upload 上传组件 - ⽤户头像上传 2
<el-upload
  class="avatar-uploader"
  action="https://jsonplaceholder.typicode.com/posts/"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"
>
<img v-if="imageUrl" :src="imageUrl" class="avatar">
<i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>

<script>
export default {
  data() {
    return {
      imageUrl: '',
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图⽚只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图⽚⼤⼩不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
  },
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
```

- 设置到⻚⾯中：
  - action 提交地址
  - show-file-list 展示⽂件列表
  - on-success 成功处理函数
  - before-upload 上传前的处理函数

```vue
// create.vue
...
<!-- 课程封⾯ -->
<div v-show="activeStep === 1">
<el-form-item label="课程封⾯">
<el-upload
class="avatar-uploader"
action="https://jsonplaceholder.typicode.com/posts/"
:show-file-list="false"
 :on-success="handleAvatarSuccess"
 :before-upload="beforeAvatarUpload">
 <img v-if="imageUrl" :src="imageUrl" class="avatar">
 <i v-else class="el-icon-plus avatar-uploader-icon"></i>
 </el-upload>
 </el-form-item>
 <!-- 解锁封⾯ -->
 <el-form-item label="解锁封⾯">
 <el-upload
 class="avatar-uploader"
 action="https://jsonplaceholder.typicode.com/posts/"
 :show-file-list="false"
 :on-success="handleAvatarSuccess"
 :before-upload="beforeAvatarUpload">
 <!-- 显示预览图⽚的元素 -->
 <img v-if="imageUrl" :src="imageUrl" class="avatar">
 <i v-else class="el-icon-plus avatar-uploader-icon"></i>
 </el-upload>
 </el-form-item>
 </div>
 ...
 <script>
 ...
 data () {
 return {
 ...
 // 本地预览图⽚地址
 imageUrl: ''
 }
 },
 methods: {
 // ⽂件上传成功时的钩⼦
 handleAvatarSuccess (res, file) {
 // 保存预览图⽚地址
 this.imageUrl = URL.createObjectURL(file.raw)
 },
 // 上传⽂件之前的钩⼦
 beforeAvatarUpload (file) {
 const isJPG = file.type === 'image/jpeg'
 const isLt2M = file.size / 1024 / 1024 < 2
 if (!isJPG) {
 this.$message.error('上传头像图⽚只能是 JPG 格式!')
 }
 if (!isLt2M) {
 this.$message.error('上传头像图⽚⼤⼩不能超过 2MB!')
 }
 return isJPG && isLt2M
 }
 }
 ...
 <style lang="scss" scoped>
 ...
 .avatar-uploader .el-upload {
 border: 1px dashed #d9d9d9;
 border-radius: 6px;
 cursor: pointer;
 position: relative;
 overflow: hidden;
 }
 .avatar-uploader .el-upload:hover {
 border-color: #409EFF;
 }
 .avatar-uploader-icon {
 font-size: 28px;
 color: #8c939d;
 width: 178px;
 height: 178px;
 line-height: 178px;
 text-align: center;
 }
 .avatar {
 width: 178px;
 height: 178px;
 display: block;
 }
 </style>
```

- 演示效果，发现功能正常，但边框样式未⽣效。
- 分析原因：
  - 样式选择器为 .avatar-uploader .el-upload ， 说明选择器选取的元素已经不存在于 create.vue 组件中，⽽是处于 create.vue 的⼦组件 `<el-upload>` 中。
  - 同时，由于当前组件设置了 scoped ，使样式只作⽤于当前组件中的元素，让选择器⽆效。
    如果未设置 `scoped 时不存在此问题`，但如果两种需求同时存在，该如何操作呢？

::: warning 注意

- 深度作⽤选择器
  - 此部分内容可⻅于 Vue Loader ⽂档中，[深度作⽤选择器](https://vue-loader.vuejs.org/zh/guide/scoped-css.html#深度作用选择器)部分内容。
    :::

如果`希望 scoped 中的某个选择器能够作⽤得更深`，如影响⼦组件样式，就需要使⽤ `>>>` 操作符。

::: warning 注意

- 此写法不是 CSS 语法或预处理器语法，⽽是 Vue 单⽂件组件中提供的⼀种语法。
- `>>>` 与 `/deep/` 和 `::v-deep`功能相同，推荐 `::v-deep` 。
- 官⽅称为深度作⽤选择器，开发⼈员间也简称为样式穿透。
  :::

```vue
// create.vue
<style lang="scss" scoped>
.el-step {
  cursor: pointer;
}
// 只有作⽤于⾮⼦组件根元素的选择器才需要设置 ::v-deep
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
```

### 销售信息布局

- 使⽤ Element 中的 `Input 输⼊框`组件的复合型输⼊框进⾏单位设置。
  - 设置⽅式是通过组件插槽来设置前置或后置内容。

```vue
// Element 官⽅示例：Input 输⼊框组件 - 复合型输⼊框
<el-input placeholder="请输⼊内容" v-model="input2">
<template slot="append">.com</template>
</el-input>
```

- 设置到⻚⾯中并添加细节

```vue
// create.vue ...
<!-- 销售信息 -->
<div v-show="activeStep === 2">
<el-form-item label="售卖价格">
<el-input>
<template slot="append">元</template>
</el-input>
</el-form-item>
 <el-form-item label="商品原价">
 <el-input>
 <template slot="append">元</template>
 </el-input>
 </el-form-item>
 <el-form-item label="销量">
 <el-input>
 <template slot="append">单</template>
 </el-input>
 </el-form-item>
 <el-form-item label="活动标签">
 <el-input></el-input>
 </el-form-item>
 </div>
...
```

### 秒杀活动-布局

```vue
 // create.vue
 ...
 <!-- 秒杀活动 -->
 <div v-show="activeStep === 3">
 <!-- 设置秒杀状态开关 -->
 <el-form-item label="限时秒杀开关" label-width="120px">
 <el-switch
 v-model="isSeckill"
 active-color="#13ce66"
inactive-color="#ff4949">
 </el-switch>
 </el-form-item>
 ...
 data () {
 return {
 ...
 // 秒杀状态
 isSeckill: false
 }
 },
```

- 在切换按钮后设置⼀个 `<template>` ⽤于放置后续结构，并通过 v-if 根据秒杀状态切换。

```vue
// create.vue ...
<div v-show="activeStep === 3">
<!-- 设置秒杀状态开关 -->
<el-form-item label="限时秒杀开关" label-width="120px">
...
</el-form-item>
<template v-if="isSeckill">
<!-- 其他部分的基础结构 -->
 </template>
 </div>
...
```

- 设置后续部分基础结构

```vue
<div v-show="activeStep === 3">
...
<!-- 其他部分的基础结构 -->
<el-form-item label="开始时间">
<el-input></el-input>
</el-form-item>
 <el-form-item label="结束时间">
 <el-input></el-input>
 </el-form-item>
 <el-form-item label="秒杀价">
 <el-input>
 <template slot="append">元</template>
 </el-input>
 </el-form-item>
 <el-form-item label="秒杀库存">
 <el-input>
 <template slot="append">个</template>
 </el-input>
 </el-form-item>
 </div>
...
```

- 开始时间与结束时间应设置为⽇期选择器：
  - 这⾥使⽤ Element 中的 [DateTimePicker ⽇期时间选择器](https://element.eleme.cn/#/zh-CN/component/datetime-picker)组件设置。

```vue
// Element 官⽅示例：DateTimePicker ⽇期时间选择器 - 默认功能
<el-date-picker v-model="value1" type="datetime" placeholder="选择⽇期时间">
</el-date-picker>
```

- 设置到⻚⾯中

```vue
// create.vue ...
<el-form-item label="开始时间">
<!-- <el-input></el-input> -->
<el-date-picker
type="datetime"
placeholder="选择开始时间">
</el-date-picker>
</el-form-item>
<el-form-item label="结束时间">
 <!-- <el-input></el-input> -->
 <el-date-picker
 type="datetime"
 placeholder="选择结束时间">
 </el-date-picker>
 </el-form-item>
...
```

### 课程详情-布局

- 课程详情部分为富⽂本编辑器，这⾥先通过⼀个⽂本域代替即可。

```vue
// create.vue ..
<!-- 课程详情 -->
<div v-show="activeStep === 4">
<el-form-item label="课程详情">
<el-input type="textarea"></el-input>
</el-form-item>
<!-- 最后步骤中设置保存按钮 -->
<el-form-item>
 <el-button type="primary">保存</el-button>
 </el-form-item>
 </div>
...
```

### 基本数据信息绑定

这⾥使⽤保存或者更改课程信息接⼝进⾏操作，[接⼝地址](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/课程/saveOrUpdateCourseUsingPOST)。

```js
// services/course.js
 ...
 // 保存或者更改课程信息
 export const saveOrUpdateCourse = data => {
 return request({
 method: 'POST',
 url: '/boss/course/saveOrUpdateCourse',
 data
 })
}
```

- 引⼊（不使⽤可以暂时注释，避免 ESLint 报错）。

```vue
// create.vue ... import { saveOrUpdateCourse } from '@/services/course' ...
```

- 最终提交时需要提交保存了所有课程信息的对象，这⾥声明对象并创建属性绑定到对应元素上。
  - 由于属性很多，直接从接⼝⽂档中复制即可

```js
data () {
return {
      // 添加课程的相关信息
      course: {
        id: 0,
        courseName: '',
        brief: '',
        teacherDTO: {
          id: 0,
          courseId: 0,
          teacherName: '',
          teacherHeadPicUrl: '',
          position: '',
          description: ''
        },
        courseDescriptionMarkDown: '',
        price: 0,
        discounts: 0,
        priceTag: '',
        discountsTag: '',
        isNew: true,
        isNewDes: '',
        courseListImg: '',
        courseImgUrl: '',
        sortNum: 0,
        previewFirstField: '',
        previewSecondField: '',
        status: 0,
        sales: 0,
        activityCourse: true,
        activityCourseDTO: {
          id: 0,
          courseId: 0,
          beginTime: '',
          endTime: '',
          amount: 0,
          stock: 0
        },
        autoOnlineTime: ''
      }
      }
}
```

- 绑定数据，并进⾏细节处理
  - 概述部分结构改进，样式优化，与计数功能。

```vue
<!-- 基本信息 -->
<div v-show="activeStep === 0">
 <el-form-item label="课程名称">
 <el-input v-model="course.courseName"></el-input>
 </el-form-item>
 <el-form-item label="课程简介">
 <el-input v-model="course.brief"></el-input>
 </el-form-item>
 <!-- 课程概述有两端，修改为两组输⼊框 -->
 <el-form-item label="课程概述">
 <el-input
 v-model="course.previewFirstField"
 placeholder="概述1"
 style="width: 49%;min-width: 300px; margin-right: 15px;"
 >
 <template slot="append">{{ course.previewFirstField.length}}/20</template>
 </el-input>
 <el-input
 v-model="course.previewSecondField"
 placeholder="概述2"
 style="width: 49%;min-width: 300px;"
 >
 <template slot="append">{{ course.previewFirstField.length}}/20</template>
 </el-input>
 </el-form-item>
 <el-form-item label="讲师姓名">
 <el-input v-model="course.teacherDTO.teacherName"></el-input>
 </el-form-item>
 <el-form-item label="讲师简介">
 <el-input v-model="course.teacherDTO.description"></el-input>
 </el-form-item>
 <el-form-item label="课程排序">
 <el-input-number
 v-model="course.sortNum"
 label="描述⽂字"
 ></el-input-number>
 </el-form-item>
 </div>
```

### 上传课程封面-逻辑

- 观察⽂档接⼝发现，接⼝中需要的 courseListImg 与 courseImgUrl 的类型均为 String，代表⼀个服务器的图⽚地址，所以在选取图⽚后要先上传到服务器获取线上地址，在提交时再将这个线上地址发送给接⼝即可。
- 上传图⽚接⼝地址为：[地址](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/课程/uploadUsingPOST)。

```js
 // services/course.js
 ...
 // 上传图⽚
 export const uploadCourseImage = (data, onUploadProgress) => {
 // 接⼝要求的请求数据类型为：multipart/form-data
 // 所以需要提交 FormData 数据对象
 return request({
 method: 'POST',
 url: '/boss/course/upload',
data
})
}
```

- 引⼊到⻚⾯中（不⽤可以暂时注释，⽤的时候再打开）

```
// create.vue
...
import { uploadCourseImage } from '@/services/course'
...
```

- 要进⾏图⽚上传，⽅式有两种：
  - ⽅式⼀：Element 的 Upload 组件⽀持⾃动上传，根据⽂档中的 Attribute 进⾏对应属性配置即可。
    - 通过属性⽅式设置，属性很多，配置较为繁琐（看喜好）
    - 但由于 Element 内部不是通过 Axios 发送请求，所以 Token 信息还需单独设置。
  - ⽅式⼆：⾃定义上传（推荐）
    - Upload 组件提供了 http-request 属性⽤于覆盖默认的上传⾏为，⽤于实现⾃定义上传。
      - 设置处理函数，组件取消⾃动上传了，同时将上传⽂件的信息通过参数 option 传⼊。
        - options.file 为选择的⽂件信息，通过 FormData 发送处理

```js
 // ⾃定义⽂件上传操作
 async handleUpload (options) {
 // 创建 FormData 对象保存数据
 const fd = new FormData()
 // 添加数据的键要根据接⼝⽂档设置
 fd.append('file', options.file)
 // 发送请求
 const { data } = await uploadCourseImage(fd)
 if (data.code === '000000') {
 // 图⽚预览为组件在 on-success 时设置的本地预览功能
 // 默认检测 imgUrl, 这⾥更换为 course中对应地址即可
 // before-upload ⽤于在上传⽂件前进⾏规则校验（例如⽂件格式与⼤⼩，可⾃⾏调整）
 // data.data.name 为服务器提供的地址
 this.course.courseListImg = data.data.name
 // 提示
 this.$message.success('上传成功')
 }
 }
```

```vue
<!-- ⾃定义上传 -->
<el-upload ...>
<!-- 图⽚预览修改为当前Upload对应数据 -->
<img v-if="course.courseListImg" :src="course.courseListImg" class="avatar">
<i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
```

### 封装图片上传组件

- 多个位置都需要进⾏图⽚上传，可封装为组件便于复⽤。

```vue
<template>
  <div class="course-image">
    <!-- 将上传功能结构放⼊ -->
    <el-form-item label="课程封⾯">
      <!-- ⾃定义上传 -->
      <el-upload
        class="avatar-uploader"
        action=""
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :http-request="handleUpload"
      >
        <!-- 图⽚预览修改为当前Upload对应数据 -->
        <img
          v-if="course.courseListImg"
          :src="course.courseListImg"
          class="avatar"
        />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
  </div>
</template>

<script>
// 引⼊上传图⽚接⼝（⽗组件可以删除对应代码）
import { uploadCourseImage } from '@/services/course'

export default {
  name: 'CourseImage',
  methods: {
    // ⽂件上传成功时的钩⼦
    handleAvatarSuccess(res, file) {
      // 保存预览图⽚地址
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    // 上传⽂件之前的钩⼦
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图⽚只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图⽚⼤⼩不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // ⾃定义⽂件上传操作
    async handleUpload(options) {
      // 创建 FormData 对象保存数据
      const fd = new FormData()
      // 添加数据的键要根据接⼝⽂档设置
      fd.append('file', options.file)
      // 发送请求
      const { data } = await uploadCourseImage(fd)
      if (data.code === '000000') {
        // 图⽚预览为组件在 on-success 时设置的本地预览功能
        // 默认2个上传功能都是检测 imgUrl，可分别设置（后续会封装功能，此处不处理）
        // before-upload ⽤于在上传⽂件前进⾏规则校验（例如⽂件格式与⼤⼩，可⾃⾏调整）

        // data.data.name 为服务器提供的地址
        this.course.courseListImg = data.data.name
        // 提示
        this.$message.success('上传成功')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
// 只有作⽤于⾮⼦组件根元素的选择器才需要设置 ::v-deep
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
```

- 引⼊到 create.vue 中

```js
// create.vue
...
// 引⼊图⽚上传组件
import CourseImage from './components/course-image'
export default {
name: 'CourseCreate',
components: {
CourseImage
 },
 ...
```

- 使⽤组件⽅式：
  - ⼦组件需要使⽤⽗组件中上传的⽂件数据进⾏上传与预览（⽗传⼦、传⼊）
  - ⽗组件需要使⽤⼦组件上传后的线上地址⽤于提交（⼦传⽗、传出）
- 这时可以通过 v-model 对组件进⾏数据操作（v-model ⽤于组件操作的本质）
  - 给⼦组件传递 value 数据，⼦组件需要通过 props 接收。
  - 默认监听⼦组件的 input 事件，⼦组件需要触发⾃定义事件并传值。

```vue
// create.vue ...
<!-- 课程封⾯图上传 -->
<course-image v-model="course.courseListImg"></course-image>
<!-- 解锁封⾯图上传 -->
<course-image v-model="course.courseImgUrl"></course-image>
...
```

```vue
// course-image.vue
...
<!-- 封装组件后，使⽤的数据更改为 value -->
<img v-if="value" :src="value" class="avatar">
...
<script>
...
props: {
// 接收⽗组件数据
 value: {
 type: String
 }
 },
 data () {
 return {
 imageUrl: ''
 }
 },
 ...
 // ⾃定义⽂件上传操作
 async handleUpload (options) {
 ...
 if (data.code === '000000') {
 // 上传成功后，将数据通过⾃定义事件传递给⽗组件
 // this.course.courseListImg = data.data.name
 this.$emit('input', data.data.name)
 ...
 }
 }
 </script>
```

- 封装组件时，除了可以通过传值设置必选数据外，还可以通过传参增强组件的使⽤灵活性，这⾥演示通过传参定制上传⽂件⼤⼩。

```js
 // course-image.vue
 ...
 props: {
 ...
 // 限制上传⼤⼩
 limit: {
 type: Number,
 default: 2
 }
 },
 ...
 // 上传⽂件之前的钩⼦
 beforeAvatarUpload (file) {
 ...
 const isLt2M = file.size / 1024 / 1024 < this.limit
 if (!isJPG) {
 this.$message.error('上传头像图⽚只能是 JPG 格式!')
 }
 if (!isLt2M) {
 this.$message.error(`上传头像图⽚⼤⼩不能超过 ${this.limit}MB!`)
 }
 return isJPG && isLt2M
 },
 ...
```

- 使⽤组件时传⼊不同参数定制（如找不到⼤图，可将单位修改为 KB 进⾏测试）

```vue
// create.vue ...
<!-- 课程封⾯图上传 -->
<course-image v-model="course.courseListImg" :limit="2"></course-image>
<!-- 解锁封⾯图上传 -->
<course-image v-model="course.courseImgUrl" :limit="5"></course-image>
...
```

### 图片上传-进度条

Upload 组件⾃带上传进度功能，但我们并没有使⽤对应的结构，这时需要⾃⾏设置。
这⾥使⽤ Element 中 [Progress 进度条](https://element.eleme.cn/#/zh-CN/component/progress)组件的环形进度条功能。

```vue
// Element 官⽅示例：Progress 进度条组件 - 环形进度条（下图为对应效果示意图）
<el-progress type="circle" :percentage="0"></el-progress>
<el-progress type="circle" :percentage="25"></el-progress>
<el-progress type="circle" :percentage="100" status="success"></el-progress>
<el-progress type="circle" :percentage="70" status="warning"></elprogress>
<el-progress type="circle" :percentage="50" status="exception"></el-progress>
```

<img src="/images/vue/362.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- 将 Progress 组件设置到 Upload 同级，并调整尺⼨（根据 Upload 在 style 中预设宽度设置即可）。
  - width 需要 Number，设置 String 时 Vue 会进⾏警告。

```vue
// course-image.vue
...
<!-- 进度条组件 -->
<el-progress
type="circle"
:percentage="0"
:width="178"
></el-progress>
<!-- 上传组件 -->
 <el-upload ... >
 ...
```

- 根据上传情况，应显示两个组件之⼀，这⾥通过⼀个属性控制两个组件的显示情况。

```vue
 // course-image.vue
 ...
 <script>
 ...
 data () {
 return {
 ...
 // 保存下载状态
 isUploading: false
 }
 },
 ...
 async handleUpload (options) {
 // 设置进度信息展示
 this.isUploading = true
 ...
 if (data.code === '000000') {
 ...
 // 关闭进度信息展示
 this.isUploading = false
 }
 }
 ..
 </script>
 ...
 <!-- 进度条组件 -->
 <el-progress
 v-if="isUploading"
 ...
 ></el-progress>
 <!-- 上传组件 -->
 <el-upload
 v-else
 ...
 >
 ...
```

### 进度百分比显示

<img src="/images/vue/063.gif" style="width: 100%; display:inline-block; margin: 0 ;">

- Upload 组件⾃身具有上传进度处理的 on-progress 属性（⻅⽂档），但设置 http-request 进⾏⾃定义上传后，这个属性就⽆效了。
- 这时我们可以通过 Axios 的请求配置项 onUploadProgress 进⾏进度监测，onUploadProgress 本质是对 H5 的 xhr.upload.onprogress 的封装。

```js
 // services/course.js
 ...
 // 上传图⽚（添加配置项与参数）
 export const uploadCourseImage = (data, onUploadProgress) => {
 return request({
 method: 'POST',
 url: '/boss/course/upload',
 data,
 // Axios 将 HTML5 新增的上传进度事件：progress
 onUploadProgress (event) {
 console.log(event.loaded, event.total)
 }
 })
 }
```

- 将 onUploadProgress 设置为参数

```js
 // services/course.js
 ...
 // 上传图⽚（添加配置项与参数）
export const uploadCourseImage = (data, onUploadProgress) => {
  // data 应当为FormData 对象
  return request({
    method: 'POST',
    url: '/boss/course/upload',
    data,
    onUploadProgress
    // Axios 将 HTML5 新增的上传进度事件：progress
    // onUploadProgress (event) {
    //   console.log(event.total, event.loaded)
    // }
  })
}
```

- 上传请求时传⼊进度处理回调，计算百分⽐并保存到 data 中

```vue
// course-image.vue ... data () { return { ... // 保存上传进度百分⽐ precentage:
0 } }, ... async handleUpload (options) { ... // 设置进度回调，进⾏百分⽐计算
const { data } = await uploadCourseImage(fd, (event) => { this.precentage =
Math.floor(event.loaded / event.total * 100 }) ... }
```

- 最后将数据绑定给 el-progress 组件即可。

```vue
// course-image.vue ...
<el-progress ... :percentage="precentage"></el-progress>
...
```

- 绑定后上传可以正常显示进度，但如果重复上传时进度会出现‘回退’的现象，可以在上传完毕后将 precentage 设置归零即可。

```js
 // course-image.vue
 ...
 async handleUpload (options) {
 ...
 if (data.code === '000000') {
 ...
 // 上传成功后，设置进度信息归零，避免下次上传出现回退效果
 this.precentage = 0
 }
}
 ...
```

- 最后可以给进度组件设置 status 以区分上传的不同状态。

```vue
// course-image.vue ...
<el-progress
  ...
  :status="precentage === 100 ? 'success' : undefined"
></el-progress>
...
```

### 销售数据绑定

<img src="/images/vue/064.gif" style="width: 100%; display:inline-block; margin: 0 ;">

- 销售信息部分较为简单，进⾏数据绑定与组件类型调整即可
  - 给 el-input 设置 type="number" 限制输⼊内容类型
  - 最⼩数值为 0
  - 绑定数据

```vue
// create.vue ...
<!-- 销售信息 -->
<div v-show="activeStep === 2">
 <el-form-item label="售卖价格">
 <el-input
 type="number"
 v-model="course.discounts"
 :min="0"
>
<template slot="append">元</template>
</el-input>
</el-form-item>
<el-form-item label="商品原价">
<el-input
type="number"
v-model="course.price"
:min="0"
>
<template slot="append">元</template>
</el-input>
</el-form-item>
<el-form-item label="销量">
<el-input
type="number"
v-model="course.sales"
:min="0"
>
<template slot="append">单</template>
</el-input>
</el-form-item>
<el-form-item label="活动标签">
<el-input
v-model="course.discountsTag"
></el-input>
</el-form-item>
</div>
...
```

### 秒杀数据绑定

- 定数据，并修改部分绑定信息。
  - isSeckill 更换为 course.activityCourse 并设置初始值为 false
  - 设置类型、最⼩值，并绑定剩余数据

```
 // create.vue
 ...
 <!-- 秒杀活动 -->
 <div v-show="activeStep === 3">
 <!-- 设置秒杀状态开关 -->
 <el-form-item label="限时秒杀开关" label-width="120px">
 <el-switch
 v-model="course.activityCourse"
 active-color="#13ce66"
 inactive-color="#ff4949">
 </el-switch>
 </el-form-item>
 <template v-if="course.activityCourse">
 <!-- 其他部分的基础结构 -->
 <el-form-item label="开始时间">
 <!-- <el-input></el-input> -->
 <el-date-picker
 v-model="course.activityCourseDTO.beginTime"
 type="datetime"
 placeholder="选择开始时间">
 </el-date-picker>
 </el-form-item>
 <el-form-item label="结束时间">
 <!-- <el-input></el-input> -->
 <el-date-picker
 v-model="course.activityCourseDTO.endTime"
 type="datetime"
 placeholder="选择结束时间">
 </el-date-picker>
 </el-form-item>
 <el-form-item label="秒杀价">
 <el-input
 v-model="course.activityCourseDTO.amount"
 type="number"
 :min="0"
 >
 <template slot="append">元</template>
 </el-input>
 </el-form-item>
 <el-form-item label="秒杀库存">
 <el-input
 v-model="course.activityCourseDTO.stock"
 type="number"
 :min="0"
 >
 <template slot="append">个</template>
 </el-input>
 </el-form-item>
 </template>
 </div>
 ...
 data () {
 return {
 ...
 course: {
 ...
 activityCourse: false,
 ...
 }
 }
 },
 ...
```

### 保存功能

- ⾸先对课程详情部分进⾏数据绑定。

```vue
// create.vue ...
<div v-show="activeStep === 4">
 <el-form-item label="课程详情">
 <el-input
 type="textarea"
 v-model="course.courseDescriptionMarkDown"
 ></el-input>
 </el-form-item>
...
</div>
...
```

- 给保存按钮设置点击事件，点击后提交

```vue
// create.vue ...
<el-form-item>
 <el-button
 type="primary"
 @click="handleSave"
 >保存</el-button>
 </el-form-item>
... methods: { // 保存 handleSave () { console.log('保存') } }
```

- 由于当前为新增功能，需要将 data.course 中与 id 相关的数据去除，id 相关功能为编辑使⽤，后续再处
  理。

```js
 // create.vue
 ...
 data () {
 return {
 ...
 course: {
 // id: 0,
 courseName: '',
 brief: '',
 teacherDTO: {
 // id: 0,
 // courseId: 0,
 teacherName: '',
 teacherHeadPicUrl: '',
 position: '',
 description: ''
 },
 courseDescriptionMarkDown: '',
 price: 0,
 discounts: 0,
 priceTag: '',
 discountsTag: '',
 isNew: true,
 isNewDes: '',
 courseListImg: '',
 courseImgUrl: '',
 sortNum: 0,
 previewFirstField: '',
 previewSecondField: '',
 status: 0,
 sales: 0,
 activityCourse: false,
 activityCourseDTO: {
 // id: 0,
 // courseId: 0,
 beginTime: '',
 endTime: '',
 amount: 0,
 stock: 0
 },
 autoOnlineTime: ''
 }
 }
 },
 ...
```

- 点击按钮时将 course 通过之前封装的 saveOrUpdateCourse ⽅法发送。

```js
 // create.vue
 ...
 async handleSave () {
 // 发送请求
 const { data } = await saveOrUpdateCourse(this.course)
 if (data.code === '000000') {
 this.$message.success('添加课程成功')
 }
 }
 ...
```

- 添加成功，但⽆法直接从前台看到，因为课程默认为未上架，需要会在课程列表中上架后才能在前台看到。
  - 默认值通过 course.status 控制，默认值 0 代表默认不上架，1 为上架。
  - 如果希望操作⽅便，可以添加⼀个 Switch 组件控制当前课程的上下架状态。

```vue
// create.vue ...
<!-- 课程详情 -->
<div v-show="activeStep === 4">
<el-form-item label="课程详情"> ... </el-form-item>
<!-- 增加上架开关 -->
<el-form-item label="是否上架">
<el-switch
v-model="course.status"
 :active-value="1"
 :inactive-value="0"
 active-color="#13ce66"
 inactive-color="#ff4949">
 </el-switch>
 </el-form-item>
 <el-form-item>
 <el-button ...>保存</el-button>
 </el-form-item>
 </div>
...
```

- 测试后添加成功，设置调整列表⻚。
  - 注意⼩细节，由于后端接⼝不⽀持秒杀时间中的时分秒选择，测试时只选择⽇期即可，或设置
  - type="date" 改为 [DatePicker ⽇期选择器](https://element.eleme.cn/#/zh-CN/component/date-picker)组件。（但注意实际功能中应为⽇期与时间均可选）

```js
// create.vue
...
async handleSave () {
...
if (data.code === '000000') {
this.$router.push({ name: 'course' })
this.$message.success('添加课程成功')
}
}
 ...
```

### 富文本编辑器

- 由于普通 textarea 没有格式，当我们需要输⼊⼤段⽂本内容时⼗分不友好，这时可以通过富⽂本编辑器来
- 输⼊有格式的⽂本内容。
  - 使⽤起来接近⽇常使⽤的⽂档形式，可⽀持类似 word、md 操作⽅式。
  - 本质为插件将输⼊内容⾃动通过不同标签组织起来，最终⽣成带有标签的⽂本。
- 常⻅的富⽂本编辑器有：(各有优缺点，建议优先根据维护性选择，相同时看喜好)
- [ckeditor](https://github.com/ckeditor/ckeditor5)
- [quill](https://github.com/quilljs/quill)
- [wangEditor v4](https://www.wangeditor.com/v4/)
- [ueditor](https://github.com/fex-team/ueditor)
- [tinymce](https://github.com/tinymce/tinymce)
  这⾥以 wangEditor 使⽤为例进⾏功能处理

#### 安装

```sh
npm install wangeditor -S
```

#### 使用

根据⽂档操作即可

```js
import E from 'wangeditor'
const editor = new E('#div1')
editor.create()
```

### 封装富文本编辑器组件

- 这⾥我们将富⽂本编辑器封装为公⽤的公共组件，以便复⽤。
  - 如果以后要统⼀配置富⽂本编辑器或更换其他富⽂本编辑器，只需对公共组件操作即可。

```vue
// src/components/TextEditor/index.vue --- 公共组件⽬录
<template>
  <div ref="editor" class="text-editor"></div>
</template>
<script>
// 引⼊富⽂本编辑器
import E from 'wangeditor'
export default {
  name: 'TextEditor',
  // 由于需要进⾏ DOM 操作，使⽤ mounted 钩⼦
  mounted() {
    // 初始化富⽂本编辑器
    this.initEditor()
  },
  methods: {
    initEditor() {
      // 创建富⽂本编辑器实例
      const editor = new E(this.$refs.editor)
      // 初始化富⽂本编辑器
      editor.create()
    },
  },
}
</script>
<style lang="scss" scoped></style>
```

- 在需要的⻚⾯中引⼊测试。

```js
// create.vue
...
// 引⼊公共组件
import TextEditor from '@/components/TextEditor/index'
...
// 注册为⼦组件
components: {
...
TextEditor
 },
 ...
 // 在课程详情中设置
 <el-form-item label="课程详情">
 <!-- <el-input
 type="textarea"
 v-model="course.courseDescriptionMarkDown"
 ></el-input> -->
 <text-editor></text-editor>
 </el-form-item>
```

- 绑定数据

```vue
// create.vue ...
<text-editor v-model="course.courseDescriptionMarkDown"></text-editor>
...
```

- ⽗组件使⽤ v-model 后，公共组件需要接收。

```js
// TextEditor/index.vue
...
props: {
value: {
type: String,
default: ''
}
},
...
```

- 如果⽗组件使⽤时希望给编辑器设置初始值（例如提示信息），这⾥通过⽅法设置
  - 测试时，修改⽗组件的 course.courseDescriptionMarkDown 的初始值。

```vue
// TextEditor/index.vue ... // 由于需要进⾏ DOM 操作，使⽤ mounted 钩⼦ mounted
() { // 初始化富⽂本编辑器 this.initEditor() }, methods: { initEditor () { ...
// 初始化后设置内容 editor.txt.html(this.value) } } ...
```

- 当富⽂本编辑器输⼊完毕需要提交时，需要将内容传出给⽗组件，这时使⽤编辑器提供的⽅法操作。
- [onchange](http://www.wangeditor.com/doc/pages/04-回调函数/01-onchange.html) 回调⽤于在内容改变时触发。
- 回调必须设置在 editor.create() 前，否则编辑器已经创建完毕，设置⽆效。
- 通过组件⾃定义事件传出给⽗组件的 v-model 绑定。

```js
 // TextEditor/index.vue
 ...
 methods: {
 initEditor () {
 const editor = new E(this.$refs.editor)
 // 设置回调
 editor.config.onchange = function (value) {
 // value 为输⼊的内容，通过⾃定义事件传出即可 (注意 this 指向，建议使⽤箭头函数)
 this.$emit('input', value)
}
editor.create()
editor.txt.html(this.value)
}
 }
```

### 富⽂本编辑器图片上传处理

<img src="/images/vue/065.gif" style="width: 100%; display:inline-block; margin: 0 ;">

wangEditor 默认⽀持图⽚上传，可通过“⽹络图⽚”选项的输⼊线上图⽚地址处理。

如果经常需要⽤户选择本地图⽚，⼯具提供了接⼝处理⽅式⾃动上传图⽚获取地址的功能（⻅⽂档），但

功能对服务器响应格式有要求，或⾃⾏通过属性进⾏信息配置，较为繁琐。

这⾥通过⼯具中的[⾃定义上传](http://www.wangeditor.com/doc/pages/07-上传图片/11-自己实现上传功能.html)处理。

```js
// WangEditor 官⽅示例 - ⾃⼰实现上传图⽚
editor.config.customUploadImg = function (resultFiles, insertImgFn
{
// resultFiles 是 input 中选中的⽂件列表
// insertImgFn 是获取图⽚ url 后，插⼊到编辑器的⽅法
```

- 设置到⻚⾯中观察，图⽚菜单多出了上传图⽚选项，选择⽂件后触发 customUploadImg 回调。
  - 参数 1 resultFiles 为⽂件信息所在数组，上传时取出数据发送即可。
  - 参数 2 insertImgFn 为上传完毕接收到地址后，根据图⽚地址⽣成 img 标签并插⼊到富⽂本编辑器时使⽤。
    这⾥引⼊之前封装的图⽚上传函数，并进⾏处理。

```js
 // TextEditor/index.vue
 ...
 // 引⼊⽂件上传接⼝
 import { uploadCourseImage } from '@/services/course'
 ...
 initEditor () {
 ...
 // 配置 ⾃定义上传图⽚ 功能
 editor.config.customUploadImg = async function (resultFiles, insertImgFn) {
 // 发送请求（参数需要 FormData 类型）
 const fd = new FormData()
 fd.append('file', resultFiles[0])
 const { data } = await uploadCourseImage(fd)
 if (data.code === '000000') {
 // 根据地址创建 img 并插⼊到富⽂本编辑器
 insertImgFn(data.data.name)
 }
 }
 ...
 }
 ...
```

### 编辑组件

<img src="/images/vue/066.gif" style="width: 100%; display:inline-block; margin: 0 ;">

#### 抽离组件

由于编辑于新增类似，同样将内容封装到新创建的 course/components/create-or-edit.vue 组件中

::: warning 注意
引⼊组件时，由于位置改变，需要将 CourseImage 的路径修改为同级⽬录。
:::

```vue
<!--  -->
<template>
  <div class="course-create">
    <el-card>
      <div slot="header">
        <el-steps :active="activeStep" simple>
          <el-step
            v-for="(item, index) in steps"
            :key="item.id"
            :title="item.title"
            :icon="item.icon"
            @click.native="activeStep = index"
          ></el-step>
        </el-steps>
      </div>
      <!-- 步骤对应的表单结构 -->
      <el-form label-width="80px">
        <!-- 基本信息 -->
        <div v-show="activeStep === 0">
          <el-form-item label="课程名称">
            <el-input v-model="course.courseName"></el-input>
          </el-form-item>
          <el-form-item label="课程简介">
            <el-input v-model="course.brief"></el-input>
          </el-form-item>
          <el-form-item label="课程概述">
            <el-input
              v-model="course.previewFirstField"
              placeholder="概述1"
              style="width: 49%; min-width: 300px; margin-right: 15px"
            >
              <template slot="append"
                >{{ course.previewFirstField.length }}/20</template
              >
            </el-input>
            <el-input
              v-model="course.previewSecondField"
              placeholder="概述2"
              style="width: 49%; min-width: 300px"
            >
              <template slot="append"
                >{{ course.previewFirstField.length }}/20</template
              >
            </el-input>
          </el-form-item>
          <el-form-item label="讲师姓名">
            <el-input v-model="course.teacherDTO.teacherName"></el-input>
          </el-form-item>
          <el-form-item label="讲师简介">
            <el-input v-model="course.teacherDTO.description"></el-input>
          </el-form-item>
          <el-form-item label="课程排序">
            <el-input-number
              label="描述文字"
              controls-position="right"
              v-model="course.sortNum"
            ></el-input-number>
          </el-form-item>
        </div>
        <!-- 课程封⾯ -->
        <div v-show="activeStep === 1">
          <!-- 封装为图片上传组件 -->
          <course-image
            v-model="course.courseListImg"
            :label="'课程封面'"
            :limit="3"
          ></course-image>
          <course-image
            v-model="course.courseImgUrl"
            :label="'解锁封面'"
            :limit="5"
          ></course-image>
        </div>
        <!-- 销售信息 -->
        <div v-show="activeStep === 2">
          <el-form-item label="售卖价格">
            <el-input v-model="course.discounts" type="number" :min="0">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品原价">
            <el-input v-model="course.price" type="number" :min="0">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="销量">
            <el-input v-model="course.sales" type="number" :min="0">
              <template slot="append">单</template>
            </el-input>
          </el-form-item>
          <el-form-item label="活动标签">
            <el-input v-model="course.discountsTag"></el-input>
          </el-form-item>
        </div>
        <div v-show="activeStep === 3">
          <!-- 设置秒杀状态开关 -->
          <el-form-item label="限时秒杀开关" label-width="120px">
            <el-switch
              v-model="course.activityCourse"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
          <template v-if="course.activityCourse">
            <!-- 其他部分的基础结构 -->

            <el-form-item label="开始时间">
              <el-date-picker
                v-model="course.activityCourseDTO.beginTime"
                type="datetime"
                placeholder="选择开始时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="course.activityCourseDTO.endTime"
                type="datetime"
                placeholder="选择结束时间"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="秒杀价">
              <el-input
                v-model="course.activityCourseDTO.amount"
                type="number"
                :min="0"
              >
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="秒杀库存">
              <el-input v-model="course.activityCourseDTO.stock">
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
          </template>
        </div>
        <div v-show="activeStep === 4">
          <el-form-item label="课程详情">
            <text-editor
              v-model="course.courseDescriptionMarkDown"
            ></text-editor>
          </el-form-item>
          <el-form-item label="是否上架">
            <el-switch
              v-model="course.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </el-form-item>
          <!-- 最后步骤中设置保存按钮 -->
          <el-form-item>
            <el-button type="primary" @click="handleSave">保存</el-button>
          </el-form-item>
        </div>
        <!-- 下一步按钮 -->
        <el-form-item v-if="activeStep !== steps.length - 1">
          <el-button @click="activeStep++">下一步</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { saveOrUpdateCourse } from '@/services/course'
// 引⼊图⽚上传组件（单独封装 create-or-edit.vue 后，修改为同级⽬录）
import CourseImage from './CourseImage.vue'
// 引⼊公共组件
import TextEditor from '@/components/TextEditor/index'

// 图片上传
export default {
  name: 'CourseCreate',
  props: {},
  components: {
    CourseImage,
    TextEditor,
  },
  data() {
    return {
      // 步骤的进度
      activeStep: 0,
      // 步骤条的相关信息
      steps: [
        {
          id: 1,
          title: '基本信息',
          icon: 'el-icon-edit',
        },
        {
          id: 2,
          title: '课程信息',
          icon: 'el-icon-upload',
        },
        {
          id: 3,
          title: '销售信息',
          icon: 'el-icon-picture',
        },
        {
          id: 4,
          title: '秒杀信息',
          icon: 'el-icon-picture',
        },
        {
          id: 5,
          title: '课程详情',
          icon: 'el-icon-picture',
        },
      ],
      // 本地预览图⽚地址
      imageUrl: '',
      // 添加课程的相关信息
      // - 将数据中与ID相关的数据去除，因为是编辑功能使用的
      course: {
        // id: 0,
        courseName: '',
        brief: '',
        teacherDTO: {
          // id: 0,
          // courseId: 0,
          teacherName: '',
          teacherHeadPicUrl: '',
          position: '',
          // 讲师简介
          description: '',
        },
        // 课程详情内容
        courseDescriptionMarkDown: '',
        // 商品原价
        price: 0,
        // 售卖价格
        discounts: 0,
        // 活动标签
        priceTag: '',
        discountsTag: '',
        isNew: true,
        isNewDes: '',
        // 课程封面地址
        courseListImg: '',
        // 解锁封面地址
        courseImgUrl: '',
        // 课程排序
        sortNum: 0,
        // 概述1
        previewFirstField: '',
        // 概述2
        previewSecondField: '',
        // 上架状态，默认值0 代表不上架，1 代表上架
        status: 0,
        // 销量
        sales: 0,
        // 参与秒杀活动的课程
        activityCourse: true,
        activityCourseDTO: {
          // id: 0,
          // courseId: 0,
          // 秒杀活动开始时间
          beginTime: '',
          // 秒杀活动结束时间
          endTime: '',
          // 活动秒杀价格
          amount: 0,
          // 秒杀库存
          stock: 0,
        },
        autoOnlineTime: '',
      },
    }
  },
  // 组件的初始化操作
  mounted() {},
  methods: {
    async handleSave() {
      const { data } = await saveOrUpdateCourse(this.course)
      // console.log(data)
      if (data.code === '000000') {
        this.$message.success('添加课程成功')
        this.$router.push({
          name: 'course',
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.el-step {
  cursor: pointer;
}
</style>
```

- 更改后的 create.vue

```vue
// course/create.vue
<template>
  <div class="course-create">
    <create-or-edit></create-or-edit>
  </div>
</template>

<script>
import CreateOrEdit from './components/create-or-edit'

export default {
  name: 'CourseCreate',
  components: {
    CreateOrEdit,
  },
}
</script>

<style lang="scss" scoped></style>
```

#### 编辑组件

创建并设置 edit.vue，并给 create-or-edit.vue 绑定 is-edit 属性标记为编辑功能。

```vue
// course/edit.vue
<template>
  <div class="course-edit">
    <create-or-edit is-edit></create-or-edit>
  </div>
</template>

<script>
import CreateOrEdit from './components/CreateOrEdit.vue'

export default {
  name: 'CourseEdit',
  components: {
    CreateOrEdit,
  },
}
</script>

<style lang="scss" scoped></style>
```

- 置路由，并设置按钮点击跳转。
  - 由配置通过 props 解耦
  - 件通过 props 接收动态路由参数
  - 击编辑按钮跳转，同时通过作⽤域插槽接收并设置参数

```js
// router/index.js
...
{
path: '/course/:courseId/edit',
name: 'course-edit',
component: () => import(/* webpackChunkName: 'course-edit' */'@/views/course/edit.vue'),
props: true
}
]
```

```js
// course/edit.vue
...
props: {
courseId: {
type: [String, Number],
required: true
}
},
...
```

```vue
// course/list.vue ...
<template slot-scope="scope">
  <el-button
    @click="
      $router.push({
        name: 'course-edit',
        params: {
          courseId: scope.row.id,
        },
      })
    "
    >编辑</el-button
  >
  <el-button>内容管理</el-button>
</template>
...
```

测试编辑按钮操作是否可以正确跳转，成功。

将路由参数 courseId 传递给⼦组件

```vue
// edit.vue ...
<!-- 将 props 的数据传递给⼦组件 -->
<create-or-edit is-edit :courseId="courseId"></create-or-edit>
...
```

- create-or-edit 组件接收⽗组件传值并进⾏处理。
  - courseId ⽆需设置默认值，因为添加时没有 id

```js
 // create-or-edit.vue
 ...
 props: {
 isEdit: {
 type: Boolean,
 default: false
 },
 courseId: {
 type: [String, Number]
 }
 },
 ...
```

- 在 created 中根据 id 请求被编辑项的数据。

```js
 // create-or-edit.vue
 ...
 created () {
 if (this.isEdit) {
 // 编辑时，加载课程内容
 this.loadCourse()
 }
 },
 methods: {
 loadCourse () {

 },
 ...
 }
 ...
```

- 封装通过课程 Id 获取课程信息的接⼝功能，[地址](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/课程/getCourseByIdUsingGET)。

```js
 // services/course.js
 ...
 // 通过课程Id获取课程信息
 export const getCourseById = courseId => {
 return request({
 method: 'GET',
 url: '/boss/course/getCourseById',
 params: {
 courseId
 }
 })
 }
```

- 引⼊使⽤

```js
 // create-or-edit.vue
 ...
 import { saveOrUpdateCourse, getCourseById } from '@/services/course'
 ...
 async loadCourse () {
 const { data } = await getCourseById(this.courseId)
 if (data.code === '000000') {
 // 将要编辑的分类数据保存到 course 中
 this.course = data.data
}
},
```

### 改进编辑功能

#### 保存功能改进

```js{7}
// src\views\course\components\CreateOrEdit.vue
    // 保存功能
    async handleSave () {
      const { data } = await saveOrUpdateCourse(this.course)
      console.log(data.code)
      if (data.code === '000000') {
        this.$message.success(`${this.isEdit ? '编辑' : '添加'}课程成功`)
        this.$router.push({
          name: 'course'
        })
      }
    }
  }
```

#### 图⽚上传组件改进（未设置本地预览时⽆需此步骤）

- 测试后发现，课程封⾯图⽆法显示，需要在 course-image 中判断是否传⼊图⽚。
  - 新增：value 为空，imageUrl 为空，选择后 imageUrl 为预览地址
  - 编辑：value 为地址，imageUrl 为空，选择后均有值，但应显示 imageUrl。
- 上述代码较复杂，应通过计算属性设置。

```vue
 // course/components/course-images.vue
 ...
 computed: {
 previewUrl () {
 // 有 imageUrl 优先使⽤，没有时使⽤ value，都没有返回 undefined
 return this.imageUrl || this.value
 }
 },
 ...
 <!-- 替换原来的 imageUrl 即可 -->
 <img v-if="previewUrl" :src="previewUrl" class="avatar">
```

#### 秒杀细节改进

- 问题 2，如果编辑的课程未处于秒杀状态，则响应数据的 activityCourseDTO 为 null，这时操作秒杀按钮读取内部数据就会报错，这时添加检测，如果⾮秒杀状态，将 activityCourseDTO 对象属性初始化即可。
  - activityCourse 为当前课程是否开启秒杀，布尔值，⽤于判断。
  - 注意，设置秒杀开始时间为今⽇以后⽆法⽴刻看到测试效果，这不是 bug。

```js
 // create-or-edit.vue
 ...
 async loadCourse () {
 const { data } = await getCourseById(this.courseId)
 if (data.code === '000000') {
 // 为⾮秒杀课程初始化属性
 if (!data.data.activityCourse) {
 data.data.activityCourseDTO = {
 beginTime: '',
endTime: '',
amount: 0,
stock: 0
}
}
this.course = data.data
}
},
```

## 课程内容管理

- 课程内容管理指的是前台课程详情中课程⽬录的内容管理，内容中包含章节与课时部分（对应课程视频）。
- 后台通过 课程管理 -> 指定课程 -> 内容管理 操作。
- 创建组件并配置路由，同时设置跳转功能。

```vue
// course/section.vue (新建)
<template>
  <div class="course-section">课程内容</div>
</template>
<script>
export default {
  name: 'CourseSection',
  // 设置路由后，通过 props 接收动态路由参数
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

```js
 // router/index.js
 ...
 {
 path: '/course/:courseId/section',
 name: 'course-section',
 component: () => import(/* webpackChunkName: 'course-section'*/ '@/views/course/section.vue'),
 props: true
 }
 ]
 ...
```

```vue
// course/components/list.vue ...
<el-button
  @click="
    $router.push({
      name: 'course-section',
      params: {
        courseId: scope.row.id,
      },
    })
  ">内容管理</el-button>
...
```

### 展示课程内容

<img src="/images/vue/067.gif" style="width: 100%; display:inline-block; margin: 0 ;">

- 设置基本布局结构，底部列表使⽤ Element 的 Tree 组件，后续通过属性配置可以直接设置拖拽功能。
  - 设置 draggable 实现列表项拖拽

```vue
<template>
  <div class="course-section">
    <el-card>
      <div slot="header">
        课程名称
      </div>
      <el-tree :data="data" :props="defaultProps" draggable></el-tree>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'CourseSection',
  props: {
    courseId: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      data: [
        {
          label: '⼀级 1',
          children: [
            {
              label: '⼆级 1-1',
              children: [
                {
                  label: '三级 1-1-1',
                },
              ],
            },
          ],
        },
        {
          label: '⼀级 2',
          children: [
            {
              label: '⼆级 2-1',
              children: [
                {
                  label: '三级 2-1-1',
                },
              ],
            },
            {
              label: '⼆级 2-2',
              children: [
                {
                  label: '三级 2-2-1',
                },
              ],
            },
          ],
        },
        {
          label: '⼀级 3',
          children: [
            {
              label: '⼆级 3-1',
              children: [
                {
                  label: '三级 3-1-1',
                },
              ],
            },
            {
              label: '⼆级 3-2',
              children: [
                {
                  label: '三级 3-2-1',
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    }
  },
}
</script>

<style lang="scss" scoped></style>
```

请求数据创建列表内容，接⼝为章节内容 -> [getSessionAndLesson](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/章节内容/getSectionAndLessonUsingGET) 接⼝。

<img src="/images/vue/364.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```js
// services/course-section.js (新建)
import request from '@/utils/request'

// 获取章节和课时
export const getSectionAndLesson = (courseId) => {
  return request({
    method: 'GET',
    url: '/boss/course/section/getSectionAndLesson',
    params: {
      courseId,
    },
  })
}
```

- 引⼊并使⽤
  - 响应数据的 data 代表章节信息，内部的 lessonDTOS 代表章节内的课时数据

```js
 // section.vue
 ...
 import { getSectionAndLesson } from '@/services/course-section.js'
 ...
 created () {
 this.loadSection()
 },
 methods: {
 async loadSection () {
 const { data } = await getSectionAndLesson(this.courseId)
 if (data.code === '000000') {
 console.log(data)
 }
 }
 }
 ...
```

- 将数据绑定到视图
  - 设置 sections 属性保存课程内容数据
    - 修改 el-tree 组件使⽤的数据
    - 将请求数据绑定到 sections
  - 由于 sections 中的属性与 Tree 需要的默认名称不同，需要修改属性名
    - children 为 lessonDTOS 代表章节下的课时
    - ⽽ label 对于章节和课时不同，章节名为 sectionName，课时名为 theme
    - 通过⽂档得知 label 可以设置为函数，内部判断数据进⾏处理即可。

```vue
// section.vue ...
<!-- 3. 绑定到模板 -->
<el-tree :data="sections" ...></el-tree>
...
<script>
...
data () {
return {
// 1. 声明数据
sections: [],
// 4. 根据响应数据调整属性
defaultProps: {
children: 'lessonDTOS',
label (data) {
return data.sectionName || data.theme
}
}
}
},
...
if (data.code === '000000') {
// 2. 绑定数据
this.sections = data.data
}
...
</script>
```

### Tree 组件内容定制

- Tree 组件默认只有⽂本内容，⽽章节与课时除了⽂本外还具有按钮结构，且对应功能不同，这时就需要通过作⽤域插槽进⾏内容定制，具体⽅式⻅ Element ⽂档示例。
- 通过作⽤域插槽接收的 node 为当前节点的 Node 对象（Element 内部提供），data 为当前节点的数据对象。

```vue
// section.vue ...
<el-tree ...>
 <!-- 设置插槽，并通过插槽接收组件暴露的数据 -->
 <div class="inner" slot-scope="{ node, data }">
 <!-- 设置内容 -->
 <span>{{ node.label }}</span>
 <!-- 设置后续按钮结构 -->
 <!-- section 结构 -->
 <span v-if="data.sectionName" class="actions">
 <el-button>编辑</el-button>
 <el-button>添加课时</el-button>
 <el-button>状态</el-button>
 </span>
 <!-- lesson 结构 -->
 <span v-else class="actions">
 <el-button>编辑</el-button>
 <el-button>上传视频</el-button>
 <el-button>状态</el-button>
 </span>
 </div>
 </el-tree>
...
```

- 设置样式美化。

```css
 /* section.vue */

<style lang="scss" scoped>
.inner {
// 浏览器观察到⽗元素设置了 flex，所以当前元素 flex: 1 占满⼀⾏
flex: 1;
// 内部元素希望左右分开，所以给当前元素设置 flex
display: flex;
justify-content: space-between;
align-items: center;
// 其他样式美化
 padding: 10px;
 border-bottom: 1px solid #ebeef5;
 }

 // 当前⾏具有类名 .el-tree-node__content 设置了固定⾼度 26px, 这⾥要改为to ⾃适应
 // 由于为 Tree 组件内的元素，需要设置样式穿透
 ::v-deep .el-tree-node__content {
 height: auto;
 }
 </style>
```

设置完毕，内部的编辑与显示隐藏是相同功能，这些功能（新增、编辑等）作为练习⾃⾏完成。

### 节点拖动处理

<img src="/images/vue/068.gif" style="width: 100%; display:inline-block; margin: 0 ;">

- Tree 的拖拽不设条件，但实际业务中，例如将章节拖动到课时⼀级明显不合适，应针对这些请求设置规则。
  - 规则为：所有选项都只能平级拖拽。
    通过 [Tree 组件的属性](https://element.eleme.cn/#/zh-CN/component/tree#attributes)可以定制拖拽规则，设置⽅式如下：

* allow-drop 属性通过回调返回的布尔值来判断当前节点是否能被放置，接收 3 个参数：
  - draggingNode 正在拖拽的节点
  - dropNode 放置的⽬标节点
  - type 放置在⽬标节点的哪个位置
    - 值有三种情况：prev（同级前）、inner（内）、next（同级后）

```vue
 // section.vue
 ...
 <el-tree
 :data="sections"
 :props="defaultProps"
 draggable
 :allow-drop="handleAllowDrop"
 >
 ...
 <script>
 handleAllowDrop (draggingNode, dropNode, type) {
 // 1. 不能有放⼊内部的操作，但例如将章节1拖拽到章节2的课时1之前时，type 为prev，需要进⼀步处理
 // 2. 所有课时都具有 sectionId，通过下⾯的条件，限制章节不能移动到课时前后，也不能将章节的课时移动到其他章节
       // console.log(draggingNode, dropNode)
 return type !== 'inner' && draggingNode.data.sectionId === dropNode.data.sectionId
 }
 </script>
```

### 拖动更新数据处理

- ⼀般来说后端会提供接⼝将当前章节最新顺序上传，但项⽬中没有提供这样的接⼝，提供的是单个课时位置更新的接⼝，所以我们需要遍历列表，依次更新处理（好处是可以练习批量请求的处理操作）。
- ⾸先封装相关接⼝：
  - ⽤于更新章节信息的 [saveOrUpdateSection](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/章节内容/saveOrUpdateSectionUsingPOST) 接⼝。
  - ⽤于更新课时的 [saveOrUpdateLesson](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/课时内容/saveOrUpdateUsingPOST) 接⼝（位于⽂档的课时内容分类下）。

<img src="/images/vue/365.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/366.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```js
// services/course-section.js
......

// 新增或更新章节
export const saveOrUpdateSection = data => {
  return request({
    method: 'POST',
    url: '/boss/course/section/saveOrUpdateSection',
    data
  })
}

// 新增或更新课时

export const saveOrUpdateLesson = data => {
  return request({
    method: 'POST',
    url: '/boss/course/lesson/saveOrUpdate',
    data
  })
}

```

Tree 组件提供了 [node-drop](https://element.eleme.cn/#/zh-CN/component/tree#fang-fa) ⽅法（事件）⽤于设置拖动后的处理。

```vue
// section.vue
...
<el-tree
...
@node-drop="handleNodeDrop"
>
...
<script>
import { getSectionAndLesson, saveOrUpdateSection, saveOrUpdateLesson } from '@/services/course-section.js'
 ...
 // 设置节点拖动后的数据更新
 async handleNodeDrop (draggingNode, dropNode, tyoe, event) {
 // 1. ⽆论是章节还是课时, dropNode 都有parent(draggingNode.parent总为 null), 内部有childNodes
 // - dropNode.parent.childNodes 可获取拖拽项所在列表的所有数据
 // - 遍历操作
 // 4. 由于是批量请求，可以使⽤ Promise.all() 便于进⾏统⼀操作
 // - 将 map 返回的，由 Axios 调⽤返回的 Promise 对象组成的数组，传⼊到 Promise.all() 中
 // - 设置 async await 并进⾏ try..catch 处理
 try {
 // Promise.all([])，等待数组里所有操作都完成（或第一个失败），再进行输出
 await Promise.all(dropNode.parent.childNodes.map((item, index) => {
 // 2. 对章节与课时进⾏分别处理
 // - 除了 draggingNode.data.sectionId 外，draggingNode.lessonDTOS 也可以判断
 if (draggingNode.data.lessonDTOS) {
 // 章节操作
 return saveOrUpdateSection({
 id: item.data.id,
 // 按现在的索引顺序给当前级别列表设置排序序号
 orderNum: index
 })
 } else {
 // 课时操作（同上）
 return saveOrUpdateLesson({
 id: item.data.id,
 // 按现在的索引顺序给当前级别列表设置排序序号
 orderNum: index
 })
 }
 }))
 this.$message.success('数据更新成功')
 } catch (err) {
 this.$message.success('数据更新失败', err)
 }
 }
 ...
 </script>
 ...
```

设置完毕，可以在请求过程中添加 loading 效果，以体会 Promise.all() 的好处。

- 示例中为“遍历+请求”结构，这时如果设置 await 就会变成⼀个⼀个顺序发送请求。
- 通过 Promise.all() 可以统⼀发送，并统⼀进⾏结束处理，⼗分⽅便。

```vue
// course-section.vue
...
<el-tree
v-loading="isLoading"
...
>
...
 <script>
 data () {
 return {
 ...
 isLoading: false
 }
 },
 ...
 async handleNodeDrop (draggingNode, dropNode, tyoe, event) {
 this.isLoading = true
 ...
 try {
 ...
 } catch (err) {
 ...
 }
 this.isLoading = false
 }
 </script>
```

完成。此部分主要为业务练习，实际开发时让后端提供对应接⼝即可快速实现了。

### 上传课时视频

通过在线示例⻚⾯进⾏功能体验并分析功能。

⾸先设置上传课时视频的组件，并配置路由与设置跳转。

```vue
 // course/video.vue (新建)
 <template>
 <div class="course-video">上传课时视频/div>
 </template>

 <script>
 export default {
 name: 'CourseVideo'
 }
 </script>

 <style lang="scss" scoped></style>
```

```js
 // router/index.js
 ...
 {
 path: '/course/:courseId/video',
 name: 'course-video',
 component: () => import(/* webpackChunkName: 'course-video'*/ '@/views/course/video.vue'),
 props: true
 }
 ]
 ...
```

设置跳转时，由于模板中不⽤加 this，所以 params 中的 courseId: this.courseId 简写为了 courseId。

```vue
// course/section.vue ...
<el-button
  type="success"
  @click="
    $router.push({
      name: 'course-video',
      params: {
        courseId,
      },
    })
  ">上传视频</el-button>
...
```

接收数据并设置⻚⾯结构，顶部的课程相关信息展示⾃⾏完成，这⾥完成主要的上传功能。

::: warning 注意
这⾥采⽤普通 input 标签操作（如果使⽤ el-input，后续 DOM 操作时处理繁琐）
:::

```vue
<!--  -->
<template>
  <div class="course-video">
    <el-card>
      <div slot="header">课程相关信息</div>
      <el-form>
        <el-form-item label="视频上传">
          <input type="file" />
        </el-form-item>
        <el-form-item label="封面上传">
          <input type="file" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">开始上传</el-button>
          <el-button
            @click="
              $router.push({
                name: 'course-section',
                params: {
                  courseId,
                },
              })
            "
            >返回</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// course/video.vue
export default {
  name: 'CourseVideo',
  props: {
    courseId: {
      type: [String, Number],
      required: true,
    },
  },
  components: {},
  data() {
    return {}
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {},
  methods: {},
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
</style>
```

### 阿⾥云视频点播简介

阿⾥云视频点播（ApsaraVideo VoD）是集⾳视频采集、编辑、上传、⾃动化转码处理、媒体资源管理、⾼效云剪辑处理、分发加速、视频播放于⼀体的⼀站式⾳视频点播解决⽅案。

我们上传视频功能并没有使⽤⾃⼰的后台进⾏上传，⽽是使⽤的第三⽅服务“阿⾥云视频点播”，采⽤第三⽅视频服务是⼀种主流⽅案，让公司可以更专注于核⼼业务⽽不必单独维护⼀套视频点播系统。

<img src="/images/vue/367.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/368.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

官⽅功能概述：[地址](https://help.aliyun.com/document_detail/193174.html?spm=a2c4g.11186623.6.640.4ec55536zXgc7D)，图⼀[地址](http://static-aliyun-doc.oss-cn-hangzhou.aliyuncs.com/assets/img/zh-CN/1204684951/p11314.png)

- 通过上图得知，操作⼀共分为两⼤步，我们先获取上传授权，然后再进⾏资源上传即可。
  - 获取上传授权的相关操作已经由后台的相关接⼝提供了。
  - ⽂件上传到需要查看阿⾥云官⽅⽂档操作。

#### 操作指引

- ⽂档位置：
  - [阿⾥云视频点播⻚⾯](https://help.aliyun.com/product/29932.html?spm=a2c4g.11186623.6.540.5509381eIPudWk) -> 上传 SDK -> 客户端上传 -> [使⽤ JavaScript 上传 SDK](https://help.aliyun.com/document_detail/52204.html?spm=a2c4g.11174283.6.1014.20d4149bJim3qd)
- 操作步骤：
  - 第⼀步“[SDK 下载](https://help.aliyun.com/document_detail/51992.html?spm=a2c4g.11186623.2.9.6f2a191bfLN4cE#topic-1959787)”，这⾥的 SDK 理解为包含⼀系列特定功能的⽂件（⼀个或多个）。
  - ⻚⾯中找到“Web 端 SDK 下载”部分，选择示例代码，进⾏下载。

<img src="/images/vue/369.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- 解压⽂档，得到以下⽬录

<img src="/images/vue/370.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- 根据以下路径找到“aliyun-upload-sdk”⽬录

<img src="/images/vue/371.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- 添加到项⽬根⽬录中的 public ⽬录下，作为静态资源使⽤。

<img src="/images/vue/372.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

public ⽬录结构如下，我们需要使⽤的 SDK 以及配套⽂件⼀共有 3 个，都是 js ⽂件。

```
.
├── aliyun-upload-sdk
│ ├── aliyun-upload-sdk-1.5.0.min.js
│ └── lib
│ ├── aliyun-oss-sdk-5.3.1.min.js
│ └── es6-promise.min.js
├── favicon.ico
└── index.html
```

#### SDK ⽂件处理

- 由于这些 js ⽂件没有进⾏模块化处理，所以我们在项⽬中需要通过全局引⼊的⽅式使⽤。
  - 将⽂件引⼊到 public/index.html 中，这些 public 中的静态资源不会被 webpack 处理。
  - 引⼊时建议通过 / 设置路径，/ 在服务器中代表根⽬录。
  - 引⼊顺序参考⽂档示例。

```html{19-21}
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <link rel="icon" href="<%= BASE_URL %>favicon.ico" />
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <noscript>
      <strong
        >We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work
        properly without JavaScript enabled. Please enable it to
        continue.</strong
      >
    </noscript>
    <div id="app"></div>
    <script src="/aliyun-upload-sdk/lib/es6-promise.min.js"></script>
    <script src="/aliyun-upload-sdk/lib/aliyun-oss-sdk-5.3.1.min.js"></script>
    <script src="/aliyun-upload-sdk/aliyun-upload-sdk-1.5.0.min.js"></script>
    <!-- built files will be auto injected -->
  </body>
</html>
```

#### 体验官⽅上传示例

从官⽹下载的示例代码中找到 Vue 示例，路径为“aliyun-upload-sdk-1.5.0demo\vue-demo\src”，内部的“STSToken.vue”（STS ⽅式）与“UploadAuth.vue”（上传地址和凭证⽅式）对应两种上传⽅式，
官⽅推荐第⼆种。

<img src="/images/vue/373.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

这⾥将“UploadAuth.vue”放到 /course/UploadAuth.vue 位置，并修改路由进⾏功能测试。

```js
 // router/index.js
 ...
 {
 path: '/course/:courseId/video',
 name: 'course-video',
 // 修改此处⽂件路径，⽤于测试
 component: () => import(/* webpackChunkName: 'course-video' */'@/views/course/UploadAuth.vue'),
 props: true
 }
 ..
```

- UploadAuth.vue 的代码⻛格⽆需处理，设置 eslint 不处理当前⽂件 js ⻛格即可
  - 在 js 中书写 /_ eslint-disable _/ 可局部禁⽤ eslint 检验。
    - 书写位置之后都不进⾏检验
  - 模板错误可在图示位置添加空格即可。

```vue
// course/UploadAuth.vue
...
<script>
/* eslint-disable */
...
```

<img src="/images/vue/374.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- 处理完毕，进⾏操作测试即可，由于是测试功能，⽆需授权即可操作，这⾥分析⼀下代码执⾏流程即可。
  - 观察发现，上传凭证和地址信息（授权）是在 onUploadstarted 中设置的
  - 注意：阿⾥云官⽅提供的回调中，只有 onUploadstarted 书写为了不规范的 camelCase，注意拼写。

<img src="/images/vue/375.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

最后将路径更改回到我们⾃⼰的 video.vue 准备设置功能。

```js
 // router/index.js
 ...
 {
 path: '/course/:courseId/video',
 name: 'course-video',
 // component: () => import(/* webpackChunkName: 'course-video'*/ '@/views/course/UploadAuth.vue'),
 component: () => import(/* webpackChunkName: 'course-video' */'@/views/course/video.vue'),
 props: true
 }
 ...
```

### 初始化阿⾥云上传

第⼀步下载完毕，使⽤[JavaScript 上传 SDK](https://help.aliyun.com/document_detail/52204.html?spm=a2c4g.11174283.6.1014.20d4149bJim3qd)中的下⼀步我们需要初始化上传实例。

```js
var uploader = new AliyunUpload.Vod({
  //userID，必填，您可以使用阿里云账号访问账号中心（https://account.console.aliyun.com/），即可查看账号ID
  userId: '122',
  //上传到视频点播的地域，默认值为'cn-shanghai'，
  //eu-central-1，ap-southeast-1
  region: '',
  //分片大小默认1 MB，不能小于100 KB（100*1024）
  partSize: 1048576,
  //并行上传分片个数，默认5
  parallel: 5,
  //网络原因失败时，重新上传次数，默认为3
  retryCount: 3,
  //网络原因失败时，重新上传间隔时间，默认为2秒
  retryDuration: 2,
  //开始上传
  onUploadstarted: function(uploadInfo) {},
  //文件上传成功
  onUploadSucceed: function(uploadInfo) {},
  //文件上传失败
  onUploadFailed: function(uploadInfo, code, message) {},
  //文件上传进度，单位：字节
  onUploadProgress: function(uploadInfo, totalSize, loadedPercent) {},
  //上传凭证或STS token超时
  onUploadTokenExpired: function(uploadInfo) {},
  //全部文件上传结束
  onUploadEnd: function(uploadInfo) {},
})
```

- 设置到 video.vue 中：
  - userId 为后端提供的（例如开通阿⾥云服务的⼈员将 ID 告知你）
    - AliYunUpload 可以添加 window 访问
    - 这⾥提供测试 ID 为：'1618139964448548'
    - 处理其他内容与格式

```vue
// course/video.vue ...
<script>
export default {
  name: 'CourseVideo',
  props: {
    courseId: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      uploader: null,
    }
  },
  created() {
    this.initUploader()
  },
  methods: {
    // 初始化上传对象
    initUploader() {
      // 官⽅示例：声明 AliyunUpload.Vod 初始化回调。
      this.uploader = new window.AliyunUpload.Vod({
        // 阿⾥账号ID，必须有值
        userId: '1618139964448548',
        // 上传到视频点播的地域，默认值为'cn-shanghai'，//eu-central-1，ap-southeast-1
        region: '',
        // 分⽚⼤⼩默认1 MB，不能⼩于100 KB
        partSize: 1048576,
        // 并⾏上传分⽚个数，默认5
        parallel: 5,
        // ⽹络原因失败时，重新上传次数，默认为3
        retryCount: 3,
        // ⽹络原因失败时，重新上传间隔时间，默认为2秒
        retryDuration: 2,
        // 开始上传
        onUploadstarted: function(uploadInfo) {
          console.log('onUploadstarted', uploadInfo)
        },
        // ⽂件上传成功
        onUploadSucceed: function(uploadInfo) {
          console.log('onUploadSucceed', uploadInfo)
        },
        // ⽂件上传失败
        onUploadFailed: function(uploadInfo, code, message) {
          console.log('onUploadFailed', uploadInfo, code, message)
        },
        // ⽂件上传进度，单位：字节
        onUploadProgress: function(uploadInfo, totalSize, loadedPercent) {
          console.log('onUploadProgress', uploadInfo, totalSize, loadedPercent)
        },
        // 上传凭证超时
        onUploadTokenExpired: function(uploadInfo) {
          console.log('onUploadTokenExpired', uploadInfo)
        },
        // 全部⽂件上传结束
        onUploadEnd: function(uploadInfo) {
          console.log('onUploadEnd', uploadInfo)
        },
      })
    },
  },
}
</script>
```

给上传按钮添加点击事件

```vue
// video.vue ...
<el-button type="primary" @click="handleUpload">开始上传</el-button>
...
<script>
...
handleUpload () {

}
...
</script>
```

- 点击获取⽂件
  - ⽂件域添加 ref
  - 通过 \$refs 读取

```vue
// video.vue ...
<el-form-item label="视频上传">
 <input ref="video-file" type="file">
 </el-form-item>
<el-form-item label="封⾯上传">
 <input ref="image-file" type="file">
 </el-form-item>
...
<script>
...
handleUpload () {
// 获取上传的⽂件（视频、图⽚）
const videoFile = this.$refs['video-file'].files[0]
const imageFile = this.$refs['image-file'].files[0]
}
...
</script>
```

- 从⽂档中可以找到将⽂件添加到上传列表的⽅式，进⾏相应处理。
  - uploader.addFile() 将⽂件添加到上传列表，多次调⽤会按顺序发送⽂件（后期由于接⼝要求要先发图）
  - uploader.startUpload() 开始上传

```js
 handleUpload () {
 // 获取上传的⽂件（视频、图⽚）
 const videoFile = this.$refs['video-file'].files[0]
 const imageFile = this.$refs['image-file'].files[0]
 // 将⽂件添加到上传列表
 const uploader = this.uploader
 // - ⽂档示例：uploader.addFile(event.target.files[i], null, null, null, paramData)
 uploader.addFile(imageFile)
 uploader.addFile(videoFile)
 // 开始上传
 // - 开始上传后，上⾯的⽂件回按添加的顺序依次上传
 // - 这时会触发 onUploadStarted 事件
 uploader.startUpload()
 }
```

- 触发上传后，⽂件并没有真正开始上传，因为还需要发送上传凭证和地址，这⾥需要使⽤到后端提供的接⼝。
  - 实际执⾏流程：
  - 调⽤ uploader.startUpload() 调⽤⽅法开始上传
  - 调⽤ uploader.setUploadAuthAndAddress() 设置上传凭证和地址（在 onUploadStarted 钩⼦中）
    - 凭证需要调⽤后端接⼝获得。
  - 凭证没有问题，上传开始执⾏。

<img src="/images/vue/376.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

下⼀步我们需要封装上传凭证接⼝并进⾏调⽤处理。

### 封装上传凭证和地址接⼝

- 由于需要上传视频和封⾯，这⾥需要封装两个接⼝：
  - 获取阿⾥云图⽚上传凭证：[接⼝地址](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/阿里上传/generateAliyunImagUploadAddressAdnAuthUsingGET)
  - 获取阿⾥云视频上传凭证：[接⼝地址](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/阿里上传/aliyunVideoUploadAddressAdnAuthUsingGET)
- 创建⽂件封装阿⾥云相关接⼝（4 个）
  - Tips：接⼝地址中的 and 拼成了 adn，建议封装名字书写正确

```js
// services/aliyun-upload.js
import request from '@/utils/request'

// 获取阿⾥云图⽚上传凭证（image 少了个 e）
export const aliyunImageUploadAddressAndAuth = () => {
  return request({
    method: 'GET',
    url: '/boss/course/upload/aliyunImagUploadAddressAdnAuth.json',
  })
}

// 获取阿⾥云视频上传凭证（有两个请求参数）
export const aliyunVideoUploadAddressAndAuth = (params) => {
  return request({
    method: 'GET',
    url: '/boss/course/upload/aliyunVideoUploadAddressAdnAuth.json',
    params,
  })
}
// 阿⾥云转码请求（transcode 是⼀个词，中间不⽤驼峰）
export const aliyunVideoTrancode = (data) => {
  return request({
    method: 'POST',
    url: '/boss/course/upload/aliyunTransCode.json',
    data,
  })
}

// 阿⾥云转码进度
export const getAliyunTranscodePercent = (lessonId) => {
  return request({
    method: 'GET',
    url: '/boss/course/upload/aliyunTransCodePercent.json',
    params: {
      lessonId,
    },
  })
}
```

- 引⼊到⻚⾯中。

```js
// course/video.vue
...
import {
  aliyunImageUploadAddressAndAuth,
  aliyunVideoUploadAddressAndAuth
    aliyunVideoTrancode
    getAliyunTranscodePercent
} from '@/services/aliyun-upload'
...
```

### 上传凭证处理

由于存在图⽚和视频两种上传类型，现在 onUploadstarted 中检测

操作步骤：

- 调⽤接⼝获取凭证
- 设置凭证
- 成功上传

```js
 // video.vue
 ...
 data () {
 return {
 ...
 imageURL: ''
 }
 },
 ...
 // 开始上传（uploader.startUpload() 触发后执⾏该回调）
 // - 将回调更改为箭头函数，以便在内部通过 this 操作 Vue 实例
onUploadstarted: async (uploadInfo) => {
  // ⼀、获取凭证
  // console.log(uploadInfo)
  // 1. 声明变量存储得到上传凭证
  let uploadAddressAndAuth = null
  // 2. 根据 isImage 检测上传⽂件类型
  if (uploadInfo.isImage) {
    const { data } = await aliyunImageUploadAddressAndAuth()
    if (data.code === '000000') {
      // 3. data.data 即为凭证信息组成的对象
      uploadAddressAndAuth = data.data
      // 5. 保存图⽚地址，给视频接⼝使⽤
      this.imageURL = uploadAddressAndAuth.imageURL
    }
  } else {
    // 4. 观察 uploadInfo 数据，根据请求参数名设置参数
    // - 由于视频接⼝要求传⼊封⾯图⽚地址 imageUrl，所以必须先发图再发视频（后端
    // - 先将图⽚数据存储给 this，便于视频接⼝使⽤
    const { data } = await aliyunVideoUploadAddressAndAuth({
      fileName: uploadInfo.file.name,
      imageUrl: this.imageURL
    })
    if (data.code === '000000') {
      // 6. 存储凭证
      // - 图⽚与视频上传的区别在于图⽚存在 imageId，视频为 videoId，其他相同
      uploadAddressAndAuth = data.data
    }
  }
  // ⼆、设置凭证
  this.uploader.setUploadAuthAndAddress(
    uploadInfo,
    uploadAddressAndAuth.uploadAuth,
    uploadAddressAndAuth.uploadAddress,
    uploadAddressAndAuth.imageId || uploadAddressAndAuth.videoId
  )
  // 设置完毕，上传进度开始执⾏
},
 ...
```

测试成功即可。

### 视频转码处理

- 转码请求接⼝之前已经封装好了，⽂档中显示有许多请求参数，其实只需要主要的 4 个参数：
  - lessonId 课时 ID
    - 需要在上传视频跳转时添加相应参数
  - coverImageUrl 封⾯图⽚地址
  - fileId 视频 ID
  - fileName 视频名称

```vue
// section.vue ...
<el-button
  type="success"
  @click="
    $router.push({
      name: 'course-video',
      params: {
        courseId,
      },
      query: {
        lessonId: data.id,
      },
    })
  ">上传视频</el-button>
```

当所有⽂件都上传完毕后才能进⾏转码，应在 onUploadEnd 回调中操作

```js
 // video.vue
 ...
 data () {
 return {
 ...
 videoId: null
 }
 },
 ...
 onUploadstarted: async uploadInfo => {
 ...
 if (uploadInfo.isImage) {
 ...
 } else {
 ...
 if (data.code === '000000') {
 ...
 this.videoId = data.data.videoId
 }
 }
 ...
 },
 ...
 // 全部⽂件上传结束
 onUploadEnd: async uploadInfo => {
 // 调⽤接⼝
 const { data } = await aliyunVideoTranscode({
 lessonId: this.$route.query.lessonId,
 coverImageUrl: this.imageURL,
 fileName: this.$refs['video-file'].files[0].name,
 fileId: this.videoId
 })
 console.log(data)
 }
```

转码请求发送后，还需轮询转码进度。

```js
 // video.vue
 ...
 onUploadEnd: async uploadInfo => {
 const { data } = await aliyunVideoTranscode({
 ...
 })
 if (data.code === '000000') {
 // 转码开始后，需要轮询转码进度
 const timer = setInterval(async () => {
 const { data } = getAliyunTranscodePercent(this.$route.query.lessonId)
 if (data === 100) {
 // 当上传进度为 100，停⽌定时器，并进⾏提示
 clearInterval(timer)
 this.$message.success('转码成功')
 }
 }, 1000)
 }
 }
 ...
```

测试转码成功，前台⻚⾯查看视频成功即可。

最后将转码进度展示在视图中便于观察。

```js
 // video.vue
 ...
 data () {
 return {
 ...
 uploadPercent: 0,
 isUploadSuccess: false,
 isTranscodeSuccess: false
 }
 },
 ...
 <el-form-item>
 <p v-if="uploadPercent !== 0">视频上传中：{{ uploadPercent }}%</p>
 <p v-if="isUploadSuccess">视频转码中：{{ isTranscodeSuccess ? '完成' : '正在转码，请稍后...' }} </p>
 </el-form-item>
 ...
 // ⽂件上传进度，单位：字节
 // - 修改为箭头函数，内部 this 才能访问 Vue 实例
 onUploadProgress: (uploadInfo, totalSize, loadedPercent) => {
 console.log('onUploadProgress', uploadInfo, totalSize, loadedPercent)
 // 只对视频上传进度进⾏监测即可
 if (!uploadInfo.isImage) {
 this.uploadPercent = Math.floor(loadedPercent * 100)
 }
 },
 ...
 // 全部⽂件上传结束
 onUploadEnd: async uploadInfo => {
 this.isUploadSuccess = true
 ...
 if (data === 100) {
 this.isTranscodeSuccess = true
 ...
 }
 ...
 },
 ...
 handleUpload () {
 // 点击上传时重置状态信息
 this.isTranscodeSuccess = false
 this.isUploadSuccess = false
 this.uploadPercent = 0
 ...
 }
 ...
```

## 发布部署

### 项⽬打包

项⽬打包后，将打包后的⽂件⽣成再 dist ⽬录中。

```sh
npm run build
```
得到如下提示，说明打包成功，可以看到打包的详细信息（点击查看⼤图）。

<img src="/images/vue/378.jpg" style="width: 100%; display:inline-block; margin: 0 ;">


打包完毕，通过 serve 静态⽂件服务器进⾏本地预览即可。

```sh
cd dist
serve
```
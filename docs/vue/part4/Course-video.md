# 视频播放组件

## 组件准备

- 当点击某个可播放的课时时，需要进⾏视频播放，这⾥设置视频组件⽤于播放视频。
  - 设置导航⽤于返回上⼀⻚

<img src="/images/vue/079.gif" style="width: 100%; display:inline-block; margin: 0 ;">

```vue
// course-info/video.vue
<template>
  <div class="course-video">
    <!-- 导航 -->
    <van-nav-bar title="视频" left-text="返回" @click-left="$router.go(-1)" />
  </div>
</template>

<script>
export default {
  name: 'CourseVideo',
}
</script>

<style lang="scss" scoped></style>
```

设置路由

```js
// router/index.js
...
// 视频⻚
  {
    path: '/lesson-video/:lessonId',
    name: 'lesson-video',
    component: () => import(/* webpackChunkName: 'lesson-video' */ '@/views/course-info/video'),
    props: true
  },
  ...
```

点击课时时，如果可播放，则跳转视频⻚，并传递课时 ID。

```js
 // CourseSection.vue
 ...
 <p
 ...
 @click="handleClick(item)"
 >
 ...
 <script>
 methods: {
 handleClick (lessonInfo) {
 if (lessonInfo.canPlay) {
 this.$router.push({
 name: 'lesson-video',
 params: {
 lessonId: lessonInfo.id
 }
 })
 }
 }
 }
 ...
```

video.vue 接收 lessonId ⽤于请求视频数据。

```js
// course-info/video.vue
...
props: {
lessonId: {
type: [String, Number],
required: true
}
},
...
```

## 接⼝封装

<img src="/images/vue/410.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- 需要使⽤以下接⼝：
- 根据 fileId 获取阿⾥云对应的视频播放信息：[地址](http://eduboss.lagou.com/front/doc.html#/edu-front-boot/课程媒体接口/videoPlayInfoUsingGET)

```js
// course.js
···
// 根据fileId 获取阿里云对应的视频播放信息
export const getVideoInfo = params => {
  return request({
    method: 'GET',
    url: '/front/course/media/videoPlayInfo',
    params
  })
}
```

引⼊并请求

```js
// video.vue
...

import { getVideoInfo } from '@/services/course'
...
  created () {
    this.loadVideo()
  },
  methods: {
    async loadVideo () {
      const { data } = await getVideoInfo({
        lessonId: this.lessonId
      })
      console.log(data)
    }
  },
```

## 阿⾥云视频点播

播放需要使⽤ 阿⾥云的视频播放功能

- [阿⾥云 Web 播放器⽂档](https://help.aliyun.com/document_detail/125570.html?spm=a2c4g.11186623.6.1177.eb836412cBfOsp)
  - 在 public/index.html 中引⼊⽂件：
  - css ⽂件

```html
<link
  rel="stylesheet"
  href="https://g.alicdn.com/de/prismplayer/2.9.3/skins/default/aliplayer-min.css"
/>
```

- js ⽂件

```html
<script src="https://g.alicdn.com/de/prismplayer/2.9.3/aliplayer-h5-min.js"></script>
```

- 可使⽤在线配置获取创建实例代码
  - 选择 playauth 播放⽅式即可。
    具体代码如下：

```vue
<template>
  <div class="course-video">
    ...
    <!-- 设置视频容器 -->
    <div id="video-container"></div>
  </div>
</template>

<script>
// 引⼊接⼝，请求视频播放需要的 vid 与 playAuth
import { getVideoInfo } from '@/services/course'
export default {
...
 created () {
    this.loadVideo()
  },
  methods: {
    async loadVideo () {
      const { data } = await getVideoInfo({
        lessonId: this.lessonId
      })
      console.log(data)
      // 初始化播放器
      const player = new window.Aliplayer(
        {
          // 视频容器 ID
          id: 'video-container',
          // 视频 ID
          vid: data.content.fileId,
          // 播放凭证
          playauth: data.content.playAuth,
          qualitySort: 'asc',
          format: 'mp4',
          mediaType: 'video',
          width: '100%',
          // ⾼度调整
          height: '100%',
          autoplay: true,
          isLive: false,
          rePlay: false,
          playsinline: true,
          preload: true,
          controlBarVisibility: 'hover',
          useH5Prism: true
        },
        function (player) {
          console.log('The player is created')
        }
      )
      console.log(player)
    }
  },
}
</script>
<style lang="scss" scoped>
.course-video {
  width: 100%;
  height: 210px;
}
#video-container {
  width: 100%;
  height: auto;
}
</style>
```

### 在手机上预览

在CMD命令 里输入 `ipconfig /all`，找到IPV4地址

```sh
// 浏览器输入,即可在手机上浏览器预览视频播放
192.168.xx.xx:8080
```

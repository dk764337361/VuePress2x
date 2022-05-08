# 用户功能

## 布局处理

<img src="/images/vue/404.jpg" style="width: 50%; display:inline-block; margin: 0 ;">


整体分为上下两部分，顶部为⽤户信息与操作列表，底部为导航。

⾸先引⼊ LayoutFooter 组件。

```vue
 // user/index.vue
 <template>
 <div class="user">
 <!-- 顶部功能 -->
 <!-- 底部导航 -->
 <layout-footer></layout-footer>
 </div>
 </template>
 ...
 <script>
 import LayoutFooter from '@/components/LayoutFooter'
 export default {
 name: 'User',
 components: {
 LayoutFooter
 }
 }
```

整体布局使⽤ Vant 的 [Cell 单元格](https://vant-contrib.gitee.io/vant/#/zh-CN/cell) 组件。

```vue
// Vant 官⽅示例： Cell 单元格
<van-cell-group>
<van-cell title="单元格" value="内容" />
<van-cell title="单元格" value="内容" label="描述信息" />
</van-cell-group>
```

### ⽤户信息

```vue
// user/index.vue
<template>
  <div class="user">
    <van-cell-group>
      <!-- ⽤户信息区域 -->
      <van-cell class="user-info" :border="false">
        <van-image
          width="50"
          height="50"
          round
          src="https://s0.lgstatic.com/common/image/pc/default_boy_headpic1.png"
        />
        <div class="user-info-content">
          <h3>昵称</h3>
          <span>
            <van-icon name="edit" />
            编辑个⼈资料
          </span>
        </div>
      </van-cell>
    </van-cell-group>
    ...
  </div>
</template>
...
<style lang="scss" scoped>
.user-info {
  padding: 30px 20px;
  background-color: rgb(248, 150, 3);
}
// 让头像与右侧信息区域在⼀⾏显示
.user-info .van-cell__value {
  display: flex;
}

.user-info .user-info-content {
  padding-left: 15px;
}
.user-info .user-info-content h3 {
  font-size: 18px;
  margin: 5px;
}
</style>
```

### 账户信息

除了基础信息外，还有账户信息。
这⾥使⽤ Vant 的 [Grid 宫格](https://vant-contrib.gitee.io/vant/#/zh-CN/grid) 组件。

```vue
// Vant 官⽅示例： Grid 宫格
<van-grid>
<van-grid-item icon="photo-o" text="⽂字" />
<van-grid-item icon="photo-o" text="⽂字" />
<van-grid-item icon="photo-o" text="⽂字" />
<van-grid-item icon="photo-o" text="⽂字" />
</van-grid>
```

- 设置到⻚⾯中
  - 注意组件间的空隙处理。

```vue
 <van-cell-group>
 <!-- ⽤户信息区域 -->
 <van-cell class="user-info" :border="false">
 ...
 </van-cell>
 <!-- 账户信息 -->
 <van-cell class="account-info">
 <van-grid :border="false">
 <van-grid-item>
 <span class="grid-item-value">14.05</span>
 <span>学习时⻓</span>
 </van-grid-item>
 <van-grid-item>
 <span class="grid-item-value">200</span>
 <span>钱包/勾⾖</span>
 </van-grid-item>
 <van-grid-item>
 <span class="grid-item-value">1</span>
 <span>优惠券</span>
 </van-grid-item>
 <van-grid-item>
 <span class="grid-item-value">213</span>
 <span>学分</span>
 </van-grid-item>
 </van-grid>
 </van-cell>
 ...
 <style>
 ...
 // 账户信息
 .account-info {
 background-color: rgb(248, 150, 3);
 margin-top: -1px;
 }

 .account-info .van-cell__value{
 border-radius: 15px;
 }

 .account-info .grid-item-value{
 font-size: 22px;
 font-weight: 700;
 }
 </style>
```

### 底部菜单列表

- icon 图标
- title 标题
- is-link 右侧箭头
- value 右侧箭头前的⽂字

```vue
<van-cell-group>
...
<!-- 底部菜单 -->
<van-cell icon="user-o" title="分销中⼼" is-link value="收益200元"></van-cell>
<van-cell icon="setting-o" title="个性化设置" is-link></van-cell>
<van-cell icon="down" title="我的下载" is-link></van-cell>
<van-cell icon="question-o" title="帮助与反馈" is-link></van-cell>
<van-cell icon="info-o" title="关于拉勾教育" is-link value="v2.0.0"></van-cell>
</van-cell-group>
```

## 逻辑处理

### ⽤户信息接⼝封装

<img src="/images/vue/405.jpg" style="width: 100%; display:inline-block; margin: 0 ;">


使⽤⽤户基本信息接⼝：[地址](http://eduboss.lagou.com/front/doc.html#/edu-front-boot/用户接口/getInfoUsingGET)

```js
// services/user.js
...
// ⽤户基本信息
export const getInfo = () => {
return request({
method: 'GET',
url: '/front/user/getInfo'
})
}
```

引⼊到 User 组件中进⾏请求发送。

```js
 // user/index.vue
 ...
 import { getInfo } from '@/services/user'
 ...
 data () {
 return {
 // 存储⽤户信息
 userInfo: {}
 }
},
created () {
this.loadUserInfo()
},
methods: {
async loadUserInfo () {
// 请求⽤户信息，并存储到 data 中
const { data } = await getInfo()
this.userInfo = data.content
}
}
}
...
```

将数据绑定到⻚⾯中

```vue
// user/index.vue ...
<van-image
  ...
  :src="
    userInfo.portrait ||
      'https://s0.lgstatic.com/common/image/pc/default_boy_headpic1.png'
  "
/>
<div class="user-info-content">
 <h3>{{ userInfo.userName }}</h3>
 ...
 </div>
...
```

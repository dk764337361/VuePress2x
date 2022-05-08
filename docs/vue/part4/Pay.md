# 支付功能

## 组件准备

<img src="/images/vue/080.gif" style="width: 50%; display:inline-block; margin: 0 ;">

```vue
// views/pay/index.vue
<template>
  <div class="pay">⽀付功能</div>
</template>

<script>
export default {
  name: 'Pay',
}
</script>

<style lang="scss" scoped></style>
```

添加路由，⽀付⻚需登录后才能访问。

```js
// router/index.js
...
//支付页
  {
    path: '/pay/:courseId',
    name: 'pay',
    component: () => import(/* webpackChunkName: 'pay' */ '@/views/pay'),
    meta: { requiresAuth: true },
    props: true
  },
```

- 课程详情⻚中点击购买后跳转，并传递课程 ID
  - 检测⽤户是否登录，登录时跳转⽀付，未登录则跳转登录⻚并记录当前⻚信息

```vue
// course-info/index.vue ...
<van-button type="primary" @click="handlePay">⽴即购买</van-button>
...
<script>
...
   handlePay () {
     // 检测是否登录
     if (this.$store.state.user) {
       // 如果已登录，跳转支付页
       this.$router.push({
         name: 'pay',
         params: {
           courseId: this.courseId
         }
       })
     } else {
       this.$router.push({
         name: 'login',
         query: {
           redirect: this.$route.fullPath
         }
       })
     }
   },
...
</script>
```

### 布局处理

- ⽀付组件分为上中下三部分
  - 顶部为课程信息
  - 中间为账户信息
  - 底部为⽀付⽅式

整体布局使⽤ Vant 的 Cell 单元格组件，内部进⾏细节处理，代码如下：

```vue
// pay/index.vue
<template>
  <div class="pay">
    <van-cell-group>
      <van-cell class="course-info">
        <img src="xxxxx-demo.png" alt="" />
        <div class="price-info">
          <div class="course-name" v-text="示例课程名称"></div>
          <div class="discounts">￥100000</div>
        </div>
      </van-cell>
      <van-cell class="account-info">
        <div>购买信息</div>
        <div>购买课程后使⽤此账号登录【拉勾教育】学习课程</div>
        <div class="username">当前账号：1122334455</div>
      </van-cell>
      <van-cell class="pay-channel">
        <div class="title">⽀付⽅式</div>
      </van-cell>
    </van-cell-group>
  </div>
</template>
...
<style lang="scss" scoped>
// 让容器盛满屏幕，⽤于 #app 没有宽度，设置定位脱标，让元素参考窗⼝尺⼨
.pay {
  position: absolute;
  width: 100%;
  height: 100%;
}
// 容器
.van-cell-group {
  width: 100%;
  height: 100%;
  background-color: #f8f9fa;
  display: flex;
}
// 课程信息
.course-info {
  height: 170px;
  padding: 40px 20px 0;
  margin-bottom: 10px;
  box-sizing: border-box;
}
// 让图⽚与右侧信息同⾏显示
.course-info .van-cell__value {
  display: flex;
}
// 课程图⽚
.course-info img {
  width: 80px;
  height: 107px;
  border-radius: 10px;
}
.price-info {
  height: 107px;
  padding: 5px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.price-info .course-name {
  font-size: 16px;
}
.price-info .discounts {
  font-size: 22px;
  font-weight: 700;
  color: #ff7452;
}

// 账户信息
.account-info {
  height: 120px;
  margin-bottom: 10px;
}
.account-info div:nth-child(2) {
  font-size: 12px;
  color: #999;
}

.account-info .username {
  margin: 20px 0 10px;
  font-size: 16px;
}
</style>
```

## 支付结构

使⽤ Vant 的 [Radio 单选框](https://vant-contrib.gitee.io/vant/#/zh-CN/radio#yu-cell-zu-jian-yi-qi-shi-yong) 组件 与 Cell 组件⼀起使⽤的⽤法。

```vue
// Vant 官⽅示例：Radio 单选框组件 与 Cell 组件⼀起使⽤
<van-radio-group v-model="radio">
 <van-cell-group>
 <van-cell title="单选框 1" clickable @click="radio = '1'">
 <template #right-icon>
 <van-radio name="1" />
 </template>
 </van-cell>
 <van-cell title="单选框 2" clickable @click="radio = '2'">
 <template #right-icon>
 <van-radio name="2" />
 </template>
 </van-cell>
 </van-cell-group>
 </van-radio-group>
```

- 设置到⻚⾯中
  - 添加左侧⽀付宝与微信图标
  - 进⾏布局样式设置

```vue
 // pay/index.vue
 ...
 <!-- ⽀付⽅式 -->
 <van-cell class="pay-channel">
 <div>
 <p>⽀付⽅式</p>
 <van-radio-group v-model="radio">
 <van-cell-group>
 <van-cell @click="radio = '1'">
 <!-- 将左侧标题设置为插槽，添加对应⽀付图标 -->
 <template #title>
 <img src="http://www.lgstatic.com/lg-app-fed/pay/images/wechat_b787e2f4.png" alt="">
 <span>微信⽀付</span>
 </template>
 <template #right-icon>
 <van-radio name="1" />
 </template>
 </van-cell>
 <van-cell clickable @click="radio = '2'">
 <template #title>
 <img src="http://www.lgstatic.com/lg-app-fed/pay/images/ali_ed78fdae.png" alt="">
 <span>⽀付宝⽀付</span>
 </template>
 <template #right-icon>
 <van-radio name="2" />
 </template>
 </van-cell>
 </van-cell-group>
 </van-radio-group>
 </div>
 <van-button>￥{{ course.discounts }} ⽴即⽀付</van-button>
 </van-cell>
 </van-cell-group>
 </div>
 </template>

 <script>
 ...
 data () {
 return {
 ...
 radio: '1'
 }
 },
 ..
 </script>

 <style lang="scss" scoped>
 ...
 // ⽀付区域（占满剩余空间）
 .pay-channel {
 flex: 1;
 }
 // 让 radio 与 按钮在上下两端

 .pay-channel .van-cell__value {
 display: flex;
 flex-direction: column;
 justify-content: space-between;
 }
 .pay-channel .van-cell {
 padding: 20px 10px;
 }
 // 左侧标题插槽
 .pay-channel .van-cell__title {
 display: flex;
 align-items: center;
 }
 .pay-channel .van-cell img {
 width: 28px;
 height: 28px;
 }
 .pay-channel .van-cell span {
 font-size: 16px;
 margin-left: 10px;
 }

 // 右侧 radio 选中颜⾊
 ::v-deep .van-radio__icon--checked .van-icon{
 background-color: #fbc546;
 border-color: #fbc546;
 }

 // 底部按钮样式
 .pay-channel .van-button {
 background: linear-gradient(270deg,#faa83e,#fbc546);
 border-radius: 20px;
 margin-bottom: 5px;
 font-size: 18px;
 }
 </style>
```

## 逻辑处理

- ⽀付功能需要如下步骤：
  - ⽀付⻚⾯打开后，根据商品 ID（课程 ID）创建商品订单
  - ⽤户操作选择⽀付⽅式（微信、⽀付宝）
  - 跳转到⽀付⻚，⽀付⻚会⾃动唤起对应 App
  - ⽀付，并且成功，跳转 Learn 组件
- 需要使⽤到以下接⼝：
  - 订单接⼝
    - 创建商品订单接⼝：[地址](http://eduboss.lagou.com/front/doc.html#/edu-front-boot/订单接口/saveOrderUsingPOST)
- ⽀付接⼝
  - 获取⽀付⽅式：[地址](http://eduboss.lagou.com/front/doc.html#/edu-front-boot/支付接口/getPayInfoUsingGET)
  - 创建订单(发起⽀付)：[地址](http://eduboss.lagou.com/front/doc.html#/edu-front-boot/支付接口/saveOrderUsingPOST_1)
  - 查询订单(⽀付结果)：[地址](http://eduboss.lagou.com/front/doc.html#/edu-front-boot/支付接口/getPayResultUsingGET)

<img src="/images/vue/415.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/416.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/417.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/418.jpg" style="width: 100%; display:inline-block; margin: 0 ;">


## 封装接⼝

新建 services/pay.js ⽤于保存⽀付相关接⼝。

```js
// services/pay.js
// services/pay.js
import request from '@/utils/request'

// 创建商品订单接⼝
// - goodsId 商品（课程）ID 必传
export const createOrder = data => {
  return request({
    method: 'POST',
    url: '/front/order/saveOrder',
    data
  })
}

// 获取⽀付⽅式接⼝
// - shopOrderNo 订单号必传
export const getPayInfo = params => {
  return request({
    method: 'GET',
    url: '/front/pay/getPayInfo',
    params
  })
}

// 创建订单（发起⽀付）
// - goodsOrderNo, channel, returnUrl 必传
export const initPayment = data => {
  return request({
    method: 'POST',
    url: '/front/pay/saveOrder',
    data
  })
}

// 查询订单（查询⽀付结果）
// - orderNo 订单号必传
// - 由于接⼝要求传递 JSON，所以进⾏ headers 设置
export const getPayResult = params => {
  return request({
    method: 'GET',
    url: '/front/pay/getPayResult',
    headers: { 'content-type': 'application/json' },
    params
  })
}

```

## 创建订单与获取⽀付⽅式
- 引⼊并调⽤接⼝
  - 调⽤创建商品订单接⼝获取订单号
  - 调⽤获取⽀付⽅式接⼝
  - 根据⽀付⽅式接⼝设置⽀付区域的 radio 数据

```vue
 // pay/index.vue
 ...
 <script>
 ...
 import { createOrder, getPayInfo } from '@/services/pay'
 ...
 data () {
 return {
 ...
 // 订单号
 orderNo: null,
 // ⽀付⽅式信息
 payInfo: {}
 }
 },
 created () {
 ...
 this.loadOrder()
 },
 methods: {
 // 创建订单，获取订单号
 async loadOrder () {
 // 创建订单，获取订单号
 const { data } = await createOrder({
 goodsId: this.courseId
 })
 this.orderNo = data.content.orderNo
 // 获取⽀付⽅式
 const { data: payInfo } = await getPayInfo({
 shopOrderNo: this.orderNo
 })
 this.payInfo = payInfo.content.supportChannels
 },
 ...
 </script>
 ...
 <van-radio-group v-model="radio">
 <van-cell-group>
 <van-cell @click="radio = payInfo[1].channelCode">
 ...
 <template #right-icon>
 <van-radio :name="1" />
 </template>
 </van-cell>
 <van-cell clickable @click="radio = payInfo[0].channelCode">
 ...
 <template #right-icon>
 <van-radio :name="2" />
 </template>
 </van-cell>
 </van-cell-group>
 </van-radio-group>
```

## ⽀付请求

点击⽀付按钮时，发送⽀付请求

```vue
1 // pay/index.vue
 ...
 <van-button @click="handlePay">...</van-button>
 ...
 <script>
 import { ..., initPayment } from '@/services/pay'
 ...
 async handlePay () {
 // 发起⽀付请求
 const { data } = await initPayment({
 goodsOrderNo: this.orderNo,
 channel: this.radio === 1 ? 'weChat' : 'aliPay',
 returnUrl: 'http://edufront.lagou.com/'
 })
 // 接收响应地址，并进⾏跳转
 window.location.href = data.content.payUrl
 },
</script>
 ...
```

- 设置完毕，在⼿机上进⾏测试。
  - 微信为⽀付地址为 PC ⽀付功能，⽆法正常唤起微信⽀付，为接⼝原因。
  - ⽀付宝地址可正确跳转 App 并⽀付，所有课程⽆论标价多少，后台设置默认价格为 0.01 元，需真实
  - ⽀付才能成功。故应尽量减少测试次数，避免不必要的⽀出。

<img src="/images/vue/411.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
<img src="/images/vue/412.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
<img src="/images/vue/413.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
<img src="/images/vue/414.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

## 查询支付结果

- 发起⽀付请求后，需要轮询⽀付结果。
  - 设置定时器，每隔 1000ms 发送⼀次查询请求
  - 注意接⼝传⼊的 orderNo 不是商品订单号，⽽是⽀付订单号，从⽀付请求的响应内容中得到。

```vue
 // pay/index.vue
 ...
 import { ..., getPayResult } from '@/services/pay'
 ...
 async handlePay () {
 ...
 const timer = setInterval(async () => {
 // 发起查询⽀付结果请求(此处使⽤)
 const { data: payResult } = await getPayResult({
 orderNo: data.content.orderNo
 })
 // 如果⽀付结果成功，清除定时器，并提示购买成功，跳回到学习⻚
 if (payResult.content && payResult.content.status === 2) {
 clearInterval(timer)
 this.$toast.success('购买成功！')
 this.$router.push({
 name: 'learn'
 })
 }
 }, 1000)
 },
 ...
```
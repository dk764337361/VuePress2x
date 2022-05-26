# 购物与订单

## 1. 加入购物车页面布局与逻辑

如果当前商品页面没选择规格，点击购物车会弹出商品规格，选择好数据后加入购物车，然后把数据发送给后端，以方便在不同设备查看。

### 1. 需要使用的组件介绍

[ActionBar 动作栏](https://vant-contrib.gitee.io/vant/#/zh-CN/action-bar#zi-ding-yi-tu-biao-yan-se)

```vue
<van-action-bar>
  <van-action-bar-icon icon="chat-o" text="客服" color="#ee0a24" />
  <van-action-bar-icon icon="cart-o" text="购物车" />
  <van-action-bar-icon icon="star" text="已收藏" color="#ff5000" />
  <van-action-bar-button type="warning" text="加入购物车" />
  <van-action-bar-button type="danger" text="立即购买" />
</van-action-bar>
```

### 2. 商品页面的动作栏布局

<img src="/images/vue/483.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

```vue
<!--
src\views\Product\index.vue
-->
<template>
......

  <!-- 加入购物车 -->
  <van-action-bar>
    <van-action-bar-icon
      icon="chat-o"
      text="客服"
      color="#ee0a24"
    />
    <van-action-bar-icon
      icon="cart-o"
      text="购物车"
      to="/cart"
    />
    <van-action-bar-icon
      icon="star"
      text="已收藏"
      color="#ff5000"
    />
    <van-action-bar-button
      type="warning"
      text="加入购物车"
      @click="handleCartAdd"
    />
    <van-action-bar-button
      type="danger"
      text="立即购买"
    />
  </van-action-bar>
</template>

......


<style lang="scss" scoped>
......

.van-tabs {
  background-color: #f2f2f2;
 + margin-bottom: 50px;
   ......
}

 + // 设置加入购物车的样式
 + .van-action-bar{
 +   z-index:10000;
 +   width: 100%;
 + }
</style>

```

### 3. 动作栏逻辑处理

#### 1. 检测用户的登陆状态，如果未登录，跳转登录页
```vue
<script setup>

......

import { useStore } from 'vuex'

......


// ------------加入购物车功能-----------------
const store = useStore()
const handleCartAdd = () => {
// 检测用户的登陆状态，如果未登录，跳转登录页
  if (!store.state.token) {
    return router.push({
      name: 'login',
      query: {
        redirect: router.currentRoute.value.fullPath
      }
    })
  }
}
</script>
```

此时清除本地token，并刷新页面更新Vuex状态（此时vuex的token为0），测试是否成功

<img src="/images/vue/129.gif" style="width: 100%; display:inline-block; margin: 0 ;">


#### 2. 检测弹出层是否显示

<img src="/images/vue/130.gif" style="width: 50%; display:inline-block; margin: 0 ;">


```vue
<script setup>

......

import { useStore } from 'vuex'

......

// ------------加入购物车功能-----------------
const store = useStore()
const handleCartAdd = () => {
  // 1. 检测用户的登陆状态，如果未登录，跳转登录页
  if (!store.state.token) {
    return router.push({
      name: 'login',
      query: {
        redirect: router.currentRoute.value.fullPath
      }
    })
  }
 + // 2. 检测弹出层是否显示
 + if (!specState.show) {
 +   return specState.show = true
 + }

 + // 3. 发送请求，将数据加入购物车
}
</script>

```


## 2. 加入购物车，发送请求

<img src="/images/vue/131.gif" style="width: 100%; display:inline-block; margin: 0 ;">


### 1. API 功能封装

```js
import request from '@/utils/request'

// 加入购物车
export const addToCart = data => request({
  method: 'POST',
  url: '/cart/add',
  data
})
```

### 2. API引入与数据传递

```vue
<script>
......
import { addToCart } from '@/api/cart'


// ------------加入购物车功能-----------------
const store = useStore()
// 加入购物车按钮点击时间
const handleCartAdd = async () => {
  // 1. 检测用户的登陆状态，如果未登录，跳转登录页
  if (!store.state.token) {
    return router.push({
      name: 'login',
      query: {
        redirect: router.currentRoute.value.fullPath
      }
    })
  }
  // 2. 检测弹出层是否显示
  if (!specState.show) {
    return specState.show = true
  }

  + // 3. 发送请求，将数据加入购物车
  + const { data } = await addToCart({
  +   // 0代表加入购物车操作，1代表立即购买
  +   new: 0,
  +   productId,
  +   uniqueId: specDetail.value.unique,
  +   cartNum: specState.buyCount
  + })
  + console.log(data)
  + if (data.status !== 200) { return }
  + // 隐藏弹出层
  + specState.show = false
  + // 提示成功即可
  + Toast('加入购物车成功')
}

</script>
```

## 3. 购物车页面

### 整体布局

需要使用的组件有 [NavBar导航栏](https://vant-contrib.gitee.io/vant/#/zh-CN/nav-bar)、[SubmitBar 提交订单栏](https://vant-contrib.gitee.io/vant/#/zh-CN/submit-bar#gao-ji-yong-fa)

```vue
<!--
 * @author: chendaokuan
 * @since: 2022-05-17
 * src\views\Cart\index.vue
-->
<template>
  <!-- 顶部导航 -->
  <van-nav-bar
    title="购物车"
    left-arrow
  />
  <!-- 购物车列表 -->
  <div class="cart-list">
    购物车列表
  </div>
  <!-- 总计区域 -->
  <van-submit-bar
    :price="3050"
    button-text="去结算"
    @submit="onSubmit"
  >
    <van-checkbox v-model="checkedAll">
      全选
    </van-checkbox>
  </van-submit-bar>

  <!-- 公共底部 -->
  <layout-footer />
</template>

<script setup>
import LayoutFooter from '@/components/LayoutFooter.vue'
import { ref } from 'vue'
const checkedAll = ref(true)
</script>
<style lang="scss" scoped>
// 导航区域
.van-nav-bar{
  position: fixed !important;
  width: 100%;
  top:0;
}
// 列表区域
.cart-list{
  // 为了留出顶部和底部导航等区域的位置
  margin: 50px 0 100%;
}

// 提交总计区域
.van-submit-bar {
  bottom: 48px;
}
</style>

```

### 购物车列表请求

```js
// src\api\cart.js

// 获取购物车数据
export const getCartList = params => request({
  method: 'GET',
  url: '/cart/list',
  params
})

// 修改购物车某个商品数量
export const changeCartItemNum = data => request({
  method: 'POST',
  url: '/cart/num',
  data
})

```

```vue
<!-- src\views\Cart\index.vue -->

<script setup>
......

// 引入接口
+ import { getCartList } from '@/api/cart'

+ // 初始化购物车数据
+ const initCartList = async () => {
+   const { data } = await getCartList()
+   console.log(data)
+   if (data.status !== 200) return
+ }
+ initCartList()

......

</script>
```

### 封装商品组件

<img src="/images/vue/484.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

```
src                                    
├─ views                  
   ├─ Cart                
      ├─ componeents   (新建)    
      │  └─ CartItem.vue  (新建)  
      └─ index.vue        
```

使用了[复选框](https://vant-contrib.gitee.io/vant/#/zh-CN/checkbox#zi-ding-yi-yan-se)、[步进器](https://vant-contrib.gitee.io/vant/#/zh-CN/stepper)

1. 创建组件

```vue
<!--
 Cartitem.vue
-->
<template>
  <div class="cart-item">
    <!-- 状态选框 -->
    <van-checkbox
      checked-color="#ee0a24"
    >
      复选框
    </van-checkbox>
  </div>
</template>

<script setup>
import { } from 'vue'
</script>

<style lang="scss" scoped></style>

```

2. 组件引入

```vue
<!--
 * @author: chendaokuan
 * @since: 2022-05-17
 * src\views\Cart\index.vue
-->
<template>
......

  <!-- 购物车列表 -->
  <div class="cart-list">
    <cart-item />
    <cart-item />
  </div>
......

</template>

<script setup>
......

import CartItem from './componeents/CartItem.vue'

```

3. 完善组件布局

```vue
<!--
src\views\Cart\componeents\CartItem.vue
-->
<template>
  <div class="cart-item">
    <!-- 状态选框 -->
    <van-checkbox checked-color="#ee0a24" />
    <!-- 右侧点击跳转 -->
    <div class="link">
      <img
        class="logo"
        src="https://res7.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487228027/428_428_CEA6AE98B70ADB9265A2AAF6505A9377mp.png"
        alt=""
      >
      <div class="info">
        <p class="title">
          华为HUAWEI Mate Pro 10.8英寸2023款
        </p>
        <p class="detail">
          <span class="price">￥3666.00</span>
          <van-stepper
            max="10"
            button-size="26px"
          />
        </p>
        <p class="del">
          <span>删除</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { } from 'vue'
</script>

<style lang="scss" scoped>
  .cart-item {
    height: 90px;
    padding: 10px 20px;
    display: flex;
    // 下面的样式用于设置多个商品间的分割线
    background-color: #fff;
    margin-bottom: 1px;

    .link {
      width: 100%;
      display: flex;

      img {
        width: 88px;
        height: 88px;
        align-self: center;
      }

      .info {
        font-size: 14px;

        .title {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          -webkit-line-clamp: 1;
          margin: 5px 0 15px;
        }
        .detail {
          margin-bottom: 10px;

          .price {
            font-size: 16px;
            color: #F2270C;
          }

          .van-stepper {
            float: right;
          }
        }
        .del {
          direction: rtl;
        }
      }
    }
  }
</style>

```

```vue
// src\views\Cart\index.vue
<style lang="scss" scoped>
......

// 列表区域
.cart-list{
  // 为了留出顶部和底部导航等区域的位置
  margin: 50px 0 100%;
+ // 设置列表区域为灰色
+   background-color: #F2F2F2;

}
......
</style>
```

## 4. 状态管理

### 1. 请求到的数据添加vuex

把请求到的数据筛选以后，根据vuex的数据需求添加进vuex。如果有新数据，再把请求到的数据筛选以后......

<img src="/images/vue/485.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```js
import { createStore } from 'vuex'

export default createStore({
  // state相当于Vue的data
  state () {
    return {
      // 用户Token 信息
      token: window.localStorage.getItem('USER_TOKEN'),
      // 用于存储购物车的数据(sku的id、checked、count、title、price、stock)
   +   cartList: []
    }
  },
  // mutations用于更改state
  mutations: {
    // ---------用户功能：设置用户Token---------
    setUser (state, payload) {
      state.token = payload
      window.localStorage.setItem('USER_TOKEN', payload)
    },
    // ------购物车功能-------
  +  // 1. 添加商品
  +  addToCart (state, payload) {
  +    // payload 应该为包含sku相关信息的对象，具体信息参考 state.cartList 的相关说明
  +    state.cartList.push(payload)
  +  },
  +  // 清除数据
  +  clear (state) {
  +    state.cartList = []
  +  }
  }
})

```

```vue
<!--
 * @author: chendaokuan
 * @since: 2022-05-17
 * src\views\Cart\index.vue
-->
......

<script setup>
......
+ import { useStore } from 'vuex'
+ const store = useStore()

// 初始化购物车数据
const initCartList = async () => {
  const { data } = await getCartList()
  console.log(data)
  if (data.status !== 200) return

  // 数据处理，将处理后需要的数据通过vuex进行状态管理
+  data.data.valid.forEach(item => {
+    // 提交给store里的addToCart() 的数据必须复合要求
+    store.commit('addToCart', {
+      id: item.id,
+      checked: true,
+      count: item.cart_num,
+      image: item.productInfo.image,
+      title: item.productInfo.store_name,
+      price: item.truePrice,
+      stock: item.trueStock
+    })
+  })
}
initCartList()

const checkedAll = ref(true)
</script>
```

### 2. 存储vuex的数据并渲染到页面

```vue
<template>
......
  <!-- 购物车列表 -->
  <div class="cart-list">
    <cart-item
      v-for="item in cartList"
      :key="item.id"
      :item-data="item"
    />
  </div>
......

</template>
<script setup>
......
import { nextTick, ref } from 'vue'
// ------1. 列表数据处理------
// 存储数据
const cartList = computed(() => store.state.cartList)

// 初始化购物车数据
const initCartList = async () => {
  const { data } = await getCartList()
  console.log(data)
  if (data.status !== 200) return

  // 请求到新数据后，将原始数据清空，随后更新为新数据
+  store.commit('clear')

+  await nextTick()

+  // 数据处理，将处理后需要的数据通过vuex进行状态管理
+  data.data.valid.forEach(item => {
+    // 提交给store里的addToCart() 的数据必须复合要求
+    console.log('222')
+ 
+    store.commit('addToCart', {
+      id: item.id,
+      checked: true,
+      count: item.cart_num,
+      image: item.productInfo.image,
+      title: item.productInfo.store_name,
+      price: item.truePrice,
+      stock: item.trueStock
+    })
+  })
}
initCartList()
</script>
```
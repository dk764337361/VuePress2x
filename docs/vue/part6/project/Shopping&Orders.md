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
    <van-action-bar-icon icon="chat-o" text="客服" color="#ee0a24" />
    <van-action-bar-icon icon="cart-o" text="购物车" to="/cart" />
    <van-action-bar-icon icon="star" text="已收藏" color="#ff5000" />
    <van-action-bar-button
      type="warning"
      text="加入购物车"
      @click="handleCartAdd"
    />
    <van-action-bar-button type="danger" text="立即购买" />
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

此时清除本地 token，并刷新页面更新 Vuex 状态（此时 vuex 的 token 为 0），测试是否成功

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
export const addToCart = (data) =>
  request({
    method: 'POST',
    url: '/cart/add',
    data,
  })
```

### 2. API 引入与数据传递

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

需要使用的组件有 [NavBar 导航栏](https://vant-contrib.gitee.io/vant/#/zh-CN/nav-bar)、[SubmitBar 提交订单栏](https://vant-contrib.gitee.io/vant/#/zh-CN/submit-bar#gao-ji-yong-fa)

```vue
<!--
 * @author: chendaokuan
 * @since: 2022-05-17
 * src\views\Cart\index.vue
-->
<template>
  <!-- 顶部导航 -->
  <van-nav-bar title="购物车" left-arrow />
  <!-- 购物车列表 -->
  <div class="cart-list">
    购物车列表
  </div>
  <!-- 总计区域 -->
  <van-submit-bar :price="3050" button-text="去结算" @submit="onSubmit">
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
.van-nav-bar {
  position: fixed !important;
  width: 100%;
  top: 0;
}
// 列表区域
.cart-list {
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
export const getCartList = (params) =>
  request({
    method: 'GET',
    url: '/cart/list',
    params,
  })

// 修改购物车某个商品数量
export const changeCartItemNum = (data) =>
  request({
    method: 'POST',
    url: '/cart/num',
    data,
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
    <van-checkbox checked-color="#ee0a24">
      复选框
    </van-checkbox>
  </div>
</template>

<script setup>
import {} from 'vue'
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
      />
      <div class="info">
        <p class="title">
          华为HUAWEI Mate Pro 10.8英寸2023款
        </p>
        <p class="detail">
          <span class="price">￥3666.00</span>
          <van-stepper max="10" button-size="26px" />
        </p>
        <p class="del">
          <span>删除</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {} from 'vue'
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
          color: #f2270c;
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

## 3.1. 状态管理

### 1. 请求到的数据添加 vuex

把请求到的数据筛选以后，根据 vuex 的数据需求添加进 vuex。如果有新数据，再把请求到的数据筛选以后......

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

### 2. 存储 vuex 的数据并渲染到页面

```vue
<template>
  ......
  <!-- 购物车列表 -->
  <div class="cart-list">
    <cart-item v-for="item in cartList" :key="item.id" :item-data="item" />
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
+    // (sku的id,checked,count,title,price,stock)
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

## 3.2. 当购物车为空时

当购物车为空时,展示`空状态`

需使用[Empty 空状态](https://vant-contrib.gitee.io/vant/#/zh-CN/empty)组件

<img src="/images/vue/132.gif" style="width: 100%; display:inline-block; margin: 0 ;">

```vue
<!--
 * @author: chendaokuan
 * @since: 2022-05-17
 * src\views\Cart\index.vue
-->
<template>
  <!-- 顶部导航 -->
  ......

  <!-- 购物车列表 -->
  +
  <div class="cart-list" v-if="hasItem">
    <cart-item v-for="item in cartList" :key="item.id" :item-data="item" />
  </div>
  <!-- 当购物车为空展示 -->
  + <van-empty description="购物车还没有商品噢" v-else />

  <!-- 总计区域 -->
  ......
  <!-- 公共底部 -->
  <layout-footer />
</template>

<script setup>

......

// ------1. 列表数据处理------
// 存储数据
const cartList = computed(() => store.state.cartList)
// 检测购物车是否为空
+ const hasItem = computed(() => cartList.value.length !== 0)

......
</script>
```

## 3.3 数据处理

### 1. 数据渲染

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
      <img class="logo" + :src="itemData.image" alt="" />
      <div class="info">
        <p class="title" + v-text="itemData.title" />
        <p class="detail">
          + <span class="price">{{ itemData.price }}</span>
          <van-stepper + :max="itemData.stock" button-size="26px" />
        </p>
        <p class="del">
          <span>删除</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// 接收父组件传递的数据
const { itemData } = defineProps({
  itemData: {
    type: Object,
    require: true,
  },
})
</script>
```

### 2. 点击商品跳转到详情页

<img src="/images/vue/133.gif" style="width: 50%; display:inline-block; margin: 0 ;">

```vue
// src\views\Cart\index.vue
<script setup>
......

  // 数据处理，将处理后需要的数据通过vuex进行状态管理
  data.data.valid.forEach(item => {
    // 提交给store里的addToCart() 的数据必须复合要求
    // (sku的id,checked,count,title,price,stock,productId)
    store.commit('addToCart', {
      id: item.id,
      checked: true,
      count: item.cart_num,
      image: item.productInfo.image,
      title: item.productInfo.store_name,
      price: item.truePrice,
      stock: item.trueStock,
    +  product_id: item.product_id
    })
  })

......
</script>
```

```vue
<!--
src\views\Cart\componeents\CartItem.vue
-->
<template>
  <div class="cart-item">
    <!-- 状态选框 -->
    <van-checkbox checked-color="#ee0a24" />
    <!-- 右侧点击跳转 -->
    <div class="link" + @click="handleRouter">
      <img class="logo" :src="itemData.image" alt="" />
      <div class="info">
        <p class="title" v-text="itemData.title" />
        <p class="detail">
          <span class="price">{{ itemData.price }}</span>
          <van-stepper :max="itemData.stock" button-size="26px" />
        </p>
        <p class="del">
          <span>删除</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// 接收父组件传递的数据
import { useRouter } from 'vue-router'
const { itemData } = defineProps({
  itemData: {
    type: Object,
    require: true
  }
})
const router = useRouter()

+ // 点击商品跳转
+ const handleRouter = () => {
+   router.push({
+     name: 'product',
+     params: {
+       productId: itemData.product_id
+     }
+   })
+ }
</script>
```

但此时单击`计数器`也会跳转，原因是`计数器`被渲染成普通标签后，也会向上冒泡。

解决：使用时间修饰符`.stop`。

`@click="$event.stopPropagation()"` 等同于事件修饰符

```vue
<!--
src\views\Cart\componeents\CartItem.vue
-->
<template>
  ......
  <p class="detail">
    <span class="price">{{ itemData.price }}</span>
    <van-stepper :max="itemData.stock" button-size="26px" @click.stop />
  </p>
  ......
</template>
```

## 3.4 选中状态处理

<img src="/images/vue/134.gif" style="width: 50%; display:inline-block; margin: 0 ;">

### 1.通过计算属性的 get 与 set 绑定数据

```vue
<!--
src\views\Cart\componeents\CartItem.vue
-->
<template>
  <div class="cart-item">
    <!-- 状态选框 -->
    <van-checkbox checked-color="#ee0a24" + v-model="itemChecked" />

    ......
  </div>
</template>

<script setup>
......

import { computed } from 'vue'
import { useStore } from 'vuex'

......

// 通过计算属性，来分别处理v-model 的获取与设置操作
const store = useStore()
const itemChecked = computed({
  get: () => itemData.checked,
  set: newChecked => {
    // 通过vuex的手段进行状态更新
    store.commit('checkedChange', {
      checked: newChecked,
      id: itemData.id
    })
  }
})

......
</script>
```

### 2. 取到相应 id，通过 store 提交 commit

```js
import { createStore } from 'vuex'

export default createStore({
.....
  mutations: {
.....
    // 商品状态更改
    checkedChange (state, { id, checked }) {
    // checkedChange (state, payload) {
      // 根据传参，找到制定数据，修改状态
      // 写法一：
      // state.cartList.find(item => item.id === id).checked = checked
      // 写法二：
      const currentItem = state.cartList.find(item => item.id === id)
      currentItem.checked = checked
    }
  }
})

```

## 3.5 在不同设备里同步【步进器】的数值

`计数变化`不仅要在本地做处理，还要调用服务器接口再处理，这样就可以在不同设备进行查看

<img src="/images/vue/135.gif" style="width: 100%; display:inline-block; margin: 0 ;">

::: tip 提示
在 vuex 里，commit 调用 mutations（同步），dispatch 调用 actions（异步）
:::

```js
// src\store\index.js

import { createStore } from 'vuex'
// 导入请求模块
+ import { changeCartItemNum } from '@/api/cart'

+ export default createStore({
 ......

+   mutations: {
+ ......
     // 商品个数更改
+     countChange (state, { id, count }) {
+       state.cartList.find(item => item.id === id).count = count
+     }
+   },
+   actions: {
+     // 写法一：
+     // countChange (context,payload) {
+     // 异步提交mutations更改数据
+     //   context.commit('countChange', payload)
+     // }
+     // 写法二：
+     // 将context的commit解构出来，直接调用commit
+     async countChange ({ commit }, payload) {
+       // 异步提交mutations更改数据
+       commit('countChange', payload)
+       // 发送请求
+       const { data } = await changeCartItemNum({
+         id: payload.id,
+         number: payload.count
+       })
+       if (data.status !== 200) return
+     }
+   }
+ })

```

```vue
<!--
src\views\Cart\componeents\CartItem.vue
-->
<template>
  .....

  <p class="detail">
    <span class="price">{{ itemData.price }}</span>
    <van-stepper
      +
      v-model="itemCount"
      :max="itemData.stock"
      button-size="26px"
      @click="$event.stopPropagation()"
      @click.stop
    />
  </p>

  .....
</template>

<script setup>
.....

// 通过计算属性，来分别处理v-model 的获取与设置操作
.....
// 个数变化处理
const itemCount = computed({
  get: () => {
    return itemData.count
  },
  set: (newCount) => {
    // 通过action 进行处理
    // commit调用mutations，dispatch调用actions
    store.dispatch('countChange', {
      count: newCount,
      id: itemData.id
    })
  }
})

// 点击商品跳转
.....
</script>
.....
```

## 3.6 总计区域

### 1. 操作[复选框](https://vant-contrib.gitee.io/vant/#/zh-CN/checkbox#zi-ding-yi-yan-se)，在 vuex 里返回已选中的商品

在 index.vue 里操作[Stepper 步进器](https://vant-contrib.gitee.io/vant/#/zh-CN/stepper)，发送请求，在 vuex 里通过计算属性（getters）数据，返回已选中的商品

通过 VueTools 测试计算属性（getters）数据

<img src="/images/vue/136.gif" style="width: 100%; display:inline-block; margin: 0 ;">

```js
// src\store\index.js

import { createStore } from 'vuex'
// 导入请求模块
import { changeCartItemNum } from '@/api/cart'

export default createStore({
  // state相当于Vue的data
  state () {
  ......
  },
  getters: {
    checkedItems: state => {
      // 在ES6中，filter是数组的筛选方法
      return state.cartList.filter(item => item.checked === true)
    }
  },
  mutations: {
  ......

  },
  actions: {
  ......

  }
})

```

### 2. 通过 getters 求和已选中的商品的价格

```js
// src\store\index.js

.....

export default createStore({
  // state相当于Vue的data
  state () {
  ......

  },
  getters: {
    // 1. 筛选选中的选项
    checkedItems: state => {
      //  - 在ES6中，filter是数组的筛选方法
      return state.cartList.filter(item => item.checked === true)
    },
    // 2. 基于选中项目计算价格
    //    getters参数是访问其他getters的获取方式
    totalPrice (state, getters) {
      // 对所有勾选商品进行价格统计，并保留两位小数
      // - 在ES6中，reduce是数组的累加方法
      // - toFixed()保留多少位小数
      return getters.checkedItems.reduce((sum, item) => sum + item.price * item.count, 0).toFixed(2)
    }
  },
  mutations: {
  ......
  },
  actions: {
  ......

})

```

<img src="/images/vue/137.gif" style="width: 100%; display:inline-block; margin: 0 ;">

### 3.绑定 vuex 的 getters 的求和数据，渲染到页面

```vue
<!--
src\views\Cart\componeents\CartItem.vue
-->

<template>
  ......
  <!-- 总计区域 -->
  <van-submit-bar :price="store.getters.totalPrice * 100" button-text="去结算">
    <van-checkbox v-model="checkedAll">
      全选
    </van-checkbox>
  </van-submit-bar>

  <!-- 公共底部 -->
  <layout-footer />
</template>
```

<img src="/images/vue/138.gif" style="width: 100%; display:inline-block; margin: 0 ;">

### 4.全选按钮

1. 在 vuex 的 getters 封装方法，测试

```js
// src\store\index.js
......

export default createStore({
  // state相当于Vue的data
  state () {
  ......

  },
  getters: {
    // 1. 筛选选中的选项
    checkedItems: state => {
      //  - 在ES6中，filter是数组的筛选方法
      return state.cartList.filter(item => item.checked === true)
    },
    // 2. 基于选中项目计算价格
    //    getters参数是访问其他getters的获取方式
    totalPrice (state, getters) {
      // 对所有勾选商品进行价格统计，并保留两位小数
      // - 在ES6中，reduce是数组的累加方法
      // - toFixed()保留多少位小数
      return getters.checkedItems.reduce((sum, item) => sum + item.price * item.count, 0).toFixed(2)
    },
  +  // 3. 全选按钮状态
  +  checkedAll (state, getters) {
  +    return state.cartList.length === getters.checkedItems.length
  +  }
  },
  mutations: {
  ......

  },
  actions: {
  ......
  }
})

```

<img src="/images/vue/139.gif" style="width: 70%; display:inline-block; margin: 0 ;">

2. 点击商品复选框，测试全选按钮（上到下）

```vue
<!--
 * @author: chendaokuan
 * @since: 2022-05-17
 * src\views\Cart\index.vue
-->
<template>
  ......

  <!-- 总计区域 -->
  <van-submit-bar :price="store.getters.totalPrice * 100" button-text="去结算">
    +
    <van-checkbox v-model="checkedAll">
      全选
    </van-checkbox>
  </van-submit-bar>

  <!-- 公共底部 -->
  <layout-footer />
</template>

<script setup>
......

- // const checkedAll = ref(true)
+ // -------2. 全选处理---------
+ const checkedAll = computed({
+   get: () => store.getters.checkedAll,
+   set: () => {
+
+   }
+ })
</script>
```

<img src="/images/vue/140.gif" style="width: 100%; display:inline-block; margin: 0 ;">

3. 点击全选按钮，测试商品复选框（下到上）

```vue
<!--
 * @author: chendaokuan
 * @since: 2022-05-17
 * src\views\Cart\index.vue
-->
<template>
  ......

  <!-- 总计区域 -->
  <van-submit-bar :price="store.getters.totalPrice * 100" button-text="去结算">
    +
    <van-checkbox v-model="checkedAll">
      全选
    </van-checkbox>
  </van-submit-bar>

  <!-- 公共底部 -->
  <layout-footer />
</template>

<script setup>
......

  // -------2. 全选处理---------
  const checkedAll = computed({
    get: () => store.getters.checkedAll,
+   set: (newStatus) => {
+     store.commit('changeAll', { checked: newStatus })
+   }
  })
</script>
```

```js
// src\store\index.js

  ......

export default createStore({
  // state相当于Vue的data
  state () {
  ......
  },
  getters: {
  ......
  },
  mutations: {
  ......
    // 全选按钮（主动操作全选）
    changeAll (state, { checked }) {
      // 遍历，为所有选项设置统一的状态
      state.cartList.forEach(item => item.checked = checked)
    }
  },
  actions: {
  ......
  }
})

```

<img src="/images/vue/141.gif" style="width: 100%; display:inline-block; margin: 0 ;">

## 4. 状态模块拆分

当我们存在多个需要管理状态的业务，应该把不同的业务功能，拆分成不同的模块进行处理

[Vuex 的 Module 介绍](https://vuex.vuejs.org/zh/guide/modules.html#module)

### 1. 模块划分

```
store
├─ modules
│  ├─ cart.js  (新建)
│  └─ user.js  (新建)
└─ index.js    (引入cart.js和user.js)
```

- cart.js 和 user.js 的模板

```js
const state = {}
const getters = {}
const mutaions = {}
const actions = {}

export default {
  nameSpaced: true,
  state,
  getters,
  mutaions,
  actions,
}
```

### 2. 模块引入

```js{3-5,10-15}
// src\store\index.js

import { createStore } from 'vuex'

// 将封装的状态模块引入
import user from './modules/user'
import cart from './modules/cart'

// 导入请求模块
import { changeCartItemNum } from '@/api/cart'

export default createStore({
  // 添加modules 选项
  modules: {
    user,
    cart,
  },

  // state相当于Vue的data
  // state () {
  //   return {
  //     // 用户Token 信息
  //     token: window.localStorage.getItem('USER_TOKEN'),
  //     // 用于存储购物车的数据(sku的id、checked、count、image、title、price、stock、productId)
  //     cartList: []
  //   }
  // },
  // getters: {
  //   // 1. 筛选选中的选项
  //   checkedItems: state => {
  //     //  - 在ES6中，filter是数组的筛选方法
  //     return state.cartList.filter(item => item.checked === true)
  //   },
  //   // 2. 基于选中项目计算价格
  //   //    getters参数是访问其他getters的获取方式
  //   totalPrice (state, getters) {
  //     // 对所有勾选商品进行价格统计，并保留两位小数
  //     // - 在ES6中，reduce是数组的累加方法
  //     // - toFixed()保留多少位小数
  //     return getters.checkedItems.reduce((sum, item) => sum + item.price * item.count, 0).toFixed(2)
  //   },
  //   // 3. 全选按钮状态
  //   checkedAll (state, getters) {
  //     return state.cartList.length === getters.checkedItems.length
  //   }
  // },
  // mutations: {
  //   // 用户功能：设置用户Token
  //   setUser (state, payload) {
  //     state.token = payload
  //     window.localStorage.setItem('USER_TOKEN', payload)
  //   },
  //   // ------购物车功能-------
  //   // 1. 添加商品
  //   addToCart (state, payload) {
  //     // payload 应该为包含sku相关信息的对象，具体信息参考 state.cartList 的相关说明
  //     state.cartList.push(payload)
  //   },
  //   // 清除数据
  //   clear (state) {
  //     state.cartList = []
  //   },
  //   // 商品状态更改
  //   checkedChange (state, { id, checked }) {
  //   // checkedChange (state, payload) {
  //     // 根据传参，找到制定数据，修改状态
  //     // 写法一：
  //     // state.cartList.find(item => item.id === id).checked = checked
  //     // 写法二：
  //     const currentItem = state.cartList.find(item => item.id === id)
  //     currentItem.checked = checked
  //   },
  //   // 商品个数更改
  //   countChange (state, { id, count }) {
  //     state.cartList.find(item => item.id === id).count = count
  //   },
  //   // 全选按钮（主动操作全选）
  //   changeAll (state, { checked }) {
  //     // 遍历，为所有选项设置统一的状态
  //     state.cartList.forEach(item => item.checked = checked)
  //   }
  // },
  // actions: {
  //   // 写法一：
  //   // countChange (context,payload) {
  //   // 异步提交mutations更改数据
  //   //   context.commit('countChange', payload)
  //   // }
  //   // 写法二：
  //   // 将context的commit解构出来，直接调用commit
  //   async countChange ({ commit }, payload) {
  //     // 异步提交mutations更改数据
  //     commit('countChange', payload)
  //     // 发送请求
  //     const { data } = await changeCartItemNum({
  //       id: payload.id,
  //       number: payload.count
  //     })
  //     if (data.status !== 200) return
  //   }
  // }
})
```

### 3. 用户与购物车模块的处理

#### 1. user.js

```js
// src\store\modules\user.js

const state = {
  // 用户Token 信息
  token: window.localStorage.getItem('USER_TOKEN'),
}
const getters = {}
const mutations = {
  // 用户功能：设置用户Token
  setUser(state, payload) {
    state.token = payload
    window.localStorage.setItem('USER_TOKEN', payload)
  },
}
const actions = {}

export default {
  nameSpaced: true,
  state,
  getters,
  mutations,
  actions,
}
```

#### 2. cart.js

```js
// src\store\modules\cart.js

// 导入请求模块
import { changeCartItemNum } from '@/api/cart'

const state = {
  // 用于存储购物车的数据（sku 的 id，checked，count，image,title，price，stock，productId）
  cartList: [],
}
const getters = {
  // 筛选选中的选项
  checkedItems: (state) => {
    return state.cartList.filter((item) => item.checked === true)
  },
  // 基于选中项目计算价格
  totalPrice(state, getters) {
    // 对所有勾选商品进行价格统计，并保留两位小数
    return getters.checkedItems
      .reduce((sum, item) => sum + item.price * item.count, 0)
      .toFixed(2)
  },
  // 全选按钮状态
  checkedAll(state, getters) {
    return state.cartList.length === getters.checkedItems.length
  },
}
const mutations = {
  // 添加商品
  addToCart(state, payload) {
    // payload 应该为包含 sku 相关信息的对象，具体信息参考 state.cartList 说明
    state.cartList.push(payload)
  },
  // 清除数据
  clear(state) {
    state.cartList = []
  },
  // 商品状态更改
  checkedChange(state, { id, checked }) {
    // 根据传参，找到指定数据，修改状态
    // state.cartList.find(item => item.id === id).checked = checked
    const currentItem = state.cartList.find((item) => item.id === id)
    currentItem.checked = checked
  },
  // 商品个数更改
  countChange(state, { id, count }) {
    state.cartList.find((item) => item.id === id).count = count
  },
  // 全选（主动操作全选按钮）
  changeAll(state, { checked }) {
    // 为所有选项设置统一的状态
    state.cartList.forEach((item) => (item.checked = checked))
  },
}

const actions = {
  async countChange({ commit }, payload) {
    // 提交 mutation 更改数据
    commit('countChange', payload)
    // 发送请求
    const { data } = await changeCartItemNum({
      id: payload.id,
      number: payload.count,
    })
    if (data.status !== 200) {
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
```

#### 3. login 登录页

```vue
// src\views\Login\index.vue

<script>
......
// store.commit('setUser', data.data.token)
+  store.commit('user/setUser', data.data.token)
......
</script>
```

#### 4. 路由

```js
// src\router\index.js
......

// if (!store.state.token || !window.localStorage.getItem('USER_TOKEN')) {
+  if (!store.state.user.token || !window.localStorage.getItem('USER_TOKEN')) {

......
```

#### 5. 路由根地址与拦截.js

```js
// src\utils\request.js

......

  // 获取 Token
  // const { token } = store.state
  const { token } = store.state.user

......

```

#### 6. 购物车页面

```vue
// src\views\Cart\index.vue
<template>
......
  <!-- 总计区域 -->
  <!-- <van-submit-bar
    :price="store.getters.totalPrice*100"
    button-text="去结算"
  > -->
  <van-submit-bar
    :price="store.getters['cart/totalPrice']*100"
    button-text="去结算"
  >
</template>
<script setup>
......
// const cartList = computed(() => store.state.cartList)
const cartList = computed(() => store.state.cart.cartList)

    // 请求到新数据后，将原始数据清空，随后更新为新数据
  // store.commit('clear')
  store.commit('cart/clear')

      // store.commit('addToCart', {
    store.commit('cart/addToCart', {

          // store.commit('changeAll', { checked: newStatus })
    store.commit('cart/changeAll', { checked: newStatus })

      // get: () => store.getters.checkedAll,
  get: () => store.getters['cart/checkedAll'],
</script>
```

#### 6. 购物车子组件

```vue
src\views\Cart\componeents\CartItem.vue
<script setup>
......

// store.commit('checkedChange', {
store.commit('cart/checkedChange', {
......

// store.dispatch('countChange', {
store.dispatch('cart/countChange', {
</script>
```

## 5. 点击结算按钮，跳转订单确认页

<img src="/images/vue/142.gif" style="width: 100%; display:inline-block; margin: 0 ;">

不能使用`@click=""`，因为会产生事件冒泡，点击 “全选”按钮时，也会跳转

需使用[SubmitBar 提交订单栏提供的自定义 event 事件](https://vant-contrib.gitee.io/vant/#/zh-CN/submit-bar#events)，

### 1. 传递已选商品 id 到`订单确认页`

```vue
<!-- 总计区域 -->
<!-- <van-submit-bar
    :price="store.getters.totalPrice*100"
    button-text="去结算"
  > -->
<van-submit-bar
  :price="store.getters['cart/totalPrice'] * 100"
  button-text="去结算"
  +
  @submit="hanleClick"
>
    <van-checkbox v-model="checkedAll">
      全选
    </van-checkbox>
  </van-submit-bar>

<script setup>
// ------3. 跳转--------
import { useRouter } from 'vue-router'
const router = useRouter()
const handleClick = () => {
  router.push({
    name: 'order-confirm',
    // cartId 指的是要结算的所有sku的集合，以逗号连接后传递即可
    params: {
      // map遍历返回选中商品的id（转换成字符串），组成新增数组。
      cartId: store.getters['cart/checkedItems']
        .map((item) => item.id)
        .toString(),
    },
  })
}
</script>
```

## 6. 订单确认页

### 1. 页面基础布局

<img src="/images/vue/486.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

```vue
<!--
 * @author: chendaokuan
 * @since: 2022-05-28
 * Path: src\views\OrderConfirm\index.vue
-->
<template>
  <!-- 导航 -->
  <van-nav-bar title="订单确认页" left-text="返回" left-arrow />
  <!-- 主体内容 -->
  <div class="container">
    主体内容
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.van-nav-bar {
  position: fixed !important;
  width: 100%;
}
.container {
  padding: 50px 0;
}
</style>
```

### 2. 地址栏的接口封装

#### 1.新建 order.js

```
src
├─ api
   ├─ cart.js
   ├─ index.js
   ├─ order.js  (新建)
   ├─ product.js
   └─ user.js
```

```js
// src\api\order.js

import request from '@/utils/request'

// 获取用户收件地址信息
export const getAddressList = (params) =>
  request({
    method: 'GET',
    url: '/address/list',
    params,
  })
```

#### 2. 引入 API，测试数据

<img src="/images/vue/487.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```vue
<!--
 * @author: chendaokuan
 * @since: 2022-05-28
 * Path: src\views\OrderConfirm\index.vue
-->

......

<script setup>
// ---------1. 地址区域-----------
import { getAddressList } from '@/api/order'

const initAddressList = async () => {
  const { data } = await getAddressList({
    limit: 5,
    page: 1,
  })
  console.log(data)
}
initAddressList()
</script>

......
```

### 2. 地址栏布局与样式

<img src="/images/vue/488.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

```vue
<!--
 * @author: chendaokuan
 * @since: 2022-05-28
 * Path: src\views\OrderConfirm\index.vue
-->
<template>
  ......

  <!-- 主体内容 -->
  <div class="container">
    <!-- 1. 地址区域 -->
    <div class="address-card">
      <p class="info">
        <span class="username">小吴</span>
        <span>1234567</span>
      </p>
      <p class="detail">
        <span class="default">[默认]</span>
        <span>北京市北京市东城区6楼6单元</span>
      </p>
    </div>
  </div>
</template>

......

<style lang="scss" scoped>
.van-nav-bar {
  position: fixed !important;
  width: 100%;
}

+ .container {
+   padding: 50px 0;
+
+   // 地址卡片
+   .address-card {
+     padding: 20px 25px;
+     font-size: 16px;
+     position: relative;
+
+     // 径向渐变
+     &::after {
+       content: '';
+       position: absolute;
+       left: 0;
+       right: 0;
+       bottom: 0;
+       height: 2px;
+       background: repeating-linear-gradient(90deg,
+           #ff6c6c 0,
+           #ff6c6c 20%,
+           transparent 20%,
+           transparent 25%,
+           #0084ff 25%,
+           #0084ff 45%,
+           transparent 45%,
+           transparent 50%);
+           background-size: 80px;
+     }
+
+     .info {
+       span:first-child {
+         padding-right: 20px;
+       }
+     }
+
+     .detail {
+       padding-top: 5px;
+
+       .default {
+         padding-right: 5px;
+         background: #D6251f;
+         color: #fff;
+         font-size: 12px;
+         margin-right: 17px;
+         border-radius: 3px;
+       }
+     }
+   }
+ }
</style>
```

### 3. 弹出地址列表

使用[Popup 弹出层](https://vant-contrib.gitee.io/vant/#/zh-CN/popup)和[AddressList 地址列表](https://vant-contrib.gitee.io/vant/#/zh-CN/address-list)组件

#### 1. 组件引入与测试【使用组件的假数据】

<img src="/images/vue/143.gif" style="width: 50%; display:inline-block; margin: 0 ;">

```vue
<!--
 * @author: chendaokuan
 * @since: 2022-05-28
 * Path: src\views\OrderConfirm\index.vue
-->
<template>
  <!-- 导航 -->
  <van-nav-bar title="订单确认页" left-text="返回" left-arrow />
  <!-- 主体内容 -->
  <div class="container">
    <!-- 1. 地址区域 -->
    <div class="address-card" @click="triggerPopup">
      <p class="info">
        <span class="username">小吴</span>
        <span>1234567</span>
      </p>
      <p class="detail">
        <span class="default">[默认]</span>
        <span>北京市北京市东城区6楼6单元</span>
      </p>
    </div>
    <!-- 2. 地址弹出层 -->
    <van-popup v-model:show="popupStatus" position="bottom">
      <van-address-list
        v-model="chosenAddressId"
        :list="addresslist"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// ---------1. 地址区域-----------
import { getAddressList } from '@/api/order'
// 弹出层显示状态控制
const popupStatus = ref(false)
const triggerPopup = () => {
  popupStatus.value = true
}

// - 选中状态(从addresslist数据列表里选取id)
const chosenAddressId = ref('1')
// 地址数据
const addresslist = ref([
  {
    id: '1',
    name: '张三',
    tel: '13000000000',
    address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
    isDefault: true,
  },
  {
    id: '2',
    name: '李四',
    tel: '1310000000',
    address: '浙江省杭州市拱墅区莫干山路 50 号',
  },
])

// - 请求数据
const initAddressList = async () => {
  const { data } = await getAddressList({
    limit: 5,
    page: 1,
  })
  console.log(data)
}
initAddressList()
// 地址操作
const onAdd = () => Toast('新增地址')
const onEdit = (item, index) => Toast('编辑地址:' + index)
</script>

......
```

#### 2. 点击关闭组件

使用[地址列表的 Events 时间](https://vant-contrib.gitee.io/vant/#/zh-CN/address-list#events)的`@click-item`

<img src="/images/vue/144.gif" style="width: 50%; display:inline-block; margin: 0 ;">

```vue
<!--
 * @author: chendaokuan
 * @since: 2022-05-28
 * Path: src\views\OrderConfirm\index.vue
-->
<template>
......
    <!-- 2. 地址弹出层 -->
    <van-popup
      v-model:show="popupStatus"
      position="bottom"
    >
      <van-address-list
        v-model="chosenAddressId"
        :list="addresslist"
        default-tag-text="默认"
     +   @click-item="chosenAddress"
        @add="onAdd"
        @edit="onEdit"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// ---------1. 地址区域-----------
import { getAddressList } from '@/api/order'
// 弹出层显示状态控制
const popupStatus = ref(false)
const triggerPopup = () => {
  popupStatus.value = true
}
+ const chosenAddress = () => {
+   popupStatus.value = false
+ }

// - 选中状态(从addresslist数据列表里选取id)
const chosenAddressId = ref('1')
// 地址数据
const addresslist = ref([
  {
    id: '1',
    name: '张三',
    tel: '13000000000',
    address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
    isDefault: true
  },
  {
    id: '2',
    name: '李四',
    tel: '1310000000',
    address: '浙江省杭州市拱墅区莫干山路 50 号'
  }
])

// - 请求数据
const initAddressList = async () => {
  const { data } = await getAddressList({
    limit: 5,
    page: 1
  })
  console.log(data)
}
initAddressList()
// 地址操作
const onAdd = () => Toast('新增地址')
const onEdit = (item, index) => Toast('编辑地址:' + index)
</script>

......
```

### 4. 当无地址时，显示 van-empty 组件

<img src="/images/vue/145.gif" style="width: 100%; display:inline-block; margin: 0 ;">

使用[地址列表组件](https://vant-contrib.gitee.io/vant/#/zh-CN/address-list#slots)的自定义插槽，使用 isEmpty 函数（计算属性），如果数据长度为 0，使用`v-if`切换显示`van-empty`组件

```vue
<!--
 * @author: chendaokuan
 * @since: 2022-05-28
 * Path: src\views\OrderConfirm\index.vue
-->
<template>
  <!-- 导航 -->
  <van-nav-bar title="订单确认页" left-text="返回" left-arrow />
  <!-- 主体内容 -->
  <div class="container">
    <!-- 1. 地址区域 -->
    <!-- <div
      class="address-card"
    > -->
    <div class="address-card" @click="triggerPopup">
      <p class="info">
        <span class="username">小吴</span>
        <span>1234567</span>
      </p>
      <p class="detail">
        <span class="default">[默认]</span>
        <span>北京市北京市东城区6楼6单元</span>
      </p>
    </div>
    <!-- 2. 地址弹出层 -->
    <van-popup v-model:show="popupStatus" position="bottom">
      <van-address-list
        v-model="chosenAddressId"
        :list="addresslist"
        default-tag-text="默认"
        @click-item="chosenAddress"
        @add="onAdd"
        @edit="onEdit"
      >
        +
        <template + #top + v-if="isEmpty" +>
          <van-empty description="还没有地址噢" />
        </template>
      </van-address-list>
    </van-popup>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// ---------1. 地址区域-----------
import { getAddressList } from '@/api/order'
import { computed } from '@vue/reactivity'
// 弹出层显示状态控制
const popupStatus = ref(false)
const triggerPopup = () => {
  popupStatus.value = true
}
const chosenAddress = () => {
  popupStatus.value = false
}

// - 选中状态(从addresslist数据列表里选取id)
const chosenAddressId = ref('1')
// 地址数据
const addresslist = ref([
  {
    id: '1',
    name: '张三',
    tel: '13000000000',
    address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
    isDefault: true
  },
  {
    id: '2',
    name: '李四',
    tel: '1310000000',
    address: '浙江省杭州市拱墅区莫干山路 50 号'
  }
])
+  const isEmpty = computed(() => addresslist.value.length === 0)

// - 请求数据
const initAddressList = async () => {
  const { data } = await getAddressList({
    limit: 5,
    page: 1
  })
  console.log(data)
}
initAddressList()
// 地址操作
const onAdd = () => Toast('新增地址')
const onEdit = (item, index) => Toast('编辑地址:' + index)
</script>

......
```

## 7. 地址列表--数据处理

### 1. 请求数据

请求数据赋值给 addresslist，通过在计算属性用 map 遍历数据，做数据拼接

<img src="/images/vue/146.gif" style="width: 100%; display:inline-block; margin: 0 ;">

```vue
<!--
 * @author: chendaokuan
 * @since: 2022-05-28
 * Path: src\views\OrderConfirm\index.vue
-->
<template>
  <!-- 导航 -->
  <van-nav-bar title="订单确认页" left-text="返回" left-arrow />
  <!-- 主体内容 -->
  <div class="container">
    <!-- 1. 地址区域 -->
    <!-- <div
      class="address-card"
    > -->
    <div class="address-card" @click="triggerPopup">
      <p class="info">
        <span class="username">小吴</span>
        <span>1234567</span>
      </p>
      <p class="detail">
        <span class="default">[默认]</span>
        <span>北京市北京市东城区6楼6单元</span>
      </p>
    </div>
    <!-- 2. 地址弹出层 -->
    <van-popup v-model:show="popupStatus" position="bottom">
      <van-address-list
        v-model="chosenAddressId"
        :list="addresslist"
        default-tag-text="默认"
        @click-item="chosenAddress"
        @add="onAdd"
        @edit="onEdit"
      >
        <template #top v-if="isEmpty">
          <van-empty description="还没有地址噢" />
        </template>
      </van-address-list>
    </van-popup>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// ---------1. 地址区域-----------
import { getAddressList } from '@/api/order'
import { computed } from '@vue/reactivity'
// 弹出层显示状态控制
const popupStatus = ref(false)
const triggerPopup = () => {
  popupStatus.value = true
}
const chosenAddress = () => {
  popupStatus.value = false
}

// - 选中状态(从addresslist数据列表里选取id)
const chosenAddressId = ref('1')
// 地址数据
const addresslist = ref([
+  // - 数据格式
+  // {
+  //   id: '1',
+  //   name: '张三',
+  //   tel: '13000000000',
+  //   address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
+  //   isDefault: true
+  // }
])
const isEmpty = computed(() => addresslist.value.length === 0)

+  // 数据转换函数
+  const convertData = data => {
+    return data.map(item => ({
+      id: item.id,
+      name: item.real_name,
+      tel: item.phone,
+      address: item.province + item.city + item.district + item.detail,
+      isDefault: item.is_default
+    }))
+  }

// - 请求数据
const initAddressList = async () => {
  const { data } = await getAddressList({
    limit: 5,
    page: 1
  })
  console.log(data)
+   if (data.status !== 200) return
+   addresslist.value = convertData(data.data)
}
initAddressList()
// 地址操作
const onAdd = () => Toast('新增地址')
const onEdit = (item, index) => Toast('编辑地址:' + index)
</script>

......
```

### 2. 检测当前数据是否为默认数据

```vue
<!--
 * @author: chendaokuan
 * @since: 2022-05-28
 * Path: src\views\OrderConfirm\index.vue
-->
<template>
  <!-- 导航 -->
  <van-nav-bar title="订单确认页" left-text="返回" left-arrow />
  <!-- 主体内容 -->
  <div class="container">
    <!-- 1. 地址区域 -->
    <!-- <div
      class="address-card"
    > -->
    <div class="address-card" @click="triggerPopup">
      <p class="info">
        <span class="username">小吴</span>
        <span>1234567</span>
      </p>
      <p class="detail">
        <span class="default">[默认]</span>
        <span>北京市北京市东城区6楼6单元</span>
      </p>
    </div>
    <!-- 2. 地址弹出层 -->
    <van-popup v-model:show="popupStatus" position="bottom">
      <van-address-list
        v-model="chosenAddressId"
        :list="addresslist"
        default-tag-text="默认"
        @click-item="chosenAddress"
        @add="onAdd"
        @edit="onEdit"
      >
        <template #top v-if="isEmpty">
          <van-empty description="还没有地址噢" />
        </template>
      </van-address-list>
    </van-popup>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// ---------1. 地址区域-----------
import { getAddressList } from '@/api/order'
import { computed } from '@vue/reactivity'
// 弹出层显示状态控制
const popupStatus = ref(false)
const triggerPopup = () => {
  popupStatus.value = true
}
const chosenAddress = () => {
  // 更改弹出层显示状态
  popupStatus.value = false
}

// - 选中状态(从addresslist数据列表里选取id)
const chosenAddressId = ref('1')
// 地址数据
const currentAddress = ref({})
const addresslist = ref([])
const isEmpty = computed(() => addresslist.value.length === 0)

// 数据转换函数
+ const convertData = data => {
+   return data.map(item => {
+     const temp = {
+       id: item.id,
+       name: item.real_name,
+       tel: item.phone,
+       address: item.province + item.city + item.district + item.detail,
+       isDefault: item.is_default
+     }
+
+     if (item.is_default === 1) {
+       // 记录勾选的ID
+       chosenAddressId.value = item.id
+       // 记录当期展示的数据
+       currentAddress.value = temp
+     }
+     return temp
+   })
}

// - 请求数据
const initAddressList = async () => {
  const { data } = await getAddressList({
    limit: 5,
    page: 1
  })
  console.log(data)
  if (data.status !== 200) return
  addresslist.value = convertData(data.data)
}
initAddressList()
// 地址操作
const onAdd = () => Toast('新增地址')
const onEdit = (item, index) => Toast('编辑地址:' + index)
</script>

......
```

### 3. 点击列表，选取数据

[AddressList 地址列表](https://vant-contrib.gitee.io/vant/#/zh-CN/address-list#events)组件的`Events`的`click-item`返回的是
item: AddressListAddress, index: number，以下测试

<img src="/images/vue/147.gif" style="width: 100%; display:inline-block; margin: 0 ;">

```vue
<!--
 * @author: chendaokuan
 * @since: 2022-05-28
 * Path: src\views\OrderConfirm\index.vue
-->
<template>
  <!-- 导航 -->
  <van-nav-bar title="订单确认页" left-text="返回" left-arrow />
  <!-- 主体内容 -->
  <div class="container">
    <!-- 1. 地址区域 -->
    <!-- <div
      class="address-card"
    > -->
    <div class="address-card" @click="triggerPopup">
      <p class="info">
        <span class="username">小吴</span>
        <span>1234567</span>
      </p>
      <p class="detail">
        <span class="default">[默认]</span>
        <span>北京市北京市东城区6楼6单元</span>
      </p>
    </div>
    <!-- 2. 地址弹出层 -->
    <van-popup v-model:show="popupStatus" position="bottom">
      <van-address-list
        v-model="chosenAddressId"
        :list="addresslist"
        default-tag-text="默认"
        @click-item="chosenAddress"
        @add="onAdd"
        @edit="onEdit"
      >
        <template #top v-if="isEmpty">
          <van-empty description="还没有地址噢" />
        </template>
      </van-address-list>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, toRaw } from 'vue'

// ---------1. 地址区域-----------
import { getAddressList } from '@/api/order'
import { computed } from '@vue/reactivity'
// 弹出层显示状态控制
const popupStatus = ref(false)
const triggerPopup = () => {
  popupStatus.value = true
}
+ const chosenAddress = (item) => {
+   // 1. 更改弹出层显示状态
+   popupStatus.value = false
+   // 2. 更新当前显示的数据
+   console.log(item)
+   // toRaw是Vue提供的响应式API，返回 reactive 或 readonly 代理的原始对象
+   console.log(toRaw(item))
  // 写法一：推荐
+   currentAddress.value = item
+   // 写法二：
// +   currentAddress.value = toRaw(item)
+ }

// - 选中状态(从addresslist数据列表里选取id)
const chosenAddressId = ref('')
// 地址数据
const currentAddress = ref({})
const addresslist = ref([])
const isEmpty = computed(() => addresslist.value.length === 0)

// 数据转换函数
const convertData = data => {
  return data.map(item => {
    const temp = {
      id: item.id,
      name: item.real_name,
      tel: item.phone,
      address: item.province + item.city + item.district + item.detail,
      isDefault: item.is_default
    }

    if (item.is_default === 1) {
      // 记录勾选的ID
      chosenAddressId.value = item.id
      // 记录当期展示的数据
      currentAddress.value = temp
    }
    return temp
  })
}

// - 请求数据
const initAddressList = async () => {
  const { data } = await getAddressList({
    limit: 5,
    page: 1
  })
  console.log(data)
  if (data.status !== 200) return
  addresslist.value = convertData(data.data)
}
initAddressList()
// 地址操作
const onAdd = () => Toast('新增地址')
const onEdit = (item, index) => Toast('编辑地址:' + index)
</script>

.....
```

### 3.选取数据完毕，绑定给数据给头部

<img src="/images/vue/148.gif" style="width: 100%; display:inline-block; margin: 0 ;">

```vue
<!--
 * @author: chendaokuan
 * @since: 2022-05-28
 * Path: src\views\OrderConfirm\index.vue
-->
<template>
  <!-- 导航 -->
  <van-nav-bar title="订单确认页" left-text="返回" left-arrow />
  <!-- 主体内容 -->
  <div class="container">
    <!-- 1. 地址区域 -->
    <div class="address-card" @click="triggerPopup">
      <p class="info">
        <span class="username" + v-text="currentAddress.name" />
        + <span v-text="currentAddress.tel" />
      </p>
      <p class="detail">
        <span class="default" + v-if="currentAddress.isDefault">[默认]</span>
        + <span v-text="currentAddress.address" />
      </p>
    </div>
    <!-- 2. 地址弹出层 -->
    <van-popup v-model:show="popupStatus" position="bottom">
      <van-address-list
        v-model="chosenAddressId"
        :list="addresslist"
        default-tag-text="默认"
        @click-item="chosenAddress"
        @add="onAdd"
        @edit="onEdit"
      >
        <template #top v-if="isEmpty">
          <van-empty description="还没有地址噢" />
        </template>
      </van-address-list>
    </van-popup>
  </div>
</template>
```

## 8. 新增地址

### 1. 基础布局

<img src="/images/vue/489.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

#### 新增地址页面和配置路由

```vue
src ├─ views ├─ Address └─ index.vue (新增)
```

#### 路由处理

```js
......


// 路由规则配置

const routes = [

    {
      path: '/address',
      name: 'address',
      component: () => import('@/views/Address/index.vue'),
      props: true,
      meta: { requireAuth: true }
    },


```

- index.vue

此处选择了[Form 表单](https://vant-contrib.gitee.io/vant/#/zh-CN/form)和[Cascader 级联选择](https://vant-contrib.gitee.io/vant/#/zh-CN/cascader)和[Form 表单项类型 - 开关](https://vant-contrib.gitee.io/vant/#/zh-CN/form#biao-dan-xiang-lei-xing---kai-guan)组件作为布局

```vue
<!--
 * @author: chendaokuan
 * @since: 2022-05-30
 * Path: src\views\Address\index.vue
-->
<template>
  <!-- 顶部导航 -->
  <van-nav-bar title="新增收货地址" left-text="返回" left-arrow />
  <!-- 表单 -->
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <!-- 1. 姓名 -->
      <van-field
        v-model="real_name"
        name="姓名"
        label="姓名"
        placeholder="收货人姓名"
      />
      <!-- 2. 手机号 -->
      <van-field
        v-model="phone"
        type="password"
        name="电话"
        label="电话"
        placeholder="收货人手机号"
      />
      <!-- 3. 地区 -->
      <van-field
        v-model="fieldValue"
        is-link
        readonly
        label="地区"
        placeholder="请选择所在地区"
        @click="show = true"
      />
      <van-popup v-model:show="show" round position="bottom">
        <van-cascader
          v-model="area"
          title="请选择所在地区"
          :options="options"
          @close="show = false"
          @finish="onFinish"
        />
      </van-popup>
      <!-- 4. 详细地址 -->
      <van-field
        v-model="detail"
        name="详细地址"
        label="详细地址"
        placeholder="详细地址信息"
      />
    </van-cell-group>
    <van-cell-group inset>
      <van-field name="switch" label="设为默认地址" input-align="right">
        <template #input>
          <van-switch v-model="checked" size="20" />
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup>
import { ref } from 'vue'
// -----------1. 数据处理------------
const real_name = ref('')
const phone = ref('')
const area = ref('')
const detail = ref('')
const is_default = ref(false)

// 地区菜单显示状态
const show = ref(false)
// 地区选择后，输入框显示的内容
const fieldValue = ref('')
const cascaderValue = ref('')
// 选项列表，children 代表子选项，支持多级嵌套
const options = [
  {
    text: '浙江省',
    value: '330000',
    children: [{ text: '杭州市', value: '330100' }],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [{ text: '南京市', value: '320100' }],
  },
]
// 全部选项选择完毕后，会触发 finish 事件
const onFinish = ({ selectedOptions }) => {
  show.value = false
  fieldValue.value = selectedOptions.map((option) => option.text).join('/')
}
</script>

<style lang="scss" scoped>
.van-form {
  background-color: #f7f7f7;
  .van-cell-group {
    margin-bottom: 10px;
  }
}
</style>
```

### 2. 级联选择组件的数据处理

#### 2.1 单独封装地址 API

```
src
├─ api
   ├─ address.js    (新建)
   ├─  ......
```

```js
// src\api\address.js

import request from '@/utils/request'

// 获取省市区列表
export const getCityList = () =>
  request({
    method: 'GET',
    url: '/city_list',
  })
```

#### 2.2 引入 API，测试数据

```vue
<!--
 * @author: chendaokuan
 * @since: 2022-05-30
 * Path: src\views\Address\index.vue
-->

......

<script setup>
import { ref } from 'vue'

// ---------2. 请求数据--------
+ import { getCityList } from '@/api/address'
// -----------1. 数据处理------------
const real_name = ref('')
const phone = ref('')
const area = ref('')
const detail = ref('')
const is_default = ref(false)

// 地区菜单显示状态
const show = ref(false)
// 地区选择后，输入框显示的内容
const fieldValue = ref('')
const cascaderValue = ref('')
// 选项列表，children 代表子选项，支持多级嵌套
+ const options = ref([
- //   {
- //     text: '浙江省',
- //     value: '330000',
- //     children: [{ text: '杭州市', value: '330100' }]
- //   },
- //   {
- //     text: '江苏省',
- //     value: '320000',
- //     children: [{ text: '南京市', value: '320100' }]
- //   }
+ ])
// 全部选项选择完毕后，会触发 finish 事件
const onFinish = ({ selectedOptions }) => {
  show.value = false
  fieldValue.value = selectedOptions.map((option) => option.text).join('/')
}
+ const initCityList = async () => {
+   const { data } = await getCityList()
+   console.log(data)
+   if (data.status !== 200) return
+   options.value = data.data
+ }
initCityList()
</script>

<style lang="scss" scoped>
.van-form {
  background-color: #f7f7f7;
  .van-cell-group {
    margin-bottom: 10px;
  }
}
</style>
```

此时后端传回的数据`字段名称`和[Cascader 级联选择](https://vant-contrib.gitee.io/vant/#/zh-CN/cascader)组件的数据`字段名称`格式不一致，此时需要使用[Cascader 级联选择的 field-names API](https://vant-contrib.gitee.io/vant/#/zh-CN/cascader#api)

<img src="/images/vue/490.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```vue
<!--
 * @author: chendaokuan
 * @since: 2022-05-30
 * Path: src\views\Address\index.vue
-->

......
<script>
......

// ---------2. 请求数据--------
+ // 设置组件自定义字段名
+ const fieldNames = {
+   text: 'n',
+   value: 'v',
+   children: 'c'
+ }

const initCityList = async () => {
  const { data } = await getCityList()
  console.log(data)
  if (data.status !== 200) return
  options.value = data.data
}
initCityList()
</script>

......
```

<img src="/images/vue/149.gif" style="width: 50%; display:inline-block; margin: 0 ;">

此时测试数据时，选到最后发现又多了个空选框，原因是选到市区时又多个了多余的 c,多余的 c 又被组件识别为新的列表，但列表没有项，此时需要处理。

需封装一个处理函数处理此问题。

```vue
<script setup>
......

// -----------1. 数据处理------------
......
// 全部选项选择完毕后，会触发 finish 事件
const onFinish = ({ selectedOptions }) => {
  show.value = false
+  console.log('selectedOptions:', selectedOptions)
+   fieldValue.value = selectedOptions.map((option) => option.n).join('/')
}

// ---------2. 请求数据--------
// 设置组件自定义字段名
const fieldNames = {
  text: 'n',
  value: 'v',
  children: 'c'
}

+ // 封装函数处理数据
+ const processData = data => {
+   data.forEach(item => {
+     // 找到空的c属性，说明item是区级信息，组件要求去掉c
+     if (item.c.length === 0) {
+       delete item.c
+     } else {
+       // 说明是省或市
+       processData(item.c)
+     }
+   })
+   return data
+ }

const initCityList = async () => {
  const { data } = await getCityList()
  console.log(data)
  if (data.status !== 200) return
+  options.value = processData(data.data)
}
initCityList()
</script>
```

<img src="/images/vue/150.gif" style="width: 100%; display:inline-block; margin: 0 ;">

### 4. 提交地址

<img src="/images/vue/151.gif" style="width: 100%; display:inline-block; margin: 0 ;">

```js
// src\api\address.js

......

+ // 新增（或编辑）地址
+ export const addAddress = data => request({
+   method: 'POST',
+   url: '/address/edit',
+   data
+ })

```

```vue
<!--
 * @author: chendaokuan
 * @since: 2022-05-30
 * Path: src\views\Address\index.vue
-->

......
<van-button
  round
  block
  type="primary"
  native-type="submit"
  +
  @click="handleAdd"
>
        提交
      </van-button>

......

<script setup>
......


+ import { getCityList, addAddress } from '@/api/address'
// -----------1. 数据处理------------
......

// 全部选项选择完毕后，会触发 finish 事件
const onFinish = ({ selectedOptions }) => {
  show.value = false
  console.log('selectedOptions:', selectedOptions)
  fieldValue.value = selectedOptions.map((option) => option.n).join('/')
  // 为提交接口准备数据
+  address = {
+    province: selectedOptions[0].n,
+    city: selectedOptions[1].n,
+    city_id: selectedOptions[1].v,
+    district: selectedOptions[2].n
+  }
}

// ---------2. 请求数据--------
......


+ // --------3. 提交数据-------
+ // 用于在选择地区后，整合接口需要的地区信息
+ let address = {}
+ const handleAdd = async () => {
+   const { data } = await addAddress({
+     // 新增操作，设置ID为0，如果为其他值，表示根据ID进行编辑
+     id: 0,
+     real_name: real_name.value,
+     phone: phone.value,
+     is_default: is_default.value,
+     detail: detail.value,
+     address
+   })
+   console.log(data)
+   if (data.status !== 200) return
+ }
</script>

......
```

## 9. 订单提交与跳转处理

<img src="/images/vue/152.gif" style="width: 100%; display:inline-block; margin: 0 ;">

```vue
<template>
<!-- src\views\OrderConfirm\index.vue -->

    <!-- 2. 地址弹出层 -->
    <van-popup
      v-model:show="popupStatus"
      position="bottom"
    >
      <van-address-list
        v-model="chosenAddressId"
        :list="addresslist"
        default-tag-text="默认"
        @click-item="chosenAddress"
      +  @add="onAdd"
        @edit="onEdit"
      >
        <template
          #top
          v-if="isEmpty"
        >
          <van-empty description="还没有地址噢" />
        </template>
      </van-address-list>
</template>
<script setup>
import { useRouter } from 'vue-router'


......

// 地址操作
- // const onAdd = () => Toast('新增地址')
+ const router = useRouter()
+ const { cartId } = defineProps({
+   cartId: {
+     type: String,
+     required: true
+   }
+ })
+ const onAdd = () => {
+   // 因为新增地址后还要回到订单确认页，这时需要传递 cartId
+   router.push({
+     name: 'address',
+     params: {
+       cartId
+     }
+   })
+ }


</script>
```

```vue
<!--
 * @author: chendaokuan
 * @since: 2022-05-30
 * Path: src\views\Address\index.vue
-->
<template>
  <!-- 顶部导航 -->
  <van-nav-bar title="新增收货地址" left-text="返回" left-arrow />
  <!-- 表单 -->
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <!-- 1. 姓名 -->
      <van-field
        v-model="real_name"
        name="姓名"
        label="姓名"
        placeholder="收货人姓名"
      />
      <!-- 2. 手机号 -->
      <van-field
        v-model="phone"
        type="password"
        name="电话"
        label="电话"
        placeholder="收货人手机号"
      />
      <!-- 3. 地区 -->
      <van-field
        v-model="fieldValue"
        is-link
        readonly
        label="地区"
        placeholder="请选择所在地区"
        @click="show = true"
      />
      <van-popup v-model:show="show" round position="bottom">
        <van-cascader
          v-model="area"
          title="请选择所在地区"
          :field-names="fieldNames"
          :options="options"
          @close="show = false"
          @finish="onFinish"
        />
      </van-popup>
      <!-- 4. 详细地址 -->
      <van-field
        v-model="detail"
        name="详细地址"
        label="详细地址"
        placeholder="详细地址信息"
      />
    </van-cell-group>
    <van-cell-group inset>
      <van-field name="switch" label="设置默认地址" input-align="right">
        <template #input>
          <van-switch v-model="is_default" size="20" />
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button
        round
        block
        type="primary"
        native-type="submit"
        @click="handleAdd"
      >
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup>
import { ref } from 'vue'

import { getCityList, addAddress } from '@/api/address'
+ import { useRouter } from 'vue-router'
// -----------1. 数据处理------------
const real_name = ref('')
const phone = ref('')
const area = ref('')
const detail = ref('')
const is_default = ref(false)

// 地区菜单显示状态
const show = ref(false)
// 地区选择后，输入框显示的内容
const fieldValue = ref('')
const cascaderValue = ref('')
// 选项列表，children 代表子选项，支持多级嵌套
const options = ref([])
// 全部选项选择完毕后，会触发 finish 事件
const onFinish = ({ selectedOptions }) => {
  show.value = false
  console.log('selectedOptions:', selectedOptions)
  fieldValue.value = selectedOptions.map((option) => option.n).join('/')
  // 为提交接口准备数据
  address = {
    province: selectedOptions[0].n,
    city: selectedOptions[1].n,
    city_id: selectedOptions[1].v,
    district: selectedOptions[2].n
  }
}

// ---------2. 请求数据--------
// 设置组件自定义字段名
const fieldNames = {
  text: 'n',
  value: 'v',
  children: 'c'
}

+ // 封装函数处理数据
+ const processData = data => {
+   data.forEach(item => {
+     // 找到空的c属性，说明item是区级信息，组件要求去掉c
+     if (item.c.length === 0) {
+       delete item.c
+     } else {
+       // 说明是省或市
+       processData(item.c)
+     }
+   })
+   return data
+ }
+
+ const initCityList = async () => {
+   const { data } = await getCityList()
+   console.log(data)
+   if (data.status !== 200) return
+   options.value = processData(data.data)
+ }
+ initCityList()

+ // --------3. 提交数据-------
+ // 用于在选择地区后，整合接口需要的地区信息
+ let address = {}
+ const { cartId } = defineProps({
+   cartId: {
+     type: String
+     // 此时就不写required，如果单独有个地址页，单独做新增，日后可能有这需求
+   }
+ })
+ const router = useRouter()
+ const handleAdd = async () => {
+   const { data } = await addAddress({
+     // 新增操作，设置ID为0，如果为其他值，表示根据ID进行编辑
+     id: 0,
+     real_name: real_name.value,
+     phone: phone.value,
+     is_default: is_default.value,
+     detail: detail.value,
+     address
+   })
+   console.log(data)
+   if (data.status !== 200) return
+   // 成功时检测是否要回到订单确认页
+   if (cartId) {
+     router.push({
+       name: 'order-confirm',
+       params: {
+         cartId
+       }
+     })
+   } else {
+     router.push('/user')
+   }
+ }
+ handleAdd()
</script>

......
```

## 10. 订单列表布局

<img src="/images/vue/492.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

使用了[SubmitBar 提交订单栏](https://vant-contrib.gitee.io/vant/#/zh-CN/submit-bar#ji-chu-yong-fa)作为底部组件

```vue
<!--
 * @author: chendaokuan
 * @since: 2022-05-28
 * Path: src\views\OrderConfirm\index.vue
-->
<template>
  <!-- 导航 -->
  <van-nav-bar title="订单确认页" left-text="返回" left-arrow />
  <!-- 主体内容 -->
  <div class="container">
    <!-- 1. 地址区域 -->
    ......
    <!-- 2. 地址弹出层 -->
    ...... +
    <!-- 3. 商品列表  -->
    +
    <div class="product-list">
      +
      <!-- 标题区域 -->
      + <van-cell-group> + <van-cell title="共3件" /> + </van-cell-group> +
      <!-- 内容区域 -->
      +
      <van-cell-group>
        +
        <van-cell class="product">
          +
          <img
            +
            src="https://res.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487235773/428_428_0CDE1D66587B3446E435A815610D75F9mp.png"
            +
            alt=""
            +
          />
          +
          <div class="info">
            +
            <p class="title">
              + HUAWEI P50 8GB+256GB（曜金黑）8GB+256GB（曜金黑） +
            </p>
            +
            <p class="price">
              + ￥3699.00 +
            </p>
            +
          </div>
          + <span class="count">X3</span> +
        </van-cell>
        +
      </van-cell-group>
      +
    </div>
  </div>
  +
  <van-submit-bar
    +
    :price="3050"
    +
    label="订单总计："
    +
    button-text="立即付款"
    +
    @submit="onSubmit"
    +
  />
</template>

......

<style lang="scss" scoped>
......

.container {
  padding: 50px 0;

  // 地址卡片
   .address-card {
   ......
  }

+ // 商品列表
+ .product-list {
+   :deep(.van-cell__value) {
+     display: flex;
+     align-items: center;
+
+     img {
+       width: 70px;
+       height: 70px;
+     }
+     .info{
+       padding-left: 5px;
+
+       .title{
+         display: -webkit-box;
+         -webkit-box-orient: vertical;
+         -webkit-line-clamp:1;
+         overflow: hidden;
+         padding: 0 15px 5px 0;
+       }
+       .price{
+         color: #F2270C;
+       }
+     }
+     .count{
+       color: #aaa;
+     }
+   }
+ }
}
</style>
```

## 11. 订单列表-数据处理

### 1. 封装 API

```js
// src\api\order.js

......

+ // 获取确认订单需要的相关数据
+ export const confirmOrder = data => request({
+   method: 'POST',
+   url: '/order/confirm',
+   data
+ })

```
### 2. 引入API，测试渲染数据

<img src="/images/vue/153.gif" style="width: 50%; display:inline-block; margin: 0 ;">

```vue
<!--
 * @author: chendaokuan
 * @since: 2022-05-28
 * Path: src\views\OrderConfirm\index.vue
-->
<template>
  <!-- 导航 -->
  <van-nav-bar title="订单确认页" left-text="返回" left-arrow />
  <!-- 主体内容 -->
  <div class="container">
    <!-- 1. 地址区域 -->
    ......

    <!-- 2. 地址弹出层 -->
    ......

    <!-- 3. 商品列表  -->
    <div class="product-list">
      <!-- 标题区域 -->
      <van-cell-group>
+        <van-cell :title="cartItemCount" />
       </van-cell-group>
       <!-- 内容区域 -->
       <van-cell-group>
         <!-- 单个商品 -->
+        <van-cell class="product" v-for="item in cartInfo" :key="item.id">
+          <img :src="item.productInfo.image" alt="" />
           <div class="info">
+            <p class="title" v-text="item.productInfo.store_name" />
             <p class="price">
+              {{ item.truePrice }}
            </p>
         </div>
          <span class="count">X{{ item.cart_num }}</span>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
  <!-- 提交订单区域 -->
  <van-submit-bar
  +  :price="totalPrice"
    label="订单总计："
    button-text="立即付款"
    @submit="onSubmit"
  />
</template>

<script setup>

......

import {
  getAddressList,
+ confirmOrder
  } from '@/api/order'
// ---------1. 地址区域-----------

......



// -----------2. 初始化订单数据-------------
// 2.1 存储数据
const orderConfirmData = ref({})
// 2.3 计算属性处理数据
const cartInfo = computed(() => orderConfirmData.value?.cartInfo)
const cartItemCount = computed(() => `共${cartInfo.value?.length || 0}件`)
const totalPrice = computed(() => (orderConfirmData.value?.priceGroup?.totalPrice || 0) * 100)
// 2.2 接收组件传参（在前面引入过）

const initOrderInfo = async () => {
  const { data } = await confirmOrder({
    cartId,
    new: 0
  })
  console.log(data)

  if (data.status !== 200) return
  orderConfirmData.value = data.data
}
initOrderInfo()
</script>

......
```

## 12. 结算处理
### 1. 布局处理

使用了[ActionSheet 动作面板](https://vant-contrib.gitee.io/vant/#/zh-CN/action-sheet#zhan-shi-qu-xiao-an-niu)、[复选框](https://vant-contrib.gitee.io/vant/#/zh-CN/checkbox#da-pei-dan-yuan-ge-zu-jian-shi-yong)

```vue
<!--
 * @author: chendaokuan
 * @since: 2022-05-28
 * Path: src\views\OrderConfirm\index.vue
-->
<template>
  <!-- 导航 -->
  <van-nav-bar
    title="订单确认页"
    left-text="返回"
    left-arrow
  />
  <!-- 主体内容 -->
  <div class="container">
    <!-- 1. 地址区域 -->
    ......
    <!-- 2. 地址弹出层 -->
    ......

    <!-- 3. 商品列表  -->
    ......

    </div>
  <!-- 提交订单区域 -->
  <van-submit-bar
    :price="totalPrice"
    label="订单总结："
    button-text="立即付款"
    @submit="showPayPanel = true"
  />
  <!-- 弹出付款区域 -->
  <van-action-sheet
    v-model:show="showPayPanel"
    title="请选择支付方式"
    cancel-text="取消"
    close-on-click-action
  >
    <!-- 付款列表区域 -->
    <template #default>
      <van-radio-group v-model="paymentMethod">
        <van-cell-group>
          <!-- 余额支付 -->
          <van-cell
            clickable
            title="微信支付"
            label="微信快捷支付"
            @click="paymentMethod = 'wechat'"
            size="large"
            center
          >
            <template #icon>
              <van-icon
                name="http://www.lgstatic.com/lg-app-fed/pay/images/wechat_b787e2f4.png"
                size="30"
                :style="{ marginRight: '12px' }"
              />
            </template>
            <template #right-icon>
              <van-radio
                name="wechat"
                checked-color="#ee0a24"
              />
            </template>
          </van-cell>
          <!-- 支付宝 -->
          <van-cell
            clickable
            title="支付宝"
            label="支付宝快捷支付"
            @click="paymentMethod = 'alipay'"
            size="large"
            center
          >
            <template #icon>
              <van-icon
                name="http://www.lgstatic.com/lg-app-fed/pay/images/ali_ed78fdae.png"
                size="30"
                :style="{ marginRight: '12px' }"
              />
            </template>
            <template #right-icon>
              <van-radio
                name="alipay"
                checked-color="#ee0a24"
              />
            </template>
          </van-cell>
          <!-- 余额支付 -->
          <van-cell
            clickable
            title="余额支付"
            :label="`可用余额为：${ yue }元`"
            @click="paymentMethod = 'yue'"
            size="large"
            center
          >
            <template #icon>
              <van-icon
                name="gold-coin"
                color="#FF9900"
                size="30"
                :style="{ marginRight: '12px' }"
              />
            </template>
            <template #right-icon>
              <van-radio
                name="yue"
                checked-color="#ee0a24"
              />
            </template>
          </van-cell>
          <van-cell>
            <van-button
              round
              type="danger"
              block
              @click="handlePay"
            >
              去支付
            </van-button>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </template>
  </van-action-sheet>
</template>

<script setup>

......

// ---------1. 地址区域-----------
......

// -----------2. 初始化订单数据-------------
......
// -----------3. 订单确认区域-------------
const showPayPanel = ref(false)
const paymentMethod = ref('yue')
const yue = computed(() => orderConfirmData.value?.userInfo.now_more || 0)
</script>

......

```

### 2. 支付请求

```vue
<script setup>

......

// ---------1. 地址区域-----------
......

// -----------2. 初始化订单数据-------------
......
// -----------3. 订单确认区域-------------
const showPayPanel = ref(false)
const paymentMethod = ref('yue')
const yue = computed(() => orderConfirmData.value?.userInfo.now_more || 0)

+ const handlePay = async () => {
+   const { data } = await createOrder(orderConfirmData.value.orderKey, {
+     addressId: currentAddress.value.id,
+     payType: paymentMethod.value
+   })
+   if (data.status !== 200) return
+   // 提示并跳转
+   Toast.success('支付成功，自动跳转登录页...')
+   router.push({
+     name: 'order'
+   })
+ }
</script>
```
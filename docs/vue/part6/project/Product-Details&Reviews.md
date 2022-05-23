# 商品详情与评论

## 1. 商品详情页数据

<img src="/images/vue/104.gif" style="width: 100%; display:inline-block; margin: 0 ;">

### 设置路由跳转

```vue
<!--
 * ProductList.vue
-->
<template>
  <!-- 不需要居中显示，关闭即可，同时关闭边框显示 -->
  <van-grid
   ......
  >
    <van-grid-item
      ......
      :to="{
        name:'product',
        params:{
          productId:item.id
        }
      }"
    >
</template>
```

```js
// src\router\index.js

// 路由规则配置
......
  {
    path: '/product/:productId',
    name: 'product',
    component: () => import('@/views/Product/index.vue'),
    props: true
  },
......
```

### 接收动态路由参数&请求处理

1. index.vue 接收动态路由参数

```
src
├─ views
   ├─ Product
   │  └─ index.vue (修改)

```

```vue
<!--
src\views\Product\index.vue
-->
<template>
  <div class="index">
    页面
  </div>
</template>

<script setup>
const { productId } = defineProps({
  productId: {
    type: String,
    required: true,
  },
})
console.log(productId)
</script>
```

2. 请求处理

```
src
├─ api
   ├─ index.js
   └─ product.js   (修改)
```

```js
......
// 获取某个指定商品详情
// export const getProductsDetails = params => request({
export const getProductsDetails = productId => request({
  method: 'Get',
  // url: `/product/detail/${params.productId}`
  url: `/product/detail/${productId}`
})
```

```vue
<!--
src\views\Product\index.vue
-->
<script setup>
import { ref } from 'vue'
// ----------请求商品数据------------
import { getProductsDetails } from '@/api/product'
// 接收商品ID
const { productId } = defineProps({
  productId: {
    type: String,
    required: true,
  },
})

// 存储商品详情的所有数据
const productDetails = ref({})

const initProductsDetails = async () => {
  const { data } = await getProductsDetails(productId)
  if (data.status !== 200) {
    return
  }
  productDetails.value = data.data
}

initProductsDetails()
</script>
```

3. 如果人为填写不存在的商品 ID，需要直接跳回首页

```vue
<!--
src\views\Product\index.vue
-->

<script setup>
// 引入router
import { useRouter } from 'vue-router'

......
// ----------请求商品数据------------
import { getProductsDetails } from '@/api/product'
const router = useRouter()
......
// 存储商品详情的所有数据
const productDetails = ref({})

const initProductsDetails = async () => {
  const { data } = await getProductsDetails(productId)
  if (data.status !== 200) {
    // 找不到对应商品，直接跳回首页
    // console.log(data.status) // 400
    return router.push({
      name: 'home'
    })
  }
  productDetails.value = data.data
}

initProductsDetails()
</script>
```

## 2. 顶部导航

<img src="/images/vue/470.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 导航栏的组成

- 导航栏是由`导航栏`和`标签栏`组合

- 导航栏 官方示例

```vue
<van-nav-bar
  title="标题"
  left-text="返回"
  right-text="按钮"
  left-arrow
  @click-left="onClickLeft"
  @click-right="onClickRight"
/>
```

API:
| 参数 | 说明 | 类型 | 默认值 |
| ---- | ------------------------------------------------------ | ------ | ------ |
| fixed | 是否固定在顶部 | boolean | false |

- 标签页 官方示例

```vue
<van-tabs v-model:active="active">
  <van-tab title="标签 1">内容 1</van-tab>
  <van-tab title="标签 2">内容 2</van-tab>
  <van-tab title="标签 3">内容 3</van-tab>
  <van-tab title="标签 4">内容 4</van-tab>
</van-tabs>
```

API:
| 参数 | 说明 | 类型 | 默认值 |
| ---- | ------------------------------------------------------ | ------ | ------ |
| v-model:active | 绑定当前选中标签的标识符 | number \| string | 0
| color | 标签主题色 | string | 0
| sticky | 是否使用粘性布局 | boolean | false
| scrollspy | 是否开启滚动导航 | boolean | false

### 样式权重

此时为避免 position: relative 影响 fixed 的生效，需要提高权重

<img src="/images/vue/469.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```vue
<!--
 index.vue
-->

<style lang="scss" scoped>
// 为了避免问题，添加fixed 样式权重
.van-nav-bar {
  position: fixed !important;
}
</style>
```

#### 组合使用

```vue
<!--
 index.vue
-->
<template>
  <van-nav-bar left-arrow fixed />
  <van-tabs scrollspy color="#FBC546">
    <van-tab title="商品">
      内容 1
    </van-tab>
    <van-tab title="评价">
      内容 2
    </van-tab>
    <van-tab title="推荐">
      内容 3
    </van-tab>
    <van-tab title="详情">
      内容 4
    </van-tab>
  </van-tabs>
</template>
<style lang="scss" scoped>
......

// 顶部tabs 的标题部分
:deep(.van-tabs__wrap) {
  width: 80%;
  position: fixed;
  top: 0;
  z-index: 999;
  left: 50%;
  transform: translateX(-50%);
}

// 顶部tabs的主体底部内容容器
:deep(.van-tabs__content) {
  padding-top: 46px;
}
</style>
```

## 轮播图

<img src="/images/vue/105.gif" style="width: 50%; display:inline-block; margin: 0 ;">

1. 官方实例

```vue
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

2. 布局处理与数据处理

```vue
<!--
2. src\views\Product\index.vue

-->
<template>
  <van-nav-bar left-arrow fixed />
  <van-tabs scrollspy color="#FBC546">
    <van-tab title="商品">
      <van-swipe :autoplay="3000" width="375" height="375">
        <van-swipe-item v-for="(item, index) in sliderImage" :key="index">
          <img :src="item" alt="" />
        </van-swipe-item>
      </van-swipe>
    </van-tab>
    <van-tab title="评价">
      内容 2
    </van-tab>
    <van-tab title="推荐">
      内容 3
    </van-tab>
    <van-tab title="详情">
      内容 4
    </van-tab>
  </van-tabs>
</template>

<script setup>
......
import { computed } from '@vue/reactivity'
......

// ----------商品数据处理------------
// 1. 商品详细信息
const storeInfo = computed(() => productDetails.value.storeInfo)
// 1.1 轮播图数据
const sliderImage = computed(() => storeInfo.value?.slider_image)
console.log(sliderImage)
</script>

<style lang="scss" scoped>
......

// 轮播图
.van-swipe-item img {
  width: 375px;
}
</style>
```

## 3. 商品头部区域

<img src="/images/vue/471.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

### 1. Cell 单元格 官方示例

```vue
<van-cell value="内容" is-link>
  <!-- 使用 title 插槽来自定义标题 -->
  <template #title>
    <span class="custom-title">单元格</span>
    <van-tag type="danger">标签</van-tag>
  </template>
</van-cell>
```

### 2. 布局处理

#### 技巧 1：字体多行换行，多余省略号隐藏

```vue
<!--
src\views\Product\index.vue
-->
<template>
  <van-nav-bar left-arrow fixed />
  <van-tabs scrollspy color="#FBC546">
    <van-tab title="商品">
      <!-- ...... -->

      <!-- 2. 商品头部 -->
      <van-cell class="productHeader" :border="false">
        <template #title>
          <div class="price">
            <!-- 商品价格 -->
            <span>$3699.01</span>
            <!-- 分享按钮 -->
            <van-icon name="share-o" size="20" class="share" />
          </div>
          <!-- 商品标题 -->
          <div class="title">
            HUAWEI P50 8GB+256GB（曜金黑）HUAWEI P50 8GB+256GB（曜金黑）HUAWEI
            P50 8GB+256GB（曜金黑）
          </div>
        </template>
        <!-- 其他信息 -->
        <template #label>
          <span>原价：%3899.00</span>
          <span>库存：311台</span>
          <span>销量：222</span>
        </template>
      </van-cell>
    </van-tab>
    <van-tab title="评价">
      内容 2
    </van-tab>
    <van-tab title="推荐">
      内容 3
    </van-tab>
    <van-tab title="详情">
      内容 4
    </van-tab>
  </van-tabs>
</template>

<style lang="scss" scoped>
// ......

.van-tabs {
  background-color: #f2f2f2;

  // 顶部tabs 的标题部分
  :deep(.van-tabs__wrap) {
    width: 80%;
    position: fixed;
    top: 0;
    z-index: 999;
    left: 50%;
    transform: translateX(-50%);
  }

  // 顶部tabs的主体底部内容容器
  :deep(.van-tabs__content) {
    padding-top: 46px;
  }

  // 轮播图
  .van-swipe-item img {
    width: 375px;
  }

  // 商品信息区域
  :deep(.productHeader) {
    margin-bottom: 10px;

    .van-cell__title {
      .price {
        span {
          font-size: 24px;
          font-weight: 700;
        }

        .share {
          float: right;
        }
      }

      .title {
        font-size: 16px;
        font-weight: 700;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        overflow: hidden;
        -webkit-box-orient: vertical;
        margin: 5px 0 10px;
      }
    }

    // label 插槽
    .van-cell__label {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
```

### 3. 数据处理

```vue
<!--
src\views\Product\index.vue
-->
<van-tab title="商品">
      <!-- 1. 轮播图 -->
      <van-swipe
        :autoplay="3000"
        width="375"
        height="375"
      >
        <van-swipe-item
          v-for="(item, index) in sliderImage"
          :key="index"
        >
          <img
            :src="item"
            alt=""
          >
        </van-swipe-item>
      </van-swipe>
      <!-- 2. 商品头部 -->
      <van-cell
        class="productHeader"
        :border="false"
      >
        <template #title>
          <div class="price">
            <!-- 商品价格 -->
            <span>￥{{ storeInfo?.price }}</span>
            <!-- 分享按钮 -->
            <van-icon
              name="share-o"
              size="20"
              class="share"
            />
          </div>
          <!-- 商品标题 -->
          <div
            class="title"
            v-text="storeInfo?.store_name"
          />
        </template>
        <!-- 其他信息 -->
        <template #label>
          <span>原价：￥{{ storeInfo?.ot_price }}</span>
          <span>库存：{{ storeInfo?.stock+storeInfo?.unit_name }}</span>
          <span>销量：{{ storeInfo?.fsales }}</span>
        </template>
      </van-cell>
    </van-tab>
```

## 商品规则(SKU)基础结构（布局）

<img src="/images/vue/472.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

```vue
<!--
src\views\Product\index.vue
-->
<van-tab title="商品">
......
      <!-- 3. 商品规格选择区域 -->
      <van-cell
        class="sku_window"
        is-link
      >
        <template #title>
          <span>已选择：</span>
        </template>
      </van-cell>
    </van-tab>

<style lang="scss" scoped>
// 为了避免问题，添加fixed 样式权重
...... .van-tabs {
  ......
  // 商品规格区域
  .sku_window {
    margin-bottom: 10px;
  }
}
</style>
```

## 4. 商品评价区域

<img src="/images/vue/473.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

### 使用到的官方组件

1. Rate 评分 官方组件

```vue
<van-rate v-model="value" readonly />
```

### 基本样式布局与数据获取

```vue
<!--
src\views\Product\index.vue
-->
<template>
  <van-nav-bar left-arrow fixed />
  <van-tabs scrollspy color="#FBC546">
    <van-tab title="商品">
      ......
      <!-- 3. 商品规格选择区域 -->
      <van-cell class="sku_window" is-link>
        <template #title>
          <span>已选择：</span>
        </template>
      </van-cell>
    </van-tab>
    <van-tab title="评价" class="comment">
      <van-cell-group>
        <!-- 总体评价情况 -->
        <van-cell is-link :title="replyInfo" :value="replayRate" to="/">
        </van-cell>
        <!-- 评价列表  -->
        <van-cell class="comment-item">
          <!-- 用户信息 -->
          <div class="user-info">
            <img
              src="https://pic2.zhimg.com/80/v2-c14e5277dec318d97fb0cfcebb799d91_1440w.jpg?source=1940ef5c"
              alt=""
            />
          </div>
          <span class="nickname">小吴</span>
          <van-rate v-model="value" readonly size="12" />

          <!-- 商品信息与时间 -->
          <p class="time">
            1小时前 6G，128G
          </p>
          <!-- 评价内容 -->
          <p class="comment-content"></p>
          可以的，使用起来非常流畅
          <!-- 图片列表 -->
          <ul class="picture">
            <li>
              <img
                src="https://res8.vmallres.com/shopdc//pic/2021126/f478c910-0ded-47ab-aeba-554569a876e5.png"
                alt=""
              />
            </li>
            <li>
              <img
                src="https://res8.vmallres.com/shopdc//pic/2021126/f478c910-0ded-47ab-aeba-554569a876e5.png"
                alt=""
              />
            </li>
            <li>
              <img
                src="https://res8.vmallres.com/shopdc//pic/2021126/f478c910-0ded-47ab-aeba-554569a876e5.png"
                alt=""
              />
            </li>
            <li>
              <img
                src="https://res8.vmallres.com/shopdc//pic/2021126/f478c910-0ded-47ab-aeba-554569a876e5.png"
                alt=""
              />
            </li>
            <li>
              <img
                src="https://res8.vmallres.com/shopdc//pic/2021126/f478c910-0ded-47ab-aeba-554569a876e5.png"
                alt=""
              />
            </li>
          </ul>
        </van-cell>
      </van-cell-group>
    </van-tab>
    <van-tab title="推荐">
      内容 3
    </van-tab>
    <van-tab title="详情">
      内容 4
    </van-tab>
  </van-tabs>
</template>

<script setup>
......
// ----------商品数据处理------------
......
// 2. 评价信息
// 2.1 好评数
const replyCount = computed(() => productDetails.value.replyCount || 0)
const replyInfo = computed(() => `用户评价${replyCount.value}`)
// 2.1 好评率
const replayChance = computed(() => productDetails.value.replayChance || 0)
const replayRate = computed(() => replayChance.value + '%好评率')
// 2.3 好评信息
const reply = computed(() => productDetails.value.reply)
</script>

<style lang="scss" scoped>
..... .van-tabs {
  .....

  // 商品评价区域
  .comment {
    margin-bottom: 10px;

    .comment-item {
      padding: 10px 15px 20px;

      .user-info {
        font-size: 13px;
        display: flex;
        align-items: center;
        padding: 7px 0;

        img {
          width: 28px;
          height: 28px;
        }

        .nickname {
          padding: 0 10px 0 6px;
        }
      }

      .time {
        font-size: 12px;
        color: #82848f;
        padding: 5px 0;
      }

      .comment-content {
        font-size: 13px;
        margin-bottom: 10px;
      }

      .picture {
        li {
          float: left;
          padding-right: 7px;
          img {
            width: 78px;
            height: 78px;
          }
        }
      }
    }
  }
}
</style>
```

## 5. 评价组件

<img src="/images/vue/474.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

- 把 index.vue 的评价组件封装到公共组件目录，新建 Commentitem.vue

```
src
├─ components
   ├─ Commentitem.vue  (新建)
```

```vue
<!--
 Commentitem.vue
-->
<template>
  <van-cell class="comment-item">
    <!-- 用户信息 -->
    <div class="user-info">
      <img :src="reply?.avatar" alt="" />
    </div>
    <span class="nickname" v-text="reply?.nickname" />
    <van-rate v-model="star" readonly size="12" />

    <!-- 商品信息与时间 -->
    <p class="time">{{ reply?.add_time }} {{ reply?.sku }}</p>
    <!-- 评价内容 -->
    <p class="comment-content" v-text="reply?.comment" />
    <!-- 图片列表 -->

    <ul class="picture">
      <li v-for="(item, index) in pics" :key="index">
        <img :src="item" alt="" />
      </li>
    </ul>
  </van-cell>
</template>

<script setup>
import { computed } from '@vue/reactivity'

const { reply } = defineProps({
  reply: {
    type: Object,
    required: true,
  },
})
const star = computed(() => Number(reply?.star))
const pics = computed(() => reply?.pics)
</script>

<style lang="scss" scoped>
// 商品评价区域
.comment {
  margin-bottom: 10px;

  .comment-item {
    padding: 10px 15px 20px;

    .user-info {
      font-size: 13px;
      display: flex;
      align-items: center;
      padding: 7px 0;

      img {
        width: 28px;
        height: 28px;
      }

      .nickname {
        padding: 0 10px 0 6px;
      }
    }

    .time {
      font-size: 12px;
      color: #82848f;
      padding: 5px 0;
    }

    .comment-content {
      font-size: 13px;
      margin-bottom: 10px;
    }

    .picture {
      li {
        float: left;
        padding-right: 7px;

        img {
          width: 78px;
          height: 78px;
        }
      }
    }
  }
}
</style>
```

## 6. 推荐商品区域

### 需要使用的官方组件

- cell 组件
- Grid 组件

### 基础布局与样式处理

#### 技巧 1：字体多行换行，多余省略号隐藏

#### 技巧 2：gird-item-content 内容元素单独靠左

```vue
<template>
  <van-tab title="推荐">
    <van-cell class="recommend">
      <p class="titile">
        推荐商品
      </p>
      <van-grid :border="false" :column-num="3">
        <van-grid-item>
          <van-image
            src="https://res8.vmallres.com/shopdc//pic/2021126/f478c910-0ded-47ab-aeba-554569a876e5.png"
          />
          <p>
            HUAWEI P50 8GB+256GB（曜金黑）HUAWEI P50 8GB+256GB（曜金黑）HUAWEI
          </p>
          <span>￥159.00</span>
        </van-grid-item>
        <van-grid-item>
          <van-image
            src="https://res8.vmallres.com/shopdc//pic/2021126/f478c910-0ded-47ab-aeba-554569a876e5.png"
          />
          <p>
            HUAWEI P50 8GB+256GB（曜金黑）HUAWEI P50 8GB+256GB（曜金黑）HUAWEI
          </p>
          <span>￥159.00</span>
        </van-grid-item>
        <van-grid-item>
          <van-image
            src="https://res8.vmallres.com/shopdc//pic/2021126/f478c910-0ded-47ab-aeba-554569a876e5.png"
          />
          <p>
            HUAWEI P50 8GB+256GB（曜金黑）HUAWEI P50 8GB+256GB（曜金黑）HUAWEI
          </p>
          <span>￥159.00</span>
        </van-grid-item>
        <van-grid-item>
          <van-image
            src="https://res8.vmallres.com/shopdc//pic/2021126/f478c910-0ded-47ab-aeba-554569a876e5.png"
          />
          <p>
            HUAWEI P50 8GB+256GB（曜金黑）HUAWEI P50 8GB+256GB（曜金黑）HUAWEI
          </p>
          <span>￥159.00</span>
        </van-grid-item>
        <van-grid-item>
          <van-image
            src="https://res8.vmallres.com/shopdc//pic/2021126/f478c910-0ded-47ab-aeba-554569a876e5.png"
          />
          <p>
            HUAWEI P50 8GB+256GB（曜金黑）HUAWEI P50 8GB+256GB（曜金黑）HUAWEI
          </p>
          <span>￥159.00</span>
        </van-grid-item>
      </van-grid>
    </van-cell>
  </van-tab>
</template>
<style>
  // 商品推荐区域
  :deep(.recommend) {
    margin-bottom: 10px;

    .title {
      font-size: 16px;
      font-weight: 700;
      padding: 5px 0;
    }

    // 清除Gird组件的内容区域默认边距
    .van-grid-item__content {
      padding: 0;
    }

    .van-grid-item {
      img {
        width: 107px;
        height: 107px;
      }
    }
    p{
      padding: 0 3px;
      font-size: 14px;
      font-weight: 700;
      // 字体多行换行，多余省略号隐藏
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      -webkit-line-clamp:2 ;
    }
    span{
      color: #f3370c;
      font-size: 12px;
      font-weight: 700;
      // 让元素单独靠左，可以设置grid的center,或单独使用flex属性
      // .van-grid-item__content 官方默认是flex布局
      align-self: flex-start;
    }
  }
}
</style>
```

### 数据与跳转处理

```vue
<template>
  ......

  <van-tab title="推荐">
    <van-cell class="recommend">
      <p class="titile">
        推荐商品
      </p>
      <van-grid :border="false" :column-num="3">
        <van-grid-item
          v-for="item in goodsList"
          :key="item.id"
          :to="{
            name: 'product',
            params: {
              // 此时商品信息没有重置，因为当前展示的页面是produce，点击推荐商品跳转的还是product页面。
              // vue就会认为相同的路由、相同的组件，Vue就会帮我进行组件的复用而不会重新生成创建
              // 详见官方文档对此问题的说明：https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E5%93%8D%E5%BA%94%E8%B7%AF%E7%94%B1%E5%8F%82%E6%95%B0%E7%9A%84%E5%8F%98%E5%8C%96
              productId: item.id,
            },
          }"
        >
          <van-image :src="item.image" />
          <p v-text="item.store_name" />
          <span>￥{{ item.price }}</span>
        </van-grid-item>
      </van-grid>
    </van-cell>
  </van-tab>
</template>
<script>
......
// 3 推荐商品
const goodsList = computed(() => productDetails.value.good_list)
</script>
```

<img src="/images/vue/106.gif" style="width: 100%; display:inline-block; margin: 0 ;">

::: warning 问题修复

1. 此时商品信息没有重置，因为当前展示的页面是 produce，点击推荐商品跳转的还是 product 页面。
2. vue 就会认为相同的路由、相同的组件，Vue 就会帮我进行组件的复用而不会重新生成创建
3. [详见官方文档对此问题的说明](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E5%93%8D%E5%BA%94%E8%B7%AF%E7%94%B1%E5%8F%82%E6%95%B0%E7%9A%84%E5%8F%98%E5%8C%96)
   :::

```vue
<script setup>
......
// 引入导航守卫
import { onBeforeRouteUpdate, useRouter } from 'vue-router'

......

const initProductsDetails = async (productId) => {
  const { data } = await getProductsDetails(productId)
  console.log(data)
  if (data.status !== 200) {
    // 找不到对应商品，直接跳回首页
    console.log(data.status) // 400
    return router.push({
      name: 'home'
    })
  }
  productDetails.value = data.data
}

initProductsDetails(productId)

......

// ----------3.1 通过导航守卫监听路由变化，并请求对应的新商品数据-----------
onBeforeRouteUpdate((to) => {
  // 清除旧的数据
  productDetails.value = {}
  // console.log(productDetails.value)

  // 回到顶部
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
  // 重新根据最新 ID 请求商品数据
  initProductsDetails(to.params.productId)
})
</script>
```

<img src="/images/vue/107.gif" style="width: 100%; display:inline-block; margin: 0 ;">

## 7. 商品描述区域

<img src="/images/vue/108.gif" style="width: 50%; display:inline-block; margin: 0 ;">

商品描述区域的数据是后台用富文本编辑器生成的，此处应该使用`V-html` 属性

```vue
<template>
......
    <!-- 商品详情区域 -->
    <van-tab title="详情">
      <div
        class="description"
        v-html="storeInfo?.description"
      />
    </van-tab>
  </van-tabs>
</template>
<style>
  // 商品描述区域
  .description {
    width: 100%;

    :deep(img) {
      width: 100%;
    }
  }
</style>
```

## 8. 规格弹出层

### 初步布局

<img src="/images/vue/109.gif" style="width: 50%; display:inline-block; margin: 0 ;">

```vue
<template>
  <!-- 商品区域 -->
  <van-tab title="商品">
    ......
    <!-- 3. 商品规格选择区域 -->
    <van-cell class="sku_window" is-link @click="handlePopup">
      <template #title>
        <span>已选择：</span>
        <van-popup v-model:show="specState.show" position="bottom">
          内容
        </van-popup>
      </template>
    </van-cell>
  </van-tab>
</template>
<script>
......
// -----规格弹出层处理------
const specState = reactive({
  show: false, // 弹出层的显示数据
  spec: [], // 选中的规格数据
})
const handlePopup = () => {
  specState.show = !specState.show
}
</script>
<style>
......
  // 弹出层
  :deep(.van-popup) {
  border-radius: 10px 10px 0 0;
}
</style>
```

### 布局详细处理

<img src="/images/vue/110.gif" style="width: 50%; display:inline-block; margin: 0 ;">

1. 使用到[stepper 步进器](https://youzan.github.io/vant/#/zh-CN/stepper)

```vue
<template>
  .....

  <!-- 3. 商品规格选择区域 -->
  <van-cell class="sku_window" is-link @click="handlePopup">
    <template #title>
      <span>已选择：</span>
      <van-popup v-model:show="specState.show" position="bottom" class="popup">
        <van-cell-group>
          <!-- 1. 头部商品信息 -->
          <van-cell class="popup-header">
            <img
              src="https://res8.vmallres.com/shopdc//pic/2021126/f478c910-0ded-47ab-aeba-554569a876e5.png"
              alt=""
            />
            <div class="info">
              <p class="title">
                HUAWEI P50 8GB+256GB（曜金黑）
              </p>
              <p class="price">
                ￥3899.00
              </p>
              <p class="stock">
                库存：97
              </p>
            </div>
          </van-cell>
          <!-- 2. 规格区域 -->
          <van-cell class="spec">
            <p>内存</p>
            <span class="tag active" active>6G</span>
            <span class="tag">8G</span>
          </van-cell>
          <van-cell class="spec">
            <p>内存</p>
            <span class="tag active" active>6G</span>
            <span class="tag">8G</span>
          </van-cell>
          <!-- 3. 数量 -->
          <van-cell title="数量">
            <van-stepper v-model="value" max="8" />
          </van-cell>
        </van-cell-group>
      </van-popup>
    </template>
  </van-cell>
</template>
<style>
  // 弹出层
  :deep(.van-popup) {
    border-radius: 10px 10px 0 0;
    max-height: 70%;
    margin-bottom: 50px;

    // 弹框头部
    .popup-header {
      .van-cell__value {
        display: flex;

        img {
          width: 75px;
          height: 75px;
          align-self: center;
        }

        .info {
          padding: 10px;

          .title {
            font-size: 16px;
            font-weight: 700;
            // 字体省略号
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            -webkit-line-clamp: 1;
            margin-bottom: 10px;
          }

          .price {
            font-size: 15;
            color: #F2270C;
          }

          .stock {
            font-size: 12px;
            color: #999;
          }
        }
      }
    }

    // 弹框头部
    .spec {
      p {
        margin-bottom: 5px;
      }

      .tag {
        display: inline-block;
        min-width: 25px;
        padding: 0 12px ;
        border-radius: 20px;
        text-align: center;
        background: #F2F2F2;
        margin-right: 7px;
      }
      .tag.active{
        border-color: #F2270C;
        color: #F2270C;
        background-color: #fcedeb;
      }
    }
  }
}
</style>
```

### 数据处理与规格操作

<img src="/images/vue/475.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/111.gif" style="width: 100%; display:inline-block; margin: 0 ;">

```vue
<!--
 index.vue
-->
<template>
  <!-- 商品区域 -->
  <van-tab title="商品">
    ......

    <!-- 3. 商品规格选择区域 -->
    <van-cell class="sku_window" is-link @click="handlePopup">
      <template #title>
        <span>已选择：</span>
        <van-popup
          v-model:show="specState.show"
          position="bottom"
          class="popup"
        >
          <van-cell-group>
            <!-- 1. 头部商品信息 -->
            <van-cell class="popup-header">
              <img
                src="https://res8.vmallres.com/shopdc//pic/2021126/f478c910-0ded-47ab-aeba-554569a876e5.png"
                alt=""
              />
              <div class="info">
                <p class="title">
                  HUAWEI P50 8GB+256GB（曜金黑）
                </p>
                <p class="price">
                  ￥3899.00
                </p>
                <p class="stock">
                  库存：97
                </p>
              </div>
            </van-cell>
            <!-- 2. 规格区域 -->
            <van-cell
              class="spec"
              v-for="(attr, specIndex) in productAttr"
              :key="attr.id"
            >
              <p v-text="attr.attr_name" />
              <!-- 规则选择标签 -->
              <span
                class="tag"
                v-for="tag in attr.attr_values"
                :class="{ active: specState.spec[specIndex] === tag }"
                :key="tag"
                v-text="tag"
                @click="handleTagChange(tag, specIndex)"
              />
            </van-cell>
            <!-- 3. 数量 -->
            <van-cell title="数量">
              <van-stepper v-model="value" max="8" />
            </van-cell>
          </van-cell-group>
        </van-popup>
      </template>
    </van-cell>
  </van-tab>
</template>
<script>
// -----规格弹出层处理------
// 1. 规格数据处理
const productAttr = computed(() => productDetails.value.productAttr)
const productValue = computed(() => productDetails.value.productValue)

const specState = reactive({
  show: false, // 弹出层的显示数据
  spec: [], // 选中的规格数据
})

// 显示隐藏弹出层
const value = ref(3)
const handlePopup = () => {
  specState.show = !specState.show
}

// 初始化规格的默认选中数据
const initSpec = (spec) => {
  specState.spec = spec.map((item) => item.attr_values[0])
}

// 规格切换处理
const handleTagChange = (tag, specIndex) => {
  specState.spec[specIndex] = tag
}
</script>
```

### 根据 sku 设置数据

<img src="/images/vue/112.gif" style="width: 50%; display:inline-block; margin: 0 ;">

- 根据`specState`去`productValue`里寻找对应的价格数据，并渲染在头部

```vue
<template>
  <!-- 3. 商品规格选择区域 -->
  <van-cell class="sku_window" is-link @click="handlePopup">
    <template #title>
      + <span>已选择：{{ sku }}</span>
      <van-popup v-model:show="specState.show" position="bottom" class="popup">
        <van-cell-group>
          <!-- 1. 头部商品信息 -->
          <van-cell class="popup-header">
            + <img :src="specDetail?.image" alt="" />
            <div class="info">
              +
              <p class="title" v-text="storeInfo?.store_name" />

              +
              <p class="price">￥{{ specDetail?.price }}</p>

              +
              <p class="stock">￥{{ specDetail?.stock }}</p>
            </div>
          </van-cell>
          .....
        </van-cell-group>
      </van-popup>
    </template>
  </van-cell>
  <template>
    <script>
       // -----规格弹出层处理------

       const specState = reactive({
         show: false, // 弹出层的显示数据
         spec: [], // 选中的规格数据
      +  buyCount: 0 // 购买个数
       })

       // 1. 规格数据处理
       const productAttr = computed(() => productDetails.value.productAttr)
       const productValue = computed(() => productDetails.value.productValue)
       +// Sku数据处理
      + const sku = computed(() => specState.spec.toString())
      + // 根据sku获取对应商品信息
      + const specDetail = computed(() => productValue.value?.[sku.value])

       // 显示隐藏弹出层
      - // const value = ref(3)
       const handlePopup = () => {
      +   // specState.show = true
      +   specState.show = !specState.show
       }
      ......
    </script></template
  ></template
>
```

## 9.评论页面

### 路由处理与新建评论页

1. 新建评论页

```
src
├─ router
│  └─ index.js （修改，新增路由）
├─ views
   ├─ Comment  （新增）
      └─ index.vue （新增）
```

2. index.js （路由新增）

```js
  {
    path: '/comment/:productId',
    name: 'comment',
    component: () => import('@/views/Comment/index.vue'),
    props: true
  },
```

### 评论跳转处理

3. 修改 src\views\Product\index.vue

```vue
<!-- src\views\Product\index.vue -->
<van-cell-group>
        <!-- 总体评价情况 -->
        <van-cell
          is-link
          :title="replyInfo"
          :value="replayRate"
       +   :to="{
       +    name: 'comment',
       +    params: {
       +     productId: storeInfo?.id
       +    }
       + }"
        />
        <!-- 评价列表  封装到公共组件-->
        <comment-item
          v-if="replyCount !== 0"
          :reply="reply"
        />
      </van-cell-group>
```

### 评论请求处理

1. 接收路由 Id

```vue
<!--
src\views\Comment\index.vue
-->
<template>
  <div class="index">
    页面
  </div>
</template>

<script setup>
// import { } from 'vue'
const { productId } = defineProps({
  productId: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss" scoped></style>
```

2. 增加 API 请求

```js
<!-- src\api\product.js -->
// 商品评价数量接口

export const getCommentCount = productId => request({
  method: 'GET',
  url: `/reply/config/${productId}`
})

// 请求不同类型的评论数据
export const getCommentBytag = (productId, params) => request({
  method: 'GET',
  url: `/reply/list/${productId}`,
  params
})
```

3. 请求数据

<img src="/images/vue/476.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```js
<!--
src\views\Comment\index.vue
-->
<template>
  <div class="index">
    页面
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import {
  getCommentCount,
  getCommentBytag
} from '@/api/product'

// 接收商品 ID
const { productId } = defineProps({
  productId: {
    type: String,
    required: true
  }
})

// 存储评论的相关数据
const state = reactive({
  // 存储所有个数信息
  commentCounts: {},
  goodCount: computed(() => state.commentCounts?.good_count || 0), // 好评
  poorCount: computed(() => state.commentCounts?.poor_count || 0), // 差评
  inCount: computed(() => state.commentCounts?.in_count || 0), // 中评
  sumCount: computed(() => state.commentCounts?.sum_count || 0), // 总评数
  replayChance: computed(() => state.commentCounts?.reply_chance || 0), // 总评数
  // 存储评价信息
  commentList: []
})
// 1. 请求商品信息
async function initReplyData (params) {
  const { data } = await getCommentCount(productId)
  console.log(data)
  if (data.status !== 200) return
  state.commentCounts = data.data
}
initReplyData()

// 2.指定类型的评价
async function initCommentByTag (type) {
  const { data } = await getCommentBytag(productId, { type })
  console.log(data)
  if (data.status !== 200) return
  state.commentList = data.data
}
// 默认是0，全部数据；1-好评；2-中评；3-差评
initCommentByTag('0')
</script>

<style lang="scss" scoped>
</style>

```

### 评论布局与数据处理

### 顶部

```vue
<!--
src\views\Comment\index.vue
-->
<template>
  <van-cell-group>
    <!-- 总体评价情况 -->
    <van-cell title="商品评价" :value="`好评率${state.replyChance}%`" />
    <!-- 标签切换区域 -->
    <!-- 评价列表 -->
  </van-cell-group>
</template>

<script setup>

......

// 存储评论的相关数据
const state = reactive({
  // 存储所有个数信息
......
  replyChance: computed(() => state.commentCounts?.reply_chance || 100), // 总评数

})
......
</script>

<style lang="scss" scoped>
+ .tags {
+   .van-button {
+     border-radius: 15px;
+     margin-right: 10px
+   }
+
+   .active {
+     background-color: #FBC546
+   }
+ }
</style>
```

### 评价切换

<img src="/images/vue/113.gif" style="width: 50%; display:inline-block; margin: 0 ;">


```vue
<!--
src\views\Comment\index.vue
-->
<template>
  <van-cell-group>
    <!-- 总体评价情况 -->
    <van-cell title="商品评价" :value="`好评率${state.replyChance}%`" />
    <!-- 标签切换区域 -->
    <van-cell class="tags">
      <van-button
        size="small"
        :class="{ active: state.isSum }"
        @click="tagHandle('0')"
      >
        全部({{ state.sumCount }})
      </van-button>
      <van-button
        size="small"
        :class="{ active: state.isGoood }"
        @click="tagHandle('1')"
      >
        好评({{ state.goodCount }})
      </van-button>
      <van-button
        size="small"
        :class="{ active: state.isIn }"
        @click="tagHandle('2')"
      >
        中评({{ state.inCount }})
      </van-button>
      <van-button
        size="small"
        :class="{ active: state.isPoor }"
        @click="tagHandle('3')"
      >
        差评({{ state.poorCount }})
      </van-button>
    </van-cell>
    <!-- 评价列表 -->
  </van-cell-group>
</template>

<script setup>
......

// 存储评论的相关数据
const state = reactive({
  // 存储所有个数信息
  commentCounts: {},
  goodCount: computed(() => state.commentCounts?.good_count || 0), // 好评
  poorCount: computed(() => state.commentCounts?.poor_count || 0), // 差评
  inCount: computed(() => state.commentCounts?.in_count || 0), // 中评
  sumCount: computed(() => state.commentCounts?.sum_count || 0), // 总评数
  replyChance: computed(() => state.commentCounts?.reply_chance || 100), // 总评数
  // 存储评价信息
  commentList: [],
 + // 控制显示的评价状态
 + active: '0',
 + // 通过计算属性，来进行不同类型状态的判断
 + isSum: computed(() => state.active === '0'),
 + isGoood: computed(() => state.active === '1'),
 + isIn: computed(() => state.active === '2'),
 + isPoor: computed(() => state.active === '3')
})
......

+ // 切换类别的点击时间
+ function tagHandle (tagKey) {
+   state.active = tagKey
+ }
</script>

<style lang="scss" scoped>
.tags {
  .van-button {
    border-radius: 15px;
    margin-right: 10px;
  }

  .active {
    background-color: #fbc546;
  }
}
</style>
```

### 底部

```
components           
├─ Commentitem.vue  (引入-复用)   
├─ ...... 
```

1. index.vue引入公共组件-评价页面 Commentitem.vue 
2. 默认循环输出`评价类型tagKey`为`0`的数据
3. 按钮点击切换发送`评价类型tagKey`为`1或2或3`的数据

<img src="/images/vue/115.gif" style="width: 50%; display:inline-block; margin: 0 ;">


```vue
<template>
  ......
  
    <!-- 评价列表 -->
    <comment-item
   +  v-for="reply in state.commentList"
   +  :key="reply.id"
   +  :reply="reply"
    />
  </van-cell-group>
</template>
<script setup>
+ import CommentItem from '@/components/CommentItem.vue'

......
// 切换类别的点击时间
function tagHandle (tagKey) {
  state.active = tagKey
  // 发送新类型的评价请求
+  initCommentByTag(tagKey)
}
</script>
```

4. 如果某个评价没数据，这时候怎么处理？
   - 使用[Vant的Empty 空状态](https://youzan.github.io/vant/#/zh-CN/empty)组件

<img src="/images/vue/116.gif" style="width: 50%; display:inline-block; margin: 0 ;">


```vue
<template>
  ......
    <!-- 评价列表 -->
    <!-- 由于v-for在Vue指令权重最高，所以用一个div在外部包裹，让v-if和v-for不冲突 -->
    <!-- 如果length为true就展示，否则就展示van-empty组件 -->
    +<div v-if="state.hasComment">
      <comment-item
        v-for="reply in state.commentList"
        :key="reply.id"
        :reply="reply"
      />
    +</div>
    + <!-- 没有评论数据时，进行空结构展示 -->
    + <van-empty
    +   description="暂时还没有评价哦~"
    +   v-else
    + />
      </van-cell-group>
</template>
<script setup>
// 存储评论的相关数据
const state = reactive({
......
 + hasComment: computed(() => state.commentList.length || 0)
})
</script>
```

# 优化与部署

## 1. [在 vite 项目中按需引入组件](https://vant-contrib.gitee.io/vant/#/zh-CN/quickstart#zai-vite-xiang-mu-zhong-an-xu-yin-ru-zu-jian-tui-jian)

### 1. 安装插件

```sh
# 通过 npm 安装
npm i vite-plugin-style-import@1.4.1 -D

# 通过 yarn 安装
yarn add vite-plugin-style-import@1.4.1 -D

# 通过 pnpm 安装
pnpm add vite-plugin-style-import@1.4.1 -D

```

### 2. 配置插件

安装完成后，在 vite.config.js 文件中配置插件：

```js
import vue from '@vitejs/plugin-vue'
import styleImport, { VantResolve } from 'vite-plugin-style-import'

export default {
  plugins: [
    vue(),
    styleImport({
      resolves: [VantResolve()],
    }),
  ],
}
```

### 3. 把 main.js 的全局引入注释掉

```js
// src\main.js

import { createApp } from 'vue'
import App from './App.vue'
// 引入router
import router from './router'
import 'amfe-flexible'
import '@/styles/base.css'

// 引入Vuex
import store from './store'
+ // 全局引入Vant 组件库
+ // import Vant from 'vant'
+ // import 'vant/lib/index.css'

const app = createApp(App)
app.use(router)
app.use(store)
+ // app.use(Vant)

app.mount('#app')

```

### 4. 在 src/views 里各个页面，按需引入

- address

```vue
<script setup>
import {
  Button as VanButton,
  CellGroup as VanCellGroup,
  Field as VanField,
  Switch as VanSwitch,
  Form as VanForm,
  Cascader as VanCascader,
  Popup as VanPopup,
  NavBar as VanNavBar
} from 'vant'

......
</script>
```

::: tip 提示
如果不想Button给起别名： ` Button as VanButton`这种写法，也可以写成

```js
import {
  Button,
  CellGroup,
  Field,
  Switch,
  Form,
  Cascader,
  Popup,
  NavBar
} from 'vant'
```
，随后在写标签时，不用＋van开头，简写成写成`<Button>......</Button>`
:::

- cart
  - index.vue

```vue
<script setup>

import {
  Checkbox as VanCheckbox,
  SubmitBar as VanSubmitBar,
  Empty as VanEmpty,
  NavBar as VanNavBar
} from 'vant'

......
</script>
```

- cart
  - components/CartItem.vue

```vue
<script setup>

 import {
  Stepper as VanStepper,
  Checkbox as VanCheckbox
} from 'vant'

......
</script>
```

- Comment

```vue
<script setup>

import {
  Empty as VanEmpty,
  CellGroup as VanCellGroup,
  Cell as VanCell,
  Button as VanButton
} from 'vant'

......
</script>
```

- Home\components\HomeMain.vue

```vue
<script setup>

import {
  PullRefresh as VanPullRefresh,
  List as VanList,
  NoticeBar as VanNoticeBar,
  Swipe as VanSwipe,
  SwipeItem as VanSwipeItem,
  Grid as VanGrid,
  GridItem as VanGridItem
} from 'vant'

......
</script>
```

- Home\components\HomeNav.vue

```vue
<script setup>

import {
  Icon as VanIcon
} from 'vant'

......
</script>
```

- login

```vue
<script setup>
import {
  Button as VanButton,
  Form as VanForm,
  Field as VanField,
  CellGroup as VanCellGroup
} from 'vant'
......
</script>
```

- OrderConfirm

```vue
<script setup>
import {
  NavBar as VanNavBar,
  Popup as VanPopup,
  Radio as VanRadio,
  RadioGroup as VanRadioGroup,
  ActionSheet as VanActionSheet,
  Cell as VanCell,
  CellGroup as VanCellGroup,
  Button as VanButton,
  Icon as VanIcon,
  SubmitBar as VanSubmitBar,
  Empty as VanEmpty,
  AddressList as VanAddressList,
} from 'vant'
......
</script>
```

- Product

```vue
<script setup>
import {
  ActionBar as VanActionBar,
  ActionBarButton as VanActionBarButton,
  ActionBarIcon as VanActionBarIcon,
  Tabs as VanTabs,
  Tab as VanTab,
  Cell as VanCell,
  CellGroup as VanCellGroup,
  Icon as VanIcon,
  Stepper as VanStepper,
  Grid as VanGrid,
  GridItem as VanGridItem,
  Image as VanImage,
  Popup as VanPopup,
  Swipe as VanSwipe,
  SwipeItem as VanSwipeItem,
  NavBar as VanNavBar
} from 'vant'
......
</script>
```

- Recommend

```vue
<script setup>
import {
  ActionBar as VanActionBar,
  ActionBarButton as VanActionBarButton,
  ActionBarIcon as VanActionBarIcon,
  Tabs as VanTabs,
  Tab as VanTab,
  Cell as VanCell,
  CellGroup as VanCellGroup,
  Icon as VanIcon,
  Stepper as VanStepper,
  Grid as VanGrid,
  GridItem as VanGridItem,
  Image as VanImage,
  Popup as VanPopup,
  Swipe as VanSwipe,
  SwipeItem as VanSwipeItem,
  NavBar as VanNavBar
} from 'vant'
......
</script>
```

- User

```vue
<script setup>
import {
  Cell as VanCell,
  CellGroup as VanCellGroup,
  Grid as VanGrid,
  GridItem as VanGridItem
} from 'vant'
......
</script>
```


- src\components\Commentitem.vue

```vue
<script setup>
import {
  Cell as VanCell,
  Rate as VanRate
} from 'vant'
......
</script>
```
- src\components\LayoutFooter.vue

```vue
<script setup>
import {
  Tabbar as VanTabbar,
  TabbarItem as VanTabbarItem
} from 'vant'
......
</script>
```
- src\components\ProductList.vue

```vue
<script setup>
import {
  Grid as VanGrid,
  GridItem as VanGridItem,
  Image as VanImage
} from 'vant' 
......
</script>
```



### 5. 测试按需引入是否成功

```sh
# 测试一
npm run dev
# 测试二
npm run build
serve dist
```

## 2. 全局按需引入

::: tip 提示
在main.js全局按需引入 的打包代码压缩效果比[在页面按需加载](/vue/part6/project/Optimization-and-Deployment.html#_4-在-src-views-里各个页面-按需引入)差了些。
:::

### 1. 在main.js 按需引入
```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import '@/styles/base.css'

// import Vant from 'vant'
// import 'vant/lib/index.css'

import {
  Button,
  Field,
  Form,
  Cascader,
  Radio,
  RadioGroup,
  Checkbox,
  Cell,
  CellGroup,
  GridItem,
  Grid,
  Popup,
  PullRefresh,
  AddressList,
  List,
  Image,
  Tabs,
  Tab,
  Tabbar,
  TabbarItem,
  ActionSheet,
  ActionBar,
  ActionBarButton,
  ActionBarIcon,
  Rate,
  Switch,
  Stepper,
  SwipeItem,
  Swipe,
  SubmitBar,
  Empty,
  Icon,
  NavBar,
  NoticeBar,
  Card
} from 'vant'

const app = createApp(App)
app.use(router)
app.use(store)
// app.use(Vant)
app
  .use(Card)
  .use(Button)
  .use(Field)
  .use(Form)
  .use(Cascader)
  .use(Radio)
  .use(RadioGroup)
  .use(Checkbox)
  .use(Cell)
  .use(CellGroup)
  .use(GridItem)
  .use(Grid)
  .use(Popup)
  .use(PullRefresh)
  .use(AddressList)
  .use(List)
  .use(Image)
  .use(Tabs)
  .use(Tab)
  .use(Tabbar)
  .use(TabbarItem)
  .use(ActionSheet)
  .use(ActionBar)
  .use(ActionBarButton)
  .use(ActionBarIcon)
  .use(Rate)
  .use(Switch)
  .use(Stepper)
  .use(SwipeItem)
  .use(Swipe)
  .use(SubmitBar)
  .use(Empty)
  .use(Icon)
  .use(NavBar)
  .use(NoticeBar)
app.mount('#app')

```
### 2. 在 src/views 里各个页面书写相应标签
```vue{33-34,41,46-49}
<!-- \src\views\Login\index.vue -->

<template>
  <van-form @submit="submitHandle">
    <img class="logo" :src="state.logoUrl" alt="">
    <van-cell-group inset>
      <van-field
        v-model="state.username"
        clearable
        name="用户名"
        label="用户名"
        placeholder="用户名"
      />
      <van-field
        v-if="state.isPassword"
        v-model="state.password"
        type="password"
        clearable
        name="密码"
        label="密码"
        placeholder="密码"
      />
      <van-field
        v-else
        v-model="state.captcha"
        center
        clearable
        name="验证码"
        label="短信验证码"
        placeholder="短信验证码"
      >
        <template #button>
          <!-- 演示多种引入写法 -->
          <VanButton
            size="small"
            type="primary"
            @click="sendCaptcha"
            :disabled="state.isSend"
          >
            {{ state.currentText }}
          </VanButton>
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 16px;">
      <!-- 演示多种引入写法 -->
      <VanButton round block type="primary" native-type="submit">
        登录
      </VanButton>
      <span
        class="change-button"
        v-text="state.changeText"
        @click="changeMode"
      ></span>
    </div>
  </van-form>
</template>

......
```

### 3. 测试按需引入是否成功

```sh
# 测试一
npm run dev
# 测试二
npm run build
serve dist
```
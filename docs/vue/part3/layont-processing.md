# 布局处理

通过 Element 组件库进⾏布局

## 布局容器

通过 Element 的 [Container 布局容器](https://element.eleme.cn/#/zh-CN/component/container) 进⾏初始布局。

项⽬需要的布局⻛格为示例中倒数第⼆个，拷⻉对应结构。

```vue
// layout/index.vue
<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header>Header</el-header>
      <!-- 主体 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
```

Element 组件具有与组件名相同的类名，⽤于设置样式。

- 容器⾼度通过 vh 设置，1vh = 1%视⼝⾼度；设置最⼩宽度防⽌窗⼝尺⼨变化导致内容堆叠。
- 内部区域根据 Element 颜⾊设置或⾃⾏选择。

```vue
// layout/index.vue
<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header>Header</el-header>
      <!-- 主体 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: "LayoutIndex",
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
  min-width: 980px;
}
.el-aside {
  background-color: #d3dce6;
}

.el-header {
  background-color: #b3c0d1;
}

.el-main {
  background-color: #e9eef3;
}
</style>
```

<img src="/images/vue/287.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## 侧边栏菜单

### 通过 Element 的 [NavMenu](https://element.eleme.cn/#/zh-CN/component/menu) 创建侧边栏。

找到 NavMenu 的侧栏中⾃定义颜⾊示例的结构。

```vue
<el-menu
  default-active="2"
  class="el-menu-vertical-demo"
  @open="handleOpen"
  @close="handleClose"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b"
>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
```

将 layout 中的侧边栏设置为 AppAside 组件，保存在 layout/components/ 中。随后将之前的侧边栏菜单组件代码放⼊。

- 初始结构中 `<el-menu>` 设置了 open 与 close 事件，不需要可以删除。

```
@open="handleOpen"
@close="handleClose"
```

修改结果代码如下：

```vue
// /layout/components/AppAside.vue
<template>
  <div class="app-aside">
    <!-- 导航菜单组件 -->
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <!-- 具有⼦菜单的选项 -->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航⼀</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组⼀</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <!-- 没有⼦菜单的选项 -->
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航⼆</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "AppAside",
};
</script>

<style lang="scss" scoped></style>
```

### 在 layout 中引⼊ AppAside 组件

```vue
// layout/index.vue
<template>
  <el-container>
    <el-aside width="200px">
      <!-- 引⼊ AddAside 组件 -->
      <app-aside></app-aside>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from "./components/AppAside";
export default {
  name: "Layout",
  components: {
    AppAside,
  },
};
</script>
...
```

设置完毕，在浏览器中查看是否设置成功。

<img src="/images/vue/288.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

接下来给菜单设置基础样式

```vue
// AppAside.vue
<style lang="scss" scoped>
.app-aside {
  height: 100%;
  .el-menu {
    height: 100%;
    border-right: 0 none;
  }
}
</style>
```

### 根据项⽬侧边栏菜单功能进⾏结构与内容调整。

`<el-menu-item>` 代表没有⼦项的菜单
`<el-submenu>` 代表具有⼦项的菜单

```vue
// AppAside.vue
<template>
  <div class="app-aside">
    <!-- 导航菜单组件 -->
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item index="1-1">
          <i class="el-icon-document"></i>
          <span>⻆⾊列表</span>
        </el-menu-item>
        <el-menu-item index="1-2">
          <i class="el-icon-document"></i>
          <span>菜单列表</span>
        </el-menu-item>
        <el-menu-item index="1-3">
          <i class="el-icon-document"></i>
          <span>资源列表</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">课程管理</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">⽤户管理</span>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">⼴告管理</span>
        </template>
        <el-menu-item index="4-1">
          <i class="el-icon-document"></i>
          <span>⼴告列表</span>
        </el-menu-item>
        <el-menu-item index="4-2">
          <i class="el-icon-document"></i>
          <span>⼴告位列表</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
```

### 操作时两个 `<el-submenu>` 不能同时展开。

- 设置⽅式： 给 `<el-menu>` 设置 unique-opened 属性即可。

```vue
// AppAside.vue
<el-menu
  default-active="1"
  class="el-menu-vertical-demo"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b"
  unique-opened
> // 添加属性
...
 </el-menu>
```

### 当点击列表项时，应该进⾏路由操作，可以使⽤ NavMenu 的 router 功能。

- 设置⽅式： 给 `<el-menu>` 设置 router 属性，即可使⽤ vue-router 模式
- 该模式会在激活导航时以 index 属性作为 path 进⾏路由跳转。

```vue
// AppAside.vue
<template>
  <div class="AppAside">
    <!-- 导航菜单组件 -->
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened
      router
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item index="/role">
          <i class="el-icon-document"></i>
          <span>⻆⾊列表</span>
        </el-menu-item>
        <el-menu-item index="/menu">
          <i class="el-icon-document"></i>
          <span>菜单列表</span>
        </el-menu-item>
        <el-menu-item index="/resource">
          <i class="el-icon-document"></i>
          <span>资源列表</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/course">
        <i class="el-icon-menu"></i>
        <span slot="title">课程管理</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <i class="el-icon-document"></i>
        <span slot="title">⽤户管理</span>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">⼴告管理</span>
        </template>
        <el-menu-item index="/advert">
          <i class="el-icon-document"></i>
          <span>⼴告列表</span>
        </el-menu-item>
        <el-menu-item index="/advert-space">
          <i class="el-icon-document"></i>
          <span>⼴告位列表</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
```

### 路由切换设置成功，最后在 layout 组件中设置⼦路由出⼝即可完成。

```vue
// layout/index.vue
<template>
  <el-container>
    <el-aside width="200px">
      <app-aside></app-aside>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <!-- 设置⼦路由出⼝ -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
```

## 布局处理-头部

头部分为左侧导航以及右侧⽤户菜单。

### 将头部封装为 AppHeader 组件

首先，将头部封装为 AppHeader 组件，保存到 layout/components/ 中。

```vue
// layout/components/AppHeader.vue
<template>
  <div class="app-header">Header</div>
</template>
<script>
export default {
  name: "AppHeader",
};
</script>

<style lang="scss" scoped></style>
```

### 在 layout 中引⼊ AppHeader 组件

```vue
// layout/index.vue
<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside width="200px">
      <!-- 侧边栏组件 -->
      <app-aside></app-aside>
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header>
        <!-- 头部组件 -->
        <app-header></app-header>
      </el-header>
      <!-- 主体 -->
      <el-main>
        <!-- 设置子路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
// 引入侧边栏组件
import AppAside from "./components/AppAside.vue";
import AppHeader from "./components/AppHeader";

export default {
  name: "LayoutIndex",
  components: {
    AppAside,
    AppHeader,
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
  min-width: 980px;
}
.el-aside {
  background-color: #d3dce6;
}

.el-header {
  background-color: #b3c0d1;
}

.el-main {
  background-color: #e9eef3;
}
</style>
```

## 布局处理-头部-左侧

### 左侧导航使⽤ Element 的 [⾯包屑导航](https://element.eleme.cn/#/zh-CN/component/breadcrumb) 设置。

```vue
// AppHeader.vue // layout/components/AppHeader.vue
<template>
  <div class="app-header">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: "AppHeader",
};
</script>

<style lang="scss" scoped>
.app-header {
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
```

### 修改 header 背景⾊（避免箭头颜⾊与背景相同看不⻅）。

```vue
// layout/index.vue .el-header { background-color: #fff; }
```

### 设置头部内容垂直居中。

// app-header.vue

```vue
<style lang="scss" scoped>
.app-header {
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
```

<img src="/images/vue/289.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## 布局处理-头部-右侧

### 右侧使⽤Element的[下拉菜单](https://element.eleme.cn/#/zh-CN/component/dropdown) 设置。

```vue
// AppHeader.vue
<template>
  <div class="app-header">
    ...
    <!-- 右侧下拉菜单 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>⻩⾦糕</el-dropdown-item>
        <el-dropdown-item>狮⼦头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item disabled>双⽪奶</el-dropdown-item>
        <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
```

### 设置左右显示。

```vue
// AppHeader.vue
<style lang="scss" scoped>
.app-header {
  ...justify-content: space-between;
}
</style>
```

### 将下拉菜单⽂字更改为Element的 [Avatar](https://element.eleme.cn/#/zh-CN/component/avatar) 组件。

```vue
// AppHeader.vue
<el-dropdown>
<span class="el-dropdown-link">
<!-- Avatar 头像组件 -->
<el-avatar
:size="30"
src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
></el-avatar>
<i class="el-icon-arrow-down el-icon--right"></i>
</span>
 ...
 </el-dropdown>
```

设置头像与右侧箭头垂直居中

```vue
// AppHeader.vue
<style lang="scss" scoped>
.app-header {
  ... .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}
</style>
```

最后修改下拉菜单内容与结构，divided 属性⽤于设置分割线。

```vue
 <el-dropdown>
 ...
 <el-dropdown-menu slot="dropdown">
 <el-dropdown-item>⽤户信息</el-dropdown-item>
 <el-dropdown-item divided>推出</el-dropdown-item>
 </el-dropdown-menu>
 </el-dropdown>
```

<img src="/images/vue/290.jpg" style="width: 100%; display:inline-block; margin: 0 ;">


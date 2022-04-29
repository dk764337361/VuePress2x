# 权限管理

权限管理是后台管理系统的核⼼功能，要给不同⼯作岗位的⽤户分配不同的操作权限，就需要进⾏权限管理。

- 功能说明

权限管理内部⼜划分为以下⼏个部分：菜单权限、资源权限、⻆⾊。

- 菜单权限

控制登录到后台的⽤户能访问到哪些后台菜单⻚⾯，如负责⼴告的⼈员只能看到⼴告管理，课程⼈员则只能看到课程管理，就需要进⾏不同的菜单权限分配。

- 资源权限

资源对应的是接⼝，资源权限⽤于控制⽤户能操作哪些接⼝功能，例如分配资源权限时没有禁⽤⽤户权限，指的是没有操作这个接⼝的权限。

资源权限与菜单权限不冲突，例如有的⽤户能看到⽤户管理⻚⾯，也可以添加⽤户（有权限操作新增⽤户接⼝），但⽆法进⾏禁⽤⽤户操作（⽆禁⽤⽤户的接⼝权限）。

- ⻆⾊

代表了菜单权限和资源权限的⼀种组合⽅式，例如设置多个⽤户需要相同的菜单权限与资源权限，就可以将这些权限组合起来，设置为⻆⾊，再将⻆⾊分配给⽤户以简化操作。

所以，在项⽬中，我们不会直接对某个⽤户进⾏菜单权限或资源权限的分配，⽽是提前根据岗位清空设定不同的⻆⾊，再将⻆⾊分配给⽤户即可。⽤户需要分配⻆⾊，⻆⾊需要分配菜单权限与资源权限。

- 功能关系

⽤户需要分配⻆⾊，⻆⾊需要分配菜单权限与资源权限。

```
⽤户
└── ⻆⾊
├── 菜单权限
└── 资源权限
```

由于功能间存在依赖，所以我们先从`菜单权限`与`资料权限`功能开始制作，后⾯再依次完成⻆⾊与⽤户功能。

## 菜单管理

### 菜单列表-整体布局

使⽤ Element 中 [Card 卡⽚](https://element.eleme.cn/#/zh-CN/component/card)组件来进⾏布局。

```vue
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>卡片名称</span>
    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
  </div>
  <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div>
</el-card>
```

添加到菜单⻚⾯中 views/menu/index.vue

```vue
// views/menu/index.vue
<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>卡⽚名称</span>
        <el-button style="float: right; padding: 3px 0" type="text"
          >操作按钮</el-button
        >
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{ '列表内容 ' + o }}
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'MenuIndex',
}
</script>

<style lang="scss" scoped></style>
```

将标题区域更改为添加菜单按钮，添加后跳转到添加菜单组件。

```vue
// views/menu/index.vue ...
<div slot="header" class="clearfix">
<el-button
@click="$router.push({name: 'menu-create'})"
>添加菜单</el-button>
</div>
...
```

在 menu ⽬录下创建 create.vue，并创建初始结构。

```vue
<template>
  <div class="menu-create"></div>
</template>

<script>
export default {
  name: 'MenuCreate',
}
</script>

<style lang="scss" scoped></style>
```

添加到路由表中。

```js
// router/index.js
...
{
path: '/menu/create',
name: 'menu-create',
component: () => import(/* webpackChunkName: 'menu-create' */'@/views/menu/create')
}
]
```

### 添加菜单布局

- 下⾯通过 Element 的 Card 套 Form 的⽅式给 menu-create 进⾏布局。
  - 将 Card 头部设置为标题。
  - 将 Card 内容列表替换为 Form。

```vue
// views/menu/create.vue
<template>
  <div class="menu-create">
    <!-- Card 组件 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 设置标题 -->
        <span>添加菜单</span>
      </div>
      <!-- Form 组件 -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域⼀" value="shanghai"></el-option>
            <el-option label="区域⼆" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择⽇期"
              v-model="form.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker
              placeholder="选择时间"
              v-model="form.date2"
              style="width: 100%;"
            ></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="美⻝/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">⽴即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
```

最后根据功能进⾏表单域设置。

```vue
<template>
  <div class="menu-create">
    <!-- Card 组件 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 设置标题 -->
        <span>添加菜单</span>
      </div>
      <!-- Form 组件 -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select v-model="form.region" placeholder="请选择上级菜单">
            <el-option label="区域⼀" value="shanghai"></el-option>
            <el-option label="区域⼆" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="前端图标">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-radio-group v-model="form.resource">
            <el-radio label="是">是</el-radio>
            <el-radio label="否">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number
            v-model="form.date1"
            label="描述⽂字"
          ></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
```

### 菜单数据绑定

- 绑定数据的名称可以根据接⼝设置。
  - 接⼝为：菜单管理 -> [保存或新增菜单](https://passport.lagou.com/login/login.html?signature=7B0EF8918857CBF37FD6BD6B82FD41DD&service=http%253A%252F%252Fwww.lagou.com%252Fboss%252Fdoc.html&action=login&serviceId=lagou&ts=1650187162863#/edu-boss-boot/%E8%8F%9C%E5%8D%95%E7%AE%A1%E7%90%86/saveOrUpdateUsingPOST_1)。
  - 由于接⼝的请求参数需要为 application/json 所以使⽤ Postman 测试时要进⾏对应选择。

<img src="/images/vue/334.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

将数据声明在 data 中，并绑定到视图。

```js
// views/menu/create.vue
data () {
return {
form: {
id: 1,
parentId: 1,
name: '',
href: '',
icon: '',
 orderNum: 0,
 description: '',
 shown: false
 }
 }
 },
```

```vue
// views/menu/create.vue
<!-- Form 组件 -->
<el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径">
          <el-input v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select v-model="form.parentId" placeholder="请选择上级菜单">
            <!-- 无上级菜单-->
            <el-option label="无上级菜单" :value="-1"></el-option>
            <!-- 选择一级菜单   -->
            <el-option
              v-for="item in parentMenuList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="前端图标">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-radio-group v-model="form.shown">
            <!-- label 的数据会在选择后设置给 v-model 的 shown -->
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number
            v-model="form.orderNum"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
```

完成。

### 上级菜单处理

上级菜单数据需要请求接⼝得到，并渲染在模板中。

⽤于获取菜单的接⼝有两个，[获取所有菜单](https://passport.lagou.com/login/login.html?signature=E6987771823364BD76AFB375F77C8DEB&service=http%253A%252F%252Fwww.lagou.com%252Fboss%252Fdoc.html&action=login&serviceId=lagou&ts=1650191156845#/edu-boss-boot/%E8%8F%9C%E5%8D%95%E7%AE%A1%E7%90%86/getAllUsingGET) 与 [获取编辑菜单⻚⾯信息](https://passport.lagou.com/login/login.html?signature=F29F14915D9A00D2A567405367861A01&service=http%253A%252F%252Fwww.lagou.com%252Fboss%252Fdoc.html&action=login&serviceId=lagou&ts=1650191172867#/edu-boss-boot/%E8%8F%9C%E5%8D%95%E7%AE%A1%E7%90%86/getEditMenuInfoUsingGET)。观察功能示例发现，菜单分为⼀级

菜单和⼆级菜单，⽽⼆级菜单⽆法作为“上⼀级菜单”使⽤，所以这⾥使⽤第⼆个接⼝进⾏操作。

接⼝使⽤时需要传请求参数 id，添加传⼊ -1，编辑传⼊对应 id，区别为添加操作的菜单信息 menuInfo
为 null。

<img src="/images/vue/335.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/336.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

我们需要使⽤的为 parentMenuList 字段信息，内部的每个元素均为⼀级菜单，元素如具有 subMenuList 则说明存在⼦菜单（⼆级菜单）。

接下来设置接⼝请求⽅法。

```js
// services/menu.js
...
// 获取编辑菜单⻚⾯信息
// - 请求参数为 id，默认值为 -1
export const getEditMenuInfo = (id = -1) => {
return request({
method: 'GET',
// 请求参数：
// url: `/boss/menu/getEditMenuInfo?id=${id}`,
 url: '/boss/menu/getEditMenuInfo',
 params: {
 id
 }
 })
 }
 ...
```

created 中请求数据。

```js
// create.vue
...
<script>
// 引⼊接⼝请求功能
import { createOrUpdateMenu, getEditMenuInfo } from '@/services/menu'
export default {
...
created () {
 // 请求上级菜单信息
 this.loadMenuInfo()
 },
 methods: {
 async onSubmit () { ... },
 // 请求上级菜单信息⽅法
 async loadMenuInfo () {
 const { data } = await getEditMenuInfo()
 console.log(data)
 }
 }
 }
 </script>
```

如果请求成功，将响应数据的 parentMenuList 保存到 data 中并进⾏列表渲染。

```js
// menu/create.vue
...
data () {
return {
form: { ... },
// 存储上级列表信息
parentMenuList: []
}
},
 ...
 methods: {
 async onSubmit () { ... },
 async loadMenuInfo () {
 const { data } = await getEditMenuInfo()
 // 请求成功，保存到 data 中
 if (data.code === '000000') {
 this.parentMenuList = data.data.parentMenuList
 }
 }
 }
```

```vue
// create.vue ...
<el-form-item label="上级菜单">
<el-select v-model="form.region" placeholder="请选择上级菜单">
<el-option
:label="item.name"
:value="item.id"
v-for="item in parentMenuList"
:key="item.id"
 ></el-option>
 </el-select>
 </el-form-item>
...
```

添加“⽆上级菜单选项”

```vue
// create.vue ...
<!-- 将下拉菜单数据绑定为 parentId，默认为-1 -->
<el-select v-model="form.parentId" placeholder="请选择上级菜单">
<!-- ⽆上级菜单选项 -->
<el-option
:value="-1"
label="⽆上级菜单"
></el-option>
 <!-- 动态选项 -->
 <el-option
 :label="item.name"
 :value="item.id"
 v-for="item in parentMenuList"
 :key="item.id"
 ></el-option>
 </el-select>
...
```

<img src="/images/vue/337.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 添加菜单提交

```js
// src/services/menu.js

// 添加菜单接口
export const createOrUpdateMenu = (data) => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data,
  })
}
```

- menu/create.vue

```js{2,27-39}
<script>
import { getEditMenuInfo, createOrUpdateMenu } from '@/services/menu'

export default {
  name: 'MenuIndex',
  data () {
    return {
      form: {
        parentId: -1,
        name: '',
        href: '',
        icon: '',
        orderNum: 5,
        description: '',
        path: '',
        shown: true
      },
      // 存储上级菜单数据
      parentMenuList: []
    }
  },
  created () {
    // 加载上级菜单信息
    this.loadMenuInfo()
  },
  methods: {
    async onSubmit () {
      // console.log('submit')
      // 1. 表单验证
      // 2. 发送请求
      const { data } = await createOrUpdateMenu(this.form)
      // console.log(data)
      if (data.code === '000000') {
        this.$message.success('提交成功')
        this.$router.push({
          name: 'menu'
        })
      }
    },
    async loadMenuInfo () {
      // 请求菜单数据（上级菜单数据）
      const { data } = await getEditMenuInfo()
      // console.log(data)
      if (data.code === '000000') {
        // 将上级菜单数据保存，进行数据绑定
        this.parentMenuList = data.data.parentMenuList
      }
    }
  }
}
</script>
```

<img src="/images/vue/050.gif" style="width: 100%; display:inline-block; margin: 0 ;">

### 展示菜单列表

<img src="/images/vue/338.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

使⽤ Element 的 [Table 表格](https://element.eleme.cn/#/zh-CN/component/table)组件处理。

```vue
// Element 官⽅示例： Table 表格组件
<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="⽇期" width="180"> </el-table-column>
    <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
    <el-table-column prop="address" label="地址"> </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王⼩⻁',
          address: '上海市普陀区⾦沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王⼩⻁',
          address: '上海市普陀区⾦沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王⼩⻁',
          address: '上海市普陀区⾦沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王⼩⻁',
          address: '上海市普陀区⾦沙江路 1516 弄',
        },
      ],
    }
  },
}
</script>
```

设置到 menu/index.vue 中

```vue
// menu/index.vue
<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push({ name: 'menu-create' })"
          >添加菜单</el-button
        >
      </div>
      <!-- 菜单列表展示区域 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="⽇期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'MenuIndex',
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王⼩⻁',
          address: '上海市普陀区⾦沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王⼩⻁',
          address: '上海市普陀区⾦沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王⼩⻁',
          address: '上海市普陀区⾦沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王⼩⻁',
          address: '上海市普陀区⾦沙江路 1516 弄',
        },
      ],
    }
  },
}
</script>
```

根据功能，修改表格内容。

```vue
// menu/index.vue
<!-- 菜单列表展示区域 -->
<el-table :data="tableData" style="width: 100%">
<el-table-column
prop="date"
label="编号">
</el-table-column>
 <el-table-column
 prop="name"
 label="菜单名称">
 </el-table-column>
 <el-table-column
 prop="address"
 label="菜单级数">
 </el-table-column>
 <el-table-column
 prop="address"
 label="前端图标">
 </el-table-column>
 <el-table-column
 prop="address"
 label="排序">
 </el-table-column>
 <el-table-column
 prop="address"
 label="操作">
 </el-table-column>
 </el-table>
```

::: tip 提示
:data="tableData" 是 Element 提供的遍历属性，无需使用 vue 的 v-for
:::

封装接⼝请求功能

```js
 // services/menu.js
 ...
 // 获取所有菜单
 export const getAllmenu = () => {
 return request({
 method: 'GET',
 url: '/boss/menu/getAll'
 })
 }
```

引⼊并请求数据，请求成功保存到 data 中（store 中存在即可，视图问题下⼀步处理）。

```vue
// menu/index.vue
<script>
// 引⼊
import { getAllMenus } from '@/services/menu'
export default {
  name: 'MenuIndex',
  data() {
    return {
      // 设置数据
      menus: [],
    }
  },
  created() {
    // 加载所有菜单信息
    this.loadAllMenus()
  },
  methods: {
    async loadAllMenus() {
      // 请求
      const { data } = await getAllMenus()
      console.log(data)
    },
  },
}
</script>
```

将数据展示到模板中

```vue
// menu/index.vue
<!-- 将 menus 绑定给 el-table 组件的 data 属性 -->
<el-table :data="menus" style="width: 100%">
<!-- 编号通过组件提供的 type="index" 设置 -->
<el-table-column
label="编号"
type="index">
 </el-table-column>
 <!-- 后续的数据通过 prop 设置为 menus 中对象的对应属性名 -->
 <el-table-column
 prop="name"
 label="菜单名称">
 </el-table-column>
 <el-table-column
 prop="level"
 label="菜单级数">
 </el-table-column>
 <el-table-column
 prop="icon"
 label="前端图标">
 </el-table-column>
 <el-table-column
 prop="orderNum"
 label="排序">
 </el-table-column>
 <!-- 操作中不是内容，⽽是操作按钮，⽆需设置 prop，结构单独处理，宽度 150可选 -->

 <el-table-column
 label="操作"
 width=""150>
 </el-table-column>
 </el-table>
```

操作部分需要对 Table 进⾏⾃定义。

::: warning 注意
Element 的 Table 组件使⽤的 slot-scope="scope" 是 Vue.js 在 [2.6 版本之前的作⽤域插槽语法](https://cn.vuejs.org/v2/guide/components-slots.html#%E5%BA%9F%E5%BC%83%E4%BA%86%E7%9A%84%E8%AF%AD%E6%B3%95)，已被废弃。现⾏版本语法中使⽤ v-slot 指令进⾏作⽤域插槽设置。
:::

- scope 是作⽤域插槽中接收的、由组件内部提供的数据，可⾃⾏命名并在 `<template>` 作⽤域中使⽤。
  - \$index 代表索引
  - row 代表当前⾏信息（数据）
- 是否使⽤取决于需求。

```vue
// Element 官⽅示例：Table -> ⾃定义列模板
<template slot-scope="scope">
  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
    >编辑</el-button
  >
  <el-button
    size="mini"
    type="danger"
    @click="handleDelete(scope.$index, scope.row)"
    >删除</el-button
  >
</template>
```

- 应⽤到⻚⾯中，并定义点击功能。
  - 此处为了半屏演示时操作⽅便，将 layout/index.vue 样式中的 min-width: 980px 去除。

```vue
<!-- 操作中不是内容，⽽是按钮，单独处理 -->
<el-table-column label="操作" width="180">
<!-- ⾃定义列模板 -->
<template slot-scope="scope">
<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
 <el-button
 size="mini"
 type="danger"
 @click="handleDelete(scope.$index, scope.row)">删除</el-button>
</template>
</el-table-column>
...
<script>
...
methods: {
...
handleEdit (index, rowData) {
// 输出观察数据，后续根据需要可选择删除或保留
console.log('编辑', index, rowData)
},
handleDelete () {
console.log('删除')
}
}
...
</script>
```

### 菜单删除按钮

点击删除时，提示⽤户确认，并使⽤当前⾏数据信息进⾏删除请求。

```js
// menu/index.vue
...
    handleDelete () {
      // 确认提示（参数3的具体配置不需要可省略）
      this.$confirm('确认删除吗？', '删除提示')
        .then( () => {
            // 发送删除请求
        }).catch(() => {
            // 取消提示
          this.$message.info('已取消删除')
        })
    },
...
```

- 封装接⼝请求，并引⼊调⽤。
  - 删除菜单接⼝：[地址](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/菜单管理/deleteUsingDELETE)，Postman ⾃⾏测试。

```js
 // services/menu.js
 ...
 // 删除指定菜单
 export const deleteMenu = id => {
 return request({
 method: 'DELETE',
 url: `/boss/menu/${id}`
 })
 }
```

```vue
// menu/index.vue
<template>
  ...
  <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
    >删除</el-button
  >
  ...
</template>
<script>
import { getAllMenus, deleteMenu } from '@/services/menu'
...
handleDelete (rowData) {
this.$confirm('确认删除吗？', '删除提示')
.then(async () => {
// 发送删除请求
const { data } = await deleteMenu(rowData.id)
if (data.code === '000000') {
this.$message.success('删除成功')
// 更新数据列表
this.loadAllMenus()
}
})
...
}
</script>
```

<img src="/images/vue/051.gif" style="width: 100%; display:inline-block; margin: 0 ;">

### 编辑按钮与添加按钮

#### 布局处理

- 观察项⽬演示发现，添加菜单和编辑菜单的组件结构⼏乎相同，可以封装为组件进⾏复⽤。

  - 创建 menu/components/create-or-edit.vue 组件
  - 将 menu/create.vue 内容复制到 create-or-edit.vue 中
    - 更改 name
    - create-or-edit 组件通过 prop 接收⽗组件数据 isEdit 来判断要展示哪种结构。
    - 标题判断处理（其余功能后续处理）

- 去除 create.vue 中的多余内容
  - 根元素内的所有结构
  - data、created、methods 所有内容

```vue
// menu/create.vue
<template>
  <div class="menu-create"></div>
</template>
<script>
export default {
  name: 'MenuCreate',
}
</script>

<style lang="scss" scoped></style>
```

- 引⼊ create-or-edit 组件，并进⾏处理。

```vue
// menu/create.vue
<template>
  <div class="menu-create">
    <!-- 将添加功能封装到了单独组件 ./components/CreateOrEdit.vue 中-->
    <!-- 设置组件，isEdit 默认为false，⽆需传⼊ -->
    <create-or-edit></create-or-edit>
  </div>
</template>

<script>
import CreateOrEdit from './components/CreateOrEdit.vue'
export default {
  name: 'MenuIndex',
  components: {
    CreateOrEdit,
  },
}
</script>

<style lang="scss" scoped></style>
```

- 创建 menu/edit.vue 组件，并设置内容。

```vue
// menu/edit.vue
<template>
  <div class="menu-create">
    <!-- 设置 is-edit (建议使⽤ kebab-case)为 true，展示编辑功能 -->
    <create-or-edit :isEdit="true"></create-or-edit>
  </div>
</template>
<script>
import CreateOrEdit from './components/create-or-edit'
export default {
  name: 'MenuEdit',
  components: {
    CreateOrEdit,
  },
}
</script>

<style lang="scss" scoped></style>
```

- 将菜单编辑添加到路由表中。
  - 由于编辑为某个菜单的编辑，应设置动态路由展示菜单项 id
  - 因为功能相近，可以将菜单添加和编辑路由的 chunkname 设置为相同值，这样合并在⼀个包中。（按需）

```js
 // router/index.js
 ...
 {
 path: '/menu/:id/edit',
 name: 'menu-edit',
 component: () => import(/* webpackChunkName: 'menu-edit' */'@/views/menu/edit')
 }
 ]
 ...
```

- 给 menu/index.vue 中的编辑按钮设置点击后的路由跳转。

```vue
// menu/index.vue
<template>
  ...
  <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
  ...
</template>
<script>
...
handleEdit (rowData) {
// 导航到菜单编辑⻚
this.$router.push({
name: 'menu-edit',
// 传递动态路由参数
params: {
id: rowData.id
}
})
},
...
</script>
```

#### 逻辑处理

编辑功能中，create-or-edit 的表单不需要重置按钮，通过 v-if 判断。

```vue
// create-or-edit.vue
<!-- 编辑功能中⽆需渲染重置按钮 -->
<el-button v-if="!isEdit">重置</el-button>
```

- 编辑时，将要编辑的菜单项信息展示在表单中。
  - 之前操作中分析过，getEditMenuInfo 接⼝在编辑功能时可以获取到菜单信息，添加时为空。
  - 这⾥需要将动态路由参数传⼊，并给添加功能设置默认值 -1
  - 将响应数据中的 menuInfo 赋值给 data 中的 data.form 即可（属性名是对应的）。

```js
// create-or-edit.vue
...
async loadMenuInfo () {
// 编辑功能合并后，处理接⼝id，默认值 -1 为添加功能使⽤
const id = this.$route.params.id || -1
const { data } = await getEditMenuInfo(id)
// 如果存在 menuInfo，说明为编辑功能，更新展示数据
if (data.data.menuInfo) {
this.form = data.data.menuInfo
 }
 if (data.code === '000000') {
 console.log(data)
 this.parentMenuList = data.data.parentMenuList
 }
 }
```

由于添加与编辑是同⼀个接⼝，区别在于编辑时多了参数 id ，由于提交时传⼊的为 form 数据，编辑提交时就会⾃动包含 id，所以提交操作⽆需处理，编辑功能完成。

<img src="/images/vue/052.gif" style="width: 100%; display:inline-block; margin: 0 ;">

### 资源列表整体布局

- 说明：
  - 资源管理讲解数据展示、数据分⻚、数据筛选。添加、编辑、删除、以及资源分类中的所有功能均与菜单管理功能类似，这⾥作为功能练习⾃⾏完成。

#### 整体布局

将资源列表设置为单独组件（独⽴于 resource/index.vue）引⼊

```vue
// resource/components/list.vue
<template>
  <div class="resource-list">资源列表</div>
</template>
<script>
export default {
  name: 'ResourceList',
}
</script>

<style lang="scss" scoped></style>
```

引⼊

```vue
// resource/index.vue
<template>
  <div class="resource">
    <!-- 引⼊资源列表组件 -->
    <resource-list></resource-list>
  </div>
</template>
<script>
// 引⼊
import ResourceList from './components/list'
export default {
  name: 'ResourceIndex',
  // 设置为组件
  components: {
    ResourceList,
  },
}
</script>

<style lang="scss" scoped></style>
```

- 给 list.vue 中进⾏基础布局：
  - 使⽤ Card 组件 设置外部结构
  - 头部设置 Form 组件的⾏内表单形式与数据
  - 内容设置 Table 组件并设置数据

```vue
// resource/components/list.vue
<template>
  <div class="resource-list">
    <!-- 使⽤ Card 组件 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 使⽤ Form 组件：⾏内表单 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="审批⼈">
            <el-input v-model="formInline.user" placeholder="审批⼈"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="formInline.region" placeholder="活动区域">
              <el-option label="区域⼀" value="shanghai"></el-option>
              <el-option label="区域⼆" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 使⽤ Table 组件 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="⽇期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ResourceList',
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王⼩⻁',
          address: '上海市普陀区⾦沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王⼩⻁',
          address: '上海市普陀区⾦沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王⼩⻁',
          address: '上海市普陀区⾦沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王⼩⻁',
          address: '上海市普陀区⾦沙江路 1516 弄',
        },
      ],
      formInline: {
        user: '',
        region: '',
      },
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
  },
}
</script>

<style lang="scss" scoped></style>
```

完成。

#### 展示资源列表

- 使⽤按条件分⻚查询资源接⼝，[接⼝地址](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/资源管理/getResourcePagesUsingPOST)。
- Postman 测试时注意，所有参数可选：
  - ⽆参数时需要传⼊空对象，这时响应数据的 data.records 为第⼀⻚的多条数据。
  - 传⼊参数⽤于按条件筛选，如传⼊ name 或 url，这时响应数据的 data.records 为筛选后数据（多为⼀条）
    - 接⼝⽀持模糊查询，例如传⼊ "url": "menu" ，这时会响应多条满⾜条件的资料信息。
- 测试完毕，封装接⼝到新模块 services/resource.js 中。

```js
// services/resource.js
import request from '@/utils/request'

// 按条件分页查询资源接口

export const getResourcePages = (data) => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data,
  })
}
```

引⼊调⽤，发送请求：

```vue
// resource/components/list.vue ...
<script>
// 引⼊
import { getResourcePages } from '@/services/resource.js'
export default {
...
created () {
 // 调⽤
 this.loadResources()
 },
 methods: {
 ...
 async loadResources () {
 // 请求，空对象必须传⼊，否则参数不完整导致接⼝报错
 const { data } = await getResourcePages({})
 console.log(data)
 }
 }
 }
</script>
```

<img src="/images/vue/339.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

成功后，将数据存储到 data.resources 中，并绑定到 Table 组件

```vue
// resource/components/list.vue
<template>
  <div class="resource-list">
    <!-- 使⽤ Card 组件 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 使⽤ Form 组件：⾏内表单 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="审批⼈">
            <el-input v-model="formInline.user" placeholder="审批⼈"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="formInline.region" placeholder="活动区域">
              <el-option label="区域⼀" value="shanghai"></el-option>
              <el-option label="区域⼆" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 使⽤ Table 组件 -->
      <el-table :data="resources" style="width: 100%">
        <el-table-column
          type="index"
          label="编号"
          width="100"
        ></el-table-column>
        <el-table-column prop="name" label="资源名称"></el-table-column>
        <el-table-column
          prop="url"
          label="资源路径"
          width="180"
        ></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <!-- 设置过滤器需要使用作用域插槽获取数据 -->
        <el-table-column prop="createdTime" label="添加时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createdTime | dataFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              @click="handleDelete(scope.row)"
              type="danger"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getResourcePages } from '@/services/resource'
export default {
  name: 'ResourceList',
  data() {
    return {
      //  存储资源列表数据
      resources: [],
      formInline: {},
    }
  },
  created() {
    this.loadResources()
  },
  methods: {
    async loadResources() {
      // 没有传值时，需要传入一个空对象作为代替
      const { data } = await getResourcePages({})
      console.log(data)
      if (data.code === '000000') {
        this.resources = data.data.records
      }
    },
    handleEdit() {},
    handleDelete() {},
  },
  filters: {
    // 日期过滤器
    dataFormat(date) {
      //   console.log(data)
      date = new Date(date)
      return `
      ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}
      ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
      `
    },
  },
}
</script>

<style lang="scss" scoped></style>
```

<img src="/images/vue/340.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 分页功能

#### 分⻚布局

使⽤ Element 的 [Pagination 分⻚组件](https://element.eleme.cn/#/zh-CN/component/pagination) -> 附加功能 -> 完整功能设置。

<img src="/images/vue/341.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```vue
// Element 官⽅示例： 分⻚组件完整功能
<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage4"
    :page-sizes="[100, 200, 300, 400]"
    :page-size="100"
    layout="total, sizes, prev, pager, next, jumper"
    :total="400"
  >
  </el-pagination>
</template>
<script>
export default {
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
  },
  data() {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
    }
  },
}
</script>
```

将结构、⽅法、数据添加到 list.vue 中

```vue
// list.vue
<el-card class="box-card">
...
<!-- 给 table 与 pagination 设置间距，看起来更美观 -->
<el-table
:data="resources"
style="width: 100%; margin-bottom: 20px;">
...
<!-- 分⻚功能 -->
 <el-pagination
 @size-change="handleSizeChange"
 @current-change="handleCurrentChange"
 :current-page="currentPage4"
 :page-sizes="[100, 200, 300, 400]"
 :page-size="100"
 layout="total, sizes, prev, pager, next, jumper"
 :total="400">
 </el-pagination>
 </el-card>
 ...
 <script>
 ...
 data () {
 return {
 ...
 currentPage1: 5,
 currentPage2: 5,
 currentPage3: 5,
 currentPage4: 4
 }
 },
 ...
 methods: {
 ...
 handleSizeChange (val) {
 console.log(`每⻚ ${val} 条`)
 },
 handleCurrentChange (val) {
 console.log(`当前⻚: ${val}`)
 }
 },
 ...
 </script>
```

#### 分⻚逻辑实现

- 分⻚功能的接⼝存在请求 current（当前⻚数）与 size（每⻚条数）。
- 由于分⻚需要与筛选功能结合，所以将数据声明到 data.form 中
  - 更改 form 名称后，注意将模板中的数据名称同时修改（简单处理即可，后续还要设置功能）
  - 修改 current 时⻚⾯会渲染不同⻚的数据

```js
// list.vue
data () {
return {
...
form: {
...
// 当前⻚号，默认为 1
current: 1,
// 每⻚数据条数，例如为10，按需设置
 size: 10
 },
 ...
 }
 },
 methods: {
 async loadResources () {
 // 将参数传⼊请求
 const { data } = await getResourcePages({
 current: this.form.current,
 size: this.form.size
 })
 ...
 },
 }
```

分⻚组件的⻚⾯变化会触发 handleCurrentChange 事件，参数为当前⻚号，操作时请求当前⻚码的数据即可。

```js
// /src/views/resource/components/List.vue

 // ⻚码变化时触发
 handleCurrentChange (val) {
 // 将 val 同步给 current
 this.form.current = val
 // 请求更新数据
 this.loadResources()
 }
```

- 这时我们发现⻚码按钮个数为固定值，应进⾏设置，观察组件属性：
- current-page：当前组件显示⻚码。
  - this.form.current 会更新请求的数据⻚码为 1，⽽显示⻚码需要通过当前属性控制。
  - ⽂档中说明当前属性⽀持 [.sync 修饰符](https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6)。
    - 设置 :current-page.sync="form.current" ，之前事件中的 this.form.current= val 就⽆需设置了，视图操作导致属性的改变会⾃动同步到 form.current 中，反之亦然。（类似 v-model）
- total 为数据总条数
- page-size 为每⻚⼤⼩，应绑定为 form.size
- page-sizes 为左侧设置每⻚条数的下拉菜单，第⼀个值为初始值，不应⼤于总条数，否则只会出现⼀⻚，后续值⾃⾏按需设置。

组件会根据上⾯的属性⾃动计算总⻚数，现在只有 total 应该通过请求获取

```vue
// /src/views/resource/components/List.vue
<!-- 分⻚功能 -->
<el-pagination
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
  :current-page.sync="form.current"
  :page-sizes="[5, 10, 20]"
  :page-size="form.size"
  layout="total, sizes, prev, pager, next, jumper"
  :total="totalCount"
>
 </el-pagination>
``
```

- 当请求数据时，接⼝响应数据包含了 total 为总数据条数，保存到 data 中并在 created 中接收。
  - 数据中的 currentPage1/2/3/4 为⽂档提供的数据，上⼀步修改 current-page 后删除即可。

```js
// /src/views/resource/components/List.vue
data () {
return {
...
// 数据总条数
totalCount: 0
}
},
...
methods: {
 ...
 async loadResources () {
 ...
 if (data.code === '000000') {
 this.resources = data.data.records
 // 保存总条数
 this.totalCount = data.data.total
 }
 }
 ...
 },
```

- 设置后⻚码可以切换，但更新每⻚条数只更改⻚码，显示的数据并没有更新，这时通过组件的 sizechange 事件处理。
  - size-change 会在每⻚条数变化时触发，参数为新条数，赋值给 form.size
  - 重置⻚码为 1。
  - 更新数据。

```js
// /src/views/resource/components/List.vue
// 每⻚条数变化时触发
handleSizeChange (val) {
this.form.size = val
this.form.current = 1
this.loadResources()
},
```

### 筛选功能

<img src="/images/vue/053.gif" style="width: 100%; display:inline-block; margin: 0 ;">

- data 中声明数据，更新模板绑定数据，资源分类功能需要请求接⼝操作。
  - 声明的数据名称需要根据接⼝请求参数设置，最后将 form 整体发送给接⼝
  - 添加⼀个重置按钮

```js
form: {
// 资源名称
name: '',
// 资源路径
url: '',
// 资源分类
categoryId: ''
...
},
```

```vue
// src\views\resource\components\List.vue
<el-form :inline="true" :model="form" class="demo-form-inline">
<el-form-item label="资源名称">
<el-input v-model="form.name" placeholder="资源名称"></el-input>
</el-form-item>
<el-form-item label="资源路径">
<el-input v-model="form.url" placeholder="资源路径"></el-input>
</el-form-item>
<el-form-item label="资源分类">
<el-select v-model="form.categoryId" placeholder="资源分类">
 <!-- 假数据，需要请求 -->
 <el-option label="区域⼀" value="shanghai"></el-option>
 <el-option label="区域⼆" value="beijing"></el-option>
 </el-select>
 </el-form-item>
 <el-form-item>
 <el-button type="primary" @click="onSubmit">查询搜索</el-button>
 <el-button>重置</el-button>
 </el-form-item>
 </el-form>
```

查询资源分类列表：[接⼝地址](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/资源管理/getCategoriesUsingGET)。

```js
// 新建⽂件 services/resource-category.js
import request from '@/utils/request'
// 资源分类请求
export const getResourceCategory = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll',
  })
}
```

引⼊并请求数据

```js
// src\views\resource\components\List.vue
...
import { getResourceCategory } from '@/services/resource-category.js'
...
created () {
...
this.loadResourceCategory()
},
...
data () {
 return {
 // 资源分类列表
 resourceCategories: [],
 ...
 }
 },
 methods: {
 async loadResourceCategory () {
 const { data } = await getResourceCategory()
 if (data.code === '000000') {
 this.resourceCategories = data.data
 }
 },
 ...
```

遍历⽣成资源分类下拉菜单

```vue
// src\views\resource\components\List.vue
<el-form-item label="资源分类">
<el-select v-model="form.categoryId" placeholder="资源分类">
<el-option
:label="item.name"
:value="item.id"
v-for="item in resourceCategories"
:key="item.id"
></el-option>
</el-select>
 </el-form-item>
```

提交时请求数据，同时更改⻚数为 1。

```js
// src\views\resource\components\List.vue
onSubmit () {
// 筛选提交，请求数据 (将请求参数更改为整个 form)
this.form.current = 1
this.loadResources()
},
...
async loadResources () {
// 将参数传⼊请求
/* const { data } = await getResourcePages({
 current: this.form.current,
 size: this.form.size
 }) */
 const { data } = await getResourcePages(this.form)
 ...
 },
```

### 清除功能

<img src="/images/vue/054.gif" style="width: 100%; display:inline-block; margin: 0 ;">

- 除分为下拉菜单选项清除和统⼀清除（重置）。
- 个清除使⽤ Element 中 [Select 下拉框](https://element.eleme.cn/#/zh-CN/component/select)组件的 可清空单选功能。
  - 下拉框组件设置 clearable 属性即可。

给下拉框组件设置 clearable 属性即可。

```vue
// list.vue
<el-select
v-model="form.categoryId"
placeholder="资源分类"
clearable
>
```

- 表单重置操作需要清空表单。
  - 表单组件提供了 resetFields() ⽤于重置具有 prop 的表单项。
  - 表单需要设置 ref。
  - 需要给表单项添加 prop 才能使⽤，未设置 prop 的表单项不受重置影响。

```vue
// src\views\resource\components\List.vue
<el-form
:inline="true"
:model="form"
class="demo-form-inline"
ref="form"
>
<el-form-item label="资源名称" prop="name">
<el-input v-model="form.name" placeholder="资源名称"></el-input>
</el-form-item>
 <el-form-item label="资源路径" prop="url">
 <el-input v-model="form.url" placeholder="资源路径"></el-input>
 </el-form-item>
 <el-form-item label="资源分类" prop="categoryId">
 ...
 <el-button
 @click="onReset"
 >重置</el-button>
 ...
 onReset () {
 this.$refs.form.resetFields()
 },
```

### 数据加载细节处理

<img src="/images/vue/055.gif" style="width: 100%; display:inline-block; margin: 0 ;">

- ⽹速慢时，显示加载中提示，同时禁⽤所有操作。
- 这时使⽤ Element 中的 [Loading](https://element.eleme.cn/#/zh-CN/component/loading) 加载组件设置。
  - 通过指令 v-loading 控制，true 表示加载中，false 时隐藏提示。
  - 按钮与分⻚组件的禁⽤属性均为 disabled

```vue
// list.vue
...
<el-button
type="primary"
@click="onSubmit"
:disabled="isLoading"
>查询搜索</el-button>
...
<el-table
 :data="resources"
 style="width: 100%; margin-bottom: 20px;"
 v-loading="isLoading"
 >
 <el-button
 @click="onReset"
 :disabled="isLoading"
 >重置</el-button>
 ...
 <el-pagination
 ...
 :disbled="isLoading">
 </el-pagination>
 ...
 <script>

 data () {
 return {
 ...
 // 加载状态
 isLoading: true
 }
 },
 ...
 async loadResources () {
 // 开始加载数据
 this.isLoading = true
 ...
 // 请求完毕取消加载中状态
 this.isLoading = false
 },
 </script>
```

完成。

### 小思考

- 组件的核⼼为 form 数据，每当 form 内数据变化则需要进⾏数据请求，如分⻚与筛选。能否统⼀侦听
- form 变化并进⾏请求发送呢？
  - 侦听器如何设置？
  - 触发频繁问题如何解决？

## 角色管理与用户管理

### 角色管理分析与准备

- ⻆⾊管理属于权限管理的⼀部分，我们可以预设⼀些⻆⾊例如课程管理员，⼴告管理员，超级管理员，普通⽤户，然后在实际使⽤时分配给不同⽤户不同的⻆⾊，便于操作。（⽆需给某个⽤户进⾏详细的功能设置）
- 功能有：
  - 制作添加⻆⾊、编辑⻆⾊、分配菜单。
  - 布局、列表展示、删除功能⾃⾏练习完成。分配资源与分配菜单类似，作为练习。

#### 后端接口

<img src="/images/vue/342.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/343.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

#### 基础准备⼯作说明：

```
views/role
.
├── components
│ └── list.vue ⻆⾊列表组件
└── index.vue
```

- ⻆⾊⻚⾯初始代码。

```vue
// role/index.vue
<template>
  <div class="role">
    <role-list></role-list>
  </div>
</template>
<script>
// 引⼊⻆⾊列表组件
import RoleList from './components/list.vue'
export default {
  name: 'RoleIndex',
  components: {
    RoleList,
  },
}
</script>
<style lang="scss" scoped></style>
```

- ⻆⾊列表组件初始代码（实现展示与删除功能）

```vue
// role/components/List.vue
<!--  -->
<template>
  <div class="role-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form ref="form" :model="form">
          <el-form-item label="角色名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :v-loading="isLoading"
              >查询</el-button
            >
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-button>添加角色</el-button>
      <el-table :v-loading="isLoading" :data="roles" style="width: 100%">
        <el-table-column prop="id" label="编号" />
        <el-table-column prop="name" label="角色名称" />
        <el-table-column prop="description" label="描述" />
        <el-table-column prop="createdTime" label="添加时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createdTime | dataFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="150px" label="操作">
          <template slot-scope="scope">
            // 使用div可以进行换行处理
            <div>
              <el-button type="text">分配菜单</el-button>
              <el-button type="text">分配资源</el-button>
            </div>
            <div>
              <el-button type="text" @click="handleEdit(scope.row)"
                >编辑</el-button
              >
              <el-button type="text" @click="handleDelete(scope.row)"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getRoles, deleteRole } from '@/services/role'
export default {
  name: 'RoleList',
  components: {},
  data() {
    return {
      form: {
        name: '',
      },
      isLoading: false,
      roles: [],
    }
  },
  created() {
    this.loadRoles()
  },
  methods: {
    onReset() {},
    onSubmit() {},
    handleEdit(role) {},
    // 删除角色
    handleDelete(role) {
      this.$confirm(`确认删除角色：${role.name}?`, '删除提示')
        .then(async () => {
          await deleteRole(role.id)
          this.$message.success('删除成功')
          this.loadRoles()
        })
        .catch((err) => {
          if (err && err.response) {
            this.$message.error('删除失败，请重试')
          } else {
            this.$message.info('取消删除')
          }
        })
    },
    async loadRoles() {
      this.isLoading = true
      const { data } = await getRoles(this.form)
      console.log(data.data.records.createdTime)
      this.roles = data.data.records
      this.isLoading = false
    },
  },
  filters: {
    // 日期过滤器
    dataFormat(date) {
      // console.log(data)
      date = new Date(date)
      return `
      ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}
      ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
      `
    },
  },
}
</script>
<style lang="scss" scoped></style>
```

- 创建⽂件 services/role.js ⻆⾊接⼝操作模块。

```JS
import request from '@/utils/request'

// 获取角色
export const getRoles = data => {
  return request({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data
  })
}

// 删除角色
export const deleteRole = id => {
  return request({
    method: 'DELETE',
    url: `/boss/role/${id}`
  })
}

```

准备⼯作完成。

### 添加角色 - 布局

<img src="/images/vue/345.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

<img src="/images/vue/056.gif" style="width: 100%; display:inline-block; margin: 0 ;">

使⽤ Element 的 [Dialog 对话框](https://element.eleme.cn/#/zh-CN/component/dialog)组件。

```vue
// Element 官⽅示例：Dialog 对话框组件
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose"
>
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
  },
}
</script>
```

- 添加到⻚⾯中最后位置，不需要关闭处理，删除即可
  - 点击顶部添加按钮时，将 dialogVisible 设置为 true， 让对话框显示

```vue
// role/components/List.vue
<template>
  <div class="role-list">
    <el-card class="box-card">
      ...
      <!-- 点击添加按钮，显示对话框 -->
      <el-button @click="dialogVisible = true">添加⻆⾊</el-button>
      ...
    </el-card>
    <!-- 对话框组件：删除 :before-close="handleClose" -->
    <el-dialog title="添加⻆⾊" :visible.sync="dialogVisible" width="30%">
      <span>这是⼀段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
data() {
return {
...
dialogVisible: false
};
}
};
</script>
```

- 内部的表单不建议直接书写在 dialog 中，通过单独封装组件处理。

```vue
// role/components/create-or-edit.vue
<template>
  <div>
    <el-form>
      <el-form-item label="⻆⾊名称">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="⻆⾊编码">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="⻆⾊描述">
        <el-input type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button>取消</el-button>
        <el-button type="primary">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CreateOrEdit',
}
</script>

<style lang="scss" scoped></style>
```

- 引⼊到 list 组件中，并注册为⼦组件

```vue
// role/components/List.vue
<el-dialog title="添加⻆⾊" :visible.sync="dialogVisible" width="30%">
<!-- 将对话框内容更换为⾃定义组件 -->
<create-or-edit></create-or-edit>
</el-dialog>
...
<script>
...
import CreateOrEdit from './create-or-edit'

export default {
...
components: {
CreateOrEdit
},
...
}
</script>
```

### 提交角色 - 逻辑(子向父传值)

<img src="/images/vue/346.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- 结构准备完毕，设置请求，提交表单

```js
// services/role.js
...
// 添加或编辑⻆⾊
export const createOrUpdate = data => {
return request({
method: 'POST',
url: '/boss/role/saveOrUpdate',
data
})
 }
```

- 引⼊⽂件，根据接⼝要求声明绑定数据，绑定给元素，浏览器查看效果。

```vue
// create-or-edit.vue
<el-form>
<el-form-item label="⻆⾊名称">
<el-input v-model="role.name"></el-input>
</el-form-item>
<el-form-item label="⻆⾊编码">
<el-input v-model="role.code"></el-input>
</el-form-item>
<el-form-item label="⻆⾊描述">
 <el-input v-model="role.description" type="textarea"></el-input>
 </el-form-item>
 <el-form-item>
 <el-button>取消</el-button>
 <el-button type="primary">确认</el-button>
 </el-form-item>
 </el-form>

<script>
import { createOrEdit } from '@/services/role'

export default {
  name: 'CreateOrEdit',
  data() {
    return {
      // 根据接⼝要求绑定数据
      role: {
        code: '',
        name: '',
        description: '',
      },
    }
  },
}
</script>
```

- 点击确认，发送请求提交表单

```vue
// create-or-edit.vue
<el-button type="primary" @click="onSubmit">确认</el-button>
...
<script>
...
methods: {
async onSubmit () {
// 省略验证步骤
const { data } = await createOrEdit(this.role)
 if (data.code === '000000') {
 }
 }
 }
 ...
</script>
```

- 成功，这时应关闭对话框并刷新列表，但这些都是⽗组件 list 的功能，这时就需要⽗⼦组件通信（⼦传⽗）了。
  - 给⼦组件注册⾃定义事件
  - ⽗组件监听事件，如果触发，说明添加成功，进⾏对应处理。

```js
 // create-or-edit.vue
 ...
 async onSubmit () {
 const { data } = await createOrEdit(this.role)
 if (data.code === '000000') {
 // 提示
 this.$message.success('添加成功')
 // ⼦组件触发⾃定义事件
 this.$emit('success')
 // 清空内容
 this.role = {}
 }
 }
 ...
```

```vue
// list.vue
<create-or-edit @success="onSuccess"></create-or-edit>
...
<script>
...
// 添加成功的操作
onSuccess () {
 // 关闭对话框
 this.dialogVisible = false
 // 刷新列表数据
 this.loadRoles()
 },
 ...
</script>
```

- 添加功能完成，最后完善取消功能，点击取消，关闭对话框，同样需要⼦传⽗

```vue
// create-or-edit.vue
<el-button @click="onCancel">取消</el-button>
...
<script>
...
onCancel () {
this.$emit('cancel')
 this.role = {}
 }
 ...
</script>
```

```vue
// list.vue
<create-or-edit ... @cancel="dialogVisible = false">
  </create-or-edit>
```

### 编辑角色-逻辑(父向子传值)

- 编辑功能与添加功能相似，采⽤同⼀组件，操作时通过 isEdit 传递状态

```vue
// list.vue
<script>
...
data () {
return {
...
// 添加或编辑
isEdit: false,
...
 }
 },
 ...
</script>
...
<el-dialog :title="isEdit ? '编辑⻆⾊' : '添加⻆⾊'" ...>
 <!-- 将对话框内容更换为⾃定义组件 -->
 <create-or-edit
 :is-edit="isEdit"
 ...
 ></create-or-edit>
 </el-dialog>
```

- ⼦组件接收状态

```js
// create-or-edit.vue
props: {
isEdit: {
type: Boolean,
default: false
}
},
```

- 点击添加时，设置 isEdit 为 false

```vue
1 // list.vue 2 <el-button @click="handleAdd">添加⻆⾊</el-button> 3 ... 4
<script>
5 ...
6 handleAdd () {
7 this.dialogVisible = true
8 this.isEdit = false
9 },
10 ...
11
</script>
```

点击编辑按钮，设置 isEdit 为 true，同时弹出对话框。(事件在初始化布局时设置过了，参数为当前⻆⾊信息)

```js
// list.vue
...
handleEdit (role) {
// 显示对话框
this.dialogVisible = true
// 设置编辑状态
this.isEdit = true
},
```

- 点击编辑时将数据绑定给表单，需要⽗传⼦将编辑的⻆⾊ id 传⼊。
  - 传⼊ id 由⼦组件重新查询，可以确保数据为最新，也可以避免原数据不全的情况

```vue
// list.vue
<script>
...
data () {
...
// 正在编辑的⻆⾊ID
roleId: null
}
},
 handleEdit (role) {
 this.dialogVisible = true
 this.isEdit = true
 // 将要编辑的⻆⾊ ID 传递给表单展示
 this.roleId = role.id
 },
 ...
</script>
...
<create-or-edit
  :is-edit="isEdit"
  :role-id="roleId"
  @success="onSuccess"
  @cancel="dialogVisible = false"
></create-or-edit>
```

- ⼦组件接收，并在 created 时进⾏展示

```js
// create-or-list.vue
props: {
...
roleId: {
type: Object
}
},
created () {
if (this.isEdit) {
 console.log(roleId)
 }
 },
```

- 由于当前组件只是显示隐藏，组件没有销毁与创建，所以通过 v-if 来控制对话框即可

```vue
// list.vue <create-or-edit v-if="dialogVisible" ...></create-or-edit>
```

- 封装请求⻆⾊功能

```js
// services/role.js
...
// 获取⻆⾊
export const getRoleById = id => {
return request({
method: 'GET',
url: `/boss/role/${id}`,
})
}
```

- 引⼊并请求⻆⾊数据

```js
// create-or-edit.vue
created () {
if (this.isEdit) {
// 加载⽤户数据
this.loadRole()
}
},
...
async loadRole () {
 const { data } = await getRoleById(this.roleId)
 if (data.code === '000000') {
 // 将⻆⾊数据更新给 role 即可
 this.role = data.data
 }
 },
```

- 最后为提交功能，观察接⼝发现新增与编辑的区别为 id 参数，但 role 中已经⾃动包含，所以功能完成⽆需修改。

### 分配菜单-路由处理(动态路由传参)

分配菜单⽤于设置⻆⾊可以访问哪些菜单功能

<img src="/images/vue/057.gif" style="width: 100%; display:inline-block; margin: 0 ;">

- 创建⽂件

```vue
// role/alloc-menu.vue
<template>
  <div class="alloc-menu"></div>
</template>
<script>
export default {
  name: 'AllocMenu',
}
</script>
<style lang="scss" scoped></style>
```

- 添加路由，设置动态路由参数

```js
// router/index.js
...
{
path: '/role/:roleId/alloc-menu',
name: 'alloc-menu',
component: () => import(/* webpackChunkName: 'alloc-menu' */'@/views/role/alloc-menu')
}
]
...
```

- 点击分配菜单按钮，进⾏导航跳转。
  - 跳转后，可以通过 \$route 来获取到要分配菜单的⽤户 id。

```vue
// list.vue
<!-- scope.row 为作⽤域插槽提供的当前⾏数据 -->
<el-button
  type="text"
  @click="
    $router.push({
      name: 'alloc-menu',
      params: {
        roleId: scope.row.id,
      },
    })
  ">分配菜单</el-button>
```

- 使⽤这种⽅式⾮常简单，但会让组件与路由耦合（组件⽆法独⽴于路由使⽤）。
  - 如果希望组件与路由解耦，可以将动态路由参数替换为 props（详⻅ Vue Router 阶段 -> 路径传参处理 ）。

```js
 // router/index.js
 // - 设置 props: true，让路径参数通过 props ⽅式传递给组件
 {
 path: '/role/:roleId/alloc-menu',
 name: 'alloc-menu',
 component: () => import(/* webpackChunkName: 'alloc-menu' */'@/views/role/alloc-menu'),
 props: true
 },
```

```vue
// alloc-menu.vue
<!--  -->
<template>
  <div class="alloc-menu">
    <!-- 这是角色ID为：{{$route.params.roleId }} -->
    这是角色ID为：{{ roleId }}
  </div>
</template>

<script>
export default {
  name: 'AllocMenu',
  props: {
    roleId: {
      type: [Number, String],
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

### 分配菜单-菜单列表布局

这⾥使⽤ Element 的 [Tree 树形控件](https://element.eleme.cn/#/zh-CN/component/tree)组件。

```vue
<el-tree
  :data="data"
  :props="defaultProps"
  @node-click="handleNodeClick"
></el-tree>

<script>
export default {
  data() {
    return {
      data: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1',
                },
              ],
            },
          ],
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1',
                },
              ],
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1',
                },
              ],
            },
          ],
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1',
                },
              ],
            },
            {
              label: '二级 3-2',
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
  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
  },
}
</script>
```

- 引⼊到⻚⾯中，去除事件。
  - 设置⼀个 Card 作为容器。
  - 设置默认全部展开，使⽤ `<el-tree>` 组件的 default-expand-all 属性。
  - 设置复选框展示，使⽤`<el-tree>` 组件的 show-checkbox 属性。
  - data 代表树形图的数据，更改为 menus 避免混淆。
  - props 代表读取数据时，属性对应的功能，因为请求接⼝时，不是所有接⼝都⽤ label 表示标题，这时就可以设置 props 了 。

```vue
// src\views\role\alloc-menu.vue
<template>
  <div class="alloc-menu">
    <el-card>
      <el-tree
        :data="menus"
        :props="defaultProps"
        show-checkbox
        default-expand-all
      ></el-tree>
    </el-card>
  </div>
</template>

<script>
 export default {
 ...
 data () {
 return {
 menus: [ ... ],
 defaultProps: {
children: 'children',
label: 'label'
}
}
}
}
</script>
```

下⾯请求所有菜单数据，[接⼝地址](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/菜单管理/getMenuNodeListUsingGET)。

<img src="/images/vue/347.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```js
// services/menu.js
...
// 获取所有菜单并按层级展示（注意，这是菜单功能，保存到 menu.js 中）
export const getMenuNodeList = () => {
return request({
method: 'GET',
url: '/boss/menu/getMenuNodeList'
})
}
```

- 引⼊并请求数据

```js
 // alloc-menu.vue
 ...
 import { getMenuNodeList } from '@/services/menu'
 ...
 created () {
 // 加载所有菜单
 this.loadMenus()
 },
 methods: {
async loadMenus () {
// 请求所有菜单数据
const { data } = await getMenuNodeList()
if (data.code === '000000') {
console.log(data)
}
 }
 }
```

- 由于对应标题和层级的属性与默认名称不同，需要进⾏设置，同时 menus 中的默认数据也可以删除了。

```js
// alloc-menu.vue
...
data () {
return {
menus: [],
defaultProps: {
children: 'subMenuList',
label: 'name'
}
 }
 },
 methods: {
 async loadMenus () {
 const { data } = await getMenuNodeList()
 if (data.code === '000000') {
 // 绑定数据
 this.menus = data.data
 }
 }
 }
```

### 分配菜单-保存

- 设置按钮结构，并设置简单样式美化。

```vue
// alloc-menu.vue
<el-card>
<el-tree
...
></el-tree>
<div style="margin: 20px;">
<el-button>清空</el-button>
<el-button type="primary">保存</el-button>
</div>
</el-card>
```

- 观察接⼝，需要⽤户 id 与菜单列表。（参数太复杂，不便于 Postman 测试演示）

<img src="/images/vue/348.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```js
// services/menu.js
...
// 给⻆⾊分配菜单
export const allocateRoleMenus = data => {
return request({
method: 'POST',
url: '/boss/menu/allocateRoleMenus',
data
})
 }
```

- 引⼊并在调⽤保存按钮时调⽤
  - 请求参数需要分配的菜单列表（由勾选选项组成的），可以通过 Tree 组件 [getCheckedKeys](https://element.eleme.cn/#/zh-CN/component/tree#fang-fa) 获取。
  - ⾸先给 Tree 设置 ref，才能找到指定的 Tree 组件。
  - 如要通过 getCheckedKeys 获取，则须给 Tree 设置 node-key 来设置通过哪个属性作为每个选项的唯⼀标识。

```vue
// alloc-menu.vue
...
<el-tree
ref="menu-tree"
node-key="id"
...
></el-tree>
...
<el-button type="primary" @click="onSave">保存</el-button>
 ...
 <script>
 import { getMenuNodeList, allocateRoleMenus } from '@/services/menu'
 ...
 async onSave () {
 // 传⼊通过路径参数接收的⻆⾊ID
 const { data } = await allocateRoleMenus({
 roleId: this.roleId,
 menuIdList: this.$refs['menu-tree'].getCheckedKeys()
 })
 if (data.code === '000000') {
 // 提示
 this.$message.success('分配菜单成功')
 // 返回⻆⾊列表⻚即可
 this.$router.push('/role')
 }
 }
```

<img src="/images/vue/349.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 分配菜单-菜单展示改进

Tree 组件具有 default-checked-keys 属性，值为数组，当 node-key 为 id 时，数组内存放的 id 对
应的选项会被选择。
这时通过接⼝来请求当前⻆⾊拥有的菜单列表，[接⼝地址](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/菜单管理/getRoleMenusUsingGET)。
<img src="/images/vue/350.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```js
// services/menu.js
...
// 获取⻆⾊拥有的菜单列表
export const getRoleMenus = roleId => {
return request({
method: 'GET',
// 下⾯两种⽅式均可
// url: `/boss/menu/getRoleMenus?roleId=${roleId}`,
url: '/boss/menu/getRoleMenus',
 params: { // axios 会把 params 转换为 urlencoded 并以 ? 连接到 url 后
 roleId
 }
 })
 }
```

引⼊并调⽤

```vue
// alloc-menu.vue import { getMenuNodeList, allocateRoleMenus, getRoleMenus }
from'@/services/menu' ... created () { ... // 加载⻆⾊拥有的菜单列表
this.loadRoleMenus() }, ... async loadRoleMenus () { // 请求⻆⾊拥有的菜单列表
const { data } = await getRoleMenus(this.roleId) if (data.code === '000000') {
console.log(data) } },
```

- 观察响应数据可以发现，每⼀个菜单项都具有 selected 属性，以此判断是否选中，我们拿到这些数据的 id，并设置给 default-checked-keys 即可。

```vue
// alloc-menu.vue
<el-tree
  ref="menu-tree"
  node-key="id"
  :data="menus"
  :props="defaultProps"
  show-checkbox
  :default-expand-all="true"
  :default-checked-keys="checkedKeys"
></el-tree>
...
<script>
...
data () {
return {
...
// 存储选择的数据 id
checkedKeys: []
}
},

...
async loadRoleMenus () {
// 请求⻆⾊拥有的菜单列表
const { data } = await getRoleMenus(this.roleId)
if (data.code === '000000') {
// 获取选中的数据
this.getCheckedKeys()
}
},
// 数据筛选功能
getCheckedKeys (menus) {
menus.forEach(menu => {
// 检测是否存在⼦数据，如果有，递归查找
// - 同时说明当前节点为‘⽗节点’，不能存⼊，否则勾选会导致⼦选项全选，设置 return
if (menu.subMenuList) {
return this.getCheckedKeys(menu.subMenuList)
}
// 存储选中数据的 id
if (menu.selected) {
// this.checkedKeys.push(menu.id)
this.checkedKeys = [...this.checkedKeys, menu.id]
}
})
}
...
</script>
```

### 分配菜单-清空

Element - Tree - 树节点的选择示例中演示了如何进⾏清空。
通过 this.\$refs.tree.setCheckedKeys([]) 即可清空。

[tree 组件的 setCheckedKeys()方法](https://element.eleme.cn/#/zh-CN/component/tree#fang-fa)

```vue
// alloc-menu.vue
<el-button @click="resetChecked">清空</el-button>
... // 设置清空⽅法 resetChecked () { this.$refs['menu-tree'].setCheckedKeys([])
}
```

### 用户管理分析与准备

主要功能为分配⻆⾊。其余功能作为作业。

```vue
// user/index.vue
<template>
  <div class="user">
    <user-list></user-list>
  </div>
</template>
<script>
import UserList from './components/list.vue'

export default {
  name: 'UserIndex',
  components: {
    UserList,
  },
}
</script>

<style lang="scss" scoped></style>
```

```vue
// user/components/list.vue
<template>
  <el-card>
    <div slot="header">
      <el-form :inline="true" :model="filterParams" ref="filter-form">
        <el-form-item label="⼿机号" prop="phone">
          <el-input v-model="filterParams.phone"></el-input>
        </el-form-item>
        <el-form-item label="注册时间" prop="rangeDate">
          <el-date-picker
            v-model="filterParams.rangeDate"
            type="datetimerange"
            range-separator="⾄"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item>
          <el-button :disabled="isLoading" @click="handleReset">重置</el-button>
          <el-button type="primary" @click="handleQuery" :disabled="isLoading"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="users" style="width: 100%" v-loading="isLoading">
      <el-table-column prop="id" label="⽤户ID" width="150"> </el-table-column>
      <el-table-column prop="name" label="头像" width="100">
        <template slot-scope="scope">
          <img
            width="30px"
            :src="
              scope.row.portrait ||
                'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
            "
          />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="⽤户名"> </el-table-column>
      <el-table-column prop="phone" label="⼿机号"> </el-table-column>
      <el-table-column prop="createTime" label="注册时间">
        <!-- ⽤户状态操作（服务端没有开放权限，只能演示） -->
      </el-table-column>
      <el-table-column prop="name" label="状态" width="80">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="ENABLE"
            inactive-value="DISABLE"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handleForbidUser(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleSelectRole(scope.row)"
            >分配⻆⾊</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { getUserPages, forbidUser } from '@/services/user'

export default {
  name: 'UserList',
  data() {
    return {
      users: [],
      filterParams: {
        currentPage: 1,
        pageSize: 100,
        phone: '',
        startCreateTime: '',
        endCreateTime: '',
        rangeDate: [],
      },
      isLoading: true,
    }
  },
  created() {
    this.loadUsers()
  },

  methods: {
    // 加载⽤户
    async loadUsers() {
      this.isLoading = true
      const { rangeDate } = this.filterParams
      if (rangeDate && rangeDate.length) {
        this.filterParams.startCreateTime = rangeDate[0]
        this.filterParams.endCreateTime = rangeDate[1]
      } else {
        this.filterParams.startCreateTime = ''
        this.filterParams.endCreateTime = ''
      }
      const { data } = await getUserPages(this.filterParams)
      this.users = data.data.records
      this.isLoading = false
    },
    async handleForbidUser(user) {
      const { data } = await forbidUser(user.id)
      console.log(data)
    },
    handleQuery() {
      this.filterParams.currentPage = 1
      this.loadUsers()
    },
    handleReset() {
      this.$refs['filter-form'].resetFields()
      this.loadUsers()
    },
    // 点击⽤户的分配⻆⾊按钮
    handleSelectRole() {},
  },
}
</script>

<style lang="scss" scoped></style>
```

```js
// services/user.js
// 分⻚查询⽤户信息 - ⽤户管理
export const getUserPages = (data) => {
  return request({
    method: 'POST',
    url: '/boss/user/getUserPages',
    data,
  })
}

// 封禁⽤户（服务端关闭了权限，⽆法进⾏实际操作，如报错忽略即可）
export const forbidUser = (userId) => {
  return request({
    method: 'POST',
    url: '/boss/user/forbidUser',
    params: {
      userId,
    },
  })
}
```

### 分配角色布局

- 使⽤ Element 的[ Dialog 对话框组件](https://element.eleme.cn/#/zh-CN/component/dialog#ji-ben-yong-fa)

```vue
// Element 官⽅示例
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose"
>
<span>这是⼀段信息</span>
<span slot="footer" class="dialog-footer">
<el-button @click="dialogVisible = false">取 消</el-button>
 <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
 </span>
 </el-dialog>
```

- 放⼊⻚⾯最后位置，修改 title，width，去除关闭处理函数，声明 dialogVisible

```vue
// user/components/list.vue
<template>
  <el-card>
    ...
    <!-- 分配⻆⾊的 Dialog -->
    <el-dialog title="分配⻆⾊" :visible.sync="dialogVisible" width="50%">
      <span>这是⼀段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
...
data () {
return {
...
dialogVisible: false
}
},
...
</script>
```

- 点击分配⻆⾊按钮时显示对话框

```vue
<el-button type="text" @click="handleSelectRole(scope.row)">分配⻆⾊</el-button>
...
<script></script>
```

- 设置多选下拉菜单，通过 Element 的 Select 选择器的 -> 基础多选功能设置

````vue
// Element 官⽅示例
<el-select v-model="value1" multiple placeholder="请选择">
 <el-option
 v-for="item in options"
 :key="item.value"
 :label="item.label"
 :value="item.value">
 </el-option>
 </el-select>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '⻩⾦糕',
        },
        {
          value: '选项2',
          label: '双⽪奶',
        },
        {
          value: '选项3',
          label: '蚵仔煎',
        },
        {
          value: '选项4',
          label: '⻰须⾯',
        },
        {
          value: '选项5',
          label: '北京烤鸭',
        },
      ],
      value1: [],
    }
  },
}
</script>


```vue
// list.vue
    <!-- 设置分配角色的Dialog组件 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
      <!-- 下拉菜单组件位置 -->
      <el-select v-model="value1" multiple placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
<script>
 data () {
 return {
 ...
 // 列表数据
 options: [{
 value: '选项1',
 label: '⻩⾦糕'
 }, {
 value: '选项2',
 label: '双⽪奶'
 }, {
 value: '选项3',
 label: '蚵仔煎'
 }, {
 value: '选项4',
 label: '⻰须⾯'
 }, {
 value: '选项5',
 label: '北京烤鸭'
 }],
// 选中的数据
value1: []
}
<script>
````

### 展示角色列表

<img src="/images/vue/059.gif" style="width: 100%; display:inline-block; margin: 0 ;">

<img src="/images/vue/352.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

封装获取所有⻆⾊接⼝：[地址](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/角色管理/getAllUsingGET_2)。

```js
// \src\services\role.js
// 获取所有角色 - 用户管理
export const getAllRoles = () => {
  return request({
    method: 'GET',
    url: '/boss/role/all',
  })
}
```

- 引⼊并使⽤：
  - 引⼊
  - 声明数据
  - 绑定给下拉框
  - 点击分配⻆⾊时发送请求
  - 请求成功设置数据

```vue
// src/views/user/components/List.vue

<el-select v-model="roleIdList" multiple placeholder="请选择">
<el-option
v-for="item in roles"
:key="item.value"
:label="item.name"
:value="item.id">
</el-option>
</el-select>
...
<script>
import { getAllRoles } from '@/services/role'
...
data () {
return {
...
// 所有⻆⾊，对象示例的 option
roles: [],
// 选中⻆⾊，对应示例的 value1
 roleIdList: []
 }
 },
 ...
// 点击⽤户的分配⻆⾊按钮
async handleSelectRole () {
// 显示对话框
this.dialogVisible = true
// 点击后加载⻆⾊列表
const { data } = await getAllRoles()
this.roles = data.data
}
</script>
```

### 提交分配

<img src="/images/vue/060.gif" style="width: 100%; display:inline-block; margin: 0 ;">

```vue
// src\views\user\components\List.vue
<el-button type="primary" @click="handleAllocRole">确 定</el-button>
... // 提交分配⻆⾊操作（等提交完毕再隐藏对话框） async handleAllocRole () { }
```

观察接⼝给⽤户分配⻆⾊，[地址](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/角色管理/allocateUserRolesUsingPOST)

<img src="/images/vue/353.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- 需要⽤户 ID 与 分配的⻆⾊ ID 组成的数组。

```js
// services/role.js
...
// 给⽤户分配⻆⾊ - ⽤户挂你
export const allocateUserRoles = data => {
return request({
method: 'POST',
url: '/boss/role/allocateUserRoles',
data
})
 }
```

- 引⼊并使⽤


```js
// src\views\user\components\List.vue
import { getAllRoles, allocateUserRoles } from '@/services/role'
...
// 提交分配⻆⾊操作
async handleAllocRole () {
// 提交
allocateUserRoles({
})
}
```

- 请求⽤户 ID 可以在显示对话框时接收到组件传值，保存即可

```js
// src\views\user\components\List.vue

// 当前分配⻆⾊的ID（声明在 data 中）
currentRoleID: null
...
// 点击⽤户的分配⻆⾊按钮
async handleSelectRole (userData) {
// 将当前操作的⽤户ID保存，以便提交使⽤
this.currentRoleID = userData.id
...
},
```

- 传参发送

```js
// src\views\user\components\List.vue

// 提交分配⻆⾊操作
async handleAllocRole () {
// 提交
// - ⽤户 ID 可以在显示对话框时接收到组件传值，保存即可
const { data } = await allocateUserRoles({
userId: this.currentRoleID,
roleIdList: this.roleIdList
})
if (data.code === '000000') {
 // 提示
 this.$message.success('分配⻆⾊成功')
 // 关闭对话框
 this.dialogVisible = false
 }
 }
```

### 默认选中已分配角色
这⾥使⽤查询⽤户⻆⾊接⼝：[地址](http://eduboss.lagou.com/boss/doc.html#/edu-boss-boot/角色管理/getUserRolesUsingGET)。

<img src="/images/vue/354.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

roleIdList 中保存的为已经选中的选项，可以请求⽤户已经分配的⻆⾊，并修改 roleIdList 即可。

```js
// services/role.js
...
// 查询⽤户⻆⾊
export const getUserRoles = userId => {
return request({
method: 'GET',
url: `/boss/role/user/${userId}`
})
}
```

- 引⼊
```js
// src\views\user\components\List.vue

import { getAllRoles, allocateUserRoles, getUserRoles } from '@/services/role'
```
- 在点击 分配⻆⾊ 按钮时，根据当前⽤户 id 查询⻆⾊并更新 roleIdList 即可

```js
// src\views\user\components\List.vue

// 点击⽤户的分配⻆⾊按钮
async handleSelectRole (userData) {
...
// 根据⽤户id请求⻆⾊信息（data 被之前的请求使⽤过了，换个名字）
const { data2 } = await getUserRoles(userData.id)
// 遍历得到的⻆⾊列表，将id组成数据替换给 roleIdList 即可
this.roleIdList = data2.data.map(item => item.id)
},
```
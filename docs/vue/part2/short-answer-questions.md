# 简答题

## 1. 父传子有哪些方式
```
通过子组件的 props 选项接收父组件的传值
```

## 2. 子传父有哪些方式
```
子组件数据变化时，通过 `$emit()` 触发自定义事件
```

## 3. 如何让 CSS 只在当前组件中起作用
```
在组件中的style前面加上scoped
```

## 4. keep-alive 的作用是什么
```
主要用于保留组件状态或避免组件重新渲染
```

## 5. vue中如何获取DOM
```
给普通 HTML 标签设置 ref 属性，$refs 可以获取 DOM 对象
```

## 6. 请说出 Vue CLI 项目中src目录每个文件夹的文件的用法
```
assets：静态资源目录
components：项目组件目录
App.vue：根组件
main.js：入口文件
```

## 7. 单页面应用的优缺点
```
* 优点：
  * 前后端分离开发，提高了开发效率
  * 业务场景切换时，局部更新结构
  * 用户体验好，更加接近本地应用
* 缺点
  * 不利于 SEO
  * 初次首屏加载速度较慢
  * 页面复杂度比较高
```

## 8. $router和$route的区别
```
* $router：进行路由相关操作的对象
  * 内部存储一些路由功能使用的方法
* $route：存储路由规则
```

## 9.  怎么定义 vue-router 的动态路由? 怎么获取传过来的值？
```
在router目录下的index.js文件中，对path属性加上/:id。 使用router对象的params.id
```

## 10. vue-router有几种模式，分别是什么
```
* 两种
    * hash模式：即地址栏 URL 中的 # 符号；
    * history模式：window.history对象打印出来可以看到里边提供的方法和记录长度。利用了 HTML5 History Interface 中新增的 pushState() 和 replaceState() 方法。（需要特定浏览器支持）
```
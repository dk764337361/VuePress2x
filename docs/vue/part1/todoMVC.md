# 简介与需求分析

TodoMVC 是一个经典项目，让开发者快速实践到框架开发方式。

[todomvc官网地址](http://todomvc.com/)

[todomvc的Vue简介](https://todomvc.com/examples/vue/)

## 准备工作

- 从 github 克隆项目模板。

```sh
git clone https://github.com/tastejs/todomvc-app-template.git
```

- 进入项目目录，安装项目依赖
- cd 项目目录

```sh
cnpm install
```

- 安装 Vue.js

```sh
cnpm install vue@2.6.12
```

## 需求分析

- 事项列表展示
  - 有事项的情况
  - 没有事项的情况
- 状态栏展示
  - 个数展示
  - 单位处理

- 事项状态切换
  - 单个事项切换
  - 多个事项切换
- 事项新增
  - 内容检测
  - 回车新增
- 事项删除
  - 单个事项删除
  - 已完成事项删除
- 事项编辑
  - 触发编辑
  - 取消编辑
  - 保存编辑

- 事项筛选
  - 点击切换显示类别
  - 更新渲染所有事项
- 事项数据持久化
  - 读取本地存储
  - 更新本地存储

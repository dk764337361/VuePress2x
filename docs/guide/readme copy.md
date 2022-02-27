---
title: 使用 VuePress 搭建个人博客
# sidebar: auto
# sidebarDepth: 2
---

# 使用 VuePress 搭建个人博客

<NpmBadge package="vuepress" />

- [Vuepress官方仓库：](https://github.com/vuepress/vuepress-next)
- [Vuepress版本变更日志：](https://github.com/vuepress/vuepress-next/blob/main/CHANGELOG.md)

本博客使用的技术栈：`Vuepress`<Badge type="tip" text="v2.0.0-beta.24" vertical="top" /> + 在Netlify部署上线。

本文部分写作参考+引用[zhangyunchencc](https://github.com/zhangyunchencc)，感谢！

再次感谢[Evan You](https://github.com/yyx990803)，创造出那么好的用Vuepress :laughing:


<!-- [[toc]] -->

::: tip 提示
如果不喜demo构建过程，可以跳过第一至四节，下载我写好的项目[工具包](https://github.com/dk764337361/VuePress2x.git): 
```bash
git clone https://github.com/dk764337361/VuePress2x.git
```
然后从第五节开始看。
:::

## 1.为什么你需要一个博客？
优秀的程序员都在写博客，写博客有很多好处：
- 帮助自己梳理、总结、理解知识点（个人提升）
- 帮助别人理解知识点（好人一生平安）
- 简历更好看，更多面试机会（升职加薪）

### 我为什么使用Vuepress来构建博客：
- 不用怕某道云笔记，某象笔记、CS？N 之类的网站挂掉【无惧世事变改，还是越难越爱——吴若希】
- 可以使用 Markdown 写文章，不用考虑文章排版的问题。
- 网站易于维护，不用担心数据库损坏或者被攻击等问题。整个网站就只有自己写的那一堆 markdown 文件和一些文章的配图。
- 部署的服务器:accept:白嫖很香

## 2.什么是 VuePress，为什么要使用 VuePress ？
**VuePress** 是尤雨溪（vue.js 框架作者）4月12日发布的一个全新的基于 vue 的静态网站生成器，实际上就是一个 vue 的 spa 应用，内置 webpack，可以用来写文档。详见 [VuePress中文网](https://v2.vuepress.vuejs.org/zh/)

其实类似的建站工具有很多，比如 WordPress、Jekyll、Hexo 等，其中 WordPress 需要自己购买虚拟主机，不考虑；Jekyll 是 Github-Page 默认支持的，听说操作比较复杂，没有用过不做过多评价了；Hexo 之前一直在用，但一直觉得主题不好看，风格不够简洁优雅。自从遇见 VuePress，嗯，就是它了~ 

VuePress 有很多优点：
- 界面简洁优雅（个人感觉比 HEXO 好看）
- 容易上手（半小时能搭好整个项目）
- 更好的兼容、扩展 Markdown 语法
- 响应式布局，PC端、手机端
- Google Analytics 集成
- 支持 PWA
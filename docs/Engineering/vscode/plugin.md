# 精选插件

## vscode 生成项目目录树

如何生成项目目录呢？

```
lagou-shop-mobil
├─ .eslintrc.js
├─ directoryList.md
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ favicon.ico
├─ README.md
├─ src
│  ├─ App.vue
│  ├─ assets
│  │  └─ logo.png
│  ├─ components
│  │  └─ HelloWorld.vue
│  └─ main.js
└─ vite.config.js

```

### project-tree

1. 在项目目录里创建`.gitignore`文件，并配置

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

out.txt
.history
.git
.vscode
node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

```

2. vscode 在安装插件`project-tree`
3. 安装完毕，按 ctrl+shift+p，并输入 Project Tree 回车
4. 点击要生成目录的项目，回车
5. 将项目目录生成并存储到 README.md 中

### tree-generator(推荐)

[此段转载自](https://blog.csdn.net/qq_35021522/article/details/120365799)
此插件可以生成项目内某一个目录的目录树插件，具体操作方法为：鼠标右键点击某一个文件夹，在弹出的右键菜单中选择生成目录树，然后将生成在粘贴板中的目录树结构复制在想要保存的文件中即可。

### npm 插件 tree-cli

- [官方文档](https://www.npmjs.com/package/tree-cli)
- [大神笔记](https://cloud.tencent.com/developer/article/1729414)

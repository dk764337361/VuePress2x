# 开始搭建

## 创建项目文件夹
可以右键手动新建，也可以使用 mkdir 命令新建：
```bash
mkdir vuepress-starter
cd vuepress-starter
```
::: tip
使用  [yarn包管理器](https://yarnpkg.com/getting-started/usage)时，你需要添加 .yarnrc.yml 文件并设置 nodeLinker: 'node-modules'

:::


## 初始化项目
<CodeGroup>
  <CodeGroupItem title="yarn" active>

```bash:no-line-numbers
git init   //在目录中创建新的 Git 仓库
yarn init  //使用yarn包管理器初始化package.json
```
  </CodeGroupItem>

  <CodeGroupItem title="npm">

```bash
git init  //在目录中创建新的 Git 仓库
npm init  //使用npm包管理器初始化package.json
```
  </CodeGroupItem>
</CodeGroup>

## 安装VuePress

<CodeGroup>
  <CodeGroupItem title="yarn" active>

```bash
yarn add -D vuepress@next
```
  </CodeGroupItem>
  
  <CodeGroupItem title="npm" >

```bash
npm install -D vuepress@next
```
  </CodeGroupItem>
</CodeGroup>

## 配置package.json

- 在package.json 中添加一些 scripts
```json
{
  "scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs"
  }
}
```

## 配置`.gitignore `

- 将默认的临时目录和缓存目录添加到 `.gitignore `文件中

```bash
.temp
.history
/docs/.vuepress/.cache
/docs/.vuepress/dist
node_modules
```

## 创建你的第一篇文档
```bash
mkdir docs
echo '# Hello VuePress' > docs/README.md
```


## 文件夹目录示例
在 vuepressBlogDemo 文件夹中创建 docs 文件夹，在 docs 中创建 .vuepress 文件夹，在.vuepress中创建 public 文件夹和 config.js 文件，最终项目结构如下所示：
```
    vuepressBlogDemo
    ├─── docs
    │   ├── README.md
    │   └── .vuepress
    │       ├── public
    │       └── config.js
    ├──  .gitignore
    ├──  .yarnrc.yml(使用npm的同学不用创建该文件)
    └── package.json
```
## 配置config.js 

- 在config.js 文件中配置网站标题、描述、主题等信息

```js

module.exports = {
  title: 'Chen\'s blog',
  description: '我的个人网站',
  head: [
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    // ...其他标签
  ]
  base: '/', // 这是部署到github相关的配置
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  themeConfig: {
    logo: './images/logo.jpg',
    nav:[ // 导航栏配置
      {text: '前端基础', link: '/aaaaaa/' },
      {text: '算法题库', link: '/bbbbbb/'},
      {text: '微博', link: 'https://baidu.com'}      
    ],
    sidebar: 'auto', // 侧边栏配置
    sidebarDepth: 2, // 侧边栏显示2级
  }
};

```
## 启动本地服务器
<CodeGroup>
  <CodeGroupItem title="yarn" active>

```bash
yarn dev
```
  </CodeGroupItem>
  
  <CodeGroupItem title="npm">

```bash
yarn dev
```
  </CodeGroupItem>
</CodeGroup>
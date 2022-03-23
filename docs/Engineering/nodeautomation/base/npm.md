# NPM

## Node.js 软件包

每一个基于 Node.js 平台开发的应用程序都是 Node.js 软件包。
所有 Node.js 软件包都被托管在 www.npmjs.com 中。

## 什么是 NPM

Node Package Manager，Node.js 环境中的软件包管理器。随 Node.js 一起被安装。

它可以将 Node 软件包添加到我们的应用程序中并对其进行管理，比如下载，删除，更新，查看版本等
等。
它没有用户界面，需要在命令行工具中通过命令的方式使用，对应的命令就是 npm。

NPM 和 Node 是两个独立的应用程序，只是被捆绑安装了，可以通过版本号证明。

## package.json

Node.js 规定在每一个软件包中都必须包含一个叫做 package.json 的文件。

它是应用程序的描述文件，包含和应用程序相关的信息，比如应用名称，应用版本，应用作者等等。

通过 package.json 文件可以方便管理应用和发布应用。

- 创建 package.json 文件: npm init
- 快速创建 package.json 文件: npm init --yes

```sh
{
"name": "project-name",
"version": "1.0.0",
"description": "",
"main": "index.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1"
},
"keywords": [],
"author": "",
"license": "ISC"
}
```

## 下载 Node.js 软件包

在应用程序的根目录执行命令： npm install `<pkg>` 或者 npm i`<pkg>`
npm install lodash
软件包下载完成后会发生三件事：

1. 软件包会被存储在 `node_modules` 文件夹中，如果在应用中不存在此文件夹，npm 会自动创建。
2. 软件包会被记录在 `package.json` 文件中. 包含软件包的名字以及版本号。
3. npm 会在应用中创建 `package-lock.json` 文件, 用于记录软件包及软件包的依赖包的下载地址及
   版本。

## 使用 Node.js 软件包

在引入第三方软件包时，在 require 方法中不需要加入路径信息，只需要使用软件包的名字即可，require 方法会自动去 `node_modules` 文件夹中进行查找。

```js
const _ = require("lodash");
const array = ["a", "b", "c", "d"];
// chunk 对数组中的元素进行分组
// 参数一表示要进行操作的数组
// 参数二表示每一组中包含的元素个数
console.log(_.chunk(array, 2)); // [ [ 'a', 'b' ], [ 'c', 'd' ] ]
```

## 软件包依赖问题说明

1. 比如在我的应用中要依赖 mongoose 软件包，于是我下载了它，但是在 `node_modules` 文件夹中除了包含 mongoose 以外还多出了很多其他软件包，为什么会多出这么多软件包呢？
   实际上它们又是 mongoose 依赖的软件包。
2. 为什么 mongoose 依赖的软件包不放在 mongoose 文件夹中呢？在早期的 npm 版本中, 某个软件包依赖的其他软件包都会被放置在该软件包内部的 `node_modules` 文件夹中，但是这样做存在两个问题，第一个问题是很多软件包都会有相同的依赖，导致开发者在一个项目中会下载很多重复的软件包，比如 A 依赖 X，B 依赖 X，C 依赖 X，在这种情况下 X 就会被重复下载三次。第二个问题是文件夹嵌套层次太深，导致文件夹在 windows 系统中不能被直接删除。比如 A 依赖 B, B 依赖 C, C 依赖 D ... , 就会发生文件夹依次嵌套的情况。
3. 所有的软件包都放置在 `node_modules` 文件夹中不会导致软件包的版本冲突吗？在目前的 npm 版本中，所有的软件包都会被直接放置在应用根目录的 `node_modules` 文件夹中，这样虽然解决了文件夹嵌套层次过深和重复下载软件包的问题，但如果只这样做肯定会导致软件包版本冲突的问题，如何解决呢？比如 A 依赖 X 的 1 版本，B 依赖 X 的 2 版本，如果你先下载的是 A，那么 A 依赖的 X 会被放置在根目录的 `node_modules` 文件夹中, 当下载 B 时，由于在根目录中已经存在 X 并且版本不一致，那么 B 依赖的 X 就会被放置在 B 软件包中的 node_module 文件夹中，通过此方式解决软件包版本冲突的问题。
4. `node_modules` 文件夹中的软件包都需要提交到 git 仓库中吗？

在 `node_modules` 文件夹中有很多软件包，随着应用程序的增长，软件包也会越来越多，甚至会达到几百兆。当我们将应用提交到版本库时，我们不想提交它，因为它们不是我们应用中的源代码，而且由于碎文件比较多，其他人在检出代码时需要等待的时间会很久。当其他人拿到应用程序时没有依赖软件包应用程序是运行不起来的，如何解决呢?

实际上应用程序依赖了哪些软件包在 package.json 文件中都会有记录，其他人可以通过 `npm install` 命令重新下载它们。为了保持下载版本一直，npm 还会根据 `package-lock.json` 文件中的记录的地址进行下载。将应用程序提交到版本库之前，将 `node_modules` 文件夹添加到 `.gitignore` 文件中。

```sh
git init
git status
echo "node_modules/" > .gitignore
git status
git add .
git commit -m "our first commit"
```

## 语义版本控制

1. 版本号规范
   - `Major Version 主要版本`：添加新功能 (破坏现有 API) -> 6.0.0
   - `Minor version 次要版本`：添加新功能 (不会破坏现有 API, 在现有 API 的基础上进行添加) ->5.13.0
   - `Patch version 补丁版本`：用于修复 bug -> 5.12.6
1. 版本号更新规范
   - ^5.12.5: 主要版本不变，更新次要版本和补丁版本
   - ~5.12.5: 主要版本和次要版本不变，更新补丁版本
   - 5.12.5: 使用确切版本，即主要版本，次要版本，补丁版本固定

## 查看软件包实际版本

当过了一段时间以后，其他人从版本库中下载了你的应用程序，并通过 npm install 命令恢复了应用程序的依赖软件包，但是此时应用程序的依赖软件包版本可能会发生变化，而应用程序的 package.json
文件中记录的只是大致版本，如何查看依赖软件包的具体版本呢？

- 方式一：在 `node_modules` 文件夹中找到对应的依赖软件包，找到它的 package.json 文件，可以在这个文件中的 version 字段中找到它的具体版本。
- 方式二：通过 `npm list` 命令查看所有依赖软件包的具体版本， `npm list --depth 0` 选项指定查看依赖包的层级。

## 查看软件包元数据

```sh
npm view mongoose
npm view mongoose versions
npm view mongoose dist-tags dependencies
```

## 下载特定版本的软件包

```sh
npm i <pkg>@<version>
npm i mongoose@2.4.2 lodash@4.7.0
```

```sh
cat package.json
npm list --depth 0
```

## 删除软件包

```sh
npm uninstall <pkg>
npm uninstall mongoose
npm un mongoose
```

## 更新软件包

通过 `npm outdated` 命令可以查看哪些软件包已经过期，对应的新版本是什么。

通过 `npm update` 更新过期的软件包，更新操作遵循语义版本控制规则。

## 项目依赖 VS 开发依赖

项目依赖：无论在开发环境还是线上环境只要程序在运行的过程中需要使用的软件包就是项目依赖。比如 `lodash`，`mongoose`。

开发依赖：在应用开发阶段使用，在生产环境中不需要使用的软件包，比如 TypeScript 中的类型声明文件。

在 `package.json` 文件中, 项目依赖和开发依赖要分别记录，项目依赖被记录在 `dependencies` 对象中，开发依赖被记录在 `devDependencies` 中，使开发者可以在不同的环境中下载不同的依赖软件包。

在下载开发依赖时，要在命令的后面加上 `--save-dev`(可以简写成`-D`) 选项。例如：`npm i eslint -D`

在开发坏境中下载所有依赖软件包: `npm install`

在生产环境中只下载项目依赖软件包: `npm install --prod`

## 本地安装与全局安装

### 1. 本地安装与全局安装

- 本地安装：将软件包下载到应用根目录下的 `node_modules` 文件夹中，软件包只能在当前应用中使用。
- 全局安装：将软件包下载到操作系统的指定目录中，可以在任何应用中使用。
  - 通过 `-g` 选项将软件包安装到全局：`npm install <pkg> -g`
  - 查看全局软件包安装位置： `npm root -g`
  - 删除全局中的软件包:`npm un npm-check-updates -g`
  - 查看全局中安装了哪些软件包: `npm list -g --depth 0`
  - 查看全局中有哪些过期软件包: `npm outdated -g`

### 2. nodemon

问题：在 node 环境中每次修改 JavaScript 文件后都需要重新执行该文件才能看到效果。
通过 nodemon 可以解决此烦恼，它是命令工具软件包，可以监控文件变化，自动重新执行文件。

```sh
npm install nodemon@2.0.7 -g
nodemon app.js
```

### 3. npm-check-updates 强制更新

`npm-check-updates` 可以查看应用中有哪些软件包过期了，可以强制更新 `package.json` 文件中软件包版本

将 `npm-check-updates` 安装到全局： `npm install npm-check-updates -g`

### 4. 查看过期软件包： npm-check-updates

```sh
npm uninstall <pkg>
npm uninstall mongoose
npm un mongoose
```

### 3. 更新 package.json： ncu -u

### 5. 安装软件包： npm i

### 6. 检测： npm outdated 或 npm-check-updates

## 发布软件包

### 1. 注册 npm 账号

<img src="/images/nodeautomation/20.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/nodeautomation/21.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/nodeautomation/22.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/nodeautomation/23.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/nodeautomation/24.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 2. 创建软件包

```sh
mkdir lagou-node-test && cd "$_"
npm init --yes
```

### 3. 创建模块 index.js

```sh
module.exports = function (a, b) {
return a + b
}
```

### 4. 登录 npm (npm 镜像地址必须为 npmjs.com)

```sh
npm login
```

<img src="/images/nodeautomation/25.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 5. 发布软件包

```sh
npm publish
```

<img src="/images/nodeautomation/26.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/nodeautomation/27.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/nodeautomation/28.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 6. 测试: 在其他应用中使用该软件包

```sh
npm install lagou-node-test
```

- 创建 index.js 模块

```sh
const lagouNodeTest = require("lagou-node-test")
console.log(lagouNodeTest.add(1, 2)) // 3
```

## 更新版本号

在软件包的源代码发生更改后, 是不能直接发布的, 应该新更新软件包的版本号然后再进行发布.

- 更新主要版本号： npm version major
- 更新次要版本号： npm version minor
- 更新补丁版本号： npm version patch

## 撤销已发布的软件包

1. 只有在发布软件包的 24 小时内才允许撤销
2. 软件包撤销后 24 小时以后才能重新发布
3. 重新发布时需要修改包名称和版本号

```sh
npm unpublish <pkg> --force
```

## 更改 npm 镜像地址

由于 npmjs.com 是国外的网站，大多数时候下载软件包的速度会比较慢，如何解决呢？
可以通过配置的方式更改 npm 工具的下载地址。

1. 获取 npm 配置

```sh
npm config list
npm config list -l
npm config list -l --json
```

- `-l` 列表所有默认配置选项
- `--json` 以 json 格式显示配置选项

2. 设置 npm 配置

- 获取 npm 下载地址： `npm config get registry`
- 获取 npm 用户配置文件: `npm config get userconfig`

3. 更改 npm 镜像地址

```sh
npm config set registry https://registry.npm.taobao.org
npm config set registry https://registry.npmjs.org/
cat .npmrc
```

## npx 命令

npx 是 npm 软件包提供的命令，它是 Node.js 平台下软件包执行器。主要用途有两个，第一个是临时安装软件包执行后删除它，第二个是执行本地安装的提供命令的软件包。

### 1. 临时安装软件包执行后删除软件包

有些提供命令的软件包使用的频率并不高，比如`create-react-app` 脚手架工具，我能不能临时下载使用，然后再删掉它。

```sh
npx create-react-app react-test
```

### 2. 执行本地安装的软件包

现在有两个项目都依赖了某个命令工具软件包，但是项目 A 依赖的是它的 1 版本，项目 B 依赖的是它的 2 版本，我在全局到底应该安装什么版本呢 ?

该软件包可以在本地进行安装，在 A 项目中安装它的 1 版本, 在 B 项目中安装它的 2 版本，在应用中可以通过 npx 调用 node_modules 文件夹中安装的命令工具。

将所有软件包安装到应用本地是现在最推荐的做法，一是可以防止软件包的版本冲突问题，二是其他开发者在恢复应用依赖时可以恢复全部依赖，因为软件包安装到本地后会被 package.json 文件记录，其他
开发者在运行项目时不会因为缺少依赖而报错。

### 配置入口文件的作用

应用程序入口文件就是应用程序执行的起点，就是启动应用程序时执行的文件。

- 场景一：其他开发者拿到你的软件包以后，通过该文件可以知道应用的入口文件是谁，通过入口文件启动应用。
- 场景二：通过 `node 应用文件夹` 命令启动应用。node 命令会执行 package.json 文件中 main 选项指定的入口文件，如果没有指定入口文件，则执行 index.js。

```sh
node 应用文件夹
```
<img src="/images/nodeautomation/29.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 模块查找规则
1. 在指定了查找路径的情况下

```sh
require("./server")
```

- 1. 查找 server.js
- 2. 查找 server.json
- 3. 查找 server 文件夹, 查看入口文件 (package.json -> main)
- 4. 查找 server 文件夹 中的 index.js 文件

2. 在没有指令查找路径的情况下

```sh
require('server')
```

```sh
paths: [
'/Users/administrators/Desktop/Node/code/node_modules',
'/Users/administrators/Desktop/Node/node_modules',
'/Users/administrators/Desktop/node_modules',
'/Users/administrators/node_modules',
'/Users/node_modules',
'/node_modules'
]
```
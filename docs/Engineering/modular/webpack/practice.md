# Webpack 最佳实践

## 初始化项目

```sh
mkdir myproject && cd myproject && cnpm init –yes
```

## 项目内容

```
01.webpackstart
├─── src
│   ├── data.json
│   └── index.js
└── package.json
```

- index.js

```js
/**
 * Webpack 打包入口文件
 */
import data from "./data.json";
console.log(data);

// console.log('Hello Webpack')
```

- data.json

```json
{
  "name": "webpackstart",
  "desc": "How to use webpack"
}
```

## 安装 Webpack

- Webpack 版本
  - Webpack 4 于 2018 年 2 月发布
  - Webpack 5 于 2020 年 10 月发布
  - 安装命令需要调整（默认安装 5）

```sh
cnpm install webpack -g # webpack 5
cnpm install webpack-cli -g # webpack 5
```

```sh
cnpm install -D webpack webpack-cli
```

- 如果要安装 webpack4:

```sh
cnpm install webpack@4 -D # webpack 4
```

### webpack 其他命令

```sh
webpack help
```

```
//输出
--node-env <value> 将 process.env.NODE_ENV 设置为指定值。
--progress [value] 在构建期间打印编译进度。
-j, --json [value] 将结果打印为 JSON 或将其存储在文件中。
-d, --devtool <值> 确定要使用的源映射。
--no-devtool 不生成源映射。
--entry <value...> 应用程序的入口点，例如./src/main.js。
--mode <value> 定义传递给 webpack 的模式。
--name <value> 配置的名称。加载多个配置时使用。
-o, --output-path <value> webpack 生成的文件的输出位置，例如./dist/.
--stats [value] 它指示 webpack 如何处理统计信息，例如冗长。
--no-stats 禁用统计输出。
-t, --target <value...> 设置构建目标，例如节点。
--no-target 否定的“目标”选项。
-w, --watch 监视文件更改。
--no-watch 不监视文件更改。
--watch-options-stdin 当标准输入流结束时停止观看。
--no-watch-options-stdin 当标准输入流结束时不要停止观看。

全局选项：
  --color 在控制台上启用颜色。
  --no-color 在控制台上禁用颜色。
  -v, --version 输出'webpack'、'webpack-cli'和'webpack-dev-server'的版本号和命令。
  -h, --help [详细] 显示命令和选项的帮助。

命令：
  build|bundle|b [entries...] [options] 运行 webpack（默认命令，可以省略）。
  configtest|t [config-path] 验证 webpack 配置。
  help|h [command] [option] 显示命令和选项的帮助。
  info|i [options] 输出有关系统的信息。
  serve|server|s [entries...] 运行 webpack 开发服务器。要查看所有可用选项，您需要安装“webpack”、“webpack-dev-server”。
  version|v [commands...] 输出 'webpack'、'webpack-cli' 和 'webpack-dev-server' 的版本号和命令。
  watch|w [entries...] [options] 运行 webpack 并观察文件变化。

要查看所有受支持的命令和选项的列表，请运行“webpack --help=verbose”。

Webpack 文档：https://webpack.js.org/。
CLI 文档：https://webpack.js.org/api/cli/。
由 webpack 团队用 ♥ 制作。
```

## 创建入口文件

```sh
myproject/src/index.js
```

## 执行打包（必须指定 mode）

```sh
webpack ./src/index.js --output-path ./dist --mode=development
# 或简写成
webpack ./src/index.js -o ./dist/ --mode=development
```

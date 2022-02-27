# 在GithubPages部署上线

https://docs.github.com/cn/pages


##  部署自动化工作流"
建议在本地`yarn dev`或`yarn build`打包测试后没问题，再设置`GitHub Actions`（自动化工作流）。

什么是`GitHub Actions`？

`GitHub Actions`是根据你的项目依赖package.json，在服务器上自动安装依赖包。
根据`工作流配置文件`在服务器上自动`yarn build`，把打包成功后的文件放在仓库分支gh-pages里。

然后`Github Page`服务就会自动拉取分支gh-pages内的文件，生成静态网站。

- 步骤1：在Github项目里找到Actions，填写好`工作流配置文件`。
![](/images/guide/003.png)
<img src="/images/guide/003.png" style="width: 30%; display:inline-block; margin: 0 ;">

::: details 工作流配置代码
```js{6,44}
name: docs

on:
  # 每当 push 到 main 分支时触发部署
  push:
    branches: [main]
  # 手动触发部署
  workflow_dispatch:

jobs:
  docs:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
        with:
          # “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v1
        with:
          # 选择要使用的 node 版本
          node-version: '14'

      # 缓存 node_modules
      - name: Cache dependencies
        uses: actions/cache@v2
        id: yarn-cache
        with:
          path: |
            **/node_modules
          key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-yarn-

      # 如果缓存没有命中，安装依赖
      - name: Install dependencies
        if: steps.yarn-cache.outputs.cache-hit != 'true'
        run: yarn --frozen-lockfile

      # 运行构建脚本
      - name: Build VuePress site
        run: yarn build

      # 查看 workflow 的文档来获取更多信息
      # @see https://github.com/crazy-max/ghaction-github-pages
      - name: Deploy to GitHub Pages
        uses: crazy-max/ghaction-github-pages@v2
        with:
          # 部署到 gh-pages 分支
          target_branch: gh-pages
          # 部署目录为 VuePress 的默认输出目录
          build_dir: docs/.vuepress/dist
        env:
          # @see https://docs.github.com/cn/actions/reference/authentication-in-a-workflow#about-the-github_token-secret
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
:::
<img src="/images/guide/004.png" style="width: 80%; display:inline-block; margin: 0 ;">

- 步骤2：创建好配置之后，仓库里会多出相应的目录与文件`.github/workflows/docs.yml`。
<img src="/images/guide/005.png" style="width: 70%; display: block; margin: 0 ;">
<!-- ![](/images/guide/005.png) -->
- 步骤3：
![](/images/guide/006.png)

- 查看是否构建成功

![](/images/guide/007.png)

## 设置Github Page根目录
![](/images/guide/008.png)
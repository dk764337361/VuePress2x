# Docsearch

<NpmBadge package="@vuepress/plugin-docsearch" />

- [VuePress官方Docsearch介绍](https://v2.vuepress.vuejs.org/zh/reference/plugin/docsearch.html#%E8%8E%B7%E5%8F%96%E6%90%9C%E7%B4%A2%E7%B4%A2%E5%BC%95) 

:broken_heart:我遇上的问题：[提交网站和邮箱](https://docsearch.algolia.com/apply/)给`docsearch.algolia`，后几天都收不到邮件回应（邮件包含`apiKey` 和 `indexName`）,换了邮箱重新提交也无果，只能尝试第二种方法：用官方爬虫包，从本地趴网站索引。当然你也可以从[docker爬虫](https://docsearch.algolia.com/docs/run-your-own)。

:secret:本地爬虫过程：
- 用Docsearch官方爬虫包，从本地趴网站索引
- 爬虫包自动上传数据到Docsearch的Algolia控制台
- 在你网站搜索界面愉快搜索

:bulb:当然也可以不用官方插件，用[第三方全文插件](https://blog.sofineday.com/vuepress-fulltext-search.html#%E9%80%9A%E8%BF%87%E6%8F%92%E4%BB%B6-vuepress-plugin-fulltext-search-%E5%AE%9E%E7%8E%B0%E5%85%A8%E6%96%87%E6%90%9C%E7%B4%A2)
，好处是省去好多麻烦设置，坏处是第三方全文插件作者并不会及时随着官方VuePress版本迭代而进行更新，包括第三方主题。

## 注册[Algolia](https://www.algolia.com/)账号

## 安装plugin-docsearch

```bash
yarn add @vuepress/plugin-docsearch@next
```

**config.js**

```js
//@vuepress/docsearch将谷歌的Algolia DocSearch集成到 VuePress中，为你的文档网站提供搜索功能。
  plugins: [
    [
      "@vuepress/docsearch",
      {
        appId:"algolia的应用ID",
        apiKey: "algolia的搜索ID",
        indexName: "VuepressV2",
        locales: {
          '/': {
            placeholder: 'Search Documentation',
          },
          '/zh/': {
            placeholder: '搜索文档',
          },
        },
      },
    ],
  ],
```

## ChromeDriver

[ChromeDriver的官方文档](https://chromedriver.chromium.org/home)

### 下载
- 查看你的[谷歌浏览器](https://www.google.cn/intl/zh-CN/chrome/)版本，根据版本下载相对应版本的[ChromeDriver](https://chromedriver.chromium.org/downloads)

<img src="/images/guide/Chrome01.png" style="width: 100%; display: block; margin: 0 ;">
<img src="/images/guide/Chrome02.png" style="width: 100%; display: block; margin: 0 ;">

### 配置path
***windows：***
- 把下载并解压出的ChromeDriver放在`C:\Program Files\Google\Chrome\Application\`

- 在 PATH 环境变量中添加ChromeDriver路径：`C:\Program Files\Google\Chrome\Application\`
![](/images/guide/Chrome03.png)
<!-- <img src="/images/guide/Chrome03.png" style="width: 100%; display: block; margin: 0 ;"> -->

***Mac:***

- 把下载并解压出的ChromeDriver放在`/usr/local/bin`
<!-- <img src="/images/guide/Chrome05.png" style="width: 100%; display: block; margin: 0 ;"> -->


## python3.6

### 下载
::: tip 提示
[官方爬虫包](https://github.com/algolia/docsearch-scraper.git)好几年没更新了，用3.7.x +会报错，亲测只能用3.6.x 

[python3.6.8下载地址](https://www.python.org/downloads/release/python-368/)

```bash
# mac查看版本
python3 --version  
# mac查看安装路径
which python3 :
# win查看版本:  
python --version
```
:::



### 执行命令

<CodeGroup>
  <CodeGroupItem title="windows" active>

```bash
# Windows powerShell 或git bash
# 如果安装了多个版本的python：
# 命令举例：D:/software/python36/python.exe -m pip install --upgrade pip

# 升级pip
python -m pip install --upgrade pip
# 设置pip国内镜像
# 豆瓣https://pypi.doubanio.com/simple/
# 阿里云https://mirrors.aliyun.com/pypi/simple/
# 清华大学1号链接https://pypi.tuna.tsinghua.edu.cn/simple/
# 清华大学2号链接https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple/
python -m pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/
# 安装pipenv
python -m pip install pipenv
# 安装并升级pylint
python -m pip install -i https://pypi.tuna.tsinghua.edu.cn/simple --upgrade pylint
# git clone下载官方爬虫包
git clone https://github.com/algolia/docsearch-scraper.git
# 回到你的下载目录
cd D:\project\docsearch-scraper
```

  </CodeGroupItem>

  <CodeGroupItem title="Mac">

```bash
pip3 install --upgrade pip
pip3 config set global.index-url https://mirrors.aliyun.com/pypi/simple/
pip3 install pipenv
pip3 install -i https://pypi.tuna.tsinghua.edu.cn/simple --upgrade pylint
git clone https://github.com/algolia/docsearch-scraper.git
cd /Users/sunshine/Desktop/docsearch-scraper1
```

  </CodeGroupItem>
</CodeGroup>

### 测试ChromeDriver
***创建test.py文件测试***
::: details
```py
#测试Chromedriver的环境是否配置好(path)
from selenium import webdriver
import time
def main():
    b=webdriver.Chrome()
    b.get('http://www.baidu.com')
    time.sleep(5)
    b.quit()
if __name__ == '__main__':
    main()
```
::: 
<img src="/images/guide/Chrome04.png" style="width: 100%; display: block; margin: 0 ;">

## 创建`.env`文件
<!-- 一级目录下创建`.env`文件 -->
::: details
```sh
APPLICATION_ID=你algolia的应用ID
API_KEY=你algolia的Admin密钥
# Windwos:
CHROMEDRIVER_PATH=C:\Program Files\Google\Chrome\Application
# Mac:
# CHROMEDRIVER_PATH=/usr/local/bin
```
:::




## 创建`config.json`文件
::: details
```
{
  "index_name": "VuepressV2",
  "start_urls": [
    "填上你的网址"
  ],
  "stop_urls": [],
  "selectors": {
    "lvl0": {
      "selector": ".sidebar-heading.active",
      "global": true,
      "default_value": "Documentation"
    },
    "lvl1": ".theme-default-content h1",
    "lvl2": ".theme-default-content h2",
    "lvl3": ".theme-default-content h3",
    "lvl4": ".theme-default-content h4",
    "lvl5": ".theme-default-content h5",
    "text": ".theme-default-content p, .theme-default-content li",
    "lang": {
      "selector": "/html/@lang",
      "type": "xpath",
      "global": true
    }
  },
  "custom_settings": {
    "attributesForFaceting": [
      "lang"
    ]
  }
}
```
::: 

```sh
# pipenv安装项目所需要的依赖包
pipenv install --dev
# pipenv shell加载.env文件，设立本项目虚拟环境。exit()退出
# pipenv --rm 删除之前创建的虚拟环境
pipenv shell
```

```sh
# CI 根据 linting 规则检查代码，使用 pylint （由pipenv 作为开发包安装）。
# 要运行 linter，请在根目录下运行以下命令 你的克隆：
pipenv run pylint scraper cli deployer
```

## PyCharm 
```sh
# 执行 ./config.json 
./docsearch run ./config.json
# 执行playground，并运行ChromeDriver
./docsearch playground
```

[IDE PyCharm下载](https://www.jetbrains.com/pycharm/)
<img src="/images/guide/docsearch01.png" style="width: 100%; display: block; margin: 0 ;">
<img src="/images/guide/docsearch02.png" style="width: 100%; display: block; margin: 0 ;">

### 测试你的结果
- 运行`./docsearch run ./config.json`。开始爬虫并将数据上传到[Algolia控制台](https://www.algolia.com/)
<img src="/images/guide/docsearch03.png" style="width: 100%; display: block; margin: 0 ;">
- 运行 `./docsearch playground`。这将打开一个带有搜索输入的网页。您可以对索引结果进行实时测试。
<img src="/images/guide/docsearch04.png" style="width: 100%; display: block; margin: 0 ;">
请注意，如果命令失败（它可能发生在非 Mac 机器上），您可以通过在./playground子目录中运行实时服务器来获得相同的结果。

或者到[Algolia控制台](https://www.algolia.com/)控制台对索引结果进行实时测试。
<img src="/images/guide/docsearch05.png" style="width: 100%; display: block; margin: 0 ;">



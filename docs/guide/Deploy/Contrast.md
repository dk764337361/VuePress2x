#  你想部署到那个地方

- [VuePress官方部署设置介绍](https://v2.vuepress.vuejs.org/zh/guide/deployment.html#github-pages#部署) 

- [知乎相关讨论](https://zhuanlan.zhihu.com/p/77651304) 



- 方法一：部署到国内的云服务商，如 AWS 中国区 或 阿里云。

使用基础云服务器来部署的缺点也非常明显: 初始化配置的比较多如搭建 Nginx，证书维护和更新，数据库管理等等，如果要做成能持续部署(Git push自动打包和部署)，还需配合使用 Jenkins / Github Action / Travis CI 等等的持续集成工具。

- 方法二：没有方法一的缺点，不过基础免费版勉强尚可，但是收费标准堪比`老黄刀法`
<img src="/images/guide/NVIDIA.jpg" style="width: 50%; display: block; margin: 0 ;">

| 功能        | GithubPage（基础免费版）          | Netlify（基础免费版） |
| ------------- | ---------------------------------------- | --------------------- |
| 速度        | 慢（国内访问）                    | 中上（国内访问） |
| 存储空间  | 不得超过 1 GB                        | 100G                  |
| 托管网站数量 | 不清楚                                | 无限制             |
| 带宽        | 软带宽100GB/每月                    | 软带宽100GB/每月 |
| 并发构建  | 不清楚                                | 1                     |
| build构建时间 | 2,000 GitHub Actions 分钟              | 300分钟             |
| build构建次数 | 每小时 10 次构建                   | 不清楚             |
| Markdown语法 | 支持Jekyll                             | 不限制             |
| 自定义域名 | ✔                                      | ✔                   |
| 免费Https证书 | 仅支持github.io，不支持自定义域名的https | ✔                   |
| 搜索引擎支持 | 禁止百度爬虫                       | ✔                   |
| 可否商用  | X                                        | ✔                   |

[GithubPages官方文档](https://docs.github.com/cn/github/getting-started-with-github/learning-about-github/githubs-products) &
[定价](https://github.com/pricing) 

[Netlify官方文档](https://docs.netlify.com/?_ga=2.223673435.1110434416.1629357571-380531349.1629357571) &
[定价](https://www.netlify.com/pricing?_ga=2.224392283.1110434416.1629357571-380531349.1629357571#teams) 



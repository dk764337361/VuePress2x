# 在Netlify部署上线
## 前往 Netlify
从 GitHub 创建一个新项目，并进行如下配置（简化版`自动化工作流`）：

- Build Command: `yarn docs:build`
- Publish directory: `docs/.vuepress/dist`
![](/images/guide/009.png)
![](/images/guide/010.png)

## 选择Node版本

在[Environment variables](https://docs.netlify.com/configure-builds/environment-variables/) 来选择 Node 版本：
- `NODE_VERSION`: 14

然后点击 deploy 按钮，不出意外的话脚本build成功
![](/images/guide/012.png)
![](/images/guide/013.png)
![](/images/guide/014.png)
![](/images/guide/015.png)


## 设置域名
![](/images/guide/016.png)

## 阿里云控制台添加DNS
```
dns1.p01.nsone.net
dns2.p01.nsone.net
dns3.p01.nsone.net
dns4.p01.nsone.net
```

![](/images/guide/017.png)
![](/images/guide/018.png)

## 验证NDS并启用HTTPS

- 在Netlify的DNS控制台里验证是否启用Netlify的DNS。

- 启用Netlify的DNS后才能启用他家的免费Https证书(免费续签)
![](/images/guide/019.png)
![](/images/guide/020.png)



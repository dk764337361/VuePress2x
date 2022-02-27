# 部署前的准备

## 快速上传代码到[Github](https://github.com/) 
打开 github 网站，登陆自己的 github 账号（没有账号的快去注册并面壁思过作为一个优秀的程序员为啥连一个github账号都没有）

- 新建Github仓库

![](/images/guide/001.png)

那么新建仓库，Repository name 就填写为：test

![](/images/guide/002.png)


- 使用工具包的，将 [vuepress](https://) 中的内容拷贝到 vuepressBlog 文件夹中

- 快速上传在根目录下创建 pushgithub 文件，内容如下：

```sh
#!/usr/bin/env sh

git init

git add .   

git commit -m “本次上传的版本是xxxx” 

#//链接远程仓库地址，创建主分支()
# git remote add origin git@github.com:dk764337361/VuePress2x.git

#//git push -f 地址  main(Github的主分支)
git push -f git@github.com:dk764337361/VuePress2x main

git push -u origin main 

```

## 在package.json文件添加发布命令

（使用工具包的请忽略）

``` json
"scripts": {
    "push": "bash pushgithub.sh"
}
```

## 大功告成，运行发布命令:clap: 
```
    yarn push
```
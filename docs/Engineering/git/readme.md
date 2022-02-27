
# git入门

## 一、生成/添加SSH公钥【转载自码云】
Gitee 提供了基于SSH协议的Git服务，在使用SSH协议访问仓库之前，需要先配置好账户/仓库的SSH公钥。

- 你可以按如下命令来生成 sshkey:
```sh
ssh-keygen -t rsa -C "xxxxx@xxxxx.com"  
# Generating public/private rsa key pair...
```
::: tip 提示
注意：这里的 xxxxx@xxxxx.com 只是生成的 sshkey 的名称，并不约束或要求具体命名为某个邮箱。
现网的大部分教程均讲解的使用邮箱生成，其一开始的初衷仅仅是为了便于辨识所以使用了邮箱。
:::

- 按照提示完成三次回车，即可生成 ssh key。通过查看 ~/.ssh/id_rsa.pub 文件内容，获取到你的 public key
```sh
cat ~/.ssh/id_rsa.pub
# ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC6eNtGpNGwstc....
```
![](/images/git/02.png)
![](/images/git/01.png)

- 添加后，在终端（Terminal）中输入
```sh
ssh -T git@gitee.com
```
![](/images/git/03.png)
:sunglasses: 添加成功后，就可以使用SSH协议对仓库进行操作了。

## 二、码云、Github同时配置ssh key【转载自CSDN】
- 进入到ssh目录
```sh
cd ~/.ssh  
``` 
- 通过下面的命令，依次生成两个平台的key
```sh
ssh-keygen -t rsa -C "xxxxxxx@qq.com" -f "github_id_rsa"
ssh-keygen -t rsa -C "xxxxxxx@qq.com" -f "gitee_id_rsa"  
``` 
- 完成后，.ssh文件夹生成以下文件
![](/images/git/04.png)

- 把public key复制到gitee和github
执行命令cat github_id_rsa.pub把第二行到结尾的内容复制到github的ssh中保存
::: tip 提示
同样的操作，添加gitee的ssh
:::
![](/images/git/05.png)

- 创建config文件解决ssh冲突
在.ssh文件夹下执行命令vi config
文件中添加以下内容，按ZZ保存。
```sh
# gitee
Host gitee.com
HostName gitee.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/gitee_id_rsa

# github
Host github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/github_id_rsa
```
- 最后测试环节
执行

```sh
ssh -T git@github.com或ssh -T git@gitee.com
``` 

:sunglasses: 成功则返回Hi xxx! You've successfully authenticated, but GITEE.COM does not provide shell access.

## 三、上传
- 在本地创建git仓库
```sh
mkdir homeworks   //创建名为homeworks的文件夹
cd homeworks   //定位到文件夹homeworks
git init   //初始化仓库
touch README.md  创建介绍文件（可忽略）
git add .    //或 git add -A或git add "其他文件" //添加文件到本地仓库
git commit -m "first commit"   //添加文件描述信息
git remote add origin https://gitee.com/xxxxxxx/homeworks.git //链接远程仓库地址，创建主分支()
git push -u origin master  //把本地仓库的文件推送到远程仓库
```
- 本地已有git仓库
```sh
cd existing_git_repo
git remote add origin https://gitee.com/xxxxxx/homework.git
git push -u origin master
```



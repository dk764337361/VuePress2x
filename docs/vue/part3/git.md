# 加⼊ Git 版本管理

- 创建远程仓库，这⾥演示 github 仓库操作，公开私有⾃⾏选择。
- 将本地仓库 push 到远端（本地 git 仓库操作略）

```
# 添加远程仓库地址
git remote add origin 远程仓库地址
# 推送到远程仓库，-u：保存，-u origin master：保存origin master
git push -u origin master
git push
```

刷新远程仓库，查看是否成功。

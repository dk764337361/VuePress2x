#!/usr/bin/env sh

git init

git add .   

git commit -m “更新心选电商项目-解决BUG” 

#//链接远程仓库地址，创建主分支()
# git remote add origin https://github.com/dk764337361/myvurpress.git

# git remote add origin git@github.com:dk764337361/myvurpress.git master
# git remote add origin git@github.com:dk764337361/daokuan.github.io.git
# git remote add origin git@github.com:dk764337361/VuePress2x.git

# git push -f git@github.com:dk764337361/VuePress2x main
git push -f git@github.com:dk764337361/VuePress2x.git main

git push -u origin main 

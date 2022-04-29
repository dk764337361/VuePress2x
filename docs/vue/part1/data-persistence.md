# 数据持久化

<img src="/images/vue/021.gif" style="width: 100%; display:inline-block; margin: 0 ;">

## A.获取本地存储

### 1.封装函数，用于进行本地存储数据读取。

<img src="/images/vue/133.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 2.将事项数据更改为本地存储数据。

<img src="/images/vue/134.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## B.更新本地存储

### 3.封装本地存储的更新功能。

<img src="/images/vue/135.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 4.由于多种事项操作都需要更新本地存储，单个设置十分繁琐，可以通过侦听器统一设置。

<img src="/images/vue/136.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

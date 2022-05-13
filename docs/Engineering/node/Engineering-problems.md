# 工程使用问题

## webpack打包内存溢出

解决Vue编译和打包时频繁内存溢出情况`CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory`

<img src="/images/nodeautomation/166.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

如上图所示：频繁出现此种情况，项目太大，导致内存溢出，排除代码问题外，可参照以下方式解决


### 解决方法一：
您需要增加节点允许的内存量。您可以通过以下方式在全局范围内执打开一个cmd窗口

```sh
setx NODE_OPTIONS --max_old_space_size=10240
```
关闭所有cmd /代码编辑器

重新打开cmd并再次运行节点命令（npm等）

### 解决方法二：

[转载自博客园](https://www.cnblogs.com/maqingyuan/p/10636920.html)




1. 第一步:  全局安装  increase-memory-limit

```sh
npm install -g increase-memory-limit
```

2. 第二步:  进入工程目录，执行：

```sh
increase-memory-limit
```

3. 第三步:  重启项目即可(切记!!!)

```sh
npm run dev
```

### 解决方法三：

增大node.js程序的运行内存。方法之一，修改package.json的scripts下的serve命令，如下：

```sh
 "serve": "node --max_old_space_size=10240 node_modules/@vue/cli-service/bin/vue-cli-service.js serve",
```



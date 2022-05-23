# VSCode相关使用技巧

## 同步VSCode配置文件

### 插件 "Settings Sync"

- It Syncs 简介：

1. Settings File（设置文件）

2. Keybinding File（快捷键设置文件）

3. Launch File（启动设置文件）

4. Snippets Folder（用户空间设置）

5. VSCode Extensions Settings（VSCode 扩展设置）

6. Workspaces Folder（工作空间设置）

### 快捷键
1. Upload Key（把本地配置文件上传到Github） : Shift + Alt + U
2. Download Key（从Github Gist同步配置文件到本地） : Shift + Alt + D

(on macOS: Shift + Option + U / Shift + Option + D)

### 1：到Github 注册personal access token

到[Github access token](https://github.com/settings/tokens)注册personal access token

![](/images/vscode/001.png)
![](/images/vscode/002.png)
![](/images/vscode/003.png)

::: tip 提示
务必把access秘钥复制保存，若再次刷新网页就看不到了。
:::
### 2：把access秘钥填进插件设置里
![](/images/vscode/004.png)

### 3：在Github Gist里看已上传的文件
在[Github Gist](https://gist.github.com/)看已上传的文件

![](/images/vscode/005.png)


## 设置console.log快捷键

文件-设置-用户片段

搜索 `javascript` ，打开` javascript.json` 文件


```json
{
	// Example，讲下方代码注释打开，自定义快捷键即可
	"Print to console": {
		"prefix": "ll",//快捷键
		"body": [
			"console.log($1)",
			"$2"
		],
		"description": "Log output to console"
	}
}
```



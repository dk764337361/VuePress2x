# `<video>`视频标签

HTML5 在不使用插件时可以支持原生的视频格式的播放，支持格式是有限的。
| 格式 | MIME-type  | IE   | Firefox | Operat10.5 | Chrome | Safari3.0 |
| ---- | ---------- | ---- | ------- | ---------- | ------ | --------- |
| Ogg  | video/ogg  | ×   | 3.5+    | 10.5+      | 5.0+   | ×        |
| mp4  | video/mp4  | 9,0+ | ×      | ×         | 5.0+   | 3.0+      |
| webM | video/webm | ×   | 4.0+    | 10.6+      | 6.0+   | ×       |

## 常见属性
| 属性   | 值                                   | 描述                                                       |
| -------- | ------------------------------------- | ------------------------------------------------------------ |
| autoplay | autoplay                              | 视频就绪自动播放(谷歌浏览器需要添加 muted来解决自动播放问题) |
| controls | controls                              | 向用户显示播放控件                                  |
| loop     | loop                                  | 放完是否继续播放该视频,循环播放               |
| preload  | auto(预先加载视频)  <br>  none(不应加载视频) | 规定是否预加载视频(如果有了 autoplay就忽略该属性) |
| src      | url                                   | 视频url地址                                              |
| width    | pixels(像素)                        | 设置播放器宽度                                        |
| height   | pixels(像素)                        | 设置播放器高度                                        |
| poster   | imgurl                                | 加载等待的画面图片                                  |
| muted    | muted                                 | 静音播放                                                 |


```html
<video src="文件路径" controls="controls" loop="loop"></video>
```

::: tip 提示
谷歌浏览器不支持自动播放，如果想设置自动播放，可以添加`muted`属性。但对音频无效。
:::

## 语法格式

::: tip 提示
h5 中如果标签属性的属性名和属性值是一样的，那么可以省略属性值不写
:::

```html
<video src="文件路径" controls loop></video>
或者
<video src="文件路径" controls="controls" loop="loop"></video>
```

## 兼容性语法

```html
<video controls muted width="500px">
  <source src="media/洛基.mp4" type="video/mp4" />
  <source src="happy.ogg" type="video/ogg" />
  您的浏览器暂不支持video标签
</video>
```

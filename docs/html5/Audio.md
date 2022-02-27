# `<audio>`音频标签

HTML5 在不使用插件时可以支持原生的音频格式的播放，支持格式是有限的。
| 格式    | MIME-type  | IE9 | Firefox3.5 | Operat10.5 | Chrome3.0 | Safari3.0 |
| --------- | ---------- | --- | ---------- | ---------- | --------- | --------- |
| Ogg       | audio/ogg  |     | √        | √        | √       |           |
| audio/ogg | audio/mpeg | √ |            |            | √       | √       |
| MP3       | audio/wav  |     | √        | √        |           | √       |


## 常见属性
| 属性   | 值      | 描述                                                                                 |
| -------- | -------- | -------------------------------------------------------------------------------------- |
| autoplay | autoplay | 如果出现该属性，则音频在就绪后马上播放。                             |
| controls | controls | 如果出现该属性，则向用户显示控件,比如播放按钮                      |
| loop     | loop     | 如果出现该属性，则每当音频结束时重新开始播放                       |
| preload  | preload  | 如果出现该属性，则音频在页面加载时进行加载，并预备播放。如果使用" autoplay"，则忽略该属性。 |
| src      | url      | 要播放的音频的URL                                                             |

```html
<audio src="文件路径" controls="controls" loop="loop"></audio>
```

## 语法格式

::: tip 提示
h5 中如果标签属性的属性名和属性值是一样的，那么可以省略属性值不写
:::

```html
<audio src="文件路径" controls loop></audio>
或者
<audio src="文件路径" controls="controls" loop="loop"></audio>
```

## 兼容性语法

```html
<audio controls loop>
  <source src="happy.mp3" type="audio/mpeg" />
  <source src="happy.ogg" type="audio/ogg" />
  <!-- 浏览器会从上至下查找兼容浏览器的音频格式，如果找不到就提示最后一条自定义语句 -->
  您的浏览器暂不支持audio标签
</audio>
```

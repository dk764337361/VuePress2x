# 拉钩项目 head 内部配置

## 文件结构
- 网站中会包含多个`.html`文件和`.css`文件以及图片等多媒体文件，我们需要使用不同的文件夹分类进行管理。
- 文件夹最基本的机构包括：
<img src="/images/Staticpages/004.png" style="width: 80%; display: block; margin: 0 ;">

## `<head>`内的配置
- 真正的上线网站中，HTML文件中的`<head>`标签内部需要配置更多的内容。

### `<titile>`网页标题
`<titile>互联网求职招聘找工作-上拉勾招聘-专业的互联网求职招聘网站<titile/>`

### 标签页icon图标

大部分网站再标签页标题位置会添加网站的icon图标。

图标的文件名要求以`favicon.ico`命名，文件需要与index.html文件同级存储。

使用方法，通过`<link>`标签进行引用，设置的属性包括：

`<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">`

### css分级引入

css文件设置需要根据功能进行分层管理：目的是为了提取出多个页面公共的部分，提供多个HTML同时引用。
公共的部分也可以划分范围，有的是所有网站能用的，有的是某几个网站公共的部分。

css常见的分层组织：清除默认样式的css，网站的公共样式css，每个页面自己独有的css。
注意书写顺序，引入多层css时，需要按照后面的层叠前面的css进行设置，使用页面独有的样式层叠公共的样式。

### 清除默认样式

- 使用范围：所有网站都能使用。
- 制作方法：自己工作中进行积累，或者使用网络上已有的资源。
- 命名的习惯：reset.css
- 引入时必须作为第一层引入，网页中独有的样式可以层叠掉reset中的样式。

::: warning 注意
reset.css文件写完后不允许再次更改。
:::

### 公共样式

- 使用范围：单独的一个网站所有的也米娜、几个页面。
- 制作方法：从设计图中观察，找到所有页面或多个页面公共的部分，划分成不同的模块分别进行的.css文件的书写。
- 命名的习惯：common.css或者模块名.css
- 多个网站页面的公共部分书写完之后不允许后期更改，一旦更改，多个引用的HTML页面都会发生变化。
需要注意类名的使用，公共文件中的类名一般不要再其他的css文件中再用。

### 页面独有样式

- 使用范围：单独的一个HTML页面。
- 制作方法：找到页面独有的而其他页面没有的样式，单独写在一个`.css`文件中，只有对应的HTML文件能够引用。
- 命名习惯：一般文件名与HTML的文件名保持一致，例如`index.css`，如果拆分的更细致可以使用多个单词的拼写，例如index_banner.css等。

::: warning 注意
使用单独样式文件去层叠前面公共样式时，需要注意选择器权重。
:::

### 整个css分层引入的顺序

`<link rel="stylesheet" type="text/css" href="css/reset.css">`
`<link rel="stylesheet" type="text/css" href="css/common.css">`
`<link rel="stylesheet" type="text/css" href="css/index.css">`

## 首页index.html结构布局

### header区域

header：网页顶部结构常用命名，通常包含logo、导航nav等内容。

布局类型：通栏背景，内部包含版心居中的主要内容，内容包含左、右浮动的两部分。

整体结构：100%的div > 版心的div

注意：为了薄面更改公共的版心样式，`<div>`需要重新添加一个class属性值。

logo:使用h1 > a 结构，可以适当添加SEO搜索的关键字。

nav导航：常用ul > li > a列表结构搭建。
<img src="/images/Staticpages/005.png" style="width: 100%; display: block; margin: 0 ;">


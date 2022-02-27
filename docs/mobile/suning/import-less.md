# 苏宁首页-@import 导入 less 文件

## 新建 index.less

1. 新建 index.less 这里面写首页的样式。
2. 将刚才设置好的 commom.less 引入到 index.less 里面。

语法如下：

```css
/* 在index.less中导入common.less文件 */
@inport "common";
```

3. 生成index.css 引入到index.html

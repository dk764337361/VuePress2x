# .hot_recruit 部分

热门职位部分是一种 tab 选项卡结构,并且与后面的热门公司和热门链接有类似的结构和样式,需要谨慎提取公共样式,通过公共类名设置 CSS,
热门职业独有的样式需要使用单独的类名设置,避免影响其他两个部分.

布局类型: tab 栏选项卡结构,整体为上下对齐的版心结构.

标题部分:浮动制作,当前展示的部分标签使用 current 的类名进行标记,设置特殊样式.

详细内容布局类型: `平均分步型`,使用浮动制作.

补充:多余文字显示成...省略号形式,通过三行代码实现.

<img src="/images/Staticpages/009.png" style="width: 100%; display: block; margin: 0 ;">

## 补充：多余文字显示...省略号

```css
.word_cut {
  max-width:120px; /*设置文字最大宽度*/
  white-space: nowrap; /*设置文字不要换行*/
  overflow: hidden;
  text-overflow: ellipsis; /*设置文字溢出显示效果*/
}
```
<img src="/images/Staticpages/010.png" style="width: 50%; display: block;">

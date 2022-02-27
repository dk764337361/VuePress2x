# font的综合属性
<!-- [[toc]] -->
```md
    font
    ├─── font-weight
    ├─── font-style
    └── line-height
```

<!-- ::: tip 提示
this is a tip
::: -->

::: warning font 在进行综合书写时的顺序
加粗+空格+斜体+空格+字号/行高+空格+字体，

其中“加粗”、“斜体”同时书写时可以调换位置，

“字号”、“行高”同时书写时必须加“/”号,且位置不可调换。
:::

```css
//示例：
p {
   bold italic  14px/28px "宋体"
}
```
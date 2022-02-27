# 外联式

外联式 CSS，也可以叫做外链式 CSS、外部 CSS。

## 书写位置：

在一个单独的扩展名为 .css 的文件中。

## 书写语法：

在 .css 文件中书写时，不需要再加 `<style>` 标签，内部代码与内嵌式样式表中 `<style>` 标签内部的代码一样的。需要通过选择器去选中标签，添加对应的样式。
:::tip
外联式样式表必须引入到 HTML 文件中，才能正常进行加载。
:::

## 引入方式：

在 HTML 中的 `<head>` 标签内部使用 `<link>` 标签进行引入，href 属性设置引入 css 的路径。

```html{4}
<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="外联式.css" type="text/css" />
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        padding: 0;
        margin: 0;
      }
    </style>
  </head>
  <body></body>
</html>
```

`<link>` 标签的属性

- rel ：relationship，关系的意思，表示引入的外部文件与 HTML 之间的关系。css 文件引入时属性值是 stylesheet，说明引入的是样式表。

- href ：hypertext reference，超文本引用，属性值是引入的路径。

- type ：属性值 "text/css"，表示加载时代码按照纯文本形式的 css 代码加载。

其中，type 属性在 HTML5 中规定可以省略不写。

优点：

①实现了 HTML 和 css 完全分离。

②多个 HTML 文件可以共用一个 css 文件，便于提取公共 css，减少代码量，还可以实现一个 css 变化，多个 HTML 页面同时变化。

③一个 HTML 文件可以引入多个 css 文件，多个文件中的代码都会加载到 HTML 页面中，可以帮我们实现代码分层。

用途：用于大型项目及完整网站制作。

# 内嵌式

## 书写位置：

在HTML文件中，`<head>` 标签内部有一个 `<style>` 标签，`<style>` 标签书写在`<title>`标签后面，所有 css 代码书写在 `<style>` 标签内部。

`<style>` 标签有一个标签属性叫做 type，属性值是 ”text/css”，表示 `<style>` 标签内部书写的是纯文本类型的 css 代码。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
            padding: 0;
            margin: 0;
        }
    </style>
</head>
<body>
</body>
</html>
```

## 优点：

a、实现了结构和样式的初步分离，css 只负责样式，HTML 负责结构。

b、多个标签可以利用一段代码设置相同的样式，节省代码量。

## 缺点：

a、结构和样式并没有完全分离，代码依旧书写在 HTML 文件的`<style>`标签内部。

b、css 样式只能给一个 HTML 文件使用，不能够被多个 HTML 文件同时利用。

c、在 HTML 中如果 css 代码太多，会造成文件头重脚轻，不利于 HTML 文件的查看。

用途：初学阶段使用，或制作一些小的案例，但是如果是完整的网站项目不能使用内嵌式样式表。
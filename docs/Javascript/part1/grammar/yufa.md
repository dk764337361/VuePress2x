# JavaScript 的书写位置

## 书写位置

### 写在行内

```html
<input type="button" value="按钮" onclick="alert('hello world')" />
```

### 写在 html 的`<script>`标签中

```html
<head>
  <script>
    alert("hello world");
  </script>
</head>
```
### 写在外部js文件中，在页面引入

```html
<script src="main.js"></script>
```

::: warning 注意
引入外部js文件的`<script>`标签中不可以写JavaScript自定义的代码，需要写在另一个新的`<script>`中。
:::

## 注释

### 多行注释
```html
<head>
  <script>
    /* 这是一个多行注释
    多行内容在浏览器中都不可见
    注释范围是多行
    */
  </script>
</head>
```

### 单行注释
```html
<head>
  <script>
  //这是单行注释
  //换行后就不能起发生作用了
  </script>
</head>
```
### VScode快捷键
- 单行：ctrl+/
- 多行：ctrl+shift+/
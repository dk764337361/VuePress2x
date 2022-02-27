# 媒体查询

::: tip 提示
媒体查询 (Media Query) 是 CSS3 新语法。
:::

- 使用＠media 查询， 可以针对不同的媒体类型定义不同的样式。
- @media 可以针对不同的屏幕尺寸设置不同的样式。
- 当你重置浏览器大小的过程中， 页面也会根据浏览器的宽度和商度重新渲染页面。
- 目前针对很多苹果手机、 Android 手机，平板等设备都用得到多媒体查询。

## 语法规范

- 用＠media 开头注意＠符号
- mediatype 媒体类型
- 关键字 `and not only`
- media feature 媒体特性 必须有小括号包含

```css
@media mediatype and|not|only (media feature){
    CSS-Code;
}
```

## mediatype 媒体类型

- 将不同的终端设备划分成不同的类型，称为媒体类型

| 值     | 解释说明                           |
| ------ | ---------------------------------- |
| all    | 用与所有设置                       |
| print  | 用于打印机和打印预览               |
| screen | 用于电脑屏幕，平板电脑，智能手机等 |

## 关键字

关键字将媒体类型或多个媒体特性连接到一起做为媒体查询的条件。

- and:可以将多个媒体特性连接到一起相当于“且”的意思。
- not:排除某个媒体类型,相当于“非”的意思,可以省略。
- or:可以测试多个媒体查询的条件,只要有一个条件成立,就执行,“或”的意思。
- ony:指定某个特定的媒体类型,可以省略。

## 媒体特性

每种媒体类型都具体各自不同的特性，根据不同媒体类型的媒体特性设置不同的展示风格。
我们暂且了解三个。

::: tip 提示
他们要加小括号进行包含
:::

| 值        | 解释说明                           |
| --------- | ---------------------------------- |
| width     | 定义输出设备中页面可见区域的宽度   |
| min-width | 定义输出设备中页面最小可见区域宽度 |
| max-width | 定义输出设备中页面最大可见区域宽度 |

## 案例

```html{8-22}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /* 媒体查询： @media 媒体类型 关键字 媒体特性 */
      /* 在屏幕设备中，判断屏幕尺寸大于等于800px的时候，最小宽度是 800px */
      @media screen and (min-width: 800px) {
        /* 背景颜色为粉色 */
        body {
          background-color: pink;
        }
      }

      /* 媒体查询可以书写多个 */
      /* 在屏幕设备中，判断屏幕最大宽度为600px 时，背景颜色为绿色 */
      @media screen and (max-width: 600px) {
        body {
          background-color: green;
        }
      }
    </style>
  </head>
  <body></body>
</html>
```

# 响应数据格式

::: danger 提问

- 如果希望服务端返回一个复杂数据，该如何处理？
- 关心的问题就是服务端发出何种格式的数据，这种格式如何在客户端用 JavaScript 解析。
  :::

## XML

- 一种数据描述手段
- 老掉牙的东西，基本现在的项目不用了
- 淘汰的原因：数据冗余太多

```xml
<?xml verson="1.0" encoding="utf-8" ?>
<booklist>
  <book>
    <name>三国演义</name>
    <author>罗贯中</author>
    <cate>古典名著</cate>
  </book>
  <book>
    <name>西游记</name>
    <author>吴承恩</author>
    <cate>古典名著</cate>
  </book>
  <book>
    <name>红楼梦</name>
    <author>曹雪芹</author>
    <cate>古典名著</cate>
  </book>
</booklist>
<!-- xml 就是一种数据格式 -->
<!-- 元数据：用来描述数据的数据 -->
<!-- 这种数据的缺点：
1.元数据占用的数据量比较大的，不利于大量数据的网络传输
2.在其他语言中，比如 js，解析内部数据时，方法比较复杂，不方便使用 -->
```

## JSON

- JavaScript Object Notation,JavaScript 对象表示法
- 也是一种数据描述手段，类似于 JavaScript 字面量方式
- 服务端采用 JSON 格式返回数据，客户端按照 JSON 格式解析数据

- data.json

```json
{
  "name": "tom",
  "age": 19,
  "hobby": ["novel", "sing"]
}
```

### JSON 格式的数据，与 js 对象的区别

1. JSON 数据不需要存到变量中
2. 结束时不需要写分号
3. JSON 数据中的属性名必须加引号

### ES5 提供的 内置JSON对象

JSON 对象有两个方法：

1. JSON.stringify(参数)
1. JSON.parse(参数)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      // js 对象字面量
      var obj = {
        name: "tom",
        age: 19,
        cp: {
          name: "harry",
          age: 18,
        },
      };
      // JSON 格式的数据，与 js 对象的区别
      // 1.JSON 数据不需要存到变量中
      // 2.结束时不需要写分号
      // 3.JSON 数据中的属性名必须加引号

      var str = '{"name": "tom","age": 80}';

      // JSON 对象
      // console.log(JSON)

      console.log(obj);

      // 使用 JSON 对象的stringify 方法:将 对象格式 转换成 json格式的字符串。
      console.log(JSON.stringify(obj));

      // 使用 JSON 对象的parse方法: 将 json 格式的字符串转换成 对象格式，
      // 具有了属性和方法，方便我们在js 中进行使用
      console.log(JSON.parse(str));
      var strObj = JSON.parse(str);
      console.log(strObj.name);
      console.log(strObj.age);
    </script>
  </head>
  <body></body>
</html>
```

::: danger 注意
- 不管是 JSON 也好，还是 XML，只是在 AJAX 请求过程中用到，并不代表它们与 AJAX 之间有必然的联系，它们只是数据协议罢了。
- 不管服务端是采用 XML 还是采用 JSON 本质上都是将数据返回给客户端。
- 服务端应该根据响应内容的格式设置一个合理的 Content-Type。
:::
# 搭建 json 测试服务器

平时我们也会自己写一些数据，通过 Ajax 获取。所以，需要在本地搭建一个临时服务器。

## 使用 json-server

- json-server 是一个 Node 模块，运行 Express 服务器，你可以指定一个 json 文件作为 api 的数据源。
- 也就是说，我们可以使用它快速的搭建一个 web 服务器。
- [json-server 网址](https://github.com/typicode/json-server)

### 安装 json-server

```sh
npm install -g json-server
```

### 创建 db.json 测试文件

```json
{
  "posts": [{ "id": 1, "title": "json-server", "author": "typicode" }],
  "comments": [{ "id": 1, "body": "some comment", "postId": 1 }],
  "profile": { "name": "typicode" }
}
```

### 开启 json-server 服务

在 db.json 文件所在根目录下运行命令

```sh
json-server --watch db.json
```

<img src="/images/Ajax/04.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 成功啦

现在你可以通过 http://localhost:3000/posts/1, 你将得到

```json
{ "id": 1, "title": "json-server", "author": "typicode" }
```

## json 文件书写方法

- dbs.json

```json
{
  "users": [
    {
      "id": 1,
      "name": "tom",
      "age": 19,
      "class": 1
    },
    {
      "id": 2,
      "name": "jerry",
      "age": 18,
      "class": 2
    },
    {
      "id": 3,
      "name": "lucy",
      "age": 19,
      "class": 1
    },
    {
      "name": "lily",
      "age": "19",
      "class": "2",
      "id": 4
    },
    {
      "name": "lulu",
      "age": 18,
      "class": 2,
      "id": 5
    },
    {
      "name": "harry",
      "age": 18,
      "class": 1,
      "id": 6
    },
    {
      "name": "john",
      "age": "19",
      "class": "2",
      "id": 7
    }
  ],
  "posts": [
    {
      "id": 1,
      "userId": 1,
      "title": "javascript",
      "content": "js 是一门非常好学语言"
    },
    {
      "id": 2,
      "userId": 1,
      "title": "jquery",
      "content": "jq 是一门非常好学语言"
    },
    {
      "id": 3,
      "userId": 2,
      "title": "html",
      "content": "html 是一门非常好学语言"
    },
    {
      "id": 4,
      "userId": 3,
      "title": "css",
      "content": "css 是一门非常好学语言"
    }
  ],
  "comments": [
    {
      "id": 1,
      "postId": 1,
      "content": "good"
    },
    {
      "id": 2,
      "postId": 3,
      "content": "better"
    },
    {
      "id": 3,
      "postId": 4,
      "content": "best"
    }
  ]
}
```

### 使用

例如通过http://localhost:3000/users/1/posts，找到用户id为1的人posts（发表过）的内容

返回数据

```json
[
  {
    "id": 1,
    "userId": 1,
    "title": "javascript",
    "content": "js 是一门非常好学语言"
  },
  {
    "id": 2,
    "userId": 1,
    "title": "jquery",
    "content": "jq 是一门非常好学语言"
  }
]
``

# 代码块

## 代码块高亮

完成了基础搭建后，就可以在docs目录下新建 `.md` 文件写文章了（.md 是 Markdown 语法文件，你需要知道 Markdown 的一些基本写法，很简单，这里给大家一份 [Markdown 语法教程](https://www.runoob.com/markdown/md-tutorial.html)）

在 .md 文件中书写代码时，可在 \`\`\` 后增加 js、html、json等格式类型，代码块即可按照指定类型高亮

代码：
```md
    ``` js{3-4,7}
  export default {
    data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
    ```
```

效果：
``` js{3-4,7}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## 代码块切换

**输入**
````md 
<CodeGroup>
  <CodeGroupItem title="YARN">

```bash:no-line-numbers
yarn
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM" active>

```bash:no-line-numbers
npm install
```

  </CodeGroupItem>
</CodeGroup>
````

**输出**

<CodeGroup>
  <CodeGroupItem title="YARN">

```bash:no-line-numbers
yarn
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM" active>

```bash:no-line-numbers
npm install
```

  </CodeGroupItem>
</CodeGroup>

::: warning
你必须在 `<CodeGroupItem>` 的开始标签和代码块之间添加一个空行，否则代码块无法被 Markdown 正确解析。
:::

## 代码块无行号

**输入**
```md
    ```js :no-line-numbers
     123
     123
     123
    ```
```
**输出**

```js :no-line-numbers
     123
     123
     123
```

## 自定义容器

代码：
```
    ::: tip 提示
    this is a tip
    :::

    ::: warning 注意
    this is a tip
    :::

    ::: danger 警告
    this is a tip
    :::

    ::: details
    This is a details block, which does not work in Internet Explorer or Edge.
    :::
    
```

效果：
::: tip 提示
this is a tip
:::

::: warning 注意
this is a tip
:::

::: danger 警告
this is a tip
:::

::: details
This is a details block, which does not work in Internet Explorer or Edge.
:::
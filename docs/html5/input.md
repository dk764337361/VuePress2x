# HTML5 新增表单标签

## 表单属性

### HTML4.0 中的 input 类型

| 属性值   | 描述                                 |
| -------- | ------------------------------------ |
| text     | 单行文本输入框                       |
| password | 密码输入框                           |
| radio    | 单选框                               |
| checkbox | 复选框                               |
| button   | 普通按钮                             |
| reset    | 重置按钮                             |
| submit   | 提交按钮                             |
| Image    | 图像形式的按钮                       |
| file     | 定义输入字段和浏览"按钮,供文件上传。 |

### HTML5.0 中新增的的 input 类型

| 属性值        | 描述                        |
| ------------- | --------------------------- |
| type="email"  | 限制用户输入必须为email类型 |
| type="url"    | 限制用户输入必须为 URL 类型 |
| type="date"   | 限制用户输入必须为日期类型  |
| type="time"   | 限制用户输入必须为时间类型  |
| type="month"  | 限制用户输入必须为月类型    |
| type=week"    | 限制用户输入必须为周类型    |
| type="number" | 限制用户输入必须为数字类型  |
| type= range"  | 滑动条                      |
| type="tel"    | 手机号码                    |
| type="search" | 搜索框                      |
| type="color"  | 生成一个颜色选择表单        |


```html
<form action="">
  邮件：<input type="email" /><br />
  网址：<input type="url" /><br />
  日期：<input type="date" /><br />
  时间：<input type="time" /><br />
  月份：<input type="month" /><br />
  周份：<input type="week" /><br />
  数字：<input type="number" max="100" min="0" step="5" value="2" /><br />
  滑动条：<input type="range" /><br />
  手机号码：<input type="tel" /><br />
  搜索框：<input type="search" /><br />
  颜色选择：<input type="color" /><br />
  <input type="submit" />
</form>
```
<form action="">
        邮件：<input type="email"><br>
        网址：<input type="url"><br>
        日期：<input type="date"><br>
        时间：<input type="time"><br>
        月份：<input type="month"><br>
        周份：<input type="week"><br>
        数字：<input type="number" max="100" min="0" step="5" value="2"><br>
        滑动条：<input type="range"><br>
        手机号码：<input type="tel"><br>
        搜索框：<input type="search"><br>
        颜色选择：<input type="color"><br>
        <input type="submit">
</form>

## 输入标签`<datalist>`

- `<datalist>`标签规定了`<input>`元素可能的选项列表。
- `<datalist>`包含一组`<option>`元素，这些元素表示预定义可选值，在`<input>`元素输入过程中，会自动相应`<option>`元素的值。
- 绑定的`<input>`标签必须设置 list 属性，属性值等于`<datalist>`标签的 id 属性值。

::: tip 提示
`<option>`元素可写成单或双标签
:::

```html{2,3}
<form action="">
  城市<input type="text" list="city01" />
  <datalist id="city01">
    <option value="广州">gz</option>
    <option value="南京">nj</option>
    <option value="北京">bj</option>
    <option value="上海">sh</option>
    <option value="杭州"> </option>
  </datalist><br />
  <input type="submit" />
</form>
```

<form action="">
        城市：<input type="text" list="city01">
        <datalist id="city01">
            <option value="广州">gz</option>
            <option value="南京">nj</option>
            <option value="北京">bj</option>
            <option value="上海">sh</option>
            <option value="杭州"></option>
        </datalist><br>
        <input type="submit">
</form>

## 新增表单属性

| 属性       | 值       | 描述                                                                                                                                                                                         |
| ------------ | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| required     | required  | 表单拥有该属性：表示其内容不能为空,必填                                                                                                                                        |
| placeholder  | 提示文本 | 表单的提示信息,存在默认值将不显示                                                                                                                                              |
| autofocus    | autofocus | 自动聚焦属性,页面加载完成自动聚焦到指定表单,一般页面中放1个                                                                                                       |
| autocomplete | off/on    | 当用户在字段开始键入时,浏览器基于之前键入过的值,应该显示出在字段中填写的选项。默认已经打开,如 autocomplete="on关闭 autocomplete=”off。<br>- 需要放在表单内同时加上name属性<br>- 同时成功提交 |
| multiple     | multiple  | 可以多选文件提交                                                                                                                                                                       |

::: tip 提示
- 如果设置了value值，那么placeholder将不起作用。
- 表单必须提交后才能使 `autocomplete="on" name="sousuo"`起作用。
:::
```html
<form action="">
     姓名：<input type="text" required placeholder="请输入您的大名OK?" ><br>
     姓名：<input type="text" required placeholder="请输入您的大名OK?" value="陈大爷"><br>
     搜索框：<input type="search" autofocus autocomplete="on" name="search"><br>
     上传多个文件：<input type="file" multiple>
  <input type="submit">
</form>
```
<form action="">
     姓名：<input type="text" required placeholder="请输入您的大名OK?" ><br>
     姓名：<input type="text" required placeholder="请输入您的大名OK?" value="陈大爷"><br>
     搜索框：<input type="search" autofocus autocomplete="on" name="search"><br>
     上传多个文件：<input type="file" multiple>
  <input type="submit">
</form>
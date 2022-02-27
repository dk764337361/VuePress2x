# 事件

- 事件：在什么时候做什么事
- 执行机制：触发--响应机制
- 绑定事件(注册事件)三要素：

1. 事件源：给谁绑定事件
2. 事件类型：绑定什么类型的事件 click 单击
3. 事件函数：事件发生后执行什么内容，写在函数内部

## 事件监听

- JavaScript 解析器会给有绑定事件的元素添加一个监听，解析器会一直监测这个元素，只要
  触发对应的绑定事件，会立刻执行事件函数。

## 常用事件监听方法

- 方法 1：绑定 HTML 元素属性。
- 方法 2：绑定 DOM 对象属性。

## 常用的鼠标事件类型

- onclick 鼠标左键单击触发
- ondbclick 鼠标左键双击触发
- onmousedown 鼠标按键按下触发
- onmouseup 鼠标按键放开时触发
- onmousemove 鼠标在元素上移动触发

* onmouseover鼠标移动到元素上触发 
* onmouseout鼠标移出元素边界触发
  - [隐藏显示二维码](/Javascript/part3/DOM/case-style-class.md#隐藏显示二维码)
  - [隔行变色和高亮显示](/Javascript/part3/DOM/case-style-class.md#隔行变色和高亮显示)

* onfocus 鼠标获得焦点
* onblur 鼠标失去焦点
  - [搜索文本框](/Javascript/part3/DOM/forml.md#_3-搜索文本框)


## 案例

- 点击按钮弹出提示框

```html
<body>
 <!-- <input type="button" id="btn" value="点击有惊喜" onclick="alert('点我做什么？')"> -->
  <input type="button" id="btn" value="点击有惊喜" />
  <script>
    // 获取元素
    var btn = document.getElementById("btn");
    // 添加绑定事件
    btn.onclick = function() {
      // 定义的是事件被触发后要做的事情
      alert("点我干嘛？");
    };
  </script>
</body>
```

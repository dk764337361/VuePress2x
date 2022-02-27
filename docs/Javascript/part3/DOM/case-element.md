# 案例应用

## 动态创建列表

<img src="/images/Javascript/creatList.jpg" style="width: 30%; display:inline-block; margin: auto 0;">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>动态创建列表</h1>
    <div id="box">
      <!-- <ul>
      <li>刘备</li>
    </ul> -->
    </div>
    <script src="common.js"></script>
    <script>
      // 获取元素
      var box = my$("box");
      // 创建一组数据
      var names = ["刘备", "曹操", "孙权", "关羽"];
      // 生成 ul 元素
      var ul = document.createElement("ul");
      // 添加 元素 到 box内部
      box.appendChild(ul);
      // 根据数组的项数往 ul 中添加数据
      for (var i = 0; i < names.length; i++) {
        // 每次都要生成一个新的 li 标签元素
        var li = document.createElement("li");
        // 添加到 ul 对象内部
        ul.appendChild(li);
        // 给每个生成的 li 元素添加内容
        li.innerText = names[i];
      }
    </script>
  </body>
</html>
```

## 动态创建表格

<img src="/images/Javascript/creatTable.jpg" style="width: 50%; display:inline-block; margin: auto 0;">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      table {
        border-collapse: collapse;
      }
      thead {
        background-color: #ccc;
      }
      th,
      td {
        width: 100px;
        height: 40px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <h1>动态创建表格</h1>
    <table id="wrap" border="1">
      <thead>
        <tr>
          <th>姓名</th>
          <th>科目</th>
          <th>成绩</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody id="tb"></tbody>
    </table>
    <script src="common.js"></script>
    <script>
      // 获取元素
      var tb = my$("tb");
      // 模拟后台传输的数据
      var datas = [
        { name: "zs", subject: "语文", score: 80 },
        { name: "ls", subject: "数学", score: 87 },
        { name: "ww", subject: "英语", score: 90 },
        { name: "lb", subject: "物理", score: 89 },
        { name: "cc", subject: "生物", score: 100 },
        { name: "sq", subject: "化学", score: 98 },
      ];
      // 根据数组中的数据个数生成对应个数的 tr
      // 将生成 tr 添加到 tbody 中
      // 数组遍历
      for (var i = 0; i < datas.length; i++) {
        // 每一个数据都要生成一个 tr
        var tr = document.createElement("tr");
        // 添加到 tb 中
        tb.appendChild(tr);
        // 每一个 tr 中还需要添加对应的 td
        // 每一行 内部的 td 中的数据来自于 数组的每一项
        var data = datas[i]; //{name: "zs",subject: "语文",score: 80}
        // 遍历 data 对象，根据它的项数来确定添加的 td 的个数
        for (var k in data) {
          // 生成一个 td
          var td = document.createElement("td");
          // 添加到 tr 中去
          tr.appendChild(td);
          // 添加给每一个 td 数据
          td.innerText = data[k];
        }
        // 除了前面动态获取的数据 td 之外，还要添加一个删除的 td
        td = document.createElement("td");
        // 添加到 tr 中去
        tr.appendChild(td);
        // 最后一个 td 中需要添加一个 a 标签
        var a = document.createElement("a");
        a.innerText = "删除";
        a.href = "javascript:void(0);";
        // 将 a 添加到 td 中
        td.appendChild(a);
        // 给生成的每个 a 添加一个点击事件，移除当前所在的行
        a.onclick = function() {
          // 找到所在的行的 tr
          // this.parentNode.parentNode
          // 从 tbody 中移除对应的 tr
          tb.removeChild(this.parentNode.parentNode);
        };
      }
    </script>
  </body>
</html>
```

## 选择水果
<img src="/images/Javascript/fruit.gif" style="width: 100%; display:inline-block; margin: 0 ;">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
    <style>
      select {
        width: 200px;
        height: 200px;
        background-color: #33cccc;
        font-size: 20px;
      }
    </style>
  </head>

  <body>
    <select id="all" size="5" multiple="multiple">
      <option>苹果</option>
      <option>橘子</option>
      <option>梨</option>
      <option>西瓜</option>
      <option>水蜜桃</option>
    </select>

    <input type="button" value=">>" id="btn1" />
    <input type="button" value="<<" id="btn2" />
    <input type="button" value=">" id="btn3" />
    <input type="button" value="<" id="btn4" />

    <select id="choose" multiple="multiple"> </select>

    <script src="common.js"></script>
    <script>
      // 获取元素
      var all = my$("all");
      var choose = my$("choose");
      var btn1 = my$("btn1");
      var btn3 = my$("btn3");
      // 给第一个按钮添加点击事件，让 all 中的所有子元素移动到 choose 中
      btn1.onclick = function() {
        var opts = all.children; //内部的元素时动态添加的
        // 获取 all 中所有的子元素
        // 获取最开始的数组的个数
        var n = opts.length;
        // console.log(n);
        // 将所有的 opts 中的元素添加给 choose
        for (var i = 0; i < n; i++) {
          choose.appendChild(opts[0]);
        }
      };

      // 单选移动
      btn3.onclick = function() {
        var opts = all.children; //内部的元素时动态添加的
        // 移动的内容希望可以是固定的一个数组中的项
        var arr = [];
        // 通过判断条件，往 arr 中添加需要移动的元素
        for (var i = 0; i < opts.length; i++) {
          if (opts[i].selected === true) {
            arr.push(opts[i]);
          }
        }
        // 对需要移动的固定数组进行遍历
        for (var j = 0; j < arr.length; j++) {
          choose.appendChild(arr[j]);
          arr[j].selected = false;
        }
      };
    </script>
  </body>
</html>
```


## 选择水果-进阶版
- 完善按钮逻辑
- 新增模拟后台动态添加数据

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
    <style>
      select {
        width: 200px;
        height: 300px;
        background-color: #33cccc;
        font-size: 20px;
      }
    </style>
  </head>

  <body>
    <select id="all" size="5" multiple="multiple">
      <option>苹果</option>
      <option>橘子</option>
      <option>梨</option>
      <option>西瓜</option>
      <option>水蜜桃</option>
    </select>

    <input type="button" value=">>" id="btn1" />
    <input type="button" value="<<" id="btn2" />
    <input type="button" value=">" id="btn3" />
    <input type="button" value="<" id="btn4" />

    <select id="choose" multiple="multiple"></select>

    <script src="common.js"></script>
    <script>
      // 获取元素
      var all = my$("all");
      var choose = my$("choose");
      var btn1 = my$("btn1");
      var btn3 = my$("btn3");

      // 模拟后台传输的数据
      //动态添加select中的option数据
      var datas = ["桑葚", "雪梨", "牛油果"];
      for (var i = 0; i < datas.length; i++) {
        var options = document.createElement("option");
        all.appendChild(options);

        var data = datas[i];
        for (var k in data) {
          options.innerText = data[k];
        }
      }

      // 全选移动
      // 给第一个按钮添加点击事件，让 all 中的所有子元素移动到 choose 中
      btn1.onclick = function () {
        var opts = all.children; //内部的元素时动态添加的
        // 获取 all 中所有的子元素
        // 获取最开始的数组的个数
        var n = opts.length;
        // console.log(n);
        // 将所有的 opts 中的元素添加给 choose
        for (var i = 0; i < n; i++) {
          choose.appendChild(opts[0]);
        }
      };
      btn2.onclick = function () {
        var opts = choose.children; //内部的元素时动态添加的
        // 获取 all 中所有的子元素
        // 获取最开始的数组的个数
        var n = opts.length;
        // console.log(n);
        // 将所有的 opts 中的元素添加给 choose
        for (var i = 0; i < n; i++) {
          all.appendChild(opts[0]);
        }
      };

      // 单选移动
      btn3.onclick = function () {
        var opts = all.children; //内部的元素时动态添加的
        // 移动的内容希望可以是固定的一个数组中的项
        var arr = [];
        // 通过判断条件，往 arr 中添加需要移动的元素
        for (var i = 0; i < opts.length; i++) {
          if (opts[i].selected === true) {
            arr.push(opts[i]);
          }
        }
        // 对需要移动的固定数组进行遍历
        for (var j = 0; j < arr.length; j++) {
          choose.appendChild(arr[j]);
          arr[j].selected = false;
        }
      };

      btn4.onclick = function () {
        var opts = choose.children; //内部的元素时动态添加的
        // 移动的内容希望可以是固定的一个数组中的项
        var arr = [];
        // 通过判断条件，往 arr 中添加需要移动的元素
        for (var i = 0; i < opts.length; i++) {
          if (opts[i].selected === true) {
            arr.push(opts[i]);
          }
        }
        // 对需要移动的固定数组进行遍历
        for (var j = 0; j < arr.length; j++) {
          all.appendChild(arr[j]);
          arr[j].selected = false;
        }
      };
    </script>
  </body>
</html>

```
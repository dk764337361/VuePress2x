# 表单元素属性

- value 用于大部分表单元素的内容获取(option 除外)
- type 可以获取 input 标签的类型(输入框或复选框等)
- disabled 禁用属性
- checked 复选框选中属性
- selected 下拉菜单选中属性
- 注意：在 DOM 中元素对象的属性值只有一个时，会被转成布尔值显示。
  例如：txt.disabled = true;

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <input type="button" value="按钮" id="btn" /><br />
    <input type="text" id="txt" />
    <select id="list">
      <option value="beijing">北京</option>
      <option value="shanghai">上海</option>
    </select>
    <script>
      // 获取元素
      var btn = document.getElementById("btn");
      var txt = document.getElementById("txt");
      var list = document.getElementById("list");
      var opts = list.getElementsByTagName("option");

      // value 属性
      // console.log(btn.value);
      // console.log(txt.value);
      // console.log(opts[0].value);
      // console.log(opts[0].innerHTML);

      // 更改 input 标签的 value
      // btn.value = "点击";
      // txt.value = "请输入内容"

      // 表单元素特有的一些属性，属性名和属性值是一致的
      // <input type="text" id="txt" disabled="disabled"/>
      // console.log(txt.disabled);
      btn.disabled = true;
    </script>
  </body>
</html>
```

## 案例

### 1. 检测用户名是否是 3-6 位，密码是否是 6-8 位，如果不满足要求高亮显示文本框

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      .bg {
        background: yellow;
      }
    </style>
  </head>
  <body>
    <input type="text" id="name" /><br />
    <input type="text" id="pw" /><br />
    <input type="button" id="btn" value="提交" />
    <script>
      // 检测用户名是否是3-6位，密码是否是6-8位，如果不满足要求高亮显示文本框
      // 1.获取元素
      var btn = document.getElementById("btn");

      // 2.给按钮添加点击事件，然后判断位数是否足够
      btn.onclick = function() {
        // 在事件触发后，去获取对象，内部的数据才是最新
        var name = document.getElementById("name");
        var pw = document.getElementById("pw");
        // 用户名位数是否在 3-6 位，不满足需要高亮显示
        if (name.value.length < 3 || name.value.length > 6) {
          name.className = "bg";
          return;
        } else {
          name.className = "";
        }
        // 密码的位数必须在 6-8 位之间，否则高亮显示
        if (pw.value.length < 6 || pw.value.length > 8) {
          pw.className = "bg";
          return;
        } else {
          pw.className = "";
        }
        // 提交数据
        console.log("提交数据");
      };
    </script>
  </body>
</html>
```

### 2. 随机选择下拉框中的选中项

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <input type="button" value="选择" id="btn" />
    <br />
    <select id="food">
      <option>烤肉</option>
      <option>拉面</option>
      <option>麻辣烫</option>
      <option>小龙虾</option>
      <option>火锅</option>
      <option>外卖</option>
    </select>
    <script>
      // 1.获取元素
      var btn = document.getElementById("btn");
      var food = document.getElementById("food");
      var opts = food.getElementsByTagName("option");

      // 2.给按钮添加点击事件
      btn.onclick = function() {
        // 3.随机选择一个 option
        // 每次点击需要获取一个 opts 数组的随机下标
        // Math.random()   [0,1)
        // Math.random()*6   [0,6)
        var n = Math.floor(Math.random() * opts.length);
        // console.log(n);
        // 设置对应的随机项的属性
        opts[n].selected = true;
      };
    </script>
  </body>
</html>
```

### 3. 搜索文本框

- 用到的 DOM 事件 API：
  - onfocus 鼠标获得焦点
  - onblur 鼠标失去焦点

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <style>
      .gray {
        color: gray;
      }

      .black {
        color: black;
      }
    </style>
  </head>

  <body>
    <input type="text" class="gray" value="请输入搜索关键字" id="txtSearch" />
    <input type="button" value="搜索" id="btnSearch" />
    <script>
      // 获取元素
      var txtSearch = document.getElementById("txtSearch");
      // 1.获得焦点时，可以使用一个 onfocus，如果文本框内容是默认 请输入搜索关键字，需要清空文字，让文字加载黑色
      txtSearch.onfocus = function() {
        // 判断是否是默认的提示文字
        if (this.value === "请输入搜索关键字") {
          this.value = "";
          this.className = "black";
        }
      };
      // 2.失去焦点时，可以使用一个 onblur，如果文本框内容为空，需要改为默认提示内容 请输入搜索关键字，让文字颜色变为灰色
      txtSearch.onblur = function() {
        // 如果用户输入的内容正好与默认提示文本相同，失去焦点时，也应该让文字颜色变为灰色
        // 判断内容是否为空
        if (this.value === "" || this.value === "请输入搜索关键字") {
          this.value = "请输入搜索关键字";
          this.className = "gray";
        }
      };
    </script>
  </body>
</html>
```

### 4. 全选反选

```html

<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style>
        * {
            padding: 0;
            margin: 0;
        }

        .wrap {
            width: 300px;
            margin: 100px auto 0;
        }

        table {
            border-collapse: collapse;
            border-spacing: 0;
            border: 1px solid #c0c0c0;
            width: 300px;
        }

        th,
        td {
            border: 1px solid #d0d0d0;
            color: #404060;
            padding: 10px;
        }

        th {
            background-color: #09c;
            font: bold 16px "微软雅黑";
            color: #fff;
        }

        td {
            font: 14px "微软雅黑";
        }

        tbody tr {
            background-color: #f0f0f0;
        }

        tbody tr:hover {
            cursor: pointer;
            background-color: #fafafa;
        }
    </style>

</head>
<body>
  <div class="wrap">
      <table>
          <thead>
            <tr>
                <th>
                    <input type="checkbox" id="all" />
                </th>
                <th>商品</th>
                <th>价钱</th>
            </tr>
          </thead>
          <tbody id="tb">
            <tr>
                <td>
                    <input type="checkbox" />
                </td>
                <td>iPhone8</td>
                <td>8000</td>
            </tr>
            <tr>
                <td>
                    <input type="checkbox" />
                </td>
                <td>iPad Pro</td>
                <td>5000</td>
            </tr>
            <tr>
                <td>
                    <input type="checkbox" />
                </td>
                <td>iPad Air</td>
                <td>2000</td>
            </tr>
            <tr>
                <td>
                    <input type="checkbox" />
                </td>
                <td>Apple Watch</td>
                <td>2000</td>
            </tr>

          </tbody>
      </table>
      <input type="button" value="  反 选  " id="btn">
  </div>
  <script>
    // 获取元素
    var all = document.getElementById("all");
    var tb = document.getElementById("tb");
    var btn = document.getElementById("btn");
    var tb_inputs = tb.getElementsByTagName("input");

    // 1.全选:让子选项的选择效果始终与全选保持一致
    all.onclick = function () {
        // 遍历所有的子选项
        for (var i = 0 ; i < tb_inputs.length ; i++) {
            // 让每一个子选项的 checked 属性值与全选保持一致
            tb_inputs[i].checked = all.checked;
        }
    };
    // 2.单独选择子选项过程
    // 给每一次点击任何一个子选项进行判断
    for (var i = 0 ; i < tb_inputs.length ; i++) {
        tb_inputs[i].onclick = function () {
            // 需要判断所有的子选项是否都是选中的状态，如果都选中，让全选被选中，如果有的没有被选中，让全选取消选择
            allChecked();
        }
    }
    // 3.反选
    btn.onclick = function () {
        // 让所有子选项与之前的状态相反
        for (var i = 0 ; i < tb_inputs.length ; i++) {
            // 让属性值取原来相反的值
            tb_inputs[i].checked = !tb_inputs[i].checked;
        }
        // 控制全选效果，也需要进行取反
        allChecked();
    };
    // 定义一个 all 是否被选中的函数
    function allChecked() {
        // 使用一个中间过渡变量，初始认为所有的子选项都是被选中的
        var isAllChecked = true;
        // 遍历所有子选项，进行判断
        for (var j = 0 ; j < tb_inputs.length ; j++) {
            // 一旦有一个是没有被选择的，让变量变为 false
            if (tb_inputs[j].checked === false) {
                isAllChecked = false;
                // 只要走到这里，说明肯定不是全选，不需要往下执行循环
                break;
            }
        }
        // 如果循环内部条件永远不成立，说明所有子选项都是被选中，isAllChecked 的值没有发生变化，还是 true
        // 给 all 元素设置 checked 属性
        all.checked = isAllChecked;
    }
  </script>
</body>
</html>

```

# display-table表格布局
<img src="/images/css/114.png" style="width: 100%; display: block; margin: 0 ;">

::: details 点击查看代码
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    *{
       margin: 0;
       padding: 0;
    }
    .box {
      display: table;
      width: 100%;
      min-width: 980px;
      border: 1px solid #000;
    }
    .title {
      display: table-caption;
    }
    .thead {
      display: table-header-group;
    }
    .thead .thr {
      display: table-row;
    }
    .thead .thr .th {
      display: table-cell;
      width: 25%;
      height: 40px;
      border: 1px dashed red;
    }
    .tbody {
      display: table-row-group;
    }
    .tbody .tdr {
      display: table-row;
    }
    .tbody .tdr .td {
      display: table-cell;
      width: 25%;
      height: 40px;
      border: 1px dashed green;
    }
    .col {
      display: table-column;
      background-color: pink;
    }
  </style>
</head>
<body>
  <div class="box">
    <div class="title">这是表格的标题</div>
    <div class="col"></div>
    <div class="col"></div>
    <div class="thead">
      <div class="thr">
        <div class="th"></div>
        <div class="th"></div>
        <div class="th"></div>
        <div class="th"></div>
      </div>
    </div>
    <div class="tbody">
      <div class="tdr">
        <div class="td"></div>
        <div class="td"></div>
        <div class="td"></div>
        <div class="td"></div>
      </div>
      <div class="tdr">
        <div class="td"></div>
        <div class="td"></div>
        <div class="td"></div>
        <div class="td"></div>
      </div>
      <div class="tdr">
        <div class="td"></div>
        <div class="td"></div>
        <div class="td"></div>
        <div class="td"></div>
      </div>
      <div class="tdr">
        <div class="td"></div>
        <div class="td"></div>
        <div class="td"></div>
        <div class="td"></div>
      </div>
    </div>
  </div>
</body>
</html>
```
:::
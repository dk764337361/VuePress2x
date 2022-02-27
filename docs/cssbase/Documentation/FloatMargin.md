# 浮动的元素没有margin 塌陷

margin 塌陷现象出现在标准流中的，浮动元素已经脱离标准流，不再具有 margin 塌陷现象。

<img src="/images/css/045.png" style="width: 70%; display: block; margin: 0 ;">
<CodeGroup>
  <CodeGroupItem title="标准流">

```bash
.box{
  width:200px;
  height:400px;
  border:2px soild black;
}
.div1 {
  width:100px;
  height:100px;
  background-color:rgb(8,255,21);
  margin: 50px;
}
.div2 {
 /* float:left;*/
  width:100px;
  height:100px;
  background-color:rgb(8,255,21);
  margin: 50px;
}
```
  </CodeGroupItem>

  <CodeGroupItem title="浮动" active>

```bash
.box{
  width:200px;
  height:400px;
  border:2px soild black;
}
.div1 {
  width:100px;
  height:100px;
  background-color:rgb(8,255,21);
  margin: 50px;
}
.div2 {
  float:left;
  width:100px;
  height:100px;
  background-color:rgb(8,255,21);
  margin: 50px;
}
```

  </CodeGroupItem>
</CodeGroup>


# span 换行

<img src="/images/css/span.png" style="width: 50%; display: block;">

```html{58-65}
<div class="small-ad-complex">
  <div class="small-square">
    <p class="complex-logo">
      <a href="#">
        <img src="images/1450855246-61162.png" alt="" />
        <span>M码通道</span>
      </a>
    </p>
  </div>
  <div class="small-square">
    <p class="complex-logo">
      <a href="#">
        <img src="images/1450855279-64872.png" alt="" />
        <span>以旧换新</span>
      </a>
    </p>
  </div>
  <div class="small-square">
    <p class="complex-logo">
      <a href="#">
        <img src="images/1450855198-58056.png" alt="" />
        <span>魅族意外保</span>
      </a>
    </p>
  </div>
  <div class="small-square">
    <p class="complex-logo">
      <a href="#">
        <img src="images/1451960447-93534.png" alt="" />
        <span>回购单查询</span>
      </a>
    </p>
  </div>
</div>
<style>
  .small-ad .small-ad-c .small-ad-complex {
    float: left;
    width: 240px;
    height: 140px;
  }
  .small-ad .small-ad-c .small-ad-else {
    margin-left: 10px;
  }
  .small-ad .small-ad-c .small-ad-complex .small-square {
    float: left;
    width: 120px;
    height: 70px;
    font-size: 12px;
    text-align: center;
    background-color: #f9f9f9;
  }
  .small-ad .small-ad-c .small-ad-complex .small-square .complex-logo a img {
    margin-top: 15px;
    width: 24px;
    height: 24px;
  }
  .small-ad .small-ad-c .small-ad-complex .small-square .complex-logo span {
    line-height: 17px;
    height: 24px;
    display: block;
    width: auto;
    word-break: normal;
    word-wrap: break-word;
    white-space: pre-wrap;
    overflow: hidden;
  }
</style>
```

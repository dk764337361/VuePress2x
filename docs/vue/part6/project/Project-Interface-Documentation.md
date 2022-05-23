"
请求接口格式：基地址 + 接口地址

响应类型统一为 JSON，后续不再单独标注

基地址：https://shop.fed.lagounews.com/api

​

首页接口
首页数据
接口地址：/v2/diy/get_diy/moren

请求方式：GET

请求参数：无

响应数据说明：

status：响应状态
msg：状态文本
data：数据
swipeBg：轮播图
default.imgList.list 数据
menus：菜单列表
default.imgList.list 数据
newsData 公告信息
default.newList.list 数据
logo 图
接口地址：/wechat/get_logo

请求方式：GET

请求参数：无

响应数据说明：

logo_url：logo 图地址
商品接口
获取商品列表
接口地址：/products

请求方式：GET

请求参数：

page：页号
limit：每页个数
响应数据说明：

status
msg
data
id 商品 ID
image 商品图
store_name 商品名
price：价格
sales：销量
获取商品详情
接口地址：/product/detail/:productId

:productId 应设置为要获取详情的商品 ID
请求方式：GET

请求参数：无

响应数据说明：

storeInfo：商品信息
sliderImage：轮播图
price：价格
store_name：标题
ot_price：原价
stock：库存
unit_name：单位
fsales：销量
replyCount：评论数
replyChance：好评率
reply：评论内容
good_list：推荐商品
productAttr：规格信息
attr_name：规格分类
attr_values：规格名称
productValue：sku 数据
image：sku 图
price：sku 价格
stock：sku 库存
unique：sku ID
评价接口
获取评价个数
接口地址：/reply/config/:productId

:productId 应设置为要获取评价的商品 ID
请求方式：GET

请求参数：无

响应数据说明：

good_count：好评数
in_count：中评数
poor_count：差评数
reply_chance：好评率
reply_star：星级
sum_count：总评价数
根据分类获取评价
接口地址：/reply/list/:productId

:productId 应设置为要获取评价的商品 ID
请求方式：GET

请求参数：

type：请求的评价类别 0 - 全部 1 - 好评 2 - 中评 3 - 差评
响应数据说明：

avatar：用户头像
nickname：用户昵称
add_time：评价时间
sku：商品 sku
comment：评价内容
star：星级
pics：评价图
用户接口
获取用户验证码
接口地址：/verify_code

请求方式：GET

请求参数：无

响应数据说明：

key：用户验证码
获取短信验证码
接口地址：/register/verify

请求方式：POST

请求参数：

key：用户验证码
phone：手机号
type：验证码类型 login 为登录
响应数据说明：

密码登录请求
接口地址：/login

请求方式：POST

请求参数：

account：账号
password：密码
响应数据说明：

验证码登录请求
接口地址：/login/mobile

请求方式：POST

请求参数：

captcha：验证码
phone：手机号
响应数据说明：

获取用户页信息
接口地址：/user

请求方式：GET

请求参数：无

响应数据说明：

switchUserInfo[0].avatar：用户头像
nickname：昵称
uid：用户 ID
collectCount：收藏数
integral：积分
couponCount：优惠券个数
now_money：余额
orderStatusNum：订单数
unpaid_count：待付款个数
unshipped_count：待发货个数
received_count：待收货个数
evaluated_count：待评价个数
complete_count：已完成个数
购物车接口
加入购物车
接口地址：/cart/add

请求方式：POST

请求参数：

new：提交状态，0 为加入购物车，1 为立即购买
uniqueId：sku ID
productId：商品 ID
cartNum：加入个数
响应数据说明：

cartId：购物车 ID
获取购物车数据
接口地址：/cart/list

请求方式：GET

请求参数（可用于实现购物车商品过多时的触底加载功能）：

page：页数
limit：每页个数
响应数据说明：

valid：购物车数据
id：购物车中的项目 ID
product_id：商品 ID
cart_num：个数
truePrice：价格
trueStock：库存
productInfo：商品信息
image：商品图
store_name：商品标题
修改商品个数
接口地址：/cart/num

请求方式：POST

请求参数：

id：购物车项目 ID
number：个数
响应数据说明：

订单接口
获取确认订单信息
接口地址：/order/confirm

请求方式：POST

请求参数：

cartId：要结算的购物车项目 ID，多个 ID 以逗号连接，如 1,2,3
new：表示订单类型，0 表示购物车结算订单，1 表示立即购买订单
响应数据说明：

cartInfo：购物车信息
id：购物车项目 ID
productInfo
image：商品图
store_name：商品名称
truePrice：商品价格
cart_num：商品个数
priceGroup
totalPrice：总价
userInfo
nowMoney：用户余额
orderKey：待确认订单 ID
创建订单
接口地址：/order/create/:orderKey

orderKey：待确认订单 ID
请求方式：POST

请求参数：

addressId：收货地址 ID
payType：支付方式
响应数据说明：

获取订单列表
接口地址：/order/list

请求方式：GET

请求参数：无

响应数据说明：

_status：
_type：订单类型，0 - 待付款，1 - 待发货，2 - 待收货，3 - 待评价，4 - 已完成
order_id：订单 ID
cartInfo：
cart_num：商品个数
truePrice：商品价格
store_name：商品名称
image：商品图
pay_price：订单价格
根据 ID 获取订单详情
接口地址：/order/detail/:orderId

orderId 需从订单列表中获取
请求方式：GET

请求参数：无

响应数据：参考上一接口

地址接口
获取用户收件地址
接口地址：/address/list

请求方式：GET

请求参数（可用于实现地址过多时的触底加载功能）：

page：页号
limit：每页个数
响应数据说明：

id：地址 ID
province：省份
city：城市
city_id：城市 ID
district：区县
detail：详细地址
is_default：是否为默认地址
real_name：收货人姓名
phone：手机号
获取省市区列表
接口地址：/city_list

请求方式：GET

请求参数：无

响应数据说明：

c：子节点，省的子节点为市，市的子节点为区
n：节点名称
v：节点 ID
新增或编辑地址
接口地址：/address/edit

请求方式：POST

请求参数：

address
id：地址 ID
province：省份
city：城市
city_id：城市 ID
district：区县
detail：详细地址
is_default：是否为默认地址
phone：手机号
real_name：收件人姓名
响应数据说明：

id：地址 ID
"
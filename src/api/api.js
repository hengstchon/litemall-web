module.exports = {
  IndexUrl: 'home/index', //首页数据接口
  AboutUrl: 'home/about', //介绍信息

  CatalogList: 'catalog/index', //分类目录全部分类数据接口
  CatalogCurrent: 'catalog/current', //分类目录当前分类数据接口

  AuthLoginByWeixin: 'auth/login_by_weixin', //微信登录
  AuthLoginByAccount: 'auth/login', //账号登录
  AuthLogout: 'auth/logout', //账号登出
  AuthRegister: 'auth/register', //账号注册
  AuthReset: 'auth/reset', //账号密码重置
  AuthRegisterCaptcha: 'auth/regCaptcha', //验证码
  AuthBindPhone: 'auth/bindPhone', //绑定微信手机号
  AuthInfo: 'auth/info', // 用户信息
  AuthSave: 'auth/profile', // 账号信息更新

  GoodsCount: 'goods/count', //统计商品总数
  GoodsList: 'goods/list', //获得商品列表
  GoodsCategory: 'goods/category', //获得分类数据
  GoodsDetail: 'goods/detail', //获得商品的详情
  GoodsRelated: 'goods/related', //商品详情页的关联商品（大家都在看）

  BrandList: 'brand/list', //品牌列表
  BrandDetail: 'brand/detail', //品牌详情

  CartList: 'cart/index', //获取购物车的数据
  CartAdd: 'cart/add', // 添加商品到购物车
  CartFastAdd: 'cart/fastadd', // 立即购买商品
  CartUpdate: 'cart/update', // 更新购物车的商品
  CartDelete: 'cart/delete', // 删除购物车的商品
  CartChecked: 'cart/checked', // 选择或取消选择商品
  CartGoodsCount: 'cart/goodscount', // 获取购物车商品件数
  CartCheckout: 'cart/checkout', // 下单前信息确认

  CollectList: 'collect/list', //收藏列表
  CollectAddOrDelete: 'collect/addordelete', //添加或取消收藏

  CommentList: 'comment/list', //评论列表
  CommentCount: 'comment/count', //评论总数
  CommentPost: 'comment/post', //发表评论

  TopicList: 'topic/list', //专题列表
  TopicDetail: 'topic/detail', //专题详情
  TopicRelated: 'topic/related', //相关专题

  SearchIndex: 'search/index', //搜索关键字
  SearchResult: 'search/result', //搜索结果
  SearchHelper: 'search/helper', //搜索帮助
  SearchClearHistory: 'search/clearhistory', //搜索历史清楚

  AddressList: 'address/list', //收货地址列表
  AddressDetail: 'address/detail', //收货地址详情
  AddressSave: 'address/save', //保存收货地址
  AddressDelete: 'address/delete', //保存收货地址

  ExpressQuery: 'express/query', //物流查询

  OrderSubmit: 'order/submit', // 提交订单
  OrderPrepay: 'order/prepay', // 订单的预支付会话
  OrderList: 'order/list', //订单列表
  OrderDetail: 'order/detail', //订单详情
  OrderCancel: 'order/cancel', //取消订单
  OrderRefund: 'order/refund', //退款取消订单
  OrderDelete: 'order/delete', //删除订单
  OrderConfirm: 'order/confirm', //确认收货
  OrderGoods: 'order/goods', // 代评价商品信息
  OrderComment: 'order/comment', // 评价订单商品信息

  AftersaleSubmit: 'aftersale/submit', // 提交售后申请
  AftersaleList: 'aftersale/list', // 售后列表
  AftersaleDetail: 'aftersale/detail', // 售后详情

  FeedbackAdd: 'feedback/submit', //添加反馈
  FootprintList: 'footprint/list', //足迹列表
  FootprintDelete: 'footprint/delete', //删除足迹

  GroupOnList: 'groupon/list', //团购列表
  GroupOnMy: 'groupon/my', //团购API-我的团购
  GroupOnDetail: 'groupon/detail', //团购API-详情
  GroupOnJoin: 'groupon/join', //团购API-详情

  CouponList: 'coupon/list', //优惠券列表
  CouponMyList: 'coupon/mylist', //我的优惠券列表
  CouponSelectList: 'coupon/selectlist', //当前订单可用优惠券列表
  CouponReceive: 'coupon/receive', //优惠券领取
  CouponExchange: 'coupon/exchange', //优惠券兑换

  StorageUpload: 'storage/upload', //图片上传,

  UserIndex: 'user/index', //个人页面订单数量角标
  IssueList: 'issue/list', //帮助信息
}

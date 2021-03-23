import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      index: 1,
    },
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/home/Home.vue'),
  },
  {
    path: '/catalog/:id?',
    name: 'catalog',
    meta: {
      index: 1,
      keepAlive: true,
    },
    component: () =>
      import(/* webpackChunkName: "catalog" */ '../views/catalog/Catalog.vue'),
  },
  {
    path: '/cart',
    name: 'cart',
    meta: {
      index: 1,
    },
    component: () =>
      import(/* webpackChunkName: "cart" */ '../views/cart/Cart.vue'),
  },
  {
    path: '/checkout',
    name: 'checkout',
    meta: {
      index: 1,
    },
    component: () =>
      import(/* webpackChunkName: "checkout" */ '../views/order/Checkout.vue'),
  },
  {
    path: '/checkout-result',
    name: 'checkoutResult',
    meta: {
      index: 1,
    },
    component: () =>
      import(
        /* webpackChunkName: "checkoutResult" */ '../views/order/CheckoutResult.vue'
      ),
  },
  {
    path: '/search',
    name: 'search',
    meta: {
      index: 2,
      keepAlive: true,
    },
    component: () =>
      import(/* webpackChunkName: "search" */ '../views/search/Search.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      index: 2,
    },
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/user/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      index: 2,
    },
    component: () =>
      import(/* webpackChunkName: "register" */ '../views/user/Register.vue'),
  },
  {
    path: '/category/:id',
    name: 'category',
    meta: {
      index: 3,
    },
    component: () =>
      import(
        /* webpackChunkName: "category" */ '../views/catalog/Category.vue'
      ),
  },
  {
    path: '/product/:id',
    name: 'product',
    meta: {
      index: 3,
    },
    component: () =>
      import(
        /* webpackChunkName: "product" */ '../views/catalog/ProductDetail.vue'
      ),
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      index: 1,
    },
    component: () =>
      import(/* webpackChunkName: "user" */ '../views/user/User.vue'),
  },
  {
    path: '/order',
    name: 'order',
    meta: {
      index: 2,
    },
    component: () =>
      import(/* webpackChunkName: "order" */ '../views/order/Order.vue'),
  },
  {
    path: '/order-detail',
    name: 'order-detail',
    meta: {
      index: 3,
    },
    component: () =>
      import(
        /* webpackChunkName: "order-detail" */ '../views/order/OrderDetail.vue'
      ),
  },
  {
    path: '/setting',
    name: 'setting',
    meta: {
      index: 2,
    },
    component: () =>
      import(/* webpackChunkName: "setting" */ '../views/user/Setting.vue'),
  },
  {
    path: '/address',
    name: 'address',
    meta: {
      index: 2,
    },
    component: () =>
      import(/* webpackChunkName: "address" */ '../views/user/Address.vue'),
  },
  {
    path: '/address-edit',
    name: 'address-edit',
    meta: {
      index: 3,
    },
    component: () =>
      import(
        /* webpackChunkName: "address-edit" */ '../views/user/AddressEdit.vue'
      ),
  },
  {
    path: '/footprint',
    name: 'footprint',
    meta: {
      index: 2,
    },
    component: () =>
      import(/* webpackChunkName: "footprint" */ '../views/user/FootPrint.vue'),
  },
  {
    path: '/collect',
    name: 'collect',
    meta: {
      index: 2,
    },
    component: () =>
      import(/* webpackChunkName: "collet" */ '../views/user/Collect.vue'),
  },
  {
    path: '/help',
    name: 'help',
    meta: {
      index: 2,
    },
    component: () =>
      import(/* webpackChunkName: "help" */ '../views/user/Help.vue'),
  },
  {
    path: '/feedback',
    name: 'feedback',
    meta: {
      index: 2,
    },
    component: () =>
      import(/* webpackChunkName: "feedback" */ '../views/user/Feedback.vue'),
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      index: 2,
    },
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/user/About.vue'),
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
})

export default router

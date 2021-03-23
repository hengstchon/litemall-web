<template>
  <van-tabbar route z-index="30" active-color="#ee0a24" v-model="activeTab">
    <van-tabbar-item icon="wap-home" name="home" to="/home"
      >首页</van-tabbar-item
    >
    <van-tabbar-item icon="shop" name="catalog" to="/catalog"
      >分类</van-tabbar-item
    >
    <van-tabbar-item icon="cart" name="cart" to="/cart">购物车</van-tabbar-item>
    <van-tabbar-item icon="manager" name="user" to="/user"
      >我的</van-tabbar-item
    >
  </van-tabbar>
</template>

<script>
import { getLocalStorage } from "../utils/utils";
import { Tabbar, TabbarItem } from "vant";

export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  mounted() {
    const { token } = getLocalStorage("token");
  },
  data() {
    return { activeTab: "" };
  }
};
</script>

<style scoped >
</style>

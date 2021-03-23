<template>
  <div>
    <!-- header -->
    <div class="bg-primary flex items-center fixed inset-x-0 top-0 z-50 px-3">
      <router-link class="w-6 text-white" to="./catalog">
        <!-- menu icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </router-link>
      <div class="flex-auto">
        <van-search
          shape="round"
          background="#ee0a24"
          :placeholder="`商品搜索, 共 ${goodsCount} 款好物`"
          input-align="center"
          @click="$router.push({ name: 'search' })"
        />
      </div>
      <router-link class="text-white text-sm" to="./login" v-if="!isLogin"
        >登录</router-link
      >
      <router-link class="w-6 text-white" to="./user" v-else>
        <!-- user icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </router-link>
    </div>

    <van-swipe class="swipe" :autoplay="5000">
      <van-swipe-item v-for="(item, index) in shopInfos.banner" :key="index">
        <img class="w-full" :src="item.url" alt="" />
      </van-swipe-item>
    </van-swipe>

    <van-grid :column-num="5">
      <van-grid-item
        v-for="(channel, index) in shopInfos.channel"
        :key="index"
        :icon="channel.iconUrl"
        :text="channel.name"
        @click="onClickChannel(channel.id)"
      />
    </van-grid>

    <!-- 新品上线 -->
    <div>
      <div class="header">新品上线</div>
      <ProductCardList :productList="shopInfos.newGoodsList" />
    </div>

    <!-- 人气推荐 -->
    <div class="pb-16 bg-bg">
      <header class="header">人气推荐</header>
      <ProductCardList :productList="shopInfos.hotGoodsList" />
    </div>

    <Tabbar />
  </div>
</template>

<script>
import { Swipe, SwipeItem, Search } from "vant";
import { getHome } from "@/api/home";
import { getGoodsCount } from "@/api/goods";
import { getLocalStorage } from "@/utils/utils";
import Tabbar from "@/components/Tabbar";
import ProductCardList from "@/components/ProductCardList";

export default {
  name: "home",
  components: {
    [Search.name]: Search,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    Tabbar,
    ProductCardList
  },
  data() {
    return {
      isLogin: false,
      shopInfos: [],
      goodsCount: null
    };
  },
  async created() {
    const { token } = getLocalStorage("token");
    if (token) {
      this.isLogin = true;
    }
    this.$toast.loading({
      message: "加载中...",
      forbidClick: true
    });
    this.initViews();
    this.$toast.clear();
  },
  methods: {
    initViews() {
      getHome().then(res => {
        this.shopInfos = res.data.data;
      });
      getGoodsCount().then(res => {
        this.goodsCount = res.data.data;
      });
    },
    async onClickChannel(id) {
      this.$router.push(`/category/${id}`);
    },
    goToDetail(item) {
      this.$router.push({ path: `product/${item.goodsId}` });
    },
    goDetail(id) {
      return `#/items/detail/${id}`;
    }
  }
};
</script>

<style scoped>
.swipe {
  margin-top: 54px;
}
.header {
  @apply text-center text-xl font-medium pt-10 pb-5 text-red-400;
}
</style>

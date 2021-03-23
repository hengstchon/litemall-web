<template>
  <div class="">
    <van-nav-bar
      title="我的订单"
      left-arrow
      @click-left="$router.push('/user')"
    />

    <van-tabs
      class=""
      v-model="showType"
      sticky
      :title-active-color="'#ee0a24'"
      @change="onChangeTab"
    >
      <van-tab title="全部" name="0"></van-tab>
      <van-tab title="待发货" name="2"></van-tab>
      <van-tab title="已发货" name="3"></van-tab>
      <van-tab title="已完成" name="4"></van-tab>
    </van-tabs>

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="">
      <van-list
        class=""
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多订单了～"
        @load="onLoad"
      >
        <div
          class="mt-4 py-2 rounded-lg bg-white"
          v-for="(item, index) in list"
          :key="index"
          @click="goTo(item.id)"
        >
          <div class="flex justify-between px-2 text-sm">
            <span>订单编号：{{ item.orderSn }}</span>
            <span>{{ item.orderStatusText }}</span>
          </div>
          <van-card
            v-for="one in item.goodsList"
            :key="one.id"
            :title="one.goodsName"
            :num="one.number"
            :price="one.price"
            :thumb="one.picUrl"
            currency="€"
          />
          <div class="mt-2 px-2 text-sm">
            订单总额:
            <span class="font-medium pl-1">€ {{ item.actualPrice }}</span>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { orderList } from "@/api/order";
import { Tabs, Tab, List, PullRefresh, Card } from "vant";

export default {
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Card.name]: Card
  },
  data() {
    return {
      showType: "0",
      page: 1,
      list: [],
      loading: false,
      finished: false,
      refreshing: false
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.showType = this.$route.query.showType || "0";
      const params = {
        page: this.page,
        showType: this.showType
      };
      const {
        data: { data }
      } = await orderList(params);
      this.list = this.list.concat(data.list);
      this.totalPage = data.pages;
      this.loading = false;
      if (this.page >= this.totalPage) this.finished = true;
    },
    onChangeTab(name) {
      this.showType = name;
      this.page = 1;
      this.list = [];
      this.finished = false;
      this.loading = true;
      this.$router.push(`/order?showType=${name}`);
      this.loadData();
    },
    onLoad() {
      if (!this.refreshing && this.page < this.totalPage) {
        this.page = this.page + 1;
      }
      if (this.refreshing) {
        this.list = [];
        this.refreshing = false;
      }
      this.loadData();
    },
    onRefresh() {
      this.finished = false;
      this.loading = true;
      this.page = 1;
      this.onLoad();
    },
    goTo(id) {
      this.$router.push({ path: `order-detail?id=${id}` });
    }
  }
};
</script>

<style scoped>
</style>

<template>
  <div>
    <van-nav-bar title="我的足迹" left-arrow @click-left="$router.go(-1)" />

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        class=""
        v-model="loading"
        :finished="finished"
        finished-text="没有更多足迹了～"
        @load="onLoad"
      >
        <van-card
          v-for="item in list"
          :key="item.id"
          :title="item.name"
          :desc="item.brief"
          :price="item.retailPrice"
          :thumb="item.picUrl"
          @click="$router.push(`/product/${item.goodsId}`)"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { List, PullRefresh, Card } from "vant";
import { footprintList } from "@/api/user";

export default {
  components: {
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Card.name]: Card
  },
  data() {
    return {
      page: 1,
      list: [],
      loading: false,
      finished: false,
      refreshing: false
    };
  },
  methods: {
    async loadData() {
      const params = {
        page: this.page
      };
      const {
        data: { data }
      } = await footprintList(params);
      this.list = this.list.concat(data.list);
      this.totalPage = data.pages;
      this.loading = false;
      if (this.page >= this.totalPage) this.finished = true;
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
    }
  }
};
</script>

<style>
</style>


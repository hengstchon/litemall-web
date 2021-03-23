<template>
  <div>
    <van-tabs
      sticky
      v-model="activeTabName"
      title-active-color="#ee0a24"
      @change="onChangeTab"
      @click="onClickTab"
    >
      <van-tab title="综合" name="name"></van-tab>
      <van-tab title="价格" name="retail_price"></van-tab>
      <van-tab title="分类" name="category"></van-tab>
    </van-tabs>

    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        title="选择分类"
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了～"
      :immediate-check="false"
      @load="onLoad"
    >
      <van-card
        v-for="item in list"
        :key="item.id"
        :title="item.name"
        :desc="item.brief"
        :price="item.retailPrice"
        :thumb="item.picUrl"
        @click="$router.push(`/product/${item.id}`)"
      />
    </van-list>
  </div>
</template>

<script>
import { Tab, Tabs, Card, List, Popup, Picker } from "vant";
import { goodsList } from "@/api/goods";

export default {
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Card.name]: Card,
    [List.name]: List,
    [Popup.name]: Popup,
    [Picker.name]: Picker
  },

  props: ["keyword"],

  data() {
    return {
      activeTabName: "name",
      list: [],
      filterCategoryList: [],
      categoryId: 0,
      page: 1,
      loading: false,
      finished: false,
      showPicker: false,
      columns: []
    };
  },

  mounted() {
    this.init();
  },

  methods: {
    async init() {
      this.list = [];
      this.page = 1;
      this.finished = false;
      this.loading = true;
      await this.loadData();
    },
    onClickTab(name) {
      if (this.activeTabName === "category") {
        this.showPicker = true;
      }
    },
    async onChangeTab(name, b) {
      if (this.activeTabName === "category") {
        this.showPicker = true;
        return;
      }
      await this.init();
    },
    onConfirm(name, index) {
      this.categoryId = this.filterCategoryList[index].id;
      this.showPicker = false;
      this.init();
    },
    async loadData() {
      const params = {
        page: this.page,
        keyword: this.keyword,
        sort:
          this.activeTabName === "category" ? "add_time" : this.activeTabName,
        order: this.activeTabName === "retail_price" ? "asc" : "desc",
        categoryId: this.activeTabName === "category" ? this.categoryId : 0
      };
      const {
        data: { data }
      } = await goodsList(params);
      this.list = this.list.concat(data.list);
      this.filterCategoryList = data.filterCategoryList;
      this.columns = this.filterCategoryList.map(item => item.name);
      this.totalPage = data.pages;
      this.loading = false;
      if (this.page >= this.totalPage) this.finished = true;
    },
    onLoad() {
      this.page = this.page + 1;
      this.loadData();
    }
  }
};
</script>


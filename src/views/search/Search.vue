<template>
  <div>
    <div class="flex items-center h-14 inset-x-0 top-0 z-50 px-3 bg-white">
      <a class="w-6 text-gray-600" @click="$router.go(-1)">
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </a>
      <form class="flex-auto" action="/">
        <van-search
          v-model="keyword"
          shape="round"
          placeholder="请输入搜索关键词"
          autofocus
          @input="onInput"
          @clear="() => $router.replace('/search')"
          @search="onSearch"
        >
        </van-search>
      </form>
      <span class="cursor-pointer" @click="onSearch">搜索</span>
    </div>

    <div class="" v-if="showSearchResult">
      <SearchContent ref="content" :keyword="keyword"></SearchContent>
    </div>

    <div
      v-if="!showSearchResult && historyKeywordList.length"
      class="bg-white px-4"
    >
      <div class="flex items-center justify-between mb-2">
        <span>历史记录</span>
        <van-icon name="delete-o" @click="onClearHistory" />
      </div>
      <div class="flex flex-wrap pb-4">
        <van-tag
          class="mr-2 my-1"
          v-for="(item, i) in historyKeywordList"
          :key="i"
          type="default"
          size="large"
          plain
          @click="onClickKeyword(item.keyword)"
          >{{ item.keyword }}</van-tag
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Search, Tab, Tabs, Card, List, Tag } from "vant";
import { searchIndex, searchClearHistory } from "@/api/user";
import SearchContent from "./SearchContent.vue";

export default {
  components: {
    [Search.name]: Search,
    [Tag.name]: Tag,
    SearchContent
  },
  data() {
    return {
      keyword: "",
      historyKeywordList: [],
      showSearchResult: false
    };
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      const { keyword } = this.$route.query;
      if (keyword) {
        this.keyword = keyword;
        this.onSearch();
      } else {
        this.keyword = "";
        this.showSearchResult = false;
        this.getHistoryKeyword();
      }
    },
    async getHistoryKeyword() {
      const { data } = await searchIndex();
      this.historyKeywordList = data.data.historyKeywordList;
    },
    onInput() {
      if (!this.keyword) {
        this.showSearchResult = false;
        this.getHistoryKeyword();
      }
    },
    onClickKeyword(keyword) {
      this.keyword = keyword;
      this.onSearch();
    },
    async onClearHistory() {
      try {
        await this.$dialog.confirm({ message: "确认清除搜索历史？" });
        await searchClearHistory();
        this.historyKeywordList = [];
      } catch (e) {}
    },
    async onSearch() {
      if (this.keyword === "") {
        this.getHistoryKeyword();
      } else {
        this.showSearchResult = true;
        this.$router.replace(`/search?keyword=${this.keyword}`).catch(() => {});
        // this.$refs.content.loadData();
      }
    }
  }
};
</script>

<style scoped>
</style>

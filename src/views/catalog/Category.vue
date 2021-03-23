<template>
  <div>
    <van-nav-bar
      :title="parentCategory.name"
      left-arrow
      @click-left="$router.push(`/catalog/${parentCategory.id}`)"
    />

    <van-tabs class="" sticky @click="onClickTab" v-model="activeId">
      <van-tab
        :title="item.name"
        :name="item.id"
        v-for="(item, index) in navList"
        :key="index"
      >
        <ProductCardList :productList="currentCategoryGoodsList" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getCategory, goodsList } from "@/api/goods";
import { Tab, Tabs } from "vant";
import ProductCardList from "../../components/ProductCardList.vue";

export default {
  components: {
    ProductCardList,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },

  data() {
    return {
      activeId: 0,
      parentCategory: {},
      navList: [],
      currentCategory: {},
      currentCategoryGoodsList: []
    };
  },

  created() {
    this.init();
  },

  methods: {
    async init() {
      const { id } = this.$route.params;
      await this.setCategoryList(id);
      this.activeId = this.currentCategory.id;

      if (id == this.parentCategory.id) {
        this.$router.replace(`/category/${this.currentCategory.id}`);
      }
      this.setCategoryGoodsList(this.currentCategory.id);
    },

    async setCategoryList(id) {
      const { data } = await getCategory({ id });
      this.parentCategory = data.data.parentCategory;
      this.navList = data.data.brotherCategory;
      this.currentCategory = data.data.currentCategory;
    },

    async setCategoryGoodsList(id) {
      const { data } = await goodsList({ categoryId: id });
      this.currentCategoryGoodsList = data.data.list;
    },

    onClickTab(id) {
      if (id === this.currentCategory.id) {
        return;
      }
      this.$router.push(`/category/${id}`);
    },

    updateCurrentCategory(id) {
      this.currentCategory = this.navList.find(i => i.id == id);
      this.activeId = this.currentCategory.id;
      this.setCategoryGoodsList(id);
    }
  },

  watch: {
    "$route.params.id": function(id, oldId) {
      this.updateCurrentCategory(id);
    }
  }
};
</script>

<style>
</style>

<template>
  <div class="my-pt my-pb">
    <div class="flex items-center fixed inset-x-0 top-0 z-50 px-3 bg-white">
      <van-search
        class="flex-auto"
        shape="round"
        placeholder="请输入搜索关键词"
        @click="$router.push('/search')"
      />
    </div>

    <!-- main -->
    <div class="flex">
      <!-- sidebar -->
      <div>
        <van-sidebar class="my-main" v-model="activeIndex">
          <van-sidebar-item
            :title="item.name"
            v-for="(item, i) in categoryList"
            :key="i"
            @click="onClickSidebar(item.id)"
          />
        </van-sidebar>
      </div>

      <!-- category content -->
      <div class="my-main flex-auto px-2 bg-white">
        <div class="my-5">
          <van-divider> {{ currentCategory.name }} </van-divider>
        </div>
        <van-grid column-num="3" :border="false">
          <van-grid-item
            v-for="(item, i) in currentSubCategoryList"
            :key="i"
            @click="onClickCategory(item.id)"
          >
            <van-image class="w-16 sm:w-24" :src="item.picUrl"></van-image>
            <span class="pt-2 text-sm">{{ item.name }}</span>
          </van-grid-item>
        </van-grid>
      </div>
    </div>

    <Tabbar />
  </div>
</template>

<script>
import Tabbar from "@/components/Tabbar";
import { catalogList, catalogCurrent } from "@/api/goods";
import { Search, Sidebar, SidebarItem } from "vant";

export default {
  components: {
    [Search.name]: Search,
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem,
    Tabbar
  },

  data() {
    return {
      activeIndex: 0,
      categoryList: [],
      currentCategory: {},
      currentSubCategoryList: []
    };
  },

  created() {
    this.initData();
  },

  methods: {
    async initData() {
      const { data } = await catalogList();
      this.categoryList = data.data.categoryList;
      this.currentCategory = data.data.currentCategory;
      this.currentSubCategoryList = data.data.currentSubCategory;
      const { id } = this.$route.params;
      if (id) {
        this.updateCatalog(id);
      }
    },
    async onClickSidebar(id) {
      this.$router.replace(`/catalog/${id}`).catch(() => {});
      this.getCategoryList(id);
    },
    async getCategoryList(id) {
      const { data } = await catalogCurrent({ id });
      this.currentCategory = data.data.currentCategory;
      this.currentSubCategoryList = data.data.currentSubCategory;
    },
    onClickCategory(id) {
      this.$router.push(`/category/${id}`);
    },
    updateCatalog(id) {
      this.setIndex(id);
      this.getCategoryList(id);
    },
    setIndex(id) {
      const index = this.categoryList.findIndex(item => item.id == id);
      this.activeIndex = index;
    }
  },
  watch: {
    "$route.params.id": function(id) {
      this.updateCatalog(id || 1);
    }
  }
};
</script>


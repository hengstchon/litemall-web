<template>
  <div class="">
    <van-nav-bar title="商品详情" left-arrow @click-left="$router.go(-1)" />

    <!-- 轮播图 -->
    <van-swipe autoplay="3000">
      <van-swipe-item v-for="(item, index) in goods.info.gallery" :key="index">
        <van-image
          width="100%"
          :src="item"
          @click="preview(goods.info.gallery)"
        />
      </van-swipe-item>
    </van-swipe>

    <!-- 基本信息 -->
    <div class="">
      <van-cell>
        <div class="text-primary text-xl font-medium">
          <span>€</span>
          <span class="ml-1 font-semibold text-3xl">{{ int }}</span>
          <span>{{ `.${decimal}` }}</span>
        </div>
        <div class="text-lg font-medium mt-3">
          {{ goods.info.name }}
        </div>
        <div class="text-gray-500 mt-2">{{ goods.info.brief }}</div>
      </van-cell>

      <!-- 选择规格 -->
      <div class="mt-8">
        <van-cell-group title="选择规格">
          <van-cell is-link @click="onClickSku">
            <span class="font-medium">已选</span>
            <span class="ml-2">
              <span
                class="ml-2 text-gray-500"
                v-for="(item, i) in selected"
                :key="i"
                >{{ item }}</span
              >
            </span>
          </van-cell>
        </van-cell-group>
      </div>

      <!-- 商品介绍 -->
      <div v-if="goods.info.detail" class="px-4 mt-12">
        <van-divider>商品介绍</van-divider>
        <div class="mt-4" v-html="goods.info.detail"></div>
      </div>

      <!-- 常见问题 -->
      <div v-if="goods.issue" class="mt-12">
        <van-divider>常见问题</van-divider>
        <van-cell v-for="(item, i) in goods.issue" :key="i">
          <li class="font-medium">{{ item.question }}</li>
          <div class="mt-2">{{ item.answer }}</div>
        </van-cell>
      </div>

      <div class="mt-12 pb-20">
        <van-divider>大家都在看</van-divider>
        <ProductCardList :productList="relatedGoods" />
      </div>
    </div>

    <van-sku
      v-model="showSku"
      :sku="sku"
      :goods="{ picture: goods.info.picUrl }"
      :goods-id="goods.info.id"
      :hide-stock="true"
      ref="sku"
      @sku-selected="updateSelected"
      @add-cart="onAddCartClicked"
      @buy-clicked="onBuyClicked"
    >
      <template #sku-header-price="props">
        <div class="van-sku__goods-price">
          <span class="text-base">€</span
          ><span class="font-medium text-2xl ml-1">{{ props.price }}</span>
        </div>
      </template>
    </van-sku>

    <van-goods-action>
      <van-goods-action-icon
        v-if="goods.userHasCollect"
        icon="star"
        color="#faab0c"
        icon-class="text-red-500"
        text="收藏"
        @click="onClickCollect"
      />
      <van-goods-action-icon
        v-else
        icon="star-o"
        text="收藏"
        @click="onClickCollect"
      />
      <van-goods-action-icon
        icon="cart-o"
        :badge="cartGoodsNum ? cartGoodsNum : ''"
        @click="$router.push('/cart')"
        text="购物车"
      />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="onClickSku"
      />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="onClickSku"
      />
    </van-goods-action>
  </div>
</template>

<script>
import { goodsDetail, goodsRelated } from "@/api/goods";
import { cartAdd, cartFastAdd, cartGoodsCount } from "@/api/cart";
import { collectAddOrDelete } from "@/api/user";
import {
  Swipe,
  SwipeItem,
  Sku,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  ImagePreview
} from "vant";
import { setLocalStorage } from "../../utils/utils";
import ProductCardList from "@/components/ProductCardList.vue";

export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Sku.name]: Sku,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,

    ProductCardList
  },

  data() {
    return {
      isLogin: false,
      cartGoodsNum: 0,
      goods: { info: { gallery: [], retailPrice: 0 } },
      selected: [], // 已选规格
      showSku: false,
      sku: {
        tree: [],
        list: [],
        price: "1.00"
      },
      relatedGoods: []
    };
  },

  computed: {
    int() {
      return this.goods.info.retailPrice
        .toFixed(2)
        .toString()
        .split(".")[0];
    },
    decimal() {
      return this.goods.info.retailPrice
        .toFixed(2)
        .toString()
        .split(".")[1];
    }
  },

  async created() {
    this.init();
  },

  methods: {
    async init() {
      this.cartGoodsNum = await this.getCartGoodsCount();
      const { id } = this.$route.params;
      this.goods = await this.getGoodsDetail(id);
      this.setSku();
      this.updateSelected();
      this.relatedGoods = await this.getRelatedGoods(id);
    },
    async getCartGoodsCount() {
      const res = await cartGoodsCount();
      return res.data.data;
    },
    async getGoodsDetail(id) {
      const { data } = await goodsDetail({ id });
      return data.data;
    },
    async getRelatedGoods(id) {
      const { data } = await goodsRelated({ id });
      return data.data.list;
    },
    preview(imageList) {
      ImagePreview({ images: imageList, closeable: true });
    },
    updateSelected() {
      const { selectedSkuComb } = this.$refs.sku.getSkuData();
      if (selectedSkuComb) {
        const o = [];
        const specKeys = Object.keys(selectedSkuComb)
          .filter(k => k.startsWith("s"))
          .filter(k => k.length < 4);
        specKeys.map(k => o.push(selectedSkuComb[k]));
        this.selected = o;
      } else {
        this.selected = ["请选择"];
      }
    },
    setSku() {
      // set sku tree
      this.goods.specificationList.map((spec, i) => {
        const v = [];
        spec.valueList.map(item => {
          v.push({ id: item.value, name: item.value, imgUrl: item.picUrl });
        });
        this.sku.tree.push({ k: spec.name, k_s: `s${i + 1}`, v: v });
      });
      // set sku list
      this.goods.productList.map(p => {
        const o = { id: p.id, price: p.price * 100, stock_num: p.number };
        p.specifications.map((specValue, i) => {
          o[`s${i + 1}`] = specValue;
        });
        this.sku.list.push(o);
      });
      this.sku.price = this.goods.info.retailPrice.toFixed(2);
    },
    onClickSku() {
      this.showSku = true;
    },
    onClickCollect() {
      this.goods.userHasCollect = !this.goods.userHasCollect;
      collectAddOrDelete({
        type: 0,
        valueId: this.goods.info.id
      });
    },
    async onAddCartClicked(data) {
      const params = {
        goodsId: data.goodsId,
        productId: data.selectedSkuComb.id,
        number: data.selectedNum
      };
      const res = await cartAdd(params);
      if (res.data.errno === 0) {
        this.cartGoodsNum += data.selectedNum;
        this.showSku = false;
        this.$toast.success("加入购物车成功");
      } else {
        this.$toast.fail("加入购物车失败");
        this.showSku = false;
      }
    },
    async onBuyClicked(data) {
      const params = {
        goodsId: data.goodsId,
        productId: data.selectedSkuComb.id,
        number: data.selectedNum
      };
      const res = await cartFastAdd(params);
      setLocalStorage({ CartId: res.data.data });
      this.$router.push("/checkout");
    }
  },
  watch: {
    $route() {
      this.sku = {
        tree: [],
        list: [],
        price: "1.00"
      };
      this.init();
      window.scrollTo(0, 0);
    }
  }
};
</script>

<style lang="less" scoped>
</style>

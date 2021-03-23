<template>
  <van-grid column-num="2">
    <van-grid-item
      class="max-w-1/2"
      v-for="(product, index) in productList"
      :key="index"
      :to="{ path: `/product/${product.id}` }"
    >
      <van-image lazy-load width="50%" :src="product.picUrl" />
      <div class="mt-2 text-sm max-w-full h-6 truncate">
        {{ product.name }}
      </div>
      <div>€ {{ product.retailPrice }}</div>
    </van-grid-item>
  </van-grid>
</template>

<script>
export default {
  props: {
    productList: {
      type: Array,
      default: function() {
        return [{ picUrl: "", name: "", retailPrice: 0 }];
      }
    }
  }
};
</script>


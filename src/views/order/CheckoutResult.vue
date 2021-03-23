<template>
  <div>
    <div v-if="success" class="wrap">
      <div class="content">
        <div class="title">下单成功！</div>
        <div class="button-wrap">
          <van-button
            type="warning"
            @click="$router.push(`/order-detail?id=${id}`)"
            >查看订单</van-button
          >
          <van-button type="warning" @click="$router.push('/home')"
            >继续逛逛</van-button
          >
        </div>
      </div>
    </div>
    <div v-else class="wrap">
      <div class="content">
        <div class="title">下单失败</div>
        <div class="button-wrap">
          <van-button type="warning" @click="$router.push('/cart')"
            >回到购物车</van-button
          >
          <van-button type="warning" @click="$router.push('/home')"
            >继续逛逛</van-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      success: false,
      id: 0
    };
  },
  mounted() {
    const { result } = this.$route.query;
    if (result === "ok") {
      this.success = true;
      const { id } = this.$route.query;
      this.id = id;
    }
  }
};
</script>

<style scoped>
.wrap {
  @apply flex justify-center items-center h-screen;
}
.content {
  @apply flex flex-col items-center justify-center h-1/3 w-3/4 rounded-lg shadow-lg space-y-10 bg-white;
}
.title {
  @apply text-2xl;
}
.button-wrap {
  @apply space-x-4;
}
.button {
}
</style>

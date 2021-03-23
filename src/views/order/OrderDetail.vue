<template>
  <div class="order-detail-box bg-gray-50">
    <van-nav-bar title="订单详情" left-arrow @click-left="$router.go(-1)" />

    <van-cell-group title="订单信息">
      <van-cell title="订单编号" :value="orderInfo.orderSn"></van-cell>
      <van-cell title="下单时间" :value="orderInfo.addTime"></van-cell>
      <van-cell
        class="price"
        title="订单总额"
        :value="`€ ${orderInfo.actualPrice}`"
      ></van-cell>
      <van-cell title="订单状态" :value="orderInfo.orderStatusText"></van-cell>
    </van-cell-group>

    <div class="px-4 mt-4">
      <van-button
        v-if="orderInfo.handleOption.cancel"
        type="danger"
        block
        round
        @click="cancelOrder"
        >取消订单</van-button
      >
      <van-button
        v-if="orderInfo.handleOption.confirm"
        type="danger"
        block
        round
        @click="confirmOrder"
        >确认收货</van-button
      >
      <van-button
        v-if="orderInfo.handleOption.delete"
        type="danger"
        block
        round
        @click="deleteOrder"
        >删除订单</van-button
      >
    </div>

    <div class="mt-4 p-2">
      <van-card
        class="bg-red-50"
        v-for="one in orderGoods"
        :key="one.id"
        :title="one.goodsName"
        :num="one.number"
        :price="one.price.toFixed(2)"
        :thumb="one.picUrl"
        currency="€"
      />
    </div>

    <div>
      <div class="price">
        <van-cell
          title="商品合计"
          :value="`€ ${orderInfo.goodsPrice}`"
        ></van-cell>
        <van-cell
          title="运费"
          :value="`€ ${orderInfo.freightPrice}`"
        ></van-cell>
        <van-cell
          title="订单总额"
          :value="`€ ${orderInfo.actualPrice}`"
        ></van-cell>
      </div>
      <van-cell title="订单备注" :value="orderInfo.message"></van-cell>
    </div>

    <div class="mt-4 pb-20">
      <van-cell-group title="收货地址">
        <van-cell title="姓名" :value="orderInfo.consignee"></van-cell>
        <van-cell title="电话" :value="orderInfo.mobile"></van-cell>
        <van-cell title="地址" :value="orderInfo.address"></van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import {
  orderDetail,
  orderCancel,
  orderConfirm,
  orderDelete
} from "@/api/order";
import { Card } from "vant";
export default {
  components: {
    [Card.name]: Card
  },
  data() {
    return {
      orderGoods: [],
      orderInfo: { handleOption: {} }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      const { id } = this.$route.query;
      const { data } = await orderDetail({ orderId: id });
      this.orderGoods = data.data.orderGoods;
      this.orderInfo = data.data.orderInfo;
      this.$toast.clear();
    },
    async cancelOrder() {
      try {
        await this.$dialog.confirm({ title: "确认取消订单？" });
        const { data } = await orderCancel({ orderId: this.orderInfo.id });
        if (data.errno === 0) {
          this.$toast.success("取消成功");
          this.init();
        }
      } catch (err) {}
    },
    async confirmOrder() {
      try {
        await this.$dialog.confirm({ title: "是否确认订单？" });
        const { data } = await orderConfirm({ orderId: this.orderInfo.id });
        if (data.errno === 0) {
          this.$toast.success("确认成功");
          this.init();
        }
      } catch (err) {}
    },
    async deleteOrder() {
      try {
        await this.$dialog.confirm({ title: "确认删除订单？" });
        const { data } = await orderDelete({ orderId: this.orderInfo.id });
        if (data.errno === 0) {
          this.$toast.success("删除成功");
          this.$router.go(-1);
        }
      } catch (err) {}
    }
  }
};
</script>

<style>
.price .van-cell__value {
  @apply text-red-500;
}
</style>

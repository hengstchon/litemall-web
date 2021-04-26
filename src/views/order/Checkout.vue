<template>
  <div class="pb-16">
    <van-nav-bar title="确认订单" left-arrow @click-left="$router.go(-1)" />

    <van-cell
      class="contact-card py-5"
      is-link
      @click="$router.push('/address?from=checkout')"
    >
      <div v-if="addressId == 0">请选择收货地址</div>
      <div v-else>
        <div class="text-gray-700 text-base">{{ title }}</div>
        <div class="text-gray-500 mt-1">{{ addr }}</div>
        <div class="text-gray-500 -mt-1">{{ extra }}</div>
      </div>
    </van-cell>

    <div class="my-5">
      <van-card
        v-for="(item, i) in checkedGoodsList"
        :key="i"
        :price="item.price"
        :thumb="item.picUrl"
        currency="€"
      >
        <template #title>
          <div class="text-sm">{{ item.goodsName }}</div>
        </template>
        <template #desc>
          <van-tag
            class="mr-1 mt-2"
            plain
            v-for="(spec, i) in item.specifications"
            :key="i"
            >{{ spec }}</van-tag
          >
        </template>
        <template #price>
          <span class="text-base text-red-500">
            {{ `€ ${item.price.toFixed(2)}` }}
          </span>
        </template>
        <template #bottom>
          <span class="float-right text-gray-400 text-base">
            {{ `x ${item.number}` }}
          </span>
        </template>
      </van-card>
    </div>
    <van-cell-group>
      <van-cell title="商品总额">
        <span class="text-red-500 font-medium">{{
          `€ ${goodsTotalPrice}`
        }}</span>
      </van-cell>
      <van-cell title="运费">
        <span class="text-red-500 font-medium">{{ `€ ${freightPrice}` }}</span>
      </van-cell>
      <van-field
        v-model="message"
        label="订单备注"
        type="textarea"
        placeholder="请输入备注"
        autosize
      >
      </van-field>
    </van-cell-group>

    <div class="h-14"></div>

    <van-submit-bar
      :price="orderTotalPrice * 100"
      button-text="确认下单"
      currency="€"
      @submit="confirmSubmit"
    >
    </van-submit-bar>
  </div>
</template>

<script>
import { ContactCard, Field, SubmitBar, Card, Tag, Dialog } from "vant";
import { cartCheckout } from "@/api/cart";
import { orderSubmit } from "@/api/order";
import { getLocalStorage } from "../../utils/utils";
import { addressDetail } from "../../api/address";

export default {
  components: {
    [ContactCard.name]: ContactCard,
    [Field.name]: Field,
    [SubmitBar.name]: SubmitBar,
    [Card.name]: Card,
    [Tag.name]: Tag
  },

  data() {
    return {
      checkedGoodsList: [],
      checkedAddress: {},
      goodsTotalPrice: 0, //商品总价
      freightPrice: 0, //快递费
      orderTotalPrice: 0, //订单总价
      actualPrice: 0, //实际需要支付的总价
      message: "",

      addressId: 0,
      couponId: 0,
      cartId: 0,

      isDisabled: false,
      showList: false,
      chosenCoupon: -1,
      coupons: [],
      disabledCoupons: []
    };
  },

  computed: {
    title() {
      const { name, tel } = this.checkedAddress;
      return `${name} ${tel}`;
    },
    addr() {
      const { city, postalCode, strNr, street } = this.checkedAddress;
      return `${street} ${strNr}, ${postalCode}, ${city}`;
    },
    extra() {
      const { addressExtra } = this.checkedAddress;
      return addressExtra;
    }
  },

  created() {
    this.init();
  },

  methods: {
    async init() {
      const { CartId } = getLocalStorage("CartId");
      this.cartId = CartId;
      const { data } = await cartCheckout({ cartId: CartId });
      this.checkedGoodsList = data.data.checkedGoodsList;
      const { addressId } = this.$route.query;
      if (addressId) {
        const res = await addressDetail({ id: addressId });
        this.checkedAddress = res.data.data;
        this.addressId = parseInt(addressId);
      } else {
        this.checkedAddress = data.data.checkedAddress;
        this.addressId = data.data.addressId;
      }
      this.freightPrice = data.data.freightPrice;
      this.goodsTotalPrice = data.data.goodsTotalPrice;
      this.orderTotalPrice = data.data.orderTotalPrice;
      this.couponId = data.data.couponId;
    },
    getAddressContent() {
      console.log("this.checkedAddress: ", this.checkedAddress);
      const {
        addressExtra,
        city,
        name,
        postalCode,
        street,
        tel,
        strNr
      } = this.checkedAddress;
      const content = `姓名: ${name}\n手机号码: ${tel}\n地址: ${street} ${strNr}, ${postalCode}, ${city}\n补充: ${addressExtra}`;
      return content;
    },
    confirmSubmit() {
      if (this.addressId === 0) {
        this.$toast.fail("请选择收货地址");
        return;
      }

      Dialog.confirm({
        title: "确认地址",
        message: this.getAddressContent(),
        cancelButtonText: "返回修改"
      })
        .then(() => {
          // on confirm
          this.clickConfirm()
        })
        .catch(() => {
          // on cancel
        });
    },
    async clickConfirm() {
      try {
        const { data } = await orderSubmit({
          cartId: this.cartId,
          addressId: this.addressId,
          couponId: this.couponId,
          message: this.message
        });
        const orderId = data.data.orderId;
        this.$router.push(`/checkout-result?result=ok&id=${orderId}`);
      } catch (e) {
        this.$router.push("/checkout-result?result=fail");
      }

    }
  }
};
</script>

<style scoped>
.contact-card::before {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 2px;
  background: -webkit-repeating-linear-gradient(
    135deg,
    #ff6c6c 0,
    #ff6c6c 20%,
    transparent 0,
    transparent 25%,
    #1989fa 0,
    #1989fa 45%,
    transparent 0,
    transparent 50%
  );
  background: repeating-linear-gradient(
    -45deg,
    #ff6c6c 0,
    #ff6c6c 20%,
    transparent 0,
    transparent 25%,
    #1989fa 0,
    #1989fa 45%,
    transparent 0,
    transparent 50%
  );
  background-size: 80px;
  content: "";
}
</style>

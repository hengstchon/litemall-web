<template>
  <div class="">
    <van-nav-bar title="购物车" left-arrow @click-left="$router.go(-1)" />

    <div class="" v-if="!cartList.length">
      <van-empty description="购物车空空如也，去逛逛吧~"> </van-empty>
    </div>

    <div class="pb-28" v-else>
      <van-checkbox-group v-model="checkedIdList" @change="onChangeChecked">
        <van-cell v-for="(item, index) in cartList" :key="index">
          <div class="flex items-center">
            <van-checkbox
              class="flex-none"
              :name="item.id"
              :key="item.id"
              checked-color="#ee0a24"
              v-model="item.checked"
            />

            <van-image
              class="w-24 ml-1 flex-none"
              :src="item.picUrl"
              @click="$router.push(`/product/${item.goodsId}`)"
            />

            <div class="flex-auto ml-2">
              <div
                class="leading-snug"
                @click="$router.push(`/product/${item.goodsId}`)"
              >
                {{ item.goodsName }}
              </div>
              <div class="flex justify-between items-start mt-2">
                <div>
                  <van-tag
                    class="mr-1"
                    color="gray"
                    plain
                    v-for="(spec, i) in item.specifications"
                    :key="i"
                    >{{ spec }}</van-tag
                  >
                </div>
                <van-button
                  type="warning"
                  plain
                  hairline
                  size="mini"
                  @click="delProduct(item.productId)"
                  >删除</van-button
                >
              </div>
              <div class="flex justify-between mt-4">
                <div class="text-red-500 text-lg">€ {{ item.price }}</div>
                <van-stepper
                  integer
                  :min="1"
                  v-model="item.number"
                  button-size="24"
                  disable-input
                  @change="onChangeStepper(item, arguments[0])"
                />
              </div>
            </div>
          </div>
        </van-cell>
      </van-checkbox-group>
    </div>

    <van-submit-bar
      v-if="cartList.length"
      class="my-mb"
      :price="totalPrice"
      button-text="下单"
      currency="€"
      :disabled="!checkedIdList.length"
      :loading="isSubmit"
      @submit="cartSubmit"
    >
      <van-checkbox @click="setCheckedAll" v-model="isCheckedAll"
        >全选</van-checkbox
      >
    </van-submit-bar>

    <Tabbar />
  </div>
</template>

<script>
import {
  Checkbox,
  CheckboxGroup,
  Empty,
  SubmitBar,
  SwipeCell,
  Tag,
  Stepper
} from "vant";

import Tabbar from "@/components/Tabbar";
import {
  cartDelete,
  cartUpdate,
  checkCart,
  getCartList,
  deleteCartItem,
  modifyCart
} from "@/api/cart";
import { setLocalStorage } from "../../utils/utils";

export default {
  components: {
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Stepper.name]: Stepper,
    [SubmitBar.name]: SubmitBar,
    [SwipeCell.name]: SwipeCell,
    [Tag.name]: Tag,
    [Empty.name]: Empty,
    Tabbar
  },

  data() {
    return {
      cartList: [],
      checkedIdList: [],
      isCheckedAll: false,
      isSubmit: false
    };
  },

  created() {
    this.init();
  },

  computed: {
    totalPrice() {
      return this.cartList.reduce((total, item) => {
        const hasChecked = this.checkedIdList.indexOf(item.id) !== -1;
        return total + (hasChecked ? item.price * item.number * 100 : 0);
      }, 0);
    }
  },

  methods: {
    async init() {
      this.$toast.loading({ message: "加载中...", forbidClick: true });
      const { data } = await getCartList();
      this.cartList = data.data.cartList;
      this.checkedIdList = this.cartList.map(item => item.id);
      this.isCheckedAll = true;
      this.$toast.clear();
    },
    setCheckedAll() {
      if (this.isCheckedAll) {
        this.checkedIdList = this.cartList.map(item => item.id);
      } else {
        this.checkedIdList = [];
      }
    },
    onChangeChecked() {
      if (this.checkedIdList.length === this.cartList.length) {
        this.isCheckedAll = true;
      } else {
        this.isCheckedAll = false;
      }
      const checkedProductIds = [];
      const uncheckedProductsIds = [];
      this.cartList.map(item => {
        if (this.checkedIdList.includes(item.id)) {
          checkedProductIds.push(item.productId);
        } else {
          uncheckedProductsIds.push(item.productId);
        }
      });
      if (checkedProductIds.length) {
        checkCart({ productIds: checkedProductIds, isChecked: 1 });
      }
      if (uncheckedProductsIds.length) {
        checkCart({ productIds: uncheckedProductsIds, isChecked: 0 });
      }
    },
    onChangeStepper(item, value) {
      const res = cartUpdate({
        id: item.id,
        goodsId: item.goodsId,
        productId: item.productId,
        number: value
      });
    },
    async delProduct(o) {
      try {
        await this.$dialog.confirm({
          message: "确认要删除此商品？"
        });
        const productIds = [];
        if (o instanceof Array) {
          productIds = o;
        } else {
          productIds.push(o);
        }
        const { data } = await cartDelete({ productIds });
        this.cartList = data.data.cartList;
        this.checkedIdList = this.cartList.map(item => item.id);
      } catch (err) {}
    },
    async cartSubmit() {
      this.isSubmit = true;
      setLocalStorage({ CartId: 0 });
      this.$router.push("/checkout");
    }
  }
};
</script>


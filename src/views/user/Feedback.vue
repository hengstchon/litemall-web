<template>
  <div>
    <van-nav-bar title="意见反馈" left-arrow @click-left="$router.go(-1)" />

    <van-cell-group title="反馈类型">
      <van-cell
        class="order-coupon"
        :title="type"
        is-link
        @click="showList = true"
      />
    </van-cell-group>

    <van-cell-group title="反馈内容">
      <van-field
        v-model="content"
        clearable
        autosize
        center
        placeholder="对我们网站、商品、服务，你还有什么建议吗？你还希望在商城上买到什么？请告诉我们..."
        type="textarea"
        rows="10"
        size="large"
      />
    </van-cell-group>

    <van-cell-group title="联系方式">
      <van-field
        size="large"
        v-model="mobile"
        placeholder="请输入联系电话，方便我们与您联系"
      />
    </van-cell-group>

    <div class="mt-10 mx-3">
      <van-button block round type="primary" @click="submit">提交</van-button>
    </div>

    <van-action-sheet
      v-model="showList"
      title="反馈类型"
      :actions="actions"
      @select="onType"
    />
  </div>
</template>

<script>
import { feedbackAdd } from "@/api/user";
import { Field, ActionSheet } from "vant";

export default {
  components: {
    [Field.name]: Field,
    [ActionSheet.name]: ActionSheet
  },
  data() {
    return {
      mobile: "",
      content: "",
      type: "",
      showList: false,
      types: ["商品相关", "功能异常", "优化建议", "其他"]
    };
  },
  computed: {
    actions() {
      const o = [];
      this.types.map(item => o.push({ name: item }));
      return o;
    }
  },
  methods: {
    onType(type) {
      this.type = type.name;
      this.showList = false;
    },
    submit() {
      if (this.type === "") {
        this.$toast.fail("请选择反馈类型");
        return;
      }
      if (this.content === "") {
        this.$toast.fail("请输入反馈内容");
        return;
      }
      if (this.mobile === "") {
        this.$toast.fail("请输入联系电话");
        return;
      }

      feedbackAdd({
        content: this.content,
        feedType: this.type,
        hasPicture: false,
        mobile: this.mobile
      }).then(res => {
        this.$toast.success("感谢您的宝贵意见！");
        this.$router.go(-1);
      });
    }
  }
};
</script>

<style>
</style>

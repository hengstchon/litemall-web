<template>
  <div class="adress-edit">
    <van-nav-bar
      :title="`${type == 'add' ? '新增地址' : '编辑地址'}`"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <div class="p-3">
      <div>
        <van-field
          v-model="info.name"
          label="姓名"
          placeholder="收货人姓名"
          required
          clearable
        />

        <van-field
          v-model="info.tel"
          clearable
          required
          type="tel"
          label="电话"
          placeholder="收货人手机号"
        />

        <van-field
          v-model="info.city"
          clearable
          required
          label="城市"
          placeholder="如: Erlangen"
        />

        <van-field
          v-model="info.postalCode"
          clearable
          required
          type="digit"
          label="邮编"
          placeholder="如: 91052"
        />

        <van-field
          v-model="info.street"
          clearable
          required
          label="街道"
          placeholder="如: Hauptstr. 10"
        />

        <van-field
          v-model="info.addressExtra"
          clearable
          label="备注"
          placeholder="如: App. 5 等"
        />
      </div>

      <div class="mt-3">
        <van-cell title="设为默认收货地址">
          <template #right-icon>
            <van-switch v-model="info.isDefault" size="24" />
          </template>
        </van-cell>
      </div>

      <div class="py-8 px-1 space-y-2">
        <van-button
          round
          block
          type="danger"
          native-type="submit"
          @click="onSave"
          >保存</van-button
        >
        <van-button
          round
          block
          type="default"
          native-type="submit"
          @click="onDelete"
          >删除</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Field, Switch, ActionSheet, Radio, RadioGroup } from "vant";

import { addressSave, addressDetail } from "@/api/address";
import { tdist } from "@/utils/utils";
import { addressDelete } from "../../api/address";

export default {
  components: {
    [Field.name]: Field,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Switch.name]: Switch,
    [ActionSheet.name]: ActionSheet
  },

  data() {
    return {
      delivery: "1",
      type: "add",
      info: {
        id: 0,
        name: "",
        tel: "",
        city: "",
        postalCode: "",
        street: "",
        strNr: "",
        addressExtra: "",
        isDefault: false
      },
      showCity: false,
      showOtherCity: false,
      cityList: [
        "Erlangen",
        "Nürnberg",
        "Bamberg",
        "Würzburg",
        "Regensburg",
        "其他"
      ]
    };
  },

  computed: {
    actions() {
      const o = [];
      this.cityList.map(item => o.push({ name: item }));
      return o;
    }
  },

  async mounted() {
    this.init();
  },

  methods: {
    async init() {
      const { id, type } = this.$route.query;
      this.type = type;
      if (type === "edit") {
        const { data } = await addressDetail({ id });
        const {
          addressExtra,
          city,
          isDefault,
          name,
          postalCode,
          street,
          strNr,
          tel
        } = data.data;
        this.info = {
          id,
          addressExtra,
          city,
          isDefault,
          name,
          postalCode,
          street,
          strNr,
          tel
        };
      }
    },
    async onSave() {
      const addressExtra = this.info.addressExtra;
      const params = { ...this.info };
      // delete params.id;
      try {
        await addressSave(params);
        this.$toast.success("保存成功");
        this.$router.go(-1);
      } catch (err) {
        this.$toast.fail("保存失败");
        this.$router.go(-1);
      }
    },
    async onDelete() {
      const { id } = this.info;
      try {
        await addressDelete({ id });
        this.$toast.success("删除成功");
        this.$router.go(-1);
      } catch (err) {
        this.$toast.fail("删除失败");
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style>
.adress-edit .van-field .van-field__label {
  width: 4.1em;
}
</style>

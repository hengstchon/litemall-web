<template>
  <div class="adress-edit">
    <van-nav-bar
      :title="`${type == 'add' ? '新增地址' : '编辑地址'}`"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <div class="p-3">
      <div>
        <van-field name="delivery" label="送货方式" required>
          <template #input>
            <van-radio-group v-model="delivery" direction="horizontal">
              <van-radio name="1">配送</van-radio>
              <van-radio name="2">邮寄</van-radio>
            </van-radio-group>
          </template>
        </van-field>

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
          v-if="delivery === '1' && showOtherCity === false"
          v-model="info.city"
          clearable
          required
          is-link
          readonly
          label="城市"
          placeholder="选择城市"
          @click="() => (showCity = !showCity)"
        />
        <van-field
          v-if="delivery === '2'"
          v-model="info.city"
          clearable
          required
          label="城市"
          placeholder="如: Erlangen"
        />
        <van-field
          v-if="showOtherCity"
          v-model="info.city"
          clearable
          required
          label="其他城市"
          placeholder="填写城市名"
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

    <van-action-sheet
      v-model="showCity"
      title="城市选择"
      :actions="actions"
      @select="onSelect"
    />
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
          tel
        };
        if (
          this.cityList.includes(
            this.info.city.replace(/^(.)|\s+(.)/g, c => c.toUpperCase())
          )
        ) {
          this.delivery = "1";
        } else {
          this.delivery = "2";
        }
      }
    },
    onSelect(action) {
      this.showCity = false;
      if (action.name === "其他") {
        this.showOtherCity = true;
        this.info.city = "";
      } else {
        this.info.city = action.name;
      }
    },
    async onSave() {
      const addressExtra = this.info.addressExtra;
      if (this.delivery === "1") {
        this.info.addressExtra = addressExtra.startsWith("【")
          ? addressExtra.replace(/【.*】/, "【配送】")
          : (this.info.addressExtra = "【配送】" + addressExtra);
      } else {
        this.info.addressExtra = addressExtra.startsWith("【")
          ? addressExtra.replace(/【.*】/, "【邮寄】")
          : (this.info.addressExtra = "【邮寄】" + addressExtra);
      }
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

<template>
  <div>
    <van-nav-bar
      v-if="from === 'manage'"
      title="地址管理"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <van-nav-bar
      v-else
      title="地址选择"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <div class="">
      <van-address-list
        v-model="activeId"
        :list="list"
        default-tag-text="默认"
        :switchable="from === 'manage' ? false : true"
        @add="onAdd"
        @edit="onEdit"
        @select="onSelect"
      />
    </div>
  </div>
</template>

<script>
import { AddressList } from "vant";
import { addressList } from "@/api/address";
export default {
  components: {
    [AddressList.name]: AddressList
  },

  data() {
    return {
      from: "",
      activeId: -1,
      list: []
    };
  },

  async mounted() {
    const { from } = this.$route.query;
    this.from = from;
    const { data } = await addressList();
    this.list = data.data.list.map(item => {
      const { street, strNr, postalCode, city, addressExtra } = item;
      item.address = `${street} ${strNr}, ${postalCode}, ${city}, 备注: ${addressExtra}`;
      return item;
    });
  },

  methods: {
    onAdd() {
      this.$router.push("/address-edit?type=add");
    },
    onEdit(item, index) {
      this.$router.push(`/address-edit?type=edit&id=${item.id}`);
    },
    onSelect(item, index) {
      this.activeId = item.id;
      this.$router.push({
        path: `/checkout?addressId=${item.id}`
      });
    }
  }
};
</script>

<style>
</style>

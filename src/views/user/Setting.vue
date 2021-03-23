<template>
  <div class="seting-box">
    <van-nav-bar title="账号管理" left-arrow @click-left="$router.go(-1)" />

    <div class="mt-20">
      <van-field v-model="nickName" label="昵称" />
    </div>
    <div class="mt-20 px-10 space-y-5">
      <van-button class="" type="primary" block round @click="save"
        >保存</van-button
      >
      <van-button class="" type="danger" block round @click="logout"
        >退出登录</van-button
      >
    </div>
  </div>
</template>

<script>
import { Field } from "vant";
import { authInfo, authSave, authLogout } from "@/api/user";
import { removeLocalStorage, setLocalStorage } from "@/utils/utils";

export default {
  components: {
    [Field.name]: Field
  },

  data() {
    return {
      nickName: ""
    };
  },
  async mounted() {
    try {
      const { data } = await authInfo();
      this.nickName = data.data.nickName;
    } catch (e) {}
  },

  methods: {
    async save() {
      const params = {
        nickname: this.nickName
      };
      const { data } = await authSave(params);
      setLocalStorage({ nickName: this.nickName });
      this.$toast.success("保存成功");
    },
    async logout() {
      try {
        const a = await this.$dialog.confirm({ message: "确认退出吗？" });
        const res = await authLogout();
        if (res.data.errno === 0) {
          removeLocalStorage("token");
          removeLocalStorage("avatar");
          removeLocalStorage("nickName");
          this.$router.push("/home");
        }
      } catch (err) {}
    }
  }
};
</script>

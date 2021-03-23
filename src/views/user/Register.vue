<template>
  <div style="height: 100vh">
    <van-nav-bar title="注册" left-arrow @click-left="$router.push('home')" />

    <div class="flex justify-center mt-24">
      <img class="w-48" :src="require('@/assets/images/logo.png')" alt="" />
    </div>

    <div class="flex justify-center mt-12">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="repeatPassword"
          label="确认密码"
          placeholder="请再次输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />

        <div class="mt-6 px-4 text-sm verify">
          <Verify
            type="3"
            :barSize="{ width: '100%', height: '40px' }"
            :showButton="false"
            @error="error"
            @success="success"
          ></Verify>
          <div class="text-center text-sm mt-2 text-red-500">
            {{ this.verifyText }}
          </div>
        </div>

        <div class="flex justify-center mt-8 px-4">
          <van-button class="w-full" round :loading="loading" type="danger"
            >注册</van-button
          >
        </div>

        <div class="mt-6 ml-4">
          <span class="text-sm text-gray-400" @click="goToLogin">
            已有登录账号
          </span>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { setLocalStorage, getLocalStorage } from "@/utils/utils";
import Verify from "vue2-verify";
import { authRegister } from "@/api/user";
import { Form, Field } from "vant";

export default {
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    Verify
  },
  data() {
    return {
      username: "",
      password: "",
      repeatPassword: "",
      verify: false,
      verifyText: "",
      loading: false
    };
  },
  methods: {
    goToLogin() {
      this.$router.push("/login");
    },

    success(obj) {
      this.verify = true;
      // 回调之后，刷新验证码
      this.verifyText = "验证成功！";
      obj.refresh();
    },
    error(obj) {
      this.verify = false;
      this.verifyText = "验证失败！";
      // 回调之后，刷新验证码
      obj.refresh();
    },

    async onSubmit() {
      if (!this.verify) {
        return this.$toast.fail("验证未完成!");
      }
      if (this.password !== this.repeatPassword) {
        this.password = "";
        this.repeatPassword = "";
        return this.$toast.fail("两次密码输入不一致，请重新输入");
      }

      try {
        this.loading = true;
        const { data } = await authRegister({
          username: this.username,
          password: this.password
        });
        if (data.errno === 0) {
          this.$toast.success("注册成功");
          this.$router.push("/login");
        }
      } catch (err) {
        return this.$toast.fail(err.data.errmsg);
      }
    }
  }
};
</script>

<style lang="less">
.verify-bar-area {
  .verify-left-bar {
    background-color: rgba(252, 165, 165);
  }
}
</style>
<style scoped>

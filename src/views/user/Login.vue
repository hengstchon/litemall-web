<template>
  <div style="height: 100vh">
    <van-nav-bar title="登录" left-arrow @click-left="$router.push('home')" />

    <div class="flex justify-center mt-24">
      <img class="w-48" :src="require('@/assets/images/logo.png')" alt="" />
    </div>

    <div class="flex justify-center mt-12">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />

        <van-field
          v-if="!visiblePass"
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          right-icon="closed-eye"
          :rules="[{ required: true, message: '请填写密码' }]"
          @click-right-icon="onClickEye"
        />
        <van-field
          v-else
          v-model="password"
          type="text"
          name="password"
          label="密码"
          placeholder="密码"
          right-icon="eye-o"
          :rules="[{ required: true, message: '请填写密码' }]"
          @click-right-icon="onClickEye"
        />

        <div class="flex justify-center mt-8 px-4">
          <van-button class="w-full" round :loading="loading" type="primary"
            >登录</van-button
          >
        </div>

        <div class="mt-6 ml-4">
          <span class="text-sm text-gray-400" @click="goToRegister">
            立即注册
          </span>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { Form, Field } from "vant";
import { setLocalStorage } from "@/utils/utils";
import { authLoginByAccount } from "@/api/user";

export default {
  components: {
    [Form.name]: Form,
    [Field.name]: Field
  },
  data() {
    return {
      username: "",
      password: "",
      visiblePass: false,
      loading: false
    };
  },
  methods: {
    onClickEye() {
      this.visiblePass = !this.visiblePass;
    },
    goToRegister() {
      this.$router.push("/register");
    },
    async onSubmit(values) {
      try {
        this.loading = true;
        const res = await authLoginByAccount({
          username: values.username,
          password: values.password
        });
        const data = res.data;
        setLocalStorage({
          token: data.data.token,
          avatar: data.data.userInfo.avatarUrl,
          nickName: data.data.userInfo.nickName
        });
        this.$toast.success("登录成功");
        this.$router.push("/home");
      } catch (err) {
        this.loading = false;
        this.$toast.fail(err.data.errmsg);
      }
    }
  }
};
</script>


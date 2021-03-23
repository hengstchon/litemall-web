<template>
  <div style="height: calc(100vh - 46px)">
    <van-nav-bar title="我的账户" left-arrow @click-left="$router.go(-1)" />

    <div>
      <div
        class="flex justify-center items-center text-center h-1/4 relative"
        :style="{ backgroundImage: `url(${background_image})` }"
      >
        <div
          class="absolute right-3 top-3 z-50 w-6 text-white"
          @click="$router.push('/setting')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <div class="my-4" v-if="user.avatar">
          <img class="w-16" :src="user.avatar" />
          <div class="mt-2 text-white">{{ user.nickName }}</div>
        </div>
        <div class="my-4" v-else>
          <img
            class="w-16 rounded-full"
            :src="require('@/assets/images/avatar_default.png')"
          />
          <div class="mt-2 text-white">未登录</div>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <van-cell class="rounded-t-lg" title="我的订单" is-link to="/order" />
      <div
        class="flex justify-between items-center px-4 text-center h-20 border-b bg-white"
      >
        <div
          class="text-center w-1/3"
          @click="$router.push('/order?showType=2')"
        >
          <van-icon
            class="text-3xl"
            name="underway-o"
            :badge="badges.unship > 0 ? badges.unship : ''"
          />
          <div class="text-xs">待发货</div>
        </div>
        <div
          class="text-center w-1/3"
          @click="$router.push('/order?showType=3')"
        >
          <van-icon
            class="text-3xl"
            name="logistics"
            :badge="badges.unrecv > 0 ? badges.unrecv : ''"
          />
          <div class="text-xs">待收货</div>
        </div>
        <div
          class="text-center w-1/3"
          @click="$router.push('/order?showType=4')"
        >
          <van-icon
            class="text-3xl"
            name="certificate"
            :badge="badges.uncomment > 0 ? badges.uncomment : ''"
          />
          <div class="text-xs">已完成</div>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <van-cell class="rounded-t-lg" title="工具" />
      <div
        class="flex justify-between items-center px-4 text-center h-20 border-b bg-white"
      >
        <div class="text-center w-1/3" @click="$router.push('/collect')">
          <van-icon class="text-3xl" name="shop-collect-o" />
          <div class="text-xs">商品收藏</div>
        </div>
        <div class="text-center w-1/3" @click="$router.push('/footprint')">
          <van-icon class="text-3xl" name="browsing-history-o" />
          <div class="text-xs">我的足迹</div>
        </div>
        <div
          class="text-center w-1/3"
          @click="$router.push('/address?from=manage')"
        >
          <van-icon class="text-3xl" name="wap-home-o" />
          <div class="text-xs">地址管理</div>
        </div>
      </div>
    </div>
    <div class="mt-4 my-pb">
      <van-cell class="rounded-t-lg" title="服务" />
      <div
        class="flex justify-between items-center px-4 text-center h-20 border-b bg-white"
      >
        <div class="text-center w-1/3" @click="$router.push('/help')">
          <van-icon class="text-3xl" name="bullhorn-o" />
          <div class="text-xs">常见问题</div>
        </div>
        <div class="text-center w-1/3">
          <van-icon
            class="text-3xl"
            name="envelop-o"
            @click="$router.push('/feedback')"
          />
          <div class="text-xs">意见反馈</div>
        </div>
        <div class="text-center w-1/3" @click="$router.push('/about')">
          <van-icon class="text-3xl" name="info-o" />
          <div class="text-xs">关于我们</div>
        </div>
      </div>
    </div>

    <Tabbar />
  </div>
</template>

<script>
import Tabbar from "@/components/Tabbar";
import bg_default from "@/assets/images/user_head_bg.png";
import { getLocalStorage, removeLocalStorage } from "@/utils/utils";
import { userIndex, authLogout } from "@/api/user";

export default {
  components: {
    Tabbar
  },
  data() {
    return {
      user: {},
      background_image: bg_default,
      badges: {}
    };
  },
  async mounted() {
    const storage = getLocalStorage("token", "nickName", "avatar");
    if (storage.token) {
      this.user = { nickName: storage.nickName, avatar: storage.avatar };
      const { data } = await userIndex();
      this.badges = data.data.order;
    }
  },
  methods: {
    async logout() {
      const o = await authLogout();
      // data: {errno: 0, errmsg: "成功"}
      removeLocalStorage("token");
      removeLocalStorage("avatar");
      removeLocalStorage("nickName");
      this.$router.push({ name: "home" });
    },
    goBack() {
      this.$router.go(-1);
    },
    goTo(r) {
      this.$router.push({ path: r });
    }
  }
};
</script>


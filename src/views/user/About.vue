<template>
  <div>
    <van-nav-bar title="关于我们" left-arrow @click-left="$router.go(-1)" />

    <div class="flex flex-col items-center mt-10">
      <div class="">Want Want Asia Supermarkt</div>

      <div class="mt-3">
        <img :src="require('@/assets/images/logo2.png')" alt="" />
      </div>
    </div>

    <div class="mt-5">
      <van-cell-group title="Filiale Erlangen">
        <van-cell title="地址" value="Nürnberger Straße 60A 91052 Erlangen" />
        <van-cell title="营业时间" value="Mo. - Sa.  10: 00 - 19: 00" />
      </van-cell-group>

      <van-cell-group title="Filiale Nürnberg">
        <van-cell title="地址" value="Schweiggerstraße 31 90478 Nürnberg" />
        <van-cell title="营业时间" value="Do. - Sa.  11: 00 - 18: 00" />
      </van-cell-group>
    </div>

    <div class="flex flex-col items-center mt-10 my-pb">
      <div>欢迎关注店铺微信公众号</div>
      <div class="w-48 mt-3">
        <img :src="require('@/assets/images/wx.jpg')" alt="" />
      </div>
    </div>
  </div>
</template>


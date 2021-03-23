<template>
  <div id="app">
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view class="max-w-screen-sm mx-auto min-h-screen" />
    </keep-alive>
    <router-view v-else class="max-w-screen-sm mx-auto min-h-screen" />
    <!-- TODO: add transition -->
    <!-- <transition :name="transitionName"> -->
    <!--   <router-view class="max-w-screen-sm mx-auto" /> -->
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      transitionName: "slide-left"
    };
  },
  watch: {
    $route(to, from) {
      // 有主级到次级
      if (to.meta.index > from.meta.index) {
        this.transitionName = "slide-left"; // 向左滑动
      } else if (to.meta.index < from.meta.index) {
        // 由次级到主级
        this.transitionName = "slide-right";
      } else {
        this.transitionName = ""; //同级无过渡效果
      }
    }
  }
};
</script>

<style>
.van-toast {
  min-width: 88px;
  width: auto;
}

.van-nav-bar .van-icon {
  color: "#151515";
}

.van-submit-bar .van-checkbox__icon--checked .van-icon {
  background-color: #ee0a24;
  border-color: #ee0a24;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  height: 100%;
  will-change: transform;
  transition: all 500ms;
  position: absolute;
  backface-visibility: hidden;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>

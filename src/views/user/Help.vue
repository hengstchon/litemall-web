<template>
  <div class="">
    <van-nav-bar title="常见问题" left-arrow @click-left="$router.go(-1)" />

    <div class="p-4">
      <ul v-for="(item, i) in issues" :key="i" class="mb-4">
        <li class="list-disc list-inside">
          {{ item.question }}
        </li>

        <div :key="i" class="mt-2 text-sm divide-y">
          {{ item.answer }}
        </div>

        <van-divider />
      </ul>
    </div>
  </div>
</template>

<script>
import { issueList } from "@/api/user";

export default {
  data() {
    return {
      issues: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      const { data } = await issueList();
      this.issues = data.data.list;
    }
  }
};
</script>


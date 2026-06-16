<template>
  <header class="topbar">
    <div class="topbar__left">
      <div class="brand" aria-label="服务器名称">
        <RouterLink class="brand__name" to="/">苍白立方</RouterLink>
      </div>
      <nav class="topnav" aria-label="顶部导航">
        <RouterLink class="toplink" active-class="toplink--active" to="/">主页</RouterLink>
        <RouterLink class="toplink" active-class="toplink--active" to="/help">帮助</RouterLink>
        <RouterLink class="toplink" active-class="toplink--active" to="/feishu">飞书表单</RouterLink>
        <RouterLink class="toplink" active-class="toplink--active" to="/donate">捐赠</RouterLink>
      </nav>
    </div>
    <div class="topbar__right">
      <button class="btn btn--ghost" type="button" aria-haspopup="dialog" aria-controls="settingsDrawer" @click="$emit('open-drawer')">
        设置
      </button>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from "vue-router";

defineEmits(["open-drawer"]);
</script>

<template>
  <header class="topbar">
    <div class="topbar__left">
      <div class="brand" aria-label="服务器名称">
        <RouterLink class="brand__name" to="/">苍白立方</RouterLink>
      </div>
      <nav class="topnav" aria-label="顶部导航">
        <RouterLink class="toplink" active-class="toplink--active" to="/">主页</RouterLink>
        <RouterLink class="toplink" active-class="toplink--active" to="/rules">服务器规则</RouterLink>
        <RouterLink class="toplink" active-class="toplink--active" to="/help">帮助</RouterLink>
        <RouterLink class="toplink" active-class="toplink--active" to="/bans">封禁信息</RouterLink>
        <div class="fold" data-fold="misc" :aria-expanded="String(miscOpen)">
          <button class="fold__btn" type="button" :aria-expanded="String(miscOpen)" @click.stop="$emit('toggle-misc')">
            <span class="triangle" aria-hidden="true"></span>
            杂项
          </button>
          <div class="fold__panel" role="region" aria-label="杂项 子菜单" @click.stop>
            <RouterLink class="fold__item" to="/about">关于我们</RouterLink>
            <a class="fold__item" href="#" title="占位">行为规范</a>
          </div>
        </div>
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
import { inject } from "vue";
import { RouterLink } from "vue-router";

defineEmits(["open-drawer", "toggle-misc", "close-misc"]);

const miscOpen = inject("miscOpen");
</script>

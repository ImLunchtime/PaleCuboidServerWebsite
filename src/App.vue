<template>
  <div class="page">
    <SettingsDrawer
      :open="drawerOpen"
      :theme="theme"
      :width="width"
      :hint="hintText"
      @close="closeDrawer"
      @set-theme="setTheme"
      @set-width="setWidth"
    />
    <div v-if="drawerOpen" id="backdrop" class="backdrop" @click="closeDrawer"></div>
    <SiteHeader @open-drawer="openDrawer" />
    <main class="main">
      <RouterView />
      <SiteFooter />
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { RouterView, useRoute } from "vue-router";
import SiteHeader from "./components/SiteHeader.vue";
import SettingsDrawer from "./components/SettingsDrawer.vue";
import SiteFooter from "./components/SiteFooter.vue";
import { usePreferences } from "./composables/usePreferences";

const route = useRoute();
const drawerOpen = ref(false);

const { theme, width, setTheme, setWidth } = usePreferences();

const hintText = computed(() =>
  route.path === "/bans"
    ? "默认会跟随系统深浅色（如果你没有手动选择主题）。封禁页面用于展示趋势与名单（先做美术）。"
    : "默认会跟随系统深浅色（如果你没有手动选择主题）。你可以随时在这里切换。"
);

function openDrawer() {
  drawerOpen.value = true;
}

function closeDrawer() {
  drawerOpen.value = false;
}

function handleEsc(e) {
  if (e.key === "Escape") {
    closeDrawer();
  }
}

watch(
  () => route.fullPath,
  () => {
    closeDrawer();
  }
);

onMounted(() => {
  document.addEventListener("keydown", handleEsc);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleEsc);
});
</script>

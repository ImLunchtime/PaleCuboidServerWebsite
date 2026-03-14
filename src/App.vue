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
    <SiteHeader :misc-open="miscOpen" @open-drawer="openDrawer" @toggle-misc="toggleMisc" @close-misc="closeMisc" />
    <main class="main" @click="closeMisc">
      <RouterView />
      <SiteFooter />
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, provide, ref, watch } from "vue";
import { RouterView, useRoute } from "vue-router";
import SiteHeader from "./components/SiteHeader.vue";
import SettingsDrawer from "./components/SettingsDrawer.vue";
import SiteFooter from "./components/SiteFooter.vue";
import { usePreferences } from "./composables/usePreferences";

const route = useRoute();
const drawerOpen = ref(false);
const miscOpen = ref(false);

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

function toggleMisc() {
  miscOpen.value = !miscOpen.value;
}

function closeMisc() {
  miscOpen.value = false;
}

function handleEsc(e) {
  if (e.key === "Escape") {
    closeDrawer();
    closeMisc();
  }
}

watch(
  () => route.fullPath,
  () => {
    closeDrawer();
    closeMisc();
  }
);

provide("miscOpen", miscOpen);

onMounted(() => {
  document.addEventListener("keydown", handleEsc);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleEsc);
});
</script>

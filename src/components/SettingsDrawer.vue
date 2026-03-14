<template>
  <aside id="settingsDrawer" class="drawer" :class="{ 'drawer--open': open }" :aria-hidden="String(!open)">
    <div class="drawer__header">
      <div class="drawer__title">设置</div>
      <button class="iconBtn" aria-label="关闭设置" @click="$emit('close')">✕</button>
    </div>
    <div class="drawer__content">
      <div class="settingRow">
        <div class="settingRow__label">主题</div>
        <div class="segmented" role="group" aria-label="主题切换">
          <button
            class="segmented__btn"
            :aria-pressed="String(theme === 'light')"
            @click="$emit('set-theme', 'light')"
          >
            浅色
          </button>
          <button class="segmented__btn" :aria-pressed="String(theme === 'dark')" @click="$emit('set-theme', 'dark')">
            深色
          </button>
        </div>
      </div>
      <div class="settingRow">
        <div class="settingRow__label">页面宽度</div>
        <div class="segmented" role="group" aria-label="页面宽度">
          <button
            class="segmented__btn"
            :aria-pressed="String(width === 'normal')"
            @click="$emit('set-width', 'normal')"
          >
            标准
          </button>
          <button class="segmented__btn" :aria-pressed="String(width === 'wide')" @click="$emit('set-width', 'wide')">
            宽屏
          </button>
        </div>
      </div>
      <div class="hintBox">
        <div class="hintBox__title">提示</div>
        <div class="hintBox__text">{{ hint }}</div>
      </div>
    </div>
  </aside>
</template>

<script setup>
defineProps({
  open: { type: Boolean, required: true },
  theme: { type: String, required: true },
  width: { type: String, required: true },
  hint: { type: String, required: true },
});

defineEmits(["close", "set-theme", "set-width"]);
</script>

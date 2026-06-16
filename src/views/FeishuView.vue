<template>
  <section class="content">
    <div class="content__header">
      <h2 class="content__title">服务器表单</h2>
      <div class="content__crumbs">苍白立方 / 飞书表单</div>
    </div>
    <div class="card">
      <div class="card__title">请选择要填写的表单</div>
      <div class="card__body">
        <div class="chipRow">
          <a class="btn" :href="forms.appeal" target="_blank" rel="noopener noreferrer">封禁申诉</a>
          <a class="btn" :href="forms.report" target="_blank" rel="noopener noreferrer">玩家举报</a>
          <a class="btn" :href="forms.feedback" target="_blank" rel="noopener noreferrer">意见/BUG贡献</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const forms = {
  appeal: "https://ccnbc0jz5pox.feishu.cn/share/base/form/shrcnvwhRPqWQlunn9TsSA0Gk1c",
  report: "https://ccnbc0jz5pox.feishu.cn/share/base/form/shrcn0jp0N4QtTdoyQ39Pq258Hx",
  feedback: "https://ccnbc0jz5pox.feishu.cn/share/base/form/shrcnD0M9UU9YsjOG7MOehg7YKd",
};
</script>

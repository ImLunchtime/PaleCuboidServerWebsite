<template>
  <section class="hero">
    <div class="hero__left">
      <h1 class="hero__title">帮助</h1>
      <p class="hero__subtitle">我的世界服务器 · 快速上手与常见问题</p>
      <div class="card">
        <div class="card__title">新玩家指引</div>
        <div class="card__body">
          建议先阅读服务器规则，再加入 QQ 群获取最新公告。<br />
          如果你遇到问题，可以先查阅本页 FAQ。
        </div>
      </div>
    </div>
    <div class="hero__right">
      <div class="card quickinfo">
        <div class="card__title">常用信息</div>
        <div class="card__body">
          <div class="kv">
            <div class="kv__k">服务器 IP</div>
            <div class="kv__v">mc.cangbailifang.fun</div>
          </div>
          <div class="kv">
            <div class="kv__k">推荐版本</div>
            <div class="kv__v">1.21.8</div>
          </div>
          <div class="kv">
            <div class="kv__k">QQ群</div>
            <div class="kv__v">740871660</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="content">
    <div class="content__header">
      <h2 class="content__title">常见问题</h2>
      <div class="content__crumbs">苍白立方 / 帮助</div>
    </div>
    <div class="content__grid">
      <article class="card">
        <div class="card__title">FAQ</div>
        <div class="card__body">
          <ul class="bullets">
            <li>进不去服务器：先确认版本一致，再检查网络与白名单状态</li>
            <li>物品丢失：记录时间和坐标，联系管理员协助排查日志</li>
            <li>遇到恶意行为：截图保留证据，走申诉或举报流程</li>
            <li>想了解处罚：可在封禁信息页面查看公开记录与状态</li>
          </ul>
        </div>
      </article>
      <aside class="card">
        <div class="card__title">快速入口</div>
        <div class="card__body">
          <div class="chipRow">
            <RouterLink class="chip" to="/rules">服务器规则</RouterLink>
            <RouterLink class="chip" to="/bans">封禁信息</RouterLink>
            <RouterLink class="chip" to="/">返回主页</RouterLink>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

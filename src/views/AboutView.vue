<template>
  <section class="hero">
    <div class="hero__left">
      <h1 class="hero__title">关于苍白立方</h1>
      <p class="hero__subtitle">我的世界服务器 · 社区介绍</p>
      <div class="card">
        <div class="card__title">我们的目标</div>
        <div class="card__body">
          我们希望提供一个稳定、友好、有探索感的生存社区。<br />
          欢迎喜欢建筑、红石、冒险与协作的玩家加入。
        </div>
      </div>
    </div>
    <div class="hero__right">
      <div class="card quickinfo">
        <div class="card__title">联系与加入</div>
        <div class="card__body">
          <div class="kv">
            <div class="kv__k">服务器 IP</div>
            <div class="kv__v">mc.cangbailifang.fun</div>
          </div>
          <div class="kv">
            <div class="kv__k">版本</div>
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
      <h2 class="content__title">关于我们</h2>
      <div class="content__crumbs">苍白立方 / 关于我们</div>
    </div>
    <div class="content__grid">
      <article class="card">
        <div class="card__title">社区说明</div>
        <div class="card__body">
          <ul class="bullets">
            <li>核心玩法：生存 / 探索 / 机械</li>
            <li>社区原则：尊重他人、理性沟通、禁止恶意破坏</li>
            <li>管理方式：以公开规则和可追踪记录为基础</li>
          </ul>
        </div>
      </article>
      <aside class="card">
        <div class="card__title">快速入口</div>
        <div class="card__body">
          <div class="chipRow">
            <RouterLink class="chip" to="/">返回主页</RouterLink>
            <RouterLink class="chip" to="/bans">查看封禁信息</RouterLink>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

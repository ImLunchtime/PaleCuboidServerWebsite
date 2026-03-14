<template>
  <section class="hero">
    <div class="hero__left">
      <h1 class="hero__title">苍白立方</h1>
      <p class="hero__subtitle">我的世界服务器</p>
      <div class="card">
        <div class="card__title">公告</div>
        <div class="card__body">
          啥都没有<br />
          记得看规则！
        </div>
      </div>
    </div>
    <div class="hero__right">
      <div class="card quickinfo">
        <div class="card__title">快速信息</div>
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
          <div class="kv">
            <div class="kv__k">广告</div>
            <div class="kv__v">网站由瑞粼、ImLunchtime、GPT5.2制作</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="content">
    <div class="content__header">
      <h2 class="content__title">主页</h2>
      <div class="content__crumbs">苍白立方 / 主页</div>
    </div>
    <div class="content__grid">
      <article class="card">
        <div class="card__title">信息</div>
        <div class="card__body">
          <p>我们的服务器为国际Java版1.21.8版本的原版生存服务器</p>
          <ul class="bullets">
            <li>服务器规则：游玩规范 / 社区礼仪 / 违规处理</li>
            <li>帮助：常见问题 / 入服引导 / 联系管理员</li>
            <li>封禁信息：封禁名单 / 申诉入口</li>
            <li>杂项：关于我们 / 行为规范</li>
          </ul>
        </div>
      </article>
      <aside class="card">
        <div class="card__title">侧栏（占位）</div>
        <div class="card__body">
          <div class="miniSection">
            <div class="miniSection__title">快速入口</div>
            <div class="chipRow">
              <RouterLink class="chip" to="/bans">封禁信息</RouterLink>
              <RouterLink class="chip" to="/rules">服务器规则</RouterLink>
              <RouterLink class="chip" to="/help">帮助</RouterLink>
              <a class="chip" href="#" title="占位">行为规范</a>
            </div>
          </div>
          <div class="miniSection">
            <div class="miniSection__title">你知道吗？</div>
            <div class="muted">服务器是Leaves核心，可以找管理员要假人挂机器！</div>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

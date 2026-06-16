<template>
  <section class="hero">
    <div class="hero__left">
      <h1 class="hero__title">苍白立方</h1>
      <p class="hero__subtitle">我的世界服务器</p>
      <div class="card">
        <div class="card__title">公告</div>
        <div class="card__body">
          服务器经济系统已经更新，玩家余额被重置！<br />
          可以在群内请求补偿！
        </div>
      </div>
    </div>
    <div class="hero__right">
      <div class="card quickinfo">
        <div class="card__title">快速信息</div>
        <div class="card__body">
          <div class="kv">
            <div class="kv__k">服务器 IP</div>
            <div class="kv__v">cblf.fun 或 mc.cangbailifang.fun</div>
          </div>
          <div class="kv">
            <div class="kv__k">版本</div>
            <div class="kv__v">1.21.11</div>
          </div>
          <div class="kv">
            <div class="kv__k">QQ群</div>
            <div class="kv__v">740871660</div>
          </div>
          <div class="kv">
            <div class="kv__k">广告</div>
            <div class="kv__v">网站由瑞粼、ImLunchtime、ChatGPT制作</div>
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
          可以直接用1.21.11加入服务器<br />
          不要用NeoForge或者Forge加入服务器<br />
          <br />
          <RouterLink class="btn" to="/feishu">前往服务器表单界面</RouterLink>
        </div>
      </article>
      <aside class="card">
        <div class="card__title">你知道吗？</div>
        <div class="card__body">
          <div class="miniSection">
            <div class="muted">服务器是 Leaves 核心，可以找管理员要假人挂机器。</div>
          </div>
          <div class="miniSection">
            <div class="muted">遇到问题优先看“帮助”页面的 FAQ，会更快定位原因。</div>
          </div>
          <div class="miniSection">
            <div class="muted">建议把服务器 IP 复制保存：mc.cangbailifang.fun</div>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <section class="banChart">
    <div class="card">
      <div class="banChart__head">
        <div>
          <div class="card__title">封禁数量趋势</div>
          <div class="muted banChart__sub">X 轴：封禁时间（月/日）　Y 轴：封禁数量</div>
        </div>
      </div>
      <div class="banChart__canvasWrap">
        <canvas ref="canvasRef" class="banChart__canvas" aria-label="封禁趋势曲线图"></canvas>
      </div>
      <div class="banChart__legend">
        <div class="legendItem"><span class="legendDot"></span>每日封禁数量（曲线）</div>
        <div class="legendItem muted">占位：后续可切换为“周/日/筛选”</div>
      </div>
    </div>
  </section>

  <section class="banList">
    <div class="content__header" style="margin-top: 14px">
      <h2 class="content__title">封禁列表</h2>
      <div class="content__crumbs">苍白立方 / 封禁信息</div>
    </div>

    <div v-if="loadError" class="muted">无法获取封禁数据（/ban_api）。</div>
    <div v-else class="banGrid">
      <article v-for="ban in bans" :key="`${ban.name}-${ban.banAt}`" class="banCard">
        <header class="banCard__head">
          <h3 class="banCard__name">
            <a :href="ban.link || '/awa'" class="banCard__link">{{ ban.name || "未知玩家" }}</a>
          </h3>
          <span class="banCard__tag">{{ ban.status || "封禁中" }}</span>
        </header>
        <div class="banCard__rows">
          <div class="banRow">
            <span class="banRow__k">封禁时间</span>
            <span class="banRow__v mono">{{ formatTime(ban.banAt) }}</span>
          </div>
          <div class="banRow">
            <span class="banRow__k">解封时间</span>
            <span class="banRow__v mono">{{ formatTime(ban.unbanAt) }}</span>
          </div>
          <div class="banRow">
            <span class="banRow__k">剩余时间</span>
            <span class="banRow__v">{{ getRemaining(ban) }}</span>
          </div>
          <div class="banRow">
            <span class="banRow__k">管理员留言</span>
            <span class="banRow__v banNote">{{ ban.note || "-" }}</span>
          </div>
        </div>
        <a class="banCard__appeal" :href="ban.link || '/awa'">
          {{ ban.status === "已解封" ? "请求消除记录 ->" : "点此申诉 ->" }}
        </a>
      </article>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const canvasRef = ref(null);
const bans = ref([]);
const loadError = ref(false);

function formatTime(time) {
  return (time || "").replace("T", " ").replace("Z", "");
}

function getRemaining(ban) {
  if (ban.status === "已解封") {
    return "-";
  }
  const rs = Number(ban.remaining_seconds || 0);
  const h = Math.floor(rs / 3600);
  const m = Math.floor((rs % 3600) / 60);
  return `${h}小时${m}分钟`;
}

function drawBanChart() {
  const canvas = canvasRef.value;
  if (!canvas) {
    return;
  }

  const wrap = canvas.parentElement;
  const dpr = Math.max(1, window.devicePixelRatio || 1);

  const data = [
    { date: "12/01", bans: 1 },
    { date: "12/03", bans: 2 },
    { date: "12/06", bans: 0 },
    { date: "12/10", bans: 3 },
    { date: "12/12", bans: 1 },
    { date: "12/16", bans: 4 },
    { date: "12/20", bans: 2 },
    { date: "12/24", bans: 5 },
    { date: "12/27", bans: 3 },
    { date: "12/30", bans: 6 },
    { date: "01/02", bans: 2 },
    { date: "01/05", bans: 4 },
  ];

  const render = () => {
    const w = Math.floor(wrap.clientWidth);
    const h = 320;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.scale(dpr, dpr);

    const styles = getComputedStyle(document.documentElement);
    const border = (styles.getPropertyValue("--border") || "rgba(20,20,20,0.12)").trim();
    const text = (styles.getPropertyValue("--text") || "#1b1f24").trim();
    const muted = (styles.getPropertyValue("--muted") || "rgba(27,31,36,0.72)").trim();
    const link = (styles.getPropertyValue("--link") || "#0b63ce").trim();

    const padL = 56;
    const padR = 18;
    const padT = 22;
    const padB = 42;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;
    const maxBans = Math.max(...data.map((d) => d.bans), 1);
    const yMax = Math.max(4, Math.ceil(maxBans));

    ctx.lineWidth = 1;
    ctx.strokeStyle = border;
    ctx.beginPath();
    ctx.moveTo(padL, padT + plotH);
    ctx.lineTo(padL + plotW, padT + plotH);
    ctx.moveTo(padL, padT);
    ctx.lineTo(padL, padT + plotH);
    ctx.stroke();

    ctx.fillStyle = muted;
    ctx.font = "12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
    ctx.fillText("封禁数量", padL, 14);

    for (let v = 0; v <= yMax; v += 1) {
      const y = padT + plotH - (v / yMax) * plotH;
      ctx.strokeStyle = border;
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(padL + plotW, y);
      ctx.stroke();

      ctx.fillStyle = muted;
      ctx.fillText(String(v), 12, y + 4);
    }

    const n = data.length;
    const xStep = n > 1 ? plotW / (n - 1) : plotW;
    const labelEvery = n <= 12 ? 1 : 2;

    for (let i = 0; i < n; i += 1) {
      const x = padL + i * xStep;
      ctx.strokeStyle = border;
      ctx.beginPath();
      ctx.moveTo(x, padT);
      ctx.lineTo(x, padT + plotH);
      ctx.stroke();
      if (i % labelEvery === 0 || i === n - 1) {
        ctx.fillStyle = muted;
        ctx.fillText(data[i].date, x - 14, padT + plotH + 18);
      }
    }

    ctx.fillStyle = muted;
    ctx.fillText("封禁时间（月/日） →", padL + plotW - 132, padT + plotH + 34);

    const pts = data.map((d, i) => ({
      x: padL + i * xStep,
      y: padT + plotH - (d.bans / yMax) * plotH,
      bans: d.bans,
    }));

    ctx.strokeStyle = link;
    ctx.lineWidth = 2;
    ctx.beginPath();
    pts.forEach((p, idx) => {
      if (idx === 0) {
        ctx.moveTo(p.x, p.y);
      } else {
        ctx.lineTo(p.x, p.y);
      }
    });
    ctx.stroke();

    pts.forEach((p) => {
      ctx.fillStyle = link;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = text;
      ctx.fillText(String(p.bans), p.x + 8, p.y + 4);
    });
  };

  render();
  window.addEventListener("resize", render, { passive: true });
  return () => window.removeEventListener("resize", render);
}

async function loadBans() {
  try {
    const response = await fetch("https://www.cangbailifang.fun/awa/ban_api");
    const data = await response.json();
    bans.value = Array.isArray(data?.bans) ? data.bans : [];
  } catch {
    loadError.value = true;
  }
}

let cleanupResize;

onMounted(async () => {
  cleanupResize = drawBanChart();
  await loadBans();
});

onUnmounted(() => {
  if (cleanupResize) {
    cleanupResize();
  }
});
</script>

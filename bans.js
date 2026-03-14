/**
 * bans.js - 封禁信息页面
 * 要求：
 * - X轴：封禁时间（月/日），Y轴：封禁数量
 * - 封禁卡片：增加“解封状态”；已解封时按钮文案改为“请求消除记录->”
 * - 管理员留言支持多行，显示区保留2行高度
 * - 设置与主页同步；默认跟随系统深浅色（若用户未手动选择）
 */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const THEME_KEY = "cblf_theme";
const WIDTH_KEY = "cblf_width";

function triggerChartRedraw(){
  // 图表使用 Canvas 绘制：主题切换后需要手动重绘
  requestAnimationFrame(() => {
    window.dispatchEvent(new Event("resize"));
  });
}

function getSystemTheme(){
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function setTheme(theme){
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
  localStorage.setItem("cblf_theme_user", "1");
}

// 主题变化后重绘图表
// （不直接调用 drawBanChart，以免重复绑定 resize 监听）

function setWidth(width){
  document.documentElement.dataset.width = width;
  localStorage.setItem(WIDTH_KEY, width);
}
function syncButtons(){
  const theme = document.documentElement.dataset.theme || "light";
  const width = document.documentElement.dataset.width || "normal";
  $$("[data-theme]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.theme === theme)));
  $$("[data-width]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.width === width)));
}
function restorePrefs(){
  const userTheme = localStorage.getItem("cblf_theme_user") === "1";
  const savedTheme = localStorage.getItem(THEME_KEY);
  const theme = (userTheme && savedTheme) ? savedTheme : getSystemTheme();

  const width = localStorage.getItem(WIDTH_KEY) || "normal";
  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.width = width;

  syncButtons();

  if (!userTheme && window.matchMedia){
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener?.("change", () => {
      if (localStorage.getItem("cblf_theme_user") === "1") return;
      document.documentElement.dataset.theme = getSystemTheme();
      syncButtons();
      triggerChartRedraw();
    });
  }
}

/* Drawer */
function setupDrawer(){
  const drawer = $("#settingsDrawer");
  const backdrop = $("#backdrop");
  const openBtn = $("#settingsBtn");
  const closeBtn = $("#closeDrawerBtn");

  const open = () => {
    drawer.classList.add("drawer--open");
    drawer.setAttribute("aria-hidden", "false");
    backdrop.hidden = false;
    closeBtn?.focus();
  };
  const close = () => {
    drawer.classList.remove("drawer--open");
    drawer.setAttribute("aria-hidden", "true");
    backdrop.hidden = true;
    openBtn?.focus();
  };

  openBtn?.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
  backdrop?.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("drawer--open")) close();
  });

  $$(".segmented__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const theme = btn.dataset.theme;
      const width = btn.dataset.width;

      if (theme) setTheme(theme);
      triggerChartRedraw();
      if (width) setWidth(width);
      triggerChartRedraw();

      const group = btn.parentElement;
      if (group) $$(".segmented__btn", group).forEach((b) => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
    });
  });
}

/* Misc fold */
function setupMiscFold(){
  const fold = $('.fold[data-fold="misc"]');
  if (!fold) return;
  const btn = $(".fold__btn", fold);

  const close = () => {
    fold.setAttribute("aria-expanded", "false");
    btn?.setAttribute("aria-expanded", "false");
  };

  btn?.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = fold.getAttribute("aria-expanded") === "true";
    fold.setAttribute("aria-expanded", String(!open));
    btn.setAttribute("aria-expanded", String(!open));
  });

  document.addEventListener("click", () => close());
  window.addEventListener("resize", () => close());
}

/* Chart: X=date (mm/dd), Y=count */
function drawBanChart(){
  const canvas = $("#banChartCanvas");
  if (!canvas) return;

  const wrap = canvas.parentElement;
  const dpr = Math.max(1, window.devicePixelRatio || 1);

  // 示例：按月/日统计（占位）
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

  const resize = () => {
    const w = Math.floor(wrap.clientWidth);
    const h = 320;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    render(w, h, dpr, data);
  };

  const render = (w, h, dpr, data) => {
    const ctx = canvas.getContext("2d");
    // Robust DPR: clear in device pixels, then scale to CSS pixels
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.scale(dpr, dpr);

    const styles = getComputedStyle(document.documentElement);
    const border = (styles.getPropertyValue("--border") || "rgba(20,20,20,0.12)").trim();
    const text = (styles.getPropertyValue("--text") || "#1b1f24").trim();
    const muted = (styles.getPropertyValue("--muted") || "rgba(27,31,36,0.72)").trim();
    const link = (styles.getPropertyValue("--link") || "#0b63ce").trim();

    const padL = 56, padR = 18, padT = 22, padB = 42;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;

    const maxBans = Math.max(...data.map(d => d.bans), 1);
    const yMax = Math.max(4, Math.ceil(maxBans)); // at least 4, keep integer ticks

    // Axes
    ctx.lineWidth = 1;
    ctx.strokeStyle = border;
    ctx.beginPath();
    ctx.moveTo(padL, padT + plotH);
    ctx.lineTo(padL + plotW, padT + plotH);
    ctx.moveTo(padL, padT);
    ctx.lineTo(padL, padT + plotH);
    ctx.stroke();

    // Y label (horizontal)
    ctx.fillStyle = muted;
    ctx.font = "12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
    ctx.fillText("封禁数量", padL, 14);

    // Y ticks: integer 0..yMax (ensures '3' appears)
    ctx.font = "12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
    for (let v = 0; v <= yMax; v++) {
      const y = padT + plotH - (v / yMax) * plotH;

      // grid
      ctx.strokeStyle = border;
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(padL + plotW, y);
      ctx.stroke();

      // label
      ctx.fillStyle = muted;
      ctx.fillText(String(v), 12, y + 4);
    }

    // X ticks
    const n = data.length;
    const xStep = n > 1 ? plotW / (n - 1) : plotW;
    const labelEvery = n <= 12 ? 1 : 2;

    for (let i = 0; i < n; i++) {
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

    // Points
    const pts = data.map((d, i) => ({
      x: padL + i * xStep,
      y: padT + plotH - (d.bans / yMax) * plotH,
      bans: d.bans
    }));

    // Line
    ctx.strokeStyle = link;
    ctx.lineWidth = 2;
    ctx.beginPath();
    pts.forEach((p, idx) => idx === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.stroke();

    // Dots + value labels
    pts.forEach((p) => {
      ctx.fillStyle = link;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3.6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = text;
      ctx.font = "12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
      ctx.fillText(String(p.bans), p.x + 8, p.y + 4);
    });
  };

  resize();
  window.addEventListener("resize", resize, { passive: true });
}

/* Ban cards (示例记录不变，只新增字段/布局) */
function renderBanCards(){
  const grid = $("#banGrid");
  if (!grid) return;

  // 从后端拉取数据：/ban_api
  fetch("https://www.cangbailifang.fun/awa/ban_api")
    .then(r => r.json())
    .then(data => {
      const bans = (data && data.bans) ? data.bans : [];
      grid.innerHTML = bans.map((b) => {
        const isUnbanned = b.status === "已解封";
        const actionText = isUnbanned ? "请求消除记录 ->" : "点此申诉 ->";

        // 链接：默认跳到后台路径（需要登录）。你也可以改为前端自己的页面。
        const link = b.link || "/awa";

        // 友好时间显示
        const banAt = (b.banAt || "").replace("T"," ").replace("Z","");
        const unbanAt = (b.unbanAt || "").replace("T"," ").replace("Z","");

        // 剩余显示（简单：小时/分钟）
        const rs = Number(b.remaining_seconds || 0);
        const h = Math.floor(rs / 3600);
        const m = Math.floor((rs % 3600) / 60);
        const remaining = isUnbanned ? "-" : `${h}小时${m}分钟`;

        return `
          <article class="banCard">
            <header class="banCard__head">
              <h3 class="banCard__name"><a href="${link}" class="banCard__link">${b.name || ""}</a></h3>
              <span class="banCard__status ${isUnbanned ? "isUnbanned" : ""}">${b.status || ""}</span>
            </header>

            <div class="banCard__meta">
              <div><span class="k">封禁时间</span><span class="v">${banAt}</span></div>
              <div><span class="k">解封时间</span><span class="v">${unbanAt}</span></div>
              <div><span class="k">剩余时间</span><span class="v">${remaining}</span></div>
            </div>

            <div class="banCard__note">
              <div class="k">管理员留言</div>
              <div class="v v--clamp">${(b.note || "").replaceAll("<","&lt;").replaceAll(">","&gt;")}</div>
            </div>

            <a class="banCard__action" href="${link}">${actionText}</a>
          </article>
        `;
      }).join("");
    })
    .catch(() => {
      grid.innerHTML = `<div style="color:#9aa4b2;padding:8px 2px;">无法获取封禁数据（/ban_api）。</div>`;
    });
}

function esc(str){
  return String(str).replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[m]));
}

/* init */
restorePrefs();
setupDrawer();
setupMiscFold();
drawBanChart();
renderBanCards();

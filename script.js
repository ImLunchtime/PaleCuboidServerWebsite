/**
 * script.js - 主页交互：设置抽屉 + 杂项折叠
 * 要求：设置与封禁页同步；默认跟随系统深浅色（如果用户未手动选择）
 */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const THEME_KEY = "cblf_theme";
const WIDTH_KEY = "cblf_width";

function getSystemTheme(){
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function setTheme(theme){
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
  localStorage.setItem("cblf_theme_user", "1"); // mark manual override
}

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

  // If not manually set, keep following system changes
  if (!userTheme && window.matchMedia){
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener?.("change", () => {
      if (localStorage.getItem("cblf_theme_user") === "1") return;
      document.documentElement.dataset.theme = getSystemTheme();
      syncButtons();
    });
  }
}

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
      if (width) setWidth(width);

      // update pressed states in this group
      const group = btn.parentElement;
      if (group) $$(".segmented__btn", group).forEach((b) => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
    });
  });
}

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

restorePrefs();
setupDrawer();
setupMiscFold();

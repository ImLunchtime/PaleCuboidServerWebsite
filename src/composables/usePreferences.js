import { ref } from "vue";

const THEME_KEY = "cblf_theme";
const WIDTH_KEY = "cblf_width";
const USER_THEME_KEY = "cblf_theme_user";

const theme = ref("light");
const width = ref("normal");
let initialized = false;

function getSystemTheme() {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function syncDocument() {
  document.documentElement.dataset.theme = theme.value;
  document.documentElement.dataset.width = width.value;
}

function setTheme(nextTheme) {
  theme.value = nextTheme;
  localStorage.setItem(THEME_KEY, nextTheme);
  localStorage.setItem(USER_THEME_KEY, "1");
  syncDocument();
}

function setWidth(nextWidth) {
  width.value = nextWidth;
  localStorage.setItem(WIDTH_KEY, nextWidth);
  syncDocument();
  window.dispatchEvent(new Event("resize"));
}

function restorePrefs() {
  const userTheme = localStorage.getItem(USER_THEME_KEY) === "1";
  const savedTheme = localStorage.getItem(THEME_KEY);
  const savedWidth = localStorage.getItem(WIDTH_KEY) || "normal";

  theme.value = userTheme && savedTheme ? savedTheme : getSystemTheme();
  width.value = savedWidth;
  syncDocument();

  if (!userTheme && window.matchMedia) {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener?.("change", () => {
      if (localStorage.getItem(USER_THEME_KEY) === "1") {
        return;
      }
      theme.value = getSystemTheme();
      syncDocument();
      window.dispatchEvent(new Event("resize"));
    });
  }
}

export function usePreferences() {
  if (!initialized) {
    restorePrefs();
    initialized = true;
  }

  return {
    theme,
    width,
    setTheme,
    setWidth,
  };
}

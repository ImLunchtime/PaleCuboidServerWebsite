# 苍白立方 - Vue 官网

## 技术栈
- npm
- Vue 3 + Vue Router
- TailwindCSS
- 旧样式表保留：`styles.css`

## 本地开发
```bash
npm install
npm run dev
```

## 构建与预览
```bash
npm run build
npm run preview
```

## 路由页面
- `/`：主页
- `/about`：关于我们
- `/rules`：服务器规则
- `/help`：帮助
- `/bans`：封禁信息（趋势图 + 名单卡片）

## 主题/设置同步
- 如果用户没有手动选择主题，默认跟随系统深浅色（prefers-color-scheme）
- 一旦用户手动切换主题，会写入 localStorage 并在所有路由页面生效

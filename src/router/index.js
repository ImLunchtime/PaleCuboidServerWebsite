import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import BansView from "../views/BansView.vue";
import RulesView from "../views/RulesView.vue";
import HelpView from "../views/HelpView.vue";
import FeishuView from "../views/FeishuView.vue";
import DonateView from "../views/DonateView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/about", name: "about", component: AboutView },
    { path: "/rules", name: "rules", component: RulesView },
    { path: "/help", name: "help", component: HelpView },
    { path: "/bans", name: "bans", component: BansView },
    { path: "/feishu", name: "feishu", component: FeishuView },
    { path: "/donate", name: "donate", component: DonateView },
  ],
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import BansView from "../views/BansView.vue";
import RulesView from "../views/RulesView.vue";
import HelpView from "../views/HelpView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/about", name: "about", component: AboutView },
    { path: "/rules", name: "rules", component: RulesView },
    { path: "/help", name: "help", component: HelpView },
    { path: "/bans", name: "bans", component: BansView },
  ],
});

export default router;

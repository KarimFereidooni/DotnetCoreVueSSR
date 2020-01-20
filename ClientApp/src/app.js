import Vue from "vue";
import App from "./App.vue";
import { createRouter } from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

export function createApp(context) {
  const router = createRouter();
  const app = new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  });
  return { app, router };
}

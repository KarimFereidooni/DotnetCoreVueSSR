import { createApp } from "./app";
import "vuetify/dist/vuetify.css";

const { app, router } = createApp();

router.onReady(() => {
  app.$mount("#app");
});

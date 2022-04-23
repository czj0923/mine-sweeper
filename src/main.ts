import { createApp } from "vue";
import "papercss/dist/paper.min.css"; //paper.css
import "@/assets/css/alert.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);
app.mount("#app");

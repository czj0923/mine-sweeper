import { createApp } from "vue";
import "papercss/dist/paper.min.css"; //paper.css
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(router);
app.mount("#app");

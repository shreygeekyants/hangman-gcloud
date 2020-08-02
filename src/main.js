import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSocialSharing from "vue-social-sharing";
import VueLodash from "vue-lodash";
import lodash from "lodash";
import "font-awesome/css/font-awesome.min.css";

Vue.use(VueLodash, { name: "custom", lodash: lodash });
Vue.use(VueSocialSharing);
Vue.component(
  "VueFontawesome",
  require("vue-fontawesome-icon/VueFontawesome.vue").default,
);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

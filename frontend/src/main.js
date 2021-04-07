import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

//**Global Variables**
//User / Token
if (localStorage.user != undefined) {
	Vue.prototype.$token = JSON.parse(localStorage.user).token;
	Vue.prototype.$user = JSON.parse(localStorage.user);
}

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");

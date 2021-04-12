import Vue from 'vue'
import App from './App.vue'
import moment from "moment";
import VueMomentJS from "vue-momentjs";
import "./assets/css/main.css";
import Vuex from 'vuex'
import 'es6-promise/auto'
import { store } from "./store/todolist";

Vue.config.productionTip = false
Vue.use(VueMomentJS, moment);
Vue.use(Vuex);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')

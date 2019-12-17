// Vue
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// Vuex
import Vuex from "vuex";
Vue.use(Vuex);
import { store } from "./store";

// Mixin
import global from "@/mixins/global";
Vue.mixin(global);

// External Libraries
import Buefy from "buefy";
import firebase from "firebase";

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserSecret,
  faCircleNotch,
  faSearch,
  faUpload,
  faShoppingBasket,
  faRadiation,
  faMoneyBillWave
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faUserSecret,
  faCircleNotch,
  faSearch,
  faUpload,
  faShoppingBasket,
  faRadiation,
  faMoneyBillWave
);

Vue.component("faIcon", FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(Buefy, {
  defaultIconPack: "fas",
  defaultIconComponent: "faIcon"
});
let app = "";

firebase.initializeApp({
  apiKey: "AIzaSyAIrEUt5wU-swDCzTlgBrLkaSTyoQgEXiA",
  authDomain: "pswpensar-c95f0.firebaseapp.com",
  databaseURL: "https://pswpensar-c95f0.firebaseio.com",
  projectId: "pswpensar-c95f0",
  storageBucket: "pswpensar-c95f0.appspot.com",
  messagingSenderId: "417993933281",
  appId: "1:417993933281:web:83ed8e5d94eaca29bb12a0",
  measurementId: "G-0JYN8WP5XF"
});

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});

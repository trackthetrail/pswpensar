import Vue from "vue";
import VueRouter from "vue-router";

//views
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import Compras from "../views/Compras.vue";
import Produtos from "../views/Produtos.vue";

import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "/login"
  },
  {
    path: "/",
    redirect: "/login"
  },

  {
    path: "/home",
    name: "home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/produtos",
    name: "Produtos",
    component: Produtos,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/compras",
    name: "Compras",
    component: Compras,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp
  },
  {
    path: "/db",
    name: "db",
    component: () => import(/* webpackChunkName: "db" */ "../views/Home.vue"),
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) next("login");
  else if (!requiresAuth && currentUser) next("home");
  else next();
});

export default router;

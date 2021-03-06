import Vue from 'vue'
import VueRouter from 'vue-router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import auth from './auth'
import App from './components/App.vue'
import About from './components/About.vue'
import Dashboard from './components/Dashboard.vue'
import Login from './components/Login.vue'

Vue.use(VueRouter)
Vue.use(ElementUI);

Vue.config.productionTip = false

function requireAuth(to, from, next) {
  if (!auth.loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/about', component: About },
    { path: '/dashboard', component: Dashboard, beforeEnter: requireAuth },
    { path: '/login', component: Login },
    {
      path: '/logout',
      beforeEnter(to, from, next) {
        auth.logout()
        next('/')
      }
    }
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // replace the content of <div id="app"></div> with App
  render: h => h(App)
})

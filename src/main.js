// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
//引入element-ui cnpm -i element-ui -S
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//1.需要在控制台安装axios模块  cnpm install --save axios
// 设置反向代理，前端请求默认发送到 http://localhost:8443/api
var axios = require('axios')
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
axios.defaults.baseURL = 'http://localhost:8443/api'
//前端带上 cookie
axios.defaults.withCredentials = true
Vue.prototype.$axios = axios

Vue.config.productionTip = false
//注册element
Vue.use(Element)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  // 注意这里
  store,
  components: {App},
  template: '<App/>'
})


router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.user.username) {
      axios.get('/authentication').then(resp => {
        if (resp) next()
      })
    } else {
      next({
        path: 'login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
    }
  }
)

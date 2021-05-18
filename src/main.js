import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import VueRouter from 'vue-router'
import router from './route.js'
import axios from 'axios'

Vue.use(VueRouter)
Vue.use(Antd);
Vue.config.productionTip = false

//Axios请求拦截器，随着业务的复杂，Axios层的使用将会越来越复杂，写个精简版的就行了。
axios.interceptors.request.use(config => {
    // let token = 'Basic aHRsZjpCanhoNnl6QGZnYnk0c3Q=';
    // if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
    //     config.headers.Authorization = token;
    //     console.log('interceptors config=',config)
    // }
    return config
}, error => {
    return Promise.reject(error)
})
Vue.prototype.$axios = axios

new Vue({
  render: h => h(App),
  router:router
}).$mount('#app')

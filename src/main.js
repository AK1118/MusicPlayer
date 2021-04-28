import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import { InfiniteScroll } from 'element-ui';
Vue.use(InfiniteScroll) 
Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App)
})

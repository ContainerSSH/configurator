import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import clipboard from './plugins/clipboard'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  clipboard,
  render: h => h(App)
}).$mount('#app')

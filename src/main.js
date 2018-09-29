// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import ElementUI from 'element-ui'
import en from 'element-ui/lib/locale/lang/en'
import zh from 'element-ui/lib/locale/lang/zh-CN'
import locale from 'element-ui/lib/locale'

Vue.use(VueI18n)
Vue.config.productionTip = false

// 使用多文件管理不同的语言是一个好习惯：
const i18n = new VueI18n({
  locale: localStorage.locale,  // 语言标识，后面会用做切换和将用户习惯存储到本地浏览器
  messages: {
    'zh': require('./assets/lang/zh'),
    'en': require('./assets/lang/en')
  }
})
locale.i18n((key, value) => i18n.t(key, value))

new Vue({
  el: '#app',
  router,
  i18n,
  template: '<App/>',
  components: { App }
})

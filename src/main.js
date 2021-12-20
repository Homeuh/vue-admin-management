import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import App from './App.vue'
import TreeTable from 'vue-table-with-tree-grid'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.component('tree-table', TreeTable)

//引入mock
if(process.env.NODE_ENV === "development") require("@/api/mock")

Vue.filter('dataFormat', function (originVal) {
    const dt = new Date(originVal*1000)

    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDate() + '').padStart(2, '0')

    const hh = (dt.getHours() + '').padStart(2, '0')
    const mm = (dt.getMinutes() + '').padStart(2, '0')
    const ss = (dt.getSeconds() + '').padStart(2, '0')
    // yyyy-mm-dd hh:mm:ss
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')

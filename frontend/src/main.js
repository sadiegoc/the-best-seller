import { createApp } from 'vue'
import App from './App.vue'
import router from './config/routes'
import store from './config/store'

createApp(App).use(router).use(store).mount('#app')

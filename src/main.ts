import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/tailwind.css'

import DashboardLayout from '@/layouts/DashboardLayout.vue'

createApp(App).component("default-layout", DashboardLayout).use(store).use(router).mount('#app')

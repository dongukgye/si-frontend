import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/tailwind.css'

import MainLayout from '@/layouts/MainLayout.vue'

createApp(App).component("default-layout", MainLayout).use(store).use(router).mount('#app')

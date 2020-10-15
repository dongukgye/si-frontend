import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import CategoryList from '@/views/CategoryList.vue'
import CategoryDetail from '@/views/CategoryDetail.vue'
import PartList from '@/views/PartList.vue'
import ProductList from '@/views/ProductList.vue'
import OrderList from '@/views/OrderList.vue'
import TaskList from '@/views/TaskList.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: 'Dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/category',
    name: 'CategoryList',
    component: CategoryList
  },
  {
    path: '/category/:categoryId',
    name: 'CategoryDetail',
    component: CategoryDetail
  },
  {
    path: '/part',
    name: 'PartList',
    component: PartList
  },
  {
    path: '/product',
    name: 'ProductList',
    component: ProductList
  },
  {
    path: '/order',
    name: 'OrderList',
    component: OrderList
  },
  {
    path: '/task',
    name: 'TaskList',
    component: TaskList
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

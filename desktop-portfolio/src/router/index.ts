import { createRouter, createWebHashHistory } from 'vue-router'
import DesktopView from '../views/DesktopView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/:appId?',
      name: 'desktop',
      component: DesktopView,
    },
  ],
})

export default router
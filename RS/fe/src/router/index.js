import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/rawat_inap',
      name: 'rawat_inap',
      // route level code-splitting
      // this generates a separate chunk (rawat_inap.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/rawat_inap.vue')
    },
    {
      path: '/rawat_jalan',
      name: 'rawat_jalan',
      // route level code-splitting
      // this generates a separate chunk (rawat_jalan.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/rawat_jalan.vue')
    },
    {
      path: '/dokter',
      name: 'dokter',
      // route level code-splitting
      // this generates a separate chunk (dokter.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/dokter.vue')
    },
    {
      path: '/add_dokter',
      name: 'add_dokter',
      // route level code-splitting
      // this generates a separate chunk (add_dokter.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/add_dokter.vue')
    },
    {
      path: '/edit_dokter/:id',
      name: 'edit_dokter',
      // route level code-splitting
      // this generates a separate chunk (edit_dokter.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/edit_dokter.vue'),
      props:true
    },
    {
      path: '/add_rawat_inap',
      name: 'add_rawat_inap',
      // route level code-splitting
      // this generates a separate chunk (edit_dokter.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/add_rawat_inap.vue'),
      props:true
    },
    {
      path: '/edit_rawat_inap/:id_pasien',
      name: 'edit_rawat_inap',
      // route level code-splitting
      // this generates a separate chunk (edit_dokter.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/edit_rawat_inap.vue'),
      props:true
    },
    {
      path: '/pasien',
      name: 'pasien',
      // route level code-splitting
      // this generates a separate chunk (edit_dokter.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/pasien.vue'),
      props:true
    }
  ]
})

export default router

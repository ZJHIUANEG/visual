/* eslint-disable */

import Vue from 'vue'
import VueRouter from 'vue-router'
import DisplayArea from '../views/DisplayArea.vue'
import tree from '../components/data_anaylsis/InputTree.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/displayarea' },
  { path: '/displayarea', component: DisplayArea },
  { path: '/tree', component: tree }
]

const router = new VueRouter({
  routes
})

export default router

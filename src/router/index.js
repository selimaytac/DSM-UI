import Vue from 'vue'
import Router from 'vue-router'
import Signin from '../components/Signin.vue'

Vue.use(Router)
export default new Router({
  routes: [
    {
    path: '/',
    name: 'signin',
    component: Signin,
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../../src/pages/Home/Home.vue'),
  },
  {
    path: '/azureHome',
    name: 'azureHome',
    component: () => import('../../src/pages/AzureDevops/AzureDevOps.vue')
  },
  {
    path: '/sites',
    name: 'sites',
    component: () => import('../../src/pages/Sites/Sites.vue')
  },
  {
    path: '/servers',
    name: 'servers',
    component: () => import('../../src/pages/Servers/Servers.vue')
  },
  {
    path: '/companies',
    name: 'company',
    component: () => import('../../src/pages/Companies/Companies.vue')
  },
  {
    path: '/databaseportal',
    name: 'dbportal',
    component: () => import('../../src/pages/Databaseportal/Databaseportal.vue')
  },
  {
    path: '/reports',
    name: 'reports',
    component: () => import('../../src/pages/Reports/Reports.vue')
  },
  {
    path: '/monitoring',
    name: 'monitoring',
    component: () => import('../../src/pages/Monitoring/Monitoring.vue')
  },
  ],
})

  

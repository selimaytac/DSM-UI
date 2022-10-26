export default [
  {
    path: '/',
    name: 'signin',
    component: () => import('../../src/components/Signin.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../../src/pages/Home/Home.vue'),
    // meta: {
    //   requiresAuth: false,
    // },
  },
  {
    path: '/azureHome',
    name: 'azureHome',
    component: () => import('../../src/pages/AzureDevops/AzureDevOps.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/inventories',
    name: 'inventories',
    component: () => import('../../src/pages/Inventories/Inventory.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/vdf',
    name: 'vdf',
    component: () => import('../../src/pages/VDF/VDF.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/siteInventory',
    name: 'siteInventory',
    component: () => import('../../src/pages/SiteInventory/SiteInventories.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/reidinInventory',
    name: 'reidinInventory',
    component: () => import('../../src/pages/Reidin/Reidin.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/azureInventory',
    name: 'azureInventory',
    component: () => import('../../src/pages/AzureInventory/AzureInventory.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/sites',
    name: 'sites',
    component: () => import('../../src/pages/Sites/Sites.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/servers',
    name: 'servers',
    component: () => import('../../src/pages/Servers/Servers.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/companies',
    name: 'company',
    component: () => import('../../src/pages/Companies/Companies.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/responsible',
    name: 'responsible',
    component: () => import('../../src/pages/Responsible/Responsible.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/databaseportal',
    name: 'dbportal',
    component: () => import('../../src/pages/Databaseportal/Databaseportal.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/reports',
    name: 'reports',
    component: () => import('../../src/pages/Reports/Reports.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/monitoring',
    name: 'monitoring',
    component: () => import('../../src/pages/Monitoring/Monitoring.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/scorecard',
    name: 'scorecard',
    beforeEnter: (to, from, next) => {
      window.open('https://scorecard.fw.dteknoloji.com.tr/', '_blank');
    }
  },
  {
    path: '/grafana',
    name: 'grafana',
    beforeEnter: (to, from, next) => {
      window.open('http://grafana/', '_blank');
    }
  },
  {
    path: '/appdynamic',
    name: 'appdynamic',
    beforeEnter: (to, from, next) => {
      window.open('http://dtappdynamcspoc01:8090/controller/#/', '_blank');
    }
  },
  {
    path: '/zabbix',
    name: 'zabbix',
    beforeEnter: (to, from, next) => {
      window.open('https://dogus-zabbix-web.cloneye.net/', '_blank');
    }
  }
]

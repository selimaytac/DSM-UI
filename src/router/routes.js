export default[
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
]

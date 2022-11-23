export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/auth',
    name: '权限管理',
    icon: 'setting',
    access: '/auth',
    routes: [
      {
        name: '用户管理',
        path: '/auth/user',
        access: '/auth/user',
        component: './auth/user',
      },
      {
        name: '角色管理',
        path: '/auth/role',
        access: '/auth/role',
        component: './auth/role',
      },
      {
        name: '部门管理',
        path: '/auth/department',
        access: '/auth/department',
        component: './auth/department',
      },
      {
        name: '菜单管理',
        path: '/auth/menu',
        access: '/auth/menu',
        component: './auth/menu',
      },
    ],
  },
  {
    name: '模版',
    path: '/template',
    access: '/template',
    component: './template',
  },
  {
    path: '/',
    redirect: '/template',
  },
  {
    component: './404',
  },
];

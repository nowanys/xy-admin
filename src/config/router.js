import * as layouts from '@/layouts'

/**
 * 白名单
 * @type {string[]}
 */
export const whiteList = [
    'login',
    '404',
]

/**
 * 未找到页面路由
 * @type {{redirect: string, path: string, hidden: boolean}}
 */
export const notFoundRouter = {
    path: '/:pathMatch(.*)*',
    redirect: '/exception/404',
    meta: {
        isLogin: false,
        isMenu: false,
    },
}

/**
 * 基础路由
 * 关键字：index,login,exception,404,redirect
 * @type {*[]}
 */
export const constantRouterMap = [
    {
        path: '/',
        name: 'index',
        redirect: '/login',
    },
    {
        path: '/base',
        component: layouts.BaseLayout,
        children: [
            {
                path: '/login',
                name: 'login',
                component: () => import('@/views/login'),
                meta: {
                    title: '登录',
                },
            },
        ],
    },
    {
        path: '/404',
        component: () => import('@/views/exception/404'),
    },
]

/**
 * 动态路由
 */
export const asyncRouterMap = [
    {
        path: 'welcome',
        name: 'welcome',
        component: 'welcome/index.vue',
        meta: {
            icon: 'SmileOutlined',
            title: '欢迎页',
            isMenu: true,
            keepAlive: true,
            permission: '*',
        },
    },
    {
        path: 'form',
        name: 'form',
        component: 'RouteViewLayout',
        meta: {
            icon: 'FormOutlined',
            title: '表单页',
            isMenu: true,
            keepAlive: true,
            permission: '*',
        },
        children: [
            {
                path: 'basic',
                name: 'formBasic',
                component: 'form/basic/index.vue',
                meta: {
                    title: '基础表单',
                    isMenu: true,
                    keepAlive: true,
                    permission: '*',
                },
            },
        ],
    },
    {
        path: 'list',
        name: 'list',
        component: 'RouteViewLayout',
        meta: {
            icon: 'TableOutlined',
            title: '列表页',
            isMenu: true,
            keepAlive: true,
            permission: '*',
        },
        children: [
            {
                path: 'basic',
                name: 'listBasic',
                component: 'list/basic/index.vue',
                meta: {
                    title: '基础列表',
                    isMenu: true,
                    keepAlive: true,
                    permission: '*',
                },
            },
            {
                path: 'card',
                name: 'listCard',
                component: 'list/card/index.vue',
                meta: {
                    title: '卡片列表',
                    isMenu: true,
                    keepAlive: true,
                    permission: '*',
                },
            },
            {
                path: 'search',
                name: 'listSearch',
                component: 'list/search/index.vue',
                meta: {
                    title: '搜索列表',
                    isMenu: true,
                    keepAlive: true,
                    permission: '*',
                },
            },
        ],
    },
    {
        path: 'exception',
        name: 'exception',
        component: 'RouteViewLayout',
        meta: {
            icon: 'WarningOutlined',
            title: '异常页',
            isMenu: true,
            keepAlive: true,
            permission: '*',
        },
        children: [
            {
                path: '403',
                name: '403',
                component: 'exception/403.vue',
                meta: {
                    title: '403',
                    isMenu: true,
                    keepAlive: true,
                    permission: '*',
                },
            },
            {
                path: '404',
                name: '404',
                component: 'exception/404.vue',
                meta: {
                    title: '404',
                    isMenu: true,
                    keepAlive: true,
                    permission: '*',
                },
            },
            {
                path: '500',
                name: '500',
                component: 'exception/500.vue',
                meta: {
                    title: '500',
                    isMenu: true,
                    keepAlive: true,
                    permission: '*',
                },
            },
        ],
    },
    {
        path: 'user',
        name: 'user',
        component: 'RouteViewLayout',
        meta: {
            icon: 'UserOutlined',
            title: '个人页',
            isMenu: true,
            keepAlive: true,
            permission: '*',
        },
        children: [
            {
                path: 'setting',
                name: 'userSetting',
                component: 'user/setting/index.vue',
                meta: {
                    title: '个人设置',
                    isMenu: true,
                    keepAlive: true,
                    permission: '*',
                },
            },
        ],
    },
    {
        path: '',
        name: 'link',
        component: 'RouteViewLayout',
        meta: {
            icon: 'LinkOutlined',
            title: '外部链接',
            isMenu: true,
            keepAlive: false,
            permission: '*',
        },
        children: [
            {
                path: 'https://github.com/mengxianghan/xy-admin',
                name: 'linkBaidu',
                meta: {
                    type: 'link',
                    title: 'Github',
                    target: '_blank',
                    isMenu: true,
                    permission: '*',
                },
            },
        ],
    },
    {
        path: 'iframe',
        name: 'iframe',
        component: 'RouteViewLayout',
        meta: {
            icon: 'AppstoreOutlined',
            title: 'iframe',
            isMenu: true,
            keepAlive: true,
            permission: '*',
        },
        children: [
            {
                path: 'vue',
                name: 'iframeVue',
                component: 'RouteViewLayout',
                meta: {
                    type: 'iframe',
                    url: 'https://cn.vuejs.org',
                    title: 'Vue',
                    isMenu: true,
                    keepAlive: true,
                    permission: '*',
                },
            },
            {
                path: 'antd',
                name: 'iframeAntd',
                component: 'RouteViewLayout',
                meta: {
                    type: 'iframe',
                    url: 'https://www.antdv.com/docs/vue/introduce-cn',
                    title: 'Ant Design Vue',
                    isMenu: true,
                    keepAlive: true,
                    permission: '*',
                },
            },
        ],
    },
]
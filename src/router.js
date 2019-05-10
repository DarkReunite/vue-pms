import Vue from 'vue';
import Router from 'vue-router';

const Login = () => import('@/pages/Login.vue');
const Index = () => import('@/pages/Index.vue');
const Dashboard = () => import('@/views/dashboard/dashboard.vue');
const Park = () => import('@/views/park/park.vue');
const Account = () => import('@/views/account/accountInfo.vue');
const Park_setting = () => import('@/views/park/setting.vue');
const Entry_car = () => import('@/views/entry_car/entryCar.vue');

Vue.use(Router);

const router =  new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: Index,
            children: [
                {
                    path: '',
                    component: Dashboard
                },
                {
                    path: 'park',
                    component: Park,
                },
                {
                    path: 'park_setting',
                    component: Park_setting
                },
                {
                    path: 'account',
                    component: Account
                },
                {
                    path: 'entry_car',
                    component: Entry_car
                }
            ]
        },
        {
            path: '/login',
            component: Login
        }
    ]
});

// // 路由卫士
// router.beforeEach(async (to, from, next) => {
//     let token = window.localStorage.getItem('token');
//     let auth = axios.post

// })

export default router;
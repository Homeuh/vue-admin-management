import Vue from 'vue'
import VueRouter from 'vue-router'
import {Message} from 'element-ui'

Vue.use(VueRouter)

const routes = [
    {   path: "/",redirect: "/login"},
    {   path: "/login",name: "login", component: ()=>import("../views/Login") },
    {
        path: "/main",
        name: "Main",
        component: ()=>import("../views/Main"),
        children: [
            {
                path: "/main",
                redirect: "/home"
            },
            {
                path: "/home",
                name: "home",
                component: ()=>import("../views/Home/home"),
            },
            {
                path: "/users",
                name: "users",
                component: ()=>import("../views/User/users"),
            },
            {
                path: "/roles",
                name: "roles",
                component: ()=>import("../views/Right/roles"),
            },
            {
                path: "/rights",
                name: "rights",
                component: ()=>import("../views/Right/rights"),
            },
            {
                path: "/goods",
                name: "goods",
                component: ()=>import("../views/Goods/goods"),
            },
            {
                path: "/params",
                name: "params",
                component: ()=>import("../views/Goods/params"),
            },
            {
                path: "/categories",
                name: "categories",
                component: ()=>import("../views/Goods/categories"),
            },
            {
                path: "/orders",
                name: "orders",
                component: ()=>import("../views/Order/orders"),
            },
            {
                path: "/reports",
                name: "reports",
                component: ()=>import("../views/Report/reports"),
            },
        ]
    },
]

//解决连续点击相同路由导致报错问题(不影响正常操作行为)
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to,from,next) => {
    if(to.path === "/login") return next();
    const tokenStr = window.sessionStorage.getItem("token");
    // console.log(tokenStr);
    if(!tokenStr){
        Message.warning("您的会话已过期，请重新登录！")
        return next("/login")
    }
    next()
})

export default router
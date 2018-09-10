import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
	mode: 'history',
  	routes: [
    {
        path: '/index',
        meta: {
          title: '首页'
        },
        component: (resolve) => require(['../component/index.vue'], resolve)
    },
    {
        path: '/personal',
        meta: {
          title: '登录'
        },
        component: (resolve) => require(['../component/personal.vue'], resolve)
    },
    {
        path: '*',
        redirect: '/index'
    }
  ]
})

router.beforeEach((to, from, next) => {
    window.document.title = to.meta.name;
    next();
});

router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});

export default router;
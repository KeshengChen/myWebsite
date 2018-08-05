import Vue from 'vue';
import Vuex from 'vuex'
import VueRouter from 'vue-router';
import App from './App.vue'

Vue.use(VueRouter);
Vue.use(Vuex);
// 路由配置
const Routers = [
    {
        path: '/index',
        meta: {
            title: '首页'
        },
        component: (resolve) => require(['./component/index.vue'], resolve)
    },
    {
        path: '/login',
        meta: {
            title: '关于'
        },
        component: (resolve) => require(['./component/login.vue'], resolve)
    },
    {
        path: '*',
        redirect: '/index'
    }
];
const RouterConfig = {
    // 使用 HTML5 的 History 路由模式
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    next();
});

router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});
//vuex
  const store = new Vuex.Store({
    state:{
      IsLogin:false,
      UserName:'',
      PhotoList:[],
      MessageList:[]
    },
    mutations:{

        login(state,params){
            state.IsLogin=params.islogin;
            state.UserName=params.username;
            state.PhotoList=params.photolist;
            state.MessageList=params.messagelist;
        }
    }
  });
new Vue({
  el: '#app',
  store:store,
  router: router,
  render: h => h(App)
})

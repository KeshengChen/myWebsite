import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './App.vue';
import Axios from 'axios';
import VueAxios from 'vue-axios';
import crypto from 'crypto';

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueAxios,Axios);
Vue.prototype.crypto=crypto;
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
        path: '/personal',
        meta: {
          title: '登录'
        },
        component: (resolve) => require(['./component/personal.vue'], resolve)
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
    // if(!store.state.IsLogin && to.path!='/login'){
    //     console.log("redirect");
    //     router.push({path:"/login"});  
    // }
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
      UserInfo:{},
      PhotoList:[],
      MessageList:[]
    },
    mutations:{
        login(state,params){
            state.IsLogin=params.islogin;
            state.UserInfo=params.userinfo;
        },
        change(state,params){
            state.UserInfo=params.userinfo;
        },
        logout(state){
            state.IsLogin=false;
            state.UserInfo={PhotoList:[],MessageList:[]};
        }
    }
  });
new Vue({
  el: '#app',
  store:store,
  router: router,
  render: h => h(App)
})

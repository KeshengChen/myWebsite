import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
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


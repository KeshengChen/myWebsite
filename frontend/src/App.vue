<template>
  <div>
    <headerlist></headerlist>
    <router-view></router-view>
  </div>
</template>

<script>
import menu from './component/Menu';
export default {
  name: 'app',
  mounted(){
    this.$http.post("http://gfs920q.cn/CheckLogin").then((res)=>{
        this.$store.commit({
              type:'login',
              islogin:res.data.islogin,
              username:res.data.username,
              photolist:res.data.photolist,
              messagelist:res.data.messagelist
            }) 
        if(!this.$store.state.IsLogin){
          this.$router.push("/login");
        }
    })
  },
  components:{
    headerlist:menu
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
*{
  padding:0;
  margin: 0;
}
body,input{
  font-size: 0.8rem;
  line-height: 0.8rem;
}
</style>

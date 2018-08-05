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
    this.$store.commit({
      type:'login',
      islogin:true,
      username:"ks",
      photolist:["p1","p2"],
      messagelist:["m1"]
    })
    console.log("mtd2")
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
body{
  font-size: 0.8rem;
}
</style>

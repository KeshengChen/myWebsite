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
    console.log("mounted")
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
</style>

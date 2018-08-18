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
.btn{
  user-select: none;
  padding: 0.5rem;
  text-align: center;
  box-shadow: 0.2rem 0.2rem rgba(38, 55, 87, 0.863);
  width:100%;
  background-color:rgba(94, 128, 190, 0.863);
  border-radius: 0.3rem;
  font-size: 1.2rem;
  cursor:pointer;
}
</style>

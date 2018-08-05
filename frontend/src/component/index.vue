<template>
  <div>
    <h1>welcome to kesheng website</h1>
  <router-link to="/login">go to login</router-link>
  <Login></Login>
  </div>
</template>

<script>
import login from './login';
export default {
  components:{
    Login:login
  }
}
</script>

<style>

</style>

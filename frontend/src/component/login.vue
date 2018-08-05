<template>
  <div>
    login
    <button @click="gotoindex">gotoindex</button>
  </div>
</template>

<script>
export default {
methods:{
  gotoindex(){
    var xhr = new XMLHttpRequest();
    xhr.open("get","/getUsage")
    xhr.onreadystatechange=()=>{
      if(xhr.readyState==4 && xhr.status==200){
        console.log(xhr.responseText);
      }
    }
    xhr.send();
    this.$router.push('/index')
  }
}
}
</script>

<style>

</style>

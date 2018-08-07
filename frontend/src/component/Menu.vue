<template>
<div>
    <header>
        <div>
        <router-link to ="/index">首页</router-link>
        </div>
        <div>
            
  <a href="http://zzfws.bjjs.gov.cn/enroll/home.jsp">住建部共有产权</a>
        </div>
        <div v-if="IsLogin">
            User:{{UserName}}
        </div>
        <div v-else>
            
        <router-link to = "/login">登录</router-link>
        </div>
    </header>
            </div>
</template>

<script>
export default {
    computed:{
        UserName(){
            return this.$store.state.UserName;
        },
        IsLogin(){
            return this.$store.state.IsLogin; 
        }
    }
}
</script>

<style scoped>
header{
    border:1px solid black;
    display: flex;
    justify-content: space-around;
    padding: 1rem 0px;
}
hedaer+div{
    flex:0 0 70%；
}
</style>

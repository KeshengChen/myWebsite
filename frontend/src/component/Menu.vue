<template>
<div>
    <header>
        <div>
            <ul>
                <li><router-link to ="/index">首页</router-link></li>
            </ul> 
        </div>
        <div>    
            <ul>
                <li> <a href="http://zzfws.bjjs.gov.cn/enroll/home.jsp">住建部共有产权</a></li>
            </ul> 
        </div>
        <div v-if="IsLogin">           
            <ul>
                <li style="font-weight:bold" @click="me">{{UserName}}</li>
                <li><a href="javascript:void(0)" @click="lgout">退出</a></li>
                <li><router-link to = "/personal">设置</router-link></li>
            </ul>
        </div>
        <div v-else>
            <ul>
                <li @click="me">我</li>
                <li><router-link to = "/login">登录</router-link></li>
                <li><router-link to = "/signup">注册</router-link></li>
            </ul>
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
    },
    methods:{
        me(){
            this.$router.push("/personal");
        },
        lgout(){
            this.$store.commit({type:'logout'}) 
            this.$router.push("/login");  
        }
    }
}
</script>

<style scoped>
*{
    user-select: none;
}
header{
    background-color:rgba(5, 44, 104, 0.8);
    display: flex;
    justify-content: space-around;
    height: 2rem;
    align-items: stretch;
}

header>div{
    flex:0 0 7rem;
    align-items: center;
    height: 100%;
}
a{
    text-decoration:none;
    display: block;
    height: 100%;
    width:100;
    color:white;
    line-height: 2rem;
    text-align: center;
}
ul {    
    height: 100%;
    list-style: none;
    position: relative
}
ul li:nth-child(n+2){
    display: none;
}
ul li{
    display: flex;
    align-items: center;
    color: white;
    animation: usernamecolor 10s infinite;
    justify-content: center;
    height: 100%;
    width:100%;
    text-align: center;
}
@keyframes usernamecolor{
    50%{
        color: red;
    }
      60%,40%{
        color:yellow;
    }
         80%,20%{
        color:green;
    }
    0%,100%{
        color: white;
    }
}
ul:hover li{
    background-color: azure;
    display: flex;
}
ul li:hover{
    background-color:red;
}
ul:hover li a{
    color:black;
}
</style>

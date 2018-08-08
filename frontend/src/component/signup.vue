<template>   
<div class="container">
    <section>
      <div>
    <h1>请登录</h1>
      </div>
    <div>
      <article>昵称</article>:
      <input v-model="username" placeholder="输入昵称" type="text" />
    </div>
    <div>
      <article>账号</article>:
      <input v-model="alias" placeholder="输入账号" type="text" />
    </div>
    <div>
      <article>密码</article>:
      <input v-model="pwd1" placeholder="输入密码" type="password"/>
    </div>
    <div>
      <article>确认密码</article>:
      <input v-model="pwd2" placeholder="再次确认密码" type="password"/>
    </div>
  <div>
      <div class="btn" @click.stop="login">创 建</div>
  </div>
  <div>
      <div class="errmsg"><label v-if="msg!=''">{{msg}}</label></div>
      <router-link to="/login">登录</router-link>
    </div>
  </section>  
</div>
</template>

<script>
const crypto = require("crypto");
export default {
data(){
 return {alias:"",pwd1:"",pwd2:"",username:"",msg:""}
},
methods:{
  login(){
    if(this.username==''){
      this.msg="请输入昵称。";
      return;
    }else if(this.alias==''){
      this.msg="请输入账号。";
      return;
    }else if(this.pwd1==''){
      this.msg="请输入密码。";
      return;
    }else if(this.pwd2==''){
      this.msg="请确认密码。";
      return;
    }else if(this.pwd2!=this.pwd1){
      this.msg="密码不一致。";
      return;
    }else if(this.pwd2.length<6){
      this.msg="密码太短。";
      return;
    }else{
      this.msg='';
    }



    var cer={};
    cer.username=this.username;
    cer.alias=this.alias;
    let md5 = crypto.createHash("md5");
    cer.pwd= md5.update(this.pwd1).digest("hex");

    
    }
  }
}
</script>

<style scoped>
article{
 text-align: justify;
  width:3.2rem;
}
article:after{
  padding-left: 100%;
  display: inline-block;
  content: "";
  height: 0;
}
.container{
  display: flex;
  justify-content: center;
  align-content: center;
}
section{  
  margin:1rem auto;
  width:15rem;
  border-radius:1rem;
  background-color: rgba(100,100,200,0.5)
}
section>div{
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  margin: 1rem;
}
.errmsg{
  color: red;
  flex:0 0 8rem;
}

</style>
<style>
  .btn{
  user-select: none;
  padding: 0.5rem;
  text-align: center;
  box-shadow: 0.2rem 0.2rem;
  width:13rem;
  background-color: chocolate;
  border-radius: 0.2rem;
  font-size: 1rem;
  cursor:pointer;
}
</style>

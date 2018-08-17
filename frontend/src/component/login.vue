<template>   
<div class="container">
    <section>
      <div>
    <h1>请登录</h1>
      </div>
    <div>
      <article>账号:</article>
      <input v-model="alias" placeholder="输入账号" type="text"/>
    </div>
    <div>
      <article>密码:</article>
      <input v-model="pwd" placeholder="输入密码" type="password"/>
    </div>
  <div>
      <div class="btn" @click.stop="login">登 录</div>
  </div>
  <div>
      <div class="errmsg"><label v-if="msg!=''">{{msg}}</label></div>
      <router-link to="/signup">创建账号</router-link>
    </div>
  </section>  
</div>
</template>

<script>
const crypto = require("crypto");
export default {
data(){
 return {alias:"sa2",pwd:"pwd",msg:""}
},
methods:{
  login(){
    if(this.alias==''){
      this.msg="请输入账号。";
      return;
    }else if(this.pwd==''){
      this.msg="请输入密码。";
      return;
    }else{
      this.msg='';
    }


    var cer={};
    cer.Alias=this.alias;
    cer.PassWord=this.pwd;
    let md5 = crypto.createHash("md5");
    cer.pwd= md5.update(this.pwd).digest("hex");
    this.$http.post("http://gfs920q.cn/Login",cer).then((res)=>{
        if(res.data.login){
          this.$store.commit({
            type:'login',
            islogin:res.data.login,
            username:res.data.username,
            photolist:res.data.photolist,
            messagelist:res.data.messagelist
          }) 
          this.msg=res.data.msg;
          this.$router.push("/index");        
        }else{
          this.msg=res.data.errorMsg;
        }
    })
  },
  gotoindex(){
    this.$router.push('/index')
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
  width: 100%;
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

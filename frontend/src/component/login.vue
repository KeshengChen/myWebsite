<template>   
<div class="container">
    <section>
      <div>
    <h1>请登陆</h1>
      </div>
    <div>
      <article>账号:</article>
      <input v-model="alias" placeholder="输入账号" type="text" />
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
      <router-link to="/index">创建账号</router-link>
    </div>

</section>  </div>
</template>

<script>
const crypto = require("crypto");
export default {
data(){
 return {alias:"",pwd:"",msg:""}
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
    cer.alias=this.alias;
    let md5 = crypto.createHash("md5");
    cer.pwd= md5.update(this.pwd).digest("hex");
    var xhr = new XMLHttpRequest();
    xhr.open("get","/login")
    xhr.onreadystatechange=()=>{
      if(xhr.readyState==4 && xhr.status==200){
        var obj = JSON.parse(xhr.responseText);
        if(obj.islogin){
            this.$store.commit({
              type:'login',
              islogin:obj.islogin,
              username:obj.username,
              photolist:obj.photolist,
              messagelist:obj.messagelist
            })         
        }else{
          this.msg=obj.errorMsg;
        }
      }
    }
    xhr.send();
  },
  gotoindex(){

    this.$router.push('/index')
  }
}
}
</script>

<style scoped>
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
  margin: 1rem;
}
.errmsg{
  color: red;
  flex:0 0 8rem;
}
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

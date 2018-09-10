<template>
    <div class="login"> 
        <div>
            <article>账号:</article>
            <input v-model="alias" @change="checkIfExists" placeholder="输入账号" type="text"/>
        </div>
        <div>
            <article>密码:</article>
            <input v-model="pwd" placeholder="输入密码" type="password"/>
        </div>
        <div>
            <div class="btn" @click.stop="login">登 录</div>
        </div>
        <div>
            <div class="errmsg"><label>{{msg}}</label></div>
            <router-link to ="/signup">创建</router-link>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
        alias:"sa2",
        pwd:"pwd",
        msg:"",}
    },
    mounted(){
        this.src='';
        this.msg='';
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
            let md5 = this.crypto.createHash("md5");
            cer.pwd= md5.update(this.pwd).digest("hex");
            this.$http.post("http://gfs920q.cn/Login",cer).then((res)=>{
                console.log(res.data)
                if(res.data.login){
                    this.$store.commit({
                        type:'login',
                        islogin:res.data.login,
                        userinfo:res.data.userinfo
                    }) 
                    this.getHIsrc();   
                }else{
                    this.msg=res.data.msg;
                }
            })
        },
    }
}
</script>

<style scoped>
.login{
    padding:1rem;
}
.login > div{
    display:flex;
    margin: 1rem 0;
    justify-content: space-between;
}
.login > div article{
    flex:0 0 4rem;
    text-align: center;
}
.login > div input{
    flex:1;
}
.errmsg{
    color: red;
}
</style>

<template>
    <div>       
        <div class="login"> 
            <div>
                <article>昵称:</article>
                <input v-model="username" placeholder="输入昵称" type="text" />
            </div>
            <div>
                <article>账号:</article>
                <input v-model="alias" @change="checkIfExists" placeholder="输入账号" type="text"/>
            </div>
            <div>
                <article>密码:</article>
                <input v-model="pwd" placeholder="输入密码" type="password"/>
            </div>
            <div>
                <article>确认密码:</article>
                <input v-model="pwd2" placeholder="再次确认密码" type="password"/>
            </div>
            <div>
                <div class="btn" @click.stop="signup">创 建</div>
            </div>
            <div>
                <div class="errmsg"><label>{{msg}}</label></div>
                <a href="javascript:void(0)" @click="swapModel">{{issignup?"登录":"创建账号"}}</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
        username:"",
        alias:"sa2",
        pwd:"pwd",
        pwd2:"",
        msg:"",
        issignup:false,
        aliasexists:true
        }
    },
    mounted(){
    },
    methods:{
        checkIfExists(){
            console.log('checkIfExists');
            if(this.issignup&&this.alias.length>0){
                let cer={};
                cer.Alias=this.alias
                this.$http.post('/CheckAliasExists',cer).then((res=>{
                    console.log(res);
                    this.aliasexists=res.data.exist;
                    this.msg=res.data.msg;
                }))
            }
        },
        signup(){
            if(this.username==''){
               this.msg="请输入昵称。";
                return;
            }else if(this.alias==''){
                this.msg="请输入账号。";
                return;
            }else if(this.pwd==''){
                this.msg="请输入密码。";
                return;
            }else if(this.pwd2==''){
                this.msg="请确认密码。";
                return;
            }else if(this.aliasexists){
                this.msg="账号已经被占用。";
                return;
            }else if(this.pwd2!=this.pwd){
                this.msg="密码不一致。";
                return;
            }else if(this.pwd2.length<6){
                this.msg="密码太短。";
                return;
            }else{
                this.msg='';
            }
            var cer={};
            cer.UserName=this.username;
            cer.Alias=this.alias;
            let md5 = this.crypto.createHash("md5");
            cer.pwd= md5.update(this.pwd).digest("hex");
            console.log(cer)
            this.$http.post('/SignUp',cer).then((res)=>{
                if(res.success==true){
                if(res.data.login){
                    this.$store.commit({
                        type:'login',
                        islogin:true,
                        userinfo:res.data.userinfo
                    }) 
                }else{
                    this.msg=res.data.msg;
                }
                }
            })
        }
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

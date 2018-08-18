<template>
    <div>
        <section>
            <div v-if="this.$store.state.IsLogin">
                <div class="userinfo">
                    <div class="headarea"  :style="src"></div> 
                    <div style="flex:0 0 1rem"></div>
                    <div class="userdetail">
                        <div>{{this.$store.state.UserName}}<span>&equiv;</span></div>
                        <div>帐号:{{this.$store.state.Alias}}</div>
                    </div>
                </div>
                <div class="btnpanel">
                    <div class="btn" @click="logout">退出登录</div>
                </div>
            </div>
            <div class="login" v-else> 
                <div v-if="issignup">
                    <article>昵称:</article>
                    <input v-model="username" placeholder="输入昵称" type="text" />
                </div>
                <div>
                    <article>账号:</article>
                    <input v-model="alias" placeholder="输入账号" type="text"/>
                </div>
                <div>
                    <article>密码:</article>
                    <input v-model="pwd" placeholder="输入密码" type="password"/>
                </div>
                <div v-if="issignup">
                    <article>确认密码:</article>
                    <input v-model="pwd2" placeholder="再次确认密码" type="password"/>
                </div>
                <div v-if="!issignup">
                    <div class="btn" @click.stop="login">登 录</div>
                </div>
                <div v-if="issignup">
                    <div class="btn" @click.stop="signup">创 建</div>
                </div>
                <div>
                    <div class="errmsg"><label>{{msg}}</label></div>
                    <a href="javascript:void(0)" @click="swapModel">{{issignup?"登录":"创建账号"}}</a>
                </div>
            </div>
        <input style="display:none;" type="file" ref="filterGetter" @change="getfiles($event)" accept="image/jpeg,image/gif"/>
        </section>
    </div>
</template>

<script>
export default {
    data(){
        return {headimage:{},src:"",username:"",alias:"sa2",pwd:"pwd",pwd2:"",msg:"",issignup:false}
    },
    methods:{
        selectImage(){
			this.$refs.filterGetter.click();
        },        
        logout(){
            this.$store.commit({type:'logout'}) 
        },
        getfiles(event){
			this.src='background-image:url('+window.URL.createObjectURL(event.target.files[0])+')';				
        },
        swapModel(){
            this.issignup=!this.issignup;
        },
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
                        username:res.data.username,
                        photolist:res.data.photolist,
                        messagelist:res.data.messagelist
                    })     
                }else{
                    this.msg=res.data.msg;
                }
            })
        },
        signup(){
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
section{
    padding: 2rem;
}
.userinfo{
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid gery;
}
.headarea{
    flex: 0 0 4rem;
    height: 4rem;
    border:1px solid black;
    position: relative;
    background-size: cover;
    border-radius: 2.5rem;
}
.userdetail{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
}
.userdetail > div{
    display: flex;
    width: 100%;
    justify-content: space-between;
}
.btnpanel{
    margin-top: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login{
    padding:1rem;
}
.login *{
    border:1px solid black;
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

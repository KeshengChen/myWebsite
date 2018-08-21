<template>
    <div>
        <section>
            <div v-if="this.$store.state.IsLogin">
                <div v-if="allscreen" class="maximage" >
                    <div>
                        <a href="javascript:void(0)" @click="hideallsc">返回</a>
                        <a v-if="!headchanged" href="javascript:void(0)" @click="selectImage">修改</a>
                        <a v-else href="javascript:void(0)" @click="saveHeadImage">保存</a>
                    </div>
                    <div :style="src"></div>
                </div>
                <div class="userinfo">
                    <div class="headarea"  :style="HIsrc" @click="fillallsc"></div> 
                    <div style="flex:0 0 1rem"></div>
                    <div class="userdetail">
                        <div>{{this.$store.state.UserInfo.UserName}}<span>&equiv;</span></div>
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
        <input style="display:none;" type="file" ref="filterGetter" @change="getfiles($event)" accept="image/jpeg,image/png"/>
        </section>
    </div>
</template>

<script>
export default {
    data(){
        return {allscreen:false,headchanged:false,headimage:{},src:"",HIsrc:"",username:"",alias:"sa2",pwd:"pwd",pwd2:"",msg:"",issignup:false,file:false}
    },
    mounted(){
		this.getHIsrc();
    },
    methods:{
		getHIsrc(){
				this.$http.post(
					"/HeadImage",undefined,{responseType:'blob'}
				).then(
					function(res){
						this.HIsrc='background-image:url('+window.URL.createObjectURL(res.data)+')'
						this.src=this.HIsrc;
						}.bind(this)
					)
		},
        selectImage(){
			this.$refs.filterGetter.click();
        }, 
        saveHeadImage(){
            this.headchanged=false;
        	let param = new FormData() 
				param.append('file', this.file, this.file.name) 
			
			let config = {
				headers: {'Content-Type': 'multipart/form-data'}
			}
			this.$http.post("/UploadHeadImage",param,config).then((res)=>{
                if(res.data.login===false){              
                    this.msg=res.data.msg;
                }else if(res.data.success===true){    
                    this.$store.commit({
                        type:'change',
                        userinfo:res.data.userinfo
                    }) 
					this.getHIsrc();
                }
			})
        },
        fillallsc(){
            this.allscreen=true;
        }, 
        hideallsc(){
            if(this.headchanged){
                if(confirm("保存？")){
                    this.saveHeadImage();
                }
            }
          this.allscreen=false;  
        },   
        logout(){
            this.$store.commit({type:'logout'}) 
        },
        getfiles(event){
            if(event.target.files.length>0){
                this.headchanged=true;
                this.file=event.target.files[0]
			    this.src='background-image:url('+window.URL.createObjectURL(event.target.files[0])+')';				
            }else{
                this.file=false; 
            }
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
                        userinfo:res.data.userinfo
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
.maximage{
    background: gray; 
    position: fixed; 
    left: 0px; 
    top: 0px; 
    width: 100%; 
    height: 100%;  
    z-index: 20; 
}
.maximage div:nth-child(1){
    display: flex;
    width: 100%;
    height: 2rem;
    justify-content: space-between;
    align-items: center;
}
.maximage div:nth-child(2){
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    margin:auto;
    position: absolute;
    background-color: white;
    width:100%;
    height: 100vw;
    background-size: cover;
}
@keyframes allsc {
    0%{
        height: 1rem;
        width: 1rem;
    }
    100%{
        width:100%;
        height: 100vw;
    }
}
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

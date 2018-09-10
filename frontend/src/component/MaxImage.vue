<template>
    <div>
        <div class="maximage" >
            <div>
                <a href="javascript:void(0)" @click="backpersonal">返回</a>
                <a v-if="!localchanged" href="javascript:void(0)" @click="selectImage">修改</a>
                <a v-else href="javascript:void(0)" @click="saveHeadImage">保存</a>
            </div>
            <div :style="localchanged?src:HDsrc"></div>               
        </div>
        <input style="display:none;" type="file" ref="filterGetter" @change="getfiles($event)" accept="image/jpeg,image/png"/>
    </div>
</template>

<script>
export default {
    data(){
        return {
            src:"",
            oldsrc:"",
            newsrc:"",
            localchanged:false,
            file:false
        }
    },
    mounted(){
        this.src='';
        this.msg='';
        this.issignup=false;
        this.aliasexists=true;
        this.file=false;
    },
    methods:{     
        backpersonal(){
            this.$router.push({
                path:'/personal',
                params:{
                    changeHI:this.changed,
                    src:this.src
                }
            })
        },   
        selectImage(){
			this.$refs.filterGetter.click();
        }, 
		getHDsrc(){
            this.$http.post(
                "/HeadImage",undefined,{responseType:'blob'}
            ).then(
                function(res){
                    this.HIsrc='background-image:url('+window.URL.createObjectURL(res.data)+')'
                    this.src=this.HIsrc;
                }.bind(this)
            )
            setTimeout(function(){                
                this.$http.post(
                    "/HeadImageHD",undefined,{responseType:'blob'}
                ).then(
                    function(res){
                        this.HDsrc='background-image:url('+window.URL.createObjectURL(res.data)+')'
                    }.bind(this)
                )
            }.bind(this),1000)
        },
        saveHeadImage(){
            this.headchanged=false;
        	let param = new FormData() 
				param.append('file', this.file, this.file.name)			
			let config = {
				headers: {'Content-Type': 'multipart/form-data'}
			}
					this.HIsrc=this.src; 
					this.HDsrc=this.src;
			this.$http.post("/UploadHeadImage",param,config).then((res)=>{
                console.log(res.data)
				if(res.data.login===false){              
                    this.msg=res.data.msg;
                }else if(res.data.success===true){    
                    this.$store.commit({
                        type:'change',
                        userinfo:res.data.userinfo
                    })
                }
			})
        },
        fillallsc(){
            this.allscreen=true;
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

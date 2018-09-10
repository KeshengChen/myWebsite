<template>
    <div>
        <div class="userinfo">
            <div class="headarea"  :style="HIsrc" @click.stop="checkMaxImage"></div> 
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
</template>

<script>
export default {
    data(){
        return {
            HIsrc:""
        }
    },
    mounted(){
        this.HIsrc='';
        this.getHIsrc();
    },
    methods:{
        checkMaxImage(){
            this.$router.push({
                path:'/maxheadimage',
                params:{
                    minimage:this.HIsrc
                }
            })
        },
		getHIsrc(){
            this.$http.post(
                "/HeadImage",undefined,{responseType:'blob'}
            ).then(
                function(res){
                    this.HIsrc='background-image:url('+window.URL.createObjectURL(res.data)+')'
                }.bind(this)
            )
        },
        logout(){
            this.$store.commit({type:'logout'}) 
            this.$http.post('/Logout')
            this.$router.push('/personal')
        }        
    }
}
</script>

<style scoped>
.headarea{
    flex: 0 0 4rem;
    height: 4rem;
    border:1px solid black;
    position: relative;
    background-size: cover;
    border-radius: 2.5rem;
}
.userinfo{
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid gery;
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
</style>

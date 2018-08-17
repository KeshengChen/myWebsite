<template>
    <div>
        <div>{{src==""?"还没有头像请上传":"头像"}}</div>
        <div class="headarea"  :style="src">
            
            <span>
                <div @click="selectImage" >选择</div>
                <div>上传</div>
            </span>
        </div> 
        <input style="display:none;" type="file" ref="filterGetter" @change="getfiles($event)" accept="image/jpeg,image/gif"/>
    </div>
</template>

<script>
export default {
    data(){
        return {headimage:{},src:""}
    },
    methods:{
        selectImage(){
			this.$refs.filterGetter.click();
        },
        getfiles(event){

					this.src='background-image:url('+window.URL.createObjectURL(event.target.files[0])+')';
				
		}	
    }
}
</script>

<style>
.headarea{
    width: 10rem;
    height: 10rem;
    border:1px solid black;
    position: relative;
    background-size: cover;
    border-radius: 5rem;
}
.headarea span{
    display: flex;
    position: absolute;
    top:102%;
    left: 10%;
    width:80%;
    height: 2rem;
    align-items: stretch;
    justify-content: space-between;
}
.headarea span div{
    flex:0 0 48%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    border:1px solid black;
}
.headarea span:hover div{    
    border:1px solid transparent;
    background-color:grey;
    border-radius: 50%;
}
.headarea span div:hover{
    background-color: red;
    cursor: pointer;
}
</style>

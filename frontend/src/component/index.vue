<template>
  <div>
    <div class="photolist">
	    <div class="kuang" v-for="(src,index) in srcs" :key="index">
			    <figure class="img" :style="src" @click="removeImg(index)"> </figure>			    
	    </div>
		<div class="kuang" v-if="srcs.length!=9" @click="addimg"><figure class="addsub" ><div></div><span></span></figure></div>
			<div class="kuang" v-if="srcs.length==1||srcs.length==4||srcs.length==7 " @click="addimg"></div>
	</div>
	<div>
		<div class="btn" v-if="srcs.length>0" @click="uploadimg">Uplaod</div>
	</div>
	<input style="display:none;" type="file" ref="filterGetter" @change="getfiles($event)" multiple="" accept="image/jpeg,image/gif"/>
  </div>
</template>

<script>
export default {
	mounted(){
	},
	data(){
		return{files:[],srcs:[]}	
	},
	methods:{
		addimg(){
			this.$refs.filterGetter.click();
		},
		removeImg(ind){
			this.srcs.splice(ind,1)
			this.files.splice(ind,1)
		},		
		getfiles(event){
			new Array().map.call(event.target.files,
				(item,index)=>{
					this.files.push(item);
					this.srcs.push('background-image:url('+window.URL.createObjectURL(item)+')');
				});
		},		
		uploadimg(){
			let param = new FormData() 
			this.files.forEach((item)=>{
				param.append('file', item,item.name) 
			})
			
			let config = {
				headers: {'Content-Type': 'multipart/form-data'}
			}
			this.$http.post("/upload",param,config).then((res)=>{
			})
		}
	}
}
</script>

<style scoped>
.photolist{
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
.img{
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
.addsub{
	background-color: rgba(200,200,200,0.8);
  	height: 100%;
  	position: relative;
}
.addsub span{
	background-color: white;
	height: 16%;
	width: 90%;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
}
.addsub div{
	background-color: white;
	height: 16%;
	width: 90%;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%) rotate(90deg);
}
.kuang{
	border-radius: 0.3rem;
	margin: 0.5rem;
	overflow: hidden;
	width: 10rem;
	height: 10rem;
}
</style>

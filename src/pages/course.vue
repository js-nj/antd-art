<template>
	<div>
		<h5>课程详情</h5>
	</div>
</template>

<script>
	import api from '../api/api.js'
	export default {
		name:'course',
		created(){
			this.getCourseById();
		},
		data(){
			return {
				
			}
		},
		methods:{
			getCourseById(){
				this.$axios(api.ProductDetails,{
					token:'',//	*用户token
					user_id:'',//	string	*用户ID
					product_id:'',//
				}).then((res)=>{
					if(res.code){
						
					}
				});
			}
		}
	}
</script>

<style>
</style>

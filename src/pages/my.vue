<template>
	<div class="my">
		<div class="my-head" style="">
			<img style="" :src="user_avatar" />
			<span class="name">{{user_name}}</span>
		</div>
		<div class="my-menus">
			<div class="my-menu" @click="gotoOrder">
				<a-icon type="bars" />
				<span>我的订单</span>
				<a-icon class="my-arrow-right" type="right" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name:'My',
	data(){
		return {
			user_avatar:'',
			user_name:'',
		}
	},
	methods:{
		gotoOrder(){
			this.$router.push({
				path: '/order',
			})
		}
	},
	created(){
		if(localStorage.getItem('userInfo')){
			window._userInfo = JSON.parse(localStorage.getItem('userInfo'))
		}
		this.user_avatar = window._userInfo.user_avatar?window._userInfo.user_avatar:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201604%2F02%2F20160402173031_JYyrn.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624435128&t=1c9dc4d3b231d5b53e3192d277bc7e40";
		this.user_name = window._userInfo.user_name?window._userInfo.user_name:window._userInfo.user_phone;
	}
}
</script>

<style scoped>
.my-head {
	height:150px;
	background: url(../assets/my-head.png) top no-repeat;
	background-size: 100% 100%;
	position: relative;
}
.my-head img {
	width:62px;
	height:62px;
	border-radius:64px;
	display:inline-block;
	    position: absolute;
    top: 44px;
    left: 34px;
}
.my-head .name{
	font-size: 16px;
    position: absolute;
    top: 48px;
    left: 122px;
}
.my-menus {
	padding: 48px 24px 16px 24px;
	text-align: left;
}
.my-menu {
	width: 95%;
	margin:0 auto;
	font-size: 18px;
	overflow: auto;
	padding-bottom: 8px;
	border-bottom: solid 1px #EEEEEE;
}
.my-menu span{
	display: inline-block;
	padding-left: 24px;
	/*font-size: 16px;*/
}
.my-arrow-right {
	float: right;
	position: relative;
	top:4px;
	font-size: 12px;
	color:#999;
}
</style>

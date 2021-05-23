<template>
	<div class="course">
		<!-- <h5>课程详情</h5> -->
		<div class="width:100%;height:300px;">
			<img style="width:100%;height:100%;" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fs2.best-wallpaper.net%2Fwallpaper%2F1920x1200%2F1205%2FCreative-I-love-music_1920x1200.jpg&refer=http%3A%2F%2Fs2.best-wallpaper.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624357179&t=7b05a4b3f679f3aeeddced9dc88ae4c0" />
		</div>
		<div class="c-items">
			<div class="c-item">
				<h5 class="c-item-h">课程介绍</h5>
				<div class="c-item-b">{{course_introduction}}</div>
			</div>
			<div class="c-item">
				<h5 class="c-item-h">课程大纲</h5>
				<div class="c-item-b">{{course_syllabus}}</div>
			</div>
			<div class="c-item">
				<h5 class="c-item-h">课程评价</h5>
				<div class="c-item-b">{{course_evaluation}}</div>
			</div>
		</div>
		<div class="course-button">
			<a-button type="primary" html-type="submit" class="login-form-button">立即报名</a-button>
		</div>
	</div>
</template>

<script>
let tmpStr = '音符1、全音符：没有符干和符尾的空心的白色音符叫“全音符”。2、二分音符：带有符干、没有符尾的白色音符叫“二分音符”。等于全音符1/2的时值；3、四分音符：带有符干、没有符尾的黑色音符叫“四分音符”。等于全音符1/4的时值；4、八分音符：带有符干和1条符尾的黑色音符叫“八分音符”。等于全音符1/8的时值；5、十六分音符：带有符干和2条符尾的黑色音符叫“十六分音符”。等于全音符1/16的时值；6、三十二分音符：带有符干和3条符尾的黑色音符叫“三十二分音符”。等于全音符1/32的时值；7、六十四分音符：带有符干4条符尾的黑色音符叫“六十四分音符”。等于全音符1/64的时值。';
	import Api from '../api/api.js'
	export default {
		name:'course',
		created(){
			this.getCourseById();
		},
		data(){
			return {
				course_introduction:tmpStr,
				course_syllabus:tmpStr,
				course_evaluation:tmpStr,
			}
		},
		methods:{
			getCourseById(){
				let param = {
					"product_id":"79643d1d60974bd1905a1a35514ac86a",
					"user_id":""
				};
				// this.$axios({
				// 	url:Api.ProductDetails,
				// 	method:'get',
				// 	params:{
				// 		ID: 12345
				// 		// request_content: JSON.stringify(param)
				// 	}
				// this.$axios.get(Api.CommentList,{
				// 
				// this.$axios.get(Api.ProductDetails,{
				// 	"product_id":"79643d1d60974bd1905a1a35514ac86a",
				// 	"user_id":""
				this.$axios({
				    method: 'get',
				    url: Api.ProductDetails+'?request_content='+JSON.stringify(param),
				    // params: {request_content: JSON.stringify(param)},
				})
				// this.$axios.get(Api.ProductDetails, {
				// 　　params: { 'request_content': JSON.stringify(param) }
				// })
				.then((res)=>{
					let data = res.data;
					console.log('data',data)
					if (data.code === '0') {
						
						this.course_introduction = tmpStr;
						this.course_syllabus = tmpStr;
						this.course_evaluation = tmpStr;
						this.$message.info('This is a normal message');
			          // localStorage.userInfo = JSON.stringify(data.list[0]);
			          
			        }else {
			        	this.$message.info('This is a normal message');
			        }
				});
			}
		}
	}
</script>

<style scoped>
.course {
	position: relative;
	padding-bottom: 64px;
}
.c-items {
	padding: 16px 0 16px 0;
	height: 
}
.c-item {
	text-align: left;
	padding: 0 8px;
	margin-bottom: 16px;
}
.c-item-h {

	font-weight: 600;
	color: #333;
	font-size: 16px;
}
.c-item-h:before {
	content:' ';
	display: inline-block;
	width:4px;
	height:16px;
	background-color: #1890ff;
	margin-right:8px;
	position: relative;
	top:2px;
}
.c-item-b {
	font-size: 14px;
	
}
.course-button {
	position: fixed;
	bottom: 0;
	height: 50px;
	line-height: 52px;
	width:100%;
	background-color: #fff;
}
.login-form-button {
	position: relative;
	bottom: 0;
	/*left: 10%;*/
	/*margin-top: 60px;*/
	width: 80%;
	margin:0 auto;
	border-radius: 40px;
	height: 40px;
	font-size: 18px;
	/*font-weight: 600;*/
}
</style>

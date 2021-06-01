<template>
	<div class="course">
		<!-- <h5>课程详情</h5> -->
		<div class="width:100%;height:300px;">
			<video v-if="course_video" style="width:100%;height:186px;" :src="course_video"></video>
			<img v-else style="width:100%;height:186px;" :src="course_img" />
		</div>
		<div class="c-items">
			<div class="c-item">
				<!-- <h5 class="c-item-h">课程介绍</h5> -->
				<div class="c-item-b">
					<h5 class="c-item-subT">{{ course_name }}</h5>
					<div class="c-item-subB">
						<span>{{ course_personNum }}人参加</span>
						<label>￥
							<i>{{ course_price }}</i>
							/节
						</label>
					</div>
				</div>
				<div class="c-item-b">
					<h5 class="c-item-subT">课程标签</h5>
					<div class="c-item-subB">
						<a-tag color="blue" v-for="item in course_tags" :key="item.id">{{ item.tag_name }}</a-tag>
					</div>
				</div>
				<div class="c-item-b">
					<h5 class="c-item-subT">老师</h5>
					<div class="c-item-subB">
						<div style="background: #F7F7F7;border-radius: 8px;width:200px;padding:12px;">
							<img style="width:44px;height:44px;display: inline-block;border-radius: 22px;" :src="course_teacher_img" />
							<div style="display: inline-block;vertical-align: top;position: relative;left:20px;">
								<p style="margin-bottom:0;font-size:16px;">{{ course_teacher }}</p>
								<p style="margin-bottom:0;font-size:14px;color:#999;">讲师</p>
							</div>
						</div>
					</div>
				</div>
				<div class="c-item-b">
					<h5 class="c-item-subT">课程介绍</h5>
					<div class="c-item-subB">{{ course_introduction }}</div>
				</div>
				<div class="c-item-b">
					<h5 class="c-item-subT">课程大纲</h5>
					<div class="c-item-subB">{{ course_introduction }}</div>
				</div>
			</div>
			<!-- <div class="c-item">
				<h5 class="c-item-h">课程大纲</h5>
				<div class="c-item-b">{{course_syllabus}}</div>
			</div>
			<div class="c-item">
				<h5 class="c-item-h">课程评价</h5>
				<div class="c-item-b">{{course_evaluation}}</div>
			</div> -->
		</div>
		<div class="course-button"><a-button type="primary" html-type="submit" class="login-form-button" @click="gotoPay">立即报名</a-button></div>
	</div>
</template>

<script>
import Api from '../api/api.js';
export default {
	name: 'course',
	created() {
		if (localStorage.getItem('userInfo')) {
			window._userInfo = JSON.parse(localStorage.getItem('userInfo'));
		}
		let routeParam = this.$route.query;
		if (routeParam.product_id) {
			this.product_id = routeParam.product_id;
		}
		this.getCourseById();
	},
	data() {
		return {
			course_introduction: '',
			course_syllabus: '',
			course_evaluation: '',
			course_name: '',
			course_personNum: '',
			course_price: '',
			course_tags: [],
			course_teacher: '',
			course_teacher_img: '',
			course_img: '',
			course_video: '',
			course_obj: '',
			product_id:''
		};
	},
	methods: {
		gotoPay() {
			// debugger
			this.$router.push({
				path: '/pay',
				query: {
					name: this.course_name,
					teacher: this.course_teacher,
					count: this.course_obj.product_count,
					price: this.course_price,
					totalprice: this.course_obj.product_total_price,
					product_id:this.course_obj.product_id,
					teacher_id:this.course_obj.teacher_id
				}
			});
		},
		getCourseById() {
			let param = {
				product_id: this.product_id,
				user_id: ''
			};
			this.$axios({
				method: 'get',
				url: Api.ProductDetails,
				params: { request_content: JSON.stringify(param) }
			}).then(res => {
				let data = res.data;
				console.log('data', data);
				if (data.code === '0') {
					this.course_obj = data.data;
					this.course_name = data.data.product_name;
					this.course_price = data.data.product_price;
					this.course_personNum = data.data.student_count || 0;
					this.course_tags = data.data.product_tags;
					this.course_teacher = data.data.teacher_name;
					this.course_teacher_img = data.data.teacher_img_url;
					this.course_introduction = data.data.product_desc;
					this.course_syllabus = data.data.product_info;
					this.course_img = data.data.product_img_url;
					this.course_video = data.data.product_video_url;
					this.course_count = data.data.product_count;
					// this.$message.info('This is a normal message');
					// localStorage.userInfo = JSON.stringify(data.list[0]);
				} else {
					this.$message.error(data.msg);
				}
			});
		}
	}
};
</script>

<style scoped>
.course {
	position: relative;
	padding-bottom: 64px;
}
.c-items {
	padding: 16px 8px;
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
.c-item-subT {
	font-weight: 600;
	color: #333;
	font-size: 16px;
}
.c-item-h:before {
	content: ' ';
	display: inline-block;
	width: 4px;
	height: 16px;
	background-color: #1890ff;
	margin-right: 8px;
	position: relative;
	top: 2px;
}
.c-item-b {
	font-size: 14px;
	margin-bottom: 24px;
}
.c-item-subB {
	font-size: 12px;
	overflow: auto;
}
.c-item-subB span {
	/* font-size: 12px; */
}
.c-item-subB label {
	color: #eb7034;
	float: right;
}
.c-item-subB label i {
	font-size: 20px;
	font-style: normal;
}
.course-button {
	position: fixed;
	bottom: 0;
	height: 50px;
	line-height: 52px;
	width: 100%;
	background-color: #fff;
}
.login-form-button {
	position: relative;
	bottom: 0;
	/*left: 10%;*/
	/*margin-top: 60px;*/
	width: 80%;
	margin: 0 auto;
	border-radius: 40px;
	height: 40px;
	font-size: 18px;
	/*font-weight: 600;*/
}
</style>

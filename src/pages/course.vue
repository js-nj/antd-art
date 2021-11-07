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
						<label class="label">￥
							<i>{{ this.product_type != '1'?ProductPrice:course_price }}</i>
							/节起
						</label>
					</div>
				</div>
				<div class="c-item-b">
					<h5 class="c-item-subT">课程标签</h5>
					<div class="c-item-subB">
						<a-tag color="blue" v-for="item in course_tags" :key="item.id">{{ item.tag_name }}</a-tag>
					</div>
				</div>
				<div class="c-item-b" @click="gotoTeacher(teacher_id)" v-if="this.product_type == '1'">
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
				<div class="c-item-b" v-if="this.product_type == '1'">
					<h5 class="c-item-subT">课程大纲</h5>
					<div class="c-item-subB">{{ course_syllabus }}</div>
				</div>
				<div class="c-item-b" v-if="this.product_type != '1' && this.one_idDic.length>0">
					<h5 class="c-item-subT">1对几</h5>
					<div class="c-item-subB">
				      <a-radio-group v-model="one_id"  @change="one_idonChange" :default-value="one_id" button-style="solid">
				        <a-radio-button :value="sub.one_id" v-for="sub in one_idDic">
				          {{sub.one_name}}
				        </a-radio-button>
				      </a-radio-group>
				    </div>
				</div>
				<div class="c-item-b" v-if="this.product_type != '1' && this.level_idDic.length>0">
					<h5 class="c-item-subT">难度</h5>
					<div class="c-item-subB">
				      <a-radio-group v-model="level_id"  @change="level_idonChange" :default-value="level_id" button-style="solid">
				        <a-radio-button :value="sub.level_id" v-for="sub in level_idDic">
				          {{sub.level_name}}
				        </a-radio-button>
				      </a-radio-group>
				    </div>
				</div>
				<div class="c-item-b" v-if="this.product_type != '1' && this.time_idDic.length>0">
					<h5 class="c-item-subT">时长</h5>
					<div class="c-item-subB">
				      <a-radio-group  v-model="time_id" @change="time_idonChange" :default-value="time_id" button-style="solid">
				        <a-radio-button :value="sub.time_id" v-for="sub in time_idDic">
				          {{sub.time_name}}
				        </a-radio-button>
				      </a-radio-group>
				    </div>
				</div>
				<div class="c-item-b" v-if="this.product_type != '1'">
					<h5 class="c-item-subT" style="margin-bottom: 8px;">单价</h5>
					<div class="ant-radio-group-solid">
						<div class="ant-radio-button-wrapper ant-radio-button-wrapper-checked">
							{{ProductPrice}}元/节
						</div>
					</div>
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
		<div class="course-button">
			<div style="display:inline-block;width: 48px;height:50px;" v-if="this.product_type == '1'">
				<div style="position: relative;left: 0px;top: 8px;line-height: 12px;" @click="gotoJigou()" >
					<img :src="jigou" style="width:20px;height:20px;" />
					<div style="font-size:12px;line-height:12px;">机构</div>
				</div>
			</div>
			<a-button type="primary" html-type="submit" class="login-form-button" @click="gotoPay">立即报名</a-button>
		</div>
	</div>
</template>

<script>
import Api from '../api/api.js';
// import 'ant-design-vue/lib/radio/style/index.css';
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
			teacher_id:'',
			course_teacher_img: '',
			course_img: '',
			course_video: '',
			office_id:'',
			course_obj: '',
			product_id:'',
			product_type:'',
			one_name:'',
			one_id:'',
			one_idDic:[],
			level_name:'',
			level_id:'',
			level_idDic:[],
			time_name:'',
			time_id:'',
			time_idDic:[],
			jigou:require('../assets/jigou.png'),
			ProductPrice:''
		};
	},
	watch:{
		one_id(val){
			this.one_idDic.forEach(g=>{
				if(g.one_id == val){
					this.one_name = g.one_name;
				}
			})
			this.getProductPrice();
		},
		level_id(val){
			this.level_idDic.forEach(g=>{
				if(g.level_id == val){
					this.level_name = g.level_name;
				}
			})
			this.getProductPrice();
		},
		time_id(val){
			this.time_idDic.forEach(g=>{
				if(g.time_id == val){
					this.time_name = g.time_name;
				}
			})
			this.getProductPrice();
		},
	},
	methods: {
		one_idonChange(){

		},
		level_idonChange(){
			
		},
		time_idonChange(){

		},
		gotoTeacher(){
			this.$router.push({
				path: '/teacher',
				query: {
					id: this.teacher_id
				}
			});
		},
		gotoJigou(){
			this.$router.push({
				path: '/organization',
				query: {
					id: this.office_id
				}
			});
		},
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
					teacher_id:this.course_obj.teacher_id,
					one_name:this.one_name,
					level_name:this.level_name,
					time_name:this.time_name,
					one_id:this.one_id,
					level_id:this.level_id,
					time_id:this.time_id,
					ProductPrice:this.ProductPrice,
					product_type:this.product_type
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
					this.teacher_id = data.data.teacher_id;
					this.course_teacher_img = data.data.teacher_img_url;
					this.course_introduction = data.data.product_info;
					this.course_syllabus = data.data.product_desc;
					this.course_img = data.data.product_img_url;
					this.course_video = data.data.product_video_url;
					this.course_count = data.data.product_count;
					this.office_id = data.data.office_id;
					this.product_type = data.data.product_type;
					this.one_idDic = data.data.ones;
					this.level_idDic = data.data.levels;
					this.time_idDic = data.data.times;
					this.one_id = data.data.ones[0].one_id;
					this.level_id = data.data.levels[0].level_id;
					this.time_id = data.data.times[0].time_id;
					// this.$message.info('This is a normal message');
					// localStorage.userInfo = JSON.stringify(data.list[0])
					// this.getProductPrice();
				} else {
					this.$message.error(data.msg);
				}
			});
		},
		getProductPrice(){
			let param = {
				product_id: this.product_id,
				user_id: window._userInfo.id,
				user_type:'1',//	string	用户类型
				token:window._userInfo.token,//	string	用户token
				one_id:this.one_id,//	string	1对几ID
				level_id:this.level_id,//	string	难度ID
				time_id:this.time_id,//
			};
			this.$axios({
				method: 'get',
				url: Api.ProductPrice,
				params: { request_content: JSON.stringify(param) }
			}).then(res => {
				let data = res.data;
				if (data.code === '0') {
					this.ProductPrice = data.data;
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
	padding: 8px 0 0 1px;
}
.c-item-subB span {
	/* font-size: 12px; */
}
.c-item-subB label {
	/*color: #eb7034;*/
	float: right;
}
.c-item-subB .label {
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
	    z-index: 1;
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
.ant-radio-button-wrapper {
	margin:0 8px;
}
.course >>> .ant-radio-button-wrapper:last-child {
    border-radius: 0;
}
.course >>> .ant-radio-button-wrapper:first-child {
    border-radius: 0;
}
</style>

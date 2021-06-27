<template>
	<div class="org" style="background: #F7F7F7;">
		<div style="padding:24px 12px 12px;background:#424956;color: #fff;">
			<div>
				<img :src="img" style="width:74px;height:74px;display:inline-block;border-radius:36px;vertical-align: text-bottom;">
				<div style="padding-left:20px;display:inline-block;width: 216px;text-align: left;">
					<div>{{this.name}}</div>
					<div class="van-multi-ellipsis--l2">{{this.des}}</div>
				</div>
			</div>
			<van-row style="padding-top: 12px;">
			  <van-col span="8">好评度：{{this.rate}}%</van-col>
			  <van-col span="8">课程数：{{this.course}}</van-col>
			  <van-col span="8">学生数：{{this.students}}</van-col>
			</van-row>
		</div>
		<van-tabs v-model="active">
		  <van-tab title="品牌介绍">
		  	<div style="text-align:left;padding:12px;background: #fff;margin-top: 12px;">
		  		<div style="font-size: 18px;font-family: PingFangSC-Medium, PingFang SC;font-weight: 500;color: #000000;">品牌介绍</div>
		  		<div style="padding-top: 12px;">
					<img :src="img" style="width:74px;height:74px;display:inline-block;border-radius:36px;vertical-align: text-bottom;">
					<div style="padding-left:20px;display:inline-block;width: 270px;text-align: left;">
						<div class="van-multi-ellipsis--l3">{{this.des}}</div>
					</div>
				</div>
		  	</div>
		  </van-tab>
		  <van-tab title="课程">
		  	<a-row :gutter="8" style="margin-top: 12px;padding: 0px 8px;background: #fff;">
				<a-col style="margin-top:4px;" class="gutter-row" :span="12" v-for="item in course_list" :key="item.id" @click="gotoCourse(item)">
					<div class="gutter-box">
						<img style="width:100%;height:100px;display: inline-block;border-radius: 4px;" :src="item.product_img_url" />
						<div style="padding: 8px 0;">{{ item.product_name }}</div>
						<div style="overflow: auto;">
							<span style="color:#BBB;font-size: 10px;">{{ item.product_teacher }}</span>
							<label style="float:right;color:#E96525;">￥{{ item.product_price }}/节</label>
						</div>
					</div>
				</a-col>
			</a-row>
		  </van-tab>
		  <van-tab title="教师">
		  	<div style="margin-top: 12px;">
		  		<div v-for="item in teacher_list" style="border-bottom: 1px solid #EEEEEE;background:#fff;padding:12px 6px;">
					<img :src="item.user_avatar" style="width:44px;height:44px;display:inline-block;border-radius:22px;vertical-align:top;">
					<div style="padding-left:20px;display:inline-block;width:200px;text-align:left;height:44px;line-height:44px;">
						<div style="font-size:16px;line-height:22px;">{{item.user_name}}</div>
						<div style="font-size:14px;color:#999;line-height:22px;">{{item.user_info}}</div>
					</div>
					<van-button type="default" size="small" round style="width:60px;height:20px;vertical-align:top;position: relative;top: 10px;" @click="gotoViewTeacher(item)">查看</van-button>
				</div>
		  	</div>
		  </van-tab>
		</van-tabs>
	</div>
</template>

<script>
import { Button,Tab,Row,Col,Tabs } from 'vant';
import 'vant/lib/button/style';
import 'vant/lib/tab/style';
import 'vant/lib/row/style';
import 'vant/lib/col/style';
import 'vant/lib/tabs/style';
import Api from '../api/api.js';
export default {
	components: {
		[Tab.name]: Tab,
		[Tabs.name]: Tabs,
		[Row.name]: Row,
		[Col.name]: Col,
	    [Button.name]: Button,
	},
	name:'org',
	data(){
		return {
			img:'',
			name:'',
			des:'',
			rate:'',
			course:'',
			students:'',
			active:0,
			course_list:[],
			teacher_list:[],
			office_id:''
		}
	},
	methods:{
		gotoCourse(item){
			this.$router.push({
				path: '/course',
				query: {
					product_id: item.id
				}
			});
		},
		gotoViewTeacher(item){
			this.$router.push({
				path: '/teacher',
				query: {
					id: item.id
				}
			});
		},
		getOrg(){
			var tmpParam = {
		        office_id:this.office_id
		    };
	      	this.$axios({
				method: 'get',
				url: Api.OfficeDetails,
				params: { request_content: JSON.stringify(tmpParam) }
			}).then((response) => {
	          let data = response.data;
	          if (data.code === '0') {
	          	this.img = data.data.img_url;
				this.name = data.data.office_name;
				this.des = data.data.office_info;
				this.rate = data.data.evaluate_point;
				this.course = data.data.lesson_count;
				this.students = data.data.student_count;
	          } else {
	            this.$message.error(data.msg);
	          }
	        }).catch((error) => {
	          this.$message.error(error);
	        })
		},
		getOrgTeacher(){
			var tmpParam = {
				page:1,
				limit:50,
		        office_id:this.office_id
		    };
	      	this.$axios({
				method: 'get',
				url: Api.TeacherList,
				params: { request_content: JSON.stringify(tmpParam) }
			}).then((response) => {
	          let data = response.data;
	          if (data.code === '0') {
	          	this.teacher_list = data.data;
	          } else {
	            this.$message.error(data.msg);
	          }
	        }).catch((error) => {
	          this.$message.error(error);
	        })
		},
		getOrgCourse(){
			var tmpParam = {
				page:'1',
				limit:'50',
		        office_id:this.office_id
		    };
	      	this.$axios({
				method: 'get',
				url: Api.ProductList,
				params: { request_content: JSON.stringify(tmpParam) }
			}).then((response) => {
	          let data = response.data;
	          if (data.code === '0') {
	          	this.course_list = data.data;
	          } else {
	            this.$message.error(data.msg);
	          }
	        }).catch((error) => {
	          this.$message.error(error);
	        })
			
		}
		// gotoOrder(){
		// 	this.$router.push({
		// 		path: '/order',
		// 	})
		// }
	},
	created(){
		if(localStorage.getItem('userInfo')){
			window._userInfo = JSON.parse(localStorage.getItem('userInfo'))
		}
		let routeParam = this.$route.query;
		if (routeParam.id) {
			this.office_id = routeParam.id;
		}
		this.getOrg();
		this.getOrgTeacher();
		this.getOrgCourse();
	}
}
</script>

<style scoped>
/*.my-head {
	height:150px;
	background: url(../assets/my-head.png) top no-repeat;
	background-size: 100% 100%;
	position: relative;
}*/

</style>

<template>
	<div class="org" style="background: #F7F7F7;">
		<div style="padding:24px 12px 12px;background:#424956;color: #fff;">
			<div style="max-height:75px;">
				<img :src="img" style="width:74px;height:74px;display:inline-block;border-radius:36px;vertical-align: top;">
				<div style="padding-left:20px;display:inline-block;width: calc(100% - 85px);text-align: left;position:relative;top:4px;">
					<div>{{this.name}}</div>
					<div class="van-multi-ellipsis--l2" style="color: #999;">{{this.des}}</div>
				</div>
			</div>
			<van-row style="padding-top: 12px;">
			  <van-col span="8">好评度：{{this.rate}}%</van-col>
			  <van-col span="8">课程数：{{this.course}}</van-col>
			  <van-col span="8">浏览量：{{this.visit_count}}</van-col>
			</van-row>
		</div>
		<van-tabs v-model="active">
		  <van-tab title="主页">
		  	<div style="text-align:left;padding:12px;background: #fff;margin-top: 12px;max-height:86px;">
		  		<div style="font-size: 18px;font-family: PingFangSC-Medium, PingFang SC;font-weight: 500;color: #000000;">品牌介绍</div>
		  		<div style="padding-top: 12px;">
					<img :src="img" style="width:74px;height:74px;display:inline-block;border-radius:36px;vertical-align: top;">
					<div style="padding-left:20px;display:inline-block;width: calc(100% - 85px);text-align: left;position:relative;top:4px;">
						<div class="van-multi-ellipsis--l3" style="color: #999;">{{this.des}}</div>
					</div>
				</div>
		  	</div>
		  </van-tab>
		  <van-tab title="课程">
		  	<a-row :gutter="0" style="margin-top: 12px;padding: 0px 8px;background: #fff;">
				<a-col style="margin-top:4px;" class="gutter-row" :span="12" v-for="item in course_list" :key="item.id" @click="gotoCourse(item)">
					<div class="gutter-box">
						<img style="width:100%;height:100px;display: inline-block;border-radius: 4px;padding: 0 2px;" :src="item.product_img_url" />
						<div style="padding: 8px 0;text-align: left;">{{ item.product_name }}</div>
						<div style="overflow: auto;text-align: left;">
							<!-- <van-tag type="primary" plain style="padding:0 4px;position: relative;left: 12px;top: -1px;">{{item.lesson_type== '1'?'主课':'陪练'}}</van-tag> -->
							<span style="color:#BBB;font-size: 10px;">{{ item.product_teacher }}</span>
							<label style="float:right;color:#E96525;">￥{{ item.product_price }}/节</label>
						</div>
					</div>
				</a-col>
			</a-row>
		  </van-tab>
		  <van-tab title="陪练">
		  	<a-row :gutter="0" style="margin-top: 12px;padding: 0px 8px;background: #fff;">
				<a-col style="margin-top:4px;" class="gutter-row" :span="12" v-for="item in sparecourse_list" :key="item.id" @click="gotoCourse(item)">
					<div class="gutter-box">
						<img style="width:100%;height:100px;display: inline-block;border-radius: 4px;padding: 0 2px;" :src="item.product_img_url" />
						<div style="padding: 8px 0;text-align: left;">{{ item.product_name }}</div>
						<div style="overflow: auto;text-align: left;">
							<!-- <van-tag type="primary" plain style="padding:0 4px;position: relative;left: 12px;top: -1px;">{{item.lesson_type== '1'?'主课':'陪练'}}</van-tag> -->
							<!-- <span style="color:#BBB;font-size: 10px;">{{ item.product_teacher }}</span> -->
							<label style="color:#E96525;">￥{{ item.product_price }}/节</label>
						</div>
					</div>
				</a-col>
			</a-row>
		  </van-tab>
		  <van-tab title="商品">
		  	<div style="margin-top: 12px;">
		  		<img :src="nodata" style="width:180px;display:block;margin:0 auto;margin-top:50px;" />
		  		<!-- <div v-for="item in teacher_list" style="border-bottom: 1px solid #EEEEEE;background:#fff;padding:12px 6px;">
					<img :src="item.user_avatar" style="width:44px;height:44px;display:inline-block;border-radius:22px;vertical-align:top;">
					<div style="padding-left:20px;display:inline-block;width:200px;text-align:left;height:44px;line-height:44px;">
						<div style="font-size:16px;line-height:22px;">{{item.user_name}}</div>
						<div style="font-size:14px;color:#999;line-height:22px;">{{item.user_info}}</div>
					</div>
					<van-button type="default" size="small" round style="width:60px;height:20px;vertical-align:top;position: relative;top: 10px;" @click="gotoViewTeacher(item)">查看</van-button>
				</div> -->
		  	</div>
		  </van-tab>
		</van-tabs>
	</div>
</template>

<script>
import { Button,Tab,Row,Col,Tabs,Tag } from 'vant';
import 'vant/lib/button/style';
import 'vant/lib/tab/style';
import 'vant/lib/row/style';
import 'vant/lib/col/style';
import 'vant/lib/tabs/style';
import 'vant/lib/tag/style';
import Api from '../api/api.js';
export default {
	components: {
		[Tab.name]: Tab,
		[Tabs.name]: Tabs,
		[Row.name]: Row,
		[Col.name]: Col,
	    [Button.name]: Button,
	    [Tag.name]: Tag,
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
			visit_count:'',
			active:0,
			course_list:[],
			sparecourse_list:[],
			teacher_list:[],
			office_id:'',
			nodata:require('../assets/nodata.png')
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
				this.visit_count = data.data.visit_count;
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
				limit:'100',
		        office_id:this.office_id
		    };
	      	this.$axios({
				method: 'get',
				url: Api.ProductList,
				params: { request_content: JSON.stringify(tmpParam) }
			}).then((response) => {
	          let data = response.data;
	          if (data.code === '0') {
				  this.course_list = [];
				  this.sparecourse_list = [];
				  data.data.forEach(sub=>{
					  if(sub.lesson_type == '1'){
						this.course_list.push(sub);  
					  }else {
						this.sparecourse_list.push(sub);  
					  }
				  });
	          	// this.course_list = data.data;
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

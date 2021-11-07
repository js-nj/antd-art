<template>
	<div class="tea" style="background:#f7f7f7;">
		<div>
			<div>
				<img :src="teacher_top_img" style="height:200px;width: 100%;"/>
			</div>
			<div style="position: relative;top: -16px;border-radius: 16px 16px 0 0;background: #fff;padding:32px 0 8px 0;">
				<img :src="teacher_head_img" style="width:76px;height:76px;border-radius:40px;    position: absolute;top: -40px;left: 24px;" />
				<div style="font-size: 26px;text-align: left;padding: 16px 0 8px 32px;">
					{{this.teacher_name}}
				</div>
				<div>
					<van-tag color="#f7f7f7" text-color="#4a4a4a" style="padding:4px;margin-right:4px;" v-for="item in teacher_tags" :key="item.id">{{item.tag_name}}</van-tag>
				</div>
				<van-divider />
				<div style="text-align:left;padding:0px 24px;">
					<div>
						<div style="font-size:14px;color:#555;padding-bottom:8px;">个人介绍</div>
						<div style="color:#999;">
							{{teacher_info}}
						</div>
					</div>
					<div>
						<div style="font-size:14px;color:#555;padding:8px 0;">所属机构</div>
						<van-row style="background: #F7F7F7;border-radius: 8px;padding:14px;">
						  <van-col span="6">
						  	<img :src="office_img"  style="width:66px;height:66px;"/>
						  </van-col>
						  <van-col span="12">
						  	<div>
						  		<div style="font-size:16px;">{{office_name}}</div>
						  		<div class="van-multi-ellipsis--l2" style="font-size:14px;color:#999;">{{office_info}}</div>
						  	</div>
						  </van-col>
						  <van-col span="6">
						  	<van-button plain round type="info" @click="gotoJigou()" style="font-size:12px;height:22px;padding:0;width:100%;margin-top:16px;">进入机构页</van-button>
						  </van-col>
						</van-row>
					</div>
				</div>
			</div>
		</div>
		<van-tabs v-model="active" style="">
		  <van-tab title="主课">
		  	<a-list class="demo-loadmore-list" :loading="loading" item-layout="horizontal" :data-source="data">
				<div v-if="showLoadingMore" slot="loadMore" :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
					<a-spin v-if="loadingMore" />
					<a-button v-if="!loadingMore && !allLoaded" @click="onLoadMore">加载更多</a-button>
				</div>
				<a-list-item slot="renderItem" slot-scope="item, index" @click="gotoCourse(item)">
					<a-list-item-meta>
						<a class="art-item-name" slot="title" style="">{{ item.product_name }}</a>
						<div slot="description" style="text-align: left;">
							{{ item.teacher_name ? item.teacher_name : '  ' }}
							<br />
							<div style="color:#B7BAC5;overflow: auto;font-size: 12px;">
								<i style="font-style: normal;color:#E96525;font-size: 14px;">￥{{ item.product_price }}/节</i>
								<van-button plain round type="info" @click="gotoCourse(item)" style="font-size:12px;height:22px;padding:0;width:62px;float:right;">加入学习</van-button>
							</div>
						</div>
						<a-avatar shape="square" :size="124" style="height:72px;" slot="avatar" :src="item.product_img_url" />
					</a-list-item-meta>
				</a-list-item>
			</a-list>
		  </van-tab>
		  <van-tab title="陪练">
		  	<a-list class="demo-loadmore-list" :loading="loading" item-layout="horizontal" :data-source="spareData">
				<div v-if="showLoadingMore" slot="loadMore" :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
					<a-spin v-if="loadingMore" />
					<a-button v-if="!loadingMore && !allLoaded" @click="onLoadMore">加载更多</a-button>
				</div>
				<a-list-item slot="renderItem" slot-scope="item, index" @click="gotoCourse(item)">
					<a-list-item-meta>
						<a class="art-item-name" slot="title" style="">{{ item.product_name }}</a>
						<div slot="description" style="text-align: left;">
							{{ item.teacher_name ? item.teacher_name : '  ' }}
							<br />
							<div style="color:#B7BAC5;overflow: auto;font-size: 12px;">
								<i style="font-style: normal;color:#E96525;font-size: 14px;">￥{{ item.product_price }}/节</i>
								<van-button plain round type="info" @click="gotoCourse(item)" style="font-size:12px;height:22px;padding:0;width:62px;float:right;">加入学习</van-button>
							</div>
						</div>
						<a-avatar shape="square" :size="124" style="height:72px;" slot="avatar" :src="item.product_img_url" />
					</a-list-item-meta>
				</a-list-item>
			</a-list>
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
import { Button,Tab,Row,Col,Tabs,Divider,Tag } from 'vant';
import 'vant/lib/button/style';
import 'vant/lib/tab/style';
import 'vant/lib/row/style';
import 'vant/lib/col/style';
import 'vant/lib/tabs/style';
import 'vant/lib/divider/style';
import 'vant/lib/tag/style';
import Api from '../api/api.js';
export default {
	components: {
		[Tab.name]: Tab,
		[Tabs.name]: Tabs,
		[Row.name]: Row,
		[Col.name]: Col,
	    [Button.name]: Button,
	    [Divider.name]: Divider,
	    [Tag.name]: Tag,
	},
	name:'treacher',
	data(){
		return {
			img:'',
			teacher_id:'',
			active:0,
			teacher_top_img:'',
			teacher_name:'',
			teacher_tags:[],
	        teacher_head_img:'',
	        teacher_info:'',
	        office_id: "",
			office_img: "",
			office_name: "",
			office_info:'',
			loading: true,
			loadingMore: false,
			showLoadingMore: true,
			data: [],
			spareData: [],
			page: 1,
			category_id:'',
			nodata:require('../assets/nodata.png'),
			allLoaded:false
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
		gotoJigou(){
			this.$router.push({
				path: '/organization',
				query: {
					id:this.office_id
				}
			});
		},
		gotoIndex(){
			this.$router.push({
				path: '/index',
				query: {
					
				}
			});
		},
		handleOrderStatus(val) {
			// 1待付款，2已付款，3已取消
			switch (val) {
				case '1':
					return '待付款';
				case '2':
					return '已付款';
				case '3':
					return '已取消';
				default:
					return '';
			}
		},
		getData(callback) {
			let param = {
				page: this.page, //	int	*当前页数
				limit: 100, //	int	*页面大小
				token: window._userInfo.token, //	*用户token
				user_id: window._userInfo.id, //	string	*用户ID
				user_type:'0',//	string	*1学生，0老师
				category_id:'',//	string	类别ID
				course_level:'',//	string	课程难度，1-5级，入门，初级，中级，高级，特级
				lesson_type:'',
				teacher_id:'',//	string	教师ID
				keywords:'',//	string	商品名称搜素关键词
				product_status:'',//
			};
			this.$axios({
				method: 'get',
				url: Api.ProductList,
				params: { request_content: JSON.stringify(param) }
			}).then(res => {
				let data = res.data;
				console.log('data', data);
				if (data.code === '0') {
					callback(data);
				} else {
					this.$message.error(data.msg);
				}
			});
		},
		onLoadMore() {
			this.loadingMore = true;
			++this.page;
			this.getData(res => {
				this.data = this.data.concat(res.data);
				if(res.data.length<100){
					this.allLoaded = true;
				}
				this.loadingMore = false;
			});
		},
		gotoCourse(item) {
			this.$router.push({
				path: '/course',
				query: {
					product_id: item.id
				}
			});
		},
		gotoPay(item) {
			// debugger
			this.$router.push({
				path: '/pay',
				query: {
					name: this.product_name,
					teacher: this.teacher_name,
					count: this.product_count,
					price: this.product_price,
					totalprice: this.product_price,
					product_id:this.id
				}
			});
		},
		getTeacherDetail(){
			var tmpParam = {
				token:window._userInfo.token,
				user_id:window._userInfo.id,
		        teacher_id:this.teacher_id
		    };
	      	this.$axios({
				method: 'get',
				url: Api.TeacherDetails,
				params: { request_content: JSON.stringify(tmpParam) }
			}).then((response) => {
	          let data = response.data;
	          if (data.code === '0') {
	          	this.teacher_name = data.data.teacher_name;
	          	this.teacher_tags = data.data.teacher_tags;
	          	this.teacher_head_img = data.data.teacher_head_img;
	          	this.teacher_info = data.data.teacher_info;
	          	this.office_id =  data.data.office_id;
				this.office_img =  data.data.office_img;
				this.office_name =  data.data.office_name;
				this.office_info = data.data.office_info;
				this.teacher_top_img = data.data.teacher_top_img?data.data.teacher_top_img:require('../assets/teacher_bg.png')
	          } else {
	            this.$message.error(data.msg);
	          }
	        }).catch((error) => {
	          this.$message.error(error);
	        })
		}
	},
	created(){
		if(localStorage.getItem('userInfo')){
			window._userInfo = JSON.parse(localStorage.getItem('userInfo'))
		}
		let routeParam = this.$route.query;
		if (routeParam.id) {
			this.teacher_id = routeParam.id;
		}
		this.getTeacherDetail();

		this.getData(res => {
			this.loading = false;
			this.data = [];
			this.spareData = [];
			res.data.forEach(sub=>{
				if(sub.lesson_type == '1'){
					this.data.push(sub);
				}else {
					this.spareData.push(sub);
				}
			});
			// this.data = res.data;
			if (this.data.length == 0) {
				this.showLoadingMore = false;
			}
			if(this.data.length<100){
				this.allLoaded = true;
			}
		});
	}
}
</script>

<style scoped>
	.art-item-name {
		text-overflow: -o-ellipsis-lastline;
		  overflow: hidden;
		  text-overflow: ellipsis;
		  display: -webkit-box;
		  -webkit-line-clamp: 2;
		  line-clamp: 2;
		  -webkit-box-orient: vertical;
		  color:#333;height: 34px;
	}
.demo-loadmore-list {
	padding: 16px 16px;
	min-height: 350px;
	background-color: #fff;
}
.ant-list-item-meta {
	padding: 8px 0;
}
.ant-list-item-meta-title {
	text-align: left;
	margin-bottom: 0;
}
.ant-list .ant-list-items .ant-list-item {
	background-color: #fff;
	padding: 8px;
	/* margin-bottom: 15px; */
	border-bottom: none;
	display: block;
}
.ant-list-item-meta-description {
	/* position: relative;
	top:12px; */
	line-height: 20px;
}
</style>

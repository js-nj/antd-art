<template>
	<div>
		<van-search v-model="keywords" placeholder="请输入课程名称" @search="onSearch"/>
		<a-list class="demo-loadmore-list" :loading="loading" item-layout="horizontal" :data-source="data">
			<div v-if="showLoadingMore" slot="loadMore" :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
				<a-spin v-if="loadingMore" />
				<a-button v-if="!loadingMore && !allLoaded" @click="onLoadMore">加载更多</a-button>
			</div>
			<a-list-item slot="renderItem" slot-scope="item, index" @click="gotoCourse(item)">
				<a-list-item-meta>
					<a class="art-item-name" slot="title" style="">{{ item.product_name }}</a>
					<div slot="description" style="text-align: left;">
						<!-- {{ item.teacher_name ? item.teacher_name : '  ' }} -->
						<i style="font-style: normal;color:#E96525;font-size: 14px;">￥{{ item.product_price }}/节</i>
						<br />
						<div style="color:#B7BAC5;overflow: auto;font-size: 12px;">
							<span>已经有{{item.visit_count}}人学习</span>
							<!-- <i style="font-style: normal;float:right;color:#E96525;font-size: 14px;">￥{{ item.product_price }}/节</i> -->
						</div>
					</div>
					<a-avatar shape="square" :size="124" style="height:72px;" slot="avatar" :src="item.product_img_url" />
				</a-list-item-meta>
			</a-list-item>
		</a-list>
		<!-- <div style="position: fixed;bottom: 20px;right:20px;background-color: #fff;border-radius: 20px;">
			<a-button @click="gotoIndex" >首页</a-button>
		</div> -->
	</div>
</template>
<script>
import Api from '../api/api.js';
import { Search } from 'vant';
import 'vant/lib/search/style';
export default {
	components:{
		[Search.name]: Search,
	},
	name:'list',
	data() {
		return {
			keywords:'',
			loading: true,
			loadingMore: false,
			showLoadingMore: true,
			data: [],
			page: 1,
			category_id:'',
			allLoaded:false
		};
	},
	mounted() {
		if (!window._userInfo) {
			window._userInfo = JSON.parse(localStorage.getItem('userInfo'));
		}
		let routeParam = this.$route.query;
		if (routeParam.category_id) {
			this.category_id = routeParam.category_id;
		}
		this.getData(res => {
			this.loading = false;
			this.data = res.data;
			if (this.data.length == 0) {
				this.showLoadingMore = false;
			}
			if(this.data.length<10){
				this.allLoaded = true;
			}
		});
	},
	methods: {
		onSearch(){
			this.getData(res => {
				this.loading = false;
				this.data = res.data;
				if (this.data.length == 0) {
					this.showLoadingMore = false;
				}
				if(this.data.length<10){
					this.allLoaded = true;
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
				limit: 10, //	int	*页面大小
				token: window._userInfo.token, //	*用户token
				user_id: window._userInfo.id, //	string	*用户ID
				user_type:'0',//	string	*1学生，0老师
				category_id:this.category_id,//	string	类别ID
				course_level:'',//	string	课程难度，1-5级，入门，初级，中级，高级，特级
				// order_type:'1',//	string	排序类型，1综合2销售3上新4好评5价格高到低6价格低到高
				teacher_id:'',//	string	教师ID
				keywords:this.keywords,//	string	商品名称搜素关键词
				product_status:'',//
				lesson_type: '2'
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
				if(res.data.length<10){
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
	}
};
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
.ant-list-something-after-last-item .ant-spin-container > .ant-list-items > .ant-list-item:last-child {
	border-bottom: none;
}
</style>

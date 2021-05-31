<template>
	<a-list class="demo-loadmore-list" :loading="loading" item-layout="horizontal" :data-source="data">
		<div v-if="showLoadingMore" slot="loadMore" :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
			<a-spin v-if="loadingMore" />
			<a-button v-if="!loadingMore && !allLoaded" @click="onLoadMore">加载更多</a-button>
		</div>
		<a-list-item slot="renderItem" slot-scope="item, index" >
			<a-list-item-meta>
				<a class="art-item-name" slot="title" style="">充值金额：{{item.pay_amount}}</a>
				<div slot="description" style="text-align: left;">
					充值时间：{{item.pay_time}}
				</div>
				<a-avatar shape="square" :size="72" style="height:72px;" slot="avatar" :src="img" />
			</a-list-item-meta>
		</a-list-item>
	</a-list>
</template>
<script>
import Api from '../api/api.js';
export default {
	name:'list',
	data() {
		return {
			loading: true,
			loadingMore: false,
			showLoadingMore: true,
			data: [],
			page: 1,
			category_id:'',
			allLoaded:false,
			img:require('../assets/logo2.png'),
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
			var that = this;
		      var tmpParam = {
		        page:this.page,//  int *当前页数
		        limit:10,// int *页面大小
		        user_id:window._userInfo.id
		      };
		      	this.$axios({
					method: 'get',
					url: Api.PayList,
					params: { request_content: JSON.stringify(tmpParam) }
				}).then((response) => {
		          let data = response.data;
		          if (data.code === '0') {
		            callback(data);
		          } else {
		            this.$message.error(data.msg);
		          }
		        }).catch((error) => {
		          this.$message.error(error);
		        })

			// this.$axios({
			// 	method: 'get',
			// 	url: Api.ProductList,
			// 	params: { request_content: JSON.stringify(param) }
			// }).then(res => {
			// 	let data = res.data;
			// 	console.log('data', data);
			// 	if (data.code === '0') {
			// 		callback(data);
			// 	} else {
			// 		this.$message.error(data.msg);
			// 	}
			// });
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
		  color:#333;height: 40px;
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

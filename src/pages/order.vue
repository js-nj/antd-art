<template>
	<div>
	<a-list class="demo-loadmore-list" :loading="loading" item-layout="horizontal" :data-source="data">
		<div v-if="showLoadingMore" slot="loadMore" :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
			<a-spin v-if="loadingMore" />
			<a-button v-else @click="onLoadMore">加载更多</a-button>
		</div>
		<a-list-item slot="renderItem" slot-scope="item, index" @click="gotoOrderDetail(item)">
			<div style="overflow: auto;padding: 0 0 8px 0px;text-align: left;border-bottom: solid 1px #ddd;">
				<span style="font-size: 14px;">订单编号:{{ item.order_num }}</span>
				<label style="color:#EA8439;font-size: 14px;float:right;">{{ item.order_status_name}}</label>
			</div>
			<a-list-item-meta>
				<a slot="title" style="color:#333;">{{ item.products[0].product_name }}</a>
				<div slot="description" style="text-align: left;">
					{{ item.products[0].teacher_name ? item.products[0].teacher_name : '' }}
					<br />
					<div style="color:#333;overflow: auto;">
						￥{{ item.products[0].product_price }}
						<i style="font-style: normal;float:right;">×{{ item.products[0].product_count }}</i>
					</div>
				</div>
				<a-avatar shape="square" :size="100" style="height:60px;" slot="avatar" :src="item.products[0].product_img_url" />
			</a-list-item-meta>
			<div style="text-align: right;">
				<span>总额￥</span>
				<span style="color:#333;">{{ item.products[0].total_price }}</span>
			</div>
			<!-- <div style="text-align: right;padding-top: 16px;">
				<a-button v-if="item.order_status == '1'" type="default" shape="round" @click="gotoPay(item)" size="small">支付</a-button>
				<a-button v-else type="default" shape="round" @click="gotoPay(item)" size="small">再次购买</a-button>
			</div> -->
		</a-list-item>
	</a-list>
	<div @click="gotoIndex" style="display: inline-block;padding: 4px;position: fixed;bottom:30px;right:30px;background: #333;color: #fff;border-radius: 4px;">返回首页</div>
	</div>
</template>
<script>
import Api from '../api/api.js';
export default {
	data() {
		return {
			loading: true,
			loadingMore: false,
			showLoadingMore: true,
			data: [],
			page: 1
		};
	},
	mounted() {
		if (!window._userInfo) {
			window._userInfo = JSON.parse(localStorage.getItem('userInfo'));
		}
		this.getData(res => {
			this.loading = false;
			this.data = res.data;
			if (this.data.length == 0) {
				this.showLoadingMore = false;
			}
		});
	},
	methods: {
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
				order_keywords: '', //	string	订单搜索关键词，可以是商品名称，也可以是订单号
				order_status: '0' //
			};
			this.$axios({
				method: 'get',
				url: Api.OrderList,
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
				this.loadingMore = false;
			});
		},
		gotoPay(item){
			this.$router.push({
				path: '/pay',
				query: {
					order_num:item.order_num,
					name: item.products[0].product_name,
					teacher: item.products[0].teacher_name,
					count: item.products[0].product_count,
					price: item.products[0].product_price,
					totalprice: item.products[0].total_price,
					product_id:item.products[0].product_id
				}
			});
		},
		gotoOrderDetail(item){
			this.$router.push({
				path: '/orderDetail',
				query: {
					order_num:item.order_num,
					order_time:item.order_time,
					pay_type_name:item.pay_type_name,
					name: item.products[0].product_name,
					teacher: item.products[0].teacher_name,
					count: item.products[0].product_count,
					price: item.products[0].product_price,
					totalprice: item.products[0].total_price,
					product_id:item.products[0].product_id,
					product_img_url:item.products[0].product_img_url
				}
			});
		}
	}
};
</script>
<style scoped>
.demo-loadmore-list {
	padding: 16px 16px;
	min-height: 350px;
	background-color: #f7f7f7;
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
	margin-bottom: 15px;
	border-bottom: none;
	display: block;
}
</style>

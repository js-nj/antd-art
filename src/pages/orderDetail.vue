<template>
	<div class="orderDetail">
		<div style="height:120px;background-color: #1975FF;line-height: 120px;text-align: left;padding-left: 32px;">
			<span style="font-size: 20px;color:#fff;">支付成功</span>
		</div>
		<div style="padding: 16px;position: relative;top:-45px;">
			<div style="border-radius: 8px;">
				<a-list class="demo-loadmore-list"  item-layout="horizontal" :data-source="data">
					<a-list-item slot="renderItem" slot-scope="item, index">
						<h5 style="font-size: 20px;text-align: left;">课程信息</h5>
						<a-list-item-meta>
							<a slot="title" style="color:#333;">{{course_name}}</a>
							<div slot="description" style="text-align: left;">
								{{course_teacher}}
								<br />
								<div style="color:#333;overflow: auto;">
									￥{{course_price}}/节
									<i style="font-style: normal;float:right;">×{{course_count}}</i>
								</div>
							</div>
							<a-avatar shape="square" :size="100" style="height:60px;" slot="avatar" :src="course_imgurl" />
						</a-list-item-meta>
						<div style="text-align: right;">
							<span><i style="display: inline-block;font-style: normal;padding-right: 16px;">应付款</i>￥</span>
							<span style="color:#333;">{{course_totalprice}}</span>
						</div>
					</a-list-item>
				</a-list>
			</div>
			<div style="background: #FFFFFF;border-radius: 4px;margin-top:32px;padding: 16px;overflow: auto;">
				<h5 style="font-size: 20px;text-align: left;">订单信息</h5>
				<a-row style="margin-bottom:12px;font-size:14px;">
					<a-col :span="6">订单编号</a-col>
					<a-col :span="18" style="text-align:left;color:#999;padding-left:8px;">{{ order_num }}</a-col>
				</a-row>
				<a-row style="margin-bottom:12px;font-size:14px;">
					<a-col :span="6">下单时间</a-col>
					<a-col :span="18" style="text-align:left;color:#999;padding-left:8px;">{{ order_time }}</a-col>
				</a-row>
				<a-row style="margin-bottom:12px;font-size:14px;">
					<a-col :span="6">支付方式</a-col>
					<a-col :span="18" style="text-align:left;color:#999;padding-left:8px;">{{ pay_type_name }}</a-col>
				</a-row>
				<!-- <a-button type="default" shape="round" @click="contectUs" size="small" style="float:right;">联系客服</a-button> -->
				<!-- <a-row style="margin-bottom:12px;font-size:14px;">
					<a-col :span="6">支付时间</a-col>
					<a-col :span="18" style="text-align:left;color:#999;">{{ order_time }}</a-col>
				</a-row> -->
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'orderDetail',
		data(){
			return {
				data:[{
					name:'111'
				}],
				order_num:'',
				order_time:'',
				pay_type_name:'',
				course_name:'',
				course_teacher:'',
				course_count:'',
				course_price:'',
				course_totalprice:'',
				course_imgurl:''
			}
		},
		created() {
			let routeParam = this.$route.query;
			if (routeParam.order_num) {
				this.order_num = routeParam.order_num;
				this.order_time = routeParam.order_time;
				this.pay_type_name = routeParam.pay_type_name;
				this.course_name = routeParam.name;
				this.course_teacher = routeParam.teacher;
				this.course_count = routeParam.count;
				this.course_price = routeParam.price;
				this.course_totalprice = routeParam.totalprice;
				this.course_imgurl = routeParam.product_img_url;
			}
		},
		methods:{
			contectUs(){
				alert('客服电话:110')
			}
		}
	}
</script>

<style scoped>
	.orderDetail {
		background-color: #F7F7F7;
	}
	.demo-loadmore-list {
		/* padding: 16px 16px; */
		/* min-height: 350px; */
		/* background-color: #f7f7f7; */
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
		padding: 16px;
		margin-bottom: 15px;
		border-bottom: none;
		display: block;
		border-radius: 4px;
	}
</style>

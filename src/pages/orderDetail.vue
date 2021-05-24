<template>
	<div class="orderDetail">
		<div style="height:100px;background-color: #1975FF;line-height: 100px;text-align: left;padding-left: 32px;">
			<span style="font-size: 20px;color:#fff;">支付成功</span>
		</div>
		<div style="padding: 16px;">
			<div>
				<a-list class="demo-loadmore-list"  item-layout="horizontal" :data-source="data">
					<a-list-item slot="renderItem" slot-scope="item, index">
						<a-list-item-meta>
							<a slot="title" style="color:#333;">111</a>
							<div slot="description" style="text-align: left;">
								111
								<br />
								<div style="color:#333;overflow: auto;">
									￥111
									<i style="font-style: normal;float:right;">×111</i>
								</div>
							</div>
							<a-avatar shape="square" :size="100" style="height:60px;" slot="avatar" src="" />
						</a-list-item-meta>
						<div style="text-align: right;">
							<span>应付款￥</span>
							<span style="color:#333;">1111</span>
						</div>
					</a-list-item>
				</a-list>
			</div>
			<div style="background: #FFFFFF;border-radius: 4px;margin-top:32px;padding: 16px;">
				<h5 style="font-size: 20px;text-align: left;">订单信息</h5>
				<a-row style="margin-bottom:12px;font-size:14px;">
					<a-col :span="6">订单编号</a-col>
					<a-col :span="18" style="text-align:left;color:#999;">123{{ course_name }}</a-col>
				</a-row>
				<a-row style="margin-bottom:12px;font-size:14px;">
					<a-col :span="6">下单时间</a-col>
					<a-col :span="18" style="text-align:left;color:#999;">123{{ course_teacher }}</a-col>
				</a-row>
				<a-row style="margin-bottom:12px;font-size:14px;">
					<a-col :span="6">支付方式</a-col>
					<a-col :span="18" style="text-align:left;color:#999;">123{{ course_count }}</a-col>
				</a-row>
				<a-row style="margin-bottom:12px;font-size:14px;">
					<a-col :span="6">支付时间</a-col>
					<a-col :span="18" style="text-align:left;color:#999;">123{{ course_count }}</a-col>
				</a-row>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				data:[{
					name:'111'
				}]
			}
		}
	}
</script>

<style scoped>
	.orderDetail {
		background-color: #F7F7F7;
	}
</style>

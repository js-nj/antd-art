<template>
	<div style="padding: 16px;background: #F7F7F7;">
		<div>
			<span style="color: #999999;font-size:14px;">订单金额</span>
			<div>
				<span style="font-size: 18px;">￥</span>
				<label style="font-size: 36px;">{{ pay_price }}</label>
			</div>
		</div>
		<div style="background: #FFFFFF;border-radius: 4px;margin-top:32px;padding: 16px;">
			<h5 style="font-size: 20px;text-align: left;">课程信息</h5>
			<a-row style="margin-bottom:12px;">
				<a-col :span="6">课程名称</a-col>
				<a-col :span="18" style="text-align:right;color:#666666;">{{ course_name }}</a-col>
			</a-row>
			<a-row style="margin-bottom:12px;">
				<a-col :span="6">课程老师</a-col>
				<a-col :span="18" style="text-align:right;color:#666666;">{{ course_teacher }}</a-col>
			</a-row>
			<a-row style="margin-bottom:12px;">
				<a-col :span="6">课时数</a-col>
				<a-col :span="18" style="text-align:right;color:#666666;">{{ course_count }}</a-col>
			</a-row>
			<a-row style="margin-bottom:12px;">
				<a-col :span="6">课程单价</a-col>
				<a-col :span="18" style="text-align:right;color:#666666;">￥{{ course_count }}/节</a-col>
			</a-row>
		</div>
		<a-button type="primary" shape="round" size="large" style="width: 90%;margin-top:64px;" @click="submitPay">确认订单</a-button>
	</div>
</template>

<script>
import Api from '../api/api.js';
export default {
	name: 'pay',
	created() {
		let routeParam = this.$route.query;
		if (routeParam.name) {
			this.pay_price = routeParam.price;
			this.course_name = routeParam.name;
			this.course_teacher = routeParam.teacher;
			this.course_count = routeParam.count;
			this.course_price = routeParam.totalprice;
			this.course_id = routeParam.product_id;
			this.order_num = routeParam.order_num;
		}
	},
	data() {
		return {
			pay_price: '',
			course_name: '',
			course_teacher: '',
			course_count: '',
			course_price: '',
			course_id: '',
			order_num:''
		};
	},
	methods: {
		submitPay() {
			let param = {
				user_id: '',
				user_type: '', //	string	用户类型
				token: '', //	string	用户token
				teacher_id: '', //	string	教师ID
				pay_type: '1', //	string	1微信2支付宝
				order_money: this.pay_price, //	number	订单金额
				order_remarks: '', //	string	订单备注
				user_name: '', //	string	收货人
				user_phone: '', //	number	收货电话
				user_address: '', //	string	收货地址
				products: {
					product_id: this.course_id, //	string	产品ID
					product_price: this.course_price, //	string	产品单价
					product_count: this.course_count, //	number	课时数
					product_name: this.course_name //	string	产品名称
				}
			};
			this.$axios({
				method: 'get',
				url: Api.OrderAdd,
				params: { request_content: JSON.stringify(param) }
			}).then(res => {
				let data = res.data;
				console.log('data', data);
				if (data.code === '0') {
					function onBridgeReady() {
						WeixinJSBridge.invoke(
							'getBrandWCPayRequest',
							{
								appId: data.result.appId, //公众号名称，由商户传入
								timeStamp: data.result.timeStamp, //时间戳，自1970年以来的秒数
								nonceStr: data.result.nonceStr, //随机串
								package: data.result.package,
								signType: data.result.signType, //微信签名方式：
								paySign: data.result.paySign //微信签名
							},
							wxResponse => {
								if (wxResponse.err_msg == 'get_brand_wcpay_request:ok') {
									alert('支付成功');
									// that.AppleBalance();
								}
								if (wxResponse.err_msg == 'get_brand_wcpay_request:fail') {
									this.$message.error('支付失败');
								}
								if (wxResponse.err_msg == 'get_brand_wcpay_request:cancel') {
									this.$message.error('支付取消');
								}
							}
						);
					}
					if (typeof WeixinJSBridge == 'undefined') {
						if (document.addEventListener) {
							document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
						} else if (document.attachEvent) {
							document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
							document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
						}
					} else {
						onBridgeReady();
					}
				} else {
					this.$message.error(data.msg);
				}
			});
		}
	}
};
</script>

<style scoped></style>

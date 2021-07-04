<template>
	<div style="padding: 16px;background: #F7F7F7;">
		<!-- <div>
			<span style="color: #999999;font-size:14px;">订单金额</span>
			<div>
				<span style="font-size: 18px;">￥</span>
				<label style="font-size: 36px;">{{ pay_price  }}</label>
			</div>
		</div> -->
		<div style="background: #FFFFFF;border-radius: 4px;margin-top:32px;padding: 16px;">
			<h5 style="font-size: 20px;text-align: left;padding: 8px 0;">课程信息</h5>
			<a-row style="margin-bottom:12px;">
				<a-col :span="6" style="text-align:left;">课程名称</a-col>
				<a-col :span="18" style="text-align:right;color:#666666;">{{ course_name }}</a-col>
			</a-row>
			<a-row style="margin-bottom:12px;">
				<a-col :span="6" style="text-align:left;">课程老师</a-col>
				<a-col :span="18" style="text-align:right;color:#666666;">{{ course_teacher }}</a-col>
			</a-row>
			<a-row style="margin-bottom:12px;">
				<a-col :span="6" style="text-align:left;">课时数</a-col>
				<!-- <a-col :span="18" style="text-align:right;color:#666666;">{{ course_count }}</a-col> -->
				<a-col :span="18" style="text-align:right;color:#666666;">
					<van-stepper v-model="course_count" min="1" max="99" step="1" :default-value="1" @change="onChange"/>
					<!-- <a-input-number id="inputNumber" v-model="course_count" :min="1" :max="99" step="1" :defaultValue="1" @change="onChange" /> -->
				</a-col>
			</a-row>
			<a-row style="margin-bottom:12px;">
				<a-col :span="6" style="text-align:left;">一对几</a-col>
				<a-col :span="18" style="text-align:right;color:#666666;">{{ one_name }}</a-col>
			</a-row>
			<a-row style="margin-bottom:12px;">
				<a-col :span="6" style="text-align:left;">难度</a-col>
				<a-col :span="18" style="text-align:right;color:#666666;">{{ level_name }}</a-col>
			</a-row>
			<a-row style="margin-bottom:12px;">
				<a-col :span="6" style="text-align:left;">时长</a-col>
				<a-col :span="18" style="text-align:right;color:#666666;">{{ time_name }}</a-col>
			</a-row>
			<a-row style="margin-bottom:12px;">
				<a-col :span="6" style="text-align:left;">课程单价</a-col>
				<a-col :span="18" style="text-align:right;color:#666666;">￥{{ course_price }}/节</a-col>
			</a-row>
			<a-row style="margin-bottom:12px;">
				<a-col :span="6" style="text-align:left;">订单金额</a-col>
				<a-col :span="18" style="text-align:right;font-size: 18px;color: red;">￥{{ pay_price }}</a-col>
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
		if (localStorage.getItem('userInfo')) {
			window._userInfo = JSON.parse(localStorage.getItem('userInfo'));
		}
		let routeParam = this.$route.query;
		if (routeParam.name) {
			// this.pay_price = routeParam.totalprice || routeParam.price;
			this.course_name = routeParam.name;
			this.course_teacher = routeParam.teacher;
			if(routeParam.count === '0' || !routeParam.count){
				this.course_count = 1;
			}else {
				this.course_count = routeParam.count;
			}
			this.course_price = routeParam.ProductPrice;
			// this.course_totalprice = routeParam.totalprice;
			this.course_id = routeParam.product_id;
			this.order_num = routeParam.order_num;
			this.teacher_id = routeParam.teacher_id;

			this.one_name = routeParam.one_name;
			this.level_name = routeParam.level_name;
			this.time_name = routeParam.time_name;
			this.ProductPrice = routeParam.ProductPrice;

			this.pay_price = this.ProductPrice * this.course_count;
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
			teacher_id:'',
			order_num:'',
			one_name:'',
			level_name:'',
			time_name:'',
			ProductPrice:''
		};
	},
	methods: {
		onChange() {
			this.pay_price = (this.course_price * this.course_count).toFixed(2);
	    },
		submitPay() {
			var that = this;
			let param = {
				open_id:localStorage.open_id,
				user_id: window._userInfo.id,
				user_type: '1', //	string	用户类型
				token: window._userInfo.token, //	string	用户token
				teacher_id: this.teacher_id, //	string	教师ID
				pay_type: '1', //	string	1微信2支付宝
				order_money: this.pay_price, //	number	订单金额
				order_remarks: '', //	string	订单备注
				user_name: '', //	string	收货人
				user_phone: '', //	number	收货电话
				user_address: '', //	string	收货地址
				products: [{
					product_id: this.course_id, //	string	产品ID
					product_price: this.course_price, //	string	产品单价
					product_count: this.course_count, //	number	课时数
					product_name: this.course_name //	string	产品名称
				}]
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
								appId: data.data.wxweb.appId, //公众号名称，由商户传入
								timeStamp: data.data.wxweb.timeStamp, //时间戳，自1970年以来的秒数
								nonceStr: data.data.wxweb.nonceStr, //随机串
								package: data.data.wxweb.package,
								signType: data.data.wxweb.signType, //微信签名方式：
								paySign: data.data.wxweb.paySign //微信签名
							},
							wxResponse => {
								if (wxResponse.err_msg == 'get_brand_wcpay_request:ok') {
									alert('支付成功');
									that.$router.push({
										path:'/order'
									});
									// that.AppleBalance();
								}
								if (wxResponse.err_msg == 'get_brand_wcpay_request:fail') {
									that.$message.error('支付失败');
								}
								if (wxResponse.err_msg == 'get_brand_wcpay_request:cancel') {
									that.$message.error('支付取消');
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

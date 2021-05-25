<template>
	<div id="normal-login">
		<div>
			<h4 class="art-h4">注册/登录您的账户</h4>
			<h5 class="art-h5">新用户登录后将自动注册创建账号</h5>
		</div>
		<a-form :form="form" class="login-form" @submit="handleSubmit">
			<a-form-item class="userName">
				<a-input v-decorator="['userName', { rules: [{ required: true, message: '请输入手机号!' }] }]" placeholder="请输入手机号"></a-input>
				<span class="art-86">+86|</span>
			</a-form-item>
			<a-form-item>
				<a-input v-decorator="['password', { rules: [{ required: true, message: '请输入验证码!' }] }]" type="password" placeholder="请输入验证码"></a-input>
				<span class="art-code" @click="getCheckCode">{{ checkCodeContent }}</span>
			</a-form-item>
			<a-form-item><a-input v-decorator="['recommandcode']" type="text" placeholder="请输入推荐码(选填)"></a-input></a-form-item>
			<a-form-item><a-button type="primary" html-type="submit" class="login-form-button">登&nbsp;&nbsp;&nbsp;&nbsp;录</a-button></a-form-item>
			<!-- <a-form-item style="position: absolute;bottom:0;left: 125px;margin-bottom:0;">
				<div>
					<a-checkbox
						class="art-agree"
						v-decorator="[
							'remember',
							{
								valuePropName: 'checked',
								initialValue: true
							}
						]"
					>
						同意《用户服务协议》
					</a-checkbox>
				</div>
			</a-form-item> -->
		</a-form>
	</div>
</template>

<script>
import Api from '../api/api.js';
// UserLogin
export default {
	beforeCreate() {
		this.form = this.$form.createForm(this, { name: 'normal_login'});
	},
	data() {
		return {
			checkCodeContent: '获取验证码',
			value:{
				userName:'',
				password:'',
				recommandcode:''
			}
		};
	},
	methods: {
		handleSubmit(e) {
			e.preventDefault();
			this.form.validateFields((err, values) => {
				if (!err) {
					// debugger
					console.log('Received values of form: ', values);
					let param = {
						from_user_code: values.recommandcode, //	string	推荐码
						user_phone: values.userName, //	string	*用户手机号
						user_type: '1', //	string	*用户类型1学生，0老师
						sms_code: values.password, //	string	*手机验证码
						open_id: '' //
					};
					this.$axios({
						method: 'get',
						url: Api.UserLogin,
						params: { request_content: JSON.stringify(param) }
					}).then(res => {
						let data = res.data;
						console.log('data', data);
						if (data.code === '0') {
							localStorage.userInfo = JSON.stringify(data.data);
							window._userInfo = data.data;
							if(window.location.href.indexOf('id=')>-1){
								this.$router.push({
									path:'/course',
									query:{
										product_id: window.location.href.split('id=')[1]
									}
								});
							}else {
								this.$router.push({
									path:'/index'
								});
							}
						} else {
							this.$message.error(data.msg);
						}
					});
				}
			});
		},
		getCheckCode() {
			let self = this;
			let valueObj = this.form.getFieldsValue();
			if(!valueObj.userName){
				this.$message.error('请输入手机号');
				return;
			}
			let param = {
				user_mobile: valueObj.userName,
				user_id: '',
				token: ''
			};
			var totalSeconds = 60;
			if (self.checkCodeContent == '获取验证码') {
				this.$axios({
					method: 'get',
					url: Api.SMSPost,
					params: { request_content: JSON.stringify(param) }
				}).then(response => {
					// console.log('--getSMSPost--',response)
					// let data = JSON.parse(response.data.d);
					if (response.data.code === '0'){
						// this.$message.info('')
					} else {
						this.$message.error(response.data.msg || '获取验证码失败！');
					}
				}).catch(error => {
					this.$message.error(error);
				});

				self.checkCodeContent = totalSeconds + 's';
				var handleInterval = window.setInterval(function() {
					totalSeconds--;
					self.checkCodeContent = totalSeconds + 's';
					if (totalSeconds == 0) {
						window.clearInterval(handleInterval);
						self.checkCodeContent = '获取验证码';
					}
				}, 1000);
			}else {
				return;
			}
		}
	}
};
</script>
<style scoped>
#normal-login {
	padding-top: 47px;
	width: 70%;
	margin: 0 auto;
	text-align: left;
}
#normal-login .login-form {
	/* position: relative; */
	/* max-width: 300px; */
}
#normal-login .login-form-button {
	margin-top: 60px;
	width: 100%;
	border-radius: 40px;
	height: 50px;
	font-size: 18px;
	font-weight: 600;
}
.art-agree {
	font-size: 12px;
}
.art-agree /deep/ span:last-child {
	/* color: #bbb;
	width: 145px; */
	height: 14px;
	font-size: 14px;
	/* font-family: PingFang-SC-Medium, PingFang-SC; */
	font-weight: 500;
	color: #aaaaaa;
	line-height: 14px;
}
#normal-login .ant-input {
	height: 60px;
	line-height: 60px;
	border-radius: 40px;
	padding: 4px 22px;
}
#normal-login .userName .ant-input {
	padding: 4px 0px 4px 60px;
}
#normal-login .userName .art-86 {
	position: absolute;
	top: -12px;
	left: 12px;
	font-size: 20px;
	font-weight: 500;
}
.art-code {
	position: absolute;
	width: 100px;
	font-size: 16px;
	top: -12px;
	right: 0px;
	color: #1890ff;
	text-align: center;
}
#normal-login input::-webkit-input-placeholder {
	font-size: 16px;
	font-weight: 500;
	color: #9a9a9a;
}
.art-h4 {
	/* width: 212px; */
	height: 24px;
	font-size: 24px;
	/* font-family: PingFangSC-Medium, PingFang SC; */
	font-weight: 500;
	color: #000000;
	line-height: 24px;
	margin-bottom: 20px;
}
.art-h5 {
	/* width: 249px; */
	height: 16px;
	font-size: 16px;
	/* font-family: PingFang-SC-Medium, PingFang-SC; */
	font-weight: 500;
	color: #666666;
	line-height: 16px;
}
.login-form {
	padding-top: 32px;
}
.login-form .ant-form-item {
	margin-bottom: 20px;
}
</style>

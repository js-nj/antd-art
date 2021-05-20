<template>
	<div id="normal-login">
		<div>
			<h4 class="art-h4">注册/登录您的账户</h4>
			<h5 class="art-h5">新用户登录后将自动注册创建账号</h5>
		</div>
		<a-form  :form="form" class="login-form" @submit="handleSubmit">
			<a-form-item class="userName">
				<a-input v-decorator="['userName', { rules: [{ required: true, message: '请输入手机号!' }] }]" placeholder="请输入手机号"></a-input>
				<span class="art-86">+86|</span>
			</a-form-item>
			<a-form-item>
				<a-input v-decorator="['password', { rules: [{ required: true, message: '请输入验证码!' }] }]" type="password" placeholder="请输入验证码"></a-input>
				<span class="art-code">获取验证码</span>
			</a-form-item>
			<a-form-item><a-input v-decorator="['recommandcode']" type="text" placeholder="请输入推荐码(选填)"></a-input></a-form-item>
			<a-form-item>
				<a-button type="primary" html-type="submit" class="login-form-button">登&nbsp;&nbsp;&nbsp;&nbsp;录</a-button>
			</a-form-item>
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
export default {
	beforeCreate() {
		this.form = this.$form.createForm(this, { name: 'normal_login' });
	},
	methods: {
		handleSubmit(e) {
			e.preventDefault();
			this.form.validateFields((err, values) => {
				if (!err) {
					console.log('Received values of form: ', values);
				}
			});
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
	color: #AAAAAA;
	line-height: 14px;
}
#normal-login .ant-input {
	height: 60px;
	line-height: 60px;
	border-radius: 40px;
	padding: 4px 22px;
}
#normal-login .userName .ant-input {
	padding: 4px 0px 4px 55px;
}
#normal-login .userName .art-86 {
	position: absolute;
	top: -14px;
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
}
#normal-login input::-webkit-input-placeholder {
	font-size: 16px;
	font-weight: 500;
	color: #9A9A9A;
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
.art-h5{
	/* width: 249px; */
	height: 16px;
	font-size: 16px;
	/* font-family: PingFang-SC-Medium, PingFang-SC; */
	font-weight: 500;
	color: #666666;
	line-height: 16px;
}
.login-form{
	padding-top: 32px;
}
.login-form .ant-form-item {
margin-bottom: 20px;	
}
</style>

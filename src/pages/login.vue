<template>
	<div>
		<div>
			<h4>注册/登录您的账户</h4>
			<p>新用户登录后将自动注册创建账号</p>
		</div>
		<a-form id="normal-login" :form="form" class="login-form" @submit="handleSubmit">
			<a-form-item class="userName">
				<a-input v-decorator="['userName', { rules: [{ required: true, message: '请输入手机号!' }] }]" placeholder="请输入手机号"></a-input>
				<span class="art-86">+86&nbsp;&nbsp;&nbsp;&nbsp;|</span>
			</a-form-item>
			<a-form-item>
				<a-input v-decorator="['password', { rules: [{ required: true, message: '请输入验证码!' }] }]" type="password" placeholder="请输入验证码"></a-input>
				<span class="art-code">获取验证码</span>
			</a-form-item>
			<a-form-item><a-input v-decorator="['recommandcode']" type="text" placeholder="请输入推荐码(选填)"></a-input></a-form-item>
			<a-form-item>
				<a-button type="primary" html-type="submit" class="login-form-button">登&nbsp;&nbsp;&nbsp;&nbsp;录</a-button>
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
						同意《用户协议》
					</a-checkbox>
				</div>
			</a-form-item>
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
	width: 70%;
	margin: 0 auto;
}
#normal-login .login-form {
	/* max-width: 300px; */
}
#normal-login .login-form-button {
	margin-top: 40px;
	width: 100%;
	border-radius: 40px;
	height: 40px;
}
.art-agree {
	font-size: 12px;
}
.art-agree > span:last-child {
	color: #bbb;
}
#normal-login .ant-input {
	height: 40px;
	line-height: 40px;
	border-radius: 40px;
	padding: 4px 16px;
}
#normal-login .userName .ant-input {
	padding: 4px 0px 4px 60px;
}
#normal-login .userName .art-86 {
	position: absolute;
	top: -14px;
	left: 12px;
}
.art-code {
	position: absolute;
	width: 100px;
	font-size: 12px;
	top: -12px;
	right: 0px;
	color: #1890ff;
}
#normal-login input::-webkit-input-placeholder {
	font-size: 13px;
}
</style>

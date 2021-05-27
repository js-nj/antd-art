<template>
	<div v-if="allready">
		<a-tabs default-active-key="1" tabPosition="bottom" @change="onChange" style="position: absolute;width: 100%;bottom: 0px;">
			<a-tab-pane key="1">
				<span slot="tab">
					<!-- <a-icon type="home" /> -->
					<img style="width: 20px;height:20px;display: block;margin:0 auto;" :src="plimg" />
					<span style="font-size: 12px;">陪练</span>
				</span>
				<div :style="{ padding: '0px 16px', overflow: 'auto', height: cHeight }">
					<a-carousel autoplay>
						<div v-for="item in ad_list" :key="item.rownumber" @click="handleAd(item)"><img style="width: 100%;height:160px;" :src="item.pic_url" /></div>
					</a-carousel>
					<a-row :gutter="0" style="padding-top: 24px;">
						<a-col class="gutter-row" :span="6" v-for="item in category_list" :key="item.id" @click="gotoList(item)">
							<div class="gutter-box">
								<img style="width:52px;height:52px;display: inline-block;border-radius: 4px;" :src="item.category_img" />
								<div style="padding: 4px 0;font-size: 12px;">{{ item.category_name }}</div>
							</div>
						</a-col>
					</a-row>
					<div class="art-recmmand" style="text-align: left;padding-top: 16px;">
						<h5 style="color:#333;font-size: 16px;">最新推荐</h5>
						<a-row :gutter="0">
							<a-col class="gutter-row" :span="12" v-for="item in course_recommend_list" :key="item.id" @click="gotoCourse(item)">
								<div class="gutter-box">
									<img style="width:100%;height:100px;display: inline-block;border-radius: 4px;" :src="item.product_img_url" />
									<div style="padding: 8px 0;">{{ item.product_name }}</div>
									<div style="overflow: auto;">
										<span style="color:#BBB;font-size: 10px;">{{ item.product_teacher }}</span>
										<label style="float:right;color:#E96525;">¥{{ item.product_price }}/时</label>
									</div>
								</div>
							</a-col>
							<!-- <a-col class="gutter-row" :span="12"><div class="gutter-box">col-6</div></a-col>
							<a-col class="gutter-row" :span="12"><div class="gutter-box">col-6</div></a-col>
							<a-col class="gutter-row" :span="12"><div class="gutter-box">col-6</div></a-col> -->
						</a-row>
					</div>
				</div>
			</a-tab-pane>
			<a-tab-pane key="2">
				<span slot="tab">
					<img style="width: 20px;height:20px;display: block;margin:0 auto;" :src="wdimg" />
					<span style="font-size: 12px;">我的</span>
					<!-- <a-icon type="user" /> -->
					
				</span>
				<div :style="{ height: cHeight }">
					<div class="my-head" style="">
						<img style="" :src="user_avatar" />
						<span class="name">{{ user_name }}</span>
					</div>
					<div class="my-menus">
						<div class="my-menu" @click="gotoOrder">
							<a-icon type="bars" />
							<span>我的订单</span>
							<a-icon class="my-arrow-right" type="right" />
						</div>
					</div>
				</div>
			</a-tab-pane>
		</a-tabs>
	</div>
</template>

<script>
import Api from '../api/api.js';
export default {
	data() {
		return {
			tabPosition: 'bottom',
			user_avatar: '',
			user_name: '',
			course_recommend_list: [],
			ad_list: [],
			cHeight: '',
			category_list: [],
			allready:false,
			plimg:require('../assets/ic_home_selected.png'),
			wdimg:require('../assets/ic_mine_un_selected.png'),
		};
	},
	created() {
		this.cHeight = window.innerHeight - 52 + 'px';
		// debugger
		if (localStorage.getItem('userInfo')) {
			window._userInfo = JSON.parse(localStorage.getItem('userInfo'));
			this.user_avatar = window._userInfo.user_avatar ? window._userInfo.user_avatar : require('../assets/head.jpg');
			this.user_name = window._userInfo.user_name ? window._userInfo.user_name : window._userInfo.user_phone;
			this.getMainData();
		} else {
			alert('个人信息未获取到~');
		}
	},
	methods: {
		gotoCourse(item) {
			this.$router.push({
				path: '/course',
				query: {
					product_id: item.product_id
				}
			});
		},
		handleAd(item) {
			if (item.web_url) {
				window.location.href = item.web_url;
			}
		},
		getMainData() {
			let param = {
				token: window._userInfo.token,
				user_id: window._userInfo.id,
				lesson_type: '2'
			};
			this.$axios({
				method: 'get',
				url: Api.StudentIndexGet,
				params: { request_content: JSON.stringify(param) }
			}).then(res => {
				let data = res.data;
				console.log('data', data);
				if (data.code === '0') {
					this.ad_list = data.data.ad_list;
					this.course_recommend_list = data.data.course_recommend_list;
					this.category_list = data.data.category_list;
					this.category_list.length = 7;
					let allItem = {
						category_img: require('../assets/all.png'),
						category_name: '全部',
						id: ''
					};
					this.category_list.push(allItem);
					this.allready = true;
				} else {
					this.$message.error(data.msg);
				}
			});
		},
		onChange(a) {
			if(a == 1){
				this.plimg = require('../assets/ic_home_selected.png');
				this.wdimg = require('../assets/ic_mine_un_selected.png');
			}else if(a == 2){
				this.plimg = require('../assets/ic_home_un_selected.png');
				this.wdimg = require('../assets/ic_mine_selected.png');
			}
			console.log(a);
		},
		gotoOrder() {
			this.$router.push({
				path: '/order'
			});
		},
		gotoList(item){
			this.$router.push({
				path: '/list',
				query:{
					category_id:item.id
				}
			});
		}
	}
};
</script>

<style scoped>
.ant-tabs /deep/ .ant-tabs-bottom-bar{
	margin-top: 0;
}
.ant-carousel >>> .slick-slide {
	text-align: center;
	height: 160px;
	line-height: 160px;
	background: #364d79;
	overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
	color: #fff;
}
.art-recmmand .gutter-row {
	min-height: 185px;
}
.art-recmmand .gutter-box {
	width: 95%;
	margin: 0 auto;
	/* background-color: #666666; */
}
.my-head {
	height: 150px;
	background: url(../assets/my-head.png) top no-repeat;
	background-size: 100% 100%;
	position: relative;
}
.my-head img {
	width: 62px;
	height: 62px;
	border-radius: 64px;
	display: inline-block;
	position: absolute;
	top: 44px;
	left: 34px;
}
.my-head .name {
	font-size: 16px;
	position: absolute;
	top: 60px;
	left: 122px;
}
.my-menus {
	padding: 48px 24px 16px 24px;
	text-align: left;
}
.my-menu {
	width: 95%;
	margin: 0 auto;
	font-size: 18px;
	overflow: auto;
	padding-bottom: 8px;
	border-bottom: solid 1px #eeeeee;
}
.my-menu span {
	display: inline-block;
	padding-left: 24px;
	/*font-size: 16px;*/
}
.my-arrow-right {
	float: right;
	position: relative;
	top: 4px;
	font-size: 12px;
	color: #999;
}
.ant-tabs /deep/ .ant-tabs-ink-bar {
	display: none !important;
}
.ant-tabs /deep/ .ant-tabs-nav {
	width: 100%;
}
.ant-tabs /deep/ .ant-tabs-nav > div {
	width: 100%;
}
.ant-tabs /deep/ .ant-tabs-nav > div .ant-tabs-tab {
	padding: 4px 0 0 0;
	width: 50%;
	margin: 0;
}
</style>

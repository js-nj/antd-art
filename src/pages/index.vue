<template>
	<div v-show="allready" :style="{ paddingTop: paddingTop }">
		<a-tabs default-active-key="1" tabPosition="bottom" @change="onChange" style="width: 100%;bottom: 0px;">
			<a-tab-pane key="1">
				<span slot="tab">
					<img style="width: 20px;height:20px;display: block;margin:0 auto;" :src="indeximg" />
					<span style="font-size: 12px;">主页</span>
				</span>
				<div :style="{ padding: '0px 16px', overflow: 'auto', height: cHeight }">
					<a-carousel autoplay>
						<div v-for="item in home_ad_list" :key="item.rownumber" @click="handleAd(item)"><img style="width: 100%;height:160px;" :src="item.pic_url" /></div>
					</a-carousel>
					<a-row class="category-list" :gutter="0" style="padding-top: 24px;">
						<a-col class="gutter-row" :span="4" v-for="item in category_list" :key="item.id" @click="gotoList(item)">
							<div class="gutter-box">
								<img style="width:52px;height:52px;display: inline-block;border-radius: 4px;" :src="item.category_img" />
								<div style="padding: 4px 0;font-size: 12px;">{{ item.category_name }}</div>
							</div>
						</a-col>
					</a-row>
					<!-- <div class="art-recmmand" style="text-align: left;padding-top: 16px;">
						<h5 style="color:#333;font-size: 16px;padding: 8px 4px;font-weight: 500;">最新推荐</h5>
						<a-row :gutter="0">
							<a-col class="gutter-row" :span="12" v-for="item in course_recommend_list" :key="item.id" @click="gotoCourse(item)">
								<div class="gutter-box">
									<img style="width:100%;height:100px;display: inline-block;border-radius: 4px;" :src="item.product_img_url" />
									<div style="padding: 8px 0;">{{ item.product_name }}</div>
									<div style="overflow: auto;">
										<span style="color:#BBB;font-size: 10px;">{{ item.product_teacher }}</span>
										<label style="float:right;color:#E96525;">￥{{ item.product_price }}/节</label>
									</div>
								</div>
							</a-col>
						</a-row>
					</div> -->
					<div class="art-recmmand-org" style="text-align: left;padding-top: 16px;">
						<h5 style="color:#333;font-size: 16px;padding: 8px 4px;font-weight: 500;">机构推荐</h5>
						<a-row :gutter="0">
							<a-col class="gutter-row" :span="12" v-for="(item,sindex) in org_recommend_list" :key="sindex" @click="gotoOrg(item)">
								<div class="gutter-box" style="width: 95%;">
									<img style="width:100%;height:100px;display: inline-block;border-radius: 4px;" :src="item.office_img_url" />
									<div style="padding: 8px 0;">{{ item.office_name }}</div>
									<div style="overflow: auto;">
										<div class="van-multi-ellipsis--l2" style="color:#BBB;font-size: 10px;">{{ item.office_info }}</div>
										<!-- <label style="float:right;color:#E96525;">￥{{ item.product_price }}/节</label> -->
									</div>
								</div>
							</a-col>
						</a-row>
					</div>
					<div class="art-recmmand-org" style="text-align: left;padding-top: 8px;">
						<h5 style="color:#333;font-size: 16px;padding: 8px 4px;font-weight: 500;">学艺资讯</h5>
						<van-list
						  v-model="loading"
						  :finished="finished"
						  finished-text="没有更多了"
						  @load="getCMSList"
						>
							<div class="wy-news-items">
		                      <div class="wy-news-item" v-for="item in list" @click="gotoDetail(item)">
		                        <div class="wy-news-item-body">
		                          <div class="wy-news-item-title van-multi-ellipsis--l2">{{htmlDecodeByRegEx(item.cms_title)}}</div>
		                          <div class="wy-news-item-des">
		                            <!-- <div class="van-ellipsis">{{htmlDecodeByRegEx(item.cms_content)}}</div> -->
		                            <span class="">{{item.create_time}}</span>
		                            <span class="wy-news-item-read">{{item.hits+'人阅读'}}</span>
		                          </div>
		                        </div>
		                        <div class="wy-news-item-img">
		                          <img :src="item.cms_img_url" />
		                        </div>
		                      </div>
		                    </div>
						  <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
						</van-list>
					</div>
				</div>
			</a-tab-pane>
			<a-tab-pane key="2">
				<span slot="tab">
					<img style="width: 20px;height:20px;display: block;margin:0 auto;" :src="plimg" />
					<span style="font-size: 12px;">陪练</span>
				</span>
				<div :style="{ padding: '0px 16px', overflow: 'auto', height: cHeight }">
					<a-carousel autoplay>
						<div v-for="item in ad_list" :key="item.rownumber" @click="handleAd(item)"><img style="width: 100%;height:160px;" :src="item.pic_url" /></div>
					</a-carousel>
					<!-- <a-row class="category-list" :gutter="0" style="padding-top: 24px;">
						<a-col class="gutter-row" :span="4" v-for="item in category_list" :key="item.id" @click="gotocList(item)">
							<div class="gutter-box">
								<img style="width:52px;height:52px;display: inline-block;border-radius: 4px;" :src="item.category_img" />
								<div style="padding: 4px 0;font-size: 12px;">{{ item.category_name }}</div>
							</div>
						</a-col>
					</a-row> -->
					<div class="art-recmmand" style="text-align: left;padding-top: 16px;">
						<h5 style="color:#333;font-size: 16px;padding: 8px 4px;font-weight: 500;">陪练推荐</h5>
						<a-row :gutter="0">
							<a-col class="gutter-row" :span="24" v-for="item in course_recommend_list" :key="item.id" @click="gotoCourse(item)">
								<div class="gutter-box">
									<img style="width:100%;height:11rem;display: inline-block;border-radius: 4px;" :src="item.product_img_url" />
									<div style="padding: 8px 0;">{{ item.product_name }}</div>
									<div style="overflow: auto;">
										<label style="color:#E96525;">￥{{ item.product_price }}/节</label>
										<!-- <span style="color:#BBB;font-size: 10px;">{{ item.product_teacher }}</span>
										<label style="float:right;color:#E96525;">￥{{ item.product_price }}/节</label> -->
									</div>
								</div>
							</a-col>
						</a-row>
					</div>
					<!-- <div class="art-recmmand-org" style="text-align: left;padding-top: 16px;">
						<h5 style="color:#333;font-size: 16px;padding: 8px 4px;font-weight: 500;">机构推荐</h5>
						<a-row :gutter="0">
							<a-col class="gutter-row" :span="24" v-for="(item,sindex) in org_recommend_list" :key="sindex" @click="gotoOrg(item)" style="padding: 12px 0;">
								<div>
									<img :src="item.office_img_url" style="width:74px;height:74px;display:inline-block;border-radius:36px;vertical-align: top;">
									<div style="padding-left:20px;display:inline-block;width: calc(100% - 85px);text-align: left;position:relative;top:4px;">
										<div>{{item.office_name}}</div>
										<div class="van-multi-ellipsis--l2" style="color: #999;">{{item.office_info}}</div>
									</div>
								</div>
							</a-col>
						</a-row>
					</div> -->
				</div>
			</a-tab-pane>
			<a-tab-pane key="3">
				<span slot="tab">
					<img style="width: 20px;height:20px;display: block;margin:0 auto;" :src="wdimg" />
					<span style="font-size: 12px;">我的</span>
				</span>
				<div :style="{ height: cHeight }">
					<div class="my-head" style="">
						<img style="" :src="user_avatar" />
						<span class="name">{{ user_name }}</span>
						<br />
						<span class="money">余额:{{ sumMoney }}</span>
					</div>
					<div class="my-menus">
						<div class="my-menu" @click="gotoOrder">
							<a-icon type="bars" />
							<span>我的订单</span>
							<a-icon class="my-arrow-right" type="right" />
						</div>
						<div class="my-menu" @click="chongzhi">
							<a-icon type="bars" />
							<span>充值</span>
						</div>
						<div class="my-menu" @click="gotoMoneyList">
							<a-icon type="bars" />
							<span>充值记录</span>
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
import { MessageBox } from 'bh-mint-ui2';
import 'bh-mint-ui2/lib/style.css';
import { List } from 'vant';
import 'vant/lib/list/style';
export default {
	components: {
		MessageBox,
		[List.name]: List,
	},
	data() {
		return {
			tabPosition: 'bottom',
			user_avatar: '',
			user_name: '',
			home_course_recommend_list: [],
			home_org_recommend_list:[],
			home_ad_list: [],
			home_category_list: [],
			course_recommend_list: [],
			org_recommend_list:[],
			ad_list: [],
			cHeight: '',
			category_list: [],
			allready: false,
			paddingTop: '0px',
			sumMoney: '',
			indeximg:require('../assets/ic_home_selected.png'),
			plimg: require('../assets/ic_pl_un_selected.png'),
			wdimg: require('../assets/ic_mine_un_selected.png'),
			list: [],
		    loading: false,
		    finished: false,
		    listTotal:20,
		    page:0,
		    limitPage:0
		};
	},
	created() {
		const isIphonex = () => {
			if (typeof window !== 'undefined' && window) {
				return /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812;
			}
			return false;
		};
		// debugger
		if (isIphonex()) {
			// alert('isIphonex');
			this.cHeight = sessionStorage.innerHeight - 52 - 75 + 'px';
			// alert('this.cHeight', this.cHeight);
			// this.paddingTop = '75px';
		} else {
			// debugger
			this.cHeight = sessionStorage.innerHeight - 52 + 'px';
			// alert('this.cHeight', this.cHeight);
		}
		console.log('this.cHeight:'+this.cHeight + ',localStorage.innerHeight:'+localStorage.innerHeight + ',window.innerHeight:' + window.innerHeight+',window.outerHeight:'+window.outerHeight)
		// debugger
		if (localStorage.getItem('userInfo')) {
			window._userInfo = JSON.parse(localStorage.getItem('userInfo'));
			this.user_avatar = window._userInfo.user_avatar ? window._userInfo.user_avatar : require('../assets/head.jpg');
			this.user_name = window._userInfo.user_name ? window._userInfo.user_name : window._userInfo.user_phone;
			this.sumMoney = window._userInfo.apple_balance || '0.00';
			this.getHomeData();
			this.getMainData();
			this.getCMSList();
		} else {
			alert('个人信息未获取到~');
		}
	},
	methods: {
		gotoDetail(item){
	      if (item.cms_type == '2') {
	        window.location.href = item.cms_url;
	      }else {
	      	this.$router.push({
				path: '/detail',
				query: {
					id:item.id
				}
			});
	        // window.location.href = window.location.origin+window.location.pathname + '#/detail?id='+item.id;
	      }
	    },
	    htmlDecodeByRegEx(str){
	         var temp = "";
	         if(str.length == 0) return "";
	         temp = str.replace(/&amp;/g,"&");
	         temp = temp.replace(/&lt;/g,"<");
	         temp = temp.replace(/&gt;/g,">");
	         temp = temp.replace(/&nbsp;/g," ");
	         temp = temp.replace(/&#39;/g,"\'");
	         temp = temp.replace(/&quot;/g,"\"");
	         temp = temp.replace(/&ldquo;/g,"\“");
	         temp = temp.replace(/&rdquo;/g,"\”");
	         return temp;
	    },
		getCMSList(){
			if(this.page > this.limitPage){
				return;
			}
			this.page++
			let param = {
				user_id: window._userInfo.id,
				page:this.page,//	int	*当前页数
				limit:'10',//
			};
			this.$axios({
				method: 'get',
				url: Api.CMSList,
				params: { request_content: JSON.stringify(param) }
			}).then(res => {
				let data = res.data;
				if (data.code === '0') {
					this.list = this.list.concat(data.data);
					// 加载状态结束
			        this.loading = false;
			        this.listTotal = Number(data.count) || 20;
			        this.limitPage = Number(data.count)/10;
			        // 数据全部加载完成
			        if (this.list.length >= this.listTotal) {
			          this.finished = true;
			        }
				} else {
					this.$message.error(data.msg);
				}
			});
		},
		gotoOrg(item){
			this.$router.push({
				path: '/organization',
				query: {
					id:item.office_id
				}
			});
		},
		chongzhi() {
			let that = this;
			MessageBox.prompt('请输入金额', '充值', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				inputPattern: /^\d+(\.\d+)?$/,
				inputErrorMessage: '金额格式不正确'
			}).then(({ value, action }) => {
				let param = {
					user_id: window._userInfo.id, // 是 string  用户ID
					open_id: localStorage.open_id, //是 string  微信Open_ID
					total_fee: value
				};
				this.$axios({
					method: 'post',
					url: Api.WXPay,
					data: param
				}).then(function(response) {
					let data = JSON.parse(response.data.d);
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
										// window.Toast("支付成功");
										that.AppleBalance();
									}
									if (wxResponse.err_msg == 'get_brand_wcpay_request:fail') {
										alert('支付失败');
									}
									if (wxResponse.err_msg == 'get_brand_wcpay_request:cancel') {
										alert('支付取消');
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
						// window.Toast(data.msg);
						// this.wxBtn=true;
					}
				});
			});
		},
		AppleBalance() {
			var that = this;
			let param = {
				token: window._userInfo.token,
				user_type: '',
				user_id: window._userInfo.id
			};
			this.$axios({
				method: 'get',
				url: Api.AppleBalance,
				params: { request_content: JSON.stringify(param) }
			})
				.then(response => {
					let data = response.data;
					if (data.code === '0') {
						that.sumMoney = data.data;
						window._userInfo.apple_balance = data.data;
						localStorage.userInfo = JSON.stringify(window.userInfo);
					} else {
						this.$message.error(data.msg);
						// Toast(data.msg);
					}
				})
				.catch(error => {
					this.$message.error('获取余额失败！');
					// Toast('获取余额失败！');
				});
		},
		gotoMoneyList() {
			this.$router.push({
				path: '/consumelist',
				query: {}
			});
		},
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
		getHomeData() {
			let param = {
				token: window._userInfo.token,
				user_id: window._userInfo.id,
				lesson_type: '1'
			};
			this.$axios({
				method: 'get',
				url: Api.StudentIndexGet,
				params: { request_content: JSON.stringify(param) }
			}).then(res => {
				let data = res.data;
				console.log('-getHomeData-data.code', data.code);
				console.log('-getHomeData-data', data);
				console.log('-getHomeData-data-json', JSON.parse(data))
				if (data.code === '0') {
					this.home_ad_list = data.data.ad_list;
					this.home_course_recommend_list = data.data.course_recommend_list;
					this.home_org_recommend_list = data.data.company_recommend_list
					this.home_category_list = data.data.category_list;
					// this.home_category_list.length = 7;
					// let allItem = {
					// 	category_img: require('../assets/all.png'),
					// 	category_name: '全部',
					// 	id: ''
					// };
					// this.home_category_list.push(allItem);
					this.allready = true;
				} else {
					this.$message.error(data.msg);
				}
			});
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
				console.log('getMainData-data.code', data.code);
				if (data.code === '0') {
					this.ad_list = data.data.ad_list;
					this.course_recommend_list = data.data.course_recommend_list;
					this.org_recommend_list = data.data.company_recommend_list
					this.category_list = data.data.category_list;
					// this.category_list.length = 7;
					// let allItem = {
					// 	category_img: require('../assets/all.png'),
					// 	category_name: '全部',
					// 	id: ''
					// };
					// this.category_list.push(allItem);
					this.allready = true;
				} else {
					this.$message.error(data.msg);
				}
			});
		},
		onChange(a) {
			if (a == 1) {
				this.indeximg = require('../assets/ic_home_selected.png');
				this.plimg = require('../assets/ic_pl_un_selected.png');
				this.wdimg = require('../assets/ic_mine_un_selected.png');
			} else if (a == 2) {
				this.indeximg = require('../assets/ic_home_un_selected.png');
				this.plimg = require('../assets/ic_pl_selected.png');
				this.wdimg = require('../assets/ic_mine_un_selected.png');
			} else if (a == 3) {
				this.indeximg = require('../assets/ic_home_un_selected.png');
				this.plimg = require('../assets/ic_pl_un_selected.png');
				this.wdimg = require('../assets/ic_mine_selected.png');
			}
			console.log(a);
		},
		gotoOrder() {
			this.$router.push({
				path: '/order'
			});
		},
		gotoList(item) {
			this.$router.push({
				path: '/list',
				query: {
					category_id: item.id
				}
			});
		},
		gotocList(item) {
			this.$router.push({
				path: '/clist',
				query: {
					category_id: item.id
				}
			});
		}
	}
};
</script>

<style scoped>
.ant-tabs /deep/ .ant-tabs-bottom-bar {
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
.category-list .gutter-row{
	width:20%;
}
.art-recmmand-org .gutter-box {
	/*max-height: 100px;*/
	width:100%;
	margin: 0 auto;
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
	top: 50px;
	left: 122px;
}
.my-head .money {
	font-size: 16px;
	position: absolute;
	top: 80px;
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
	margin-bottom: 20px;
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
	width: 33.33%;
	margin: 0;
}
.mint-msgbox-wrapper /deep/ .mint-msgbox {
	background-color: #fff;
}










.wy-news-items{
      /*padding: 0 16px;*/
      overflow: auto;
}
.wy-news-item{
  padding: 12px 0;
      border-top: solid 1px #F7F7F7;
      position: relative;
}
.wy-news-item-body {
  width: calc(100% - 104px);
      padding-left: 8px;
}
.wy-news-item-body,.wy-news-item-img {
  display: inline-block;
  vertical-align: top;
}
.wy-news-item-img {
  /*width: 100px;*/
  line-height: 1;
  /*padding-top: 4px;*/
}
.wy-news-item-body {
  width: calc(100% - 101px);
  /*width: calc(100% - 105px);*/
    text-align: left;
}
.wy-news-item-title {
  padding: 0 0 4px 0;
  color: #333;
  width:100%;
/*    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;*/

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
}
.wy-news-item-des {
  font-size: 12px;
  color: #666;
}
.wy-news-item-read {
  display: inline-block;
  padding-left: 12px;
}
.wy-news-item-img img {
  width: 95px;
  height: 65px;
}
</style>

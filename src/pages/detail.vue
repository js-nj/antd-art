<template>
<div class="wy-detail">
  <div class="wy-detail-title">{{title}}</div>
  <div class="wy-detail-des">
    <!-- <span class="wy-detail-des-item">{{auther}}</span>
    <span class="wy-detail-des-item">{{mfrom}}</span> -->
    <span class="wy-detail-des-item">{{time}}</span>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <!-- <span class="wy-detail-des-item">{{hits}}人阅读</span> -->
  </div>
  <div class="wy-detail-body" v-html="content"></div>
  <div v-if="cmsImgUrl" style="padding-bottom:16px;">
    <img :src="cmsImgUrl" style="width: 100%;" />
  </div>
</div>

</template>

<script>
  import Api from '../api/api.js';
// import utils from '../utils.js';
// import * as utils from '../utils';
export default {
  name: 'detail',
  data () {
    return {
      id:'',
      title:'',
      auther:'',
      mfrom:'',
      time:'',
      hits:'',
      content:'',
      cmsImgUrl:''
    }
  },
  created(){
    if (!window._userInfo) {
      window._userInfo = JSON.parse(localStorage.getItem('userInfo'));
    }
    // document.title = '资讯详情';
    var param = {
      id:''
    };
    if (this.$route.params && this.$route.params.id) {
      param.id = this.$route.params.id;
    } else {
      param.id = window.location.href.split('id=')[1];
    }
    this.getGgDetail(param);
  },
  methods:{
    htmlDecodeByRegEx(str){
         var temp = "";
         if(!str || str.length == 0) return "";
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
    getGgDetail(param){
      var that = this;
      let params = {
        user_id: window._userInfo.id,
        cms_id:param.id
      };
      this.$axios({
        method: 'get',
        url: Api.CMSDetails,
        params: { request_content: JSON.stringify(params) }
      }).then(res => {
        console.log(11,res)
        let data = res.data;
        if (data.code == '0') {
          that.title = that.htmlDecodeByRegEx(data.data.cms_title);
          // that.auther = res.data.checkUserName ;
          // that.mfrom = res.data.copyfrom;
          that.time = data.data.create_time;
          that.hits = data.data.hits;
          that.content = that.htmlDecodeByRegEx(data.data.cms_content);
          that.cmsImgUrl = data.data.cms_img_url;
        } else {
          this.$message.error(data.msg);
        }
      });
      // utils.Get('getGgDetail',param).then(function(res){
      //   console.log('res----',res)
      //   if (res.data.code === 0) {
      //     that.title = that.htmlDecodeByRegEx(res.data.wyCms.cmsTitle);
      //     that.auther = res.data.wyCms.checkUserName ;
      //     that.mfrom = res.data.wyCms.copyfrom;
      //     that.time = res.data.wyCms.createDate;
      //     that.hits = res.data.wyCms.hits;
      //     that.content = that.htmlDecodeByRegEx(res.data.wyCms.cmsContent);
      //     that.cmsImgUrl = res.data.wyCms.cmsImgUrl;
      //   }
      //   // that.list = res.data.page.list;
      // });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wy-detail {
  padding: 16px;
  text-align: left;
}
.wy-detail-title {
  font-size: 16px;
  /*font-size: 24px;*/
      word-break: break-all;

}
.wy-detail-des-item {
  display: inline-block;
    padding: 4px 0 8px 0;
  /*font-size: 14px;*/
  font-size: 16px;
  color: #999;
}
.wy-detail-body {
  /*font-size: 13px;*/
  font-size: 16px;
}
.wy-detail-body >>> img {
  width: 100% !important;
}
</style>

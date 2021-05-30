<template>
  <div id="app">
	  <router-view keep-alive></router-view>
  </div>
</template>

<script>
// import Index from './pages/index.vue'
// import Login from './pages/login.vue'
// import Course from './pages/course.vue'
// import My from './pages/my.vue'
// import Order from './pages/order.vue'
// import OrderDetail from './pages/orderDetail.vue'
// import Pay from './pages/pay.vue'

export default {
  name: 'App',
  components: {
   //  Index,
  	// Login,
  	// Course,
   //  My,
   //  Order,
   //  OrderDetail,
   //  Pay
  }
}
</script>

<style>
#app {
	font-family: "PingFangSC-Medium";
	/* position: relative; */
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
  /* margin-top: 60px; */
}
.mt-bg-white {
  background-color: #fff;
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    #app {
        padding-bottom: 34px !important;
    }
}
</style>

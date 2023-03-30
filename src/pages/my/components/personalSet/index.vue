<template>
 <view class="personalSet">
  <view class="personalSet-img">
    <image
        class="logo-image"
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Faf588ebb-8bba-4d96-8816-37f8db6b6ab5%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680684862&t=aa98df6f31047e6484e37f4c8c3b7fd7"
      />
  </view>
  <u-cell-group >
	<u-cell titleStyle="font-size: 32rpx;" rightIconStyle="font-size: 32rpx;" customStyle="font-size: 32rpx;" title="昵称" value="意间#b3" isLink size="large"></u-cell>
	<u-cell titleStyle="font-size: 32rpx;" rightIconStyle="font-size: 32rpx;" title="手机号" isLink size="large"></u-cell>
  <u-cell titleStyle="font-size: 32rpx;" rightIconStyle="font-size: 32rpx;" title="修改密码" isLink size="large" url="/pages/my/components/changePassword/index"></u-cell>
	<u-cell titleStyle="font-size: 32rpx;" rightIconStyle="font-size: 32rpx;" title="联系客服" isLink size="large"></u-cell>
  <u-cell titleStyle="font-size: 32rpx;" rightIconStyle="font-size: 32rpx;" title="免责声明" isLink size="large"></u-cell>
	<u-cell titleStyle="font-size: 32rpx;" rightIconStyle="font-size: 32rpx;" title="开发API" isLink size="large"></u-cell>
</u-cell-group>
<view class="personalSet-button">
  <text class="personalSet-text">注销账号</text>
  <text class="personalSet-text" style="background-color: #46bafd;color: #fff;" @click="logOut">退出登录</text>
</view>
  
 </view> 
</template>
<script>
import {getLogout} from '@/api/user'
export default {
  data() {
   return {};
 },

 onLoad() {

 },
 methods: {
 async logOut(){
   const res = await getLogout()
   if(res.code){
    this.$store.commit('longout')
    uni.showToast({
          title: res.msg,
          icon: "none",
        });
       uni.navigateTo({
        url: "/pages/login/index",
      });
   }
   console.log(res);
  }
 },
};
</script>

<style scoped lang="scss">
.personalSet{
  height: 100vh;
  display: flex; 
  flex-direction: column;
  justify-content: space-around;
  font-size: 32rpx;
}
.personalSet-img{
  display: flex;
  justify-content: center;
  margin: 50rpx 0;
}
.logo-image{
  width: 200rpx;
      height: 200rpx;
      border-radius: 50%;
      margin-bottom: 20rpx;
}
.personalSet-button{
  flex: 1;
  height: 200rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .personalSet-text{
     width: 250rpx;
    height: 90rpx;
    text-align: center;
    line-height:90rpx ;
    border: 1px solid #599be0;
   border-radius: 10rpx;
  }
}
</style>

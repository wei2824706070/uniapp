<template>
  <view class="login">
    
    <view class="logo">
     
      <uni-nav-bar dark :fixed="true" shadow background-color="#007AFF" status-bar left-icon="left" left-text="返回"
			title="自定义导航栏" @clickLeft="back" />
      <image
        class="logo-image"
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Faf588ebb-8bba-4d96-8816-37f8db6b6ab5%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680684862&t=aa98df6f31047e6484e37f4c8c3b7fd7"
      />
      <view> 欢迎登录 </view>
      <view class="login-button">
        <text class="text-weixin">微信一键登录</text>
        
        <text class="text-phone" @click="goMobile">手机号码登录</text>
      </view>
    </view>

    <view class="login-agree">
      <u-checkbox-group v-model="value">
        <u-checkbox
          activeColor="green"
          label="登录代表您已同意《意间AI服务条款》"
        ></u-checkbox>
      </u-checkbox-group>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      clearInterval: "",
    };
  },

  onLoad() {},
  methods: {
    changeRadio(item) {
      console.log(item);
    },
    goMobile(){
      uni.navigateTo({
					url: '/pages/login/components/Mobile/index'
				})
      // uni.switchTab({url:'/pages/login/components/Mobile/index'})
    },
    leftClick(){

    }
  },
};
</script>

<style scoped lang="scss">
.login {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  // margin-top: 40rpx;
  padding:40rpx;
  // background: #000;
  .login-button {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .text-weixin {
      width: 600rpx;
      height: 100rpx;
      border: 1px solid #fff;
      text-align: center;
      line-height: 100rpx;
      color: #fff;
      border-radius: 10rpx;
      font-size: 32rpx;
      margin: 40rpx 0;
      background: #6dc540;
    }
    .text-phone {
      width: 600rpx;
      height: 100rpx;
      border: 1px solid #fff;
      text-align: center;
      line-height: 100rpx;
      color: #fff;
      border-radius: 10rpx;
      font-size: 32rpx;
      background: #cd76eb;
    }
  }
  .login-agree {
    // display: flex;
    color: #fff;
    flex: 1;
    margin-top: 40rpx;
    // .login-text {
    // }
  }
  .logo {
    margin-top: 40rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    // color: #fff;
    font-size: 36rpx;
    .logo-image {
      width: 200rpx;
      height: 200rpx;
      border-radius: 50%;
      margin-bottom: 20rpx;
    }
  }
}
</style>

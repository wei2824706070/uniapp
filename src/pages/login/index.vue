<template>
  <view class="login">
    <view class="logo">
      <image
        class="logo-image"
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Faf588ebb-8bba-4d96-8816-37f8db6b6ab5%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680684862&t=aa98df6f31047e6484e37f4c8c3b7fd7"
      />
      <view> 欢迎登录 </view>
      <view class="login-button">
        <button
          class="text-weixin"
          open-type="getPhoneNumber"
          @getphonenumber="decryptPhoneNumber"
        >
          微信一键登录
        </button>

        <text class="text-phone" @click="goMobile">账号登录</text>
      </view>
      <view class="logo_xieyi">
        <checkbox-group @change="changeValue">
          <checkbox style="transform: scale(0.7)" :checked="value" />
        </checkbox-group>
        <view class="logo_text"
          >请勾选并阅读 <text>《注册协议》</text>及
          <text>《隐私协议》</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { getWxOauth2Login } from "@/api/user";
export default {
  data() {
    return {
      value: true,
      clearInterval: "",
      signature: "",
      rawData: {},
    };
  },

  onLoad() {},
  methods: {
    changeRadio(item) {
      console.log(item);
    },
    goMobile() {
      uni.navigateTo({
        url: "/pages/login/components/Mobile/index",
      });
      // uni.switchTab({url:'/pages/login/components/Mobile/index'})
    },
    changeValue() {
      this.value = !this.value;
    }, 
    async decryptPhoneNumber(e) {
      console.log(e);
      //  const res = await getWxOauth2Login({code: e.detail.code,})
      //  console.log(res);
      // uni.request({
      //             url: `/system/user/wxOauth2Login`,
      //             method: "post",
      //             header: {
      //               "content-type": "application/x-www-form-urlencoded",
      //             },
      //             data:{
      //               code: e.detail.code
      //             },
      //             success(res) {
      //               console.log(111,res);

      //             },
      //           });
    },
    wxLogin() {
      // wx.getUserInfo({
      //   desc: "用于完善会员资料",
      //   success: (res) => {
      //     const userInfo = res.userInfo;
      //     console.log(userInfo);
      //   },
      //   fail: (err) => {
      //     console.log(err);
      //   },
      // });
      // wx.authorize({
      //   scope: "scope.userInfo",
      //   success: () => {
      //     console.log("用户已授权");
      //   },
      //   fail: () => {
      //     console.log("用户未授权");
      //   },
      // });
      //  uni.login({
      //     provider: "weixin",
      //     onlyAuthorize: true, // 微信登录仅请求授权认证
      //     success: function (event) {
      //       const { code } = event;
      //       console.log(event);
      //       uni.getUserInfo({
      //         async success(res) {
      //           console.log(111, res);
      //           const avatarUrl = encodeURIComponent(res.userInfo.avatarUrl);
      // uni.request({
      //   url: "/system/user/wxLogin",
      //   method: "POST",
      //   header: {
      //     "content-type": "application/x-www-form-urlencoded",
      //   },
      //   data: {
      //     code: code,
      //     signature: res.signature,
      //     rawData: `{avatarUrl: '${avatarUrl}',nickName: '${res.userInfo.nickName}'}`,
      //   },
      //   success(res) {
      //     console.log(res);
      //     if (res.data.code == 200) {
      //       store.commit("setToken", res.data.data);
      //       uni.switchTab({
      //         url: `/pages/index/index`,
      //       });
      //     }
      //   },
      // });
      //         },
      //         fail(err) {
      //           console.log(err);
      //         },
      //       });
      //       //客户端成功获取授权临时票据（code）,向业务服务器发起登录请求。
      //     },
      //     fail: function (err) {
      //       // 登录授权失败
      //       // err.code是错误码
      //       console.log(err);
      //     },
      //   });
    },
  },
};
</script>

<style scoped lang="scss">
.login {
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // align-items: center;
  // margin-top: 40rpx;
  padding: 40rpx;
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
  .logo_xieyi {
    width: 100%;
    height: 80rpx;
    line-height: 50rpx;
    display: flex;
    margin-top: 50rpx;
    align-items: center;
    color: #444;
    font-size: 28rpx;

    .logo_text text {
      color: #ff3b00;
    }
  }
  .logo {
    margin-top: 40rpx;
    display: flex;
    align-items: center;
    // justify-content: center;
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

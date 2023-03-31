<template>
  <view>
    <view class="login">
      <view class="logo">
        <image
          class="logo-image"
          mode="aspectFill"
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Faf588ebb-8bba-4d96-8816-37f8db6b6ab5%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680684862&t=aa98df6f31047e6484e37f4c8c3b7fd7"
        />
        <view class="login_label">登录</view>
        <view class="login-input">
          <view class="uni-input-wrapper">
            <input
              class="uni-input"
              placeholder="请输入用户名"
              v-model="formData.username"
            />
          </view>

          <view class="input-pass">
            <view class="uni-input-wrapper">
              <input
                class="uni-input"
                placeholder="请输入密码"
                :password="showPassword"
                v-model="formData.password"
              />
              <u-icon
                v-if="showPassword"
                name="eye"
                @click="changePassword"
                size="20"
              ></u-icon>
              <u-icon
                v-else
                name="eye"
                @click="changePassword"
                color="#52a5ff"
                size="21"
              ></u-icon>
            </view>
          </view>
          <view class="login_from_fun">
            <input
              style="width: 64%; text-align: left"
              type="digit"
              maxlength="6"
              placeholder="请输入验证码"
              v-model="formData.code"
            />

            <image
              @click="getCaptchaImage()"
              style="width: 30%; height: 80rpx;margin-right: 10rpx;"
              :src="url"
            />
          </view>
        </view>
      </view>

      <view class="login-footer">
        <view>
          <view class="logo_xieyi">
            <checkbox-group @change="changeValue">
              <checkbox style="transform: scale(0.7)" :checked="value" />
            </checkbox-group>
            <view class="logo_text"
              >请勾选并阅读 <text>《注册协议》</text>及
              <text>《隐私协议》</text>
            </view>
          </view>
          <button class="dlbutton" color="#db6ee8" @click="handleLogin">
            登录
          </button>
        </view>
        <view class="goRegister">
          <text @click="goRegister"> 没有账号去注册 </text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getCaptchaImage, Login } from "@/api/user";
export default {
  data() {
    return {
      isAuthorization: true,
      url: "",
      formData: {
        username: "",
        password: "",
        code: "",
        uuid: "",
      },
      showPassword: true,
      value: true,
    }; 
  },
  onLoad() {
   let res = uni.getStorageSync('username-password')
    if(res){
       this.formData.username = res.username;
       this.formData.password = res.password;
       console.log(res);
    }
   
    this.getCaptchaImage();
  },
  methods: {
    async getCaptchaImage() {
      const res = await getCaptchaImage();
      console.log(res);
      this.url = "data:image/gif;base64," + res.img;
      this.formData.uuid = res.uuid;
    },
    changePassword() {
      this.showPassword = !this.showPassword;
    },
    changeValue() {
      this.value = !this.value;
    },
    goRegister() {
      uni.navigateTo({
        url: "/pages/login/components/register/index",
      });
    },
    async handleLogin() {
      if (!this.value) {
        uni.showToast({
          title: "请阅读并勾选用户协议",
          icon: "none",
        });
        return
      }
      if (!this.formData.username) {
        uni.showToast({
          title: "请输入用户名",
          icon: "none",
        });
      }
      if (!this.formData.password) {
        uni.showToast({
          title: "请输入密码",
          icon: "none",
        });
      }
      if (!this.formData.code) {
        uni.showToast({
          title: "请输入验证码",
          icon: "none",
        });
        this.getCaptchaImage()
      }
    
    const res = await Login(this.formData);
      console.log(111,res);
      uni.showToast({
          title: res.msg,
          icon: "none",
        });
      if(res.code == 200){
        // this.$store.commit('setUsername',this.formData.username)
      this.$store.commit('setToken',res.token)
        uni.switchTab({
           url: `/pages/index/index`
        });
      }else{
        this.getCaptchaImage()
      }
      
    },
  },
};
</script>

<style lang="scss">
.login {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 40rpx;
  .logo {
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
      // margin-bottom: 20rpx;
    }
    .login_label {
      margin-bottom: 40rpx;
    }
  }
  .login-input {
    width: 100%;
    margin-bottom: 50rpx;
    .input-pass {
      margin-top: 50rpx;
    }
    .uni-input {
      background-color: #fff;
      height: 80rpx;
      text-align: left;
      padding-left: 10rpx;
      border-radius: 10rpx;
      font-size: 30rpx;
    }
  }
  .login-footer {
    flex: 1;
    .dlbutton {
      margin-top: 20rpx;
      background: #db6ee8;
      color: #fff;
    }
    .goRegister {
      margin-top: 20rpx;
      color: #59b0fa;
    }
  }

  // background: #000;
  .login-agree {
    // display: flex;
    color: #fff;
    flex: 1;
    margin-top: 40rpx;
    // .login-text {
    // }
  }
  .uni-input-wrapper {
    /* #ifndef APP-NVUE */
    display: flex;
    align-items: center;
    /* #endif */
    padding: 12rpx 22rpx;
    flex-direction: row;
    flex-wrap: nowrap;
    background-color: #ffffff;
    border-radius: 10rpx;
  }
  .uni-input {
    height: 60rpx;
    line-height: 60rpx;
    font-size: 30rpx;
    padding: 0px;
    flex: 1;
    background-color: #ffffff;
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

  .login_from_fun {
    background: #fff;
    margin-top: 50rpx;
    width: 100%;
    height: 100rpx;
    font-size: 28rpx;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>

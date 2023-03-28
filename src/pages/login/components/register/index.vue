<template>
  <view class="content">
    <view class="login_from">
      <view class="login_from_input">
        <view class="login_from_name">账号</view>
        <view class="login_from_fun"
          ><input type="text" v-model="formData.username" placeholder="请输入账号"
        /></view>
      </view>

      <view class="login_from_input">
        <view class="login_from_name">密码</view>
        <view class="login_from_fun"
          ><input
            type="digit"
            v-model="formData.password"
            password="true"
            placeholder="请输入密码"
        /></view>
      </view>
      <view class="login_from_input">
        <view class="login_from_name">确认密码</view>
        <view class="login_from_fun"
          ><input
            type="digit"
            v-model="formData.confirmPassword"
            password="true"
            placeholder="请再次密码"
        /></view>
      </view>
      <view class="login_from_input">
        <view class="login_from_name">验证码</view>
        <view class="login_from_fun">
          <input
            style="width: 40%; text-align: left"
            type="digit"
            maxlength="6"
            placeholder="验证码"
            v-model="formData.code"
          />
          
          <image @click="getCaptchaImage()" style="width: 60%;height: 100rpx;" :src="url" />
            
        </view>
      </view>

      <view class="login_from_dl">
        <button @click="handleRegister">注册</button>
      </view>

      <view class="logo_xieyi">
        <checkbox-group @change="changeValue">
            <checkbox style="transform: scale(0.7);" :checked="value" />
				</checkbox-group> 
        <view class="logo_text"
          >请勾选并阅读<text>《注册协议》</text>及<text
            >《隐私协议》</text
          ></view
        >
      </view>
    </view>
  </view>
</template>
<script>
import { getCaptchaImage,getRegister } from "@/api/user";
export default {
  data() {
    return {
      url: "",
      formData: {
        username: "",
        password: "123456",
        confirmPassword: "123456",
        code:"",
        uuid:""
      },
      value:true
    };
  },
  onLoad() {
    this.getCaptchaImage()
  },
  methods: {
    //获取验证码
   async getCaptchaImage(){
    const res  = await  getCaptchaImage()
    console.log(res);
    this.url = 'data:image/gif;base64,' + res.img
    this.formData.uuid = res.uuid
    },
    changeValue() {
      this.value = !this.value;
    },

   async handleRegister() {
      if (this.value == false) {
        uni.showToast({
          title: "请阅读并勾选用户协议",
          icon: "none",
        });
      }
      if (!this.formData.username) {
        uni.showToast({
          title: "请输入用户名",
          icon: "none",
        });
        
      }
      //  else if (this.formData.username.length < 6 || this.formData.username.length > 10) {
      //   uni.showToast({
      //     title: "账号要大于六位小于十位",
      //     icon: "none",
      //   });
      // }
      if(!this.formData.password){
        uni.showToast({
          title: "请输入密码",
          icon: "none",
        });
      }
      else if (this.formData.password!=this.formData.confirmPassword) {
        uni.showToast({
          title: "两次密码要相同",
          icon: "none",
        });
      }
      const res = await getRegister(this.formData)
      console.log(res);
      uni.showToast({
          title: res.msg,
          icon: "none",
        });
      if(res.code == 200){
        uni.setStorageSync('username-password',{username:this.formData.username,password:this.formData.password})
        uni.navigateTo({
           url: `/pages/login/components/Mobile/index`
        });
      }else{
        this.getCaptchaImage()
      }
    },

  },
};
</script>
<style scoped lang="scss">
page {
  background: #fff;
}

.login_from {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 20rpx 8%;
}

.login_from_input {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px #eee solid;
  padding: 40rpx 0px;
  margin: 0px auto;
}

.login_from_name {
  width: 25%;
  font-size: 32rpx;
}
.login_from_fun {
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.login_from_fun input {
  width: 100%;
  text-align: left;
  font-size: 28rpx;
}

.login_from_dl {
  width: 100%;
  height: 10rpx;
  line-height: 100rpx;
  margin-top: 100rpx;
}
.login_from_dl button {
  width: 100%;
  height: 100rpx;
  line-height: 100rpx;
  background: #c37bec;
  color: #fff;
  border-radius: 100rpx;
}

.logo_xieyi {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  display: flex;
  margin-top: 100rpx;
  align-items: center;
  color: #444;
  font-size: 28rpx;
  justify-content: center;
  
  .logo_text text {
    color: #ff3b00;
  }
}

.getyzm {
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  color: #ff3b00;
}
.cuicon {
  font-size: 36rpx;
}

.regFrom_tom_yzlabel {
  width: 60%;
  text-align: right;
}
</style>

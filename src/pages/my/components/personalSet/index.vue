<template>
  <view class="personalSet">
    <view class="personalSet-img">
      <!-- <image class="logo-image" :src="avater" /> -->
      <button
        class="avatar-wrapper"
        open-type="chooseAvatar"
        @chooseavatar="onChooseAvatar"
      >
        <image class="logo-image" :src="avater"></image>
        <text class="avatar-text"> 更换 </text>
      </button>
    </view>
    <u-cell-group>
      <u-cell
        titleStyle="font-size: 32rpx;"
        rightIconStyle="font-size: 32rpx;"
        customStyle="font-size: 32rpx;"
        title="昵称"
        :value="username"
        isLink
        size="large"
        @click="show = true"
      ></u-cell>
      <u-cell
        titleStyle="font-size: 32rpx;"
        rightIconStyle="font-size: 32rpx;"
        title="手机号"
        isLink
        size="large"
      ></u-cell>
      <!-- <u-cell
        titleStyle="font-size: 32rpx;"
        rightIconStyle="font-size: 32rpx;"
        title="修改密码"
        isLink
        size="large"
        url="/pages/my/components/changePassword/index"
      ></u-cell> -->
      <u-cell
        titleStyle="font-size: 32rpx;"
        rightIconStyle="font-size: 32rpx;"
        title="联系客服"
        isLink
        size="large"
      ></u-cell>
      <u-cell
        titleStyle="font-size: 32rpx;"
        rightIconStyle="font-size: 32rpx;"
        title="免责声明"
        isLink
        size="large"
      ></u-cell>
      <u-cell
        titleStyle="font-size: 32rpx;"
        rightIconStyle="font-size: 32rpx;"
        title="开发API"
        isLink
        size="large"
      ></u-cell>
    </u-cell-group>
    <view class="personalSet-button">
      <text class="personalSet-text">注销账号</text>
      <text
        class="personalSet-text"
        style="background-color: #46bafd; color: #fff"
        @click="logOut"
        >退出登录</text
      >
    </view>
    <u-modal
      :show="show"
      @confirm="confirm"
      title="修改昵称"
      showCancelButton
      closeOnClickOverlay
      @cancel="cancel"
      @close="cancel"
    >
      <u--input v-model="nickName"></u--input>
      <!-- <input
        type="nickname"
        placeholder="请输入昵称"
        class="modal-input"
        v-model="nickName"
      /> -->
    </u-modal>
  </view>
</template>
<script>
import { getLogout, getWxUserInfo, updateWxUserProfile } from "@/api/user";
export default {
  data() {
    return {
      username: "",
      avater: "",
      show: false,
      nickName: "",
    };
  },
  onShow() {
    this.getWxUserInfo();
  },
  onLoad({ username, avater }) {
    // this.username = username;
    // this.avater = avater;
  },
  // onNavigationBarButtonTap(e) {
  //   if (e.position === "left") {
  //     this.onBackPress();
  //   }
  // },
  methods: {
    onBackPress() {
      // console.log("返回箭头被点击了");
    },
    async logOut() {
      const res = await getLogout();
      if (res.code) {
        this.$store.commit("longout");
        // uni.removeStorageSync('username-avater')

        uni.showToast({
          title: res.msg,
        });
        setTimeout(() => {
          uni.switchTab({
            url: `/pages/index/index`,
          });
        }, 800);
      }
      // console.log(res);
    },
    async getWxUserInfo() {
      const res = await getWxUserInfo();
      // console.log(3232, res);
      if (res.code == 200) {
        this.showlogin = false;
        this.avater = "https://ai.changqiu.cc" + res.data.avatar;
        this.username = res.data.nickName;
      }
      if (res.code == 401) {
        this.username = "";
        this.avater =
          "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Faf588ebb-8bba-4d96-8816-37f8db6b6ab5%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680684862&t=aa98df6f31047e6484e37f4c8c3b7fd7";
      }
    },
    async onChooseAvatar(e) {
      
      const { avatarUrl } = e.detail;
      uni.uploadFile({
        url: "/system/user/updateWxUserAvatar",
        filePath: avatarUrl,
        name: "file",
        success: async (uploadFileRes) => {
          let res = JSON.parse(uploadFileRes.data);
          // console.log(212, res);
          if (res.code === 200) {
            this.getWxUserInfo();
          }
        },
        fail: (error) => {
          uni.showToast({
            title: error,
            duration: 2000,
          });
        },
      });
    },
    async confirm() {
      if (this.nickName) {
        const res = await updateWxUserProfile({ nickName: this.nickName });
        // console.log(res);
        if (res.code == 200) {
          this.getWxUserInfo();
          this.show = false;
          this.nickName = "";
        }
      } else {
        uni.showToast({
          title: "请输入昵称",
          icon: "none",
        });
      }
    },
    cancel() {
      this.show = false;
      this.nickName = "";
    },
  },
};
</script>

<style scoped lang="scss">
.personalSet {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 32rpx;
}
.personalSet-img {
  display: flex;
  justify-content: center;
  margin: 50rpx 0;
}
.avatar-wrapper {
  width: 200rpx;
  height: 200rpx;
  border-radius: 50%;
  // margin-bottom: 20rpx;
  position: relative;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  background: #f0f5f2;
  .logo-image {
    width: 200rpx;
    height: 200rpx;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    // margin-bottom: 20rpx;
  }
  .avatar-text {
    width: 200rpx;
    height: 50rpx;
    line-height: 50rpx;
    color: #fff;
    font-size: 26rpx;
    background: #444444;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}
.my-modal {
  width: 500rpx;
  padding-top: 0;
}
.modal-input {
  width: 500rpx;
  height: 50rpx;
  padding-top: 0;
  border-radius: 10rpx;
  // line-height:50rpx ;
  // vertical-align:middle;
  border: 1px solid #979797;
}
.personalSet-button {
  flex: 1;
  height: 200rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .personalSet-text {
    width: 250rpx;
    height: 90rpx;
    text-align: center;
    line-height: 90rpx;
    border: 1px solid #599be0;
    border-radius: 10rpx;
  }
}
</style>

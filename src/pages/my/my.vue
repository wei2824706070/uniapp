<template>
  <view class="my">
    <view class="my-header">
      <image class="avatar" :src="avater"></image>
      <view v-if="showlogin" class="my-yh" @click="gologin">
        <text> 去登录 </text>
      </view>
      <view v-else class="my-yh">
        <text> {{ username }} </text>
        <view> 积分:{{ integral }} </view>
        <!-- <view> 积分:0 </view> -->
      </view>
      <view v-if="!showlogin" class="my-center" @click="goPersonalSet">
        <u-icon
          color="rgba(138, 218, 247, 1);"
          name="man-add-fill"
          size="45"
        ></u-icon>
        <text> 个人设置 </text>
      </view>
    </view>
    <view class="footer">
      <view class="my-footer">
        <view>
          <view>签的领取免费积分</view>
          <view class="footer-icon">
            <i class="iconfont">&#xe658;</i>
            <text> 0积分/次 </text>
          </view>
        </view>
        <button class="button" v-show="showSignIn">已签到</button>
        <button class="button" v-show="!showSignIn" @click="getSignIn">
          未签到
        </button>
      </view>
      <!-- <view class="my-footer">
        <view>
          <view>完整观看视频(限手机)(今日0/10)</view>
          <view class="footer-icon">
            <i class="iconfont">&#xe658;</i>
            <text> 6积分/次 </text>
          </view>
        </view>
        <button class="button">去观看</button>
      </view> -->
      <view class="my-footer">
        <view class="footer-text">
          <view>邀请好友注册(累计获得0积分)</view>
          <view class="footer-icon">
            <i class="iconfont">&#xe658;</i>
            <text> 0积分/次 </text>
          </view>
        </view>
        <button
          class="button"
          v-show="showSignIn"
          open-type="share"
          @share="onShareAppMessage"
        >
          去邀请
        </button>
        <button class="button" v-show="!showSignIn" @click="handleShare">
          去邀请
        </button>
        <!-- <button class="button">去邀请</button> -->
      </view>
    </view>
    <!-- <u-modal
      :show="show"
      @confirm="confirm"
      title="您还未登录,请先登录"
      showCancelButton
      @cancel="cancel"
    >
    </u-modal> -->
  </view>
</template>
<script>
import { formatTime } from "@/utils/util";
import { getWxUserInfo, getSignIn } from "@/api/user";
import { mapState } from "vuex";
export default {
  data() {
    return {
      username: "",
      showlogin: true,
      integral: "",
      showSignIn: false,
      show: false,
      userId: "",
      avater:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Faf588ebb-8bba-4d96-8816-37f8db6b6ab5%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680684862&t=aa98df6f31047e6484e37f4c8c3b7fd7",
    };
  },
  onShow() {
    if (this.token) {
      this.getWxUserInfo();
    } else {
      this.showSignIn = false;
      this.showlogin = true;
      this.avater =
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Faf588ebb-8bba-4d96-8816-37f8db6b6ab5%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680684862&t=aa98df6f31047e6484e37f4c8c3b7fd7";
    }
  },
  onHide() {
    // this.showlogin = true;
    // this.show = false;
    // this.avatar = "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Faf588ebb-8bba-4d96-8816-37f8db6b6ab5%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680684862&t=aa98df6f31047e6484e37f4c8c3b7fd7"
    // this.getWxUserInfo();
  },
  onShareAppMessage(res) {
    return {
      title: "邀请好友",
      path: `/pages/login/index?id=${this.userId}`,
    };

    // console.log(11,res);
  },
  onLoad() {
    // console.log(111,id);
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    async getWxUserInfo() {
      const res = await getWxUserInfo();
      // console.log(3232, res);
      if (res.code == 200) {
        this.showlogin = false;
        this.avater = "https://ai.changqiu.cc" + res.data.avatar;
        this.username = res.data.nickName;
        this.userId = res.data.id;
        this.integral = res.data.integral;
        if (res.data.signIn == 0) {
          this.showSignIn = false;
        }
        if (res.data.signIn == 1) {
          this.showSignIn = true;
        }
      }
      // if (res.code == 401) {
      //   this.showSignIn = false;
      //   this.showlogin = true;
      //   this.avater =
      //     "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Faf588ebb-8bba-4d96-8816-37f8db6b6ab5%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680684862&t=aa98df6f31047e6484e37f4c8c3b7fd7";
      // }
    },
    async getSignIn() {
      if (!this.token) {
        uni.showModal({
          title: "提示",
          content: "您还未登录，请先登录",
          success: (res) => {
            if (res.confirm) {
              // 用户点击确定按钮，跳转到登录页面
              uni.navigateTo({
                url: "/pages/login/index",
              });
            }
          },
        });
      } else {
        const res = await getSignIn();
        console.log(res);
        if (res.msg == "签到成功") {
          this.getWxUserInfo();
        }
      }
    },
    gologin() {
      uni.navigateTo({
        url: "/pages/login/index",
      });
    },
    goPersonalSet() {
      uni.navigateTo({
        url: `/pages/my/components/personalSet/index?username=${this.username}&avater=${this.avater}`,
      });
    },
    handleShare() {
      // uni.showToast({
      //   title: "你还未登录，请先登录",
      //   icon: "none",
      // });
      if (!this.token) {
        uni.showModal({
          title: "提示",
          content: "您还未登录，请先登录",
          success: (res) => {
            if (res.confirm) {
              // 用户点击确定按钮，跳转到登录页面
              uni.navigateTo({
                url: "/pages/login/index",
              });
            }
          },
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.my {
  margin: 40rpx;

  .my-header {
    display: flex;
    align-items: center;
    background: #fff;
    padding: 20rpx;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
    .my-yh {
      flex: 1;
      font-size: 28rpx;
    }
    .my-center {
      display: flex;
      flex-direction: column;
      align-items: center;
      text {
        font-size: 32rpx;
      }
    }
  }
  .avatar {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    border: 1px solid #fff;
    margin-right: 25rpx;
    margin-left: 10rpx;
    box-shadow: 0px 4rpx 12rpx 0px rgba(0, 0, 0, 0.4);
  }
  .footer {
    background: #fff;
    padding: 40rpx;
    border-radius: 10rpx;
    padding-bottom: 600rpx;
  }
  .my-footer {
    display: flex;
    // flex-direction: column;
    align-items: center;
    // justify-content: space-between;
    font-size: 28rpx;
    margin-bottom: 20rpx;
    position: relative;
    .footer-text {
      flex: 1;
    }
    .footer-icon {
      display: flex;
      align-items: center;
      color: #f494ee;
      margin-top: 10rpx;
      .iconfont {
        margin-right: 5rpx;
        font-size: 28rpx;
        color: #f494ee;
      }
    }
    .button {
      width: 180rpx;
      height: 65rpx;
      position: absolute;
      right: 0;
      line-height: 65rpx;
      border: 1px solid #f494ee;
      background: #ffffff;
      font-size: 28rpx;
      border-radius: 10rpx;
    }
  }
}
</style>

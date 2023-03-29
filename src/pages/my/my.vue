<template>
  <view class="my">
    <view class="my-header">
      <image class="avatar" :src="avater"></image>
      <view v-if="showlogin" class="my-yh" @click="gologin">
        <text> 去登录 </text>
      </view>
      <view v-else class="my-yh">
        <text> {{ username }} </text>
        <view> 积分:132 </view>
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
            <text> 5积分/次 </text>
          </view>
        </view>
        <view class="footer-button">已签到 </view>
      </view>
      <view class="my-footer">
        <view>
          <view>完整观看视频(限手机)(今日0/10)</view>
          <view class="footer-icon">
            <i class="iconfont">&#xe658;</i>
            <text> 6积分/次 </text>
          </view>
        </view>
        <view class="footer-button">去观看 </view>
      </view>
      <view class="my-footer">
        <view>
          <view>邀请好友注册(累计获得0积分)</view>
          <view class="footer-icon">
            <i class="iconfont">&#xe658;</i>
            <text> 5积分/次 </text>
          </view>
        </view>
        <view class="footer-button">去邀请 </view>
      </view>
      <view class="my-footer">
        <view>
          <view>发布的作品通过审核</view>
          <view class="footer-icon">
            <i class="iconfont">&#xe658;</i>
            <text> 5积分/次 </text>
          </view>
        </view>
        <view class="footer-button" @click="goPainting">去发布 </view>
      </view>
      <view class="my-footer">
        <view>
          <view>关注官方公众号</view>
          <view class="footer-icon">
            <i class="iconfont">&#xe658;</i>
            <text> 每日可免费获取精彩关键词 </text>
          </view>
        </view>
        <view class="footer-button">去关注 </view>
      </view>
    </view>
  </view>
</template>
<script>
import { formatTime } from "@/utils/util";
import { mapState } from "vuex";
export default {
  data() {
    return {
      value: "",
      showlogin: true,
      avater:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Faf588ebb-8bba-4d96-8816-37f8db6b6ab5%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680684862&t=aa98df6f31047e6484e37f4c8c3b7fd7",
    };
  },

  onLoad() {
    this.judgeToken()
  },
  computed: {
    ...mapState(["username"]),
  },
  methods: {
    judgeToken(){
      if (uni.getStorageSync('username')) {
      this.showlogin = false;
    }else{
      this.showlogin = true;
    }
    },
    getDay() {
      return formatTime(new Date());
    },
    gologin() {
      uni.navigateTo({
        url: "/pages/login/index",
      });
    },
    goPersonalSet() {
      uni.navigateTo({
        url: "/pages/my/components/personalSet/index",
      });
    },
    goPainting() {
      uni.switchTab({
        url: "/pages/Painting/index",
      });
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
    padding-bottom: 200rpx;
  }
  .my-footer {
    display: flex;
    // flex-direction: column;
    align-items: center;
    justify-content: space-between;
    font-size: 28rpx;
    margin-bottom: 20rpx;
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
    .footer-button {
      border: 1px solid #f494ee;
      padding: 10rpx 40rpx;
      border-radius: 10rpx;
    }
  }
}
</style>

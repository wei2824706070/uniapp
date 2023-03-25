<template>
  <view class="release">
    <view class="release-header">
      <image class="user-img" :src="imageUrl"></image>
      <text style="text-align: center; font-size: 14px; margin: 10px 0">
        发布到广场，和小伙伴一起分享你的魅力吧!
      </text>
    </view>
    <view class="release-textarea">
      <u--textarea v-model="value1" placeholder="请输入内容"></u--textarea>
    </view>

    <view class="release-button">
      <view class="release-text" @click="goPainting">存为草稿</view>
      <view
        @click="goSquare"
        style="background: #adc2b5; color: #ffffff"
        class="release-text"
        >发布</view
      >
    </view>
  </view>
</template>
<script>
import { getSwiperList } from "../../api/common";
export default {
  data() {
    return {
      value1: "",
      imageUrl: "",
      paintingUrl:'',
    };
  },

  onLoad({ url }) {
    console.log(url);
    this.imageUrl = url;
    this.paintingUrl = url
  },
  methods: {
    goSquare() {
      uni.switchTab({
        url: "/pages/square/index",
      });
    },
    goPainting() {
      uni.switchTab({
        url: `/pages/Painting/index`,
      });
      uni.setStorageSync('pathNum', {url: this.paintingUrl, current: 1})
    },
  },
};
</script>

<style scoped lang="scss">
.release {
  background: #fff;
  margin: 5px;
  .release-button {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-bottom: 50rpx;
    padding-top: 20rpx;
    .release-text {
      text-align: center;
      line-height: 70rpx;
      width: 200rpx;
      height: 70rpx;
      border: 1px solid #bbbbbb;
      border-radius: 5px;
    }
  }
  .release-textarea {
    margin: 20px;
    // width: 100px;
    // height: 50px;
  }
}
.release-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .user-img {
    width: 650rpx;
    height: 580rpx;
    background: #fff;
    border-radius: 5px;
    margin: 20rpx;
  }
}
</style>

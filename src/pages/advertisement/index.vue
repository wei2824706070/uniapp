<template>
  <view class="advertisement">
    <view class="adver-navigator">
      <view @click="goIndex()" class="adver-button" >{{ time }}秒后跳转</view>
    </view>

    <view class="adver-header">
      <view> 广 </view>
      <view> 告 </view>
      <view> 页 </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      time: 5,
      clearInterval:''
    };
  },

  onLoad() {
    this.getTime();
  },
  methods: {
    getTime() {
     this.clearInterval =  setInterval(() => {
        this.time--;
        if (this.time === 0) {
          this.goIndex();
        }
      }, 1000);
    },
    goIndex() {
      uni.switchTab({
        url: "/pages/index/index",
      });
      clearInterval(this.clearInterval)
    },
  },
};
</script>

<style scoped lang="scss">
.advertisement {
  height: 100vh;
  background: #adc2b5;
  .adver-navigator {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .adver-button {
      width: 150rpx;
      height: 50rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #000;
      margin-right: 10rpx;
      background: #fff;
      font-size: 28rpx;
      border-radius: 8rpx;
    }
  }

  .adver-header {
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    font-size: 100rpx;
    color: #fff;
  }
}
</style>

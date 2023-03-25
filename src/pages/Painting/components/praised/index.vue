<template>
  <view class="praised">
    <view v-if="!showPraised" class="praised-empty">
      <i class="iconfont" style="font-size: 200rpx">&#xe86d;</i>
      <view> 这里空空的哦 </view>
    </view>
    <view class="praised-have" v-if="showPraised">
      <view
        class="praised-father"
        v-for="(item, index) in list"
        :key="item"
        @click="goSquDetails(index)"
      >
        <image class="praised-image" :src="item" />
        <view class="praised-footer">
          <u-icon name="thumb-up-fill" color="#f78a8a" size="28"></u-icon>
          <text style="margin-right: 10px"> 28 </text>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { getSwiperList } from "@/api/common";
export default {
  props: ["list"],
  data() {
    return {
      swiperList: [],
      current: 0,
      showPraised: true,
    };
  },

  onLoad() {
    // this.SwiperList();
  },
  methods: {
    async SwiperList() {
      const res = await getSwiperList();

      this.swiperList = res.rows.map((item) => item.picUrl);
    },
    goSquDetails(index) {
      uni.navigateTo({ url: `/pages/squareDetails/index?id=${index}` });
    },
  },
};
</script>

<style scoped lang="scss">
.praised {
  color: #fff;
  display: flex;
  // align-items: center;
  flex-wrap: wrap;
  margin: 100rpx 40rpx 40rpx 40rpx;
  .praised-empty {
    height: 40vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .praised-have {
    width: 100vw;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .praised-father {
      position: relative;
      margin-bottom: 20rpx;
      .praised-footer {
        width: 100%;
        display: flex;
        opacity: 0.5;
        background: #fff;
        color: #000;
        justify-content: flex-end;
        align-items: center;
        position: absolute;
        right: 0;
        bottom: 10rpx;
        border-radius: 10rpx;
      }
      .praised-image {
        width: 300rpx;
        height: 300rpx;
        border-radius: 10rpx;
        border: 1px solid #fff;
      }
    }
  }
}
</style>

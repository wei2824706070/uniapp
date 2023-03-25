<template>
  <view class="draft">
    <view v-if="!showdraft" class="draft-empty">
      <i class="iconfont" style="font-size: 200rpx;">&#xe86d;</i>
      <view> 这里空空的哦 </view>
    </view>
    <view class="draft-have" v-show="showdraft" >
      <view class="draft-father" v-for="item in list" :key="item" @click="goDraftDetails(item)">
        <image class="draft-image" :src="item" />
        <view class="draft-footer">
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
      current: 0,
      showdraft: true,
    };
  },

  onLoad() {

  },
  methods: {
    goDraftDetails(item){
      console.log(111,item);
      const encodedParam = encodeURIComponent(JSON.stringify(item));
      uni.navigateTo({url:`/pages/Painting/draftDetails?item=${encodedParam}`})
    }
    
  },
};
</script>

<style scoped lang="scss">
.draft {
  color: #fff;
  display: flex;
  // align-items: center;
  flex-wrap: wrap;
  margin: 100rpx 40rpx 40rpx 40rpx;
  .draft-empty {
    height: 40vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .draft-have {
    width: 100vw;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .draft-father {
      position: relative;
      margin-bottom: 20rpx;
      .draft-footer {
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
      .draft-image {
        width: 300rpx;
        height: 300rpx;
        border-radius: 10rpx;
        border: 1px solid #fff;
      }
    }
  }
}
</style>

<template>
  <view class="published">
    <view v-if="!showPub" class="published-empty">
      <i class="iconfont" style="font-size: 200rpx;">&#xe86d;</i>
       <view> 这里空空的哦 </view>
    </view>
    <view v-if="showPub"> 已发布 </view>
  </view>
</template>
<script>
import { getSwiperList } from "@/api/common";
import { formatTime } from "@/utils/util";
export default {
  data() {
    return {
      swiperList: [],
      current: 0,
      showPub: false,
    };
  },

  onLoad() {
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.published {
  color: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 100rpx 40rpx 40rpx 40rpx;
  .published-empty{
    height: 40vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>

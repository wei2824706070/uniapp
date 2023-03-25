<template>
  <view class="collect">
    <view v-if="!showCollect" class="collect-empty">
      <i class="iconfont" style="font-size: 200rpx">&#xe86d;</i>
      <view> 这里空空的哦 </view>
    </view>
    <view class="collect-have" v-if="showCollect">
      <view class="collect-father" v-for="(item, index) in list" :key="index" @click="goSquDetails(index)">
        <image class="collect-image" :src="item" />
        <view class="collect-footer">
          <u-icon name="thumb-up-fill" color="#f78a8a" size="28"></u-icon>
          <text style="margin-right: 10px"> 28 </text>
        </view>
      </view>
      <!-- <view class="collect-father">
        <image
          class="collect-image"
          :src="list[5]"
          
        />
        <view class="collect-footer">
          <u-icon name="thumb-up-fill" color="#f78a8a" size="28"></u-icon>
          <text style="margin-right: 10px"> 28 </text>
        </view>
      </view>
      <view class="collect-father">
        <image
          class="collect-image"
          :src="list[5]"
         
        />
        <view class="collect-footer">
          <u-icon name="thumb-up-fill" color="#f78a8a" size="28"></u-icon>
          <text style="margin-right: 10px"> 28 </text>
        </view>
      </view> -->
    </view>
  </view>
</template>
<script>
import { getSwiperList } from "@/api/common";
import { formatTime } from "@/utils/util";
export default {
  props: ["list"],
  data() {
    return {
      swiperList: [
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202105%2F22%2F20210522180650_58b56.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680827736&t=561c2445e0b349750f8e8eadf5dbccff",
        "https://img0.baidu.com/it/u=3982784152,261484059&fm=253&fmt=auto&app=120&f=JPEG?w=640&h=960",
        "https://img1.baidu.com/it/u=3939261620,994813832&fm=253&fmt=auto&app=138&f=JPEG?w=281&h=500",
        "https://img2.baidu.com/it/u=22596906,2629165960&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
        "https://img1.baidu.com/it/u=3454195132,2181778349&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
        "https://img2.baidu.com/it/u=2831675081,2797572499&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
      ],
      current: 0,
      showCollect: true,
    };
  },

  onLoad() {
    // this.SwiperList();
  },
  methods: {
    async SwiperList() {
      const res = await getSwiperList();

      this.swiperList = res.rows.map((item) => item.picUrl);
      // console.log(res.rows);
    },
    goSquDetails(index) {
      uni.navigateTo({ url: `/pages/squareDetails/index?id=${index}` });
    },
  },
};
</script>

<style scoped lang="scss">
.collect {
  // height: 100vh;
  color: #fff;
  display: flex;
  // overflow: auto;
  // align-items: center;
  flex-wrap: wrap;
  margin: 100rpx 40rpx 40rpx 40rpx;
  .collect-empty {
    height: 40vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .collect-have {
    width: 100vw;
    // height: 100vh;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .collect-father {
      position: relative;
      margin-bottom: 10px;
      .collect-footer {
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
      .collect-image {
        width: 300rpx;
        height: 300rpx;
        border-radius: 5px;
        border: 1px solid #fff;
      }
    }
  }
}
</style>

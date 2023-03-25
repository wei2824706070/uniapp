<template>
  <view class="square-father">
    <view>
      <!-- <navigator url="/pages/squareDetails/index"> -->
      <view
        class="square"
        v-for="(item, index) in swiperList"
        :key="index"
        @click="goSquDetails(index)"
      >
        <view class="square-header" @click="goWorks(index)">
          <u-avatar shape="circle" :src="item"></u-avatar>
          <view class="square-text">
            <view> 用户名 </view>
            <view> {{ getDay() }} </view>
          </view>
        </view>
        <view class="square-image">
          <image class="user-img" :src="item"> </image>
          <view class="square-icon">
            <i class="iconfont">&#xec8c;</i>
            <text style="margin-right: 10px"> 28 </text>
            <i class="iconfont">&#xeca1;</i>
            <text> 53 </text>
          </view>
        </view>
      </view>
      <!-- </navigator> -->
    </view>
  </view>
</template>
<script>
import { getSwiperList } from "../../api/common";
import { formatTime } from "@/utils/util";
export default {
  data() {
    return {
      src: "http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg",
      swiperList: [
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F08%2F20200308205439_fiddn.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1681958032&t=79aff755559744cdd92d3a71cd343bc7",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F532574aa-5e8b-4aac-8b2f-28fff47b7747%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1681958646&t=4f715b9b81be2b29fcb413318ac87a9c",
        "https://img1.baidu.com/it/u=3939261620,994813832&fm=253&fmt=auto&app=138&f=JPEG?w=281&h=500",
        "https://img2.baidu.com/it/u=22596906,2629165960&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
        "https://img1.baidu.com/it/u=3454195132,2181778349&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
        "https://img2.baidu.com/it/u=2831675081,2797572499&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
      ],
    };
  },
  onLoad() {
    // this.SwiperList();
  },
  methods: {
    async SwiperList() {
      const res = await getSwiperList();

      this.swiperList = res.rows.map((item) => item.picUrl);
      console.log(res.rows);
    },
    getDay() {
      return formatTime(new Date());
    },
    goSquDetails(index) {
      uni.navigateTo({ url: `/pages/squareDetails/index?id=${index}` });
    },
    goWorks(index) {
      uni.navigateTo({ url: `/pages/works/index?id=${index}` });
    },
  },
};
</script>

<style scoped lang="scss">
.square-father {
  background: #f0f5f2;
}
.square {
  margin: 20rpx;
  padding: 20rpx;
  background: #fff;
  border-radius: 10rpx;
  
  .square-image {
    width: 670rpx;
    height: 600rpx;
    margin-top: 20rpx;
    position: relative;
    .square-icon {
      width: 670rpx;
      height: 80rpx;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      // margin-right: 40rpx;
      opacity: 0.7;
      background: #fff;
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 1;
      padding-right: 32rpx;
      font-size: 28rpx;
      .iconfont {
        color: #f78a8a;
        margin-right: 10rpx;
        font-size: 40rpx;
      }
    }
  }
  .user-img {
    width: 670rpx;
    height: 600rpx;
    border-radius: 10px 10px 0 0;
  }
}
.square-header {
  display: flex;
  align-items: center;
  .square-text {
    margin-left: 5px;
    font-size: 12px;
  }
}
</style>

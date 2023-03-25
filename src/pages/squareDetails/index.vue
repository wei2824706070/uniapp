<template>
  <view class="detail">
    <image class="user-img" :src="swiperList[value]" mode="widthFix"> </image>

    <view class="square-icon">
      <image
        class="avatar"
        :src="swiperList[value]"
        @click="goWorks(value)"
        
      ></image>
      <u-icon color="red" name="heart-fill" size="60rpx"></u-icon>
      <text> 28 </text>
      <u-icon color="red" name="thumb-up-fill" size="60rpx"></u-icon>
      <text> 53 </text>
      <i class="iconfont" style="color: red; font-size: 42rpx">&#xe634;</i>
      <text style="font-size: 28rpx"> 分享 </text>
    </view>
    <view class="detail-footer">
      <view class="detail-yh">
        <text style="margin-right: 10rpx"> 用户名 </text>
        <text> {{ getDay() }} </text>
      </view>
      <text class="detail-text"
        >真的很好看欲一哈哈..@一只小笨猪，快来给我点赞!真的很好看欲一哈哈..@一只小笨猪，快来给我点赞!真的很好看欲一哈哈..@一只小笨猪，快来给我点赞!
      </text>
    </view>
  </view>
</template>
<script>
import { getSwiperList } from "../../api/common";
import { formatTime } from "@/utils/util";
export default {
  data() {
    return {
      swiperList: [
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F08%2F20200308205439_fiddn.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1681958032&t=79aff755559744cdd92d3a71cd343bc7",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F532574aa-5e8b-4aac-8b2f-28fff47b7747%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1681958646&t=4f715b9b81be2b29fcb413318ac87a9c",
        "https://img1.baidu.com/it/u=3939261620,994813832&fm=253&fmt=auto&app=138&f=JPEG?w=281&h=500",
        "https://img2.baidu.com/it/u=22596906,2629165960&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
        "https://img1.baidu.com/it/u=3454195132,2181778349&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
        "https://img2.baidu.com/it/u=2831675081,2797572499&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
      ],
      value: 1,
    };
  },

  onLoad({ id }) {
    // this.SwiperList();
    this.value = id;
  },
  methods: {
    async SwiperList() {
      const res = await getSwiperList();

      this.swiperList = res.rows.map((item) => item.picUrl);
      // console.log(res.rows);
    },
    getDay() {
      return formatTime(new Date());
    },
    goWorks(index) {
      uni.navigateTo({ url: `/pages/works/index?id=${index}` });
    },
  },
};
</script>

<style scoped lang="scss">
.detail {
  background: #000;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;

  position: relative;
  .user-img {
    width: 100%;
    // height: 600rpx;
    margin-top: 200rpx;
  }
  .square-icon {
    position: absolute;
    bottom: calc(32% - 120px);
    right: 30rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20rpx;
    color: #fff;

    .avatar {
      width: 90rpx;
      height: 90rpx;
      border-radius: 50%;
      border: 1px solid #fff;
      margin-bottom: 10rpx;
    }
    text {
      margin: 5rpx 0;
    }
  }
  .detail-footer {
    color: #fff;
    font-size: 30rpx;
    padding-top: 200rpx;
    margin:15rpx;
    .detail-text {
      width: 80%;
      
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
  }
}
</style>

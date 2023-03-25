<template>
  <view class="works">
    <view class="works-header">
      <image class="works-avater" :src="swiperList[value]" />
      <view class="works-text">
        <view class="text-name"> 用户名 </view>
        <view> 来自意见 </view>
      </view>
    </view>
    <view class="works-center">
      <view class="works-production"> 作品 </view>
      <view class="works-father"  >
        <view class="works-details" v-for="(item,index) in swiperList" :key="index" @click="goSquareDetails(index)">
          <image
            class="works-image"
            :src="item"
            mode="aspectFit|aspectFill|widthFix"
          />
          <view class="works-box">
            <text class="works-name"> 作品名字 </text>
            <view class="works-icon">
              <i class="iconfont">&#xeca1;</i>
              <text class="icon-text"> 53 </text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      swiperList: [
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202105%2F22%2F20210522180650_58b56.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680827736&t=561c2445e0b349750f8e8eadf5dbccff",
        "https://img0.baidu.com/it/u=1385173459,2685920901&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
        "https://img1.baidu.com/it/u=3939261620,994813832&fm=253&fmt=auto&app=138&f=JPEG?w=281&h=500",
        "https://img2.baidu.com/it/u=22596906,2629165960&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
        "https://img1.baidu.com/it/u=3454195132,2181778349&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
        "https://img2.baidu.com/it/u=2831675081,2797572499&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
      ],
      value:''
    };
  },
  onLoad({id}) {
    this.value = id 
  },
  methods: {
    goSquareDetails(index){
      uni.navigateTo({url:`/pages/squareDetails/index?id=${index}`})
    }
  },
};
</script>

<style scoped lang="scss">
.works {
  display: flex;
  flex-direction: column;
  font-size: 32rpx;
  .works-header {
    height: 250rpx;
    background: #5d6870;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .works-avater {
      width: 200rpx;
      height: 200rpx;
      border-radius: 50%;
      margin: 40rpx;
    }
    .works-text {
      height: 50%;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .text-name {
        color: #fff;
      }
    }
  }
  .works-center {
    .works-production {
      width: 100vw;
      background: #ffffff;
      height: 100rpx;
      text-align: center;
      line-height: 100rpx;
    }
    .works-father {
      width: 100%;
      height: calc(100vh - 410rpx);
      background: #f5f5f5;
      padding: 20rpx;
      display: flex;
      flex-wrap: wrap;
      overflow: auto;
      .works-details {
        width: 45%;
        height: 400rpx;
        position: relative;
        display: flex;
        margin: 10rpx;
        .works-image {
          width: 100%;
          height: 400rpx;
          border-radius: 10rpx;
        }
        .works-box {
          width: 94%;
          height: 50rpx;
          display: flex;
          position: absolute;
          bottom: 0;
          background: #333233;
          opacity: 0.6;
          color: #fff;
          padding: 5px;
          border-bottom-right-radius: 10rpx;
         border-bottom-left-radius: 10rpx;
          .works-icon {
            flex: 1;
            display: flex;
            justify-content: flex-end;
            align-items: center;
           
            .iconfont {
              color: #fff;
              margin-right: 10rpx;
            }
          }
        }
      }
    }
  }
}
</style>

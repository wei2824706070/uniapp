<template>
  <view class="container">
    <view class="textInfo">
      <text class="infoOne">是时候多次实现你的卡通梦想了。</text>
      <view class="infoTwe">只需将你的照片交给AI就行了</view>
    </view>
    <view class="banner">
      <swiper
        class="preview-footer"
        circular
        :interval="interval"
        :indicator-dots="indicatorDots"
        :autoplay="autoplay"
      >
        <swiper-item
          v-show="swiperList.length > 0"
          v-for="item in swiperList"
          :key="item"
        >
          <view>
            <image class="swiper-item" :src="item" />
          </view>
        </swiper-item>
      </swiper>
    </view>
    <view class="infoThree">
      <text class="custom-style" @click="ChooseImageFace()">选择图片</text>
    </view>
    <!-- <view class="dateBox">
      <text style="font-size: 28rpx">{{ getday() }}更新了新特效</text>
    </view> -->
    <!-- <u-popup
      :show="show"
      mode="bottom"
      @close="close"
      @open="open"
      :safeAreaInsetBottom="false"
    >
      <view class="popup-view">
        <button class="popup-text" @click="ChooseImageFace(1)">我是男生</button>
        <button class="popup-button" @click="ChooseImageFace(0)">我是女生</button>
      </view>
    </u-popup> -->
  </view>
</template>

<script>
import { getSwiperList, getUpload, getPredict } from "@/api/common";
import { formatTime } from "@/utils/util";
export default {
  data() {
    return {
      swiperList: [],
      baseUrl: "",
      indicatorDots: true,
      autoplay: true,
      interval: 2000,
      duration: 500,
      show: false,
    };
  },
  onLoad() {
    this.SwiperList();
  },
  methods: {
    async SwiperList() {
      const res = await getSwiperList();

      this.swiperList = res.rows.map((item) => {
        return "https://ai.changqiu.cc" + item.picUrl;
      });
      // console.log(111,res,this.swiperList);
    },
    getday() {
      return formatTime(new Date());
    },
    // open() {
    //   // console.log('open');
    //   this.show = true;
    // },
    // close() {
    //   this.show = false;
    //   // console.log('close');
    // },
    isTokenExpired(token) {},
    ChooseImageFace() {
      // uni.chooseImage({
      //   count: 1, //选择几张
      //   sizeType: ["compressed"], //可以指定是原图还是压缩图，默认二者都有
      //   sourceType: ["album", "camera"], //从相册选择(也可以拍照)
      //   success: async (res) => {
      //     this.faceSrc = res.tempFiles[0];
      //     console.log(333,res);

      //     // console.log(111, this.baseUrl)
      //     uni.navigateTo({
      //       url: `/pages/preview/index?url=${JSON.stringify(this.faceSrc)}`,
      //     });
      //     // this.show = false;
      //     // this.uploadFace(this.faceSrc);
      //     // console.log(this.baseUrl);
      //   },
      // });

      if (this.$store.state.token) {
          uni.chooseImage({
            count: 1, //默认9
            sizeType: ["original", "compressed"],
            sourceType: ["album", "camera"],
            success: function (res) {
              let imgUrl = res.tempFilePaths[0];
              console.log(imgUrl);
              uni.navigateTo({
                url: `/pages/preview/index?url=${imgUrl}`,
              });
            },
          });
      } else {
        uni.showModal({
          title: "提示",
          content: "您还未登录，请先登录~",
          confirmText: "去登录",
          cancelText: "再逛会",
          success: (res) => {
            if (res.confirm) {
              uni.navigateTo({
                url: "/pages/login/components/Mobile/index",
              });
            }
          },
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.preview-footer {
  width: 550rpx;
  height: 850rpx;
  border-radius: 40rpx;
  .swiper-item {
    width: 550rpx;
    height: 850rpx;
    border-radius: 40rpx;
  }
}

.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: #f0f5f2;

  .banner {
    // margin: 24rpx 0;
    width: 560rpx;
    border-radius: 40rpx;
  }
  .textInfo {
    text-align: center;
    margin-top: 20rpx;
    .infoOne {
      font-size: 32rpx;
      font-weight: bold;
    }
    .infoTwe {
      font-size: 28rpx;
      margin: 20rpx 0;
    }
  }
  .infoThree {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin: 80rpx 0 0 0;
    .custom-style {
      text-align: center;
      width: 300rpx;
      padding: 25rpx 50rpx;
      background-color: #adc2b5;
      color: #fff;
      border-radius: 10rpx;
      font-size: 32rpx;
    }
  }
}
</style>

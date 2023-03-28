<template>
  <view class="preview">
    <view class="preview-swiper">

      <image class="preview-image" :src="largeUrl" mode="aspectFill" />
  
      
      <swiper class="preview-header" :display-multiple-items="itemsIndex">
        <swiper-item v-for="(item, index) in categoryList" :key="index">
          <view class="swiper-item" @click="getTagslist(index)">
            <image
              :src="item.url"
              mode="aspectFill"
              :class="{ active: value === index }"
              style="width: 130rpx; height: 130rpx; border-radius: 10rpx"
            />
            <text>{{ item.name }}</text>
          </view>
        </swiper-item>
      </swiper>
    </view>

    <view class="preview-button">
      <view class="release-button">
        <button class="release-text" @click="ChooseImageFace">更改照片</button>
        <button class="release-text" @click="handledownload">保存到相册</button>
      </view>
      <view class="release-button" style="margin-bottom: 100rpx">
        <button class="release-text" @click="goSquareRelease">
          分享到广场
        </button>

        <button class="release-text" open-type="share" @click="handleShare">
          分享到微信
        </button>
      </view>
    </view>
  </view>
</template>
<script>
import { getTagsCategory, getPredict } from "@/api/common";
// import { v4 as uuidv4 } from 'uuid';
export default {
  data() {
    return {
      categoryList: [],
      tagsList: [],
      alreadyList: [],
      itemsIndex: "",
      currentIndex: "",
      largeUrl:
        "https://hbimg.b0.upaiyun.com/bd295b738c9cf801d4e88b419a91355087850a4f76f9-25Zauq_fw658",
      algoType: "",
      value: 0,
      current: 0,
      nextCurrent: 0,
      baseUrl: "",
      releaseUrl: "",
      loadingImage: false,
      baseShow: false,
    };
  },

  async onLoad({ url }) {
    this.baseUrl = url;
    console.log(444, this.baseUrl);
    this.getTagsCategory();
    wx.showShareMenu({
      withShareTicket: true,
      //设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
      menus: ["shareAppMessage", "shareTimeline"],
    });
  },
  methods: {
    async getTagslist(index = 0) {
      this.value = index;
      this.algoType = this.categoryList[index].label;
      const already = this.alreadyList.filter((item) => {
        return item.value == this.value;
      });

      console.log(222, already);
      if (already.length > 0) {
        this.largeUrl = already[0].url;
        return;
      }
      this.largeUrl =
        "https://hbimg.b0.upaiyun.com/bd295b738c9cf801d4e88b419a91355087850a4f76f9-25Zauq_fw658";

      // if (!this.baseShow) {
      //   this.baseUrl = await pathToBase64(this.baseUrl);
      // }
      // this.baseShow = true;

      uni.uploadFile({
        url: "/home/pic/generate",
        filePath: this.baseUrl,
        name: "file",
        formData: {
          algoType: this.algoType,
        },
        success: async (uploadFileRes) => {
          let res = JSON.parse(uploadFileRes.data);
          console.log(11122, res, uploadFileRes);
          if (res.code == 200) {
            this.largeUrl = "https://ai.changqiu.cc" + res.data.image;
            const obj = { value: this.value, url: this.largeUrl };
            this.alreadyList.push(obj);
            console.log(111, obj, this.alreadyList);
          } else if (res.code == 401) {
            this.$store.commit("longout");
            uni.showToast({
              title: "token过期,请重新登录",
              icon: "none",
              duration: 2000,
            });
            setTimeout(() => {
              uni.navigateTo({
                url: "/pages/login/components/Mobile/index",
              });
            }, 1200);
          } else {
            uni.showToast({
              title: "图像中没找到人脸,请重新选择图片",
              icon: "none",
              duration: 4000,
            });
            setTimeout(() => {
              this.ChooseImageFace();
            }, 1500);
          }
        },
      });
    },
    async getTagsCategory() {
      const res = await getTagsCategory();
      this.categoryList = res.data.map((item, index) => {
        let list = ["日漫风", "3D特效", "手绘风", "铅笔画", "艺术特效"];
        item.url = "https://ai.changqiu.cc" + item.url;
        item.name = list[index];
        return item;
      });
      console.log(111, res, this.categoryList);
      this.algoType = this.categoryList[0].label;
      if (this.categoryList.length > 5) {
        this.itemsIndex = 5;
      } else {
        this.itemsIndex = this.categoryList.length;
      }
      if (res.code == 200) {
        this.getTagslist();
      }
    },

    ChooseImageFace() {
      uni.chooseImage({
        count: 1, //选择几张
        sizeType: ["compressed"], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], //从相册选择（也可以拍照
        success: async (res) => {
          this.faceSrc = res.tempFilePaths[0];
          console.log(111, this.faceSrc);
          this.baseUrl = this.faceSrc;
          this.alreadyList = [];
          await this.getTagslist();
        },
      });
    },
    handledownload() {
      const that = this;
      uni.downloadFile({
        url: this.largeUrl,
        success: (res) => {
          if (res.statusCode === 200) {
            uni.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function () {
                uni.showToast({
                  title: "保存成功",
                  duration: 2000,
                });
              },
              fail: function () {
                uni.showToast({
                  title: "保存失败",
                  duration: 2000,
                });
              },
            });
          } else {
            uni.showToast({
              title: "保存失败",
              duration: 2000,
            });
          }
        },
      });
    },
    handleShare() {
      uni.share({
        provider: "weixin",
        scene: "WXSceneSession", // 分享到微信好友
        type: 2,
        imageUrl: this.largeUrl,
        success: function () {},
        fail: function () {},
      });
      // uni.showShareMenu({
      //   withShareTicket: true,
      //   success: function (res) {
      //     console.log("显示分享菜单成功");
      //   },
      //   fail: function (res) {
      //     console.log("显示分享菜单失败");
      //   },
      // });
    },
    goSquareRelease() {
      uni.navigateTo({
        url: `/pages/squareRelease/index?url=${this.largeUrl}`,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.preview {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  margin: 5px;
  border-radius: 5px;
  // align-items: center;
  .preview-swiper {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  .u-demo-block {
    width: 100rpx;
    height: 100rpx;
  }
  .preview-image {
    width: 650rpx;
    // height: 600rpx;
    border-radius: 5px;
    padding: 70rpx 0;
  }
  .preview-header {
    width: 100%;
    height: 200rpx;
    text-align: center;
    margin-bottom: 50rpx;
  }
  .preview-footer {
    width: 450rpx;
    height: 130rpx;

    position: absolute;
    bottom: 0;
  }
  .preview-button {
    display: flex;
    flex-direction: column;
    // align-items: center;
    justify-content: space-around;
    .release-button {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      margin-bottom: 50rpx;
      .release-text {
        text-align: center;
        line-height: 75rpx;
        width: 230rpx;
        height: 75rpx;
        border: 0;
        border-radius: 10rpx;
        font-size: 30rpx;
        background: #adc2b5;
        color: #ffffff;
      }
    }
  }
}

.swiper-item {
  transform: scale(0.8);
}
.active {
  border: 2px solid rgba(58, 162, 255, 1);
}
</style>

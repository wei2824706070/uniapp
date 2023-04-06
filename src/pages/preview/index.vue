<template>
  <view class="preview">
    <view class="preview-swiper">
      <image
        v-if="!showHeight"
        :src="largeUrl"
        mode="widthFix"
        :class="{ active: value === index }"
        style="width: 650rpx; padding: 70rpx 0; border-radius: 10rpx"
        lazy-load
        :show-menu-by-longpress="true"
        @load="loadImage"
      />
      <image 
        v-else
        :src="largeUrl"
        mode="heightFix"
        :class="{ active: value === index }"
        style="height: 60vh; padding: 50rpx 0; border-radius: 10rpx"
        lazy-load
        :show-menu-by-longpress="true"
        @load="loadImage"
      />
      <swiper class="preview-header" :display-multiple-items="itemsIndex">
        <swiper-item v-for="(item, index) in categoryList" :key="index">
          <view class="swiper-item" @click="getTagslist(index)">
            <image
              :src="item.url"
              mode="aspectFill"
              :class="{ active: value === index }"
              style="width: 130rpx; height: 130rpx; border-radius: 10rpx"
            />

            <text class="swiper-text">{{ item.name }}</text>
          </view>
        </swiper-item>
      </swiper>
    </view>

    <view class="preview-button">
      <view class="release-button">
        <button class="release-text" @click="ChooseImageFace">更改照片</button>
        <button class="release-text" @click="handledownload">保存到相册</button>
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
      largeUrl: "",
      imageUrl: "",
      algoType: "",
      value: 0,
      current: 0,
      nextCurrent: 0,
      baseUrl: "",
      releaseUrl: "",
      loadingImage: false,
      baseShow: false,
      showHeight: false,
      changeHeight: false,
      loading: false,
    };
  },

  async onLoad({ url }) {
    this.baseUrl = url;
    this.getTagsCategory();
  },
  methods: {
    loadImage(e) {
      // console.log(e);
      if (e.detail.height < 900) {
        this.showHeight = false;
      } else {
        this.showHeight = true;
      }
      uni.hideLoading();
    },
    async getTagslist(index = 0) {
      this.value = index;
      this.algoType = this.categoryList[index].label;
      const already = this.alreadyList.filter((item) => {
        return item.value == this.value;
      });

      // console.log(222, already);
      if (already.length > 0) {
        this.largeUrl = already[0].url;
        return;
      }
      uni.showLoading({
        title: "加载中...",
      });
      uni.uploadFile({
        url: "/home/pic/generate",
        filePath: this.baseUrl,
        name: "file",
        formData: {
          algoType: this.algoType,
        },
        success: async (uploadFileRes) => {
          let res = JSON.parse(uploadFileRes.data);
          // console.log(11122, res, uploadFileRes);
          if (res.code == 200) {
            this.largeUrl = "https://ai.changqiu.cc" + res.data.image;
            this.loading = false;
            const obj = { value: this.value, url: this.largeUrl };
            this.alreadyList.push(obj);
            // console.log(111, obj, this.alreadyList);
          } else if (res.code == 401) {
            this.$store.commit("longout");
            uni.showToast({
              title: "token过期,请重新登录",
              icon: "none",
              duration: 2000,
            });
            setTimeout(() => {
              uni.navigateTo({
                url: "/pages/login/index",
              });
            }, 1200);
          } else if (res.code == 500) {
            if (res.msg == "积分不足") {
              uni.hideLoading();
              setTimeout(() => {
                uni.showToast({
                title: res.msg,
                icon: "none",
                duration: 4000,
              });
              }, 100);
            } else {
              uni.hideLoading();
              setTimeout(() => {
                uni.showToast({
                  title: "图像中没找到人脸,请重新选择",
                  icon: "none",
                  duration: 4000,
                });
              }, 100);

              setTimeout(() => {
                this.ChooseImageFace();
              }, 1500);
            }
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
      // console.log(111, res, this.categoryList);
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
          // console.log(111, this.faceSrc);
          this.baseUrl = this.faceSrc;
          this.alreadyList = [];
          this.largeUrl = "";
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
  },
};
</script>

<style scoped lang="scss">
.preview {
  height: 95vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  margin: 5px;
  border-radius: 5px;
  // align-items: center;
  .preview-swiper {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .u-image {
      text-align: center;
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
      margin-bottom: 20rpx;
      .swiper-text{
        font-size: 4vw;
      }
    }
  }
  .u-demo-block {
    width: 100rpx;
    height: 100rpx;
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
        line-height: 90rpx;
        width: 300rpx;
        height: 90rpx;
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

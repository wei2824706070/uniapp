<template>
  <view class="preview">
    <view class="preview-swiper">
      <image class="preview-image" :src="largeUrl" />
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
        <view class="release-text" @click="ChooseImageFace">更改照片</view>
        <view class="release-text" @click="handledownload">保存到相册</view>
      </view>
      <view class="release-button" style="margin-bottom: 100rpx">
        <view class="release-text" @click="goSquareRelease">分享到广场</view>

        <view class="release-text" @click="handleShare">分享到微信</view>
      </view>
    </view>
  </view>
</template>
<script>
import { getTagsCategory, getPredict } from "@/api/common";
// import { v4 as uuidv4 } from 'uuid';
import { pathToBase64, base64ToPath } from "image-tools";
// import uni from '@dcloudio/uni-h5'
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
      list: [
        "task(q7igfy4z2p2o7ti)",
        0,
        "{masterpiece},{best quality},{1girl},Amazing,beautiful detailed eyes,finely detail,Depth of field,extremely detailed CG,original, extremely detailed wallpaper,loli,white_hair,magic_circle,cat_ears,long_hair,white_hair/yellow_eyes,wand,pentagram,clock, {masterpiece},{best quality},{1girl},Amazing,beautiful detailed eyes,finely detail,Depth of field,extremely detailed CG,original, extremely detailed wallpaper,loli, white_hair",
        "nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry",
        [],
        "",
        null,
        null,
        null,
        null,
        null,
        null,
        20,
        "Euler a",
        4,
        0,
        "original",
        false,
        false,
        1,
        1,
        5.5,
        1.5,
        0.4,
        1359493062,
        -1,
        0,
        0,
        0,
        false,
        512,
        512,
        "Resize and fill",
        "Whole picture",
        32,
        "Inpaint masked",
        "",
        "",
        "",
        [],
        "None",
        "<ul>\n<li><code>CFG Scale</code> should be 2 or lower.</li>\n</ul>\n",
        true,
        true,
        "",
        "",
        true,
        50,
        true,
        1,
        0,
        false,
        4,
        1,
        "None",
        '<p style="margin-bottom:0.75em">Recommended settings: Sampling Steps: 80-100, Sampler: Euler a, Denoising strength: 0.8</p>',
        128,
        8,
        ["left", "right", "up", "down"],
        1,
        0.05,
        128,
        4,
        "fill",
        ["left", "right", "up", "down"],
        false,
        false,
        "positive",
        "comma",
        0,
        false,
        false,
        "",
        '<p style="margin-bottom:0.75em">Will upscale the image by the selected scale factor; use width and height sliders to set tile size</p>',
        64,
        "None",
        2,
        "Seed",
        "",
        "Nothing",
        "",
        "Nothing",
        "",
        true,
        false,
        false,
        false,
        0,
        [
          {
            name: "D:\\Sisters\\Nas\\stable-diffusion-webui\\outputs\\img2img-images\\2023-03-13\\00004-1359493062.png",
            data: "file=D:\\Sisters\\Nas\\stable-diffusion-webui\\outputs\\img2img-images\\2023-03-13\\00004-1359493062.png",
            is_file: true,
          },
        ],
        '{"prompt": "((masterpiece)),\\u00a0(((best\\u00a0quality))),\\u00a0((ultra-detailed)),\\u00a0((illustration)),\\u00a0((disheveled\\u00a0hair)),\\u00a0((frills)),\\u00a0(1\\u00a0girl),\\u00a0(solo),\\u00a0dynamic\\u00a0angle,\\u00a0big\\u00a0top\\u00a0sleeves,\\u00a0floating,\\u00a0beautiful\\u00a0detailed\\u00a0sky,\\u00a0on\\u00a0beautiful\\u00a0detailed\\u00a0water,\\u00a0beautiful\\u00a0detailed\\u00a0eyes,\\u00a0overexposure,\\u00a0(fist),\\u00a0expressionless,\\u00a0side\\u00a0blunt\\u00a0bangs,\\u00a0hairs\\u00a0between\\u00a0eyes,\\u00a0ribbons,\\u00a0bowties,\\u00a0buttons,\\u00a0bare\\u00a0shoulders,\\u00a0(((small\\u00a0breast))),\\u00a0detailed\\u00a0wet\\u00a0clothes,\\u00a0blank\\u00a0stare,\\u00a0pleated\\u00a0skirt,\\u00a0flowers\\u0005", "all_prompts": ["((masterpiece)),\\u00a0(((best\\u00a0quality))),\\u00a0((ultra-detailed)),\\u00a0((illustration)),\\u00a0((disheveled\\u00a0hair)),\\u00a0((frills)),\\u00a0(1\\u00a0girl),\\u00a0(solo),\\u00a0dynamic\\u00a0angle,\\u00a0big\\u00a0top\\u00a0sleeves,\\u00a0floating,\\u00a0beautiful\\u00a0detailed\\u00a0sky,\\u00a0on\\u00a0beautiful\\u00a0detailed\\u00a0water,\\u00a0beautiful\\u00a0detailed\\u00a0eyes,\\u00a0overexposure,\\u00a0(fist),\\u00a0expressionless,\\u00a0side\\u00a0blunt\\u00a0bangs,\\u00a0hairs\\u00a0between\\u00a0eyes,\\u00a0ribbons,\\u00a0bowties,\\u00a0buttons,\\u00a0bare\\u00a0shoulders,\\u00a0(((small\\u00a0breast))),\\u00a0detailed\\u00a0wet\\u00a0clothes,\\u00a0blank\\u00a0stare,\\u00a0pleated\\u00a0skirt,\\u00a0flowers\\u0005"], "negative_prompt": "nsfw,\\u00a0owres,\\u00a0bad\\u00a0anatomy,\\u00a0bad\\u00a0hands,\\u00a0text,\\u00a0error,\\u00a0missing\\u00a0fingers,\\u00a0extra\\u00a0digit,\\u00a0fewer\\u00a0digits,\\u00a0cropped,\\u00a0worst\\u00a0quality,\\u00a0low\\u00a0quality,\\u00a0normal\\u00a0quality,\\u00a0jpeg\\u00a0artifacts,\\u00a0signature,\\u00a0watermark,\\u00a0username,\\u00a0blurry,missing\\u00a0fingers,bad\\u00a0hands,missing\\u00a0arms,\\u00a0long\\u00a0neck,\\u00a0Humpbacked\\u00a0", "all_negative_prompts": ["nsfw,\\u00a0owres,\\u00a0bad\\u00a0anatomy,\\u00a0bad\\u00a0hands,\\u00a0text,\\u00a0error,\\u00a0missing\\u00a0fingers,\\u00a0extra\\u00a0digit,\\u00a0fewer\\u00a0digits,\\u00a0cropped,\\u00a0worst\\u00a0quality,\\u00a0low\\u00a0quality,\\u00a0normal\\u00a0quality,\\u00a0jpeg\\u00a0artifacts,\\u00a0signature,\\u00a0watermark,\\u00a0username,\\u00a0blurry,missing\\u00a0fingers,bad\\u00a0hands,missing\\u00a0arms,\\u00a0long\\u00a0neck,\\u00a0Humpbacked\\u00a0"], "seed": 1359493062, "all_seeds": [1359493062], "subseed": 1498692146, "all_subseeds": [1498692146], "subseed_strength": 0, "width": 512, "height": 512, "sampler_name": "Euler a", "cfg_scale": 5.5, "steps": 20, "batch_size": 1, "restore_faces": false, "face_restoration_model": null, "sd_model_hash": "a7529df023", "seed_resize_from_w": 0, "seed_resize_from_h": 0, "denoising_strength": 0.4, "extra_generation_params": {"Mask blur": 4}, "index_of_first_image": 0, "infotexts": ["((masterpiece)),\\u00a0(((best\\u00a0quality))),\\u00a0((ultra-detailed)),\\u00a0((illustration)),\\u00a0((disheveled\\u00a0hair)),\\u00a0((frills)),\\u00a0(1\\u00a0girl),\\u00a0(solo),\\u00a0dynamic\\u00a0angle,\\u00a0big\\u00a0top\\u00a0sleeves,\\u00a0floating,\\u00a0beautiful\\u00a0detailed\\u00a0sky,\\u00a0on\\u00a0beautiful\\u00a0detailed\\u00a0water,\\u00a0beautiful\\u00a0detailed\\u00a0eyes,\\u00a0overexposure,\\u00a0(fist),\\u00a0expressionless,\\u00a0side\\u00a0blunt\\u00a0bangs,\\u00a0hairs\\u00a0between\\u00a0eyes,\\u00a0ribbons,\\u00a0bowties,\\u00a0buttons,\\u00a0bare\\u00a0shoulders,\\u00a0(((small\\u00a0breast))),\\u00a0detailed\\u00a0wet\\u00a0clothes,\\u00a0blank\\u00a0stare,\\u00a0pleated\\u00a0skirt,\\u00a0flowers\\u0005\\nNegative prompt: nsfw,\\u00a0owres,\\u00a0bad\\u00a0anatomy,\\u00a0bad\\u00a0hands,\\u00a0text,\\u00a0error,\\u00a0missing\\u00a0fingers,\\u00a0extra\\u00a0digit,\\u00a0fewer\\u00a0digits,\\u00a0cropped,\\u00a0worst\\u00a0quality,\\u00a0low\\u00a0quality,\\u00a0normal\\u00a0quality,\\u00a0jpeg\\u00a0artifacts,\\u00a0signature,\\u00a0watermark,\\u00a0username,\\u00a0blurry,missing\\u00a0fingers,bad\\u00a0hands,missing\\u00a0arms,\\u00a0long\\u00a0neck,\\u00a0Humpbacked\\u00a0\\nSteps: 20, Sampler: Euler a, CFG scale: 5.5, Seed: 1359493062, Size: 512x512, Model hash: a7529df023, Model: final-pruned, Denoising strength: 0.4, Mask blur: 4"], "styles": [], "job_timestamp": "20230313153102", "clip_skip": 1, "is_using_inpainting_conditioning": false}',
        "<p>((masterpiece)), (((best quality))), ((ultra-detailed)), ((illustration)), ((disheveled hair)), ((frills)), (1 girl), (solo), dynamic angle, big top sleeves, floating, beautiful detailed sky, on beautiful detailed water, beautiful detailed eyes, overexposure, (fist), expressionless, side blunt bangs, hairs between eyes, ribbons, bowties, buttons, bare shoulders, (((small breast))), detailed wet clothes, blank stare, pleated skirt, flowers\u0005<br>\nNegative prompt: nsfw, owres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry,missing fingers,bad hands,missing arms, long neck, Humpbacked <br>\nSteps: 20, Sampler: Euler a, CFG scale: 5.5, Seed: 1359493062, Size: 512x512, Model hash: a7529df023, Model: final-pruned, Denoising strength: 0.4, Mask blur: 4</p>",
        "<p></p><div class='performance'><p class='time'>Time taken: <wbr>9.83s</p><p class='vram'>Torch active/reserved: 2617/3184 MiB, <wbr>Sys VRAM: 6139/6144 MiB (99.92%)</p></div>",
      ],
    };
  },

  async onLoad({ url }) {
    this.baseUrl = url;
    console.log(444, this.baseUrl);
    this.getTagsCategory();
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
        url: "/home/pic/generate", //仅为示例，非真实的接口地址
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
      this.categoryList = res.data.map((item,index) => {
        let list = ['日漫风','3D特效','手绘风','铅笔画','艺术特效']
        item.url = "https://ai.changqiu.cc" + item.url;
        item.name = list[index]
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
        type: 0,
        imageUrl: this.largeUrl,
        success: function () {
          console.log("分享成功");
          uni.showToast({
            title: "分享成功",
            duration: 2000,
          });
        },
        fail: function () {
          uni.showToast({
            title: "分享失败",
            duration: 2000,
          });
          console.log("分享失败");
        },
      });
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
    height: 600rpx;
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
      //  align-items: center;
      justify-content: space-around;
      margin-bottom: 50rpx;
      .release-text {
        text-align: center;
        line-height: 75rpx;
        width: 200rpx;
        height: 75rpx;
        border: 1px solid #bbbbbb;

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

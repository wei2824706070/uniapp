<template>
  <view class="draftDetails">
    <image class="user-img" :src="imageUrl" > </image>
    <view class="del-iconfont" @click="delImage">
      <i class="iconfont" style="color: #fff; font-size: 42rpx;margin-right: 10rpx;">&#xe6a0;</i>
      <text> 删除 </text>
    </view>
  </view>
</template>
<script>
import { getSwiperList } from "@/api/common";
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
      imageUrl: '',
    };
  },

  onLoad({ item }) {
    // this.SwiperList();

    this.imageUrl = JSON.parse(decodeURIComponent(item));;
  },
  methods: {
    async SwiperList() {
      const res = await getSwiperList();
      this.swiperList = res.rows.map((item) => item.picUrl);
      // console.log(res.rows);
    },
    delImage(){
      uni.navigateBack();
    }
  },
};
</script>

<style scoped lang="scss">
.draftDetails {
  background: #000;
  height: 100vh;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  // justify-content: space-around;
  position: relative;
  .user-img {
    width: 100%;
    height: 800rpx;
  }
 .del-iconfont{
  color: #fff;
  display: flex;
  margin: 30rpx;
 }
}
</style>

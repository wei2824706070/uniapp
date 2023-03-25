<template>
  <view class="painting">
    <view class="painting-header">
      <u-tabs
        :list="list"
        lineWidth="50"
        :is-scroll="false"
        lineColor="#5acaf2"
        @change="changeTabs"
        :current="current"
        :activeStyle="{
          color: '#f07df7',
          fontWeight: 'bold',
          transform: 'scale(1.05)',
        }"
        :inactiveStyle="{
          color: '#fff',
          transform: 'scale(1)',
        }"
        itemStyle="padding-left: 15px; padding-right: 15px; height: 45px;"
      >
      </u-tabs>
    </view>

    <view v-if="current == 0"> <Published :list="swiperList" /> </view>
    <view v-if="current == 1">
      <Draft :list="draftList" />
    </view>
    <view v-if="current == 2"> <Praised :list="swiperList" /> </view>
    <view class="collect" v-if="current == 3">
      <Collect :list="swiperList" />
    </view>
  </view>
</template>
<script>
import { getSwiperList } from "@/api/common";
import Published from "./components/published/index";
import Collect from "./components/collect/index.vue";
import Praised from "./components/praised/index.vue";
import Draft from "./components/draft/index.vue";

export default {
  components: {
    Published,
    Collect,
    Praised,
    Draft,
  },
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
      current: 0,
      list: [
        {
          name: "已发布",
        },
        {
          name: "草稿",
        },
        {
          name: "赞过",
        },
        {
          name: "收藏",
        },
      ],
      imageUrl: "",
      draftList: [
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202105%2F22%2F20210522180650_58b56.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680827736&t=561c2445e0b349750f8e8eadf5dbccff",
        "https://img0.baidu.com/it/u=3982784152,261484059&fm=253&fmt=auto&app=120&f=JPEG?w=640&h=960",
        "https://img1.baidu.com/it/u=3939261620,994813832&fm=253&fmt=auto&app=138&f=JPEG?w=281&h=500",
      ],
    };
  },

  onLoad() {
    this.getDraftList();
  },
  methods: {
    async SwiperList() {
      const res = await getSwiperList();

      this.swiperList = res.rows.map((item) => item.picUrl);
      // console.log(res.rows);
    },
    changeTabs(index) {
      // console.log(index);
      this.current = index.index;
    },
    getDraftList() {
      const res = uni.getStorageSync("pathNum");
      console.log(111, res);
      if(res){
      this.current = res.current;
      this.imageUrl = res.url;
      this.draftList.unshift(this.imageUrl);
      }
     
    },
  },
};
</script>

<style scoped lang="scss">
.painting {
  height: 100vh;
  background: #000;
  overflow: auto;
  font-size: 28rpx;
  // display: flex;
  // align-items: center;
  // flex-direction: column;
  // justify-content: center;
}
.painting-header {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  background: #000;
}
</style>

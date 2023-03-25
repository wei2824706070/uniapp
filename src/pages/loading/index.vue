<template>
  <view class="advertisement">
    <image class="advertisement-image" :src="img"/>
      
    <!-- <view class="adver-header">
      <view> 加 </view>
      <view> 载 </view>
      <view> 中 </view>
    </view> -->
  </view>
</template>
<script>
export default {
  data() {
    return {
     img:'https://img.zcool.cn/community/01b0e958dc7095a801219c77b3186a.gif'
    };
  },

  onLoad({index,url}) {
    // console.log(url);
    setTimeout(() =>{
      uni.navigateTo({ url:`/pages/preview/index?index=${index}&url=${url}` });
    },1300)
  },
  methods: {
  },
};
</script>

<style scoped lang="scss">
.advertisement {
  height: 100vh;
  background: #ffffff;
  .advertisement-image{
    width: 100%;
    height: 100%;
  }
  .adver-header {
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    font-size: 100rpx;
    color: #fff;
  }
}
</style>

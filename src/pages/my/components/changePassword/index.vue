<template>
  <view class="changePassword">
    <text> 修改密码 </text>
    <view class="changePassword-input">
      <view class="changePassword-code">
        <input type="text" placeholder="验证码" />
        <text> 获取验证码 </text>
      </view>
      <input class="change-input" type="text" placeholder="密码" />
      <input class="change-input" type="text" placeholder="确认密码" />
    </view>

    <view>
      <button class="changePassword-text">修改密码</button>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {};
  },
  onLoad() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.changePassword {
  width: 100vw;
  height: 50vh;
  display: flex;
  flex-direction: column; 
  justify-content: space-around;
  align-items: center;
  font-size: 32rpx;
  .changePassword-input {
    width: 90vw;
    .changePassword-code {
      display: flex;
      justify-content: space-between;
      height: 80rpx;
      border-bottom: 1px solid #e6e6e6;
      color:#fb5ee5 ;
    }
    .change-input {
      height: 100rpx;
      border-bottom: 1px solid #e6e6e6;
    }
  }
  .changePassword-text {
    width: 500rpx;
    color: #fff;
    background-color: #7c9ff6;
  }
}
</style>

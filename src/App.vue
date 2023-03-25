<script>

export default {
  onLaunch: function () {
    console.log("App Launch");
    // #ifdef APP-PLUS
    // token标志来判断
    // let token = store.state.token
    // if (token) {
    //   //存在则关闭启动页进入首页
    //   plus.navigator.closeSplashscreen();
    // } else {
    //   //不存在则跳转至登录页
    //   uni.reLaunch({
    //     url: "/pages/login/components/Mobile/index",
    //     success: () => {
    //       plus.navigator.closeSplashscreen();
    //     },
    //   });
    // }
    // #endif
  },

  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
/*每个页面公共css */
@import "uview-ui/index.scss";
@import "@/static/icon/iconfont.css";
page {
  background-color: #f0f5f2;
}
</style>

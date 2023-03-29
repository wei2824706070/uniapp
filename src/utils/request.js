//import { fail } from 'assert/strict';
import { HEADER, TOKENNAME, HTTP_REQUEST_URL } from './../../config.js'
import store from '@/store/index.js';
// export default function request(api, method, data, {noAuth= false, noVerify=false}){
//   let Url = HTTP_REQUEST_URL, 
//   header =HEADER;
//   //登录过期自动登录

//   //request 头部设置
//   // if(getApp().globalData.token) header[TOKENNAME] = getApp().globalData.token;

//   return new Promise((reslove, reject)=>{
//     uni.request({
//       url: Url + api,
//       method:method||'GET',
//       header:header,
//       data: data||{},
//       success:(res)=>{
//         if(noVerify)
//           reslove(res.data, res);
//         else if(res.data.code == 200){
//           //成功处理
//           reslove(res.data, res);
//         }else{
//           reject(res.data.msg ||'系统错误')
//         }
//       },
//       fail:(msg)=>{
//         reject('请求失败');
//       }
//     })
//   })
// }

// ['options', 'get', 'post', 'put', 'head', 'delete'].forEach((method)=>{
//   request[method] = (api, data, opt) => request(api, method, data, opt||{})
// })
const baseURL = HTTP_REQUEST_URL
const request = {
  // 发送前
  invoke(args) {
    // 清除延时器
    // clearTimeout(timeId);
    // timeId = setTimeout(() => {
    //   uni.showLoading({ title: "加载中" }); // 显示加载中
    // }, 800);

    // startsWith  是一个字符串方法   判断当前的字符串 是不是以 xxx开头
    if (!args.url.startsWith("http")) {
      // 不是的话  才去拼接 基地址
      args.url = baseURL + args.url;
    }
    // 请求头
    // args.header = { ...args.header, HEADER }
    args.header = { ...args.header }

    if (store.state.token) {
      args.header.Authorization = `Bearer ${store.state.token}`
    }
  },

};
uni.addInterceptor("request", request); // 拦截发送请求
uni.addInterceptor("uploadFile", request); // 拦截上传文件
// 自己针对 uni.request 再次做了的封装
export default (options) => {
  return new Promise((resolve, reject) => {
    // 封装自己的发送请求的代码 底层 还是使用 uni.request => 继续使用刚刚封装好的拦截器
    uni.request({
      ...options,
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 成功  resolve 把请求后的参数 返回
          if (typeof res.data === 'string') {
            let response = JSON.parse(res.data)
            console.log(3232, response);
            if (response.code === 401) {
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
              }, 2000);
            }
          }


          resolve(res.data);
        } else {
          reject(res);
        }
      },
      fail(err) {
        // 失败
        reject(err);
      },
    });
  });
};
// export default function request(options) {
//   return new Promise((resolve, reject) => {
//     uni.request({
//       url: baseURL + options.url,
//       data: options.data || {},
//       method: options.method || 'GET',
//       header: HEADER,
//       success: (res) => {
//         uni.hideLoading()
//        if (res.statusCode >= 200 && res.statusCode < 300) {
//           resolve(res.data)
//         } else {
//           uni.showToast({
//             title: '请求错误',
//             icon: 'none'
//           })
//           reject(res)
//         }
//       },
//       fail: (err) => {
//         uni.hideLoading()
//         uni.showToast({
//           title: '网络错误',
//           icon: 'none'
//         })
//         reject(err)
//       }
//     })
//   })
// }
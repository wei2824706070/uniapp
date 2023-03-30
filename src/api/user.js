import request from "../utils/request";
// 获取验证码
export const getCaptchaImage = () => {
  return request({
    url:  '/captchaImage',
    method: 'get'
  })
}
// 注册
export const getRegister = (data) => {
  return request({
    url:  '/register',
    method: 'post',
    data
  })
}

// 登录
export const Login = (data) => {
  return request({
    url:  '/login',
    method: 'post',
    data
  })
}
// 登出
export const getLogout = (data) => {
  return request({
    url:  '/logout',
    method: 'post',
    data
  })
}
export const wxLogin = (data) => {
  return request({
    url:  '/system/user/wxLogin',
    method: 'post',
    data
  })
}
export const getWxUserInfo = () => {
  return request({
    url:  '/system/user/getWxUserInfo',
    method: 'get',
  })
}
export const getSignIn = () => {
  return request({
    url:  '/system/user/signIn',
    method: 'get',
  })
}
export const getWxOauth2Login = (data) => {
  return request({
    url:  '/system/user/wxOauth2Login',
    method: 'post',
    data
  })
}
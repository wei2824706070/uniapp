import request from "../utils/request";
// 获得首页轮播
export const getSwiperList = () => {
  return request({
    url:   '/home/pic/list',
    method: 'get'
  })
}
// 获得标签分类
export const getTagsCategory = (data) => {
  return request({
    url:   '/home/pic/getTagsCategory',
    method: 'get',
    data
  })
}
// 获得标签
export const getTags = (data) => {
  return request({
    url:   '/home/pic/getTags',
    method: 'get',
    data
  })
}
// 图生图
export const getPredict = (data) => {
  return request({
    url: '/home/pic/generate',
    method: 'POST',
    data,
  })
}
// 上传图片
export const getUpload = (data) => {
  return request({
    url:   '/common/upload',
    method: 'POST',
    data,
  })
}

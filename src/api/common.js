/*
 * @Author: wangshengxian
 * @Date: 2020-08-26 14:17:36
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-15 13:49:50
 * @Desc: 公共请求api, 例如导出excel, 上传图片/视频
 */
import request from '@/utils/request'
import Qs from 'qs'
import tools from '@/utils/tools'

// serverUrl
const baseUrl = process.env.VUE_APP_SERVER_URL

/**
 * 导出excel地址url集合
 */
const Excel = {
  // 主播
  anchor: '/lms/guildAnchor/excel'
}

/**
 * 方法一：导出excel，全局通用 (注意后台接口不要验证 key )
 * @param {string} type 导出excel的类别
 * @param {object} data 参数对象
 * @param {string} method 请求方式，默认 post
 */
export function exportExcel(type, params, method = 'post') {
  let url = `${baseUrl}${Excel[type]}`
  console.log('-url-', url)
  let form = document.createElement('form')
  form.style.display = 'none'
  form.action = url
  form.method = method
  form.enctype = 'multipart/form-data'
  document.body.appendChild(form)
  for (var key in params) {
    var input = document.createElement('input')
    input.type = 'hidden'
    input.name = key
    input.value = params[key]
    form.appendChild(input)
  }
  form.submit()
  form.remove()
}

/**
 * 方法二：导出excel，全局通用 (后台接口不要验证 key )
 * @param {string} type 导出excel的类别
 * @param {object} data 参数对象
 */
export function exportExcelTwo(type, data) {
  console.log('-type-', type, '-params-', data)
  if (baseUrl) {
    let url = `${baseUrl}${Excel[type]}?${Qs.stringify(data)}`
    console.log('-url-', url)
    window.location.href = url
    tools.downloadFile(url, '导出excel的文件名')
  }
}

/**
 * 方法三：导出excel，全局通用 (后台接口不要验证 key )，原理同方法二
 * @param {string} type 导出excel的类别
 * @param {object} data 参数对象
 * @param {string} fileName 导出excel的文件名, 可选默认为空
 */
export function exportExcelThree(type, data, fileName = '') {
  console.log('-type-', type, '-fileName-', fileName, '-params-', data)
  if (baseUrl) {
    let url = `${baseUrl}${Excel[type]}?${Qs.stringify(data)}`
    console.log('-url-', url)
    tools.downloadFile(url, fileName)
  }
}

/**
 * 上传图片/视频
 */
export function uploadImgOrVideo(data) {
  return request({
    url: '/product/uploadPhotos',
    method: 'post',
    data
  })
}

/*
 * @Author: wangshengxian
 * @Date: 2020-08-17 15:34:15
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-18 16:11:53
 * @Desc:
 */
/**
 * 字段转中文
 */
// 传v时返回匹配的label(用于转换中文)，不传v时返回data数组(用于el-select等数据)
const getData = (data, v) => {
  if (v === undefined) {
    return data
  } else {
    for (let i = 0; i < data.length; i++) {
      if (data[i].value === v) {
        return data[i].label
      }
    }
  }
}

/**
 * 显示状态
 */
export function displayStatus(v) {
  const data = [
    { value: 1, label: '显示' },
    { value: 2, label: '不显示' }
  ]
  return getData(data, v)
}

/**
 * 订单管理 - 订单列表 - 订单状态
 */
export function getOrderStatus(v) {
  const data = [
    { value: '', label: '全部' },
    { value: 1, label: '待付款' },
    { value: 2, label: '待发货' },
    { value: 3, label: '待收货' },
    { value: 4, label: '已完成' }
  ]
  return getData(data, v)
}

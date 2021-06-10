/*
 * @Author: wangshengxian
 * @Date: 2020-08-17 16:11:33
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-01 18:12:47
 * @Desc: 订单管理路由模块
 */
import Layout from '@/views/layout'

// 直播列表
const OrderList = () => import(/* webpackChunkName: 'orderList' */ '@/views/order/orderList')

const orderRouter = {
  path: '/order',
  name: 'Order',
  component: Layout,
  redirect: '/order/orderList',
  alwaysShow: true,
  meta: {
    title: '订单管理',
    icon: 'order-1'
  },
  children: [
    {
      path: 'orderList',
      name: 'OrderList',
      component: OrderList,
      meta: {
        title: '订单列表',
        icon: 'menu'
      }
    }
  ]
}

export default orderRouter

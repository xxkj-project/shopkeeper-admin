/*
 * @Author: wangshengxian
 * @Date: 2020-08-17 15:34:15
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-16 14:30:22
 * @Desc: token、username等用户认证信息，localStrong本地存储
 */
import storage from './storage'

// token存取----------------------------------------------
const TokenKey = 'shopkeeper_key'
// const TokenKey = 'Admin-Token'
// token过期时间 (小时)
const TokenExpire = 24

export function getToken() {
  return storage.getItem(TokenKey)
}

export function setToken(token) {
  storage.setItem(TokenKey, token, TokenExpire)
}

export function removeToken() {
  storage.removeItem(TokenKey)
}

// username存取------------------------------------------
const UsernameKey = 'shopkeeper_username'

export function getUsername() {
  return storage.getItem(UsernameKey)
}

export function setUsername(username) {
  storage.setItem(UsernameKey, username)
}

export function removeUsername() {
  storage.removeItem(UsernameKey)
}

// password存储(TODO: 只在测试服存储，正式服不作存储，若要存储需要设置一个过期时间)------------------------------------------------
const Password = 'shopkeeper_password'

export function getPassword() {
  return storage.getItem(Password)
}

export function setPassword(pwd) {
  storage.setItem(Password, pwd)
}

export function removePassword() {
  storage.removeItem(Password)
}

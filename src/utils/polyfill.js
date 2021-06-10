/*
 * @Author: wangshengxian
 * @Date: 2020-11-18 13:30:55
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-08 15:00:51
 * @Desc: 一些polyfill方案(填补旧浏览器对html5的支持缺陷)
 */

;(function() {
  //  Element.matches
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector
  }

  // Element.closest
  if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
      var el = this
      if (!document.documentElement.contains(el)) return null
      do {
        if (el.matches(s)) return el
        el = el.parentElement
      } while (el !== null)
      return null
    }
  }
})()

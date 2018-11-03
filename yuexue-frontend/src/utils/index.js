// 删除Cookie
export function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}
// 获取某一时间与当前时间间隔
export function getInterval(dateString) {
  const _1sec = 1000
  const _1min = _1sec * 60
  const _1hour = _1min * 60
  const _1day = _1hour * 24

  let date = new Date(dateString)
  let interval = Date.now() - date
  if (interval < _1min) {
    return Math.floor(interval / _1sec) + '秒前'
  }
  if (interval < _1hour) {
    return Math.floor(interval / _1min) + '分钟前'
  }
  if (interval < _1day) {
    return Math.floor(interval / _1hour) + '小时前'
  }
  if (interval < 3 * _1day) {
    return Math.floor(interval / _1day) + '天前'
  }
  return date.format('yyyy-MM-dd')
}

export const smoothScrollTo = (x = 0, y = 0, timeout = 300) => {
  let fps = 50
  let f = 10
  let curTime = new Date().getTime()

  return new Promise(resolve => {
    let interval = window.setInterval(() => {
      let dx = (x - window.scrollX) / f
      let dy = (y - window.scrollY) / f

      if (new Date().getTime() - curTime <= timeout) {
        window.scrollTo(window.scrollX + dx, window.scrollY + dy)
      } else {
        resolve()
        window.clearInterval(interval)
      }
    }, timeout / fps)
  })
}
/*
 * 常用正则
 **/
export const commonRegex = {
  email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  tel: /^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/
}

/**
 * 在 Date 原型链上添加时间格式化方法
 * @param fmt
 * @returns {*}
 */
/* eslint-disable */
Date.prototype.format = function(fmt) {
  var o = {
    'M+' : this.getMonth()+1,                 // 月份
    'd+' : this.getDate(),                    // 日
    'h+' : this.getHours(),                   // 小时
    'm+' : this.getMinutes(),                 // 分
    's+' : this.getSeconds(),                 // 秒
    'q+' : Math.floor((this.getMonth()+3)/3), // 季度
    'S'  : this.getMilliseconds()             // 毫秒
  };
  if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  for(var k in o) {
    if(new RegExp('('+ k +')').test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (('00'+ o[k]).substr((''+ o[k]).length)));
    }
  }
  return fmt
}

import request from './request'

export function login(data) {
  return request({
    method: 'post',
    url: '/user/login',
    data
  })
}

export function register(data) {
  return request({
    method: 'post',
    url: '/user/register',
    data
  })
}

export function modify(data) {
  return request({
    method: 'post',
    url: '/user/modify',
    data
  })
}

export function getUser(data) {
  return request({
    method: 'get',
    url: '/user/getUser',
    params: data
  })
}

export function logout() {
  return request({
    method: 'get',
    url: '/user/logout'
  })
}

export function getUserInfo() {
  return request({
    method: 'get',
    url: '/user/getUserInfo'
  })
}

export function modifyAvatar(file, userId) {
  let formData = new FormData()
  formData.append('avatarFile', file)
  formData.append('userId', userId)
  return request({
    method: 'post',
    url: '/user/modifyAvatar',
    data: formData
  })
}

export function resetUserPwd(data) {
  return request({
    method: 'post',
    url: '/user/resetUserPwd',
    data
  })
}

export function sendPinCode(data) {
  return request({
    method: 'post',
    url: '/user/sendPinCode',
    data
  })
}

import request from './request'

export function createOrder(data) {
  return request({
    method: 'post',
    url: '/order/create',
    data
  })
}

export function queryOrder(data) {
  return request({
    method: 'post',
    url: '/order/query',
    data
  })
}

export function receiveOrder(data) {
  return request({
    method: 'post',
    url: '/order/receive',
    data
  })
}

export function queryCurrentOrders(data) {
  return request({
    method: 'post',
    url: '/order/queryCurrentOrders',
    data
  })
}

export function deleteOrder(data) {
  return request({
    method: 'post',
    url: '/order/delete',
    data
  })
}

export function readAllUnreadOrder() {
  return request({
    method: 'post',
    url: '/order/readAllUnreadOrder'
  })
}

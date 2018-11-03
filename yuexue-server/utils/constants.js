/**
 * 订单状态
 * @type {{PUBLISHED_UNRECEIVED: number, PUBLISHED_RECEIVED: number, PUBLISHED_REMOVED: number, RECEIVED_UNREAD: number, RECEIVE_READ: number}}
 */
const orderStatus = {
    // UNPUBLISHED: 1,             // 创建未发布 原想保留草稿状态 太复杂所以目前没有这种状态
    PUBLISHED_UNRECEIVED: 2,    // 发布未被接收
    // PUBLISHED_RECEIVED: 3,      // 发布已被接收
    PUBLISHED_REMOVED: 4,       // 发布后被删除
    RECEIVED_UNREAD: 5,         // 已被接收 发布人未读
    RECEIVED_READ: 6             // 已被接收 发布人已读
}

const gender = {
    MALE: 'male',
    FEMALE: 'female',
    UNKNOWN: 'unknown'
}

module.exports = {
    orderStatus,
    gender
}


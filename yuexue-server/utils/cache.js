const NodeCache = require('node-cache')
const log4js = require('./logger')
const logger = log4js.getLogger('cache')

const _10min = 10 * 60;
const cacheConfig = {
    stdTTL: _10min,         // 默认 0, 失效时间（以秒为单位），0 为无限
    checkperiod: 60,        // 用于自动删除检查间隔的周期（以秒为单位），0 为没有定期检查。
    errorOnMissing: false,  // 默认false，get时获取不到值抛出异常或将错误传给回调
    useClones:true,         // 默认 true， 是否禁用克隆变量。如果为true，将获得缓存变量的副本。否则将保存并获取变量的引用。建议为true。
    deleteOnExpire:true     // 默认 true，变量是否会在到期时自动删除。如果为true，则将删除该变量。如果为false，则变量将保留。
}

const cache = new NodeCache(cacheConfig)

function setCacheItem(key, value, ttl) {
    logger.info(`缓存数据 [${key}, ${value}] , 缓存时间: ${ttl || _10min}s`)
    cache.set(key, value)
}

function getCacheItem(key) {
    logger.info(`获取缓存数据 ${key}`)
    return cache.get(key)
}

module.exports = {
    setCacheItem,
    getCacheItem
}
import axios from 'axios'
import Toast from 'components/toast'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 15000, // 请求超时时间
  withCredentials: true
})

// response 拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    Toast('啊哦~请求出错了')
    console.error('请求出错', error)
    return Promise.reject(error)
  }
)

export default service

import axios from 'axios'

axios.defaults.timeout = 1000 * 10
axios.defaults.withCredentials = false
axios.defaults.baseURL = 'https://apaas-api.aodianyun.cn/auditst/audit/AuditVideo'

axios.interceptors.response.use(
    response => {
      // Do something before response is sent
      const res = response.data
      return res
    },
    error => {
      // Do something with response error
      return Promise.reject(error)
    }
  )
  
  export default axios
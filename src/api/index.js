import axios from '@/request'

//获取列表
export const getAuditList = (payload = {}) => {
    return axios.post('/getAuditList', payload)
}
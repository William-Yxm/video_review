import axios from '@/request'

//获取审核列表
export const getAuditList = (payload = {}) => {
    return axios.post('/getAuditList', payload)
}

//审核
export const changAuditStatue = (payload = {}) => {
    return axios.post('/changAuditStatue', payload)
}
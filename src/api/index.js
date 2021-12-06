import axios from '@/request'
const url = '//apaas-api.aodianyun.cn/auditst/audit/AuditVideo'

//获取审核列表
export const getAuditList = (payload = {}) => {
    return axios.post(url+'/getAuditList', payload)
}

//审核
export const changAuditStatue = (payload = {}) => {
    return axios.post(url+'/changAuditStatue', payload)
}
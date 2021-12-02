export function formatDate(value) {
        if (typeof (value) == 'undefined') {
            return ''
        } else {
            let date = new Date(parseInt(value * 1000))
            let y = date.getFullYear()
            let MM = date.getMonth() + 1
            MM = MM < 10 ? ('0' + MM) : MM
            let d = date.getDate()
            d = d < 10 ? ('0' + d) : d
            let h = date.getHours()
            h = h < 10 ? ('0' + h) : h
            let m = date.getMinutes()
            m = m < 10 ? ('0' + m) : m
            let s = date.getSeconds()
            s = s < 10 ? ('0' + s) : s
            return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
        }
    }
export function  time(time) {
        var h = Math.floor(time/3600) > 9 ? Math.floor(time/3600) : '0' + Math.floor(time/3600)
        var m = Math.floor(time%3600/60) > 9 ? Math.floor(time%3600/60) : '0' + Math.floor(time%3600/60)
        var s = Math.floor(time%60) > 9 ? Math.floor(time%60) : '0' + Math.floor(time%60)
        return h + ':' + m + ':' + s
    }
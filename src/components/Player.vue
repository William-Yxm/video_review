<template>
  <div id="MPSplayer"></div>
</template>

<script>
export default {
    props: {
        url: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            player: null
        }
    },
    mounted() {
        this.init(this.url)
    },
    methods: {
        init(url){
    
        // eslint-disable-next-line no-undef
        this.player =  new mpsPlayer({
          container: "MPSplayer", //播放器容器ID，必要参数
          uin: "1011", //用户ID
          appId: "fumBub1N6zNQxQUx", //播放实例ID
          url, //控制台开通的hls/mp4地址
          width: "100%", //播放器宽度，可用数字、百分比等
          height: "100%", //播放器高度，可用数字、百分比等
          autostart: true, //是否自动播放，默认为false
          controlbardisplay: "enable", //是否显示控制栏，值为：disable、enable默认为disable。
          isclickplay: false, //是否单击播放，默认为false
          isfullscreen: true, //是否双击全屏，默认为true
          mobilefullscreen: false, //移动端是否全屏，默认为false
          enablehtml5: true, //是否优先使用H5播放器，默认为false
          ieUseH5: true, //boolean ie下是否使用H5（支持win10下ie（ie11）和edge） 默认false
          isloadcount: 1, //网络波动卡顿loading图标显示(默认1s后)
        });
        },
        changePlay(url){
           this.player && this.player.changePlayer(url)
        }
    }
}
</script>

<style lang="less" scoped>
 #MPSplayer {
    width: 100%;
    height: 100%;
}
</style>>
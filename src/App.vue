<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods:{
  },
  created(){
    $.ajax({
      type:'post',
      async:true,
      xhrFields:{withCredentials:true},
      url:'/TSBM-Manager/json/url.json',
      dataType:'json',
      success:function(data){
        localStorage.serverurl = data.url;
        localStorage.versionNumber = data.versionNumber
        console.log('版本:'+data.versionNumber)
      }
    })
    localStorage.serverurl = 'http://192.168.10.211/TSBM-Manager/';
  }
}
</script>

<style>
#app {
  width:100%;
  height:100%;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>

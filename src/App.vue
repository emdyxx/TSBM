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
      }
    })
    localStorage.serverurl = 'http://192.168.70.83/TSBM-Manager/';
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

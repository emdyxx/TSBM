<template>
  <div class="login">
    <!-- <div class="login_left">
      <span class="point1" @click="point1">中文</span>/<span class="point2" @click="point2">En</span>
    </div> -->
    <div class="login_popur">
          <h1><span>{{$t('login.system')}}</span></h1>
          <el-input v-model.lazy="username" :placeholder="$t('login.userName')" required='required'></el-input>
          <el-input v-model.lazy="password" type='password' :placeholder="$t('login.passwords')" required></el-input>
          <el-button :loading='loginbutton' type="info" @click="login">{{$t('login.login')}}</el-button>
          <hr>
          <h1>
            <img class="logo" src="../ASSETS/logo.png" alt="">
            <span>{{$t('login.name')}}</span>
          </h1>
          <div style='margin:25px;'>©2017 All Rights Reserved.</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
        sites:{},
        username:'',
        password:'',
        verificationcode:'',
        serverurl:localStorage.serverurl,
        onkeyType:'0',
        loginbutton:false
    } 
  },
  mounted(){
    
  },
  methods:{ 
    point1(){
      $('.login_left>span').css({
        "opacity":0.6,
        "font-weight":0
      })
      $('.point1').css({
        "opacity":1,
        "font-weight":700
      })
      localStorage.setItem('locale', 'zh')
      this.$i18n.locale = localStorage.getItem('locale')
    },
    point2(){
      $('.login_left>span').css({
        "opacity":0.6,
        "font-weight":0
      })
      $('.point2').css({
        "opacity":1,
        "font-weight":700
      })
      localStorage.setItem('locale', 'en')
      this.$i18n.locale = localStorage.getItem('locale')
    },
    login(){
        var that = this;
        if(this.username==''){
            this.$message({
              message: '用户名不能为空',
              type: 'warning',
              showClose: true,
            });
            return;
        }
        if(this.password==''){
            this.$message({
              message: '密码不能为空',
              type: 'warning',
              showClose: true,
            });
            return;
        }
        that.loginbutton = true
        $.ajax({
          type:'post',
          async:true,
          url:localStorage.serverurl+'login',
          dataType:'json',
          xhrFields:{withCredentials:true},
          data:{
            username:that.username,
            userPwd:that.password,
          },
          success:function(data){
            that.loginbutton = false
            if(data.errorCode=='0'){
              sessionStorage.userName = data.result[0].userName
              sessionStorage.id = data.result[0].id
              sessionStorage.departmentId = data.result[0].departmentId //判断是否是管理员字段
              that.$router.push({'path':'/index'})
            }else{
              that.errorCode(data)
            }
          }
        })
    },
  },
  created(){
    var that = this
    if(localStorage.locale==undefined||localStorage.locale==null||localStorage.locale==''){
      localStorage.setItem('locale', 'zh')
      this.$i18n.locale = localStorage.getItem('locale')
    }
    window.onkeydown = function(e){
      if(e.keyCode==13){
        if(that.onkeyType=='0'){
          that.login()
        }
      }
    }
  }
}
</script>

<style scoped>
.login{
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  background-image: url('/TSBM-Manager/img/images/background.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.login_left{position: absolute;top:30px;left: 40px;}
.login_left>span:nth-of-type(1){opacity:1;font-weight: 700;}
.login_left>span{cursor: pointer;opacity: 0.6;font-size: 15px;display: inline-block;padding: 5px;}
.login_popur{
  width: 500px;
  height: 435px;
  padding: 0 30px;
  box-shadow: 5px 5px 15px black;
  border-radius: 15px;
  background: white;
  opacity: 0.8;
}
.login_popur>h1:nth-of-type(1){
  font: normal 25px Helvetica, Arial, sans-serif;
  color: #73879C;
  text-align: center;
  line-height: 1px;
  border-left: 120px solid #D8D8D8;
  border-right: 120px solid #D8D8D8;
  margin: 35px 0;
  display: inline-block;
}
.login_popur>div{
  margin-top: 20px;
}
.login_popur_yzm{
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
}
.errorlogin{color: red;font-size: 16px;}
.login_popur_yzm>div:nth-of-type(1){width: 60%;}
.login_popur_yzm>div:nth-of-type(2){width: 36%;}
.login_popur_yzm_two{display: flex;display: -webkit-flex;justify-content: space-between;}
.login_popur_yzm_two>div{height: 36px;}
.login_popur_yzm_two>div:nth-of-type(1){width: 60%;}
.login_popur_yzm_two>div:nth-of-type(2){width: 36%;}
.login_popur_yzm_two>div:nth-of-type(2)>i{font-size: 24px;line-height: 36px;text-align: center;color: #5A738E;cursor: pointer;margin-left: 15px;}
.login_popur>button{width: 150px;margin: 20px 0;}
.login_popur>hr{margin: 0;border-top: 1px solid #d8d8d8;border-bottom: none;}
.login_popur>h1:nth-of-type(2){font-size: 27px;color: #73879C;margin: 35px 0 30px 0;font: normal 25px Helvetica, Arial, sans-serif;}
.login_popur>h1:nth-of-type(2)>i{font-size: 30px;display: inline-block;position: relative;top:3px;font-weight: 0;}
.login_popur>div:last-child{margin:0;color: #73879C;font-size: 14px;}
.logo{width: 30px;height: 30px;margin-top: -4px;}
</style>

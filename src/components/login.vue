<template>
  <div class="login">
    <div class="login_popur">
          <h1>TSBM-管理系统</h1>
          <el-input v-model.lazy="username" placeholder="用户名" required='required'></el-input>
          <el-input v-model.lazy="password" type='password' placeholder="密码" required></el-input>
          <!-- <div class="login_popur_yzm">
              <div>
                <el-input v-model.lazy="verificationcode" placeholder="请输入验证码" required></el-input>
              </div>
              <div class="login_popur_yzm_two">
                  <div>
                    <img id="codeimg" @click="verification" src='' alt="">
                  </div>
                  <div>
                    <i @click="verification" class="iconfont icon-shuaxin1"></i>
                  </div>
              </div>
          </div> -->
          <el-button type="info" @click="login">登录</el-button>
          <hr>
          <h1>
            <img class="logo" src="../ASSETS/logo.png" alt="">
            <span>快越科技</span>
          </h1>
          <div>©2017 All Rights Reserved.</div>
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
        onkeyType:'0'
    }
  },
  mounted(){
    // $('#codeimg').attr('src',localStorage.serverurl+'getVerifyToken?rnd=' + Math.random())
  },
  methods:{
    // verification(){
    //   $('#codeimg').attr('src',localStorage.serverurl+'getVerifyToken?rnd=' + Math.random())
    // },  
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
        // if(this.verificationcode==''){
        //     this.$message({
        //       message: '验证码不能为空',
        //       type: 'warning',
        //       showClose: true,
        //     });
        //     return;
        // }
        $.ajax({
          type:'post',
          async:true,
          url:that.serverurl+'login',
          dataType:'json',
          xhrFields:{withCredentials:true},
          data:{
            username:that.username,
            userPwd:that.password,
            // verification:that.verificationcode
          },
          success:function(data){
            if(data.errorCode=='2001'){
              that.$message({
                message: '验证码错误',
                type: 'error',
                showClose: true,
              });
              // $('#codeimg').attr('src',localStorage.serverurl+'getVerifyToken?rnd=' + Math.random())
              return;
            }
            if(data.errorCode=='2004'){
                that.$message({
                  message: '账号密码错误',
                  type: 'error',
                  showClose: true,
                });
                $('#codeimg').attr('src',localStorage.serverurl+'getVerifyToken?rnd=' + Math.random())
              return;
            }
            if(data.errorCode=='0'){
              sessionStorage.userName = data.result[0].userName
              sessionStorage.id = data.result[0].id
              sessionStorage.departmentId = data.result[0].departmentId //判断是否是管理员字段
              that.$router.push({'path':'/index'})
            }
          }
        })
    },
  },
  created(){
    var that = this
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
  background-image: url('http://192.168.10.211/TSBM-Manager/img/images/111.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.login_popur{
  width: 500px;
  height: 455px;
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

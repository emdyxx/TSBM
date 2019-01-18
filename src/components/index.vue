<template>
  <div class="index">
    <div class="index_nav">
      <div class="index_nav_top" @click="echart">
        <div>
          <img class="logo" src="../ASSETS/logo.png" alt="">
        </div>
        <span>{{$t('index.system')}}</span>
      </div>
      <div class="index_main_top">
        <!-- <div class="index_main_top_center">
          <el-button @click="shortcut(1)" size='small'>{{$t('index.EquipmentOverview')}}</el-button>
          <el-button @click="shortcut(2)" size='small'>{{$t('index.Theequipmentlist')}}</el-button>
          <el-button @click="shortcut(3)" size='small'>{{$t('index.orientationofmap')}}</el-button>
          <el-button @click="shortcut(4)" size='small'>{{$t('index.statisticaldata')}}</el-button>
        </div> -->
        <div class="index_main_top_right">
          <el-badge :value=value class="item" style="line-height:0;margin-right:20px;cursor: pointer;">
            <i @click="shortcut(5)" class="iconfont icon-jinggao"></i>
          </el-badge>
          <el-dropdown trigger="click" style="cursor: pointer;" @command="handleCommand">
            <span class="el-dropdown-link" style="color: white;font-size:16px;">
              <span style="margin-right:20px;">{{$t('index.versionnumber')}}:{{versionNumber}}</span>
              <span>{{username}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu style="margin-top:0px;">
              <el-dropdown-item command="a">{{$t('index.Personalsettings')}}</el-dropdown-item>
              <el-dropdown-item command="c">{{$t('index.Exitlogon')}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="index_main">
      <div class="index_nav_bottom">
        <div class="index_nav_bottom_top">
          <p @click="shortcut(1)" :title="$t('index.EquipmentOverview')" class="iconfont icon-xitongguanli"></p>
          <p @click="shortcut(2)" :title="$t('index.Theequipmentlist')" class="iconfont icon-shebei" style="font-size:21px;"></p>
          <p @click="shortcut(3)" :title="$t('index.orientationofmap')" class="iconfont icon-iconbaiduditu" style="font-size:25px;"></p>
          <p @click="shortcut(4)" :title="$t('index.statisticaldata')" class="iconfont icon-tongjishuju"></p>
          <!-- <div @click="leftshrink" v-if="isCollapse==false">
            <i class="iconfont icon-iconfontplatformentrance1"></i>
            <i class="iconfont icon-iconfontplatformentrance1"></i>
            <i class="iconfont icon-iconfontplatformentrance1"></i>
          </div>
          <div @click='rightshrink' v-if="isCollapse==true">
            <i class="iconfont icon-iconfontplatformentrance"></i>
            <i class="iconfont icon-iconfontplatformentrance"></i>
            <i class="iconfont icon-iconfontplatformentrance"></i>
          </div> -->
        </div>
        <div class="index_nav_bottom_bottom">
          <el-menu default-active="1-4-1" :unique-opened='uniqueopened' class="el-menu-vertical-demo" :collapse="isCollapse">
            <el-submenu v-for="(site,key) in sites" :key="site.id" :index=site.id style="text-align:left;">
              <template slot='title'>
                <i v-if="site.menuName=='常用菜单'" class="left_i iconfont icon-changyongcaidan"></i>
                <i v-else-if="site.enLabel=='systemManage'" style="left:-3px;" class="left_i iconfont icon-xitongguanli"></i>
                <i v-else-if="site.enLabel=='equipmentManage'" style='left:-1px;font-size:20px;' class="left_i iconfont icon-shebei"></i>
                <i v-else-if="site.enLabel=='upgradeManage'" style="font-size:15px;left:-2px;" class="left_i iconfont icon-shebeishengji "></i>
                <i v-else-if="site.enLabel=='eventManage'" style="font-size:22px;left:-4px;" class="left_i iconfont icon-shijian"></i>
                <i v-else-if="site.enLabel=='statisticsInfo'" style="font-size:19px;left:-4px;" class="left_i iconfont icon-gailan"></i>
                <i v-else-if="site.enLabel=='iotDataCenter'" style="font-size:26px;left:-4px;" class="left_i iconfont icon-wulianwang"></i>
                <span v-if="locale=='en'" slot="title">{{site.enLabel}}</span>
                <span v-else slot="title">{{site.menuName}}</span>
              </template> 
              <el-menu-item-group>
                <el-menu-item v-for='(item,index) in site.sonMenu' :key="item.id" index='1-1'>
                  <span v-if="locale=='en'" style="color:#48576a;display:inline-block;width:100%;height:100%;text-decoration: none;" :id='bagcolor==item.enLabel ? "bgcolor":""'  @click='bgcolor(item.enLabel,item.id,item.enLabel)'>{{item.enLabel}}</span>
                  <span v-else style="color:#48576a;display:inline-block;width:100%;height:100%;text-decoration: none;" :id='bagcolor==item.enLabel ? "bgcolor":""'  @click='bgcolor(item.enLabel,item.id,item.enLabel)'>{{item.menuName}}</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
      </div>
      <!-- 模态框（Modal） -->
      <div class="modal fade" id="systemsettings" style="text-align: left;" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div class="modal-dialog" style="width:450px;">
              <div class="modal-content">
                  <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                      <h4 class="modal-title" id="myModalLabel">{{$t('index.Personalsettings')}}</h4>
                  </div>
                  <div class="modal-body">
                    <form class="systemsettingspsd">
                      <label for="" style="margin-top:8px;">
                        {{$t('index.Originalcipher')}}:
                        <input type="password" v-model.lazy="oldPassword" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入原密码" required>
                      </label>
                      <label for="">
                        {{$t('index.Newpassword')}}:&#12288
                        <input type="password" v-model.lazy="newPassword" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入新密码" required>
                      </label>
                      <label for="">
                        {{$t('index.Confirmthepassword')}}:
                        <input type="password" v-model.lazy="newPasswordTwo" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="确认新密码" required>
                      </label> 
                    </form>
                    <button style="margin-left:150px;" type="button" @click="revampPassword" class="btn btn-primary">{{$t('index.Submittingachange')}}</button>
                  </div>
              </div><!-- /.modal-content -->
          </div>
      </div><!-- /.modal -->
      <div class="index_main_bottom">
        <router-view></router-view> 
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'index',
  data () {
    return {
      locale:localStorage.locale,
      isCollapse:false,
      uniqueopened:true,
      username:sessionStorage.userName,
      frequentlyUsedMenu: false,
      systemManage:false,
      equipmentManage:false,
      upgradeManage:false,
      eventManage:false,
      statisticsInfo:false,
      sites:[],
      activeName2: 'first',
      bagcolor:'',
      serverurl:localStorage.serverurl,
      oldPassword:'',
      newPassword:'',
      newPasswordTwo:'',
      activeName: '1',
      checked:[],
      data2:[],
      defaultProps:{
        children: 'sonMenu',
        label: 'menuName'
      },
      value:'0',
      onkeyType:'1',
      versionNumber:localStorage.versionNumber  //版本号
    }
  },
  mounted(){
    this.leftshrink()
  },
  methods:{
    handleCommand(command){
      var that = this
      //个人设置
      if(command=='a'){
        $('#systemsettings').modal('show')
        $.ajax({
          type:'post',
          async:true,
          url:that.serverurl+'system/getMenu',
          dataType:'json',
          xhrFields:{withCredentials:true},
          data:{},
          success:function(data){
            if(data.errorCode=='0'){
              for(var i=0;i<data.result[0].sonMenu.length;i++){
                that.checked.push(data.result[0].sonMenu[i].id)
              }
              that.data2 = data.result
              that.data2.splice(0,1)
            }else{
              that.errorCode(data)
            }
          }
        })
      }
      // 退出登录
      if(command=='c'){
        var that = this
        $.ajax({
          type:'post',
          async:true,
          xhrFields:{withCredentials:true},
          url:that.serverurl+'loginout',
          dataType:'json',
          success:function(data){
            if(data.errorCode=='0'){
              localStorage.username = ''
              that.$router.push({'path':'/'})
            }
          }
        })
      }
    },
    bgcolor(name,id,url){
      this.bagcolor = name
      sessionStorage.menuId = id
      if(url=='equipmentStatistics'){
        this.$router.push({'path':'/factory'})
      }else{
        this.$router.push({'path':url})
      }
    },
    //修改密码
    revampPassword(){
      var that = this;
      //中文验证
      if(this.newPassword!=this.newPasswordTwo){
        this.$message({
          message: that.$t('index.Newpassworddoesnotmatch'),
          type: 'error',
          showClose: true,
        });
        return;
      }
      if(this.oldPassword==this.newPasswordTwo){
        that.$message({
            message: that.$t('index.Thenewpasswordpassword'),
            type: 'error',
            showClose: true,
        });
        return;
      }
      $.ajax({
        type:'post',
        async:true,
        url:that.serverurl+'user/editPwd',
        dataType:'json',
        xhrFields:{withCredentials:true},
        data:{
          originalPwd:that.oldPassword,
          newPwd:that.newPassword
        },
        success:function(data){
          if(data.errorCode==0){
            that.$message({
              message: that.$t('index.Passwordmodifiedsuccessfully'),
              type: 'success',
              showClose: true,
            });
            $('#systemsettings').modal('hide')
            that.$router.push({'path':'/'})
          }else{
            that.errorCode(data)
          }
        }
      })
    },
    //快捷方式点击跳转
    shortcut(val){
      if(val == '1'){
        sessionStorage.menuId = 61
        this.$router.push({'path':'/factory'})
      }
      if(val == '2'){
        sessionStorage.menuId = 31
        this.$router.push({'path':'/TSBManage'})
      }
      if(val == '3'){
        sessionStorage.menuId = 33
        this.$router.push({'path':'/equipmentLocation'})
      }
      if(val == '4'){
        sessionStorage.menuId = 62
        this.$router.push({'path':'/dataStatistics'})
      }
      if(val=='5'){
        sessionStorage.menuId = 51
        this.$router.push({'path':'/alarm'})
      }
    },
    //点击事件-->跳转图表页面
    echart(){
      this.$router.push({'path':'/factory'})
    },
    //左缩进
    leftshrink(){
      $(".index_nav_bottom").css('width',"53px");
      $(".index_main_bottom").css('left',"53px");
      this.isCollapse=true
    },
    //右缩进
    // rightshrink(){
    //   $(".index_nav_bottom").css('width',"219px");
    //   $(".index_main_bottom").css('left',"219px");
    //   this.isCollapse=false
    // },
  },
  created(){
    var that = this;
    //导航栏渲染请求
    $.ajax({
      type:'post',
      async:true,
      xhrFields:{withCredentials:true},
      url:that.serverurl+'system/getMenu',
      dataType:'json',
      data:{
        username:'admin'
      },
      success:function(data){
        if(data.errorCode=='0'){
          that.sites = data.result
          for(var i=0;i<that.sites.length;i++){
            that.sites[i].id = String(that.sites[i].id)
          }
        }else{
          that.errorCode(data)
        }
      },
    });

    var result = ''
    var url = window.location.href;
    console.log(url)
    // var url = 'http://192.168.10.211/TSBM-Manager/#/index';
    url = url.split('//')
    url = url[1].split('/');
    for(var i = 0;i<url.length;i++){
        if(url[i]=='TSBM-Manager'){
          result = 'ws://'+url[0]+'/TSBM-Manager'
        }else if(result==''){
          result = 'ws://'+url[0]
        }
    }
    console.log(url)
    var ws = new WebSocket(result+'/webscoketAlarm');
    ws.onopen = function(){}
    ws.onmessage = function (evt){
      var data = JSON.parse(evt.data)
      that.value = data.alarmTotal
    }
    ws.onclose = function (evt){
      ws = new WebSocket(result+'/webscoketAlarm');
    }
    window.onkeydown = function(e){
      if(e.keyCode==13){
        if(that.onkeyType=='1'){
          return;
        }
      }
    }
  }
}
</script>
<style scoped>
.logo{width:25px;height: 25px;}
#bgcolor{background: #99A9BF !important;border-right: 4px solid #20A0FF !important;color: white !important;}

.index{width: 100%;height: 100%;}
.index_nav{width: 100%;height: 40px;background: white;display: flex;}
.index_main{position: absolute;top:40px;bottom:0;width:100%;height:auto;background:white;display: flex;display: -webkit-flex;flex-direction: column;}
.index_nav_top{cursor: pointer;color: white;font-size: 19px;background:#293c55;width:240px;}
.index_nav_top>div{display: inline-block;width: 32px;height:32px;border: 1px solid white;border-radius: 50%;position: relative;left: -15px;top:2px;}
.index_nav_top i{font-size: 25px;line-height: 32px;}
.index_nav_top>span{position: relative;left: -15px;top:6px;}
.icon-jinggao{display: inline-block;line-height: 25px;font-size:25px;color: #486d93;text-shadow: 0.5px 0.5px #b4c7da, -0.5px -0.5px #375471;}

.index_main_top_center{position: absolute;left: 10px;height: 40px;line-height: 40px;}

.index_main_top_right{position: absolute;right: 2%;height: 40px;line-height: 40px;}
.index_nav_top,.index_main_top{height: 40px;}
.index_main_top{background:#293c55;position: absolute;left: 240px;right: 0;height: 40px;}
/* background: rgb(244, 244, 244); */
.index_nav_bottom{position: absolute;left:0;height:100%;width: 220px;border-right: 1px solid #dddddd;background: rgb(244, 244, 244);}
.index_main_bottom{position: absolute;left:220px;right:0;height: 100%;background: rgb(244, 244, 244);overflow: auto;}
.index_nav_bottom_top{width: 100%;height: 210px;}
.index_nav_bottom_top>p{display:inline-block;width: 52px;height: 50px;line-height: 50px;font-size: 18px;color: #555555;background-color: #eef1f6;cursor: pointer;margin:0;}
.index_nav_bottom_top>p:hover{background:#d1dbe5;}
/* .index_nav_bottom_top>div{position: absolute;right: 7px;cursor: pointer;width: 42px;height: 30px;}
.index_nav_bottom_top>div>i{font-size:24px;position: absolute;top: 0px;}
.index_nav_bottom_top>div>i:nth-of-type(2){left: 7px;}
.index_nav_bottom_top>div>i:nth-of-type(3){left: 14px;}
.index_nav_bottom_top>img{width: 60px;border-radius: 50%;margin-left: 15px;border: 1px solid gray;padding: 2px;}
.index_nav_bottom_top>div{margin-left: 15px;padding: 8px 0;} */
.index_nav_bottom_bottom{position: absolute;width: 220px;height: auto;top:210px;bottom: 0;overflow: hidden;}
.index_nav_bottom_bottom>ul{position: absolute;bottom: 40px;width: 52px}
.systemsettingspsd{display: flex;flex-direction: column;align-items: center;font-size: 14px}
.systemsettingspsd>label{margin-bottom: 15px;}
.list>a{background: #FBFDFF;border-bottom: 1px solid #dfe6ec;text-align: center;}
.left_i{position:relative;top:1px;font-size:17px;display:inline-block;width: 22px;text-align: center;}
.left_i_JT{position: absolute;right: 15px;top:12px;}
</style>

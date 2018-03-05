<template>
  <div class="index">
    <div class="index_nav">
      <div class="index_nav_top" @click="echart">
        <div>
          <!-- <i class="iconfont icon-baidu"></i> -->
          <img class="logo" src="../ASSETS/logo.png" alt="">
        </div>
        <span>TSBM-管理系统</span>
      </div>
      <div class="index_main_top">
        <div class="index_main_top_left">
          <span>版本号:{{versionNumber}}</span>
        </div>
        <div class="index_main_top_center">
          <el-button @click="shortcut(1)">设备概览</el-button>
          <el-button @click="shortcut(2)">设备列表</el-button>
          <el-button @click="shortcut(3)">地图定位</el-button>
          <el-button @click="shortcut(4)">数据统计</el-button>
        </div>
        <div class="index_main_top_right">
          <el-badge :value=value class="item" style="line-height:0;margin-right:30px;cursor: pointer;">
            <i @click="shortcut(5)" class="iconfont icon-jinggao"></i>
          </el-badge>
          <el-dropdown trigger="click" style="cursor: pointer;" @command="handleCommand">
            <span class="el-dropdown-link" style="color: white;font-size:16px;">
              {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu style="margin-top:0px;">
              <el-dropdown-item command="a">个人设置</el-dropdown-item>
              <!-- <el-dropdown-item command="b">帮助</el-dropdown-item> -->
              <el-dropdown-item command="c">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="index_main">
      <div class="index_nav_bottom">
        <div class="index_nav_bottom_top">
          <div @click="leftshrink" v-if="isCollapse==false">
            <i class="iconfont icon-iconfontplatformentrance1"></i>
            <i class="iconfont icon-iconfontplatformentrance1"></i>
            <i class="iconfont icon-iconfontplatformentrance1"></i>
          </div>
          <div @click='rightshrink' v-if="isCollapse==true">
            <i class="iconfont icon-iconfontplatformentrance"></i>
            <i class="iconfont icon-iconfontplatformentrance"></i>
            <i class="iconfont icon-iconfontplatformentrance"></i>
          </div>
        </div>
        <div class="index_nav_bottom_bottom">
          <el-menu default-active="1-4-1" :unique-opened='uniqueopened' class="el-menu-vertical-demo" :collapse="isCollapse">
            <el-submenu v-for="(site,key) in sites" :key="site.id" :index=site.id style="text-align:left;">
              <template slot='title'>
                <i v-if="site.menuName=='常用菜单'" class="left_i iconfont icon-changyongcaidan"></i>
                <i v-else-if="site.menuName=='系统管理'" style="left:-3px;" class="left_i iconfont icon-xitongguanli"></i>
                <i v-else-if="site.menuName=='设备管理'" style='left:-1px;font-size:20px;' class="left_i iconfont icon-shebei"></i>
                <i v-else-if="site.menuName=='终端管理'" style="font-size:15px;left:-2px;" class="left_i iconfont icon-shebeishengji "></i>
                <i v-else-if="site.menuName=='事件管理'" style="font-size:22px;left:-4px;" class="left_i iconfont icon-shijian"></i>
                <i v-else-if="site.menuName=='统计信息'" style="font-size:19px;left:-4px;" class="left_i iconfont icon-gailan"></i>
                <span slot="title">{{site.menuName}}</span>
              </template> 
              <el-menu-item-group>
                <el-menu-item v-for='(item,index) in site.sonMenu' :key="item.id" index='1-1'>
                  <span style="color:#48576a;display:inline-block;width:100%;height:100%;text-decoration: none;" :id='bagcolor==item.enLabel ? "bgcolor":""'  @click='bgcolor(item.enLabel,item.id,item.enLabel)'>{{item.menuName}}</span>
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
                      <h4 class="modal-title" id="myModalLabel">个人设置</h4>
                  </div>
                  <div class="modal-body">
                    <form class="systemsettingspsd">
                      <label for="" style="margin-top:8px;">
                        原始密码:
                        <input type="password" v-model.lazy="oldPassword" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入原密码" required>
                      </label>
                      <label for="">
                        新密码:&#12288
                        <input type="password" v-model.lazy="newPassword" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入新密码" required>
                      </label>
                      <label for="">
                        确认密码:
                        <input type="password" v-model.lazy="newPasswordTwo" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="确认新密码" required>
                      </label> 
                    </form>
                    <button style="margin-left:150px;" type="button" @click="revampPassword" class="btn btn-primary">提交更改</button>
                    <!-- <el-collapse v-model.lazy="activeName" accordion>
                      <el-collapse-item title="密码修改" name="1">
                        <form class="systemsettingspsd">
                            <label for="" style="margin-top:8px;">
                              原始密码:
                              <input type="password" v-model.lazy="oldPassword" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入原密码" required>
                            </label>
                            <label for="">
                              新密码:&#12288
                              <input type="password" v-model.lazy="newPassword" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入新密码" required>
                            </label>
                            <label for="">
                              确认密码:
                              <input type="password" v-model.lazy="newPasswordTwo" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="确认新密码" required>
                            </label> 
                         </form>
                         <button style="margin-left:150px;" type="button" @click="revampPassword" class="btn btn-primary">提交更改</button>
                      </el-collapse-item>
                      <el-collapse-item title="常用菜单设置" name="2">
                        <el-tree
                          :data="data2"
                          show-checkbox
                          node-key="id"
                          accordion
                          :default-checked-keys=checked
                          :props="defaultProps"
                          ref="tree">
                        </el-tree>
                        <button style="margin-left:150px;margin-top:5px;" type="button" @click="revampPasswordtwo" class="btn btn-primary">提交更改</button>
                      </el-collapse-item>
                    </el-collapse> -->
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
              that.error_code(data.errorCode)
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
    listclick(data,key){
      $('.left_i_JT').css({transform:'rotate(0deg)'})
      $('.left_i_JT').eq(key).css({transform:'rotate(90deg)'})
      //frequentlyUsedMenu 常用菜单
      if(data=='frequentlyUsedMenu'){
        this.frequentlyUsedMenu = !this.frequentlyUsedMenu
        this.systemManage = false
        this.equipmentManage = false
        this.upgradeManage = false
        this.eventManage = false
        this.statisticsInfo = false
      }
      //systemManage 系统管理
      if(data=='systemManage'){
        this.systemManage = !this.systemManage
        this.frequentlyUsedMenu = false
        this.equipmentManage = false
        this.upgradeManage = false
        this.eventManage = false
        this.statisticsInfo = false
      }
      //equipmentManage  设备管理
      if(data=='equipmentManage'){
        this.equipmentManage = !this.equipmentManage
        this.frequentlyUsedMenu = false
        this.systemManage = false
        this.upgradeManage = false
        this.eventManage = false
        this.statisticsInfo = false
      }
      //upgradeManage  升级管理
      if(data=='upgradeManage'){
        this.upgradeManage = !this.upgradeManage
        this.frequentlyUsedMenu = false
        this.systemManage = false
        this.equipmentManage = false
        this.eventManage = false
        this.statisticsInfo = false
      }
      //eventManage  事件管理
      if(data=='eventManage'){
        this.eventManage = !this.eventManage
        this.frequentlyUsedMenu = false
        this.systemManage = false
        this.equipmentManage = false
        this.upgradeManage = false
        this.statisticsInfo = false
      }
      //statisticsInfo 统计信息
      if(data=='statisticsInfo'){
        this.statisticsInfo = !this.statisticsInfo
        this.frequentlyUsedMenu = false
        this.systemManage = false
        this.equipmentManage = false
        this.upgradeManage = false
        this.eventManage = false
      }
    },
    fun(site){
      if(site=='frequentlyUsedMenu'){
        return this.frequentlyUsedMenu;
      }
      if(site=='systemManage'){
        return this.systemManage;
      }
      if(site=='equipmentManage'){
        return this.equipmentManage;
      }
      if(site=='upgradeManage'){
        return this.upgradeManage;
      }
      if(site=='eventManage'){
        return this.eventManage;
      }
      if(site=='statisticsInfo'){
        return this.statisticsInfo
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
          message: '新密码不一致',
          type: 'error',
          showClose: true,
        });
        return;
      }
      if(this.oldPassword==this.newPasswordTwo){
        that.$message({
            message: '新密码不能与旧密码一致',
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
              message: '密码修改成功',
              type: 'success',
              showClose: true,
            });
            $('#systemsettings').modal('hide')
            that.$router.push({'path':'/'})
          }else{
            that.error_code(data.errorCode)
          }
        }
      })
    },
    //常用菜单修改
    revampPasswordtwo(){
      var that = this
      var array = []
      var check = this.$refs.tree.getCheckedKeys()
      for(var i=0;i<this.data2.length;i++){
        array.push(this.data2[i].id)
      }
      for(var i = 0;i<array.length;i++){
        for(var j=0;j<check.length;j++){
          if(array[i]==check[j]){
            check.splice(j,1)
          }
        }
      }
      $.ajax({
        type:'post',
        async:true,
        url:that.serverurl+'user/setFrequentlyUsedMenu',
        dataType:'json',
        xhrFields:{withCredentials:true},
        data:{
          menuIds:check.join(',')
        },
        success:function(data){
          if(data.errorCode=='0'){
            that.$message({
              message: '常用菜单设置成功',
              type: 'success',
              showClose: true,
            });
            $('#systemsettings').modal('hide')
          }else{
            that.error_code(data.errorCode)
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
      $(".index_nav_bottom").css('width',"54px");
      $(".index_main_bottom").css('left',"54px");
      this.isCollapse=true
    },
    //右缩进
    rightshrink(){
      $(".index_nav_bottom").css('width',"220px");
      $(".index_main_bottom").css('left',"220px");
      this.isCollapse=false
    },
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
          that.errorCode(data.errorCode)
        }
      },
    });
    var url = localStorage.serverurl.split('//');
    console.log(url)
    url = 'ws://'+url[1]
    var ws = new WebSocket(url+'webscoketAlarm');
    ws.onopen = function(){}
    ws.onmessage = function (evt){
      var data = JSON.parse(evt.data)
      that.value = data.alarmTotal
    }
    ws.onclose = function (evt){
      ws = new WebSocket(url+'webscoketAlarm');
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
.index_nav{width: 100%;height: 70px;background: white;display: flex;}
.index_main{position: absolute;top:70px;bottom:0;width:100%;height:auto;background:white;display: flex;display: -webkit-flex;flex-direction: column;}
.index_nav_top{cursor: pointer;color: white;font-size: 19px;background: rgb(94, 135, 176);width:240px;}
.index_nav_top>div{display: inline-block;width: 32px;height:32px;border: 1px solid white;border-radius: 50%;position: relative;left: -15px;top:20px;}
.index_nav_top i{font-size: 25px;line-height: 32px;}
.index_nav_top>span{position: relative;left: -15px;top:20px;}
.icon-jinggao{display: inline-block;line-height: 25px;font-size:25px;color: #486d93;text-shadow: 0.5px 0.5px #b4c7da, -0.5px -0.5px #375471;}

.index_main_top_left{position: absolute;right: 180px;height: 70px;line-height: 70px;color: white;font-size: 16px;}
.index_main_top_center{position: absolute;height: 70px;line-height: 70px;left: 10px;}

.index_main_top_right{position: absolute;right: 2%;height: 70px;line-height: 70px;}
.index_nav_top,.index_main_top{height: 70px;}
.index_main_top{background:rgb(94, 135, 176);position: absolute;left: 240px;right: 0;height: 70px;}
.index_nav_bottom{position: absolute;left:0;height:100%;width: 220px;border-right: 1px solid #dddddd;background: rgb(244, 244, 244);}
.index_main_bottom{position: absolute;left:220px;right:0;height: 100%;background: rgb(244, 244, 244);overflow: auto;}
.index_nav_bottom_top{width: 100%;height: 30px;display: flex;}
.index_nav_bottom_top>div{position: absolute;right: 7px;cursor: pointer;width: 42px;height: 30px;}
.index_nav_bottom_top>div>i{font-size:24px;position: absolute;top: 0px;}
.index_nav_bottom_top>div>i:nth-of-type(2){left: 7px;}
.index_nav_bottom_top>div>i:nth-of-type(3){left: 14px;}
.index_nav_bottom_top>img{width: 60px;border-radius: 50%;margin-left: 15px;border: 1px solid gray;padding: 2px;}
.index_nav_bottom_top>div{margin-left: 15px;padding: 8px 0;}
.index_nav_bottom_bottom{position: absolute;width: 220px;height: auto;top:30px;bottom: 0;overflow: hidden;}
.systemsettingspsd{display: flex;flex-direction: column;align-items: center;font-size: 14px}
.systemsettingspsd>label{margin-bottom: 15px;}
.list>a{background: #FBFDFF;border-bottom: 1px solid #dfe6ec;text-align: center;}
.left_i{position:relative;top:1px;font-size:17px;display:inline-block;width: 22px;text-align: center;}
.left_i_JT{position: absolute;right: 15px;top:12px;}
</style>

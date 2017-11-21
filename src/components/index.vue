<template>
  <div class="index">
    <div class="index_nav">
      <div class="index_nav_top" @click="echart">
        <div>
          <!-- <i class="iconfont icon-baidu"></i> -->
          <img class="logo" src="../ASSETS/logo.jpg" alt="">
        </div>
        <span>TSBM-管理系统</span>
      </div>
      <div class="index_nav_bottom">
        <div class="index_nav_bottom_top">
          <img src="../assets/index.jpg" alt="">
          <div>
            <p>您好,</p>
            <p>超级管理员</p>
          </div>
        </div>
        <div class="index_nav_bottom_bottom">
          <!-- 此处循环添加列表 -->
          <div v-for="(site,key) in sites" style="margin-top:1px;">
            <a @click='listclick(site.enLabel,key)' class="list-group-item" style="background:rgb(244, 244, 244);border-bottom: 1px solid #ffffff;border-top: 1px solid #e7e7e7;color:#555555;cursor:default;text-align:left;">
              <i v-if="site.menuName==='常用菜单'" class="left_i iconfont icon-changyongcaidan"></i>
              <i v-else-if="site.menuName==='系统管理'" style="left:-3px;" class="left_i iconfont icon-xitongguanli"></i>
              <i v-else-if="site.menuName==='设备管理'" style='left:-1px;font-size:20px;' class="left_i iconfont icon-shebei"></i>
              <i v-else-if="site.menuName==='升级管理'" style="font-size:15px;left:-2px;" class="left_i iconfont icon-shebeishengji "></i>
              <i v-else-if="site.menuName==='事件管理'" style="font-size:22px;left:-4px;" class="left_i iconfont icon-shijian"></i>
              <i v-else-if="site.menuName==='统计信息'" style="font-size:19px;left:-4px;" class="left_i iconfont icon-gailan"></i>
              {{site.menuName}}
              <i id="left_i_JT" class="iconfont icon-icon left_i_JT"></i>
            </a>
            <el-collapse-transition>
              <div v-show="fun(site.enLabel)" class="list">
                <router-link v-for='(item,index) in site.sonMenu' :id='bagcolor==item.enLabel ? "bgcolor":""'  @click.native='bgcolor(item.enLabel,item.id)' class="list-group-item" :to=item.enLabel>{{item.menuName}}</router-link>
              </div>   
            </el-collapse-transition>
          </div>
        </div>
      </div>
    </div>
    <div class="index_main">
      <div class="index_main_top">
        <div class="index_main_top_left">
          <span>版本号:1.0.1</span>
        </div>
        <div class="index_main_top_center">
          <el-button @click="shortcut(1)">设备概览</el-button>
          <el-button @click="shortcut(2)">设备列表</el-button>
          <el-button @click="shortcut(3)">地图定位</el-button>
          <el-button @click="shortcut(4)">数据统计</el-button>
        </div>
        <div class="index_main_top_right">
          <el-badge :value=value class="item" style="line-height:0;margin-right:30px;">
            <i @click="shortcut(5)" class="iconfont icon-jinggao"></i>
          </el-badge>
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link" style="color: white;font-size:16px;">
              {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu style="margin-top:0px;">
              <el-dropdown-item command="a">个人设置</el-dropdown-item>
              <el-dropdown-item command="b">帮助</el-dropdown-item>
              <el-dropdown-item command="c">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
                    <el-collapse v-model="activeName" accordion>
                      <el-collapse-item title="密码修改" name="1">
                        <form class="systemsettingspsd">
                            <label for="" style="margin-top:8px;">
                              原始密码:
                              <input type="password" v-model="oldPassword" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入原密码" required>
                            </label>
                            <label for="">
                              新密码:&#12288
                              <input type="password" v-model="newPassword" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入新密码" required>
                            </label>
                            <label for="">
                              确认密码:
                              <input type="password" v-model="newPasswordTwo" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="确认新密码" required>
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
                    </el-collapse>
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
      username:sessionStorage.userName,
      frequentlyUsedMenu: false,
      systemManage:false,
      equipmentManage:false,
      upgradeManage:false,
      eventManage:false,
      statisticsInfo:false,
      sites:{},
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
      value:'8',
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
              that.$router.push({'path':'/login'})
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
    bgcolor(name,id){
      this.bagcolor = name
      sessionStorage.menuId = id
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
            that.$router.push({'path':'/login'})
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
      if(val == '5'){
        this.$router.push({'path':'/alarm'})
      }
    },
    //点击事件-->跳转图表页面
    echart(){
      this.$router.push({'path':'/index'})
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
        }else{
          that.errorCode(data.errorCode)
        }
      },
    });
    var ws = new WebSocket('ws://192.168.70.83/TSBM-Manager/webscoketAlarm');
    ws.onopen = function(){
      // alert('socket已连接上');
    }
    ws.onmessage = function (evt){
      that.value = evt.data.alarmTotal
    }
  }
}
</script>
<style scoped>
.logo{width:25px;height: 25px;}
#bgcolor{background: #99A9BF !important;border-right: 4px solid #20A0FF !important;color: white !important;}

.index{width: 100%;height: 100%;min-width: 1100px;}
.index_nav{width: 240px;height:100%;float: left;background: white;display: flex;display: -webkit-flex;flex-direction: column;}
.index_main{height:100%;background:white;display: flex;display: -webkit-flex;flex-direction: column;position: relative;}
.index_nav_top{color: white;font-size: 19px;background: rgb(94, 135, 176);}
.index_nav_top>div{display: inline-block;width: 32px;height:32px;border: 1px solid white;border-radius: 50%;position: relative;left: -15px;top:20px;}
.index_nav_top i{font-size: 25px;line-height: 32px;}
.index_nav_top>span{position: relative;left: -15px;top:20px;}
.icon-jinggao{display: inline-block;line-height: 25px;font-size:25px;color: #486d93;text-shadow: 0.5px 0.5px #b4c7da, -0.5px -0.5px #375471;}
.index_main_top_left{width: 100px;position: absolute;height: 70px;line-height: 70px;color: white;font-size: 16px;right: 170px;}
.index_main_top_center{position: absolute;height: 70px;line-height: 70px;left: 10px;}

.index_main_top_right{position: absolute;right: 2%;height: 70px;line-height: 70px;}
.index_nav_top,.index_main_top{height: 70px;}
.index_main_top{background:rgb(94, 135, 176);}
.index_nav_bottom{position: absolute;top: 70px;bottom: 0;width: 240px;height: auto;border-right: 1px solid #dddddd;background: rgb(244, 244, 244);}
.index_main_bottom{position: absolute;top: 70px;bottom: 0;height: auto;background: rgb(244, 244, 244);width: 100%;}
.index_nav_bottom_top{width: 100%;height: 60px;display: flex;margin: 15px 0;}
.index_nav_bottom_top>img{width: 60px;border-radius: 50%;margin-left: 15px;border: 1px solid gray;padding: 2px;}
.index_nav_bottom_top>div{margin-left: 15px;padding: 8px 0;}
.index_nav_bottom_bottom{position: absolute;width: 240px;height: auto;top:90px;bottom: 0;}
.systemsettingspsd{display: flex;flex-direction: column;align-items: center;font-size: 14px}
.systemsettingspsd>label{margin-bottom: 15px;}
.list>a{background: #FBFDFF;border-bottom: 1px solid #dfe6ec;text-align: center;}
.left_i{position:relative;top:1px;font-size:17px;display:inline-block;width: 22px;text-align: center;}
.left_i_JT{position: absolute;right: 15px;top:12px;}
</style>

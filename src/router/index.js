import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import echartss from 'echarts'


import login from '@/components/login'  //登录页面
import index from '@/components/index'  //首页
import echarts from '@/components/echarts'   //图表页面
import userManage from '@/components/systemManagement/userManage'  // 用户管理
import departmentManage from '@/components/systemManagement/departmentManage'  // 组织管理
import roleManage from '@/components/systemManagement/roleManage'  // 角色管理
import logManage from '@/components/systemManagement/logManage'  // 日志管理
import TSBManage from '@/components/equipmentManage/TSBManage'  //设备管理-->TSB管理
import equipmentLocation from '@/components/equipmentManage/equipmentLocation' //设备管理-->设备定位
import equipmentUser from '@/components/equipmentManage/equipmentUser' //设备管理-->终端用户
import imgcoordinate from '@/components/equipmentManage/imgcoordinate'  //设备管理-->设备定位单张图片路由页面
import authManage from '@/components/equipmentManage/authManage'   //设备管理-->认证管理
import equipmentUpgrade from '@/components/upgradeManage/equipmentUpgrade'  //升级管理-->设备升级
import alarm from '@/components/eventManage/alarm'  //事件管理-->告警信息
import event from '@/components/eventManage/event'  //事件管理-->事件信息


Vue.use(Router)
Vue.use(ElementUI)
Vue.prototype.$echarts = echartss
//请求错误码封装
Vue.prototype.errorCode = function(code){
    if(code=='1001'){
      this.$message({
          message: '未知错误',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='1002'){
      this.$message({
          message: '会话超时,请重新登录',
          type: 'error',
          showClose: true,
      });
      this.$router.push({'path':'/login'})
    }
    if(code=='1003'){
      this.$message({
          message: '数据库错误',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='1004'){
      this.$message({
          message: '未找到数据',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='1005'){
      this.$message({
          message: '参数错误',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='1006'){
      this.$message({
          message: '验证码错误',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='1007'){
      this.$message({
          message: '原始密码错误',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='1008'){
      this.$message({
          message: '用户名存在',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='1009'){
      this.$message({
          message: '保存失败',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='1010'){
      this.$message({
          message: '删除失败',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='1011'){
      this.$message({
          message: '用户认证失败，用户名或密码错误',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='1012'){
      this.$message({
          message: '用户被禁用，无法登陆',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='1013'){
      this.$message({
          message: '部门名称重复',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='1014'){
      this.$message({
          message: '角色名称重复',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='1015'){
      this.$message({
          message: '无权限',
          type: 'error',
          showClose: true,
      });
    }
};

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children:[
        {//图表页面
          path:'/',
          name:'echarts',
          component:echarts,
        },
        { // 用户管理
          path: '/userManage',
          name: 'userManage',
          component: userManage
        },
        {// 组织管理
          path: '/departmentManage',
          name: 'departmentManage',
          component: departmentManage
        },
        {// 角色管理
          path: '/roleManage',
          name: 'roleManage',
          component: roleManage
        },
        {// 日志管理
          path: '/logManage',
          name: 'logManage',
          component: logManage
        },
        {// 设备管理-->TSB管理
          path: '/TSBManage',
          name: 'TSBManage',
          component: TSBManage
        },
        {// 设备管理-->设备定位
          path: '/equipmentLocation',
          name: 'equipmentLocation',
          component: equipmentLocation,
        },
        {// 设备管理-->终端用户
          path: '/equipmentUser',
          name: 'equipmentUser',
          component: equipmentUser
        },
        {//设备管理-->设备定位单张图片路由页面
          path: '/imgcoordinate',
          name: 'imgcoordinate',
          component: imgcoordinate,
        },
        {// 设备管理-->认证管理
          path: '/authManage',
          name: 'authManage',
          component: authManage,
        },
        {//升级管理-->设备升级
          path: '/equipmentUpgrade',
          name: 'equipmentUpgrade',
          component: equipmentUpgrade,
        },
        {//事件管理-->告警信息
          path: '/alarm',
          name: 'alarm',
          component: alarm,
        },
        {//事件管理-->事件信息
          path: '/event',
          name: 'event',
          component: event,
        },
      ]
    },
    
  ]
})
